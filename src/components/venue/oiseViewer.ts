import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { OPEN_AREAS } from "./locations";

// Geometry is generated from the OISE (252 Bloor St W) CAD floor plans.
// Segments are packed as [x1, z1, x2, z2, ...] in centimetres; x points east, z points south.
export interface RoomData {
  id: string;
  x: number;
  z: number;
  poly?: [number, number][];
}

export interface LevelData {
  // solid wall regions: each entry is [outer ring, ...hole rings], rings packed as [x, z, x, z, ...] in cm
  solid: number[][][];
  low: number[][][];
  slabs: [number, number][][];
  rooms: RoomData[];
  stairwells: [number, number, number, number][];
  lifts: [number, number][];
  nav: number[];
}

export interface BuildingData {
  levels: Record<string, LevelData>;
  nav: { x0: number; z0: number; res: number; w: number; h: number };
  connectors: {
    elevators: { x: number; z: number }[];
    stairs: { x: number; z: number; from: string; to: string }[];
  };
}

export interface LevelInfo {
  key: string;
  name: string;
  short: string;
  // Floors with no plan in the source PDF borrow the outline of the floor named here.
  ghostOf?: string;
}

export const LEVELS: LevelInfo[] = [
  { key: "1", name: "Ground Floor", short: "G" },
  { key: "M", name: "Mezzanine", short: "M" },
  { key: "2", name: "Floor 2", short: "2" },
  { key: "3", name: "Floor 3", short: "3" },
  { key: "4", name: "Floor 4", short: "4" },
  { key: "5", name: "Floor 5", short: "5" },
  { key: "6", name: "Floor 6", short: "6", ghostOf: "7" },
  { key: "7", name: "Floor 7", short: "7" },
  { key: "8", name: "Floor 8", short: "8" },
  { key: "9", name: "Floor 9", short: "9", ghostOf: "10" },
  { key: "10", name: "Floor 10", short: "10" },
  { key: "11", name: "Floor 11", short: "11" },
];

const LEVEL_GAP = 3.9;
const SLAB = 0.3;
const WALL_H = LEVEL_GAP - SLAB - 0.02; // walls run up to the next floor
// interior walls stay low so corridors and rooms read from above; the full-height
// outer shell only shows in the whole-building view
const INNER_H = 1.6;
const PARAPET_H = 0.9;
const GOLD = 0xa3841d;
const INK = 0x3c2c2c;
const BUILDING = 0xf6f4ef;
const WALL = 0xa9a59e; // walls and facade
const BAND = 0x9d9992;
const FLOOR = 0xf0d88f; // open floor and corridors read as hallway
const HALL = FLOOR; // corridor floors
const UNUSED = 0x6e6a64; // rooms the conference isn't using
const ACTIVE = 0xd8b445; // committee rooms and other conference rooms
const ACTIVE_WALL = 0xc29d2c;
const ENTRANCE = 0xc0392b;
const ELEVATOR = 0x4f7cc4;
const STAIRS = 0x4f9a6b;
export const MAP_COLORS = {
  hall: HALL,
  elevator: ELEVATOR,
  stairs: STAIRS,
  gold: GOLD,
};
const OVERVIEW = {
  target: new THREE.Vector3(0, 20, 0),
  pos: new THREE.Vector3(105, 85, 135),
};

// G-162 auditorium interior (from the ground-floor plan); the stage/screen is on the east wall.
const AUDITORIUM = {
  x0: 31.2,
  x1: 45.2,
  z0: -23.8,
  z1: -8.8,
  stageX: 46.4,
  columns: [
    [35.95, -23.1],
    [42.05, -23.1],
    [35.95, -9.4],
    [42.05, -9.4],
  ],
};

interface LevelObj {
  info: LevelInfo;
  group: THREE.Group;
  baseY: number;
  materials: THREE.Material[];
  baseOpacity: Map<THREE.Material, number>;
  slabMesh?: THREE.Mesh;
  // outer walls plus a ceiling, shown only in the whole-building view
  shell?: THREE.Group;
  picks: THREE.Mesh[];
  rooms: RoomData[];
  opacity: number;
  targetOpacity: number;
  lift: number;
  targetLift: number;
}

export type PinTone = "gold" | "ink" | "elevator" | "stairs";

export interface Pin {
  id: string;
  label: string;
  tone: PinTone;
  x: number;
  y: number;
  visible: boolean;
}

interface PinAnchor {
  id: string;
  label: string;
  tone: PinTone;
  level: string;
  pos: THREE.Vector3;
}

export interface RouteDraw {
  legs: { level: string; points: [number, number][] }[];
  via?: {
    type: "elevator" | "stairs";
    x: number;
    z: number;
    from: string;
    to: string;
  };
  startLabel: string;
  endLabel: string;
}

export interface ViewerOptions {
  onRoomClick?: (level: string, roomId: string) => void;
  onLevelClick?: (level: string) => void;
  onHover?: (
    hover: { level: string; roomId: string; x: number; y: number } | null,
  ) => void;
  onPins?: (pins: Pin[]) => void;
  // rooms in use get white floors; everything else stays grey
  activeRooms?: Set<string>;
  // building entrances, flagged on the ground floor
  entrances?: { x: number; z: number }[];
}

function quadGeometry(segs: number[], y0: number, y1: number) {
  const n = segs.length / 4;
  const pos = new Float32Array(n * 18);
  for (let i = 0; i < n; i++) {
    const x1 = segs[i * 4] / 100,
      z1 = segs[i * 4 + 1] / 100;
    const x2 = segs[i * 4 + 2] / 100,
      z2 = segs[i * 4 + 3] / 100;
    pos.set(
      [x1, y0, z1, x2, y0, z2, x2, y1, z2, x1, y0, z1, x2, y1, z2, x1, y1, z1],
      i * 18,
    );
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  g.computeVertexNormals();
  return g;
}

// Shapes live in the XY plane; rotating -90° about X maps (x, -z) back onto the ground plane.
function shapeOf(poly: [number, number][]) {
  const s = new THREE.Shape();
  poly.forEach(([x, z], i) => (i ? s.lineTo(x, -z) : s.moveTo(x, -z)));
  s.closePath();
  return s;
}

function flatShape(poly: [number, number][], y: number) {
  const g = new THREE.ShapeGeometry(shapeOf(poly));
  g.rotateX(-Math.PI / 2);
  g.translate(0, y, 0);
  return g;
}

function extruded(polys: [number, number][][], depth: number, y: number) {
  const g = new THREE.ExtrudeGeometry(polys.map(shapeOf), {
    depth,
    bevelEnabled: false,
  });
  g.rotateX(-Math.PI / 2);
  g.translate(0, y, 0);
  return g;
}

function ringShapes(solids: number[][][]) {
  const toPts = (r: number[]) => {
    const pts: THREE.Vector2[] = [];
    for (let i = 0; i < r.length; i += 2)
      pts.push(new THREE.Vector2(r[i] / 100, -r[i + 1] / 100));
    return pts;
  };
  return solids.map(([outer, ...holes]) => {
    const s = new THREE.Shape(toPts(outer));
    s.holes = holes.map((h) => new THREE.Path(toPts(h)));
    return s;
  });
}

const ringArea = (r: number[]) => {
  let a = 0;
  for (let i = 0, j = r.length - 2; i < r.length; j = i, i += 2)
    a += r[j] * r[i + 1] - r[i] * r[j + 1];
  return Math.abs(a) / 2e4; // cm² -> m²
};

/** Douglas–Peucker on a closed ring packed as [x, z, ...] in cm. */
function simplifyRing(r: number[], tol: number) {
  const n = r.length / 2;
  if (n <= 4) return r;
  const keep = new Uint8Array(n + 1);
  const pt = (i: number) => [r[(i % n) * 2], r[(i % n) * 2 + 1]];
  const dp = (a: number, b: number) => {
    const [ax, az] = pt(a),
      [bx, bz] = pt(b);
    const len = Math.hypot(bx - ax, bz - az) || 1;
    let far = -1,
      dmax = tol;
    for (let i = a + 1; i < b; i++) {
      const [x, z] = pt(i);
      const d = Math.abs((bx - ax) * (az - z) - (ax - x) * (bz - az)) / len;
      if (d > dmax) [dmax, far] = [d, i];
    }
    if (far < 0) return;
    keep[far] = 1;
    dp(a, far);
    dp(far, b);
  };
  const mid = n >> 1;
  keep[0] = keep[mid] = 1;
  dp(0, mid);
  dp(mid, n);
  const out: number[] = [];
  for (let i = 0; i < n; i++) if (keep[i]) out.push(...pt(i));
  return out.length >= 6 ? out : r;
}

// Plain, smooth walls: drop free-standing columns and fins, and straighten small jogs.
// Shapes with rooms cut out of them are left as drawn: simplifying the outline and the
// holes separately can make them cross, and the triangulation then fills the whole floor.
const smoothWalls = (solids: number[][][]) =>
  solids
    .filter(([outer]) => !isPost(outer))
    .map((solid) => {
      if (solid.length > 1) return solid;
      // a thin wall can collapse under simplification; keep it as drawn if it loses area
      const s = simplifyRing(solid[0], 30);
      return [ringArea(s) >= ringArea(solid[0]) * 0.9 ? s : solid[0]];
    });

/** Columns and fins: small in both directions. Thin partition walls are long, so they stay. */
function isPost(r: number[]) {
  let x0 = Infinity,
    x1 = -Infinity,
    z0 = Infinity,
    z1 = -Infinity;
  for (let i = 0; i < r.length; i += 2) {
    [x0, x1] = [Math.min(x0, r[i]), Math.max(x1, r[i])];
    [z0, z1] = [Math.min(z0, r[i + 1]), Math.max(z1, r[i + 1])];
  }
  return Math.max(x1 - x0, z1 - z0) < 150 && ringArea(r) < 1.5; // cm, m²
}

function solidGeometry(solids: number[][][], height: number, y: number) {
  const g = new THREE.ExtrudeGeometry(ringShapes(smoothWalls(solids)), {
    depth: height,
    bevelEnabled: false,
    curveSegments: 1,
  });
  g.rotateX(-Math.PI / 2);
  g.translate(0, y, 0);
  return g;
}

function outlineSegs(polys: [number, number][][]) {
  const out: number[] = [];
  for (const p of polys)
    p.forEach(([x, z], i) => {
      const [x2, z2] = p[(i + 1) % p.length];
      out.push(x * 100, z * 100, x2 * 100, z2 * 100);
    });
  return out;
}

function disposeTree(o: THREE.Object3D) {
  o.traverse((c) => {
    const m = c as THREE.Mesh;
    m.geometry?.dispose();
    const mat = m.material as THREE.Material | THREE.Material[] | undefined;
    if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
    else mat?.dispose();
  });
}

export class OiseViewer {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera: THREE.PerspectiveCamera;
  private controls: OrbitControls;
  private levels: LevelObj[] = [];
  private byKey = new Map<string, LevelObj>();
  private focus: string | null = null;
  private highlight: THREE.Group | null = null;
  private route: RouteDraw | null = null;
  private routeLegs: {
    group: THREE.Group;
    level: string;
    pts: THREE.Vector3[];
  }[] = [];
  private rideObj: THREE.Mesh | null = null;
  private runner: THREE.Mesh | null = null;
  private runnerPath: THREE.Vector3[] = [];
  private anchors: PinAnchor[] = [];
  private bobbers: THREE.Object3D[] = [];
  private raf = 0;
  private clock = new THREE.Clock();
  private fly: {
    from: THREE.Vector3;
    to: THREE.Vector3;
    tFrom: THREE.Vector3;
    tTo: THREE.Vector3;
    t: number;
  } | null = null;
  private ro: ResizeObserver;
  private raycaster = new THREE.Raycaster();
  private pointer = new THREE.Vector2();
  private downAt: { x: number; y: number } | null = null;
  private opts: ViewerOptions;

  constructor(
    private container: HTMLElement,
    data: BuildingData,
    opts: ViewerOptions = {},
  ) {
    this.opts = opts;
    const w = container.clientWidth,
      h = container.clientHeight;
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    // phones: a slightly lower render resolution keeps the frame rate up
    const small = Math.min(w, h) < 640;
    this.renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, small ? 1.5 : 2),
    );
    this.renderer.setSize(w, h);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(40, w / h, 1, 2000);
    this.camera.position.copy(OVERVIEW.pos);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.maxPolarAngle = Math.PI * 0.49;
    this.controls.minDistance = 12;
    this.controls.maxDistance = 400;
    this.controls.target.copy(OVERVIEW.target);
    // Let a drag interrupt any camera flight in progress.
    this.controls.addEventListener("start", () => (this.fly = null));

    this.scene.add(new THREE.HemisphereLight(0xffffff, 0xcfc8b8, 1.9));
    const sun = new THREE.DirectionalLight(0xffffff, 1.6);
    sun.position.set(-70, 130, 90);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    Object.assign(sun.shadow.camera, {
      left: -95,
      right: 95,
      top: 95,
      bottom: -95,
      near: 10,
      far: 400,
    });
    sun.shadow.bias = -0.0005;
    sun.shadow.normalBias = 0.05;
    this.scene.add(sun);

    const ground = new THREE.Mesh(
      new THREE.CircleGeometry(170, 64),
      new THREE.MeshStandardMaterial({ color: 0xece6d6, roughness: 1 }),
    );
    ground.receiveShadow = true;
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.05;
    this.scene.add(ground);
    this.scene.add(this.streets());

    LEVELS.forEach((info, i) => this.buildLevel(info, i * LEVEL_GAP, data));

    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(container);
    const el = this.renderer.domElement;
    el.addEventListener("pointerdown", this.onDown);
    el.addEventListener("pointerup", this.onUp);
    el.addEventListener("pointermove", this.onMove);
    el.addEventListener("pointerleave", this.onLeave);
    this.loop();
  }

  private buildLevel(info: LevelInfo, y: number, data: BuildingData) {
    const src = data.levels[info.ghostOf ?? info.key];
    if (!src) return;
    const group = new THREE.Group();
    group.position.y = y;
    const materials: THREE.Material[] = [];
    const mat = <T extends THREE.Material>(m: T) => (materials.push(m), m);
    const lv: LevelObj = {
      info,
      group,
      baseY: y,
      materials,
      baseOpacity: new Map(),
      picks: [],
      rooms: info.ghostOf ? [] : src.rooms,
      opacity: 1,
      targetOpacity: 1,
      lift: 0,
      targetLift: 0,
    };
    const top = SLAB;
    const body = mat(
      new THREE.MeshStandardMaterial({
        color: WALL,
        roughness: 1,
        side: THREE.DoubleSide,
      }),
    );
    const band = mat(
      new THREE.MeshStandardMaterial({ color: BAND, roughness: 1 }),
    );
    const slab = new THREE.Mesh(extruded(src.slabs, SLAB, 0), band);
    const shade = <T extends THREE.Mesh>(m: T) => (
      (m.castShadow = m.receiveShadow = true),
      m
    );
    group.add(shade(slab));
    lv.slabMesh = slab;
    group.add(this.shafts(src, data, mat));

    if (info.ghostOf) {
      // No drawing for this floor: show the slab and outer walls only.
      group.add(
        shade(
          new THREE.Mesh(
            quadGeometry(outlineSegs(src.slabs), top, top + WALL_H),
            body,
          ),
        ),
      );
    } else {
      // The ground floor is double height (the mezzanine sits inside it), so its walls,
      // outer shell and ceiling run all the way up to floor 2.
      const storeyH = (info.key === "1" ? 2 : 1) * LEVEL_GAP - SLAB - 0.02;
      const ceilingGeo = new THREE.ShapeGeometry(src.slabs.map(shapeOf));
      ceilingGeo.rotateX(-Math.PI / 2);
      ceilingGeo.translate(0, top + storeyH, 0);
      const ceiling = new THREE.Mesh(ceilingGeo, body);
      const innerH = info.key === "1" ? storeyH : INNER_H;
      lv.shell = new THREE.Group().add(
        shade(
          new THREE.Mesh(
            quadGeometry(outlineSegs(src.slabs), top, top + storeyH),
            body,
          ),
        ),
        shade(ceiling),
      );
      group.add(
        lv.shell,
        shade(new THREE.Mesh(solidGeometry(src.solid, innerH, top), body)),
        shade(
          new THREE.Mesh(
            solidGeometry(src.low, info.key === "1" ? innerH : PARAPET_H, top),
            body,
          ),
        ),
      );
      // Light floor surface over the grey slab band, with corridors ("…K" rooms) tinted so routes read clearly.
      const floorGeo = new THREE.ShapeGeometry(src.slabs.map(shapeOf));
      floorGeo.rotateX(-Math.PI / 2);
      floorGeo.translate(0, top + 0.03, 0);
      const floorMesh = new THREE.Mesh(
        floorGeo,
        // floor layers sit a few centimetres apart rather than using polygon offset, which
        // let floors draw through the outer walls at grazing angles
        mat(new THREE.MeshStandardMaterial({ color: FLOOR, roughness: 1 })),
      );
      group.add(floorMesh);

      // Room and corridor tints in one mesh. Outlines in the plans overlap (corridors drawn as
      // envelopes around rooms, suites around offices), so paint largest first and let smaller
      // outlines cover them; without depth writes, later triangles simply draw over earlier ones.
      const active = this.opts.activeRooms ?? new Set<string>();
      const used = src.rooms.filter((r) => r.poly && active.has(r.id));
      const tint = (r: RoomData) =>
        active.has(r.id)
          ? ACTIVE
          : /\d[KESV]$/.test(r.id) || OPEN_AREAS.has(r.id)
            ? HALL
            : UNUSED;
      const parts = src.rooms
        .filter((r) => r.poly)
        .map((r) => ({
          r,
          area: Math.abs(
            THREE.ShapeUtils.area(
              r.poly!.map(([x, z]) => new THREE.Vector2(x, z)),
            ),
          ),
        }))
        .sort((p, q) => q.area - p.area)
        .map(({ r }) => {
          const g = new THREE.ShapeGeometry(shapeOf(r.poly!));
          const c = new THREE.Color(tint(r));
          const n = g.getAttribute("position").count;
          const cols = new Float32Array(n * 3);
          for (let k = 0; k < n; k++) cols.set([c.r, c.g, c.b], k * 3);
          g.setAttribute("color", new THREE.BufferAttribute(cols, 3));
          return g;
        });
      if (parts.length) {
        const tints = mergeGeometries(parts)!;
        tints.rotateX(-Math.PI / 2);
        tints.translate(0, top + 0.06, 0);
        const m = new THREE.Mesh(
          tints,
          mat(
            new THREE.MeshStandardMaterial({
              vertexColors: true,
              roughness: 1,
              depthWrite: false,
            }),
          ),
        );
        m.renderOrder = 1;
        group.add(m);
      }
      const walls = this.roomWalls(used, src.nav, data, top, innerH);
      if (walls) {
        const m = new THREE.Mesh(
          walls,
          mat(
            new THREE.MeshStandardMaterial({
              color: ACTIVE_WALL,
              roughness: 0.9,
            }),
          ),
        );
        m.castShadow = m.receiveShadow = true;
        group.add(m);
      }

      // only conference rooms can be hovered or clicked
      const pickMat = new THREE.MeshBasicMaterial({ visible: false });
      for (const r of used) {
        const m = new THREE.Mesh(flatShape(r.poly!, top + 0.05), pickMat);
        m.userData = { level: info.key, roomId: r.id };
        group.add(m);
        lv.picks.push(m);
      }
      if (info.key === "1") {
        group.add(this.auditorium(mat));
        for (const e of this.opts.entrances ?? [])
          group.add(this.flag(e.x, e.z, top, mat));
      }
    }
    for (const m of materials) {
      lv.baseOpacity.set(m, m.opacity);
      m.userData.depthWrite = m.depthWrite;
    }
    this.scene.add(group);
    this.levels.push(lv);
    this.byKey.set(info.key, lv);
  }

  /** Coloured elevator cars and stairwells, full floor height so they read as continuous shafts. */
  private shafts(
    src: LevelData,
    data: BuildingData,
    mat: <T extends THREE.Material>(m: T) => T,
  ) {
    const g = new THREE.Group();
    const h = WALL_H + 0.02;
    const lift = mat(
      new THREE.MeshStandardMaterial({ color: ELEVATOR, roughness: 0.8 }),
    );
    const stair = mat(
      new THREE.MeshStandardMaterial({ color: STAIRS, roughness: 0.8 }),
    );
    for (const [x, z] of src.lifts) {
      const m = new THREE.Mesh(new THREE.BoxGeometry(2.2, h, 2.2), lift);
      m.position.set(x, SLAB + h / 2, z);
      g.add(m);
    }
    // only stairwells that belong to a real multi-floor stair shaft (drops false detections)
    for (const [x0, z0, x1, z1] of src.stairwells) {
      const cx = (x0 + x1) / 2,
        cz = (z0 + z1) / 2;
      if (
        !data.connectors.stairs.some((s) => Math.hypot(s.x - cx, s.z - cz) < 5)
      )
        continue;
      const m = new THREE.Mesh(
        new THREE.BoxGeometry(x1 - x0, h, z1 - z0),
        stair,
      );
      m.position.set(cx, SLAB + h / 2, cz);
      g.add(m);
    }
    g.traverse((o) => (o.castShadow = o.receiveShadow = true));
    return g;
  }

  /**
   * Wall caps along a room's outline, only where the walkability grid has an interior wall,
   * so doorways stay open and the facade stays grey. Slightly thicker and taller than the walls so they cover them.
   */
  private roomWalls(
    rooms: RoomData[],
    runs: number[],
    data: BuildingData,
    top: number,
    wallH: number,
  ) {
    const { x0, z0, res, w, h } = data.nav;
    const cells = new Uint8Array(w * h);
    for (let r = 0, i = 0; r < runs.length; r += 2) {
      cells.fill(runs[r], i, i + runs[r + 1]);
      i += runs[r + 1];
    }
    // a wall cell on the room's outline, but not part of the facade (the outside stays grey)
    const wallAt = (x: number, z: number) => {
      const cx = Math.floor((x - x0) / res),
        cz = Math.floor((z - z0) / res);
      let wall = false;
      for (let dz = -5; dz <= 5; dz++)
        for (let dx = -5; dx <= 5; dx++) {
          const px = cx + dx,
            pz = cz + dz;
          if (px < 0 || pz < 0 || px >= w || pz >= h) return false;
          const c = cells[pz * w + px];
          if (!c) return false;
          if (c === 2 && Math.abs(dx) <= 1 && Math.abs(dz) <= 1) wall = true;
        }
      return wall;
    };
    const height = wallH + 0.04;
    const parts: THREE.BufferGeometry[] = [];
    const piece = (ax: number, az: number, bx: number, bz: number) => {
      const len = Math.hypot(bx - ax, bz - az);
      if (len < 0.2) return;
      const g = new THREE.BoxGeometry(len, height, 0.26);
      g.rotateY(-Math.atan2(bz - az, bx - ax));
      g.translate((ax + bx) / 2, top + height / 2, (az + bz) / 2);
      parts.push(g);
    };
    for (const r of rooms)
      r.poly!.forEach(([ax, az], i) => {
        const [bx, bz] = r.poly![(i + 1) % r.poly!.length];
        const n = Math.max(
          1,
          Math.ceil(Math.hypot(bx - ax, bz - az) / (res / 2)),
        );
        let start = -1;
        for (let k = 0; k <= n; k++) {
          const t = k / n;
          const on = k < n && wallAt(ax + (bx - ax) * t, az + (bz - az) * t);
          if (on && start < 0) start = k;
          if (!on && start >= 0) {
            const t0 = start / n,
              t1 = k / n;
            piece(
              ax + (bx - ax) * t0,
              az + (bz - az) * t0,
              ax + (bx - ax) * t1,
              az + (bz - az) * t1,
            );
            start = -1;
          }
        }
      });
    return parts.length ? mergeGeometries(parts) : null;
  }

  /**
   * Streets around the building. OISE sits on the north side of Bloor St W with Bedford Rd
   * along its east side; in model space north is +x and east is +z.
   */
  private streets() {
    const g = new THREE.Group();
    const road = new THREE.MeshStandardMaterial({
      color: 0xd6cfbf,
      roughness: 1,
    });
    const label = (text: string, len: number) => {
      const c = document.createElement("canvas");
      c.width = 1024;
      c.height = 128;
      const ctx = c.getContext("2d")!;
      ctx.fillStyle = "#6b5d4f";
      ctx.font = "600 64px system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, 512, 66);
      const tex = new THREE.CanvasTexture(c);
      tex.anisotropy = 4;
      return new THREE.Mesh(
        new THREE.PlaneGeometry(len, len / 8),
        new THREE.MeshBasicMaterial({
          map: tex,
          transparent: true,
          depthWrite: false,
        }),
      );
    };
    const add = (
      x: number,
      z: number,
      w: number,
      d: number,
      name: string,
      along: "x" | "z",
    ) => {
      const strip = new THREE.Mesh(new THREE.PlaneGeometry(w, d), road);
      strip.rotation.x = -Math.PI / 2;
      strip.position.set(x, 0.01, z);
      strip.receiveShadow = true;
      const text = label(name, 40);
      text.rotation.x = -Math.PI / 2;
      if (along === "z") text.rotation.z = Math.PI / 2;
      text.position.set(x, 0.03, z);
      g.add(strip, text);
    };
    add(-62, 0, 12, 230, "Bloor St W", "z"); // south of the building
    add(0, 36, 150, 9, "Bedford Rd", "x"); // east of the building
    return g;
  }

  /** A pole with a pennant, marking a building entrance. */
  private flag(
    x: number,
    z: number,
    y: number,
    mat: <T extends THREE.Material>(m: T) => T,
  ) {
    const g = new THREE.Group();
    const poleH = 2 * LEVEL_GAP + 1.5; // clears the double-height ground-floor walls
    const pole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.09, 0.09, poleH, 10),
      mat(new THREE.MeshStandardMaterial({ color: INK, roughness: 0.6 })),
    );
    pole.position.y = y + poleH / 2;
    const s = new THREE.Shape();
    s.moveTo(0, 0);
    s.lineTo(1.9, -0.6);
    s.lineTo(0, -1.2);
    s.closePath();
    const pennant = new THREE.Mesh(
      new THREE.ShapeGeometry(s),
      mat(
        new THREE.MeshStandardMaterial({
          color: ENTRANCE,
          roughness: 0.7,
          side: THREE.DoubleSide,
        }),
      ),
    );
    pennant.position.y = y + poleH;
    const base = new THREE.Mesh(
      new THREE.CylinderGeometry(0.9, 0.9, 0.1, 28),
      mat(new THREE.MeshStandardMaterial({ color: ENTRANCE, roughness: 0.7 })),
    );
    base.position.y = y + 0.06;
    g.add(pole, pennant, base);
    g.position.set(x, 0, z);
    g.traverse((o) => (o.castShadow = true));
    return g;
  }

  /** Raked lecture-hall seating, a stage and a screen for G-162. */
  private auditorium(mat: <T extends THREE.Material>(m: T) => T) {
    const A = AUDITORIUM;
    const g = new THREE.Group();
    const floor = SLAB + 0.01;
    const rowGap = 0.95,
      seatGap = 0.56,
      rise = 0.14;
    const midZ = (A.z0 + A.z1) / 2;
    const seats: THREE.Matrix4[] = [];
    const backs: THREE.Matrix4[] = [];
    const rows = Math.floor((A.x1 - A.x0) / rowGap);
    const riserMat = mat(
      new THREE.MeshStandardMaterial({ color: BUILDING, roughness: 0.95 }),
    );
    for (let r = 0; r < rows; r++) {
      const x = A.x1 - r * rowGap; // row 0 is closest to the stage
      const h = r * rise;
      if (h > 0) {
        const riser = new THREE.Mesh(
          new THREE.BoxGeometry(rowGap, h, A.z1 - A.z0),
          riserMat,
        );
        riser.position.set(x, floor + h / 2, midZ);
        g.add(riser);
      }
      for (let z = A.z0 + 0.5; z <= A.z1 - 0.5; z += seatGap) {
        if (Math.abs(z - midZ) < 0.65) continue; // centre aisle
        if (A.columns.some(([cx, cz]) => Math.hypot(cx - x, cz - z) < 0.8))
          continue;
        seats.push(new THREE.Matrix4().makeTranslation(x, floor + h + 0.45, z));
        backs.push(
          new THREE.Matrix4().makeTranslation(x - 0.24, floor + h + 0.72, z),
        );
      }
    }
    const chairMat = mat(
      new THREE.MeshStandardMaterial({ color: INK, roughness: 0.7 }),
    );
    const seatMesh = new THREE.InstancedMesh(
      new THREE.BoxGeometry(0.42, 0.08, 0.46),
      chairMat,
      seats.length,
    );
    const backMesh = new THREE.InstancedMesh(
      new THREE.BoxGeometry(0.06, 0.5, 0.46),
      chairMat,
      backs.length,
    );
    seats.forEach((m, i) => seatMesh.setMatrixAt(i, m));
    backs.forEach((m, i) => backMesh.setMatrixAt(i, m));
    const stage = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.6, 11), riserMat);
    stage.position.set(A.stageX + 1.3, floor + 0.3, midZ);
    const lectern = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 1.1, 0.6),
      chairMat,
    );
    lectern.position.set(A.stageX + 0.9, floor + 0.6 + 0.55, midZ - 3);
    const screen = new THREE.Mesh(
      new THREE.PlaneGeometry(8, 2.2),
      mat(
        new THREE.MeshBasicMaterial({
          color: 0x2b2424,
          side: THREE.DoubleSide,
        }),
      ),
    );
    screen.rotation.y = -Math.PI / 2;
    screen.position.set(A.stageX + 2.9, floor + 2.0, midZ);
    g.add(seatMesh, backMesh, stage, lectern, screen);
    g.traverse((o) => (o.castShadow = o.receiveShadow = true));
    return g;
  }

  /** Show one floor (floors above it are lifted away), or the whole building with `null`. */
  setFocus(key: string | null, moveCamera = true) {
    this.focus = key;
    const idx = key ? LEVELS.findIndex((l) => l.key === key) : -1;
    this.levels.forEach((lv) => {
      const i = LEVELS.indexOf(lv.info);
      if (idx < 0) [lv.targetOpacity, lv.targetLift] = [1, 0];
      else if (i > idx) [lv.targetOpacity, lv.targetLift] = [0, 25];
      else if (i < idx) [lv.targetOpacity, lv.targetLift] = [0.3, 0];
      else [lv.targetOpacity, lv.targetLift] = [1, 0];
    });
    if (!moveCamera) return;
    if (idx < 0) this.flyTo(OVERVIEW.target.clone(), OVERVIEW.pos.clone());
    else {
      const y = this.byKey.get(key!)!.baseY;
      this.flyTo(new THREE.Vector3(0, y, 0), new THREE.Vector3(30, y + 85, 95));
    }
  }

  private roomMarker(room: RoomData, g: THREE.Group) {
    const top = SLAB + 0.02;
    const gold = new THREE.Color(GOLD);
    if (room.poly) {
      g.add(
        new THREE.Mesh(
          flatShape(room.poly, top + 0.09),
          new THREE.MeshBasicMaterial({
            color: gold,
            transparent: true,
            opacity: 0.6,
            depthWrite: false,
          }),
        ),
      );
      const vol = extruded([room.poly], WALL_H, top);
      g.add(
        new THREE.Mesh(
          vol,
          new THREE.MeshBasicMaterial({
            color: gold,
            transparent: true,
            opacity: 0.16,
            depthWrite: false,
            side: THREE.DoubleSide,
          }),
        ),
      );
      g.add(
        new THREE.LineSegments(
          new THREE.EdgesGeometry(vol),
          new THREE.LineBasicMaterial({ color: gold }),
        ),
      );
    } else {
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(1.4, 2.2, 48),
        new THREE.MeshBasicMaterial({
          color: gold,
          transparent: true,
          opacity: 0.8,
          side: THREE.DoubleSide,
        }),
      );
      ring.rotation.x = -Math.PI / 2;
      ring.position.set(room.x, top + 0.09, room.z);
      g.add(ring);
    }
  }

  private cone(color: number, x: number, z: number) {
    const c = new THREE.Mesh(
      new THREE.ConeGeometry(0.9, 2.2, 24),
      new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.35,
      }),
    );
    c.rotation.x = Math.PI;
    c.position.set(x, SLAB + WALL_H + 2, z);
    c.userData.baseY = c.position.y;
    this.bobbers.push(c);
    return c;
  }

  /** Highlight one or more rooms on a floor and fly to them. Returns false when none are known. */
  selectRooms(levelKey: string, roomIds: string[], label: string) {
    const lv = this.byKey.get(levelKey);
    const rooms = roomIds
      .map((id) => this.findRoom(levelKey, id))
      .filter((r): r is RoomData => !!r);
    if (!lv || !rooms.length) return false;
    this.clearSelection();
    this.setFocus(levelKey, false);
    const g = new THREE.Group();
    rooms.forEach((r) => this.roomMarker(r, g));
    const cx = rooms.reduce((s, r) => s + r.x, 0) / rooms.length;
    const cz = rooms.reduce((s, r) => s + r.z, 0) / rooms.length;
    g.add(this.cone(GOLD, cx, cz));
    lv.group.add(g);
    this.highlight = g;
    this.anchors = [
      {
        id: "sel",
        label,
        tone: "gold",
        level: levelKey,
        pos: new THREE.Vector3(cx, SLAB + WALL_H + 3.6, cz),
      },
    ];
    const target = new THREE.Vector3(cx, lv.baseY, cz);
    const dir = this.camera.position.clone().sub(this.controls.target).setY(0);
    if (dir.lengthSq() < 1) dir.set(0, 0, 1);
    dir.normalize().multiplyScalar(40);
    this.flyTo(target, target.clone().add(new THREE.Vector3(dir.x, 46, dir.z)));
    return true;
  }

  /** Load a walking route. It is shown one step at a time: each floor on its own, plus the ride between floors. */
  showRoute(route: RouteDraw) {
    this.clearSelection();
    this.route = route;
    const lineY = SLAB + 0.45;
    const tubeMat = (color: number) =>
      new THREE.MeshBasicMaterial({
        color,
        depthTest: false,
        transparent: true,
      });
    const connColor = route.via?.type === "stairs" ? STAIRS : ELEVATOR;
    route.legs.forEach((leg, li) => {
      const lv = this.byKey.get(leg.level)!;
      const g = new THREE.Group();
      const pts = leg.points.map(([x, z]) => new THREE.Vector3(x, lineY, z));
      const path = new THREE.CurvePath<THREE.Vector3>();
      for (let i = 1; i < pts.length; i++)
        if (pts[i].distanceToSquared(pts[i - 1]) > 1e-4)
          path.add(new THREE.LineCurve3(pts[i - 1], pts[i]));
      if (path.curves.length) {
        const tube = new THREE.Mesh(
          new THREE.TubeGeometry(
            path,
            Math.max(32, path.curves.length * 8),
            0.24,
            8,
            false,
          ),
          tubeMat(GOLD),
        );
        tube.renderOrder = 10;
        g.add(tube);
      }
      const first = pts[0],
        last = pts[pts.length - 1];
      if (li === 0) {
        const dot = new THREE.Mesh(
          new THREE.CylinderGeometry(1.1, 1.1, 0.12, 32),
          tubeMat(INK),
        );
        dot.position.copy(first);
        dot.renderOrder = 11;
        g.add(dot);
      }
      if (li === route.legs.length - 1) {
        const c = this.cone(GOLD, last.x, last.z);
        (c.material as THREE.Material).depthTest = false;
        c.renderOrder = 12;
        g.add(c);
      }
      if (route.via) {
        // pulsing ring where you enter / leave the elevator or stairs on this floor
        const ring = new THREE.Mesh(
          new THREE.RingGeometry(1.3, 1.9, 40),
          new THREE.MeshBasicMaterial({
            color: connColor,
            depthTest: false,
            transparent: true,
            side: THREE.DoubleSide,
          }),
        );
        ring.rotation.x = -Math.PI / 2;
        ring.position.set(route.via.x, lineY, route.via.z);
        ring.renderOrder = 11;
        ring.userData.pulse = true;
        g.add(ring);
      }
      lv.group.add(g);
      this.routeLegs.push({ group: g, level: leg.level, pts });
    });
    if (route.via) {
      const ya = this.byKey.get(route.via.from)!.baseY + lineY;
      const yb = this.byKey.get(route.via.to)!.baseY + lineY;
      const a = new THREE.Vector3(route.via.x, ya, route.via.z),
        b = new THREE.Vector3(route.via.x, yb, route.via.z);
      const ride = new THREE.Mesh(
        new THREE.TubeGeometry(new THREE.LineCurve3(a, b), 16, 0.45, 12, false),
        tubeMat(connColor),
      );
      ride.renderOrder = 10;
      this.scene.add(ride);
      this.rideObj = ride;
    }
    const runner = new THREE.Mesh(
      new THREE.SphereGeometry(0.55, 20, 14),
      tubeMat(0xffffff),
    );
    runner.renderOrder = 13;
    this.scene.add(runner);
    this.runner = runner;
    return route.via ? 3 : 1;
  }

  /** Show step `i` of the loaded route: 0 = first floor, 1 = ride (multi-floor only), 2 = last floor. */
  showRouteStep(i: number) {
    const route = this.route;
    if (!route) return;
    const via = route.via;
    const keys = LEVELS.map((l) => l.key);
    const ride = !!via && i === 1;
    const legIdx = via ? (i === 0 ? 0 : 1) : 0;
    const connName = via?.type === "stairs" ? "Stairs" : "Elevator";
    const connTone = via?.type === "stairs" ? "stairs" : "elevator";
    const lineY = SLAB + 0.45;
    if (this.rideObj) this.rideObj.visible = ride;
    this.routeLegs.forEach(
      (l, li) => (l.group.visible = ride || li === legIdx),
    );

    if (ride && via) {
      const ia = keys.indexOf(via.from),
        ib = keys.indexOf(via.to);
      const hi = Math.max(ia, ib);
      this.focus = null;
      this.levels.forEach((lv) => {
        const k = keys.indexOf(lv.info.key);
        if (k > hi) [lv.targetOpacity, lv.targetLift] = [0, 25];
        else if (k === ia || k === ib)
          [lv.targetOpacity, lv.targetLift] = [0.45, 0];
        else [lv.targetOpacity, lv.targetLift] = [0.1, 0];
      });
      const ya = this.byKey.get(via.from)!.baseY + lineY,
        yb = this.byKey.get(via.to)!.baseY + lineY;
      this.runnerPath = [
        new THREE.Vector3(via.x, ya, via.z),
        new THREE.Vector3(via.x, yb, via.z),
      ];
      this.anchors = [
        {
          id: "from",
          label: this.levelLabel(via.from),
          tone: "ink",
          level: via.from,
          pos: new THREE.Vector3(via.x, lineY + 1.6, via.z),
        },
        {
          id: "to",
          label: this.levelLabel(via.to),
          tone: connTone,
          level: via.to,
          pos: new THREE.Vector3(via.x, lineY + 1.6, via.z),
        },
      ];
      const h = Math.abs(ya - yb);
      const c = new THREE.Vector3(via.x, (ya + yb) / 2, via.z);
      const d = Math.max(55, h * 2.2);
      this.flyTo(
        c,
        c.clone().add(new THREE.Vector3(d * 0.75, d * 0.35, d * 0.75)),
      );
      return;
    }

    const leg = this.routeLegs[legIdx];
    const idx = keys.indexOf(leg.level);
    this.focus = leg.level;
    this.levels.forEach((lv) => {
      const k = keys.indexOf(lv.info.key);
      if (k > idx) [lv.targetOpacity, lv.targetLift] = [0, 25];
      else if (k === idx) [lv.targetOpacity, lv.targetLift] = [1, 0];
      else [lv.targetOpacity, lv.targetLift] = [0.25, 0];
    });
    const base = this.byKey.get(leg.level)!.baseY;
    this.runnerPath = leg.pts.map((p) => p.clone().setY(base + lineY));
    const first = leg.pts[0],
      last = leg.pts[leg.pts.length - 1];
    const anchors: PinAnchor[] = [];
    if (legIdx === 0)
      anchors.push({
        id: "start",
        label: route.startLabel,
        tone: "ink",
        level: leg.level,
        pos: new THREE.Vector3(first.x, lineY + 2.2, first.z),
      });
    else if (via)
      anchors.push({
        id: "conn",
        label: `Exit ${connName.toLowerCase()} here`,
        tone: connTone,
        level: leg.level,
        pos: new THREE.Vector3(first.x, lineY + 2.2, first.z),
      });
    if (legIdx === route.legs.length - 1)
      anchors.push({
        id: "end",
        label: route.endLabel,
        tone: "gold",
        level: leg.level,
        pos: new THREE.Vector3(last.x, lineY + WALL_H + 2.4, last.z),
      });
    else if (via) {
      const up = keys.indexOf(via.to) > keys.indexOf(via.from);
      anchors.push({
        id: "conn",
        label: `${connName} ${up ? "up" : "down"} to ${this.levelLabel(via.to)}`,
        tone: connTone,
        level: leg.level,
        pos: new THREE.Vector3(last.x, lineY + 2.2, last.z),
      });
    }
    this.anchors = anchors;
    const xs = leg.pts.map((p) => p.x),
      zs = leg.pts.map((p) => p.z);
    const c = new THREE.Vector3(
      (Math.min(...xs) + Math.max(...xs)) / 2,
      base,
      (Math.min(...zs) + Math.max(...zs)) / 2,
    );
    const span = Math.max(
      30,
      Math.max(...xs) - Math.min(...xs),
      Math.max(...zs) - Math.min(...zs),
    );
    this.flyTo(
      c,
      c.clone().add(new THREE.Vector3(span * 0.35, span * 1.5, span * 1.25)),
    );
  }

  private levelLabel(key: string) {
    return LEVELS.find((l) => l.key === key)?.name ?? `Floor ${key}`;
  }

  findRoom(levelKey: string, roomId: string) {
    return this.byKey.get(levelKey)?.rooms.find((r) => r.id === roomId);
  }

  clearSelection() {
    if (this.highlight) {
      this.highlight.parent?.remove(this.highlight);
      disposeTree(this.highlight);
    }
    for (const l of this.routeLegs) {
      l.group.parent?.remove(l.group);
      disposeTree(l.group);
    }
    for (const o of [this.rideObj, this.runner]) {
      if (!o) continue;
      this.scene.remove(o);
      disposeTree(o);
    }
    this.highlight = null;
    this.route = null;
    this.routeLegs = [];
    this.rideObj = null;
    this.runner = null;
    this.runnerPath = [];
    this.bobbers = [];
    this.anchors = [];
    this.opts.onPins?.([]);
  }

  resetView() {
    this.clearSelection();
    this.setFocus(null);
  }

  private flyTo(target: THREE.Vector3, pos: THREE.Vector3) {
    this.fly = {
      from: this.camera.position.clone(),
      to: pos,
      tFrom: this.controls.target.clone(),
      tTo: target,
      t: 0,
    };
  }

  private setPointer(e: PointerEvent) {
    const r = this.renderer.domElement.getBoundingClientRect();
    this.pointer.set(
      ((e.clientX - r.left) / r.width) * 2 - 1,
      -((e.clientY - r.top) / r.height) * 2 + 1,
    );
    this.raycaster.setFromCamera(this.pointer, this.camera);
  }

  private pickRoom() {
    if (!this.focus) return null;
    const lv = this.byKey.get(this.focus);
    if (!lv || lv.opacity < 0.9) return null;
    const hit = this.raycaster.intersectObjects(lv.picks, false)[0];
    return hit
      ? (hit.object.userData as { level: string; roomId: string })
      : null;
  }

  private onDown = (e: PointerEvent) => {
    this.downAt = { x: e.clientX, y: e.clientY };
  };

  private onUp = (e: PointerEvent) => {
    // fingers wobble more than a mouse, so taps get a little more slack
    const slack = e.pointerType === "touch" ? 12 : 5;
    if (
      !this.downAt ||
      Math.hypot(e.clientX - this.downAt.x, e.clientY - this.downAt.y) > slack
    )
      return;
    this.downAt = null;
    this.setPointer(e);
    const room = this.pickRoom();
    if (room) return this.opts.onRoomClick?.(room.level, room.roomId);
    if (!this.focus) {
      // Pick the topmost slab under the cursor
      const slabs = this.levels
        .filter((l) => l.slabMesh && !l.info.ghostOf)
        .map((l) => l.slabMesh!);
      const hit = this.raycaster.intersectObjects(slabs, false)[0];
      const lv = hit && this.levels.find((l) => l.slabMesh === hit.object);
      if (lv) this.opts.onLevelClick?.(lv.info.key);
    }
  };

  private onMove = (e: PointerEvent) => {
    if (!this.opts.onHover || e.buttons) return;
    this.setPointer(e);
    const room = this.pickRoom();
    const r = this.renderer.domElement.getBoundingClientRect();
    this.renderer.domElement.style.cursor = room ? "pointer" : "";
    this.opts.onHover(
      room ? { ...room, x: e.clientX - r.left, y: e.clientY - r.top } : null,
    );
  };

  private onLeave = () => this.opts.onHover?.(null);

  private resize() {
    const w = this.container.clientWidth,
      h = this.container.clientHeight;
    if (!w || !h) return;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }

  private loop = () => {
    this.raf = requestAnimationFrame(this.loop);
    const dt = Math.min(this.clock.getDelta(), 0.05);
    const k = 1 - Math.pow(0.0015, dt);
    for (const lv of this.levels) {
      lv.opacity += (lv.targetOpacity - lv.opacity) * k;
      lv.lift += (lv.targetLift - lv.lift) * k;
      lv.group.position.y = lv.baseY + lv.lift;
      lv.group.visible = lv.opacity > 0.02;
      if (lv.shell) lv.shell.visible = this.focus === null && !this.route;
      for (const m of lv.materials) {
        m.opacity = (lv.baseOpacity.get(m) ?? 1) * lv.opacity;
        // keep depth ordering correct for fully opaque floors
        const solid = lv.opacity > 0.98 && (lv.baseOpacity.get(m) ?? 1) >= 1;
        if (m.transparent === solid) {
          m.transparent = !solid;
          // layers built without depth writes (the room tints) must keep them off
          m.depthWrite = solid && m.userData.depthWrite !== false;
          m.needsUpdate = true;
        }
      }
    }
    if (this.fly) {
      this.fly.t = Math.min(1, this.fly.t + dt / 1.1);
      const e = 1 - Math.pow(1 - this.fly.t, 3);
      this.camera.position.lerpVectors(this.fly.from, this.fly.to, e);
      this.controls.target.lerpVectors(this.fly.tFrom, this.fly.tTo, e);
      if (this.fly.t >= 1) this.fly = null;
    }
    const t = this.clock.elapsedTime;
    for (const b of this.bobbers)
      b.position.y = b.userData.baseY + Math.sin(t * 3) * 0.4;
    if (this.runner && this.runnerPath.length > 1) {
      const p = this.runnerPath;
      let len = 0;
      for (let i = 1; i < p.length; i++) len += p[i].distanceTo(p[i - 1]);
      let s = (t * 12) % Math.max(len, 0.01);
      for (let i = 1; i < p.length; i++) {
        const d = p[i].distanceTo(p[i - 1]);
        if (s <= d || i === p.length - 1) {
          this.runner.position.lerpVectors(
            p[i - 1],
            p[i],
            d ? Math.min(1, s / d) : 0,
          );
          break;
        }
        s -= d;
      }
    }
    for (const l of this.routeLegs)
      l.group.traverse((o) => {
        if (o.userData.pulse) o.scale.setScalar(1 + 0.25 * Math.sin(t * 4));
      });
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    if (this.opts.onPins && this.anchors.length) {
      const r = this.renderer.domElement;
      this.opts.onPins(
        this.anchors.map((a) => {
          const lv = this.byKey.get(a.level)!;
          const p = a.pos
            .clone()
            .add(new THREE.Vector3(0, lv.group.position.y, 0))
            .project(this.camera);
          return {
            id: a.id,
            label: a.label,
            tone: a.tone,
            x: ((p.x + 1) / 2) * r.clientWidth,
            y: ((1 - p.y) / 2) * r.clientHeight,
            visible: p.z < 1,
          };
        }),
      );
    }
  };

  dispose() {
    cancelAnimationFrame(this.raf);
    this.ro.disconnect();
    const el = this.renderer.domElement;
    el.removeEventListener("pointerdown", this.onDown);
    el.removeEventListener("pointerup", this.onUp);
    el.removeEventListener("pointermove", this.onMove);
    el.removeEventListener("pointerleave", this.onLeave);
    this.controls.dispose();
    disposeTree(this.scene);
    this.renderer.dispose();
    el.remove();
  }
}

import { LEVELS, type BuildingData } from "./oiseViewer";
import { OPEN_AREAS } from "./locations";

// Walking directions over per-floor grids generated from the floor plans.
// Grid cells: 0 = off the floor plate, 1 = open floor, 2 = wall/fixture (allowed, but expensive,
// so gaps in the drawings never strand a room). Corridors ("…K"), elevators ("…E") and stairs ("…S")
// are cheapest, unlabelled floor costs a little more, and other people's rooms are expensive.
export type Mode = "elevator" | "stairs";

export interface RouteLeg {
  level: string;
  points: [number, number][];
  length: number;
}

export interface Route {
  legs: RouteLeg[];
  via?: { type: Mode; x: number; z: number; from: string; to: string };
  length: number;
  // set when the requested mode had no connector serving both floors
  fellBackToElevator?: boolean;
}

const WALL_COST = 30;
const ROOM_COST = 15;
const OPEN_COST = 3;
const PASSAGE = /\d[KES]$/;

export interface Endpoint {
  level: string;
  x: number;
  z: number;
  // rooms the route may cross freely (the ones you start or end in)
  rooms?: string[];
}

class Grid {
  cells: Uint8Array;
  // index into `roomIds` of the room covering each cell, or -1
  room: Int16Array;
  roomIds: string[] = [];
  passage: boolean[] = [];
  // per-route, by room index: 1 for rooms other than the start/end ones
  blocked = new Uint8Array(0);
  constructor(
    runs: number[],
    readonly w: number,
    readonly h: number,
  ) {
    this.cells = new Uint8Array(w * h);
    let i = 0;
    for (let r = 0; r < runs.length; r += 2) {
      this.cells.fill(runs[r], i, i + runs[r + 1]);
      i += runs[r + 1];
    }
    this.room = new Int16Array(w * h).fill(-1);
  }

  cost(j: number) {
    if (this.cells[j] === 2) return WALL_COST;
    const r = this.room[j];
    if (r < 0) return OPEN_COST;
    return this.blocked[r] ? ROOM_COST : 1;
  }

  walkable(j: number) {
    const r = this.room[j];
    return this.cells[j] === 1 && (r < 0 || !this.blocked[r]);
  }
}

class MinHeap {
  private k: number[] = [];
  private v: number[] = [];
  get size() {
    return this.k.length;
  }
  push(key: number, val: number) {
    const k = this.k,
      v = this.v;
    let i = k.length;
    k.push(key);
    v.push(val);
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (k[p] <= key) break;
      k[i] = k[p];
      v[i] = v[p];
      i = p;
    }
    k[i] = key;
    v[i] = val;
  }
  /** Key of the entry the last pop() returned. */
  key = 0;
  pop() {
    const k = this.k,
      v = this.v;
    this.key = k[0];
    const top = v[0];
    const lk = k.pop()!,
      lv = v.pop()!;
    const n = k.length;
    if (n) {
      let i = 0;
      for (;;) {
        let c = 2 * i + 1;
        if (c >= n) break;
        if (c + 1 < n && k[c + 1] < k[c]) c++;
        if (k[c] >= lk) break;
        k[i] = k[c];
        v[i] = v[c];
        i = c;
      }
      k[i] = lk;
      v[i] = lv;
    }
    return top;
  }
}

const NB = [
  [1, 0, 1],
  [-1, 0, 1],
  [0, 1, 1],
  [0, -1, 1],
  [1, 1, Math.SQRT2],
  [1, -1, Math.SQRT2],
  [-1, 1, Math.SQRT2],
  [-1, -1, Math.SQRT2],
];

export class Router {
  private grids = new Map<string, Grid>();
  private nav: { x0: number; z0: number; res: number; w: number; h: number };
  private elevators: { x: number; z: number }[];
  private stairs: { x: number; z: number; from: string; to: string }[];

  constructor(private data: BuildingData) {
    this.nav = data.nav;
    this.elevators = data.connectors.elevators;
    this.stairs = data.connectors.stairs;
  }

  private grid(level: string) {
    let g = this.grids.get(level);
    if (!g) {
      g = new Grid(this.data.levels[level].nav, this.nav.w, this.nav.h);
      const { x0, z0, res, w, h } = this.nav;
      // passages last, so they win where outlines overlap
      const rooms = [...this.data.levels[level].rooms].sort(
        (p, q) => +PASSAGE.test(p.id) - +PASSAGE.test(q.id),
      );
      for (const r of rooms) {
        if (!r.poly) continue;
        const idx = g.roomIds.push(r.id) - 1;
        g.passage.push(PASSAGE.test(r.id) || OPEN_AREAS.has(r.id));
        // scanline fill: cells whose centre lies inside the outline (even-odd rule)
        const poly = r.poly;
        let zMin = Infinity,
          zMax = -Infinity;
        for (const [, z] of poly)
          [zMin, zMax] = [Math.min(zMin, z), Math.max(zMax, z)];
        const cy0 = Math.max(0, Math.floor((zMin - z0) / res)),
          cy1 = Math.min(h - 1, Math.ceil((zMax - z0) / res));
        const xs: number[] = [];
        for (let cy = cy0; cy <= cy1; cy++) {
          const z = z0 + (cy + 0.5) * res;
          xs.length = 0;
          for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
            const [xi, zi] = poly[i],
              [xj, zj] = poly[j];
            if (zi > z !== zj > z)
              xs.push(xi + ((z - zi) * (xj - xi)) / (zj - zi));
          }
          xs.sort((p, q) => p - q);
          for (let k = 0; k + 1 < xs.length; k += 2) {
            const c0 = Math.max(0, Math.ceil((xs[k] - x0) / res - 0.5)),
              c1 = Math.min(w - 1, Math.ceil((xs[k + 1] - x0) / res - 0.5) - 1);
            if (c1 >= c0) g.room.fill(idx, cy * w + c0, cy * w + c1 + 1);
          }
        }
      }
      g.blocked = new Uint8Array(g.roomIds.length);
      this.grids.set(level, g);
    }
    return g;
  }

  private cellOf(x: number, z: number) {
    return [
      Math.floor((x - this.nav.x0) / this.nav.res),
      Math.floor((z - this.nav.z0) / this.nav.res),
    ];
  }

  private pointOf(idx: number): [number, number] {
    const { w, res, x0, z0 } = this.nav;
    return [
      x0 + ((idx % w) + 0.5) * res,
      z0 + (Math.floor(idx / w) + 0.5) * res,
    ];
  }

  /** Penalise every room except the ones either end of the route is in. */
  private block(g: Grid, ends: Endpoint[]) {
    const free = new Set(ends.flatMap((e) => e.rooms ?? []));
    for (const e of ends) {
      const [cx, cy] = this.cellOf(e.x, e.z);
      if (cx >= 0 && cy >= 0 && cx < g.w && cy < g.h) {
        const r = g.room[cy * g.w + cx];
        if (r >= 0) free.add(g.roomIds[r]);
      }
    }
    g.roomIds.forEach(
      (id, i) => (g.blocked[i] = free.has(id) || g.passage[i] ? 0 : 1),
    );
  }

  /** Closest open-floor cell to a point (rooms' label points can sit on a drawn line). */
  private snap(g: Grid, x: number, z: number) {
    const [cx, cy] = this.cellOf(x, z);
    for (let r = 0; r < 60; r++)
      for (let dy = -r; dy <= r; dy++)
        for (let dx = -r; dx <= r; dx++) {
          if (Math.max(Math.abs(dx), Math.abs(dy)) !== r) continue;
          const px = cx + dx,
            py = cy + dy;
          if (
            px >= 0 &&
            py >= 0 &&
            px < g.w &&
            py < g.h &&
            g.cells[py * g.w + px] === 1
          )
            return py * g.w + px;
        }
    return -1;
  }

  /** Shortest paths from `start`; stops once every cell in `targets` is settled. */
  private dijkstra(g: Grid, start: number, targets: number[]) {
    const dist = new Float64Array(g.w * g.h).fill(Infinity);
    const prev = new Int32Array(g.w * g.h).fill(-1);
    const heap = new MinHeap();
    const left = new Set(targets);
    dist[start] = 0;
    heap.push(0, start);
    while (heap.size && left.size) {
      const i = heap.pop(),
        d = heap.key;
      if (d > dist[i]) continue;
      left.delete(i);
      const x = i % g.w,
        y = (i / g.w) | 0;
      for (const [dx, dy, step] of NB) {
        const nx = x + dx,
          ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= g.w || ny >= g.h) continue;
        const j = ny * g.w + nx;
        if (!g.cells[j]) continue;
        // no squeezing diagonally between wall cells (walls are one cell thick)
        if (
          dx &&
          dy &&
          (g.cells[y * g.w + nx] !== 1 || g.cells[ny * g.w + x] !== 1)
        )
          continue;
        const nd = d + step * g.cost(j);
        if (nd < dist[j]) {
          dist[j] = nd;
          prev[j] = i;
          heap.push(nd, j);
        }
      }
    }
    return { dist, prev };
  }

  private trace(prev: Int32Array, end: number) {
    const out: number[] = [];
    for (let i = end; i >= 0; i = prev[i]) out.push(i);
    return out.reverse();
  }

  private clear(g: Grid, a: number, b: number) {
    const ax = a % g.w,
      ay = (a / g.w) | 0,
      bx = b % g.w,
      by = (b / g.w) | 0;
    const n = Math.ceil(Math.hypot(bx - ax, by - ay) * 4);
    let px = ax,
      py = ay;
    for (let s = 0; s <= n; s++) {
      const x = Math.round(ax + ((bx - ax) * s) / n),
        y = Math.round(ay + ((by - ay) * s) / n);
      if (!g.walkable(y * g.w + x)) return false;
      // a diagonal step must also clear both cells it cuts between
      if (
        x !== px &&
        y !== py &&
        (!g.walkable(py * g.w + x) || !g.walkable(y * g.w + px))
      )
        return false;
      px = x;
      py = y;
    }
    return true;
  }

  /** Straighten a grid path by skipping corners that have a clear line of sight. */
  private smooth(g: Grid, path: number[]): [number, number][] {
    if (path.length < 3) return path.map((i) => this.pointOf(i));
    const keep = [path[0]];
    let i = 0;
    while (i < path.length - 1) {
      let j = path.length - 1;
      while (j > i + 1 && !this.clear(g, path[i], path[j])) j--;
      keep.push(path[j]);
      i = j;
    }
    return keep.map((k) => this.pointOf(k));
  }

  private leg(
    level: string,
    g: Grid,
    prev: Int32Array,
    from: number,
    to: number,
    reverse = false,
  ): RouteLeg {
    let cells = this.trace(prev, to);
    if (cells[0] !== from) cells = [from, to];
    if (reverse) cells.reverse();
    const points = this.smooth(g, cells);
    let length = 0;
    for (let k = 1; k < points.length; k++)
      length += Math.hypot(
        points[k][0] - points[k - 1][0],
        points[k][1] - points[k - 1][1],
      );
    return { level, points, length };
  }

  route(a: Endpoint, b: Endpoint, mode: Mode): Route | null {
    if (
      !this.data.levels[a.level]?.nav ||
      !this.data.levels[b.level]?.nav ||
      a.level === "M" ||
      b.level === "M"
    )
      return null;
    const ga = this.grid(a.level),
      gb = this.grid(b.level);
    const sa = this.snap(ga, a.x, a.z),
      sb = this.snap(gb, b.x, b.z);
    if (sa < 0 || sb < 0) return null;
    this.block(ga, [a, b]);
    if (gb !== ga) this.block(gb, [a, b]);

    if (a.level === b.level) {
      const leg = this.leg(
        a.level,
        ga,
        this.dijkstra(ga, sa, [sb]).prev,
        sa,
        sb,
      );
      return { legs: [leg], length: leg.length };
    }

    const order = LEVELS.map((l) => l.key);
    const ia = order.indexOf(a.level),
      ib = order.indexOf(b.level);
    const lo = Math.min(ia, ib),
      hi = Math.max(ia, ib);
    const pick = (type: Mode) =>
      (type === "elevator"
        ? this.elevators
        : this.stairs.filter(
            (s) => order.indexOf(s.from) <= lo && order.indexOf(s.to) >= hi,
          )
      ).map((c) => ({ ...c, type }));
    let fellBack = false;
    let candidates = pick(mode);
    if (!candidates.length) {
      candidates = pick("elevator");
      fellBack = mode !== "elevator";
    }
    const ends = candidates.map((c) => ({
      c,
      ca: this.snap(ga, c.x, c.z),
      cb: this.snap(gb, c.x, c.z),
    }));
    const usable = ends.filter((e) => e.ca >= 0 && e.cb >= 0);
    const fromA = this.dijkstra(
      ga,
      sa,
      usable.map((e) => e.ca),
    );
    const fromB = this.dijkstra(
      gb,
      sb,
      usable.map((e) => e.cb),
    );
    let best: {
      c: (typeof candidates)[number];
      ca: number;
      cb: number;
      cost: number;
    } | null = null;
    for (const { c, ca, cb } of usable) {
      const cost = fromA.dist[ca] + fromB.dist[cb];
      if (!best || cost < best.cost) best = { c, ca, cb, cost };
    }
    if (!best) return null;
    const legA = this.leg(a.level, ga, fromA.prev, sa, best.ca);
    const legB = this.leg(b.level, gb, fromB.prev, sb, best.cb, true);
    return {
      legs: [legA, legB],
      via: {
        type: best.c.type,
        x: best.c.x,
        z: best.c.z,
        from: a.level,
        to: b.level,
      },
      length: legA.length + legB.length,
      fellBackToElevator: fellBack || undefined,
    };
  }
}

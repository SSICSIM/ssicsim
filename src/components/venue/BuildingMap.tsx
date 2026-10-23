"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUpDown,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Flag,
  Navigation,
  RotateCcw,
  X,
} from "lucide-react";
import { LEVELS, OiseViewer, type BuildingData, type Pin } from "./oiseViewer";
import { Router, type Mode, type Route } from "./routing";
import {
  USED_LEVELS,
  VENUE_LOCATIONS,
  levelOf,
  roomCode,
  walkingDirections,
} from "./locations";

interface Entry {
  key: string;
  label: string;
  sub: string;
  group: string;
  level: string;
  rooms: string[];
  note?: string;
  external?: { building: string; mapsQuery: string; short: string };
}

const levelName = (key: string) =>
  LEVELS.find((l) => l.key === key)?.name ?? `Floor ${key}`;
const LEGEND: {
  label: string;
  color?: string;
  line?: boolean;
  flag?: boolean;
}[] = [
  { label: "Committee & conference rooms", color: "#D8B445" },
  { label: "Hallways", color: "#F0D88F" },
  { label: "Rooms not in use", color: "#6E6A64" },
  { label: "Elevators", color: "#4F7CC4" },
  { label: "Stairs", color: "#4F9A6B" },
  { label: "Entrance", flag: true },
  { label: "Your route", color: "#A3841D", line: true },
];

/** A dropdown of places, grouped by section, styled like the search results. */
function LocationSelect({
  entries,
  value,
  onChange,
  placeholder,
  dot,
}: {
  entries: Entry[];
  value: Entry | null;
  onChange: (e: Entry) => void;
  placeholder: string;
  dot: string;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const list = useRef<HTMLUListElement>(null);
  const show = () => {
    setActive(
      Math.max(
        0,
        entries.findIndex((e) => e.key === value?.key),
      ),
    );
    setOpen(true);
  };
  const pick = (e: Entry) => {
    onChange(e);
    setOpen(false);
  };
  // keep the highlighted option in view while using the arrow keys (scrolls only the list,
  // not the page)
  useEffect(() => {
    const l = list.current;
    const el = l?.querySelector<HTMLElement>(`[data-i="${active}"]`);
    if (!open || !l || !el) return;
    if (el.offsetTop < l.scrollTop) l.scrollTop = el.offsetTop;
    else if (el.offsetTop + el.offsetHeight > l.scrollTop + l.clientHeight)
      l.scrollTop = el.offsetTop + el.offsetHeight - l.clientHeight;
  }, [open, active]);

  return (
    <div className="relative font-dm-sans">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={placeholder}
        onClick={() => (open ? setOpen(false) : show())}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            if (!open) return show();
            setActive((a) =>
              e.key === "ArrowDown"
                ? Math.min(a + 1, entries.length - 1)
                : Math.max(a - 1, 0),
            );
          } else if (e.key === "Enter" && open && entries[active]) {
            e.preventDefault();
            pick(entries[active]);
          } else if (e.key === "Escape") setOpen(false);
        }}
        className="w-full flex items-center gap-2 bg-white rounded-xl px-3 h-11 border border-black/10 focus:border-[#A3841D]/60 outline-none text-left"
      >
        <span
          className="w-3 h-3 rounded-full shrink-0"
          style={{ background: dot }}
        />
        <span
          className={`flex-1 min-w-0 truncate text-sm ${
            value ? "text-[#3C2C2C]" : "text-[#3C2C2C]/40"
          }`}
        >
          {value?.label ?? placeholder}
        </span>
        <ChevronDown
          size={16}
          className={`shrink-0 text-[#A3841D] transition ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <ul
          ref={list}
          role="listbox"
          className="modal-scrollbar absolute z-30 left-0 right-0 mt-1 max-h-80 overflow-y-auto bg-white rounded-xl shadow-lg border border-black/5 py-1"
        >
          {entries.map((e, i) => (
            <li
              key={e.key}
              role="option"
              aria-selected={e.key === value?.key}
              data-i={i}
            >
              {(i === 0 || entries[i - 1].group !== e.group) && (
                <div className="px-3 pt-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-[#A3841D]">
                  {e.group}
                </div>
              )}
              <div
                onMouseDown={(ev) => {
                  ev.preventDefault();
                  pick(e);
                }}
                onMouseEnter={() => setActive(i)}
                className={`px-3 py-2 cursor-pointer text-sm ${
                  i === active ? "bg-[#A3841D]/10" : ""
                }`}
              >
                <div
                  className={`leading-snug text-[#3C2C2C] ${
                    e.key === value?.key ? "font-bold" : "font-semibold"
                  }`}
                >
                  {e.label}
                </div>
                <div className="text-[#3C2C2C]/50 text-xs">{e.sub}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function BuildingMap() {
  const mount = useRef<HTMLDivElement>(null);
  const viewer = useRef<OiseViewer | null>(null);
  const [data, setData] = useState<BuildingData | null>(null);
  const [error, setError] = useState(false);
  const [focus, setFocus] = useState<string | null>(null);
  const [tab, setTab] = useState<"find" | "directions">("find");
  const [selected, setSelected] = useState<Entry | null>(null);
  const [from, setFrom] = useState<Entry | null>(null);
  const [to, setTo] = useState<Entry | null>(null);
  const [mode, setMode] = useState<Mode>("elevator");
  const [route, setRoute] = useState<Route | null>(null);
  const [routeError, setRouteError] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  // open on desktop, folded away on phones where it would cover the model
  const [legendOpen, setLegendOpen] = useState(
    () => typeof window !== "undefined" && window.innerWidth >= 640,
  );
  const [pins, setPins] = useState<Pin[]>([]);
  const [hover, setHover] = useState<{
    roomId: string;
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    fetch("/models/oise-floorplan.json")
      .then((r) => r.json())
      .then((d: BuildingData) => {
        // places with no outline in the floor plans get a small square at their position
        for (const l of VENUE_LOCATIONS) {
          const lv = l.point && d.levels[levelOf(l.rooms[0])];
          if (!lv || lv.rooms.some((r) => r.id === l.rooms[0])) continue;
          const { x, z } = l.point!;
          lv.rooms.push({
            id: l.rooms[0],
            x,
            z,
            poly: [
              [x - 0.8, z - 0.8],
              [x + 0.8, z - 0.8],
              [x + 0.8, z + 0.8],
              [x - 0.8, z + 0.8],
            ],
          });
        }
        setData(d);
      })
      .catch(() => setError(true));
  }, []);

  const router = useMemo(() => (data ? new Router(data) : null), [data]);

  const entries = useMemo<Entry[]>(() => {
    if (!data) return [];
    const named: Entry[] = VENUE_LOCATIONS.map((l) => ({
      key: l.name,
      label: l.name,
      sub: l.external
        ? `${l.rooms.join(", ")} · ${l.external.building}`
        : l.group === "Entrances"
          ? levelName("1")
          : `${l.rooms.map(roomCode).join(", ")} · ${levelName(levelOf(l.rooms[0]))}`,
      group: l.group,
      level: l.external ? "" : levelOf(l.rooms[0]),
      rooms: l.rooms,
      note: l.note,
      external: l.external,
    }));
    return named;
  }, [data]);
  const routable = useMemo(
    () => entries.filter((e) => !e.external && e.level !== "M"),
    [entries],
  );

  const entriesRef = useRef(entries);
  entriesRef.current = entries;
  const tabRef = useRef(tab);
  tabRef.current = tab;
  const fromRef = useRef(from);
  fromRef.current = from;

  useEffect(() => {
    if (!data || !mount.current) return;
    let v: OiseViewer;
    try {
      v = new OiseViewer(mount.current, data, {
        activeRooms: new Set(
          VENUE_LOCATIONS.filter((l) => !l.external).flatMap((l) => l.rooms),
        ),
        entrances: VENUE_LOCATIONS.filter((l) => l.group === "Entrances")
          .map((l) => data.levels["1"]?.rooms.find((r) => r.id === l.rooms[0]))
          .filter((r) => !!r),
        onPins: setPins,
        onHover: (h) =>
          setHover(
            h && USED_LEVELS.has(h.level)
              ? { roomId: h.roomId, x: h.x, y: h.y }
              : null,
          ),
        onLevelClick: (key) => {
          if (!USED_LEVELS.has(key)) return;
          setFocus(key);
          v.setFocus(key);
        },
        onRoomClick: (level, roomId) => {
          const e = entriesRef.current.find(
            (x) => x.level === level && x.rooms.includes(roomId),
          );
          if (!e) return;
          if (tabRef.current === "find") choose(e);
          // directions: first click sets the start, later clicks set the destination
          else if (!fromRef.current) setFrom(e);
          else setTo(e);
        },
      });
    } catch {
      // no WebGL (or it ran out of memory): search and step-by-step directions still work
      setError(true);
      return;
    }
    viewer.current = v;
    return () => {
      v.dispose();
      viewer.current = null;
    };
  }, [data]);

  function choose(e: Entry) {
    setSelected(e);
    setRoute(null);
    if (e.external) {
      viewer.current?.clearSelection();
      return;
    }
    if (viewer.current?.selectRooms(e.level, e.rooms, e.label))
      setFocus(e.level);
  }

  function center(e: Entry) {
    const rs = e.rooms
      .map((id) => data!.levels[e.level]?.rooms.find((r) => r.id === id))
      .filter((r) => !!r);
    if (!rs.length) return null;
    return {
      level: e.level,
      rooms: e.rooms,
      x: rs.reduce((s, r) => s + r.x, 0) / rs.length,
      z: rs.reduce((s, r) => s + r.z, 0) / rs.length,
    };
  }

  // Recompute directions whenever both ends (or the mode) change.
  useEffect(() => {
    if (tab !== "directions" || !router || !from || !to) return;
    setRouteError(null);
    const a = center(from),
      b = center(to);
    const r = a && b ? router.route(a, b, mode) : null;
    setRoute(r);
    if (!r) {
      setRouteError("Couldn't find a route between those two places.");
      return;
    }
    viewer.current?.showRoute({
      ...r,
      startLabel: from.label,
      endLabel: to.label,
    });
    goStep(0, r);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [from, to, mode, tab, router]);

  function goStep(i: number, r: Route | null = route) {
    if (!r) return;
    setStep(i);
    const legLevel = r.via
      ? i === 0
        ? r.legs[0].level
        : i === 2
          ? r.legs[1].level
          : null
      : r.legs[0].level;
    setFocus(legLevel);
    viewer.current?.showRouteStep(i);
  }

  function pickLevel(key: string | null) {
    setSelected(null);
    setRoute(null);
    viewer.current?.clearSelection();
    setFocus(key);
    viewer.current?.setFocus(key);
  }

  function reset() {
    setSelected(null);
    setRoute(null);
    setFocus(null);
    viewer.current?.resetView();
  }

  function switchTab(t: "find" | "directions") {
    setTab(t);
    setRoute(null);
    viewer.current?.clearSelection();
    if (t === "find" && selected && !selected.external) choose(selected);
  }

  const steps = useMemo(() => {
    if (!route || !from || !to) return [];
    const out: { text: string; level: string; points: [number, number][] }[] =
      [];
    const [first, last] = [route.legs[0], route.legs[route.legs.length - 1]];
    if (!route.via) {
      out.push({
        text: `On ${levelName(first.level)}, walk to ${to.label}.`,
        level: first.level,
        points: first.points,
      });
      return out;
    }
    const via = route.via.type === "elevator" ? "elevators" : "stairs";
    const up =
      LEVELS.findIndex((l) => l.key === route.via!.to) >
      LEVELS.findIndex((l) => l.key === route.via!.from);
    out.push({
      text: `From ${from.label} on ${levelName(first.level)}, walk to the ${via}.`,
      level: first.level,
      points: first.points,
    });
    out.push({
      text: `Take the ${via} ${up ? "up" : "down"} to ${levelName(route.via.to)}.`,
      level: route.via.to,
      points: [[route.via.x, route.via.z]],
    });
    out.push({
      text: `Walk to ${to.label}.`,
      level: last.level,
      points: last.points,
    });
    return out;
  }, [route, from, to]);

  const rail = [...LEVELS].reverse().filter((l) => USED_LEVELS.has(l.key));

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      {/* Floor selector */}
      <nav
        aria-label="Floors"
        className="order-2 lg:order-none flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-visible pb-1 lg:pb-0 shrink-0"
      >
        <button
          onClick={() => pickLevel(null)}
          className={`shrink-0 h-10 px-4 lg:px-0 lg:w-14 rounded-xl text-sm font-semibold font-dm-sans transition ${
            focus === null
              ? "bg-[#A3841D] text-white shadow"
              : "bg-white text-[#3C2C2C] hover:bg-[#A3841D]/10"
          }`}
        >
          All
        </button>
        {rail.map((l) => (
          <button
            key={l.key}
            onClick={() => pickLevel(l.key)}
            title={l.name}
            className={`shrink-0 h-10 w-10 lg:w-14 rounded-xl text-sm font-semibold font-dm-sans transition ${
              focus === l.key
                ? "bg-[#A3841D] text-white shadow"
                : "bg-white text-[#3C2C2C] hover:bg-[#A3841D]/10"
            }`}
          >
            {l.short}
          </button>
        ))}
      </nav>

      {/* Viewer */}
      <div
        data-lenis-prevent
        className="order-3 lg:order-none relative flex-1 h-[60vh] min-h-[400px] lg:h-[calc(100vh-19.5rem)] lg:min-h-[420px] rounded-2xl overflow-hidden border border-[#A3841D]/20 bg-gradient-to-b from-white to-[#F3EEE1] shadow-sm"
      >
        <div ref={mount} className="absolute inset-0" />
        {data && (
          <details
            open={legendOpen}
            onToggle={(e) => setLegendOpen(e.currentTarget.open)}
            className="absolute top-3 left-3 z-10 bg-white/90 rounded-xl shadow border border-black/5 text-[11px] font-dm-sans text-[#3C2C2C]"
          >
            <summary className="cursor-pointer select-none px-3 py-2 font-semibold">
              Legend
            </summary>
            <ul className="px-3 pb-2 space-y-1">
              {LEGEND.map((l) => (
                <li key={l.label} className="flex items-center gap-2">
                  {l.flag ? (
                    <Flag size={12} className="text-[#C0392B]" fill="#C0392B" />
                  ) : (
                    <span
                      className={`w-3 shrink-0 ${l.line ? "h-1 rounded-full" : "h-3 rounded-sm"}`}
                      style={{ background: l.color }}
                    />
                  )}
                  {l.label}
                </li>
              ))}
            </ul>
          </details>
        )}
        {(!data || error) && (
          <div className="absolute inset-0 grid place-items-center px-6 text-center font-dm-sans text-[#3C2C2C]/70">
            {!error
              ? "Loading building…"
              : data
                ? "Couldn't start the 3D map on this device. Search and directions still work."
                : "Couldn't load the building model."}
          </div>
        )}
        {pins
          .filter((p) => p.visible)
          .map((p) => (
            <div
              key={p.id}
              className={`pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full max-w-56 truncate text-xs font-semibold font-dm-sans px-2.5 py-1 rounded-md shadow ${
                p.tone === "gold"
                  ? "bg-[#A3841D] text-white"
                  : p.tone === "elevator"
                    ? "bg-[#4F7CC4] text-white"
                    : p.tone === "stairs"
                      ? "bg-[#4F9A6B] text-white"
                      : "bg-[#3C2C2C] text-white"
              }`}
              style={{ left: p.x, top: p.y }}
            >
              {p.label}
            </div>
          ))}
        {hover && (
          <div
            className="pointer-events-none absolute z-10 translate-x-3 -translate-y-1/2 bg-white text-[#3C2C2C] text-xs font-dm-sans px-2 py-1 rounded shadow border border-black/5"
            style={{ left: hover.x, top: hover.y }}
          >
            {VENUE_LOCATIONS.find(
              (l) => l.group === "Entrances" && l.rooms.includes(hover.roomId),
            )?.name ?? roomCode(hover.roomId)}
          </div>
        )}
        <div className="absolute bottom-3 left-3 z-10 flex gap-2 font-dm-sans">
          {focus && (
            <div className="bg-white/95 rounded-xl shadow px-4 py-2.5 border border-black/5 text-sm font-semibold text-[#3C2C2C]">
              {levelName(focus)}
            </div>
          )}
          <button
            onClick={reset}
            aria-label="Reset view"
            title="Reset view"
            className="bg-white/95 rounded-xl shadow p-2.5 border border-black/5 text-[#3C2C2C]/70 hover:text-[#A3841D]"
          >
            <RotateCcw size={16} />
          </button>
        </div>
        <div className="absolute bottom-3 right-3 z-10 hidden lg:block text-[11px] font-dm-sans text-[#3C2C2C]/50 text-right leading-relaxed">
          Drag to rotate · Right-drag to pan · Scroll to zoom
        </div>
        {/* phones: step through the route without leaving the map */}
        {tab === "directions" && route && steps.length > 1 && (
          <div className="lg:hidden absolute bottom-3 right-3 z-10 flex items-center gap-1 bg-white/95 rounded-xl shadow border border-black/5 p-1 font-dm-sans">
            <button
              onClick={() => goStep(step - 1)}
              disabled={step === 0}
              aria-label="Previous step"
              className="p-2 rounded-lg text-[#3C2C2C] disabled:opacity-30"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="px-1 text-xs text-[#3C2C2C]/60">
              {step + 1}/{steps.length}
            </span>
            <button
              onClick={() => goStep(step + 1)}
              disabled={step === steps.length - 1}
              aria-label="Next step"
              className="p-2 rounded-lg text-white bg-[#A3841D] disabled:opacity-30"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Panel */}
      {/* on phones the panel (and From/To) sits above the map */}
      <aside className="order-1 lg:order-none modal-scrollbar lg:w-96 shrink-0 bg-white rounded-2xl border border-[#A3841D]/20 shadow-sm p-4 font-dm-sans self-start w-full lg:h-[calc(100vh-19.5rem)] lg:min-h-[420px] lg:overflow-y-auto">
        <div className="grid grid-cols-2 gap-1 bg-[#F7F5EF] rounded-xl p-1 mb-4">
          {(["find", "directions"] as const).map((t) => (
            <button
              key={t}
              onClick={() => switchTab(t)}
              className={`h-9 rounded-lg text-sm font-semibold transition ${
                tab === t
                  ? "bg-white shadow text-[#3C2C2C]"
                  : "text-[#3C2C2C]/60 hover:text-[#3C2C2C]"
              }`}
            >
              {t === "find" ? "Find a room" : "Directions"}
            </button>
          ))}
        </div>

        {tab === "find" ? (
          <div className="space-y-3">
            <LocationSelect
              entries={entries}
              value={selected}
              onChange={choose}
              placeholder="Choose a committee or room…"
              dot="#A3841D"
            />
            {selected ? (
              <div className="rounded-xl bg-[#F7F5EF] p-4">
                <div className="flex justify-between gap-2">
                  <div className="font-bold text-[#3C2C2C] leading-snug">
                    {selected.label}
                  </div>
                  <button
                    aria-label="Clear"
                    onClick={() => pickLevel(null)}
                    className="text-[#3C2C2C]/50 hover:text-[#3C2C2C] self-start"
                  >
                    <X size={16} />
                  </button>
                </div>
                <div className="text-sm text-[#3C2C2C]/70 mt-1">
                  {selected.sub}
                </div>
                {selected.note && (
                  <p className="text-sm text-[#3C2C2C]/80 mt-2">
                    {selected.note}
                  </p>
                )}
                {selected.external ? (
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selected.external.mapsQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#A3841D] hover:underline"
                  >
                    Open in Google Maps <ExternalLink size={14} />
                  </a>
                ) : (
                  <button
                    onClick={() => {
                      setTo(selected);
                      switchTab("directions");
                    }}
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-white bg-[#A3841D] hover:bg-[#8a6f1b] rounded-lg px-3 py-2"
                  >
                    <Navigation size={14} /> Directions here
                  </button>
                )}
              </div>
            ) : (
              <p className="text-sm text-[#3C2C2C]/60">
                Pick a committee or room to see where it is, or click a floor in
                the model to look inside.
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            <div className="relative space-y-2">
              <LocationSelect
                entries={routable}
                value={from}
                onChange={setFrom}
                placeholder="From…"
                dot="#3C2C2C"
              />
              <LocationSelect
                entries={routable}
                value={to}
                onChange={setTo}
                placeholder="To…"
                dot="#A3841D"
              />
              <button
                onClick={() => {
                  setFrom(to);
                  setTo(from);
                }}
                aria-label="Swap from and to"
                className="absolute right-9 top-[42px] z-20 bg-white border border-black/10 rounded-full p-1.5 text-[#3C2C2C]/60 hover:text-[#A3841D] shadow-sm"
              >
                <ArrowUpDown size={14} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-1 bg-[#F7F5EF] rounded-xl p-1">
              {(["elevator", "stairs"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`h-8 rounded-lg text-sm font-semibold transition ${
                    mode === m
                      ? "bg-white shadow text-[#3C2C2C]"
                      : "text-[#3C2C2C]/60 hover:text-[#3C2C2C]"
                  }`}
                >
                  {m === "elevator" ? "Elevator" : "Stairs"}
                </button>
              ))}
            </div>
            {routeError && <p className="text-sm text-red-700">{routeError}</p>}
            {route && (
              <div className="rounded-xl bg-[#F7F5EF] p-4">
                {route.fellBackToElevator && (
                  <p className="text-xs text-[#3C2C2C]/60 mt-1">
                    No single staircase links these floors, so this uses the
                    elevators.
                  </p>
                )}
                {steps[step] && (
                  <div className="flex gap-3 rounded-lg p-2 bg-white shadow-sm ring-1 ring-[#A3841D]/30">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-[#A3841D] text-white text-xs font-bold grid place-items-center">
                      {step + 1}
                    </span>
                    <span className="text-sm text-[#3C2C2C]">
                      {steps[step].text}
                    </span>
                  </div>
                )}
                {steps.length > 1 && (
                  <div className="mt-3 hidden lg:flex items-center justify-between gap-2">
                    <button
                      onClick={() => goStep(step - 1)}
                      disabled={step === 0}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-[#3C2C2C]/70 hover:text-[#3C2C2C] disabled:opacity-30 rounded-lg px-2 py-1.5"
                    >
                      <ChevronLeft size={16} /> Back
                    </button>
                    <span className="text-xs text-[#3C2C2C]/50">
                      Step {step + 1} of {steps.length}
                    </span>
                    <button
                      onClick={() => goStep(step + 1)}
                      disabled={step === steps.length - 1}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-white bg-[#A3841D] hover:bg-[#8a6f1b] disabled:opacity-30 rounded-lg px-3 py-1.5"
                    >
                      Next <ChevronRight size={16} />
                    </button>
                  </div>
                )}
                {steps.length > 1 && (
                  <details className="mt-2">
                    <summary className="cursor-pointer select-none text-sm font-semibold text-[#A3841D] py-1">
                      All steps
                    </summary>
                    <ol className="mt-1 space-y-1">
                      {steps.map((st, i) => (
                        <li key={i}>
                          <button
                            onClick={() => goStep(i)}
                            aria-current={i === step ? "step" : undefined}
                            className={`w-full text-left flex gap-3 rounded-lg p-2 transition ${
                              i === step
                                ? "bg-white"
                                : "opacity-60 hover:opacity-100 hover:bg-white"
                            }`}
                          >
                            <span className="shrink-0 w-6 h-6 rounded-full bg-[#A3841D] text-white text-xs font-bold grid place-items-center">
                              {i + 1}
                            </span>
                            <span className="text-sm text-[#3C2C2C]">
                              {st.text}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ol>
                  </details>
                )}
              </div>
            )}
            {!route && !routeError && (
              <p className="text-sm text-[#3C2C2C]/60">
                Choose where you are and where you&apos;re going, or click two
                gold rooms on the map. The route takes the elevators or the
                stairs, whichever you pick.
              </p>
            )}
            <details className="border-t border-black/5 pt-3">
              <summary className="cursor-pointer select-none text-xs font-bold uppercase tracking-wider text-[#A3841D]">
                Events outside OISE
              </summary>
              <div className="mt-2 space-y-2">
                {VENUE_LOCATIONS.filter((l) => l.external).map((l) => (
                  <a
                    key={l.name}
                    href={walkingDirections(l.external!.mapsQuery)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-3 rounded-xl border border-black/10 px-3 py-2.5 hover:border-[#A3841D]/60 hover:bg-[#A3841D]/5 transition"
                  >
                    <span>
                      <span className="block text-sm font-semibold text-[#3C2C2C]">
                        Directions to {l.external!.short}
                      </span>
                      <span className="block text-xs text-[#3C2C2C]/60">
                        {l.name} · {l.rooms.join(", ")}
                        {l.note ? ` · ${l.note.replace(/\.$/, "")}` : ""}
                      </span>
                    </span>
                    <ExternalLink
                      size={14}
                      className="shrink-0 text-[#A3841D]"
                    />
                  </a>
                ))}
              </div>
            </details>
          </div>
        )}
      </aside>
    </div>
  );
}

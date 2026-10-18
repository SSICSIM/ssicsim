interface MyEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
  location?: string;
  category: "committee" | "ceremony" | "training" | "other";
}

const events: MyEvent[] = [
  // Friday
  {
    id: 1,
    title: "Delegate Registration",
    start: new Date(2026, 9, 23, 12, 0),
    end: new Date(2026, 9, 23, 16, 0),
    category: "other",
  },
  {
    id: 2,
    title: "Delegate Training 1",
    start: new Date(2026, 9, 23, 12, 0),
    end: new Date(2026, 9, 23, 13, 0),
    location: "UC 179",
    category: "training",
  },
  {
    id: 3,
    title: "Delegate Training 2",
    start: new Date(2026, 9, 23, 14, 0),
    end: new Date(2026, 9, 23, 15, 0),
    location: "UC 179",
    category: "training",
  },
  {
    id: 4,
    title: "Opening Ceremonies",
    start: new Date(2026, 9, 23, 16, 0),
    end: new Date(2026, 9, 23, 17, 20),
    location: "OI G162",
    category: "ceremony",
  },
  {
    id: 5,
    title: "Committee Session 1",
    start: new Date(2026, 9, 23, 17, 30),
    end: new Date(2026, 9, 23, 19, 0),
    category: "committee",
  },
  {
    id: 6,
    title: "Midnight Crisis",
    start: new Date(2026, 9, 23, 19, 30),
    end: new Date(2026, 9, 23, 23, 0),
    location: "OI 8200",
    category: "training",
  },
  // Saturday
  {
    id: 7,
    title: "Committee Session 2",
    start: new Date(2026, 9, 24, 10, 0),
    end: new Date(2026, 9, 24, 12, 0),
    category: "committee",
  },
  {
    id: 8,
    title: "Lunch",
    start: new Date(2026, 9, 24, 12, 0),
    end: new Date(2026, 9, 24, 13, 0),
    category: "other",
  },
  {
    id: 9,
    title: "Committee Session 3",
    start: new Date(2026, 9, 24, 13, 0),
    end: new Date(2026, 9, 24, 15, 0),
    category: "committee",
  },
  {
    id: 10,
    title: "Break",
    start: new Date(2026, 9, 24, 15, 0),
    end: new Date(2026, 9, 24, 15, 30),
    category: "other",
  },
  {
    id: 11,
    title: "Committee Session 4",
    start: new Date(2026, 9, 24, 15, 30),
    end: new Date(2026, 9, 24, 17, 30),
    category: "committee",
  },
  {
    id: 12,
    title: "Delegate Feedback Session",
    start: new Date(2026, 9, 24, 17, 30),
    end: new Date(2026, 9, 24, 18, 0),
    category: "other",
  },
  {
    id: 13,
    title: "Delegate Social",
    start: new Date(2026, 9, 24, 19, 0),
    end: new Date(2026, 9, 24, 22, 0),
    location: "Victoria College, Alumni Hall",
    category: "training",
  },
  // Sunday
  {
    id: 14,
    title: "Committee Session 5",
    start: new Date(2026, 9, 25, 10, 0),
    end: new Date(2026, 9, 25, 12, 0),
    category: "committee",
  },
  {
    id: 15,
    title: "Lunch",
    start: new Date(2026, 9, 25, 12, 0),
    end: new Date(2026, 9, 25, 13, 0),
    category: "other",
  },
  {
    id: 16,
    title: "Committee Session 6",
    start: new Date(2026, 9, 25, 13, 0),
    end: new Date(2026, 9, 25, 15, 0),
    category: "committee",
  },
  {
    id: 17,
    title: "Break",
    start: new Date(2026, 9, 25, 15, 0),
    end: new Date(2026, 9, 25, 15, 30),
    category: "other",
  },
  {
    id: 18,
    title: "Committee Session 7",
    start: new Date(2026, 9, 25, 15, 30),
    end: new Date(2026, 9, 25, 17, 30),
    category: "committee",
  },
  {
    id: 19,
    title: "Closing Ceremonies",
    start: new Date(2026, 9, 25, 18, 0),
    end: new Date(2026, 9, 25, 19, 0),
    location: "OI G162",
    category: "ceremony",
  },
];

const categories: Record<
  MyEvent["category"],
  { label: string; bg: string; border: string }
> = {
  committee: { label: "Committee", bg: "#F5EDD3", border: "#A3841D" },
  ceremony: { label: "Ceremony", bg: "#FFF4CC", border: "#E0B800" },
  training: { label: "Training / Events", bg: "#FFE9D1", border: "#F08A24" },
  other: { label: "Other", bg: "#F1F1F1", border: "#9CA3AF" },
};

// Nothing starts before 10 AM, so the grid runs 10 AM – 11 PM.
const START_HOUR = 10;
const END_HOUR = 23;
const HOUR_HEIGHT = 60;
const hours = Array.from(
  { length: END_HOUR - START_HOUR },
  (_, i) => i + START_HOUR,
);

const days = [
  { weekday: "Friday", date: "Oct 23", day: new Date(2026, 9, 23) },
  { weekday: "Saturday", date: "Oct 24", day: new Date(2026, 9, 24) },
  { weekday: "Sunday", date: "Oct 25", day: new Date(2026, 9, 25) },
];

const eventsOn = (day: Date) =>
  events
    .filter((e) => e.start.toDateString() === day.toDateString())
    .sort((a, b) => a.start.getTime() - b.start.getTime());

const formatTime = (date: Date) => {
  const minutes = date.getMinutes();
  const hour = date.getHours() % 12 || 12;
  const ampm = date.getHours() >= 12 ? "PM" : "AM";
  return `${hour}:${minutes.toString().padStart(2, "0")} ${ampm}`;
};

const formatHour = (h: number) => `${h % 12 || 12} ${h >= 12 ? "PM" : "AM"}`;

const getTop = (start: Date) =>
  ((start.getHours() - START_HOUR) * 60 + start.getMinutes()) *
  (HOUR_HEIGHT / 60);

const getHeight = (start: Date, end: Date) =>
  ((end.getTime() - start.getTime()) / 60000) * (HOUR_HEIGHT / 60);

// Place overlapping events side by side (e.g. registration during training)
const getLanes = (dayEvents: MyEvent[]) => {
  const laneEnds: Date[] = [];
  const lanes = new Map<number, number>();
  dayEvents.forEach((e) => {
    let lane = laneEnds.findIndex((end) => end <= e.start);
    if (lane === -1) lane = laneEnds.length;
    laneEnds[lane] = e.end;
    lanes.set(e.id, lane);
  });
  return (e: MyEvent) => {
    const overlapping = dayEvents.filter(
      (o) => o.start < e.end && e.start < o.end,
    );
    const count = Math.max(...overlapping.map((o) => lanes.get(o.id)! + 1));
    return { lane: lanes.get(e.id)!, count };
  };
};

export default function ConferenceSchedule() {
  const renderEvents = (dayEvents: MyEvent[]) => {
    const laneOf = getLanes(dayEvents);
    return dayEvents.map((e) => {
      const { lane, count } = laneOf(e);
      const { bg, border } = categories[e.category];
      // Too short for two lines, so show title and time inline
      const isShort = getHeight(e.start, e.end) < 45;
      return (
        <div
          key={e.id}
          title={`${e.title} (${formatTime(e.start)} - ${formatTime(e.end)})${e.location ? ` · ${e.location}` : ""}`}
          style={{
            top: getTop(e.start) + 2,
            height: getHeight(e.start, e.end) - 4,
            backgroundColor: bg,
            borderLeftColor: border,
            left: `calc(${(lane / count) * 100}% + 4px)`,
            width: `calc(${100 / count}% - 8px)`,
          }}
          className={`absolute rounded-md border-l-4 px-2 py-1 text-xs leading-tight text-left text-gray-800 overflow-hidden ${isShort ? "flex items-center gap-2 whitespace-nowrap" : ""}`}
        >
          <div className="font-nunito font-bold text-[13px] text-gray-900 truncate">
            {e.title}
          </div>
          <div className="text-gray-600 truncate">
            {formatTime(e.start)} – {formatTime(e.end)}
          </div>
          {e.location && !isShort && (
            <div className="text-gray-600 truncate">{e.location}</div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto mt-10 mb-20 font-dm-sans">
      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mb-6">
        {Object.values(categories).map((c) => (
          <span
            key={c.label}
            className="flex items-center gap-2 text-sm text-gray-700"
          >
            <span
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: c.border }}
            />
            {c.label}
          </span>
        ))}
      </div>

      {/* ---------------- DESKTOP VIEW ---------------- */}
      <div className="hidden md:block rounded-3xl shadow-xl bg-white overflow-hidden">
        {/* Header */}
        <div
          className="grid bg-[#A3841D] text-white"
          style={{ gridTemplateColumns: "72px 1fr 1fr 1fr" }}
        >
          <div />
          {days.map((d) => (
            <div key={d.weekday} className="text-center py-4">
              <div className="font-nunito font-bold text-xl">{d.weekday}</div>
              <div className="text-sm text-white/80">{d.date}</div>
            </div>
          ))}
        </div>

        <div
          className="grid relative py-4"
          style={{ gridTemplateColumns: "72px 1fr 1fr 1fr" }}
        >
          {/* Time Column */}
          <div
            className="relative"
            style={{ height: hours.length * HOUR_HEIGHT }}
          >
            {[...hours, END_HOUR].map((h, i) => (
              <span
                key={h}
                className="absolute right-3 -translate-y-1/2 text-xs text-gray-500"
                style={{ top: i * HOUR_HEIGHT }}
              >
                {formatHour(h)}
              </span>
            ))}
          </div>

          {/* Day Columns */}
          {days.map((d) => (
            <div
              key={d.weekday}
              className="relative border-l border-gray-200"
              style={{ height: hours.length * HOUR_HEIGHT }}
            >
              {hours.map((h, i) => (
                <div
                  key={h}
                  className="absolute left-0 right-0 border-t border-gray-100"
                  style={{ top: i * HOUR_HEIGHT }}
                />
              ))}
              {renderEvents(eventsOn(d.day))}
            </div>
          ))}
        </div>
      </div>

      {/* ---------------- MOBILE VIEW ---------------- */}
      <div className="md:hidden space-y-6">
        {days.map((d) => (
          <div
            key={d.weekday}
            className="rounded-2xl shadow-lg bg-white overflow-hidden"
          >
            <div className="bg-[#A3841D] text-white px-5 py-3 flex items-baseline justify-between">
              <span className="font-nunito font-bold text-lg">{d.weekday}</span>
              <span className="text-sm text-white/80">{d.date}</span>
            </div>
            <ul className="divide-y divide-gray-100">
              {eventsOn(d.day).map((e) => (
                <li key={e.id} className="flex gap-4 px-5 py-3">
                  <div className="w-[72px] shrink-0 text-xs text-gray-500 pt-0.5">
                    {formatTime(e.start)}
                    <br />
                    {formatTime(e.end)}
                  </div>
                  <div
                    className="flex-1 border-l-4 pl-3"
                    style={{ borderLeftColor: categories[e.category].border }}
                  >
                    <div className="font-nunito font-bold text-gray-900">
                      {e.title}
                    </div>
                    {e.location && (
                      <div className="text-sm text-gray-600">{e.location}</div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

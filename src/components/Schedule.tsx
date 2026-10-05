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
    start: new Date(2026, 9, 23, 13, 0),
    end: new Date(2026, 9, 23, 14, 0),
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
    category: "other",
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
    category: "other",
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

const colors: Record<string, string> = {
  committee: "#FFA500",
  ceremony: "#FFC857",
  training: "#FFB347",
  other: "#E0E0E0",
};

const hours = Array.from({ length: 16 }, (_, i) => i + 8); // 8 AM – 11 PM

export default function ConferenceSchedule() {
  const days = [
    { label: "Fri, Oct 23", date: new Date(2026, 9, 23) },
    { label: "Sat, Oct 24", date: new Date(2026, 9, 24) },
    { label: "Sun, Oct 25", date: new Date(2026, 9, 25) },
  ];

  const getTop = (start: Date) =>
    (start.getHours() - 8) * 60 + start.getMinutes();

  const getHeight = (start: Date, end: Date) =>
    (end.getTime() - start.getTime()) / 60000;

  const formatTime = (date: Date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
  };

  // Place overlapping events side by side (e.g. registration during training)
  const getLanes = (dayEvents: MyEvent[]) => {
    const laneEnds: Date[] = [];
    const lanes = new Map<number, number>();
    [...dayEvents]
      .sort((a, b) => a.start.getTime() - b.start.getTime())
      .forEach((e) => {
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

  const renderEvents = (dayEvents: MyEvent[]) => {
    const laneOf = getLanes(dayEvents);
    return dayEvents.map((e) => {
      const { lane, count } = laneOf(e);
      // Too short for two lines, so show title and time inline
      const isShort = getHeight(e.start, e.end) < 45;
      return (
        <div
          key={e.id}
          title={`${e.title} (${formatTime(e.start)} - ${formatTime(e.end)})${e.location ? ` · ${e.location}` : ""}`}
          style={{
            top: getTop(e.start),
            height: getHeight(e.start, e.end) - 4,
            backgroundColor: colors[e.category],
            left: `calc(${(lane / count) * 100}% + 2px)`,
            width: `calc(${100 / count}% - 4px)`,
          }}
          className={`absolute rounded-lg text-black px-2 py-1 text-xs leading-tight text-left shadow-md overflow-hidden ${isShort ? "flex items-center gap-1 whitespace-nowrap" : ""}`}
        >
          <div className="font-bold">{e.title}</div>
          <div>
            {formatTime(e.start)} - {formatTime(e.end)}
            {e.location && ` · ${e.location}`}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="relative w-full max-w-[1200px] mx-auto mt-12 mb-20 rounded-3xl shadow-xl border-2 border-[#FFD700] bg-white md:pl-20 font-dm-sans">
      {/* ---------------- DESKTOP VIEW ---------------- */}
      <div className="hidden md:block">
        {/* Header */}
        <div
          className="grid border-b-2 border-[#FFD700] mb-2"
          style={{ gridTemplateColumns: "64px 1fr 1fr 1fr" }}
        >
          <div className="w-16"></div>
          {days.map((day) => (
            <div
              key={day.label}
              className="text-center font-bold text-black py-2 text-lg border-l-2 border-[#FFD700]"
            >
              {day.label}
            </div>
          ))}
        </div>

        <div className="flex relative">
          {/* Time Column */}
          <div className="w-16 border-r-2 border-[#FFD700] relative">
            {hours.map((h) => (
              <div
                key={h}
                className="relative h-[60px] flex items-start justify-center border-t-2 border-[#FFD700]/50 text-xs text-black"
              >
                <span className="absolute -left-16">
                  {h > 12 ? h - 12 : h}:00 {h >= 12 ? "PM" : "AM"}
                </span>
              </div>
            ))}
          </div>

          {/* Day Columns */}
          {days.map((day) => {
            const dayEvents = events.filter(
              (e) => e.start.toDateString() === day.date.toDateString(),
            );

            return (
              <div
                key={day.label}
                className="flex-1 border-r-2 border-[#FFD700] relative"
              >
                {hours.map((_, i) => (
                  <div
                    key={i}
                    className="absolute left-0 right-0 h-[1px] border-t-2 border-[#FFD700]/50"
                    style={{ top: i * 60 }}
                  />
                ))}

                {renderEvents(dayEvents)}
              </div>
            );
          })}
        </div>
      </div>

      {/* ---------------- MOBILE VIEW ---------------- */}
      <div className="block md:hidden space-y-8">
        {days.map((day) => {
          const dayEvents = events.filter(
            (e) => e.start.toDateString() === day.date.toDateString(),
          );

          return (
            <div
              key={day.label}
              className="border-2 border-[#FFD700] rounded-xl overflow-hidden"
            >
              {/* Mobile Day Header */}
              <div className="text-center font-bold text-lg bg-[#FFD700] text-black py-2">
                {day.label}
              </div>

              <div className="flex relative">
                {/* Time Column */}
                <div className="w-16 border-r-2 border-[#FFD700] relative">
                  {hours.map((h) => (
                    <div
                      key={h}
                      className="relative h-[60px] flex items-start justify-center border-t-2 border-[#FFD700]/50 text-xs text-black"
                    >
                      <span className="absolute left-1">
                        {h > 12 ? h - 12 : h}:00 {h >= 12 ? "PM" : "AM"}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Events Column */}
                <div className="flex-1 relative">
                  {hours.map((_, i) => (
                    <div
                      key={i}
                      className="absolute left-0 right-0 h-[1px] border-t-2 border-[#FFD700]/50"
                      style={{ top: i * 60 }}
                    />
                  ))}

                  {renderEvents(dayEvents)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

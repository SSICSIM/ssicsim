interface MyEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
  resource?: string;
}

const events: MyEvent[] = [
  { id: 1, title: "Delegate Registration", start: new Date(2025, 9, 24, 10, 0), end: new Date(2025, 9, 24, 16, 0), resource: "registration" },
  { id: 2, title: "Opening Ceremony", start: new Date(2025, 9, 24, 17, 0), end: new Date(2025, 9, 24, 18, 30), resource: "ceremony" },
  { id: 3, title: "Workshops", start: new Date(2025, 9, 25, 9, 30), end: new Date(2025, 9, 25, 12, 0), resource: "workshop" },
  { id: 4, title: "Committee Session", start: new Date(2025, 9, 26, 10, 0), end: new Date(2025, 9, 26, 12, 30), resource: "committee" },
  { id: 5, title: "Closing Gala", start: new Date(2025, 9, 26, 19, 0), end: new Date(2025, 9, 26, 22, 0), resource: "gala" },
];

const eventColors: Record<string, string> = {
  registration: "#FFD700",
  ceremony: "#FFC857",
  workshop: "#FFB347",
  committee: "#FFA500",
  gala: "#FF8C00",
};

const hours = Array.from({ length: 16 }, (_, i) => i + 8); // 8AM–23PM

export default function ConferenceSchedule() {
  const days = [
    { label: "Oct 24", date: new Date(2025, 9, 24) },
    { label: "Oct 25", date: new Date(2025, 9, 25) },
    { label: "Oct 26", date: new Date(2025, 9, 26) },
  ];

  const getTop = (hour: number, minute: number) => (hour - 8) * 60 + minute; // 1px per minute
  const getHeight = (start: Date, end: Date) =>
    (end.getHours() * 60 + end.getMinutes()) - (start.getHours() * 60 + start.getMinutes());

  const formatTime = (date: Date) =>
    `${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`;

  return (
    <div className="relative w-full max-w-[1200px] mx-auto mt-12 mb-20 p-4 rounded-3xl shadow-xl border-2 border-[#FFD700] bg-white">
      {/* Header row */}
      <div className="flex border-b-2 border-[#FFD700] mb-2">
        <div className="w-16"></div> {/* Time column placeholder */}
        {days.map((day) => (
          <div key={day.label} className="flex-1 text-center font-bold text-black py-2 border-l-2 border-[#FFD700] text-lg">
            {day.label}
          </div>
        ))}
      </div>

      {/* Body */}
      <div className="flex relative">
        {/* Time column */}
        <div className="w-16 border-r-2 border-[#FFD700] relative">
          {hours.map((h, i) => (
            <div key={i} className="relative h-16 flex items-start justify-center border-t border-[#FFD700]/30 text-black text-xs">
              <span className="absolute -left-14">{h}:00</span>
            </div>
          ))}
        </div>

        {/* Day columns */}
        {days.map((day) => (
          <div key={day.label} className="flex-1 border-r-2 border-[#FFD700] relative">
            {/* Hour lines */}
            {hours.map((_, i) => (
              <div
                key={i}
                className="absolute left-0 right-0 h-[1px] bg-[#FFD700]/30"
                style={{ top: i * 60 }}
              />
            ))}

            {/* Events */}
            {events
              .filter((e) => e.start.toDateString() === day.date.toDateString())
              .map((e) => (
                <div
                  key={e.id}
                  style={{
                    top: getTop(e.start.getHours(), e.start.getMinutes()),
                    height: getHeight(e.start, e.end),
                    backgroundColor: eventColors[e.resource || "registration"],
                  }}
                  className="absolute left-2 right-2 rounded-lg text-black px-2 py-1 font-semibold text-sm shadow-md flex flex-col justify-center"
                >
                  <span className="text-xs font-normal">
                    {formatTime(e.start)} - {formatTime(e.end)}
                  </span>
                  <span>{e.title}</span>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

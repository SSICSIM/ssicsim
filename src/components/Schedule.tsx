import React from "react";

interface MyEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
  category: "charity" | "committee" | "ceremony" | "training" | "other";
}

const events: MyEvent[] = [
  // Friday
  { id: 1, title: "Check-In", start: new Date(2025, 9, 24, 9, 0), end: new Date(2025, 9, 24, 16, 0), category: "other" },
  { id: 2, title: "Legislative Assembly Tours", start: new Date(2025, 9, 24, 9, 30), end: new Date(2025, 9, 24, 11, 0), category: "charity" },
  { id: 3, title: "Delegate Training Session 1", start: new Date(2025, 9, 24, 13, 0), end: new Date(2025, 9, 24, 14, 0), category: "training" },
  { id: 4, title: "Charity Photoshoot", start: new Date(2025, 9, 24, 14, 0), end: new Date(2025, 9, 24, 15, 0), category: "charity" },
  { id: 5, title: "Delegate Training Session 2", start: new Date(2025, 9, 24, 15, 0), end: new Date(2025, 9, 24, 16, 0), category: "training" },
  { id: 6, title: "Opening Ceremonies", start: new Date(2025, 9, 24, 16, 0), end: new Date(2025, 9, 24, 17, 0), category: "ceremony" },
  { id: 7, title: "Committee Session 1", start: new Date(2025, 9, 24, 17, 30), end: new Date(2025, 9, 24, 19, 0), category: "committee" },
  { id: 8, title: "Midnight Crisis", start: new Date(2025, 9, 24, 20, 0), end: new Date(2025, 9, 24, 23, 0), category: "other" },
  // Saturday
  { id: 9, title: "Committee Session 2", start: new Date(2025, 9, 25, 10, 0), end: new Date(2025, 9, 25, 12, 0), category: "committee" },
  { id: 10, title: "Lunch + Charity Photoshoot", start: new Date(2025, 9, 25, 12, 0), end: new Date(2025, 9, 25, 13, 30), category: "charity" },
  { id: 11, title: "Committee Session 3", start: new Date(2025, 9, 25, 13, 30), end: new Date(2025, 9, 25, 15, 30), category: "committee" },
  { id: 12, title: "Break", start: new Date(2025, 9, 25, 15, 30), end: new Date(2025, 9, 25, 16, 0), category: "other" },
  { id: 13, title: "Committee Session 4", start: new Date(2025, 9, 25, 16, 0), end: new Date(2025, 9, 25, 18, 0), category: "committee" },
  { id: 14, title: "Delegate/FA Feedback", start: new Date(2025, 9, 25, 18, 0), end: new Date(2025, 9, 25, 18, 30), category: "other" },
  { id: 15, title: "Delegate Social", start: new Date(2025, 9, 25, 19, 30), end: new Date(2025, 9, 25, 23, 0), category: "other" },
  // Sunday
  { id: 16, title: "Committee Session 5", start: new Date(2025, 9, 26, 10, 0), end: new Date(2025, 9, 26, 12, 0), category: "committee" },
  { id: 17, title: "Lunch + Charity Photoshoot", start: new Date(2025, 9, 26, 12, 0), end: new Date(2025, 9, 26, 13, 30), category: "charity" },
  { id: 18, title: "Committee Session 6", start: new Date(2025, 9, 26, 13, 30), end: new Date(2025, 9, 26, 15, 30), category: "committee" },
  { id: 19, title: "Delegate/FA Feedback", start: new Date(2025, 9, 26, 15, 30), end: new Date(2025, 9, 26, 16, 0), category: "other" },
  { id: 20, title: "Break", start: new Date(2025, 9, 26, 16, 0), end: new Date(2025, 9, 26, 16, 30), category: "other" },
  { id: 21, title: "Closing Ceremonies", start: new Date(2025, 9, 26, 16, 30), end: new Date(2025, 9, 26, 18, 0), category: "ceremony" },
];

const colors: Record<string, string> = {
  charity: "#FFD700",
  committee: "#FFA500",
  ceremony: "#FFC857",
  training: "#FFB347",
  other: "#E0E0E0",
};

const hours = Array.from({ length: 16 }, (_, i) => i + 8); // 8 AM – 11 PM

export default function ConferenceSchedule() {
  const days = [
    { label: "Fri, Oct 24", date: new Date(2025, 9, 24) },
    { label: "Sat, Oct 25", date: new Date(2025, 9, 25) },
    { label: "Sun, Oct 26", date: new Date(2025, 9, 26) },
  ];


const getTop = (start: Date) => {
  let minutes = start.getMinutes();
  if (minutes > 0) minutes = 30; // snap to 30 if not 0
  return (start.getHours() - 8) * 60 + minutes; // include border
};

const getHeight = (start: Date, end: Date) => {
  let startMinutes = start.getMinutes();
  if (startMinutes > 0) startMinutes = 30;

  let endMinutes = end.getMinutes();
  if (endMinutes > 0) endMinutes = 30;

  return (end.getHours() * 60 + endMinutes) - (start.getHours() * 60 + startMinutes); // subtract border so event fits
};

  const formatTime = (date: Date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
  };

  return (
    <div className="relative w-full max-w-[1200px] mx-auto mt-12 mb-20 p-4 pl-20 rounded-3xl shadow-xl border-2 border-[#FFD700] bg-white">
      {/* Header */}
<div
  className="grid border-b-2 border-[#FFD700] mb-2"
  style={{ gridTemplateColumns: "64px 1fr 1fr 1fr" }}
>
  {/* Time column */}
  <div className="w-16"></div>

  {/* Day labels */}
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
            <div key={h} className="relative h-[60px] flex items-start justify-center border-t-2 border-[#FFD700]/50 text-xs text-black">
              <span className="absolute -left-16">{h > 12 ? h - 12 : h}:00 {h >= 12 ? "PM" : "AM"}</span>
            </div>
          ))}
        </div>

        {/* Day Columns */}
        {days.map((day) => {
          const dayEvents = events.filter((e) => e.start.toDateString() === day.date.toDateString());

          return (
            <div key={day.label} className="flex-1 border-r-2 border-[#FFD700] relative">
              {/* Hour lines */}
              {hours.map((_, i) => (
                <div key={i} className="absolute left-0 right-0 h-[1px] border-t-2 border-[#FFD700]/50" style={{ top: i * 60 }} />
              ))}

              {/* Events */}
              {dayEvents.map((e, idx) => {
                // Overlapping adjustment: shift by small gap if previous event overlaps
                const prev = idx > 0 ? dayEvents[idx - 1] : null;
                let leftOffset = 2;
                if (prev && getTop(e.start) < getTop(prev.end)) {
                  leftOffset += 10; // reduce gap for overlap
                }

                return (
                  <div
                    key={e.id}
                    style={{
                      top: getTop(e.start),
                      height: getHeight(e.start, e.end) - 4,
                      marginBottom: "2px",
                      marginTop: "2px",
                      backgroundColor: colors[e.category],
                      left: `${leftOffset}px`,
                      right: "2px",
                    }}
                    className="absolute rounded-lg text-black px-2 py-1 font-semibold text-sm shadow-md overflow-hidden"
                  >
                    <div className="font-light">
                      <a className="font-bold"> {e.title} </a> ({formatTime(e.start)} - {formatTime(e.end)})
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

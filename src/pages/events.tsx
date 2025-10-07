import { CF_DOMAIN } from "../utils/consts";
import { useState } from "react";
import React from "react";

interface Event {
  title: string;
  description: string;
  dates: string[];
  times: string[];
  locations: string[];
  spots?: string;
  image: string;
  link: string;
}

const events: Event[] = [
  {
    title: "Delegate Training",
description:
     "Never competed at Model UN conference before? Need a refresher on the flow of debate in crisis committees? Sign up for a Delegate Training session, hosted by our Co-ASGs of Hiring & Training, to learn all you need to know before participating in your first crisis committee!\n\n[Delegates must check in to the conference at OISE first before attending Delegate Training.]\n\n[Note:] Delegates are only permitted to attend {one} of the two sessions.",
    dates: ["Friday, October 24", "Friday, October 24"],
    times: ["1:00 – 2:00 PM", "3:00 – 4:00 PM"],
    locations: ["OSE 213", "OSE 253"],
    spots: "In Person: 280 (140 per session), Online: Unlimited",
    image: "https://picsum.photos/600/400?random=1",
    link: "/register?event=delegate-training",
  },
  {
    title: "Legislative Assembly Tour",
    description: "Join us for a free tour of the Legislative Assembly of Ontario at Queen’s Park! Discover the building's history and architecture, and learn about the traditions and function of Parliament. \n\n[Delegates must check in to the conference and meet at OISE first before attending the Legislative Assembly Tour. We will be leaving at 9:30 AM sharp!]",
    dates: ["Friday, October 24"],
    times: ["9:30 – 11:00 AM"],
    locations: ["Meeting Location"],
    spots: "35",
    image: "https://picsum.photos/600/400?random=2",
    link: "/register?event=legislative-tour",
  },
  {
    title: "Charity Photoshoot",
    description: "For just a small donation to charity, get your own professional headshot or a group photo with your friends at University College, a historic Romanesque Revival-style building at the University of Toronto. Sign up for a slot today before spots fill up!\n\n[Note:] Costs for individual photos are different from group photos; please see the first page of the sign-up form for more information.\n\n[Delegates must check in to the conference at OISE first before attending the Charity Photoshoot.]",
    dates: ["Friday, October 24", "Saturday, October 25", "Sunday, October 26"],
    times: ["2:00 – 3:00 PM", "12:00 – 1:30 PM", "12:00 – 1:30 PM"],
    locations: ["Session 1", "Session 2", "Session 3"],
    spots: "240 (10 per 10-minute slot)",
    image: "https://picsum.photos/600/400?random=3",
    link: "/register?event=charity-photoshoot",
  },
  {
    title: "Midnight Crisis",
    description:
      "Looking for another crisis committee to participate in? Join the short, late-night Midnight Crisis committee directed by the Secretariat. Committee topic revealed at session start.",
    dates: ["Friday, October 24"],
    times: ["8:00 – 11:00 PM"],
    locations: ["Meeting Location"],
    spots: "20",
    image: "https://picsum.photos/600/400?random=4",
    link: "/register?event=midnight-crisis",
  },
  {
    title: "Delegate Social",
    description:
      "Unwind after a long day of debate! Connect with other Delegates, Staff, and Secretariat members at SSICSIM 2025. Free dinner and refreshments provided.",
    dates: ["Sunday, October 25"],
    times: ["7:30 – 11:00 PM"],
    locations: ["Meeting Location"],
    spots: "120",
    image: "https://picsum.photos/600/400?random=5",
    link: "/register?event=delegate-social",
  },
];

const parseDescription = (desc: string) => {
 const lines = desc.split("\n");


 return lines.map((line, idx) => {
   const elements: React.ReactNode[] = [];
   let lastIndex = 0;


   // Regex to match [text], (text), {text}
   const regex = /(\[([^\]]+)\]|\(([^)]+)\)|\{([^}]+)\})/g;
   let match;


   while ((match = regex.exec(line)) !== null) {
     const fullMatch = match[0];
     const index = match.index;


     // Add plain text before the match
     if (index > lastIndex) {
       elements.push(
         React.createElement("span", { key: lastIndex + "plain" }, line.slice(lastIndex, index))
       );
     }


     // Determine formatting type
     if (match[2]) {
       // [text] → bold + underline
       elements.push(
         React.createElement(
           "span",
           { key: index + "bold", className: "font-bold" },
           match[2]
         )
       );
     } else if (match[3]) {
       // (text) → italic
       elements.push(
         React.createElement(
           "span",
           { key: index + "italic", className: "italic" },
           match[3]
         )
       );
     } else if (match[4]) {
       // {text} → underline
       elements.push(
         React.createElement(
           "span",
           { key: index + "underline", className: "underline" },
           match[4]
         )
       );
     }


     lastIndex = index + fullMatch.length;
   }


   // Add remaining text after last match
   if (lastIndex < line.length) {
     elements.push(
       React.createElement("span", { key: lastIndex + "rest" }, line.slice(lastIndex))
     );
   }


   return React.createElement(
     "p",
     { key: idx, className: "text-white mb-2 text-sm md:text-base font-dm-sans" },
     ...elements
   );
 });
};



const Events = () => {
  const [expandedIndex, setExpandedIndex] = useState<number>(0);

  const toggleExpand = (idx: number) => {
    if (idx !== expandedIndex) setExpandedIndex(idx); // always one expanded
  };

  return (
    <>
      {/* Hero Section */}
      <div className="block w-full min-h-[400px] h-[80vh] max-h-[1200px] relative">
        <img
          src={`${CF_DOMAIN}/UoftAerialPhoto.jpg?format=webp`}
          alt="University of Toronto Aerial View"
          className="absolute top-0 left-0 w-full h-full object-cover z-10"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
        <div className="max-w-[3000px] mx-auto absolute inset-0 flex flex-col items-start justify-center z-20 px-6">
          <h1 className="text-white text-left text-4xl font-bold w-[80vw] lg:w-[800px] font-nunito leading-tight md:text-7xl drop-shadow-md">
            Events
          </h1>
        </div>
      </div>

      {/* Events Section */}
      <div className="relative bg-gray-100 py-20 px-6 min-h-screen">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-4xl font-bold font-nunito text-center text-[#A3841D]">
            Events
          </h2>
          <div className="mt-2 mb-8 max-w-2xl mx-auto text-center">
            <p className="text-lg text-gray-700 w-[100%] font-dm-sans">
              Where will you be after committee session ends? See more information
              about the opportunities we’ll be hosting for Delegates and Staff outside
              of committee sessions, and how to sign up. All of the events below are
              optional and completely free!
            </p>
            <p className="text-lg text-gray-700 font-dm-sans mt-2">
              <span className="font-bold">Note:</span> These events are only open to
              confirmed attendees of SSICSIM 2025.
            </p>
          </div>

          {/* Responsive Accordion */}
          <div className="flex flex-col md:flex-row gap-2 overflow-x-auto md:overflow-hidden mx-auto">
            {events.map((event, idx) => {
              const isExpanded = expandedIndex === idx;
              return (
                <div
                  key={idx}
                  className={`relative flex-shrink-0 transition-all duration-500 ease-in-out cursor-pointer
                    ${isExpanded ? "w-full h-[500px] md:w-[59%]" : "h-[75px] md:w-[9%]"}
                    h-80 md:h-[500px] rounded-xl shadow-lg overflow-hidden group
                  `}
                  onClick={() => toggleExpand(idx)}
                >
                  {/* Background Image with Dark Overlay */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-all duration-500"
                    style={{
                      backgroundImage: `linear-gradient(${
                        isExpanded ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0.5)"
                      }, ${isExpanded ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0.5)"}), url(${event.image})`,
                      backgroundBlendMode: "multiply",
                    }}
                  />

                  {/* Click indicator */}
                  {!isExpanded && (
                    <div className="absolute top-2 right-2 text-white opacity-70 text-sm md:text-base font-bold">
                      Click
                    </div>
                  )}

                  {/* Text Container */}
                  <div
                    className={`absolute left-0 right-0 transition-all duration-500 px-4 ${
                      isExpanded
                        ? "bottom-0 py-4 md:py-6 flex flex-col items-start"
                        : "top-0 h-full flex items-center justify-center md:rotate-90 md:origin-center"
                    }`}
                  >
                    <div
                      className={`backdrop-blur-md bg-white/10 border border-white/20 rounded-xl px-4 py-2 transition-all duration-500 ${
                        isExpanded ? "w-full flex flex-col items-start" : "w-auto"
                      }`}
                    >
                      <h3
                        className={`text-white font-bold font-nunito duration-500 ${
                          isExpanded
                            ? "text-xl md:text-3xl text-left"
                            : "text-lg md:text-2xl whitespace-nowrap"
                        }`}
                      >
                        {event.title}
                      </h3>
                      {isExpanded && (
                        <>
                          <div className="mt-2 max-h-[200px] overflow-y-auto pr-2 w-full">
                            {parseDescription(event.description)}
                          </div>
                          
                          {/* Dates, Times, Locations */}
                         <div className="mt-4 bg-[#A3841D]/30 rounded-lg p-4 w-full">
                         {event.dates.length === 1 ? (
                           <p className="text-white text-sm md:text-base mt-1 font-dm-sans">
                             <span className="font-bold">Event:</span> {event.dates[0]} | {event.times[0]} | {event.locations[0]}
                           </p>
                         ) : (
                           event.dates.map((date, i) => (
                             <p
                               key={i}
                               className="text-white text-sm md:text-base mt-1 font-dm-sans"
                             >
                               <span className="font-bold">Session {i + 1}:</span> {date} | {event.times[i]} | {event.locations[i]}
                             </p>
                           ))
                         )}


                         {event.spots && (
                           <p className="mt-4 text-white text-sm md:text-base font-dm-sans">
                             <span className="font-bold">Number of Spots:</span>{" "}
                             {event.spots}
                           </p>
                         )}


                         </div>

                          <a
                            href={event.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-block bg-[#A3841D] text-white font-dm-sans font-bold px-6 py-2 rounded-lg shadow-md hover:bg-[#FFD700] hover:text-black transition-colors"
                          >
                            Register Now
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Events;

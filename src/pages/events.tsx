import { CF_DOMAIN } from "../utils/consts";
import { useState } from "react";
import { events } from "../utils/data";
import { parseDescription } from "../utils/utils";

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
              Where will you be after committee session ends? See more
              information about the opportunities we’ll be hosting for Delegates
              and Staff outside of committee sessions, and how to sign up. All
              of the events below are optional and completely free!
            </p>
            <p className="text-lg text-gray-700 font-dm-sans mt-2">
              <span className="font-bold">Note:</span> These events are only
              open to confirmed attendees of SSICSIM 2025.
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
                        isExpanded ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.6)"
                      }, ${isExpanded ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.6)"}), url(${event.image})`,
                      backgroundBlendMode: "multiply",
                    }}
                  />

                  {/* Click indicator */}
                  {!isExpanded && (
                    <div className="absolute top-2 right-2 text-white opacity-70 text-sm md:text-sm font-bold">
                      Click
                    </div>
                  )}

                  {/* Text Container */}
                  <div
                    className={`absolute left-0 right-0  px-4 ${
                      isExpanded
                        ? "bottom-0 py-4 md:py-6 flex flex-col items-start md:w-[500px]"
                        : "top-0 h-full flex items-center justify-center md:rotate-90 md:origin-center"
                    }`}
                  >
                    <div
                      className={` bg-black/70 border border-white/20 rounded-xl px-4 py-2  ${
                        isExpanded
                          ? "w-full flex flex-col items-start"
                          : "w-auto"
                      }`}
                    >
                      <h3
                        className={`text-white font-bold font-nunito  ${
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
                            {parseDescription(event.description, "text-xs")}
                          </div>

                          {/* Dates, Times, Locations */}
                          <div className="mt-4 bg-[#A3841D]/50 rounded-lg p-4 w-full">
                            {event.dates.length === 1 ? (
                              <p className="text-white text-xs md:text-sm mt-1 font-dm-sans">
                                <span className="font-bold">Event:</span>{" "}
                                {event.dates[0]} | {event.times[0]} |{" "}
                                {event.locations[0]}
                              </p>
                            ) : (
                              event.dates.map((date, i) => (
                                <p
                                  key={i}
                                  className="text-white text-xs md:text-sm mt-1 font-dm-sans"
                                >
                                  <span className="font-bold">
                                    Session {i + 1}:
                                  </span>{" "}
                                  {date} | {event.times[i]} |{" "}
                                  {event.locations[i]}
                                </p>
                              ))
                            )}

                            {event.spots && (
                              <p className="mt-4 text-white text-xs md:text-sm font-dm-sans">
                                <span className="font-bold">
                                  Number of Spots:
                                </span>{" "}
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

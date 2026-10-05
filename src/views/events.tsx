"use client";

import { CF_DOMAIN } from "../utils/consts";
import { events } from "../utils/data";
import { parseDescription } from "../utils/utils";
import Image from "next/image";

const Events = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="block w-full min-h-[400px] h-[80vh] max-h-[1200px] relative">
        <Image
          src={`${CF_DOMAIN}/UoftAerialPhoto.jpg?format=webp`}
          alt="University of Toronto Aerial View"
          fill
          priority
          sizes="100vw"
          className="absolute top-0 left-0 object-cover z-10"
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
              open to confirmed attendees of SSICSIM 2026.
            </p>
          </div>

          {/* Event Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map((event, idx) => (
              <div
                key={idx}
                className="relative min-h-[500px] rounded-xl shadow-lg overflow-hidden flex flex-col justify-end"
              >
                {/* Background Image with Dark Overlay */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${event.image})`,
                    backgroundBlendMode: "multiply",
                  }}
                />

                {/* Text Container */}
                <div className="relative p-4 pt-40">
                  <div className="bg-black/70 border border-white/20 rounded-xl px-4 py-4 flex flex-col items-start">
                    <h3 className="text-white font-bold font-nunito text-xl md:text-2xl text-left">
                      {event.title}
                    </h3>
                    <div className="mt-2 w-full">
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
                            <span className="font-bold">Session {i + 1}:</span>{" "}
                            {date} | {event.times[i]} | {event.locations[i]}
                          </p>
                        ))
                      )}

                      {event.spots && (
                        <p className="mt-4 text-white text-xs md:text-sm font-dm-sans">
                          <span className="font-bold">Number of Spots:</span>{" "}
                          {event.spots}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Events;

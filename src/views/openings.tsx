"use client";

import { CF_DOMAIN } from "../utils/consts";
import Image from "next/image";

const Openings = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="relative block w-full min-h-[400px] h-[80vh] max-h-[1200px]">
        <Image
          src={`${CF_DOMAIN}/UoftAerialPhoto.jpg?format=webp`}
          alt="University of Toronto Aerial View"
          fill
          priority
          sizes="100vw"
          className="absolute top-0 left-0 object-cover z-10"
        />
        <div className="absolute top-0 left-0 w-full min-h-[400px] h-[80vh] max-h-[1200px] bg-black opacity-40 z-10"></div>
        <div className="max-w-[3000px] mx-auto absolute top-0 left-0 inset-0 w-full min-h-[400px] h-[80vh] flex flex-col items-start justify-center z-20 max-h-[1200px]">
          <h1 className="text-white text-left text-4xl font-bold w-[80vw] lg:w-[800px] font-nunito leading-tight ml-6 md:text-7xl">
            Staff Hiring
          </h1>
        </div>
      </div>

      <div className="relative pb-7 bg-[#A3841D] min-h-screen w-full grid grid-rows-auto">
        {/* Text Content */}
        <div className="relative z-10 flex items-center max-w-[3000px] mx-auto">
          <div className="grid w-[100%] grid-cols-1 md:w-auto md:grid-cols-2 md:gap-4 ml-5 my-3">
            <div className="p-4 my-auto md:ml-[50px]">
              <p className="text-[30px] font-extralight text-white font-grotesque">
                SSICSIM 2026
              </p>
              <h2 className="ml-[-3px] mb-[-10px] mt-[10px] text-[72px] md:text-[60px] lg:text-[72px] font-bold text-white font-nunito leading-[1]">
                Staff Hiring
              </h2>
            </div>
            <div className="p-4 w-[80%] flex flex-col justify-center">
              <p className="text-[15px] lg:text-[20px] font-light text-white font-dm-sans mb-4">
                Interested? Check out our open positions below and apply to join
                the SSICSIM 2026 staff team! We are looking for individuals who
                are passionate about Model UN, crisis management, and diplomacy.
                Apply here!
              </p>
              <div className="flex md:flex-row flex-col gap-3 md:gap-6 w-full mt-6">
                <a
                  href="https://forms.gle/djopEAUNkGKRJc4A6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-dm-sans text-[15px] md:text-[20px] text-center bg-white text-black px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Apply Now
                </a>
                <a
                  href="https://docs.google.com/document/d/1UQe1CURsqdbyQf2QBfL-i2Y42CeV46gUbqzTpWD79vA/edit?tab=t.0#heading=h.3vnl20xphx4r"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-dm-sans text-[15px] md:text-[20px] text-center bg-white text-black px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Roles & Responsibilities
                </a>
              </div>{" "}
            </div>
          </div>
        </div>

        {/* Rolling Hiring Note Full Width */}
        <div className="flex justify-center mt-6 mb-8 w-full">
          <div className="flex flex-col min-h-[220px] w-[90%] mx-auto md:w-[100%] p-6 z-[10] bg-white/30 backdrop-blur-lg rounded-lg border border-white/10 shadow-lg items-center text-center">
            <p className="text-[22px] lg:text-[26px] font-bold font-grotesque mb-2 text-white">
              Please note that this year, we are using a rolling hiring system.
            </p>
            <p className="text-white font-dm-sans font-light md:text-[15px] text-[15px] lg:text-[20px] max-w-3xl mt-2">
              This means that for the duration of our hiring period (<span className="font-bold">from now until <span className='underline'>August 10th, 2026</span></span>), we will be continuously evaluating applications and hiring successful candidates, as opposed to evaluating and hiring only after a set deadline. <span className="font-bold">This means that applying earlier is advantageous, as there will be more open positions earlier in the hiring period.</span>
            </p>
            <p className="text-white font-dm-sans font-medium md:text-[15px] text-[15px] lg:text-[18px] mt-4">
              If you have any questions about this, please reach out to <a href="mailto:hiring@ssicsim.ca" className="underline font-bold">hiring@ssicsim.ca</a>.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-[2px] bg-white"></div>

        {/* Cards Section */}
        <div className="max-w-[3000px] grid grid-cols-1 mt-6 md:grid-rows-2 md:grid-cols-3 gap-4 h-[200vh] md:h-[70vh] w-[90vw] mx-auto">
          {/* Moderator (rotated 90° clockwise, full coverage) */}
          <div className="relative h-full row-span-1 md:row-span-2 col-span-1 bg-gradient-to-br from-[#A3841D] to-[#C2A95F] rounded-lg shadow-lg p-6 flex flex-col justify-end items-start text-white overflow-hidden">
            <div className="absolute inset-0">
              <Image
                src={`${CF_DOMAIN}/Moderator.JPG?format=webp&fit=cover`}
                alt="Moderator"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
                priority={false}
              />
            </div>
            <div className="absolute inset-0 bg-[#A3841D]/60 rounded-md"></div>
            <h3 className="text-3xl font-nunito font-extrabold z-20">
              Moderator
            </h3>
            <p className="font-dm-sans text-lg mt-2 z-20">
              Commands the Flow of Debate
            </p>
          </div>

          {/* Crisis Manager */}
          <div className="relative h-full row-span-1 col-span-1 bg-gradient-to-br from-[#A3841D] to-[#C2A95F] rounded-lg shadow-lg p-6 flex flex-col justify-end items-start text-white">
            <Image
              src={`${CF_DOMAIN}/CrisisManager.JPG?format=webp`}
              alt="Crisis Manager"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="absolute inset-0 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-[#A3841D]/60 rounded-md"></div>
            <h3 className="text-3xl font-nunito font-extrabold z-20">
              Crisis Manager
            </h3>
            <p className="font-dm-sans text-lg mt-2 z-20">
              Constructs the Committee Storyline
            </p>
          </div>

          {/* Crisis Staff */}
          <div className="relative h-full row-span-1 col-span-1 bg-gradient-to-br from-[#A3841D] to-[#C2A95F] rounded-lg shadow-lg p-6 flex flex-col justify-end items-start text-white">
            <Image
              src={`${CF_DOMAIN}/CrisisStaff.JPG?format=webp`}
              alt="Crisis Analyst"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="absolute inset-0 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-[#A3841D]/60 rounded-md"></div>
            <h3 className="text-3xl font-nunito font-extrabold z-20">
              Crisis Analyst
            </h3>
            <p className="font-dm-sans text-lg mt-2 z-20">
              Steer the Story of Individual Delegates
            </p>
          </div>

          {/* Crisis Coordinator */}
          <div className="relative h-full row-span-1 col-span-1 bg-gradient-to-br from-[#A3841D] to-[#C2A95F] rounded-lg shadow-lg p-6 flex flex-col justify-end items-start text-white">
            <Image
              src={`${CF_DOMAIN}/CrisisCoordinator.png?format=webp`}
              alt="Crisis Coordinator"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="absolute inset-0 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-[#A3841D]/60 rounded-md"></div>
            <h3 className="text-3xl font-extrabold font-nunito z-20">
              Crisis Coordinator
            </h3>
            <p className="font-dm-sans text-lg mt-2 z-20">
              Harmonizing Both The Front and Back Rooms
            </p>
          </div>

          {/* Staff Support (rotated 90° clockwise, full coverage) */}
          <div className="relative h-full row-span-1 col-span-1 bg-gradient-to-br from-[#A3841D] to-[#C2A95F] rounded-lg shadow-lg p-6 flex flex-col justify-end items-start text-white overflow-hidden">
            <div className="absolute inset-0">
              <Image
                src={`${CF_DOMAIN}/StaffSupport.JPG?format=webp&fit=cover`}
                alt="Staff Support"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-[#A3841D]/60 rounded-md"></div>
            <h3 className="text-3xl font-extrabold font-nunito z-20">
              Staff Support
            </h3>
            <p className="font-dm-sans text-lg mt-2 z-20">
              Adapting Experts and Assist Committees
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Openings;

import { CF_DOMAIN } from "../utils/consts";

const Openings = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="block w-full min-h-[400px] h-[80vh] max-h-[1200px]">
        <img
          src={`${CF_DOMAIN}/UoftAerialPhoto.jpg?format=webp`}
          alt="University of Toronto Aerial View"
          className="absolute top-0 left-0 w-full min-h-[400px] h-[80vh] max-h-[1200px] object-cover z-10"
          loading="lazy"
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
                SSICSIM 2025
              </p>
              <h2 className="ml-[-3px] mb-[-10px] mt-[10px] text-[72px] md:text-[60px] lg:text-[72px] font-bold text-white font-nunito leading-[1]">
                Staff Hiring
              </h2>
            </div>
            <div className="p-4 w-[80%] flex flex-col justify-center">
              <p className="text-[15px] lg:text-[20px] font-light text-white font-dm-sans">
                Interested? Check out our open positions below and apply to join
                the SSICSIM 2025 staff team! We are looking for individuals who
                are passionate about Model UN, crisis management, and diplomacy.
                Apply here!
              </p>
              <div className="flex md:flex-row flex-col gap-3 md:gap-6 w-full mt-6">
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSewsKyMC-dXuSvrGxa4yZ8zTnQDxRXyz5dyNjMPLgwQrCDj6g/viewform"
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

        {/* Divider */}
        <div className="w-full h-[2px] bg-white"></div>

        {/* Cards Section */}
        <div className="max-w-[3000px] grid grid-cols-1 mt-6 md:grid-rows-2 md:grid-cols-3 gap-4 h-[200vh] md:h-[70vh] w-[90vw] mx-auto">
          {/* Moderator (rotated 90° clockwise, full coverage) */}
          <div className="relative h-full row-span-1 md:row-span-2 col-span-1 bg-gradient-to-br from-[#A3841D] to-[#C2A95F] rounded-lg shadow-lg p-6 flex flex-col justify-end items-start text-white overflow-hidden">
            <img
              src={`${CF_DOMAIN}/Moderator.JPG?format=webp&fit=cover`}
              alt="Moderator"
              className="absolute md:top-1/2 left-1/2 top-[100px] md:w-auto md:h-full min-w-full min-h-full max-w-none max-h-none object-cover transform -translate-x-1/2 -translate-y-5/12 md:-translate-y-1/2 rotate-90"
              loading="lazy"
            />
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
            <img
              src={`${CF_DOMAIN}/CrisisManager.JPG?format=webp`}
              alt="Crisis Manager"
              className="absolute inset-0 w-full h-full object-cover rounded-lg"
              loading="lazy"
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
            <img
              src={`${CF_DOMAIN}/CrisisStaff.JPG?format=webp`}
              alt="Crisis Staff"
              className="absolute inset-0 w-full h-full object-cover rounded-lg"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-[#A3841D]/60 rounded-md"></div>
            <h3 className="text-3xl font-nunito font-extrabold z-20">
              Crisis Staff
            </h3>
            <p className="font-dm-sans text-lg mt-2 z-20">
              Steer the Story of Individual Delegates
            </p>
          </div>

          {/* Crisis Coordinator */}
          <div className="relative h-full row-span-1 col-span-1 bg-gradient-to-br from-[#A3841D] to-[#C2A95F] rounded-lg shadow-lg p-6 flex flex-col justify-end items-start text-white">
            <img
              src={`${CF_DOMAIN}/CrisisCoordinator.png?format=webp`}
              alt="Crisis Coordinator"
              className="absolute inset-0 w-full h-full object-cover rounded-lg"
              loading="lazy"
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
            <img
              src={`${CF_DOMAIN}/StaffSupport.JPG?format=webp&fit=cover`}
              alt="Staff Support"
              className="absolute top-1/2 left-1/2 w-full h-auto min-w-full min-h-full max-w-none max-h-none object-cover transform -translate-x-1/2 -translate-y-1/2 rotate-270"
              loading="lazy"
            />
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

const Openings = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="w-full h-[80vh] overflow-hidden">
        <img
          src="/assets/photos/UoftAerialPhoto.jpg"
          alt="University of Toronto Aerial View"
          className="absolute top-0 left-0 w-full h-[80vh] object-cover z-10"
        />
      </div>
      <div className="absolute top-0 left-0 w-full h-[80vh] bg-black opacity-40 z-10" />
      <div className="absolute top-0 left-0 w-full h-[80vh] flex flex-col items-start justify-center z-20">
        <p className="text-white text-left text-7xl font-bold w-[80vw] lg:w-[800px] font-sans leading-tight ml-6">
          Staff Hiring
        </p>
      </div>

      <div className="relative bg-[#A3841D] min-h-screen w-full grid grid-rows-auto">
        {/* Text Content */}
        <div className="relative z-10 flex items-center">
          <div className="grid w-[100%] grid-cols-1 md:w-auto md:grid-cols-2 md:gap-4 ml-5">
            <div className="p-4 md:ml-[50px]">
              <p className="text-[30px] font-extralight text-white font-grotesque">
                SSICSIM 2025
              </p>
              <p className="text-[72px] font-bold text-white font-grotesque leading-[1]">
                Staff Hiring
              </p>
            </div>
            <div className="p-4 w-[80%] flex flex-col justify-center">
              <p className="text-[15px] md:text-[20px] font-light text-white font-dm-sans">
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
        <div className="grid grid-cols-1 mt-6 md:grid-rows-2 md:grid-cols-3 gap-4 h-[200vh] md:h-[70vh] w-[90vw] mx-auto">
          {/* First Entry (Occupies the first column in both rows) */}
          <div className="relative h-full row-span-1 md:row-span-2 col-span-1 bg-gradient-to-br from-[#A3841D] to-[#C2A95F] rounded-lg shadow-lg p-6 flex flex-col justify-end items-start text-white">
            <img
              src="/assets/photos/hiring/Moderator.JPG" // Replace with the actual image path
              alt="Moderator"
              className="absolute inset-0 w-[100%] h-[100%] object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-[#A3841D]/60 rounded-md"></div>
            <h3 className="text-3xl font-dm-sans font-extrabold z-20">
              Moderator
            </h3>
            <p className="font-dm-sans text-lg mt-2 z-20">
              Commands the Flow of Debate
            </p>
          </div>

          {/* Second Entry (Occupies the second column in the first row) */}
          <div className="relative h-full row-span-1 col-span-1 bg-gradient-to-br from-[#A3841D] to-[#C2A95F] rounded-lg shadow-lg p-6 flex flex-col justify-end items-start text-white">
            <img
              src="/assets/photos/hiring/CrisisManager.JPG" // Replace with the actual image path
              alt="Moderator"
              className="absolute inset-0 w-[100%] h-[100%] object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-[#A3841D]/60 rounded-md"></div>

            <h3 className="text-3xl font-dm-sans font-extrabold z-20">
              Crisis Manager
            </h3>
            <p className="font-dm-sans text-lg mt-2 z-20">
              Constructs the Committee Storyline
            </p>
          </div>

          {/* Third Entry (Occupies the third column in the first row) */}
          <div className="relative h-full row-span-1 col-span-1 bg-gradient-to-br from-[#A3841D] to-[#C2A95F] rounded-lg shadow-lg p-6 flex flex-col justify-end items-start text-white">
            <img
              src="/assets/photos/hiring/CrisisStaff.JPG" // Replace with the actual image path
              alt="Crisis Staff"
              className="absolute inset-0 w-[100%] h-[100%] object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-[#A3841D]/60 rounded-md"></div>

            <h3 className="text-3xl font-dm-sans font-extrabold z-20">
              Crisis Staff
            </h3>
            <p className="font-dm-sans text-lg mt-2 z-20">
              Steer the Story of Individual Delegates
            </p>
          </div>

          {/* Fourth Entry (Occupies the last two columns in the second row) */}
          <div className="relative h-full row-span-1 col-span-1 bg-gradient-to-br from-[#A3841D] to-[#C2A95F] rounded-lg shadow-lg p-6 flex flex-col justify-end items-start text-white">
            <img
              src="/assets/photos/hiring/CrisisCoordinator.png" // Replace with the actual image path
              alt="Moderator"
              className="absolute inset-0 w-[100%] h-[100%] object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-[#A3841D]/60 rounded-md"></div>
            <h3 className="text-3xl font-extrabold font-dm-sans z-20">
              Crisis Coordinator
            </h3>
            <p className="font-dm-sans text-lg mt-2 z-20">
              Harmonizing Both The Front and Back Rooms
            </p>
          </div>

          <div className="relative h-full row-span-1 col-span-1 bg-gradient-to-br from-[#A3841D] to-[#C2A95F] rounded-lg shadow-lg p-6 flex flex-col justify-end items-start text-white">
            <img
              src="/assets/photos/hiring/StaffSupport.JPG" // Replace with the actual image path
              alt="Staff Support"
              className="absolute inset-0 w-[100%] h-[100%] object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-[#A3841D]/60 rounded-md"></div>

            <h3 className="text-3xl font-extrabold font-dm-sans z-20">
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

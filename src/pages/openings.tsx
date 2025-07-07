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
      <div className="absolute top-0 left-0 w-full h-[80vh] flex flex-col items-start justify-center ml-6 z-20">
        <p className="text-white text-left text-7xl font-bold w-[800px] font-sans leading-tight">
          Staff Hiring
        </p>
      </div>

      <div className="relative bg-[#A3841D] min-h-screen w-full grid grid-rows-auto">
        {/* Text Content */}
        <div className="relative z-10 flex items-center">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 ml-[50px]">
              <p className="text-[30px] font-extralight text-white font-grotesque">
                SSICSM 2025
              </p>
              <p className="text-[72px] font-bold text-white font-grotesque leading-[1]">
                Staff Hiring
              </p>
            </div>
            <div className="p-4 w-[80%] flex flex-col justify-center">
              <p className="text-[20px] font-light text-white font-dm-sans">
                Interested? Check out our open positions below and apply to join
                the SSICSM 2025 staff team! We are looking for individuals who
                are passionate about Model UN, crisis management, and diplomacy.
                Apply here!
              </p>
              <button className="bg-white text-black px-6 py-2 mt-4 rounded-lg hover:bg-gray-200 w-[200px] transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-[2px] bg-white"></div>

{/* Cards Section */}
<div className="grid grid-rows-2 grid-cols-3 gap-4 h-[70vh] w-[90vw] mx-auto">
  {/* First Entry (Occupies the first column in both rows) */}
  <div className="h-full row-span-2 col-span-1 bg-gradient-to-br from-[#A3841D] to-[#C2A95F] rounded-lg shadow-lg p-6 flex flex-col justify-end items-start text-white">
    <h3 className="text-3xl font-dm-sans">Chair</h3>
    <p className="font-dm-sans font-light text-lg mt-2">
      Interested? Take a look at some of these positions! Application link below!
    </p>
  </div>

  {/* Second Entry (Occupies the second column in the first row) */}
  <div className="h-full row-span-1 col-span-1 bg-gradient-to-br from-[#A3841D] to-[#C2A95F] rounded-lg shadow-lg p-6 flex flex-col justify-end items-start text-white">
    <h3 className="text-3xl font-dm-sans">Crisis Manager</h3>
    <p className="font-dm-sans font-light text-lg mt-2">
      Interested? Take a look at some of these positions! Application link below!
    </p>
  </div>

  {/* Third Entry (Occupies the third column in the first row) */}
  <div className="h-full row-span-1 col-span-1 bg-gradient-to-br from-[#A3841D] to-[#C2A95F] rounded-lg shadow-lg p-6 flex flex-col justify-end items-start text-white">
    <h3 className="text-3xl font-dm-sans">Crisis Staff</h3>
    <p className="font-dm-sans font-light text-lg mt-2">
      Interested? Take a look at some of these positions! Application link below!
    </p>
  </div>

  {/* Fourth Entry (Occupies the last two columns in the second row) */}
  <div className="h-full row-span-1 col-span-2 bg-gradient-to-br from-[#A3841D] to-[#C2A95F] rounded-lg shadow-lg p-6 flex flex-col justify-end items-start text-white">
    <h3 className="text-3xl font-dm-sans">Pagers</h3>
    <p className="font-dm-sans font-light text-lg mt-2">
      Interested? Take a look at some of these positions! Application link below!
    </p>
  </div>
</div>
</div>
    </>
  );
};

export default Openings;

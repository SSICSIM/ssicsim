const Mission = () => {
  return (
    <>
      <div className="block w-full min-h-[400px] h-[80vh] max-h-[1200px]">
        <img
          src="/assets/photos/UoftAerialPhoto.jpg"
          alt="University of Toronto Aerial View"
          className="absolute top-0 left-0 w-full min-h-[400px] h-[80vh] max-h-[1200px] object-cover z-10"
          loading="lazy"
        />
        <div className="absolute top-0 left-0 w-full min-h-[400px] h-[80vh] max-h-[1200px] bg-black opacity-40 z-10"></div>
        <div className="max-w-[3000px] mx-auto absolute top-0 left-0 inset-0 w-full min-h-[400px] h-[80vh] flex flex-col items-start justify-center z-20 max-h-[1200px]">
          <h1 className="text-white text-left text-4xl font-bold w-[80vw] lg:w-[800px] font-nunito leading-tight ml-6 md:text-7xl">
            Our Mission
          </h1>
        </div>
      </div>
      <div className="relative pb-7 bg-[white] w-full grid grid-rows-auto">
        <div className="relative z-10 flex items-center max-w-[3000px] mx-auto">
          <div className="grid w-[90%] h-auto grid-cols-1 md:w-auto md:grid-cols-2 md:gap-4 mx-5 my-3">
            <div className="p-4 my-auto md:ml-[50px]">
              <p className="text-[30px] font-extralight text-[#A3841D] font-grotesque">
                SSICSIM 2025
              </p>
              <h2 className="ml-[-3px] text-[72px] md:text-[60px] lg:text-[72px] font-bold text-[#A3841D] font-nunito leading-[1]">
                Our Mission
              </h2>
              <div className="pt-3 w-[80%] flex flex-col justify-center">
                <p className="border-t-[#A3841D] border-t-4 pt-[10px] mt-[5px] text-[15px] lg:text-[20px] font-light text-gray-500 font-dm-sans">
                  The SSICSIM 2025 team is dedicated to providing an engaging
                  and educational Model UN experience for all participants. We
                  aim to foster a deeper understanding of global issues, enhance
                  diplomatic skills, and promote collaboration among students
                  from diverse backgrounds.
                </p>
              </div>
            </div>
            <img src="/assets/photos/MissionPhoto.JPG" alt="Mission Image" className="w-[90%] mx-auto h-auto rounded-lg shadow-lg" />
          </div>
        </div>
        <div className="relative z-10 flex items-center max-w-[3000px] mx-auto mt-9">
          <div className="grid w-[90%] h-auto grid-cols-1 md:w-auto md:grid-cols-2 md:gap-4 mx-5 my-3">
            <img src="/assets/photos/MissionPhoto.JPG" alt="Mission Image" className="w-[90%] mx-auto my-auto h-auto rounded-lg shadow-lg" />
            <div className="p-4 my-auto md:ml-[50px]">
              <p className="text-[30px] font-extralight text-[#A3841D] font-grotesque">
                SSICSIM 2025
              </p>
              <h2 className="ml-[-3px] text-[72px] md:text-[60px] font-bold text-[#A3841D] font-nunito leading-[1]">
                Land Acknowledgement
              </h2>
              <div className="pt-3 w-[100%] flex flex-col justify-center">
                <p className="border-t-[#A3841D] border-t-4 pt-[10px] mt-[5px] text-[15px] lg:text-[20px] font-light text-gray-500 font-dm-sans">
                The land we gather on is traditionally cared for by the Wendat, Haudenosaunee, and Anishinaabek nations, who have lived in balance with it for generations. These Indigenous peoples aided early European settlers and contributed vital survival knowledge. The region of Tkaronto (Toronto) is governed by a treaty with the Mississaugas of the Credit and is part of the Dish With One Spoon agreement, promoting shared stewardship between the Anishinaabek and Haudenosaunee. <br></br><br></br>

The acknowledgement honours the continuing presence of all First Nations, Métis, and Inuit peoples. It emphasizes the need for reconciliation through respectful and renewed relationships between Indigenous and settler peoples, rooted in the spirit of the Covenant Chain agreement. <br></br><br></br>

More than a ritual statement, this land acknowledgement calls for action, critical reflection, and personal responsibility in upholding treaty obligations and engaging meaningfully with the histories and rights of Indigenous peoples.









                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mission;

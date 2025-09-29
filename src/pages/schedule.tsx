import { CF_DOMAIN } from "../utils/consts";
import { scheduleData } from "../utils/data";

const Schedule = () => {
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
            Conference Schedule
          </h1>
        </div>
      </div>

      {/* Schedule Section */}
      <div className="relative bg-gray-100 py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-5xl font-bold font-nunito text-center mb-12">
            Conference Schedule
          </h2>
          <div className="space-y-12">
            {scheduleData.map((day, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-md p-6">
                <h3 className="text-2xl font-bold text-[#A3841D] mb-6">
                  {day.day}
                </h3>
                <div className="space-y-4">
                  {day.sessions.map((session, sIdx) => (
                    <div
                      key={sIdx}
                      className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-200 pb-4 last:border-b-0"
                    >
                      <p className="text-gray-700 font-semibold md:w-1/4">
                        {session.time}
                      </p>
                      <p className="text-gray-900 font-nunito md:w-1/2">
                        {session.title}
                      </p>
                      <p className="text-gray-500 italic md:w-1/4 md:text-right">
                        {session.location}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Schedule;

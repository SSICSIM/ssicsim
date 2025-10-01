import { CF_DOMAIN } from "../utils/consts";
import { resources } from "../utils/data";
import ConferenceSchedule from "../components/Schedule";

const Resources = () => {
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

        {/* Dark overlay only */}
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

        {/* Text */}
        <div className="max-w-[3000px] mx-auto absolute inset-0 flex flex-col items-start justify-center z-20 px-6">
          <h1 className="text-white text-left text-4xl font-bold w-[80vw] lg:w-[800px] font-nunito leading-tight md:text-7xl drop-shadow-md">
            Conference Resources
          </h1>
        </div>
      </div>

      {/* Resources Section */}
      <div className="relative bg-gray-100 py-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-4xl font-bold font-nunito text-center text-[#A3841D]">
            Resources
          </h2>
          <div className="mt-2 mb-8 max-w-2xl mx-auto text-center">
            <p className="text-lg text-gray-700 font-dm-sans">
              Everything you need to prepare, participate, and succeed at the
              conference — from committee archives to the code of conduct and
              conference guides.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resources.map((res, idx) => (
                
              <a
                key={idx}
                href={res.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative h-56 overflow-hidden shadow-lg group rounded-xl"
              >
                {/* Background with gold tint */}
                <div
                  className="absolute inset-0 bg-cover bg-[#A3841D]/40 bg-center transition-transform duration-300 group-hover:scale-105"
                  style={{
                    backgroundImage: `linear-gradient(rgba(163,132,29,0.4), rgba(163,132,29,0.4)), url(${res.bg})`,
                    backgroundBlendMode: "multiply",
                  }}
                />

                {/* Optional: subtle dark overlay for readability */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />

                {/* Glassmorphic text box */}
                <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
                  <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl px-4 py-3">
                    <h3 className="text-2xl font-bold text-white mb-2 font-nunito ">
                      {res.title}
                    </h3>
                    <p className="text-white text-sm font-dm-sans">
                      {res.description}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Description under resources */}
        </div>
                <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-4xl mt-18 font-bold font-nunito text-center text-[#A3841D]">
            Conference Schedule
          </h2>
          <div className="space-y-12">
            <ConferenceSchedule />
          </div>
        </div>
      </div>
    </>
  );
};

export default Resources;

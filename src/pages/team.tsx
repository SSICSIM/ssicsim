import { secretariat } from "../utils/data";
import { CF_DOMAIN } from "../utils/consts";

const Team = () => {
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
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40 z-10"></div>
        <div className="max-w-[2000px] mx-auto absolute inset-0 flex flex-col items-start justify-center z-20 px-6">
          <h1 className="text-white text-left text-4xl md:text-7xl font-bold font-nunito leading-tight">
            Our Team
          </h1>
        </div>
      </div>

      {/* Secretariat Section */}
      <div className="container mx-auto py-16">
        <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          Secretariat
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Meet the minds behind SSICSM
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-[90vw] max-w-[1200px] mx-auto justify-items-center">
        {secretariat.map((member, index) => (
        <div className="w-64 h-80 bg-gray-300 rounded-md shadow-md overflow-hidden relative" key={index}>
            <div
            key={index}
            className="w-56 h-72 bg-gray-100 mt-4 mx-auto rounded-md shadow-md overflow-hidden relative"
            >
            <img
                src={member.image}
                alt={member.name}
                className="absolute top-0 left-0 w-full h-full object-cover object-top"
            />
            <div className="absolute bottom-0 left-0 w-full bg-white bg-opacity-90 p-3 text-center">
                <p className="font-nunito text-lg font-bold text-gray-900">{member.name}</p>
                <p className="font-nunito text-sm text-gray-700">{member.position}</p>
            </div>
            </div> 
        </div>
        ))}
        </div>
      </div>
    </>
  );
};

export default Team;

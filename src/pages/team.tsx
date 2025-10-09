import { secretariat } from "../utils/data";
import { CF_DOMAIN } from "../utils/consts";

const branchPhotos: Record<string, string[]> = {
  "Executive Board": [
    `${CF_DOMAIN}/executive.jpg?format=webp`,
    `${CF_DOMAIN}/secretariat.jpg?format=webp`, // new image added here
  ],
  "External & Internal": [
    `${CF_DOMAIN}/external.jpg?format=webp`,
    `${CF_DOMAIN}/internal.jpg?format=webp`,
  ],
  "Academics & Equity": [
    `${CF_DOMAIN}/academic.png?format=webp`,
    `${CF_DOMAIN}/equity.png?format=webp`,
  ],
};

const branchOrder = [
  "Executive Board",
  "External & Internal",
  "Academics & Equity",
];

const Team = () => {
  // Group members by branch
  const membersByBranch: Record<string, typeof secretariat> = {};
  secretariat.forEach((member) => {
    if (!membersByBranch[member.branch]) membersByBranch[member.branch] = [];
    membersByBranch[member.branch].push(member);
  });

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

      {/* Overarching Title */}
      <div className="text-center mt-16 mb-12 px-6">
        <h2 className="text-4xl md:text-5xl font-bold font-nunito text-gray-800">
          Meet the Minds Behind SSICSIM
        </h2>
        <p className="mt-4 font-dm-sans text-lg md:text-xl font-light text-gray-600 max-w-2xl mx-auto">
          Our dedicated secretariat team is committed to delivering an
          unparalleled Model UN experience. Get to know the passionate
          individuals who bring SSICSIM to life.
        </p>
      </div>

      {/* Secretariat Sections by Branch */}
      {branchOrder.map((branch, index) => {
        const members = membersByBranch[branch];
        if (!members || members.length === 0) return null;

        const isLast = index === branchOrder.length - 1;
        const isImageLeft = index % 2 === 0 && !isLast;
        const isExecutive = branch === "Executive Board";

        return (
          <>
            {/* Branch Title */}
            <div className="text-center mt-16 mb-8 px-6">
              <h2
                className={`text-3xl md:text-5xl border-b-2 text-[#A3841D] border-b-[#A3841D] max-w-[2000px] mx-auto font-bold font-nunito leading-snug tracking-widest text-center`}
              >
                {branch.toUpperCase()}
              </h2>
            </div>
            <div
              key={branch}
              className={`container mx-auto py-8 flex flex-col lg:flex-row ${
                isLast ? "items-center text-center" : "items-center"
              } gap-8 md:gap-16`}
            >
              {/* Image Left or Top */}
              {isImageLeft || isLast ? (
                <div
                  className={`w-full lg:w-[40%] order-last lg:order-first ${
                    isExecutive ? "flex flex-col gap-8" : "flex flex-col gap-8"
                  }`}
                >
                  {branchPhotos[branch].map((imgSrc, idx) => (
                    <div
                      key={idx}
                      className={`w-[90%] mx-auto h-full md:h-[50%] rounded-md overflow-hidden`}
                    >
                      <img
                        src={imgSrc}
                        alt={`${branch} ${idx + 1}`}
                        className="w-full h-full object-cover object-center rounded-md shadow-lg"
                      />
                    </div>
                  ))}
                </div>
              ) : null}

              {/* Members Section */}
              <div
                className={`lg:w-[60%] w-[full] py-8 lg:bg-[#A3841D]/80 rounded-2xl ${isLast ? "mt-8 md:mt-12" : ""}`}
              >
                <div
                  className={`flex flex-wrap gap-6 ${
                    isLast ? "justify-center" : "justify-center"
                  }`}
                >
                  {members.map((member, idx) => (
                    <div
                      key={idx}
                      className="w-64 h-80 bg-gray-300 rounded-md shadow-md overflow-hidden relative"
                    >
                      <div className="w-56 h-72 bg-gray-100 mt-4 mx-auto rounded-md shadow-md overflow-hidden relative">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="absolute top-0 left-0 w-full h-full object-cover object-top"
                        />
                        <div className="absolute bottom-0 left-0 w-full bg-white bg-opacity-90 p-3 text-center">
                          <p className="font-nunito text-lg font-bold text-gray-900">
                            {member.name}
                          </p>
                          <p className="font-nunito text-sm text-gray-700">
                            {member.position}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image Right */}
              {!isImageLeft && !isLast ? (
                <div className="w-full lg:w-[40%] flex flex-col gap-4">
                  {branchPhotos[branch].map((imgSrc, idx) => (
                    <div
                      key={idx}
                      className="w-full h-full lg:h-auto rounded-md overflow-hidden"
                    >
                      <img
                        src={imgSrc}
                        alt={`${branch} ${idx + 1}`}
                        className="w-[90%] mx-auto h-full md:h-[450px] object-cover object-center rounded-md shadow-lg"
                      />
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </>
        );
      })}
    </>
  );
};

export default Team;

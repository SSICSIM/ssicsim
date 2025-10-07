import { secretariat } from "../utils/data";
import { CF_DOMAIN } from "../utils/consts";

const branchPhotos: Record<string, string> = {
  "Executive Board": `${CF_DOMAIN}/executive.jpg?format=webp`,
  "External & Internal": `${CF_DOMAIN}/external.jpg?format=webp`,
  "Academics & Equity": `${CF_DOMAIN}/internal.jpg?format=webp`,
};

const branchOrder = [
  "Executive Board",
  "External & Internal",
  "Academics & Equity"
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
      <div className="text-center my-16 px-6">
        <h2 className="text-4xl md:text-5xl font-bold font-nunito text-gray-800">
          Meet the Minds Behind SSICSM
        </h2>
      </div>

      {/* Secretariat Sections by Branch */}
      {branchOrder.map((branch) => {
        const members = membersByBranch[branch];
        if (!members || members.length === 0) return null;

        const branchHeader = (
          <div className="relative w-full h-64 mb-10 rounded-md overflow-hidden">
            <img
              src={branchPhotos[branch]}
              alt={branch}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
              <h2 className="text-white text-3xl md:text-5xl font-bold font-nunito leading-snug tracking-widest">
                {branch.toUpperCase()}
              </h2>
            </div>
          </div>
        );

        const membersGrid = (
          <div className="flex flex-wrap justify-center gap-6 w-[90vw] max-w-[1200px] mx-auto">
            {members.map((member, index) => (
              <div
                key={index}
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
        );

        return (
          <div key={branch} className="container mx-auto py-16">
                {branchHeader}
                {membersGrid}
          </div>
        );
      })}
    </>
  );
};

export default Team;

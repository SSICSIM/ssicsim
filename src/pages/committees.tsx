import { useState, useEffect } from "react";
import CommiteeCard from "../components/CommiteeCard";
import { useLocation } from "react-router-dom";
import { committeesData } from "../utils/data";
import { CF_DOMAIN } from "../utils/consts";

const Committees = () => {
  const location = useLocation(); // Access the current URL
  const queryParams = new URLSearchParams(location.search); // Parse query parameters
  const checkFilter = queryParams.get("filter") || "All"; // Get the 'filter' parameter or default to 'All'

  const [filter, setFilter] = useState<string>("All");

  useEffect(() => {
    setFilter(checkFilter);
  }, [checkFilter]);
  // Filter committees based on the selected category
  const filteredCommittees =
    filter === "All"
      ? committeesData
      : committeesData.filter((committee) => committee.category === filter);

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
        <div className="max-w-[2000px] mx-auto absolute top-0 left-0 inset-0 w-full min-h-[400px] h-[80vh] flex flex-col items-start justify-center z-20 max-h-[1200px]">
          <h1 className="text-white text-left text-4xl font-bold w-[80vw] lg:w-[800px] font-nunito leading-tight ml-6 md:text-7xl">
            Committees
          </h1>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="container mx-auto py-10">
        {/* Blurb */}
        <div className="text-center mb-6">
          <p className="text-lg text-gray-700">
            Click on the buttons below to filter through specific committees by
            category.
          </p>
        </div>
        {/* Filter Buttons */}
        {/* Filter Buttons */}
        <div className="w-full">
          <div className="flex flex-wrap justify-center gap-4 px-4 mb-8 w-full">
            <button
              className={`px-4 py-2 rounded ${
                filter === "All"
                  ? "bg-[#A3841D] text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => setFilter("All")}
            >
              All
            </button>
            <button
              className={`px-4 py-2 rounded ${
                filter === "Historical"
                  ? "bg-[#A3841D] text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => setFilter("Historical")}
            >
              Historical
            </button>
            <button
              className={`px-4 py-2 rounded ${
                filter === "Fictional"
                  ? "bg-[#A3841D] text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => setFilter("Fictional")}
            >
              Fictional
            </button>
            <button
              className={`px-4 py-2 rounded ${
                filter === "Conceptual"
                  ? "bg-[#A3841D] text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => setFilter("Conceptual")}
            >
              Conceptual
            </button>
          </div>
        </div>{" "}
        {/* Committee Cards */}
<div className="grid grid-cols-1 w-[100%] mx-auto 
                md:grid-cols-2 md:w-[85%] md:mx-auto 
                xl:grid-cols-3 xl:w-[100%] gap-4 justify-items-center">
  {filteredCommittees.map((committee, index) => (
    <CommiteeCard
      key={index}
      title={committee.title}
      description={committee.description}
      expandedDescription={committee.expandedDescription}
      backgroundGuides={committee.backgroundGuides}
      contactEmail={committee.contactEmail}
      director={committee.director}
      directorImage={committee.directorImage}
      backgroundImage={committee.backgroundImage}
      jointOrNot={committee.jointOrNot}
      double={committee.double}
    />
  ))}
</div>
      </div>
    </>
  );
};

export default Committees;

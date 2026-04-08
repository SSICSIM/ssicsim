"use client";

import { useState, useEffect } from "react";
import CommiteeCard from "../components/CommiteeCard";
import { useSearchParams } from "next/navigation";
import { committeesData } from "../utils/data";
import { CF_DOMAIN } from "../utils/consts";
import Image from "next/image";

const Committees = () => {
  const searchParams = useSearchParams();
  const checkFilter = searchParams.get("filter") || "All";

  const [filter, setFilter] = useState<string>("All");

  useEffect(() => {
    setFilter(checkFilter);
  }, [checkFilter]);

  const filteredCommittees =
    filter === "All"
      ? committeesData
      : committeesData.filter((committee) => committee.category === filter);

  return (
    <>
      <div className="relative block w-full min-h-[400px] h-[80vh] max-h-[1200px]">
        <Image
          src={`${CF_DOMAIN}/UoftAerialPhoto.jpg?format=webp`}
          alt="University of Toronto Aerial View"
          fill
          priority
          sizes="100vw"
          className="absolute top-0 left-0 object-cover z-10"
        />
        <div className="absolute top-0 left-0 w-full min-h-[400px] h-[80vh] max-h-[1200px] bg-black opacity-40 z-10"></div>
        <div className="max-w-[2000px] mx-auto absolute top-0 left-0 inset-0 w-full min-h-[400px] h-[80vh] flex flex-col items-start justify-center z-20 max-h-[1200px]">
          <h1 className="text-white text-left text-4xl font-bold w-[80vw] lg:w-[800px] font-nunito leading-tight ml-6 md:text-7xl">
            Committees
          </h1>
        </div>
      </div>

      <div className="container mx-auto py-10">
        <div className="text-center mb-6">
          <p className="text-lg text-gray-700">
            Click on the buttons below to filter through specific committees by
            category.
          </p>
        </div>
        <div className="w-full">
          <div className="flex flex-wrap justify-center gap-4 px-4 mb-8 w-full">
            {(["All", "Historical", "Fictional", "Conceptual"] as const).map(
              (name) => (
                <button
                  key={name}
                  className={`px-4 py-2 rounded ${
                    filter === name
                      ? "bg-[#A3841D] text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  onClick={() => setFilter(name)}
                >
                  {name}
                </button>
              ),
            )}
          </div>
        </div>

        <div
          className="grid grid-cols-1 w-[100%] mx-auto 
                md:grid-cols-2 md:w-[85%] md:mx-auto 
                xl:grid-cols-3 xl:w-[100%] gap-4 justify-items-center"
        >
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

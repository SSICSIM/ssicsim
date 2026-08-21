"use client";

import CommiteeCard from "../components/CommiteeCard";
import { CF_DOMAIN } from "../utils/consts";
import { committeesData } from "../utils/data";
import Image from "next/image";

const Committees = () => {
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
        <div className="absolute top-0 left-0 w-full min-h-[400px] h-[80vh] max-h-[1200px] bg-black opacity-40 z-10" />
        <div className="max-w-[2000px] mx-auto absolute top-0 left-0 inset-0 w-full min-h-[400px] h-[80vh] flex flex-col items-start justify-center z-20 max-h-[1200px]">
          <h1 className="text-white text-left text-4xl font-bold w-[80vw] lg:w-[800px] font-nunito leading-tight ml-6 md:text-7xl">
            Committees
          </h1>
        </div>
      </div>

      <div className="container mx-auto py-10">
        <div
          className="grid grid-cols-1 w-[100%] mx-auto
            md:grid-cols-2 md:w-[85%] md:mx-auto
            xl:grid-cols-3 xl:w-[100%] gap-4 justify-items-center"
        >
          {committeesData.map((committee) => (
            <CommiteeCard
              key={committee.title}
              title={committee.title}
              description={committee.description}
              expandedDescription={committee.expandedDescription}
              backgroundGuides={committee.backgroundGuides}
              contactEmail={committee.contactEmail}
              director={committee.director}
              backgroundImage={committee.backgroundImage}
              logo={committee.logo}
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

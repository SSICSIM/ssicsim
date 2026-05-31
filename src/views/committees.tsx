"use client";

import { useState, useEffect } from "react";
import CommiteeCard from "../components/CommiteeCard";
import { CF_DOMAIN } from "../utils/consts";
import Image from "next/image";

interface Committee {
  id: string;
  name: string;
  small_description: string;
  large_description: string;
  director_name: string;
  chair_name: string | null;
  crisis_analysts: string[];
  max_delegates: number | null;
  background_guide_link: string | null;
  mechanics_guide_link: string | null;
  character_guide_link: string | null;
  image_url: string | null;
}

function buildGuides(c: Committee) {
  const guides = [];
  if (c.background_guide_link)
    guides.push({ description: "Background Guide", link: c.background_guide_link });
  if (c.mechanics_guide_link)
    guides.push({ description: "Mechanics Guide", link: c.mechanics_guide_link });
  if (c.character_guide_link)
    guides.push({ description: "Character Guide", link: c.character_guide_link });
  return guides;
}

const Committees = () => {
  const [committees, setCommittees] = useState<Committee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/committees")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch");
        return r.json();
      })
      .then((data: Committee[]) => {
        setCommittees(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Unable to load committees. Please try again later.");
        setLoading(false);
      });
  }, []);

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
        {loading && (
          <div className="flex justify-center items-center py-24">
            <div className="w-10 h-10 border-4 border-[#A3841D] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {error && (
          <div className="text-center text-red-500 py-20 font-dm-sans">{error}</div>
        )}

        {!loading && !error && committees.length === 0 && (
          <div className="text-center text-gray-500 py-20 font-dm-sans">
            No committees have been added yet.
          </div>
        )}

        {!loading && !error && committees.length > 0 && (
          <div
            className="grid grid-cols-1 w-[100%] mx-auto
              md:grid-cols-2 md:w-[85%] md:mx-auto
              xl:grid-cols-3 xl:w-[100%] gap-4 justify-items-center"
          >
            {committees.map((committee) => (
              <CommiteeCard
                key={committee.id}
                title={committee.name}
                description={committee.small_description}
                expandedDescription={committee.large_description}
                backgroundGuides={buildGuides(committee)}
                director={committee.director_name}
                backgroundImage={committee.image_url ?? ""}
                jointOrNot={false}
                double={false}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Committees;

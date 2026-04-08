import { CF_DOMAIN } from "../utils/consts";
import Image from "next/image";

const sponsors = [
  "CEES.png",
  "MunkSchool.png",
  "PoliticalScience.png",
  "SchoolOfCities.png",
  "TheRoyalSonesta.webp",
  "WizePrep.png",
];

export default function LogoMarquee() {
  return (
    <div className="overflow-hidden py-6 z-[20] w-full max-w-[2000px] mx-auto">
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>

      <div
        className="flex w-max animate-scroll"
        style={{
          animation: "scroll 20s linear infinite",
        }}
      >
        {/* Duplicate once */}
        {[...sponsors, ...sponsors, ...sponsors, ...sponsors].map(
          (src, index) => (
            <Image
              key={index}
              src={`${CF_DOMAIN}/${src}?format=webp`}
              alt={`sponsor-${index}`}
              width={200}
              height={80}
              className="h-[5vh] w-auto object-contain mx-6"
            />
          ),
        )}
      </div>
    </div>
  );
}

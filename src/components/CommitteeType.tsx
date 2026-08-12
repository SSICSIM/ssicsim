"use client";

import Link from "next/link";

interface CommitteeTypeProps {
  title: string;
  description: string;
  onClick: () => void;
  isSelected: boolean;
}

const CommitteeType = ({
  title,
  description,
  onClick,
  isSelected,
}: CommitteeTypeProps) => {
  return (
    <div
      className={`w-full rounded-lg p-8 flex flex-col items-center cursor-pointer transition-colors duration-300 ${
        isSelected
          ? "bg-[#A3841D] text-white"
          : "bg-white text-black hover:bg-gray-200"
      }`}
      onClick={onClick}
    >
      <div className="flex flex-row items-center md:items-start justify-center w-full h-[100%] md:h-[100%]">
        <div className="text-3xl md:text-4xl lg:text-[55px] font-nunito break-words flex-1">
          {title}
        </div>
        <div
          className={`flex items-center justify-center w-[80px] h-[80px] md:w-[55px] md:h-[55px] rounded-full self-center md:self-start transition-colors duration-300 ${
            isSelected ? "bg-white text-black" : "bg-gray-300 text-black"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-[30px] h-[30px] md:w-[45px] md:h-[45px] transform transition-transform duration-300 relative ${
              isSelected ? "rotate-180" : "rotate-0"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            {isSelected ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16" />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            )}
          </svg>
        </div>
      </div>

      <div
        className={`grid transition-all duration-300 ${
          isSelected ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="flex flex-col overflow-hidden">
          <div className="font-light font-dm-sans text-md md:text-start text-center break-words md:mb-0 pt-4">
            {description}
          </div>
          <Link
            href={`/committees?filter=${title}`}
            className="md:mb-0 my-4 px-6 py-2 bg-white text-center text-[#A3841D] rounded-lg font-dm-sans text-lg hover:bg-gray-200 transition-colors"
          >
            View {title} Committees
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CommitteeType;

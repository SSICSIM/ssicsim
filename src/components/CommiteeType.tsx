"use client";

import Link from "next/link";

interface CommiteeTypeProps {
  title: string;
  description: string;
  onClick: () => void;
  isSelected: boolean;
}

const CommiteeType = ({
  title,
  description,
  onClick,
  isSelected,
}: CommiteeTypeProps) => {
  return (
    <div
      className={`md:w-[100%] md:max-w-[600px] w-[80%] rounded-lg p-8 flex flex-col items-center md:flex-row cursor-pointer transition-colors duration-300 ${
        isSelected
          ? "bg-[#A3841D] text-white"
          : "bg-white text-black hover:bg-gray-200"
      }`}
      onClick={onClick}
    >
      <div className="flex flex-col items-center md:items-start justify-center w-full md:w-[80%] h-[100%] md:h-[100%]">
        <div className="text-3xl md:text-4xl lg:text-[55px] font-nunito break-words mb-2">
          {title}
        </div>
        {isSelected && (
          <div className="font-light font-dm-sans text-md md:text-start text-center break-words md:mb-0">
            {description}
          </div>
        )}
        {isSelected && (
          <Link
            href={`/committees?filter=${title}`}
            className="my-4 px-6 py-2 bg-white text-center text-[#A3841D] rounded-lg font-dm-sans text-lg hover:bg-gray-200 transition-colors"
          >
            View {title} Committees
          </Link>
        )}
      </div>

      <div
        className={`flex items-center justify-center w-[80px] h-[80px] md:w-[60px] md:h-[60px] rounded-full self-center md:self-start transition-colors duration-300 ${
          isSelected ? "bg-white text-black" : "bg-gray-300 text-black"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-[30px] h-[30px] md:w-[50px] md:h-[50px] transform transition-transform duration-300 ${
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
  );
};

export default CommiteeType;

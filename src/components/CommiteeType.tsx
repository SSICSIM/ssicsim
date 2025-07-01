interface CommiteeTypeProps {
  title: string;
  description: string;
  onClick: () => void; // Callback for handling selection
  isSelected: boolean; // Whether this committee type is selected
}

const CommiteeType = ({
  title,
  description,
  onClick,
  isSelected,
}: CommiteeTypeProps) => {
  return (
    <div
      className={`w-[40vw] h-auto rounded-lg p-8 flex cursor-pointer transition-colors duration-300 ${
        isSelected
          ? "bg-[#A3841D] text-white"
          : "bg-white text-black hover:bg-gray-200"
      }`}
      onClick={onClick}
    >
      {/* Title and Description */}
      <div className="flex flex-col justify-center w-[80%] h-[100%] pl-8 rounded-lg mb-4">
        <div className="font-light text-8xl mb-4 font-dm-sans">{title}</div>
        {isSelected && (
          <div className="font-light font-dm-sans text-md">{description}</div>
        )}
      </div>

      {/* Circle with Plus/Minus */}
      <div
        className={`flex items-center justify-center w-[100px] h-[100px] rounded-full self-center mb-4 transition-colors duration-300 ${
          isSelected ? "bg-white text-black" : "bg-gray-300 text-black"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-[50px] h-[50px] transform transition-transform duration-300 ${
            isSelected ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          {isSelected ? (
            // Minus Icon
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16" />
          ) : (
            // Plus Icon
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

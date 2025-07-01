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
        className={`w-full max-w-[900px] min-w-[700px] rounded-lg p-8 flex flex-col md:flex-row cursor-pointer transition-colors duration-300 ${
          isSelected
            ? "bg-[#A3841D] text-white"
            : "bg-white text-black hover:bg-gray-200"
        }`}
        onClick={onClick}
      >
        {/* Title and Description */}
        <div className="flex flex-col justify-center w-full md:w-[80%] h-[100%] md:h-[100%]">
          <div className="font-light text-3xl md:text-5xl lg:text-6xl font-dm-sans break-words">
            {title}
          </div>
          {isSelected && (
            <div className="font-light font-dm-sans text-sm md:text-md break-words">
              {description}
            </div>
          )}
        </div>
  
        {/* Circle with Plus/Minus */}
        <div
          className={`flex items-center justify-center w-[80px] h-[80px] md:w-[100px] md:h-[100px] rounded-full self-center md:self-start transition-colors duration-300 ${
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
interface RegistrationStepProps {
  title: string;
  description: string;
}

const RegistrationStep = ({ title, description }: RegistrationStepProps) => {
  return (
    <div className="w-full h-full rounded-lg p-8 flex flex-col items-center md:flex-row bg-white shadow-lg text-black transition-colors duration-300 hover:bg-[#A3841D] hover:text-white">
      {/* Circle with Plus Icon */}
      <div className="flex items-center justify-center w-[75px] h-[75px] mr-7 rounded-full bg-gray-300 text-black hover:bg-white hover:text-[#A3841D] transition-colors duration-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-[30px] h-[30px] md:w-[50px] md:h-[50px]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </div>

      {/* Title and Description */}
      <div className="flex flex-col justify-center w-full md:w-[80%] h-full">
        <div className="font-regular text-3xl md:text-4xl lg:text-4xl font-dm-sans break-words">
          {title}
        </div>
        <div className="font-light font-dm-sans text-md break-words pt-4">
          {description}
        </div>
      </div>
    </div>
  );
};

export default RegistrationStep;

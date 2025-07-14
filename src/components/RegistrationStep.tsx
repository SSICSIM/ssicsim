interface RegistrationStepProps {
  title: string;
  description: string;
  icon: React.ReactNode; // Add an icon prop to accept a unique SVG
}

const RegistrationStep = ({
  title,
  description,
  icon,
}: RegistrationStepProps) => {
  return (
    <div className="w-[80%] mx-auto md:w-full h-full rounded-lg p-8 flex flex-col items-center md:flex-row bg-white shadow-lg text-black transition-colors duration-300 hover:bg-[#A3841D] hover:text-white">
      {/* Unique Icon */}
      <div className="flex items-center justify-center w-[75px] h-[75px] mr-7 rounded-full bg-gray-300 text-black hover:bg-white hover:text-[#A3841D] transition-colors duration-300">
        {icon}
      </div>

      {/* Title and Description */}
      <div className="flex flex-col justify-center w-full md:w-[80%] h-full">
        <div className="font-regular text-2xl md:text-3xl font-nunito break-words">
          {title}
        </div>
        <div className="font-light font-dm-sans text-sm break-words pt-4">
          {description}
        </div>
      </div>
    </div>
  );
};

export default RegistrationStep;

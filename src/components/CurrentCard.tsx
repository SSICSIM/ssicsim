interface CurrentCardProps {
  title: string;
  image: string;
  description: string;
}

const CurrentCard = ({ title, image, description }: CurrentCardProps) => {
  return (
    <>
      <div className="flex flex-col h-[100%] md:w-[100%] p-6 z-[10] bg-white/30 backdrop-blur-lg rounded-lg border border-white/10 shadow-lg">
        {/* Image Section */}
        <div className="h-[60%] flex items-center justify-center">
          <div className="relative w-full h-full rounded-md">
            <img
              src={image}
              className="md:w-full h-full object-cover rounded-md mx-auto"
              alt="Current Card Image"
            />
            <div className="absolute inset-0 bg-[#A3841D]/50 rounded-md"></div>
          </div>
        </div>

        {/* Text Section */}
        <div className="flex flex-col p-6">
          <h2 className="text-[30px]/6 text-white font-grotesque font-bold md:text-[25px] lg:text-[30px] tracking-tight mb-2 ">
            {title}
          </h2>
          <p className="text-white font-dm-sans font-extralight md:text-[15px] text-[20px] lg:text-[20px]">
            {description}
          </p>
        </div>
      </div>
    </>
  );
};

export default CurrentCard;

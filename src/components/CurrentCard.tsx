interface CurrentCardProps {
  title: string;
  image: string;
  description: string;
}

const CurrentCard = ({ title, image, description }: CurrentCardProps) => {
  return (
    <>
      <div className="flex flex-col h-auto md:h-[100%] w-[90%] mx-auto md:w-[100%] p-6 z-[10] bg-white/30 backdrop-blur-lg rounded-lg border border-white/10 shadow-lg">
        {/* Image Section */}
        <div className="h-[60%] flex items-center justify-center">
        <div className="relative w-full h-full rounded-md">
  <img
    src={image}
    className="md:w-full h-[100%] object-cover rounded-md mx-auto"
    alt="Current Card Image"
  />
  {/* Filter Overlay */}
  <div className="absolute inset-0 bg-[#A3841D]/50 rounded-md"></div>
</div>        </div>

        {/* Text Section */}
        <div className="flex flex-col py-6">
          <h2 className="text-[30px]/7 text-center md:text-start text-white font-grotesque font-bold md:text-[25px] lg:text-[30px] tracking-tight mb-2 ">
            {title}
          </h2>
          <p className="text-white font-dm-sans font-extralight md:text-[15px] text-[15px] lg:text-[20px]">
            {description}
          </p>
        </div>
      </div>
    </>
  );
};

export default CurrentCard;

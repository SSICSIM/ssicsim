interface CurrentCardProps {
    title: string;
    image: string;
    description: string;
  }
  
  const CurrentCard = ({ title, image, description }: CurrentCardProps) => {
    return (
      <>
<div className="flex flex-col h-[100%] w-[100%]">
  {/* Image Section */}
  <div className="h-[60%] flex items-center justify-center"> {/* Increased height to 70% */}
    <div className="relative w-full h-full rounded-md"> {/* Set height to full */}
      <img
        src={image}
        className="w-full h-full object-cover rounded-md" /* Ensures the image stretches and fills the container */
        alt="Current Card Image"
      />
      <div className="absolute inset-0 bg-[#A3841D]/50 rounded-md"></div>
    </div>
  </div>

  {/* Text Section */}
  <div className="h-[40%] flex flex-col p-6"> {/* Reduced height to 30% */}
    <h2 className="text-[30px] text-white font-grotesque font-bold">{title}</h2>
    <p className="text-white font-dm-sans font-extralight text-[20px]">{description}</p>
  </div>
</div>

      </>
    );
  };
  
  export default CurrentCard;
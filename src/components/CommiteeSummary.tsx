interface Props {
  title: string;
  description: string;
  image: string;
  index: number;
}

export default function CommitteeSummary({ title, description, image }: Props) {
  return (
    <div
      className="
      committee-card 
      mt-[8vh] 
      h-[70vh] 
      w-[300px] md:w-[380px] 
      flex-shrink-0 
      bg-white/80 
      backdrop-blur-lg 
      rounded-3xl 
      shadow-[0_10px_30px_rgba(0,0,0,0.12)] 
      overflow-hidden 
      border border-white/30
      hover:-translate-y-2 
      hover:shadow-[0_12px_35px_rgba(0,0,0,0.18)]
      transition-all duration-300
    "
    >
      <div className="relative">
        <img src={image} alt={title} className="w-full h-[40vh] object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/50"></div>
      </div>

      <div className="p-6 flex flex-col justify-center h-[30vh]">
        <h3
          className="
      font-bold 
      w-full 
      whitespace-normal 
      break-words
      text-[#A3841D] 
      text-[1.6rem] 
      text-center 
      leading-tight 
      mb-3 
      font-nunito 
      drop-shadow
    "
        >
          {title}
        </h3>

        <p
          className="
      text-base 
      w-full 
      whitespace-normal 
      break-words
      text-gray-700 
      text-center 
      leading-snug 
      font-dm-sans 
      opacity-90
    "
        >
          {description}
        </p>
      </div>
    </div>
  );
}

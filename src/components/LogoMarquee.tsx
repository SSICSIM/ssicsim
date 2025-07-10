const sponsors = [
  "/assets/photos/logos/CEES.png",
  "/assets/photos/logos/MunkSchool.png",
  "/assets/photos/logos/PoliticalScience.png",
  "/assets/photos/logos/SchoolOfCities.png",
  "/assets/photos/logos/TheRoyalSonesta.webp",
  "/assets/photos/logos/WizePrep.png",
];

export default function LogoMarquee() {
  return (
    <div className="overflow-hidden whitespace-nowrap py-6 z-[20] w-full">
      <style>
        {`
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); } /* shift by half if repeating */
            }
          `}
      </style>
      <div
        className="inline-flex space-x-12"
        style={{
          animation: "marquee 20s linear infinite",
        }}
      >
        {/* Repeat logos twice for seamless loop */}
        {[...sponsors, ...sponsors, ...sponsors, ...sponsors, ...sponsors].map(
          (src, index) => (
            <img
              key={index}
              src={src}
              alt="sponsor"
              className="h-[5vh] w-auto object-contain"
            />
          ),
        )}
      </div>
    </div>
  );
}

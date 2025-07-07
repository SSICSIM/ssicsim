import ScrollScrub from "../components/ScrollTriger";
import CurrentCard from "../components/CurrentCard";
import CommiteeType from "../components/CommiteeType";
import { useState } from "react";


const Landing = () => {
  const [selectedCommittee, setSelectedCommittee] = useState<string | null>(
    null,
  );

  const committees = [
    {
      title: "Fictional",
      description:
        "Fictional Crises bring to life the fantastical worlds of real fiction pieces (ie. Cinema, TV, Books, Adaptations of Current Events, etc.). Here, delegates will need to bring their knowledge of these fictional worlds in order to fully explore the scope of the committee and it’s alternate storylines.",
      image: "/assets/photos/Fictional.png",
    },
    {
      title: "Historical",
      description:
        "Historical Crises are, well, historical committees! They bring to life major historical events, be it ancient, medieval, or modern, and implore delegates to reimagine them through various lenses or recreate the events of the past, often with a more academic approach to understanding history and its agents.",
      image: "/assets/photos/Historical.png",
    },
    {
      title: "Conceptual",
      description:
        "Conceptual Crises are an opportunity for delegates to engage critically with complex, unconventional crises mechanics/topics. Delegates in these committees might find themselves challenged with non-traditional modes of debate or mechanics and crisis arcs that cannot be fully pre-researched.",
      image: "/assets/photos/Conceptual.png",
    },
  ];

  const handleCommitteeClick = (title: string) => {
    setSelectedCommittee(title === selectedCommittee ? null : title); // Toggle selection
  };

  const selectedCommitteeData = committees.find(
    (committee) => committee.title === selectedCommittee,
  );

  return (
    <>
      <div>
        <div className="w-full h-screen overflow-hidden">
          <img
            src="/assets/photos/UoftAerialPhoto.jpg"
            alt="University of Toronto Ariel View"
            className="absolute top-0 left-0 w-full h-screen object-cover z-10"
          />
        </div>
        <div className="absolute top-0 left-0 w-full h-screen bg-black opacity-40 z-10" />
        <div className="md:opacity-100 opacity-0 absolute left-0 top-0 w-0 h-0 border-t-[80vh] mt-[20vh] mb-[20px] border-t-transparent border-l-[60vw] border-l-[#D3AF37]/50 z-10" />
        <div className="md:opacity-100 opacity-0 absolute right-0 top-0 w-0 h-0 border-t-[80vh] mt-[20vh] mb-[20px] border-t-transparent border-b-transparent border-r-[60vw] border-r-[#D3AF37]/50 border-opacity-50 z-10" />

        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-start justify-center ml-6 z-20">
          <p className="text-white text-left md:text-7xl font-bold md:w-[800px] w-[80vw] font-sans leading-tight text-4xl">
            Canada’s Premier Model UN Crisis Simulation
          </p>
          <p className="text-white text-left md:text-[35px] w-[60vw] text-[25px] font-normal italic md:w-[800px]">
            Toronto, ON
          </p>
        </div>
      </div>
      <div className="relative bg-white h-screen w-full flex items-center justify-center overflow-hidden">
  {/* Mesh Gradient Background */}
  <div className="absolute inset-0 z-0">
    <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700] via-[#FFC107] to-[#FF8C00] opacity-30"></div>
    {/* Geometric Shapes */}
    <div className="absolute top-10 left-10 w-[200px] h-[200px] bg-gradient-to-tr from-[#A3841D] to-[white] rounded-full blur-xl opacity-50 animate-pulse"></div>
    <div className="absolute bottom-20 right-20 w-[300px] h-[300px] bg-gradient-to-bl from-[#A3841D] to-[white] rounded-full blur-2xl opacity-40 animate-pulse"></div>
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-r from-[#FFD700] to-[white] rounded-full blur-3xl opacity-20"></div>
  </div>

  {/* Text Content */}
  <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
    <h3 className="text-4xl font-dm-sans mb-4 text-gray-800">The numbers tell the story</h3>
    <ScrollScrub>
      <h1 className="text-6xl font-bold mb-2 text-gray-900">13 years</h1>
    </ScrollScrub>
    <ScrollScrub>
      <h1 className="text-6xl font-bold mb-2 text-gray-900">300+ delegates</h1>
    </ScrollScrub>
    <ScrollScrub>
      <h1 className="text-6xl font-bold mb-2 text-gray-900">One unrivaled experience</h1>
    </ScrollScrub>
  </div>
</div>
<div className="relative bg-[#A3841D] w-screen grid grid-rows-auto">
  {/* Text Content */}
  <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-4 md:gap-8 px-4 md:px-12 py-8">
    <div className="md:w-1/2 px-4">
      <p className="text-[24px] md:text-[30px] font-extralight text-white font-grotesque">
        SSICSM 2025
      </p>
      <p className="text-[36px] md:text-[72px] font-bold text-white font-grotesque leading-tight">
        Where Strategy Meets Urgency
      </p>
    </div>
    <div className="md:w-1/2 flex flex-col px-4 justify-center">
      <p className="text-[16px] md:text-[20px] font-light text-white font-dm-sans">
        Most MUNs focus on structured diplomacy—SSICSIM does it differently.
        Delegates think on their feet, adapt fast, and tackle real-time crises
        like real-world leaders.
      </p>
      <button className="bg-white text-black px-6 py-2 mt-4 rounded-lg hover:bg-gray-200 w-[150px] md:w-[200px] transition-colors">
        Learn More
      </button>
    </div>
  </div>

  {/* Divider */}
  <div className="w-full h-[2px] bg-white my-4"></div>

{/* Cards Section */}
<div className="grid grid-cols-1 md:grid-cols-3 md:gap-4 px-4 md:px-8 py-8 mx-auto overflow-hidden">
  <div className="md:p-4">
    <CurrentCard
      title="A Staff Team Like No Other"
      image="/assets/photos/Photo1.png"
      description="Our staff team is a diverse group of individuals with a wide range of expertise, from crisis management to diplomacy. We are committed to providing an unparalleled experience for all delegates."
    />
  </div>
  <div className="md:p-4">
    <CurrentCard
      title="Constant Collaboration"
      image="/assets/photos/Photo2.png"
      description="With the added pressure of crises, delegates must work together to find solutions. Our simulation encourages teamwork and collaboration, allowing delegates to develop their leadership skills."
    />
  </div>
  <div className="md:p-4">
    <CurrentCard
      title="Real-Time Crisis Action"
      image="/assets/photos/Photo3.png"
      description="In SSICSIM, delegates are faced with real-time crises that require quick thinking and decisive action. This unique approach to Model UN allows delegates to experience the thrill of crisis management firsthand."
    />
  </div>
</div>
  {/* Committee Types and Image Section */}
  <div className="bg-gray-100 h-auto w-full px-4 md:px-12 py-8 flex flex-col md:flex-row gap-8 items-center">
    {/* Committee Types */}
    <div className="flex flex-col justify-center items-center gap-4 w-full md:w-[50%]">
      {committees.map((committee) => (
        <CommiteeType
          key={committee.title}
          title={committee.title}
          description={committee.description}
          onClick={() => handleCommitteeClick(committee.title)}
          isSelected={selectedCommittee === committee.title}
        />
      ))}
    </div>

    {/* Image Section */}
    <div className="w-full md:w-[50%] flex items-center justify-center">
      {selectedCommitteeData ? (
        <img
          src={selectedCommitteeData.image}
          alt={selectedCommitteeData.title}
          className="w-[80%] md:w-[100%] mx-auto h-auto object-cover rounded-lg"
        />
      ) : (
        <img
          src="/assets/photos/default.png"
          alt="Default Image"
          className="w-[80%] md:w-[100%] mx-auto h-auto object-cover rounded-lg"
        />
      )}
    </div>
  </div>
</div>      <div className="bg-gray-100 h-auto w-screen py-12 flex flex-col items-center justify-center">
        <h3 className="text-4xl font-dm-sans mb-8">Our Sponsors</h3>
        <div className="relative w-full overflow-hidden">
          <div className="animate-horizontalScroll flex gap-8 items-center w-[200%]">
            <img
              src="/assets/sponsors/sponsor1.png"
              alt="Sponsor 1"
              className="w-[150px] h-auto object-contain"
            />
            <img
              src="/assets/sponsors/sponsor2.png"
              alt="Sponsor 2"
              className="w-[150px] h-auto object-contain"
            />
            <img
              src="/assets/sponsors/sponsor3.png"
              alt="Sponsor 3"
              className="w-[150px] h-auto object-contain"
            />
            <img
              src="/assets/sponsors/sponsor4.png"
              alt="Sponsor 4"
              className="w-[150px] h-auto object-contain"
            />
            {/* Repeat the logos to create a seamless loop */}
            <img
              src="/assets/sponsors/sponsor1.png"
              alt="Sponsor 1"
              className="w-[150px] h-auto object-contain"
            />
            <img
              src="/assets/sponsors/sponsor2.png"
              alt="Sponsor 2"
              className="w-[150px] h-auto object-contain"
            />
            <img
              src="/assets/sponsors/sponsor3.png"
              alt="Sponsor 3"
              className="w-[150px] h-auto object-contain"
            />
            <img
              src="/assets/photos/Photo1.png"
              alt="Sponsor 4"
              className="w-[150px] h-auto object-contain"
            />
          </div>
        </div>
      </div>
      <div className="bg-[#A3841D] text-white py-8">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
          {/* Left Section */}
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h4 className="text-3xl font-bold font-grotesque">SSICSM 2025</h4>
            <p className="text-sm mt-2 font-dm-sans font-light">
              Canada’s Premier Model UN Crisis Simulation
            </p>
          </div>

          {/* Center Section */}
          <div className="font-dm-sans font-light flex flex-col md:flex-row gap-4 text-center">
            <a href="#about" className="hover:underline">
              About Us
            </a>
            <a href="#committees" className="hover:underline">
              Committees
            </a>
            <a href="#sponsors" className="hover:underline">
              Sponsors
            </a>
            <a href="#contact" className="hover:underline">
              Contact
            </a>
          </div>

          {/* Right Section */}
          <div className="text-center md:text-right">
            <p className="text-sm font-dm-sans font-light">
              © 2025 SSICSM. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;

import React, { useState } from "react";

interface CommiteeCardProps {
  title: string;
  description: string;
  expandedDescription: string;
  backgroundGuideLink?: string;
  director?: string;
  directorImage?: string;
  backgroundImage?: string; // New prop for the background image
  jointOrNot?: boolean; // Optional prop to indicate if the committee is joint or not
}

const CommiteeCard = ({
  title,
  description,
  expandedDescription,
  backgroundGuideLink,
  director,
  backgroundImage,
  jointOrNot = false, // Default to false if not provided
}: CommiteeCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Committee Card */}
      <div
        className="relative bg-white flex flex-col justify-end rounded-lg shadow-lg p-6 w-[80%] md:w-[100%] h-[600px] mx-auto cursor-pointer hover:shadow-xl transition-shadow"
        onClick={handleOpenModal}
        style={{
          backgroundImage: `url('${backgroundImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Enhanced Gold Tint Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.7)] to-[rgba(255,215,0,0.8)] rounded-lg"></div>

        {/* Content */}
        <div className="relative z-10 bg-white/30 backdrop-blur-lg border border-white/10 rounded-lg p-6">
  <h2 className="text-2xl font-dm-sans font-bold mb-4 text-white">
    {title}
  </h2>
  <p className="text-white mb-4 font-regular font-dm-sans">
    {description}
  </p>
  <button className="bg-[#A3841D] text-white px-4 py-2 rounded hover:bg-[#8a6f1b] transition-colors">
    Learn More
  </button>
</div>
      </div>

      {/* Modal */}
{/* Modal */}
{/* Modal */}
{isModalOpen && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
    onClick={handleCloseModal} // Close modal when clicking outside
  >
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-lg shadow-lg p-6 w-[90vw] max-h-[90vh] overflow-y-auto transform transition-transform scale-100 opacity-100"
      onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
    >
      <button
        className="absolute top-4 right-4 text-black hover:text-gray-300"
        onClick={handleCloseModal}
      >
        ✕
      </button>

      {/* Left Column: Image */}
      {backgroundImage && (
        <div
          className="flex items-center justify-center w-full h-full rounded-lg"
          style={{
            backgroundImage: `url('${backgroundImage}')`,
            backgroundSize: "cover", // Ensures the image covers the card area
            backgroundPosition: "center", // Centers the image within the card
            backgroundRepeat: "no-repeat", // Prevents the image from repeating
          }}
        ></div>
      )}

      {/* Right Column: Content */}
      <div className="flex flex-col justify-center">
        <h2 className="text-4xl text-[#A3841D] font-dm-sans font-bold mb-4">
          {title}
        </h2>
        <h2 className="text-2xl font-dm-sans font-regular pb-4 mb-4 border-b-[#A3841D] border-b-2 text-[#A3841D]">
          {jointOrNot ? "Joint Crisis" : "Single Crisis"}
        </h2>
        <p className="text-[#A3841D] font-light font-dm-sans mb-4">
          {expandedDescription.split("\n").map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </p>
        {backgroundGuideLink && (
          <a
            href={backgroundGuideLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-center inline-block w-[300px] bg-[#A3841D] text-white font-dm-sans font-bold px-6 py-2 rounded-lg shadow-md hover:bg-[#FFD700] hover:text-black transition-colors"
          >
            View Background Guide
          </a>
        )}
        {director && (
          <div className="mt-4">
            <h3 className="text-2xl font-semibold font-dm-sans text-[#A3841D]">
              Director
            </h3>
            <p className="text-[#A3841D] text-xl font-dm-sans">{director}</p>
            {/* {directorImage && (
              <img
                src={directorImage}
                alt={director}
                className="w-24 h-24 rounded-full mt-2"
              />
            )} */}
          </div>
        )}
      </div>
    </div>
  </div>
)}
    </>
  );
};

export default CommiteeCard;

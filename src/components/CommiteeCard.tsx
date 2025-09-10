import React, { useState, useEffect } from "react";

interface CommiteeCardProps {
  title: string;
  description: string;
  expandedDescription: string;
  backgroundGuideLink?: string;
  director?: string;
  backgroundImage?: string;
  directorImage?: string; // Optional director image
  jointOrNot?: boolean;
  double?: boolean; // Optional prop to indicate if it's a double delegate committee    
}

const CommiteeCard = ({
  title,
  description,
  expandedDescription,
  director,
  backgroundImage,
  jointOrNot = false,
  double = false, // Default to false if not provided
}: CommiteeCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [isModalOpen]);

  return (
    <>
      {/* Card */}
      <div
        className="relative bg-white flex flex-col justify-end rounded-lg shadow-lg p-6 w-[90%] md:w-[100%] h-[600px] mx-auto cursor-pointer hover:shadow-xl transition-shadow"
        onClick={handleOpenModal}
        style={{
          backgroundImage: `url('${backgroundImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.7)] to-[rgba(255,215,0,0.8)] rounded-lg"></div>

        <div className="relative z-10 bg-white/30 backdrop-blur-lg border border-white/10 rounded-lg p-6">
          <h2 className="text-2xl font-nunito font-bold mb-4 text-white">
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
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-center items-center bg-black/70"
          onClick={handleCloseModal}
        >
          <div
            className="modal-scrollbar relative grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-lg shadow-lg p-6 w-[90vw] max-h-[90vh]"
            style={{ overflowY: "scroll", WebkitOverflowScrolling: "touch" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-2xl text-black hover:text-gray-300"
              onClick={handleCloseModal}
            >
              ✕
            </button>

            {/* Image Section */}
            {backgroundImage && (
              <div
                className="flex items-center justify-center w-full h-full rounded-lg"
                style={{
                  backgroundImage: `url('${backgroundImage}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
            )}

            {/* Content Section */}
            <div className="flex flex-col justify-start pr-4">
              <h2 className="text-4xl text-[#A3841D] font-nunito font-bold mb-2">
                {title}
              </h2>
              <h2 className="text-2xl font-dm-sans font-regular pb-4 mb-4 border-b-[#A3841D] border-b-2 text-[#A3841D]">
                {jointOrNot
                  ? "Joint Crisis"
                  : double
                  ? "Double Delegate Crisis"
                  : "Single Crisis"}
              </h2>
<p className="text-[#A3841D] font-light font-dm-sans">
  {expandedDescription.split("\n").map((line, index) => {
    // Regex: (text before)[URL](text after)
    const match = line.match(/^(.*?)\[(https?:\/\/[^\]]+)\](.*)$/);
    if (match) {
      const before = match[1]; // text before [URL]
      const url = match[2];    // the URL inside []
      const after = match[3];  // text after ]
      return (
        <React.Fragment key={index}>
          {before}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline hover:text-blue-300"
          >
            {after}
          </a>
          <br />
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      );
    }
  })}
</p>
              {/* {backgroundGuideLink && (
                <a
                  href={backgroundGuideLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center inline-block w-[300px] bg-[#A3841D] text-white font-dm-sans font-bold px-6 py-2 rounded-lg shadow-md hover:bg-[#FFD700] hover:text-black transition-colors"
                >
                  View Background Guide
                </a>
              )} */}
              {director && (
                <div className="mt-2">
                  <h3 className="text-2xl font-semibold font-dm-sans text-[#A3841D]">
                    Director
                  </h3>
                  <p className="text-[#A3841D] text-xl font-dm-sans">
                    {director}
                  </p>
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

import React, { useState } from "react";

interface CommiteeCardProps {
  title: string;
  description: string;
  expandedDescription: string;
  backgroundGuideLink?: string;
  director?: string;
  directorImage?: string;
  backgroundImage?: string; // New prop for the background image
}

const CommiteeCard = ({
  title,
  description,
  expandedDescription,
  backgroundGuideLink,
  director,
  directorImage,
  backgroundImage,
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
        className="relative bg-white flex flex-col justify-end rounded-lg shadow-lg p-6 w-[500px] h-[400px] mx-auto cursor-pointer hover:shadow-xl transition-shadow"
        onClick={handleOpenModal}
        style={{
          backgroundImage: `url('${backgroundImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Enhanced Gold Tint Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.6)] to-[rgba(255,215,0,0.7)] rounded-lg"></div>

        {/* Content */}
        <div className="relative z-10">
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
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[80vw] transform transition-transform scale-100 opacity-100">
            <button
              className="absolute top-4 right-4 text-black hover:text-gray-800"
              onClick={handleCloseModal}
            >
              ✕
            </button>
            <h2 className="text-3xl font-bold mb-4">{title}</h2>
            <p className="text-black mb-4">
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
                className="text-blue-500 hover:underline"
              >
                View Background Guide
              </a>
            )}
            {director && (
              <div className="mt-4">
                <h3 className="text-xl font-semibold">Director</h3>
                <p>{director}</p>
                {directorImage && (
                  <img
                    src={directorImage}
                    alt={director}
                    className="w-24 h-24 rounded-full mt-2"
                  />
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CommiteeCard;

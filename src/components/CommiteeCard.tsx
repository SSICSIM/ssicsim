import { useState, useEffect } from "react";
import { parseDescription } from "../utils/utils";

interface BackgroundGuide {
  description: string;
  link: string;
}

interface CommiteeCardProps {
  title: string;
  description?: string;
  expandedDescription?: string;
  backgroundGuides?: BackgroundGuide[]; // <-- new array for guides
  contactEmail?: string;
  director?: string;
  backgroundImage?: string;
  directorImage?: string;
  logo?: string;
  jointOrNot?: boolean;
  double?: boolean;
}

const CommiteeCard = ({
  title,
  description,
  expandedDescription,
  director,
  backgroundImage,
  logo,
  jointOrNot = false,
  double = false, // Default to false if not provided
  backgroundGuides,
  contactEmail,
}: CommiteeCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const hasBackgroundImage = Boolean(backgroundImage && backgroundImage.trim());
  const hasLogo = Boolean(logo && logo.trim());
  const hasDescription = Boolean(description && description.trim());
  const hasExpandedDescription = Boolean(
    expandedDescription && expandedDescription.trim(),
  );

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
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      document.documentElement.style.overflow = "";
    };
  }, [isModalOpen]);

  return (
    <>
      {/* Card */}
      <div
        className="relative bg-white flex flex-col justify-end rounded-lg shadow-lg p-6 w-[90%] md:w-[100%] h-[400px] md:h-[400px] mx-auto cursor-pointer hover:shadow-xl transition-shadow overflow-hidden"
        onClick={handleOpenModal}
        style={{
          backgroundImage: hasBackgroundImage
            ? `url('${backgroundImage}')`
            : "linear-gradient(160deg, #A3841D 0%, #000000 100%)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.7)] to-[rgba(255,215,0,0.8)] rounded-lg"></div>

        {hasLogo && (
          <img
            src={logo}
            alt=""
            className="absolute inset-y-0 right-0 translate-x-1/4 h-full w-auto object-contain opacity-50 pointer-events-none select-none"
          />
        )}

        <div className="relative z-10 bg-white/30 backdrop-blur-lg border border-white/10 rounded-lg p-6 overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl font-nunito font-bold mb-4 text-white">
              {title}
            </h2>
            {hasDescription && (
              <div className="mb-4 line-clamp-4 overflow-hidden">
                {parseDescription(description!, "text-[12px]")}
              </div>
            )}
            {/* Background Guide Buttons on Main Card */}
            <div className="mb-4 flex flex-row gap-2 flex-wrap">
              {backgroundGuides &&
                backgroundGuides.length > 0 &&
                backgroundGuides.map((guide, idx) => (
                  <a
                    key={idx}
                    href={guide.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()} // Prevent modal
                    className="text-center w-[100%] bg-[#A3841D] text-white font-dm-sans font-bold px-4 py-2 rounded-lg shadow-md hover:bg-[#FFD700] my-auto hover:text-black transition-colors text-[12px]"
                  >
                    {guide.description}
                  </a>
                ))}

              <button className="w-[100%] bg-[#A3841D] text-white font-dm-sans font-bold px-4 py-2 rounded-lg shadow-md hover:bg-[#FFD700] hover:text-black transition-colors text-sm">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-center items-center bg-black/70"
          onClick={handleCloseModal}
        >
          <div
            className={`modal-scrollbar relative grid grid-cols-1 ${
              hasBackgroundImage ? "md:grid-cols-2" : "md:grid-cols-1"
            } gap-8 bg-white rounded-lg shadow-lg p-6 w-[90vw] max-h-[90vh]`}
            style={{
              overflowY: "scroll",
              WebkitOverflowScrolling: "touch",
              overscrollBehavior: "contain",
            }}
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
            {hasBackgroundImage && (
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
            <div className="relative flex flex-col justify-start rounded-lg overflow-hidden p-4 -m-4">
              {hasLogo && (
                <img
                  src={logo}
                  alt=""
                  className="absolute top-0 bottom-0 right-0 translate-x-1/4 h-full w-auto object-contain opacity-10 pointer-events-none select-none"
                />
              )}
              <div className="relative z-10">
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
                {contactEmail && (
                  <p className="text-[#A3841D] font-bold font-dm-sans mb-4">
                    Contact:{" "}
                    <a
                      href={`mailto:${contactEmail}`}
                      className="text-blue-500 underline hover:text-blue-300"
                    >
                      {contactEmail}
                    </a>
                  </p>
                )}
                {backgroundGuides && backgroundGuides.length > 0 && (
                  <div className="mb-2 flex flex-col gap-2">
                    {backgroundGuides.map((guide, idx) => (
                      <div key={idx} className="flex flex-col items-start">
                        <a
                          href={guide.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-center inline-block w-[100%] bg-[#A3841D] text-white font-dm-sans font-bold px-6 py-2 rounded-lg shadow-md hover:bg-[#FFD700] hover:text-black transition-colors"
                        >
                          {guide.description}
                        </a>
                      </div>
                    ))}
                  </div>
                )}
                {hasExpandedDescription && (
                  <div
                    className={
                      contactEmail ||
                      (backgroundGuides && backgroundGuides.length > 0)
                        ? "border-t-[#A3841D] mt-2 pt-2 border-t-2"
                        : "mt-2 pt-2"
                    }
                  >
                    {parseDescription(
                      expandedDescription!,
                      "text-base",
                      "text-[#A3841D] font-light",
                    )}
                  </div>
                )}
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
        </div>
      )}
    </>
  );
};

export default CommiteeCard;

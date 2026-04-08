import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface WinnerEntry {
  committee: string;
  image: string;
  winners: string[];
}

const WinnersCarousel = ({ data }: { data: WinnerEntry[] }) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const prev = () => {
    setDirection(-1);
    setIndex((i) => (i === 0 ? data.length - 1 : i - 1));
  };

  const next = () => {
    setDirection(1);
    setIndex((i) => (i === data.length - 1 ? 0 : i + 1));
  };

  const current = data[index];

  const variants = {
    enter: (direction: number) => ({
      x: direction === 1 ? 100 : -100,
      opacity: 0,
      position: "absolute" as const,
    }),
    center: {
      x: 0,
      opacity: 1,
      position: "absolute" as const,
    },
    exit: (direction: number) => ({
      x: direction === 1 ? -100 : 100,
      opacity: 0,
      position: "absolute" as const,
    }),
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto py-10 flex items-center justify-center px-4">
      {/* LEFT ARROW */}
      <button
        onClick={prev}
        className="absolute  left-[40px] top-1/2 -translate-y-1/2 p-3 rounded-full bg-white shadow-lg hover:bg-gray-100 transition z-10"
      >
        <ChevronLeft size={28} />
      </button>

      {/* CARD */}
      <div className="w-full md:w-[100%] lg:w-[70%] rounded-2xl shadow-xl p-6 md:p-8 bg-white relative overflow-hidden">
        <div className="relative w-full h-[500px] md:h-[650px] lg:h-[700px] flex items-center justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              variants={variants}
              custom={direction}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="absolute inset-0 flex flex-col items-center gap-4 md:gap-6 px-2 md:px-4"
            >
              {/* IMAGE */}
              <div className="relative w-full md:w-[95%] lg:w-[90%] h-[300px] md:h-[400px] lg:h-[400px]">
                <Image
                  src={current.image}
                  alt={current.committee}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 95vw, 90vw"
                  className="object-cover rounded-xl shadow-md"
                  priority={index === 0}
                />
              </div>

              {/* TITLE */}
              <div className="my-auto">
                <h2 className="text-2xl mb-6 md:text-3xl lg:text-4xl font-extrabold text-[#A3841D] font-nunito text-center drop-shadow-sm">
                  {current.committee}
                </h2>

                {/* WINNERS LIST */}
                <ul className="text-sm md:text-lg lg:text-xl font-dm-sans text-center space-y-1 md:space-y-2 max-h-[180px] md:max-h-[240px] overflow-auto px-2 md:px-3">
                  {current.winners.map((w, i) => (
                    <li key={i} className="font-medium text-gray-700">
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* RIGHT ARROW */}
      <button
        onClick={next}
        className="absolute right-[40px] top-1/2 -translate-y-1/2 p-3 rounded-full bg-white shadow-lg hover:bg-gray-100 transition z-10"
      >
        <ChevronRight size={28} />
      </button>
    </div>
  );
};

export default WinnersCarousel;

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

  // Slide animation variants
  const variants = {
    enter: (direction: number) => ({
      x: direction === 1 ? 80 : -80,
      opacity: 0,
      position: "absolute" as const,
    }),
    center: {
      x: 0,
      opacity: 1,
      position: "absolute" as const,
    },
    exit: (direction: number) => ({
      x: direction === 1 ? -80 : 80,
      opacity: 0,
      position: "absolute" as const,
    }),
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto py-10 flex items-center justify-center">
      {/* LEFT ARROW */}
      <button
        onClick={prev}
        className="absolute left-[-100px] p-3 rounded-full bg-white shadow-md hover:bg-gray-100 transition z-10"
      >
        <ChevronLeft size={28} />
      </button>

      {/* SLIDE CONTENT */}
      <div className="w-full max-w-4xl mx-auto rounded-2xl shadow-lg p-6 bg-white overflow-hidden relative">
        {/* Fixed height container prevents page scroll */}
        <div className="relative w-full h-[480px] overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              variants={variants}
              custom={direction}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="w-full flex flex-col items-center gap-5"
            >
              <img
                src={current.image}
                alt={current.committee}
                className="w-full h-64 object-cover rounded-xl shadow-md"
              />

              <h2 className="text-3xl font-bold text-center">
                {current.committee}
              </h2>

              <ul className="text-lg text-center space-y-2 max-h-[180px] overflow-auto px-4">
                {current.winners.map((w, i) => (
                  <li key={i} className="font-medium">
                    {w}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* RIGHT ARROW */}
      <button
        onClick={next}
        className="absolute right-[-100px] p-3 rounded-full bg-white shadow-md hover:bg-gray-100 transition z-10"
      >
        <ChevronRight size={28} />
      </button>
    </div>
  );
};

export default WinnersCarousel;

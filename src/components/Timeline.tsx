import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

const historyData = [
  {
    year: "2018",
    event: "Conference founded with 200 delegates at UofT.",
    img: "https://placekitten.com/400/250",
  },
  {
    year: "2019",
    event: "Introduced international committees and doubled attendance.",
    img: "https://placebear.com/400/250",
  },
  {
    year: "2021",
    event: "Went fully online with 500+ participants worldwide.",
    img: "https://picsum.photos/400/250",
  },
  {
    year: "2023",
    event: "Returned in person with record-breaking participation.",
    img: "https://placekitten.com/401/251",
  },
];

const HistoryTimeline = () => {
  const containerRef = useRef(null);

  // Track scroll progress for this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth spring effect
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div ref={containerRef} className="relative bg-gradient-to-b from-gray-50 to-white py-20">
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 h-2 bg-[#A3841D] origin-left z-50"
        style={{ scaleX }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Center gold line */}
        <div className="absolute left-1/2 top-0 w-1 h-full bg-gradient-to-b from-[#A3841D] to-transparent transform -translate-x-1/2"></div>

        <div className="space-y-24">
          {historyData.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
              className="relative flex items-center"
            >
              {/* Dot on the timeline */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-[#A3841D] border-4 border-white shadow-lg z-20"></div>

              {/* Cute Card */}
              <div
                className={`w-full md:w-[45%] ${
                  idx % 2 === 0 ? "mr-auto pr-6 md:pr-0" : "ml-auto pl-6 md:pl-0"
                }`}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-3xl shadow-xl overflow-hidden border border-[#f1e3c3] hover:shadow-2xl transition"
                >
                  {/* Image with overlay */}
                  <div className="relative group">
                    <img
                      src={item.img}
                      alt={item.year}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#A3841D]/40 to-transparent"></div>
                  </div>

                  {/* Text */}
                  <div className="p-6 text-center">
                    <h3 className="text-3xl font-extrabold text-[#A3841D] font-nunito drop-shadow-sm">
                      {item.year}
                    </h3>
                    <p className="text-gray-600 mt-3 text-lg leading-relaxed">
                      {item.event}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistoryTimeline;

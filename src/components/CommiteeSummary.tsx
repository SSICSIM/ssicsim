import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  title: string;
  description: string;
  image: string;
  index: number;
}

export default function CommitteeSummary({
  title,
  description,
  image,
  index,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!ref.current) return;

      gsap.fromTo(
        ref.current,
        {
          x: -150,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          delay: index * 0.1,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, ref);

    return () => ctx.revert(); // cleanup
  }, []); // runs once

  return (
    <div
      ref={ref}
      className="committee-card min-w-[300px] max-w-[300px] bg-white rounded-2xl shadow-lg overflow-hidden mx-4"
    >
      <img src={image} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="font-bold text-[#A3841D] text-xl">{title}</h3>
        <p className="text-sm text-gray-700 mt-2">{description}</p>
      </div>
    </div>
  );
}

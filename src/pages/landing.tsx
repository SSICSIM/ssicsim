import ScrollScrub from "../components/ScrollTriger";
import CurrentCard from "../components/CurrentCard";
import CommiteeType from "../components/CommiteeType";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useMemo } from "react";
import LogoMarquee from "../components/LogoMarquee"

import SplitType from "split-type";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Landing = () => {
  const strategyRef = useRef(null);
  const [selectedCommittee, setSelectedCommittee] = useState<string | null>(
    null,
  );
  const [currentImage, setCurrentImage] = useState<string>(
    "/assets/photos/typesOfCommitees/Default.JPG",
  );

  const committees = useMemo(
    () => [
      {
        title: "Fictional",
        description:
          "Fictional Crises bring to life the fantastical worlds of real fiction pieces (ie. Cinema, TV, Books, Adaptations of Current Events, etc.). Here, delegates will need to bring their knowledge of these fictional worlds in order to fully explore the scope of the committee and it’s alternate storylines.",
        image: "/assets/photos/typesOfCommitees/Fictional.JPG",
      },
      {
        title: "Historical",
        description:
          "Historical Crises are, well, historical committees! They bring to life major historical events, be it ancient, medieval, or modern, and implore delegates to reimagine them through various lenses or recreate the events of the past, often with a more academic approach to understanding history and its agents.",
        image: "/assets/photos/typesOfCommitees/Historical.JPG",
      },
      {
        title: "Conceptual",
        description:
          "Conceptual Crises are an opportunity for delegates to engage critically with complex, unconventional crises mechanics/topics. Delegates in these committees might find themselves challenged with non-traditional modes of debate or mechanics and crisis arcs that cannot be fully pre-researched.",
        image: "/assets/photos/typesOfCommitees/Conceptual.JPG",
      },
    ],
    []
  );


  useEffect(() => {
    if (selectedCommittee) {
      const selectedCommitteeData = committees.find(
        (committee) => committee.title === selectedCommittee,
      );

      if (selectedCommitteeData) {
        // Animate the fade-out of the current image
        gsap.to(".committee-image", {
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            // Update the image source after fade-out
            setCurrentImage(selectedCommitteeData.image);

            // Animate the fade-in of the new image
            gsap.to(".committee-image", {
              opacity: 1,
              duration: 0.5,
            });
          },
        });
      }
    }
  }, [selectedCommittee, committees]);

  useEffect(() => {
    // Animate the blurs to fade in when scrolling
    gsap.fromTo(
      ".blur-element", // Target all blur elements
      { opacity: 0 }, // Start fully transparent
      {
        opacity: 1, // Fade in
        duration: 1.5, // Animation duration
        ease: "power2.out", // Smooth easing
        scrollTrigger: {
          trigger: ".blur-element", // Trigger animation when blur elements enter the viewport
          start: "top 80%", // Start animation when the top of the blur is 80% visible
          end: "top 20%", // End animation when the top of the blur is 20% visible
          once: true, // Ensure the animation only occurs once
        },
      },
    );
  }, []);
  useEffect(() => {
    // Animate the cards to move to the middle
    gsap.fromTo(
      ".current-card", // Target all cards
      {
        x: (i) => (i === 0 ? "33vw" : i === 2 ? "-33vw" : "0px"), // Start in their assigned positions
        opacity: 0, // Start fully visible
      },
      {
        x: 0, // Move to the middle
        opacity: 1, // Fade out
        duration: 1.5, // Animation duration
        ease: "power4.out", // Smooth easing
        scrollTrigger: {
          trigger: ".current-card",
          start: "top 80%",
        },
      },
    );
  }, []);
  useEffect(() => {
    const split = new SplitType("#strategy-heading", {
      types: "chars,words",
    });

    gsap.from(split.chars, {
      y: 100,
      opacity: 0,
      stagger: {
        amount: 0.5,
        from: "random",
        yoyo: true,
      },
      duration: 1.2,
      ease: "power4.out",
      scrollTrigger: {
        trigger: "#strategy-heading",
        start: "top 80%",
      },
    });

    return () => {
      // optional cleanup if needed
      split.revert();
    };
  }, []);

  useEffect(() => {
    // Animate gradient shapes popping into the screen when they become visible
    gsap.fromTo(
      ".gradient-shape",
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: "elastic.out(1, 0.3)", // Adjusted ease for smoother bounce
        stagger: 0.3, // Increased stagger for a more spaced-out effect
        scrollTrigger: {
          trigger: ".gradient-shape", // Trigger animation when gradient shapes enter the viewport
          start: "top 80%", // Start animation when the top of the shapes is 80% visible
          once: true, // Ensure the animation only occurs once
        },
      },
    );
  }, []);

  
  const handleCommitteeClick = (title: string) => {
    setSelectedCommittee(title === selectedCommittee ? null : title);
  };

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

        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-start justify-center z-20">
          <p className="text-white text-left md:text-7xl font-bold w-[80vw] lg:w-[800px] ml-6 font-sans leading-tight text-4xl">
            Canada’s Premier Model UN Crisis Simulation
          </p>
          <p className="text-white text-left md:text-[35px] w-[80vw] lg:w-[800px] ml-6 text-[25px] font-normal italic md:w-[800px]">
            Toronto, ON
          </p>
        </div>
      </div>
      <div className="relative bg-[#3C2C2C] h-auto py-44 w-full flex items-center justify-center overflow-hidden">
        {/* Geometric Shapes Around the Glassmorphism Section */}


        {/* Glassmorphism Content Section */}
        <div className="relative z-10 w-[85%] md:w-[55%] h-auto flex flex-col items-center justify-center text-center px-8 py-12 bg-white/40 backdrop-blur-lg rounded-2xl shadow-2xl border-[2px]">
          <h3 className="text-2xl md:text-4xl font-dm-sans mb-4 text-white">
            The numbers tell the story
          </h3>
          <ScrollScrub>
            <h1 className="text-4xl md:text-6xl font-bold mb-2 text-white">
              13 years
            </h1>
          </ScrollScrub>
          <ScrollScrub>
            <h1 className="text-4xl md:text-6xl font-bold mb-2 text-white">
              300+ delegates
            </h1>
          </ScrollScrub>
          <ScrollScrub>
            <h1 className="text-4xl md:text-6xl font-bold mb-2 text-white">
              One unrivaled experience
            </h1>
          </ScrollScrub>
        </div>
      </div>
      <div className="relative bg-[#A3841D] w-screen grid grid-rows-auto">
        <div
          className="absolute blur-element rounded-full top-[400px] left-[-200px] h-[200px] w-[200px] pointer-events-none z-[1]"
          style={{
            background:
              "radial-gradient(58.31% 58.31% at 50% 50%, rgba(162, 156, 223, 0.0037) 0%, rgba(255, 255, 255) 100%)",
            boxShadow:
              "0px 0px 140px 400px rgb(255 255 255 /40%)" /* change the box shadow blur and spread */,
          }}
        ></div>
        <div
          className="absolute blur-element rounded-full bottom-[400px] right-[-200px] h-[200px] w-[200px] pointer-events-none z-[1]"
          style={{
            background:
              "radial-gradient(58.31% 58.31% at 50% 50%, rgba(162, 156, 223, 0.0037) 0%, rgba(255, 255, 255) 100%)",
            boxShadow:
              "0px 0px 140px 400px rgb(255 255 255 /40%)" /* change the box shadow blur and spread */,
          }}
        ></div>
        {/* Text Content */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-4 md:gap-8 px-4 md:px-12 py-8">
          <div className="md:w-1/2 px-4">
            <p className="text-[24px] md:text-[30px] font-extralight text-white font-grotesque">
            SSICSIM 2025
            </p>
            <p
              className="text-[36px] md:text-[50px]/ lg:text-[72px] font-bold text-white font-grotesque leading-tight"
              ref={strategyRef}
              id="strategy-heading"
            >
              Where Strategy Meets Urgency
            </p>
          </div>
          <div className="md:w-1/2 flex flex-col px-4">
            <p
              className="text-[16px] md:text-[25px] font-light text-white font-dm-sans"
              id="strategy-heading"
            >
              Most MUNs focus on structured diplomacy—SSICSIM does it
              differently. Delegates think on their feet, adapt fast, and tackle
              real-time crises like real-world leaders.
            </p>
            <button className="bg-white text-black px-6 py-2 mt-4 rounded-lg hover:bg-gray-200 w-[150px] md:w-[200px] transition-colors">
              Learn More
            </button>
          </div>
        </div>
        {/* Divider */}
        <div className="w-full h-[2px] bg-white my-4"></div>
        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 md:px-8 py-8 mx-auto h-auto overflow-hidden z-[20]">
          <div className="current-card md:p-4">
            <CurrentCard
              title="A Staff Team Like No Other"
              image="/assets/photos/Photo1.png"
              description="Our staff team is a diverse group of individuals with a wide range of expertise, from crisis management to diplomacy. We are committed to providing an unparalleled experience for all delegates."
            />
          </div>
          <div className="current-card md:p-4">
            <CurrentCard
              title="Constant Collaboration"
              image="/assets/photos/Photo2.png"
              description="With the added pressure of crises, delegates must work together to find solutions. Our simulation encourages teamwork and collaboration, allowing delegates to develop their leadership skills."
            />
          </div>
          <div className="current-card md:p-4">
            <CurrentCard
              title="Real-Time Crisis Action"
              image="/assets/photos/Photo3.png"
              description="In SSICSIM, delegates are faced with real-time crises that require quick thinking and decisive action. This unique approach to Model UN allows delegates to experience the thrill of crisis management firsthand."
            />
          </div>
        </div>{" "}
        {/* Committee Types and Image Section */}
        <div className="bg-gray-100 h-auto w-full">
          <div className="w-full text-center my-8">
            <h2 className="text-2xl md:text-5xl font-bold text-black font-dm-sans">
              Types of Commitees
            </h2>
            <p className="text-lg md:text-xl text-gray-700 font-dm-sans mt-4">
              Click on a committee type to learn more.
            </p>
          </div>

          <div className="relative z-[20] bg-gray-100 h-auto w-full px-4 flex flex-col gap-4 md:flex-row justify-center">
            {/* Committee Types */}

            <div
  className="absolute blur-element rounded-full top-[200px] left-[-200px] h-[200px] w-[200px] pointer-events-none z-[1]"
  style={{
    background:
      "radial-gradient(58.31% 58.31% at 50% 50%, rgba(162, 156, 223, 0.0037) 0%, rgba(255, 255, 255) 100%), url('/assets/textures/grainy.avif')", // Add grainy texture
    backgroundBlendMode: "overlay", // Blend the texture with the gradient
    boxShadow:
      "0px 0px 400px 400px rgb(255 215 0 /40%)", // Adjust the box shadow blur and spread
    backgroundSize: "cover", // Ensure the texture covers the entire element
    backgroundRepeat: "no-repeat", // Prevent repeating the texture
  }}
></div>

<div
  className="absolute blur-element rounded-full right-[200px] bottom-[-200px] h-[1px] w-[1px] pointer-events-none z-[1]"
  style={{
    background:
      "radial-gradient(58.31% 58.31% at 50% 50%, rgba(162, 156, 223, 0.0037) 0%, rgba(255, 255, 255) 100%), url('/assets/textures/grainy.avif')", // Add grainy texture
    backgroundBlendMode: "overlay", // Blend the texture with the gradient
    boxShadow:
      "0px 0px 200px 200px rgb(255 215 0 /40%)", // Adjust the box shadow blur and spread
    backgroundSize: "cover", // Ensure the texture covers the entire element
    backgroundRepeat: "no-repeat", // Prevent repeating the texture
  }}
></div>            <div className="flex flex-col justify-center items-center gap-4 w-full md:w-[40%] z-[20]">
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
            <div className="w-full md:w-[40%] flex items-center justify-center">
              <img
                src={currentImage}
                alt="Selected Committee"
                className="committee-image w-[80%] md:w-[100%] h-auto object-cover rounded-lg"
                style={{ opacity: 1 }}
              />
            </div>
          </div>
        </div>{" "}
        <div className="bg-gray-100 h-auto w-screen py-12 flex flex-col items-center justify-center">
          <h3 className="text-4xl font-dm-sans mb-8">Our Sponsors</h3>
          <LogoMarquee />
        </div>
      </div>
    </>
  );
};

export default Landing;

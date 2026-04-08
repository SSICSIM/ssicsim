"use client";

import { useEffect } from "react";
import { useRef } from "react";
import CommitteeSummary from "../components/CommiteeSummary";
import WinnersCarousel from "../components/WinnerEntry";

import SplitType from "split-type";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CF_DOMAIN } from "../utils/consts";
import Seo from "../components/Seo";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const Wrapped = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const strategyRef = useRef(null);
  const counterRef = useRef<HTMLHeadingElement>(null);
  const staffRef = useRef<HTMLHeadingElement>(null);
  const committeesRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = staffRef.current;
    if (!el) return;

    const obj = { num: 0 };

    gsap.fromTo(
      obj,
      { num: 0 },
      {
        num: 200,
        duration: 2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%", // animates when scrolled into view
        },
        onUpdate: () => {
          el.textContent = Math.floor(obj.num) + "+";
        },
      },
    );
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const inner = container.querySelector(".horizontal-scroll-inner");
    if (!inner) return;

    console.log("inner scroll width:", inner.scrollWidth);
    console.log("viewport width:", window.innerWidth);

    const ctx = gsap.context(() => {
      gsap.to(inner, {
        x: () => -(inner.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => "+=" + (inner.scrollWidth - window.innerWidth),
          scrub: true,
          pin: true,
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const el = counterRef.current;
    if (!el) return;

    const obj = { num: 0 };

    gsap.fromTo(
      obj,
      { num: 0 },
      {
        num: 400,
        duration: 2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%", // animates when scrolled into view
        },
        onUpdate: () => {
          el.textContent = Math.floor(obj.num) + "+";
        },
      },
    );
  }, []);

  const committeeSummary = [
    {
      title: "The Epic of Sundiata",
      description: "Prophecy, betrayal, and the rise of a legend.",
      image: `${CF_DOMAIN}/EpicOfSundiata.jpg?format=webp`,
    },
    {
      title: "Fight for the Layton Legacy: 2012 NDP Leadership Race",
      description: "A movement shaken, a legacy reborn.",
      image: `${CF_DOMAIN}/FightOfTheLaytonLegacy.jpg`,
    },
    {
      title: "Vive La Revolution: Cake, Blood and Banque",
      description: "A kingdom on fire, and a blade that decides its fate.",
      image: `${CF_DOMAIN}/ViveLaRevolution.jpg`,
    },
    {
      title: "Bakumatsu: The Fall of the Shogunate",
      description: "Tradition collapsing, a new Japan igniting.",
      image: `${CF_DOMAIN}/BakamatsuCommittee.jpg`,
    },
    {
      title: "English Civil War",
      description: "Power divided, a nation at its breaking point.",
      image: `${CF_DOMAIN}/EnglishCivilWar.jpg`,
    },
    {
      title: "Historical Ad Hoc",
      description: "History’s chaos—unfiltered and unforgiving.",
      image: `${CF_DOMAIN}/HistoricalAdHocCommittee.jpg`,
    },
    {
      title: "March of the Machine: The Phyrexian Invasion",
      description: "A universe on the brink of assimilation.",
      image: `${CF_DOMAIN}/MarchOfTheMachine.jpg?format=webp`,
    },
    {
      title: "See You This Summer!",
      description: "Mysteries uncovered, weirdness unleashed.",
      image: `${CF_DOMAIN}/GravityFalls.jpg`,
    },
    {
      title: "The 39 Clues: Cahills vs. Vespers",
      description: "Ancient secrets, global stakes, one final race.",
      image: `${CF_DOMAIN}/39CluesCommittee.jpg`,
    },
    {
      title: "Valorant: CONV//ERGENCE",
      description: "Two worlds colliding, one reality left standing.",
      image: `${CF_DOMAIN}/Valorant.jpg`,
    },
    {
      title: "Fictional Ad Hoc",
      description: "The unknown, raw and unpredictable.",
      image: `${CF_DOMAIN}/FictionalAdHocCommittee.jpg?format=webp`,
    },
    {
      title: "Fall of Atlantis",
      description: "A utopia crumbling beneath rising tides.",
      image: `${CF_DOMAIN}/FallOfAtlantis.jpg`,
    },
    {
      title: "Met Gala 2026",
      description: "Glamour under pressure—style meets chaos.",
      image: `${CF_DOMAIN}/MetGala2026Committee.jpg?format=webp`,
    },
    {
      title: "Second Renaissance",
      description: "Humanity tested as machines awaken.",
      image: `${CF_DOMAIN}/SecondRenaissanceCommittee.png?format=webp`,
    },
    {
      title: "Tetris",
      description:
        "Espionage, innovation, and a battle for the world’s most dangerous game.",
      image: `${CF_DOMAIN}/TetrisCommittee.png?format=webp`,
    },
    {
      title: "Saving Selene City: A Lunar Colony Crisis",
      description: "Oxygen dwindling, tensions rising, the moon on edge.",
      image: `${CF_DOMAIN}/SavingSeleneCity.jpg`,
    },
    {
      title: "Conceptual Ad Hoc",
      description: "Reality bent, logic broken.",
      image: `${CF_DOMAIN}/ConceptualAdHocCommittee.png?format=webp`,
    },
  ];

  const winnersData = [
    {
      committee: "The Epic of Sundiata",
      image: `${CF_DOMAIN}/EpicOfSundiataAwards.png?format=webp`,
      winners: [
        "Best Delegate – Gabrielle Irumhekha",
        "Outstanding Delegate – Kaavya Sethepalli",
        "Honourable Mention – Michelle Irumhekha",
        "Best Novice - Yash Chhabaria",
      ],
    },
    {
      committee: "Fight for the Layton Legacy: 2012 NDP Leadership Race",
      image: `${CF_DOMAIN}/FightOfLaytonLegacyAwards.png?format=webp`,
      winners: [
        "Best Delegate – Joey Lin",
        "Outstanding Delegate – Arnav Anil Kotian",
        "Honourable Mention – Tanya Walia",
        "Best Novice - Ananya Agarwal",
        "Best Duo - Ellena Stamatiou & Beatriz Baptista",
      ],
    },
    {
      committee: "Vive La Revolution: Cake, Blood and Banque",
      image: `${CF_DOMAIN}/ViveLaRevolutionAwards.png?format=webp`,
      winners: [
        "Best Delegate – Spencer Moriarty",
        "Outstanding Delegate – Gur Niwaz Singh Aulakh",
        "Honourable Mention – Maddix Huffman",
        "Best Novice – Anishka Kulkarni",
      ],
    },
    {
      committee: "Bakumatsu: The Fall of the Shogunate (Pro-Shogunate)",
      image: `${CF_DOMAIN}/BakumatsuAwards.png?format=webp`,
      winners: [
        "Best Delegate – Lucas Pan",
        "Outstanding Delegate – Ishsimar Pahwa",
        "Honourable Mention – Andrew Zhang",
        "Best Novice – Alexa Wen",
      ],
    },
    {
      committee: "Bakumatsu: The Fall of the Shogunate (Pro-Emperor)",
      image: `${CF_DOMAIN}/BakumatsuAwards.png?format=webp`,
      winners: [
        "Best Delegate – Jason Zhao",
        "Outstanding Delegate – Anomioghene Medu",
        "Honourable Mention – Ryo Kumar",
        "Best Novice – Cole Ebata",
      ],
    },
    {
      committee: "English Civil War (Royalists)",
      image: `${CF_DOMAIN}/EnglishCivilWarAwards.png?format=webp`,
      winners: [
        "Best Delegate – David Setareh",
        "Outstanding Delegate – Kaleb Blanchard",
        "Honourable Mention – Grace Sun",
        "Best Novice – Justin Cao",
      ],
    },
    {
      committee: "English Civil War (Parliamentarians)",
      image: `${CF_DOMAIN}/EnglishCivilWarAwards.png?format=webp`,
      winners: [
        "Best Delegate – Jacob Lang",
        "Outstanding Delegate – Artus Siu",
        "Honourable Mention – Kimaya Gupte",
        "Best Novice – Rishitha Poda",
      ],
    },
    {
      committee: "Historical Ad Hoc",
      image: `${CF_DOMAIN}/HIstoricalAdHocAwards.png?format=webp`,
      winners: [
        "Best Delegate – Rubina Khan",
        "Outstanding Delegate – Helena Musson",
        "Honourable Mention – Megan Allison",
        "Best Novice – Ryan Delill",
      ],
    },
    {
      committee: "March of the Machine: The Phyrexian Invasion",
      image: `${CF_DOMAIN}/MarchOfTheMadnessAwards.png?format=webp`,
      winners: [
        "Best Delegate – Jasjeet Sidhu",
        "Outstanding Delegate – Ananya Singhal",
        "Honourable Mention – Benji Agromayor",
        "Best Novice – Gopika Vaspate",
      ],
    },
    {
      committee: "See You This Summer!",
      image: `${CF_DOMAIN}/SeeYouThisSummerAwards.png?format=webp`,
      winners: [
        "Best Delegate – Grace Lavallee-Noel",
        "Outstanding Delegate – Suhaan Chanana",
        "Honourable Mention – Lily Nguyen",
        "Best Novice – Oona Galipeau",
      ],
    },
    {
      committee: "The 39 Clues: Cahills vs. Vespers (Cahills)",
      image: `${CF_DOMAIN}/CahillsAwards.png?format=webp`,
      winners: [
        "Best Delegate – Camilo Sierra de Rojas",
        "Outstanding Delegate – William Debane",
        "Honourable Mention – Robbie Armstrong",
        "Best Novice – Reichen Thorpe",
      ],
    },
    {
      committee: "The 39 Clues: Cahills vs. Vespers (Vespers)",
      image: `${CF_DOMAIN}/VespersAwards.png?format=webp`,
      winners: [
        "Best Delegate – Tate Ullock",
        "Outstanding Delegate – Dhyana Patel",
        "Honourable Mention – Sabin Koirala",
        "Best Novice – Dillon Shelley",
      ],
    },
    {
      committee: "Valorant: CONV//ERGENCE (Alpha)",
      image: `${CF_DOMAIN}/AlphaAwards.png?format=webp`,
      winners: [
        "Best Delegate – Ariel Ow",
        "Outstanding Delegate – Suhaana Sharma",
        "Honourable Mention – Sarathraj Maharajan",
        "Best Novice – Rudraa Manjrekar",
      ],
    },
    {
      committee: "Valorant: CONV//ERGENCE (Omega)",
      image: `${CF_DOMAIN}/OmegaAwards.png?format=webp`,
      winners: [
        "Best Delegate – Bessie Liu",
        "Outstanding Delegate – Rahib Arham",
        "Honourable Mention – Elliot Zhou",
        "Best Novice – Yousef Muhammed",
      ],
    },
    {
      committee: "Fictional Ad Hoc",
      image: `${CF_DOMAIN}/FictionalAdHocAwards.png?format=webp`,
      winners: [
        "Best Delegate – Desmond Hollingsworth",
        "Outstanding Delegate – Onur Soran",
        "Honourable Mention – Isabel Dai",
        "Best Novice – Saiffie Sidhu",
      ],
    },
    {
      committee: "Fall of Atlantis",
      image: `${CF_DOMAIN}/TheFallOfAtlantisAwards.png?format=webp`,
      winners: [
        "Best Delegate – Giulia Gucciardi",
        "Outstanding Delegate – Julia Wu",
        "Honourable Mention – Ariadne Gonsalves",
        "Best Novice – Muhammad Syed",
      ],
    },
    {
      committee: "Met Gala 2026",
      image: `${CF_DOMAIN}/MetGalaAwards.png?format=webp`,
      winners: [
        "Best Delegate – Flora Gu",
        "Outstanding Delegate – Mitchell Ojei-David",
        "Honourable Mention – Kate Yau",
        "Best Novice – Vaibhavi Khare",
      ],
    },
    {
      committee: "Second Renaissance",
      image: `${CF_DOMAIN}/SecondRenaissanceAwards.png?format=webp`,
      winners: [
        "Best Delegate – Hayley Pang",
        "Outstanding Delegate – Kaelyn Shen",
        "Honourable Mention – Ben Krakauer",
        "Best Novice – Madeline Mountz",
      ],
    },
    {
      committee: "Tetris",
      image: `${CF_DOMAIN}/TetrisAwards.png?format=webp`,
      winners: [
        "Best Delegate – Gloria Yang",
        "Outstanding Delegate – Jackie Liu",
        "Honourable Mention – Aydin Dossa",
        "Best Novice – Nick Chen",
      ],
    },
    {
      committee: "Saving Selene City: A Lunar Colony Crisis (Earth)",
      image: `${CF_DOMAIN}/SeleneCityAwards.png?format=webp`,
      winners: [
        "Best Delegate – Adarsh Thoduvakkal",
        "Outstanding Delegate – Douglas Forrest",
        "Honourable Mention – Jasmeet Singh",
        "Best Novice – Malcolm Seifred",
      ],
    },
    {
      committee: "Saving Selene City: A Lunar Colony Crisis (Selene City)",
      image: `${CF_DOMAIN}/SeleneCityAwards.png?format=webp`,
      winners: [
        "Best Delegate – Prabhjot Singh Saini",
        "Outstanding Delegate – Xavier Gaudreau",
        "Honourable Mention – Preston Lui",
        "Best Novice – Julian Cheng",
      ],
    },
    {
      committee: "Conceptual Ad Hoc",
      image: `${CF_DOMAIN}/ConceptualAdHocAwards.png?format=webp`,
      winners: [
        "Best Delegate – Sumayyah Satia",
        "Outstanding Delegate – Audrina Dayrit",
        "Honourable Mention – Gordon Zeng",
        "Best Novice – Xavi Amy",
      ],
    },
    {
      committee: "Small Delegation Awards",
      image: `${CF_DOMAIN}/SmallDelegationAward.png?format=webp`,
      winners: ["Best Small Delegation - GTAMUN"],
    },
    {
      committee: "Large Delegation Awards",
      image: `${CF_DOMAIN}/LargeDelegationAward.png?format=webp`,
      winners: [
        "Best Large Delegation - Parkdale Collegiate Institute",
        "Outstanding Large Delegation -  Sentosa",
        "Honourable Delegation - St. Michael's College School",
      ],
    },
  ];

  // useEffect(() => {
  //   // Animate the blurs to fade in when scrolling
  //   gsap.fromTo(
  //     ".blur-element", // Target all blur elements
  //     { opacity: 0 }, // Start fully transparent
  //     {
  //       opacity: 1, // Fade in
  //       duration: 1.5, // Animation duration
  //       ease: "power2.out", // Smooth easing
  //       scrollTrigger: {
  //         trigger: ".blur-element", // Trigger animation when blur elements enter the viewport
  //         start: "top 80%", // Start animation when the top of the blur is 80% visible
  //         end: "top 20%", // End animation when the top of the blur is 20% visible
  //         once: true, // Ensure the animation only occurs once
  //       },
  //     },
  //   );
  // }, []);

  useEffect(() => {
    if (!committeesRef.current) return;

    gsap.fromTo(
      committeesRef.current,
      { fontWeight: 300 }, // start light
      {
        fontWeight: 900, // end bold
        scrollTrigger: {
          trigger: committeesRef.current,
          start: "top 80%",
          end: "bottom 60%",
          scrub: true, // smooth scroll progress
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

  return (
    <>
      <Seo
        title="SSICSIM 2025 Wrapped"
        description="Highlights, committees, and standout moments from SSICSIM 2025."
        path="/wrapped"
      />
      <div className="w-[100vw] overflow-x-hidden">
        <div className="relative w-full min-h-[500px] h-screen max-h-[1200px] overflow-hidden pt-[80px]">
          {/* Background Image */}
          <Image
            src={`${CF_DOMAIN}/SSICSIMWrappedHero.png`}
            alt="University of Toronto Ariel View"
            fill
            priority
            sizes="100vw"
            className="absolute top-0 left-0 object-cover z-10"
          />
          {/* Overlay */}
          <div className="absolute top-0 left-0 w-full h-screen min-h-[500px] bg-black opacity-40 z-10"></div>
          {/* Golden Borders */}
          <div
            className="hidden md:block absolute left-0 top-0 w-0 h-0 border-t-[20vh] md:border-t-[80vh] mt-[20vh] mb-[20px] border-t-transparent border-l-[60vw] border-l-[#D3AF37]/50 z-10"
            style={{
              maxHeight: "1200px", // Constrain the maximum height of the border
              minHeight: "500px", // Ensure the border is at least as tall as the image
            }}
          ></div>
          <div
            className="hidden md:block absolute right-0 top-0 w-0 h-0 border-t-[20vh] md:border-t-[80vh] mt-[20vh] mb-[20px] border-t-transparent border-b-transparent border-r-[60vw] border-r-[#D3AF37]/50 border-opacity-50 z-10"
            style={{
              maxHeight: "1200px", // Constrain the maximum height of the border
              minHeight: "500px", // Ensure the border is at least as tall as the image
            }}
          ></div>
          {/* Content Section */}
          <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-28">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 md:p-12 max-w-[1100px]">
              <h1 className="font-nunito text-white text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
                SSICSIM 2025 Wrapped
              </h1>
              <p className="mt-4 font-dm-sans text-[#f0e7d6] text-lg md:text-xl max-w-[70%]">
                A look back at an unforgettable conference that had records
                broken and stories written.
              </p>
              <div className="mt-6 flex items-center gap-4">
                <a
                  href="https://drive.google.com/drive/folders/1uGSNbdpPw-CQWR7n1-qCC_mTBeh_3_fm"
                  rel="noopener noreferrer"
                  className=" bg-white text-[#A3841D] px-4 py-4 rounded-lg font-dm-sans text-xl md:text-2xl font-bold hover:bg-gray-100 transition-colors"
                >
                  Conference Photos
                </a>
              </div>
            </div>
          </div>{" "}
        </div>
      </div>
      <div className="relative bg-white">
        {/* SSICSIM 2025 Section */}
        <div className="max-w-[1800px] w-full mx-auto flex flex-col md:flex-row items-center gap-12 px-6 py-16">
          {/* Text */}
          <div className="md:w-1/2 flex flex-col ml-4 gap-6 border-[#A3841D] border-l-8 pl-6">
            <p className="text-xl md:text-2xl font-extralight text-gray-700 tracking-wide">
              SSICSIM 2025
            </p>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
              ref={strategyRef}
            >
              One Conference, Records Broken
            </h2>
            <p className="text-md md:text-lg text-gray-700 font-light">
              At SSICSIM 2025, we shattered records with nearly…
            </p>

            {/* Counter */}
            <div className="mt-4 flex items-center justify-start gap-4">
              <div className="flex flex-col items-center">
                <h1
                  ref={counterRef}
                  className="text-6xl md:text-7xl lg:text-8xl font-extrabold text-gold-500"
                >
                  0+
                </h1>
                <p className="text-xl md:text-2xl font-semibold text-gold-500 mt-[-8px]">
                  Delegates
                </p>
              </div>
            </div>

            <p className="mt-4 text-md md:text-lg text-gray-700 font-light">
              Yep, that many people! One of the largest iterations of SSICSIM in
              its thirteen-year history!
            </p>
          </div>

          {/* Image */}
          <div className="md:w-1/2 flex justify-center relative border-[#A3841D] border-8 rounded-2xl p-2">
            <div className="relative w-full aspect-[4/3]">
              <Image
                src={`${CF_DOMAIN}/FirstStatImage.png`}
                alt="Delegates at SSICSIM 2025"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="rounded-2xl shadow-xl hover:scale-105 transition-transform duration-500 object-cover"
              />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-[3px] bg-gold-500 my-12"></div>

        {/* Staff Section */}
        <div className="max-w-[1800px] w-full mx-auto flex flex-col md:flex-row items-center gap-12 px-6 py-16 bg-gray-50 rounded-3xl shadow-lg">
          {/* Image */}
          <div className="md:w-1/2 flex justify-center relative border-[#A3841D] border-8 rounded-2xl p-2">
            <div className="relative w-full aspect-[4/3]">
              <Image
                src={`${CF_DOMAIN}/WrappedStaff.jpg?format=webp`}
                alt="Staff at SSICSIM 2025"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="rounded-2xl shadow-xl hover:scale-105 transition-transform duration-500 object-cover"
              />
            </div>
          </div>

          {/* Text */}
          <div className="md:w-1/2 flex flex-col gap-6 border-[#A3841D] border-l-8 pl-6">
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
              ref={strategyRef}
            >
              Record-Breaking Number of Staff?
            </h2>
            <p className="text-md md:text-lg text-gray-700 font-light">
              With nearly…
            </p>

            {/* Counter */}
            <div className="mt-4 flex items-center justify-start gap-4">
              <div className="flex flex-col items-center">
                <h1
                  ref={staffRef}
                  className="text-6xl md:text-7xl lg:text-8xl font-extrabold text-gold-500"
                >
                  0+
                </h1>
                <p className="text-xl md:text-2xl font-semibold text-gold-500 mt-[-8px]">
                  Staff
                </p>
              </div>
            </div>

            <p className="mt-4 text-md md:text-lg text-gray-700 font-light">
              The largest amount of staff ever had in SSICSIM history, couldn’t
              have done it without you! ❤️
            </p>
          </div>
        </div>
      </div>
      {/* Committee Types and Image Section */}
      <div className="bg-[#A3841D] py-12 relative">
        <h1
          id="committees-heading"
          ref={committeesRef}
          className="w-[100vw] text-center text-3xl lg:text-5xl font-extrabold text-white mb-10 font-nunito variable-font"
        >
          At SSICSIM 2025, delegates ventured through 17 Different Committees
        </h1>

        {/* Horizontal scroll container */}

        <div
          ref={scrollRef}
          className="horizontal-scroll-container overflow-x-auto overflow-y-visible py-8 px-4"
        >
          <div className="horizontal-scroll-inner flex items-start gap-10">
            {committeeSummary.map((c, i) => (
              <CommitteeSummary
                key={i}
                title={c.title}
                description={c.description}
                image={c.image}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="w-full h-full bg-white">
        <div className="max-w-[2000px] mx-auto md:w-[100vw] relative z-10 flex flex-col md:flex-row md:items-center gap-4 md:gap-8 px-4 md:px-12 py-8">
          <div className="flex flex-col mx-auto w-[90vw] px-4">
            <h2
              className="text-[36px] text-center md:text-[40px]/ lg:text-[50px] font-bold text-black font-nunito leading-tight"
              ref={strategyRef}
            >
              And of course, we had some victorious!
            </h2>
            <h3 className="text-[16px] mt-4 md:text-[20px] lg:text-[25px] text-center font-light text-black font-dm-sans">
              Click here to see the full list of award winners from SSICSIM!
            </h3>
            <WinnersCarousel data={winnersData} />
          </div>
        </div>
      </div>
      <div className="w-full bg-white py-16 px-4 md:px-12">
        <div className="max-w-[2000px] mx-auto flex flex-col md:flex-row items-start md:items-center gap-8">
          {/* LEFT: Thank You Text & Delegations */}
          <div className="md:w-1/2 flex flex-col gap-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black font-nunito">
              From All of Us at SSICSIM 2025…
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl font-light text-black font-dm-sans">
              A huge thank you to all delegates, staff, and volunteers who made
              this conference an incredible experience. Your energy and passion
              in committee brought every debate to life and made this iteration
              unforgettable! :){" "}
            </p>
            <p className="text-lg md:text-xl lg:text-2xl font-light text-black font-dm-sans">
              We can’t wait to see you again at{" "}
              <span className="font-semibold">SSICSIM 2026</span>!
            </p>

            <h3 className="text-xl md:text-2xl font-nunito font-semibold text-[#A3841D] mt-4">
              Delegations that joined us this year:
            </h3>
            <ul className="list-disc list-inside grid grid-cols-2 md:grid-cols-2 gap-2 text-base md:text-[12px] text-gray-700 font-dm-sans">
              {[
                "Sentosa",
                "CodeX",
                "Westmount Collegiate Institute",
                "GTAMUN",
                "Xavier Tigers",
                "Brampton Centennial Secondary School",
                "Prairie Lamb Empire",
                "Lawrence Park CI",
                "Black Pine",
                "Sunrise Education Inc",
                "The York School",
                "Chinguacousy Secondary School",
                "King's Christian Collegiate",
                "Richmond Hill High School",
                "Central Peel Secondary School",
                "Parkdale Collegiate Institute",
                "École secondaire catholique Saint-Charles-Garnier",
                "Sherwood Heights School",
                "The Woodlands School",
                "Lorne Park Secondary School",
                "Crestwood Preparatory College",
                "Pickering High School",
                "Royal St. George's College",
                "Monarch Park Collegiate",
                "Westdale Secondary School",
              ].map((delegation, i) => (
                <li key={i}>{delegation}</li>
              ))}
            </ul>
          </div>

          {/* RIGHT: Staff Image */}
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <div className="relative w-full md:w-[90%] aspect-[3/2]">
              <Image
                src={`${CF_DOMAIN}/secretariat.jpg?format=webp`}
                alt="SSICSIM Staff 2025"
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="rounded-xl shadow-xl object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Wrapped;

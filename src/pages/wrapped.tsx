import { useEffect } from "react";
import { useRef } from "react";
import CommitteeSummary from "../components/CommiteeSummary";
import WinnersCarousel from "../components/WinnerEntry";

import SplitType from "split-type";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CF_DOMAIN } from "../utils/consts";

gsap.registerPlugin(ScrollTrigger);

const Wrapped = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const strategyRef = useRef(null);
  const counterRef = useRef<HTMLHeadingElement>(null);
  const staffRef = useRef<HTMLHeadingElement>(null);

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
      image: `${CF_DOMAIN}/FightOfTheLaytonLegacy.jpg?format=webp`,
    },
    {
      title: "Vive La Revolution: Cake, Blood and Banque",
      description: "A kingdom on fire, and a blade that decides its fate.",
      image: `${CF_DOMAIN}/ViveLaRevolution.jpg?format=webp`,
    },
    {
      title: "Bakumatsu: The Fall of the Shogunate",
      description: "Tradition collapsing, a new Japan igniting.",
      image: `${CF_DOMAIN}/BakamatsuCommittee.jpg?format=webp`,
    },
    {
      title: "English Civil War",
      description: "Power divided, a nation at its breaking point.",
      image: `${CF_DOMAIN}/EnglishCivilWar.jpg?format=webp`,
    },
    {
      title: "Historical Ad Hoc",
      description: "History’s chaos—unfiltered and unforgiving.",
      image: `${CF_DOMAIN}/HistoricalAdHocCommittee.jpg?format=webp`,
    },
    {
      title: "March of the Machine: The Phyrexian Invasion",
      description: "A universe on the brink of assimilation.",
      image: `${CF_DOMAIN}/MarchOfTheMachine.jpg?format=webp`,
    },
    {
      title: "See You This Summer!",
      description: "Mysteries uncovered, weirdness unleashed.",
      image: `${CF_DOMAIN}/GravityFalls.jpg?format=webp`,
    },
    {
      title: "The 39 Clues: Cahills vs. Vespers",
      description: "Ancient secrets, global stakes, one final race.",
      image: `${CF_DOMAIN}/39CluesCommittee.jpg?format=webp`,
    },
    {
      title: "Valorant: CONV//ERGENCE",
      description: "Two worlds colliding, one reality left standing.",
      image: `${CF_DOMAIN}/Valorant.jpg?format=webp`,
    },
    {
      title: "Fictional Ad Hoc",
      description: "The unknown, raw and unpredictable.",
      image: `${CF_DOMAIN}/FictionalAdHocCommittee.jpg?format=webp`,
    },
    {
      title: "Fall of Atlantis",
      description: "A utopia crumbling beneath rising tides.",
      image: `${CF_DOMAIN}/FallOfAtlantis.jpg?format=webp`,
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
      image: `${CF_DOMAIN}/SavingSeleneCity.jpg?format=webp`,
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
      image: "/committees/sc.jpg",
      winners: [
        "Best Delegate – Gabrielle Irumhekha",
        "Outstanding Delegate – Kaavya Sethepalli",
        "Honourable Mention – Michelle Irumhekha",
        "Best Novice - Yash Chhabaria"
      ],
    },
    {
      committee: "Fight for the Layton Legacy: 2012 NDP Leadership Race",
      image: "/committees/unicef.jpg",
      winners: [
        "Best Delegate – Joey Lin",
        "Outstanding Delegate – Arnav Anil Kotian",
        "Honourable Mention – Tanya Walia",
        "Best Novice - Ananya Agarwal",
        "Best Duo - Ellena Stamatiou & Beatriz Baptista"
      ],    },
    {
      committee: "Vive La Revolution: Cake, Blood and Banque",
      image: "/committees/who.jpg",
      winners: [
        "Best Delegate – Spencer Moriarty",
        "Outstanding Delegate – Gur Niwaz Singh Aulakh",
        "Honourable Mention – Maddix Huffman",
        "Best Novice – Anishka Kulkarni",
      ],
    },
    {
      committee: "Bakumatsu: The Fall of the Shogunate (Pro-Shogunate)",
      image: "/committees/who.jpg",
      winners: [
        "Best Delegate – Lucas Pan",
        "Outstanding Delegate – Ishsimar Pahwa",
        "Honourable Mention – Andrew Zhang",
        "Best Novice – Alexa Wen",
      ],
    },
    {
      committee: "Bakumatsu: The Fall of the Shogunate (Pro-Emperor)",
      image: "/committees/who.jpg",
      winners: [
        "Best Delegate – Jason Zhao",
        "Outstanding Delegate – Anomioghene Medu",
        "Honourable Mention – Ryo Kumar",
        "Best Novice – Cole Ebata",
      ],
    },
    {
      committee: "English Civil War (Royalists)",
      image: "/committees/who.jpg",
      winners: [
        "Best Delegate – David Setareh",
        "Outstanding Delegate – Kaleb Blanchard",
        "Honourable Mention – Grace Sun",
        "Best Novice – Justin Cao",
      ],
    },
    {
      committee: "English Civil War (Parliamentarians)",
      image: "/committees/who.jpg",
      winners: [
        "Best Delegate – Jacob Lang",
        "Outstanding Delegate – Artus Siu",
        "Honourable Mention – Kimaya Gupte",
        "Best Novice – Rishitha Poda",
      ],
    },
    {
      committee: "Historical Ad Hoc",
      image: "/committees/who.jpg",
      winners: [
        "Best Delegate – Rubina Khan",
        "Outstanding Delegate – Helena Musson",
        "Honourable Mention – Megan Allison",
        "Best Novice – Ryan Delill",
      ],
    },
    {
      committee: "March of the Machine: The Phyrexian Invasion",
      image: "/committees/who.jpg",
      winners: [
        "Best Delegate – Jasjeet Sidhu",
        "Outstanding Delegate – Ananya Singhal",
        "Honourable Mention – Benji Agromayor",
        "Best Novice – Gopika Vaspate",
      ],
    },
    {
      committee: "See You This Summer!",
      image: "/committees/who.jpg",
      winners: [
        "Best Delegate – Grace Lavallee-Noel",
        "Outstanding Delegate – Suhaan Chanana",
        "Honourable Mention – Lily Nguyen",
        "Best Novice – Oona Galipeau",
      ],

    },
    {
      committee: "The 39 Clues: Cahills vs. Vespers (Cahills)",
      image: "/committees/who.jpg",
      winners: [
        "Best Delegate – Camilo Sierra de Rojas",
        "Outstanding Delegate – William Debane",
        "Honourable Mention – Robbie Armstrong",
        "Best Novice – Reichen Thorpe",
      ]
    },
    {
      committee: "The 39 Clues: Cahills vs. Vespers (Vespers)",
      image: "/committees/who.jpg",
      winners: [
        "Best Delegate – Tate Ullock",
        "Outstanding Delegate – Dhyana Patel",
        "Honourable Mention – Sabin Koirala",
        "Best Novice – Dillon Shelley",
      ]
    },
    {
      committee: "Valorant: CONV//ERGENCE (Alpha)",
      image: "/committees/who.jpg",
      winners: [
        "Best Delegate – Ariel Ow",
        "Outstanding Delegate – Suhaana Sharma",
        "Honourable Mention – Sarathraj Maharajan",
        "Best Novice – Rudraa Manjrekar",
      ]
    },
    {
      committee: "Valorant: CONV//ERGENCE (Omega)",
      image: "/committees/who.jpg",
      winners: [
        "Best Delegate – Bessie Liu",
        "Outstanding Delegate – Rahib Arham",
        "Honourable Mention – Elliot Zhou",
        "Best Novice – Yousef Muhammed",
      ]
    },
    {
      committee: "Fictional Ad Hoc",
      image: "/committees/who.jpg",
      winners: [
        "Best Delegate – Desmond Hollingsworth",
        "Outstanding Delegate – Onur Soran",
        "Honourable Mention – Isabel Dai",
        "Best Novice – Saiffie Sidhu",
      ]
    },
    {
      committee: "Fall of Atlantis",
      image: "/committees/who.jpg",
      winners: [
        "Best Delegate – Giulia Gucciardi",
        "Outstanding Delegate – Julia Wu",
        "Honourable Mention – Ariadne Gonsalves",
        "Best Novice – Muhammad Syed",
      ]
    },
    {
      committee: "Met Gala 2026",
      image: "/committees/who.jpg",
      winners: [
        "Best Delegate – Flora Gu",
        "Outstanding Delegate – Mitchell Ojei-David",
        "Honourable Mention – Kate Yau",
        "Best Novice – Vaibhavi Khare",
      ]
    },
    {
      committee: "Second Renaissance",
      image: "/committees/who.jpg",
      winners: [
        "Best Delegate – Hayley Pang",
        "Outstanding Delegate – Kaelyn Shen",
        "Honourable Mention – Ben Krakauer",
        "Best Novice – Madeline Mountz",
      ]
    },
    {
      committee: "Tetris",
      image: "/committees/who.jpg",
      winners: [
        "Best Delegate – Gloria Yang",
        "Outstanding Delegate – Jackie Liu",
        "Honourable Mention – Aydin Dossa",
        "Best Novice – Nick Chen",
      ]
    },
    {
      committee: "Saving Selene City: A Lunar Colony Crisis (Earth)",
      image: "/committees/who.jpg",
      winners: [
        "Best Delegate – Adarsh Thoduvakkal",
        "Outstanding Delegate – Douglas Forrest",
        "Honourable Mention – Jasmeet Singh",
        "Best Novice – Malcolm Seifred",
      ]
    },
    {
      committee: "Saving Selene City: A Lunar Colony Crisis (Selene City)",
      image: "/committees/who.jpg",
      winners: [
        "Best Delegate – Prabhjot Singh Saini",
        "Outstanding Delegate – Xavier Gaudreau",
        "Honourable Mention – Preston Lui",
        "Best Novice – Julian Cheng",
      ]
    },
    {
      committee: "Conceptual Ad Hoc",
      image: "/committees/who.jpg",
      winners: [
        "Best Delegate – Sumayyah Satia",
        "Outstanding Delegate – Audrina Dayrit",
        "Honourable Mention – Gordon Zeng",
        "Best Novice – Xavi Amy",
      ]
    }
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
      <div className="w-[100vw] overflow-x-hidden">
        <div className="relative w-full min-h-[500px] h-screen max-h-[1200px] overflow-hidden pt-[80px]">
          {/* Background Image */}
          <img
            src={`${CF_DOMAIN}/UoftAerialPhoto.jpg?format=webp`}
            alt="University of Toronto Ariel View"
            className="absolute top-0 left-0 w-full min-h-[500px] h-screen max-h-[1200px] object-cover z-10"
            loading="lazy"
          />

          {/* Content Section */}
          <div className="max-w-[2000px] mt-12 mx-auto absolute inset-0 w-full h-full flex flex-col items-start justify-center font-nunito z-20">
            <h1 className="text-white text-left md:text-5xl lg:text-7xl font-bold w-[90vw] lg:w-[900px] ml-6 leading-tight text-4xl">
              SSICSIM 2025 Wrapped
            </h1>
            <a
              href="/resources"
              rel="noopener noreferrer"
              className="ml-6 mt-4 bg-white text-[#A3841D] px-4 py-4 rounded-lg font-dm-sans text-xl md:text-2xl font-bold hover:bg-gray-100 transition-colors"
            >
              Conference Resources
            </a>
          </div>

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
        </div>
      </div>
      <div className="relative bg-white grid grid-rows-auto">
        {/* Text Content SSICSIM2025Polaroid.png */}
        <div className="max-w-[2000px] w-[100vw]  bg-white relative z-10 flex flex-col md:flex-row md:items-center gap-4 md:gap-8 px-4 md:px-12 py-8">
          <div className="w-1/2 px-4">
            <p className="text-[24px] md:text-[30px] font-extralight text-black font-grotesque">
              SSICSIM 2025
            </p>
            <h2
              className="text-[36px] md:text-[50px]/ lg:text-[72px] font-bold text-black font-nunito leading-tight"
              ref={strategyRef}
            >
              One Conferences, Records Broken
            </h2>
            <h3 className="text-[16px] mt-4 md:text-[20px] lg:text-[25px] font-light text-black font-dm-sans">
              At SSICSIM 2025, we shattered records with nearly..
            </h3>
            <div className="flex items-center w-[100%] justify-center">
              <div className="list-inside mt-2 text-[16px] md:text-[20px] text-center text-black font-dm-sans">
                <h1
                  ref={counterRef}
                  className="font-extrabold text-[#A3841D] lg:text-[100px] mb-0 pb-0"
                >
                  0+
                </h1>
                <h2 className="lg:text-[40px] text-[#A3841D] mt-[-20px]">
                  Delegates
                </h2>
              </div>
            </div>
            <h3 className="text-[16px] mt-4 md:text-[20px] lg:text-[25px] font-light text-black font-dm-sans">
              Yep that many people, one of the largest iterations of SSICSIM in
              the thirteen years its been running!
            </h3>
          </div>
          <div className="md:w-1/2">
            <img
              src={`${CF_DOMAIN}/SSICSIM2025Polaroid.png`}
              alt="Delegates at SSICSIM 2025"
              className="w-[80%] h-auto mx-auto rounded-lg shadow-lg"
              loading="lazy"
            />
          </div>
        </div>
        {/* Divider */}
        <div className="w-full h-[2px] bg-[#A3841D] my-4"></div>
        {/* Cards Section */}
        <div className="max-w-[2000px] md:w-[100vw] relative z-10 flex flex-col md:flex-row md:items-center gap-4 md:gap-8 px-4 md:px-12 py-8">
          <div className="md:w-1/2 flex flex-col px-4">
            <img
              src={`${CF_DOMAIN}/WrappedStaff.jpg?format=webp`}
              alt="Delegates at SSICSIM 2025"
              className="h-[80%] w-auto mx-auto rounded-lg shadow-lg"
              loading="lazy"
            />
          </div>
          <div className="md:w-1/2 px-4">
            <h2
              className="text-[36px] md:text-[50px]/ lg:text-[72px] font-bold text-black font-nunito leading-tight"
              ref={strategyRef}
            >
              Record Breaking Number of Staff?
            </h2>
            <h3 className="text-[16px] mt-4 md:text-[20px] lg:text-[25px] font-light text-black font-dm-sans">
              With nearly..
            </h3>
            <div className="flex items-center w-[100%] justify-center">
              <div className="list-inside mt-2 text-[16px] md:text-[20px] text-center text-black font-dm-sans">
                <h1
                  ref={staffRef}
                  className="font-extrabold text-[#A3841D] lg:text-[100px] mb-0 pb-0"
                >
                  0+
                </h1>
                <h2 className="lg:text-[40px] text-[#A3841D] mt-[-20px]">
                  Staff
                </h2>
              </div>
            </div>
            <h3 className="text-[16px] mt-4 md:text-[20px] lg:text-[25px] font-light text-black font-dm-sans">
              The largest amount of staff ever had in SSICSIM history, couldn’t
              have done it without you! ❤️
            </h3>
          </div>
        </div>
        {/* Committee Types and Image Section */}
        <div className="bg-[#A3841D] py-12 relative">
          <h1 className="w-[100vw] text-center text-4xl lg:text-6xl font-extrabold text-black mb-10">
            At SSICSIM 2025, delegates ventured through <br />
            <span className="text-black">17 Different Committees</span>
          </h1>

          {/* Horizontal scroll container */}

          <div
            ref={scrollRef}
            className="horizontal-scroll-container overflow-scroll whitespace-nowrap py-8 px-4"
          >
            <div className="horizontal-scroll-inner flex items-center gap-10">
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
          <div className="max-w-[2000px] md:w-[100vw] relative z-10 flex flex-col md:flex-row md:items-center gap-4 md:gap-8 px-4 md:px-12 py-8">
            <div className="flex flex-col mx-auto w-[60vw] px-4">
              <h2
                className="text-[36px] text-center md:text-[50px]/ lg:text-[72px] font-bold text-black font-nunito leading-tight"
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
      </div>
    </>
  );
};

export default Wrapped;

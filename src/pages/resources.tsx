import { CF_DOMAIN } from "../utils/consts";
import { resources } from "../utils/data";
import ConferenceSchedule from "../components/Schedule";
import { useState } from "react";
import { parseDescription } from "../utils/utils";

const Resources = () => {
  const faqs = [
    {
      question: "I'm new to MUN. Does SSICSIM have any beginner committees?",
      answer:
        "First off, don't worry, we were all beginners at one point! SSICSIM has committees that appeal to all levels of experience: beginner, intermediate, and advanced. Check out the website for more information on the committees, and take a look at the resources provided. The [Delegate's Guide to Crisis]{https://drive.google.com/file/d/18UHASiviwqNX4SCHptRfz_2rLLJbJPe1/view} is a good place to start, and the [Rules of Procedure]{https://drive.google.com/file/d/1CPD-I1XtxcrSHqEyWHYlxXyDsHF5X00G/view?usp=sharing} document offers a comprehensive explanation of the mechanics of committee. That said, if at any point during the conference you feel you would like more guidance, feel free to reach out to any member of staff and we will be happy to help.",
    },
    {
      question: "Do I need to do any work or prepare materials beforehand?",
      answer:
        "It's highly recommended that all delegates review their committee's background guide, mechanics guide and character descriptions prior to the conference. These three documents are central to your committee and will provide key insight into the topics your committee will address and what resources are available to each character.",
    },
    {
      question:
        "I've never done a crisis committee before. How can I prepare for SSICSIM?",
      answer:
        "To better understand your committee's content, review the background guide available on the SSICSIM website. To better understand Model UN terminology and style of debate, check out The [Delegate's Guide]{https://drive.google.com/file/d/18UHASiviwqNX4SCHptRfz_2rLLJbJPe1/view} to Crisis and your committee's mechanics guide as those documents provide a step-by-step deconstruction of your committee and provide recommendations on how to move through the debate.",
    },
    {
      question: "Do I need to write a position paper?",
      answer:
        "No. While we'd like you to familiarize yourself with the committee by reading through the background guide, you are not expected to write a position paper.",
    },
    {
      question: "What does a typical day of committee sessions look like?",
      answer:
        "Every day is different and entirely dependent on what your committee is discussing, but generally, your Moderator will open each session with a brief recap of what happened the day/session prior and open the floor to any points or motions. From here, it's up to the committee what they would like to do first; perhaps move into a moderated caucus, present outstanding directives, or maybe a new crisis update is ready to be shared. If you're ever confused about what to do next, it's highly recommended you check out the [Delegate's Guide to Crisis]{https://drive.google.com/file/d/18UHASiviwqNX4SCHptRfz_2rLLJbJPe1/view}.",
    },
    {
      question: "Where can I find the Rules of Procedure for SSICSIM?",
      answer:
        "The Rules of Procedure is available on the SSICSIM website here: [Rules of Procedure]{https://drive.google.com/file/d/1CPD-I1XtxcrSHqEyWHYlxXyDsHF5X00G/view?usp=sharing}. If you find this document to be too long or difficult to read, that's okay! Check out the [Delegate's Guide to Crisis]{https://drive.google.com/file/d/18UHASiviwqNX4SCHptRfz_2rLLJbJPe1/view} instead for a summary of key committee blocks and how/when to motion for them here: [Delegate's Guide to Crisis]{https://drive.google.com/file/d/18UHASiviwqNX4SCHptRfz_2rLLJbJPe1/view}.",
    },
    {
      question:
        "Where can I find my committee background guide and character descriptions?",
      answer:
        "All committee documents can be found under your committee's specific webpage. If you have a question or comment about your committee's content, feel free to email the committee email included on the first page of all background guides and your Director will be happy to help!",
    },
    {
      question: "I'm not sure where or how to find my committee room.",
      answer:
        "The provided SSICSIM 2025 Delegate Handbook features a map of the UofT campus as well as room details. For navigating the campus and finding specific buildings at UofT, visit [map.utoronto.ca]{https://map.utoronto.ca/?id=1809} to search the name of the building you need. Once inside, navigating the rooms can be confusing: look for signs as best you can, and feel free to ask any member of staff for help. We also recommend using [ClassFind]{https://classfind.com/toronto} for specific directions to a room!",
    },
    {
      question:
        "I'm an independent delegate. How do I get to Toronto for the conference?",
      answer:
        "Toronto has many transit connections to make your commute to the city easier, including bus connections, subway routes, regular train arrivals and an intricate, though often congested, map of highways. The University of Toronto campus is uniquely situated in Downtown Toronto, making it very accessible by public transit. To plan your route via public transit, we recommend you use services like [Google Maps]{https://www.google.com/maps} and [GO Transit]{https://www.gotransit.com/en} as they provide the most timely information on public transit times, departures and services. In general, it's wise to plan to arrive on campus 30 minutes before your first committee session, to account for any possible delays.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number | null) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <>
      {/* Hero Section */}
      <div className="block w-full min-h-[400px] h-[80vh] max-h-[1200px] relative">
        <img
          src={`${CF_DOMAIN}/UoftAerialPhoto.jpg?format=webp`}
          alt="University of Toronto Aerial View"
          className="absolute top-0 left-0 w-full h-full object-cover z-10"
          loading="lazy"
        />

        {/* Dark overlay only */}
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

        {/* Text */}
        <div className="max-w-[3000px] mx-auto absolute inset-0 flex flex-col items-start justify-center z-20 px-6">
          <h1 className="text-white text-left text-4xl font-bold w-[80vw] lg:w-[800px] font-nunito leading-tight md:text-7xl drop-shadow-md">
            Conference Resources
          </h1>
        </div>
      </div>

      {/* Resources Section */}
      <div className="relative bg-gray-100 py-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-4xl font-bold font-nunito text-center text-[#A3841D]">
            Resources
          </h2>
          <div className="mt-2 mb-8 max-w-2xl mx-auto text-center">
            <p className="text-lg text-gray-700 font-dm-sans">
              Everything you need to prepare, participate, and succeed at the
              conference — from committee archives to the code of conduct and
              conference guides.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Full-width resource card */}
            <a
              href="https://drive.google.com/file/d/1tuoAAv6g3IbADvzDk4w3QcUOEP7-Zw-j/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="relative h-56 overflow-hidden shadow-lg group rounded-xl md:col-span-3"
            >
              {/* Background with gold tint */}
              <div
                className="absolute inset-0 bg-cover bg-[#A3841D]/40 bg-center transition-transform duration-300 group-hover:scale-105"
                style={{
                  backgroundImage: `linear-gradient(rgba(163,132,29,0.4), rgba(163,132,29,0.4)), url('https://your-image-url.com')`,
                  backgroundBlendMode: "multiply",
                }}
              />

              {/* Optional: subtle dark overlay for readability */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />

              {/* Glassmorphic text box */}
              <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
                <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl px-4 py-3">
                  <h3 className="text-2xl font-bold text-white mb-2 font-nunito">
                    Delegate Handbook
                  </h3>
                  <p className="text-white text-sm font-dm-sans">
                    Your comprehensive guide to everything SSICSIM 2025,
                    including campus maps, schedules, rooms and important
                    information.
                  </p>
                </div>
              </div>
            </a>

            {/* Regular 3-column resources */}
            {resources.map((res, idx) => (
              <a
                key={idx}
                href={res.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative h-56 overflow-hidden shadow-lg group rounded-xl"
              >
                <div
                  className="absolute inset-0 bg-cover bg-[#A3841D]/40 bg-center transition-transform duration-300 group-hover:scale-105"
                  style={{
                    backgroundImage: `linear-gradient(rgba(163,132,29,0.4), rgba(163,132,29,0.4)), url(${res.bg})`,
                    backgroundBlendMode: "multiply",
                  }}
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />
                <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
                  <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl px-4 py-3">
                    <h3 className="text-2xl font-bold text-white mb-2 font-nunito ">
                      {res.title}
                    </h3>
                    <p className="text-white text-sm font-dm-sans">
                      {res.description}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Description under resources */}
        </div>

        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-4xl mt-18 font-bold font-nunito text-center text-[#A3841D]">
            Conference Schedule
          </h2>
          <div className="space-y-12">
            <ConferenceSchedule />
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto mt-24 px-6">
          <h2 className="text-4xl font-bold font-nunito text-center text-[#A3841D] mb-10">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-300 rounded-lg shadow"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className={`w-full text-left px-6 py-4 flex justify-between items-center font-nunito text-lg font-semibold text-gray-800 ${openIndex === index ? "bg-[#A3841D] text-white border-b" : "bg-gray-200"}`}
                >
                  {faq.question}
                  <span
                    className={`ml-4 ${openIndex === index ? "text-white" : "text-[#A3841D]"} text-xl`}
                  >
                    {openIndex === index ? "−" : "+"}
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-1000 ease-in-out ${
                    openIndex === index
                      ? "max-h-60 opacity-100 bg-[#A3841D]"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div
                    className={`px-6 pb-4 text-gray-700 text-[12px] md:text-[16px] font-dm-sans ${openIndex === index ? "text-white pt-4" : "text-gray-700"}`}
                  >
                    {parseDescription(faq.answer, "text-xs md:text-base")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Resources;

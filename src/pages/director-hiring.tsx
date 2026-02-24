import { CF_DOMAIN } from "../utils/consts";
import { useState } from "react";

const DirectorHiring = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const questions = [
    {
        question: "What is a crisis committee? What commitees can I pitch?",
        answer: (
            <div className="space-y-3">
                <p>
                    Crisis committees are faster-paced simulations compared to normal MUN committees, where delegates respond to live updates and time-sensitive challenges. Your committee idea should be a topic that <strong>allows for interesting and evolving situations</strong>.
                </p>
                <br></br>
                <p>
                    SSICSIM committees are categorized under the following three branches:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Fictional Branch:</strong> Committees based on pre-existing fiction (e.g., Harry Potter, Attack on Titan)</li>
                    <li><strong>Historical Branch:</strong> Committees based on real historical settings (e.g., Cuban Missile Crisis, French Revolution)</li>
                    <li><strong>Conceptual Branch:</strong> Committees based on unique/original settings (e.g., business, entertainment, sports)</li>
                </ul>
                <br></br> 
                <p> 
                    What types of committees can you pitch? The short answer is: <strong> anything </strong> that falls in these branches! We encourage you to be creative with your committee ideas, and consider whether your committee will have enough content for 3 days of debate.
                </p>

            </div>
        )
    },
    {
      question:
        "What are the requirements to apply to be a director for SSICSIM 2026?",
      answer: (
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Open to all students who will be enrolled at a Canadian post-secondary institution in Fall 2026. 
          </li>
          <li>
            <strong> Preferred (Not Required): </strong> At least 1 year of experience in Crisis at SSICSIM/UTMUN/NAMUN.
          </li>
        </ul>
      ),
    },
    {
      question:
        "I want to pitch a commitee idea with a friend. Do we have to submit separate applications?",
      answer: (
        <p>
            <strong> No </strong>, if you are applying with one or more Co-Directors, please ensure that each of you fill out this form individually and indicate the full name(s) of your Co-Director(s) on your Committee Pitches Document! 
        </p>
      ),
    },
    {
      question:
        "Can I pitch a JCC Commitee by myself or do I need to find a Co-Director to apply with?",
      answer: (
        <p>
            <strong> SSICSIM 2026 is enforcing a co-director requirement for all JCC Committees. </strong> If you are interested in directing a JCC Committee, you must find at least one Co-Director to apply with. If you cannot find a co-director but still interested in a JCC, please reach out to                 <a href="mailto:academics@ssicsim.ca" className="underline font-bold">
                  academics@ssicsim.ca.
                </a>
        </p>
      ),
    },

  ];

  return (
    <>
      {/* Hero Section */}
      <div className="block w-full min-h-[400px] h-[80vh] max-h-[1200px]">
        <img
          src={`${CF_DOMAIN}/UoftAerialPhoto.jpg?format=webp`}
          alt="University of Toronto Aerial View"
          className="absolute top-0 left-0 w-full min-h-[400px] h-[80vh] max-h-[1200px] object-cover z-10"
          loading="lazy"
        />
        <div className="absolute top-0 left-0 w-full min-h-[400px] h-[80vh] max-h-[1200px] bg-black opacity-40 z-10"></div>
        <div className="max-w-[3000px] mx-auto absolute top-0 left-0 inset-0 w-full min-h-[400px] h-[80vh] flex flex-col items-start justify-center z-20 max-h-[1200px]">
          <h1 className="text-white text-left text-4xl font-bold w-[80vw] lg:w-[800px] font-nunito leading-tight ml-6 md:text-7xl">
            Director Hiring
          </h1>
        </div>
      </div>

      <div className="relative pb-7 bg-white w-full grid grid-rows-auto">
        {/* Text Content */}
        <div className="relative z-10 flex max-w-[3000px] mx-auto">
          <div className="grid w-[100%] grid-cols-1 md:w-auto md:grid-cols-2 md:gap-4 ml-5 my-3">
            <div className="p-4 md:ml-[50px]">
              <p className="text-[30px] font-extralight text-[#A3841D] font-grotesque">
                SSICSIM 2026
              </p>
              <h2 className="ml-[-3px] mb-[-10px] mt-[10px] text-[60px] font-bold text-[#A3841D] font-nunito leading-[1]">
                Director Hiring
              </h2>
              <p className="text-[15px] mt-4 lg:text-[20px] font-light text-[#A3841D] font-dm-sans">
                Thank you for your interest in a SSICSIM 2026 Director
                Position! Applications are due{" "}
                <span className="font-bold underline">
                  Wednesday, March 18, 2026 at 11:59 PM.
                </span>{" "}
                Please read the Director FAQs before applying and for more
                information with regards to the roles offered.
              </p>
              <p className="text-[15px] mt-4 lg:text-[20px] font-light text-[#A3841D] font-dm-sans">
We're looking for people who share our vision for clarity, stability, and innovation. As a Director, you will have the opportunity to reflect these values through the creative process of writing, planning, and directing a crisis committee at SSICSIM 2026!
              </p>
              <p className="text-[15px] mt-4 lg:text-[20px] font-light text-[#A3841D] font-dm-sans">
                In the event that we select you for an interview, you will be
                contacted by email. Please keep an eye on your spam box after
                submitting your application.
              </p>
              <p className="text-[15px] mt-4 lg:text-[20px] font-light text-[#A3841D] font-dm-sans">
                If you have any questions, feel free to email{" "}
                <a href="mailto:academics@ssicsim.ca" className="underline font-bold">
                  academics@ssicsim.ca
                </a>
                . Good luck with your application!
              </p>
              <div className="flex md:flex-row flex-col gap-3 md:gap-6 w-full mt-6">
                <a
                  href="https://docs.google.com/forms/d/14ZcdJlrASPLKgU__b8YTC6jPypM-1cab0v15Lxngxhw/edit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-dm-sans text-[20px] md:text-[25px] text-center bg-[#A3841D] text-white px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Apply Now
                </a>
                <a
                  href="https://docs.google.com/document/d/1UQe1CURsqdbyQf2QBfL-i2Y42CeV46gUbqzTpWD79vA/edit?usp=drivesdk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-dm-sans text-[20px] md:text-[25px] text-center bg-[#A3841D] text-white px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Roles & Responsibilities
                </a>
              </div>{" "}
            </div>
            <div className="max-h-[2000px]">
              {/* FAQ Section */}
              <div className="max-w-[1200px] mx-auto mt-24 px-6 pb-24">
                <h2 className="text-4xl font-bold font-nunito text-center text-[#A3841D] mb-10">
                  Director FAQs
                </h2>

                <div className="space-y-5">
                  {questions.map((faq, index) => {
                    const isOpen = openIndex === index;

                    return (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-xl shadow-sm overflow-hidden bg-white"
                      >
                        {/* Question */}
                        <button
                          onClick={() => toggleFAQ(index)}
                          className={`w-full flex justify-between items-center px-6 py-5 text-left transition-colors
              ${
                isOpen
                  ? "bg-[#A3841D] text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }
            `}
                        >
                          <span className="font-nunito font-semibold text-lg">
                            {faq.question}
                          </span>

                          <span
                            className={`ml-4 text-2xl transition-transform duration-300 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          >
                            ▾
                          </span>
                        </button>

                        {/* Answer */}
                        <div
                          className={`grid transition-all duration-500 ease-in-out ${
                            isOpen
                              ? "grid-rows-[1fr] opacity-100"
                              : "grid-rows-[0fr] opacity-0"
                          }`}
                        >
                          <div className="overflow-hidden">
                            <div
                              className={`px-6 pb-6 pt-4 font-dm-sans leading-relaxed
                  ${isOpen ? "bg-[#A3841D] text-white" : "text-gray-700"}
                `}
                            >
                              {faq.answer}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Divider */}
      </div>
    </>
  );
};

export default DirectorHiring;

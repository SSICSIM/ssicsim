import { CF_DOMAIN } from "../utils/consts";
import { useState } from "react";

const DirectorHiring = () => {
  const showGeneralInformation = true;
  const [openOAIndex, setOpenOAIndex] = useState<number | null>(null);
  const [openMSDIndex, setOpenMSDIndex] = useState<number | null>(null);


  const toggleOAFAQ = (index: number) => {
    setOpenOAIndex(openOAIndex === index ? null : index);
  }

  const toggleMSDFAQ = (index: number) => {
    setOpenMSDIndex(openMSDIndex === index ? null : index);
  }


  const oaQuestions = [
    {
      question:
        "What are the requirements to apply to be an Operations Assistant for SSICSIM 2026?",
      answer: (
        <ul className="list-disc pl-6 space-y-2">
          <li>
            (Required) Enrolled at a Canadian post-secondary educational
            institution for the academic year in which the conference is held.
          </li>
          <li>
            At least one year of participation in a Model UN conference or
            experience in a Model UN setting.
          </li>
          <li>
            Experience in event organization and logistics, outreach, marketing,
            and communications.
          </li>
          <li>
            Specific skills/training in networking, outreach, and project
            management.
          </li>
        </ul>
      ),
    },
    {
      question: "How many Operations Assistants are we looking for?",
      answer: <p>We are looking for 3 Operations Assistants to assist with outreaching to sponsors.</p>,
    },
    {
      question: "Can I apply if I already applied for Director?",
      answer: (
        <p>
          Yes, but we will disregard your OA/MSD application if you accept a Director role.
        </p>
      ),
    },
    {
      question: "Do I need experience in outreach/external or MUN experience?",
      answer: (
        <p>
          Outreach/external experience & MUN experience aren't required, but they are both good to have! We are mainly looking for someone who is passionate about Model UN and diplomacy, and has strong communication skills and ability to learn quickly.

          However, we do weigh Outreach/external experience higher, but MUN experience is
          still good to have to know the logistics of the conference.
        </p>
      ),
    },
  ];

  const msdQuestions = [
    {
        question: "What are the requirements to apply to be a Mechanics Software Developer for SSICSIM 2026?",
        answer: (
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Open to all students who will be enrolled at a Canadian post-secondary institution in Fall 2026.
            </li>
            <li>
              Proficiency in common industry programming language(s), such Python, HTML, and/or JavaScript.
            </li>
            <li>
              A strong ability to learn and adapt to new programming languages and software development tools quickly and independently.
            </li>
            <li>
              <strong> Preferred (Not Required): </strong> At least 1 year of experience in Operations at SSICSIM/UTMUN/NAMUN.
            </li>
            <li>
              <strong> Preferred (Not Required): </strong> Major(s) in engineering, computer science, information technologies (IT), or other equivalent technical program(s).
            </li>
            <li>
              <strong> Preferred (Not Required): </strong> Experience in programming design and/or creating software for diverse applications demonstrated through classwork, personal projects, or other examples.
            </li>
          </ul>
  
        ),
    },
    {
        question: "What frameworks and languages does SSICSIM currently use?",
        answer: (
          <p>
            We currently use a React-based for our website hoping to migrate to next.js soon, and looking into using FastAPI (Python) for our backend for internal tools. However, we are open to using other frameworks and programming languages if there are better options that you may suggest.
          </p>
        ),
    },
    {
      question: "I don't have experience in all of the frameworks/languages mentioned above. Should I still apply?",
      answer: (
        <p>
          <strong>Yes!</strong> In fact we highly encourage you to apply even if you don't have experience in all of the languages mentioned above. We are mainly looking for someone who has strong critical thinking skills, problem solving skills and ability to learn quickly, and we are happy to help you to learn any necessary frameworks/languages if you are selected for this role.
        </p>
      ),
    },
    {
      question: "Why software development for a MUN conference?",
      answer: (
        <p>
          We've noticed that internal processes and committee management before and during the conference often lack simplicity and automation. This year, we want to use this opportunity to experiment and improve the experience for both delegates and staff. This is a new role this year, and we're excited to see how it develops! <br></br><br></br> One main area where we've identified complexity is in committee mechanics, where tracking certain elements during the conference can be challenging, and that's where we come in!
        </p>
      ),
    }

  ]

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
            OA/MSD Hiring
          </h1>
        </div>
      </div>

      {/* General Information Section (hidden) */}
      {showGeneralInformation && (
        <>
          <div className="relative py-16 bg-gradient-to-br from-white via-gray-50 to-white w-full overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-[#A3841D] opacity-5 transform skew-x-12"></div>

            <div className="relative z-10 max-w-[1200px] mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div>
                    <p className="text-[30px] font-extralight text-[#A3841D] font-grotesque">
                      SSICSIM 2026
                    </p>
                    <h2 className="text-[60px] font-bold text-[#A3841D] font-nunito leading-[1] mt-2">
                      Open Positions
                    </h2>
                    <div className="w-24 h-1 bg-[#A3841D] mt-4"></div>
                  </div>

                  <p className="text-[15px] lg:text-[20px] font-light text-[#A3841D] font-dm-sans">
                    Thank you for your interest in joining SSICSIM 2026!
                    Applications for all positions are due{" "}
                    <span className="font-bold underline">
                      Friday, May 1st, 2026 at 11:59 PM.
                    </span>{" "}
                    Please review the role-specific FAQs & the roles and
                    repsonsbilities document below before applying.
                  </p>

                  <p className="text-[15px] lg:text-[20px] font-light text-[#A3841D] font-dm-sans">
                    In the event that we select you for an interview, you will be
                    contacted by email. Please keep an eye on your spam box after
                    submitting your application.
                  </p>

                  <p className="text-[15px] lg:text-[20px] font-light text-[#A3841D] font-dm-sans">
                    If you have any questions, feel free to email{" "}
                    <a
                      href="mailto:academics@ssicsim.ca"
                      className="underline font-bold hover:text-[#8A7018] transition-colors"
                    >
                      academics@ssicsim.ca
                    </a>
                    . Good luck with your application!
                  </p>

                  <div className="flex md:flex-row flex-col gap-3 md:gap-6 w-full mt-6">
                    <a
                      href="https://docs.google.com/document/d/1UQe1CURsqdbyQf2QBfL-i2Y42CeV46gUbqzTpWD79vA/edit?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-dm-sans text-[20px] md:text-[25px] text-center bg-[#A3841D] text-white px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Roles & Responsibilities
                    </a>
                  </div>
                </div>

                <div className="relative group">
                  {/* Decorative border */}
                  <div className="absolute -inset-2 bg-gradient-to-br from-[#A3841D] to-[#8A7018] rounded-xl blur-sm opacity-30 group-hover:opacity-50 transition duration-300"></div>

                  {/* Image */}
                  <div className="relative">
                    <img
                      src={`${CF_DOMAIN}/EnglishCivilWar.jpg`}
                      alt="English Civil War Committee"
                      className="w-full h-full rounded-lg shadow-2xl object-cover transform group-hover:scale-[1.02] transition duration-300"
                      loading="lazy"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Separator Line */}
          <div className="w-full bg-white">
            <div className="max-w-[3000px] mx-auto">
              <hr className="border-t-2 border-[#A3841D] my-8" />
            </div>
          </div>
        </>
      )}

      <div className="relative py-12 bg-white w-full">
        <div className="relative z-10 flex max-w-[3000px] mx-auto">
          <div className="flex flex-col-reverse md:grid md:grid-cols-2 w-full gap-8 px-6">
            <div>
              <div className="px-6">
                <h2 className="text-4xl font-bold font-nunito text-center text-[#A3841D] mb-10">
                  Operations Assistant FAQs
                </h2>

                <div className="space-y-5">
                  {oaQuestions.map((faq, index) => {
                    const isOpen = openOAIndex === index;

                    return (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-xl shadow-sm overflow-hidden bg-white"
                      >
                        <button
                          onClick={() => toggleOAFAQ(index)}
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

            <div className="p-4">
              <p className="text-[30px] font-extralight text-[#A3841D] font-grotesque">
                SSICSIM 2026
              </p>
              <h2 className="mt-2 text-[60px] font-bold text-[#A3841D] font-nunito leading-[1]">
                Operations Assistant
              </h2>
              <p className="text-[15px] md:text-[20px] mt-4 lg:text-[25px] font-light text-[#A3841D] font-dm-sans">
                Operation Assistant is a reccuring role at SSICSIM. OA responsibilities include researching and coordinating with potential sponsors, organising and preparing conference materials, and maintaining a detailed database of contact information. <br></br><br></br>

                You'll be working with the Secretariat in the weeks leading up to the conference to help organize and prepare conference materials.
              </p>
              <div className="flex md:flex-row flex-col gap-3 md:gap-6 w-full mt-6">
                <a
                  href="https://docs.google.com/forms/d/1Rkec6koWqBudRyfk_vMfsG6kaEIJeMiJFC1l7uUvUeA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-dm-sans text-[20px] md:text-[25px] text-center bg-[#A3841D] text-white px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Apply Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-white">
        <div className="max-w-[3000px] mx-auto">
          <hr className="border-t-2 border-[#A3841D] my-8" />
        </div>
      </div>

      <div className="relative py-12 bg-white w-full">
        <div className="relative z-10 flex max-w-[3000px] mx-auto">
          <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-8 px-6">
            <div className="p-4">
              <p className="text-[30px] font-extralight text-[#A3841D] font-grotesque">
                SSICSIM 2026
              </p>
              <h2 className="mt-2 text-[60px] font-bold text-[#A3841D] font-nunito leading-[1]">
                Mechanics Software Developer
              </h2>
              <p className="text-[15px] md:text-[20px] mt-4 lg:text-[25px] font-light text-[#A3841D] font-dm-sans">
                The Mechanics Software Developer role is a <strong>new role</strong> at SSICSIM this year! MSD responsibilities include maintaining the SSICSIM website alongside the Webmaster, developing software to support SSICSIM committees mechanics, and day-of conference support. <br></br><br></br>
                
                You'll also have the opportunity to work with the Webmaster in the maintenance and development of the SSICSIM website alongside automation initiatives for processes, including registration, committee assignments, and communications needs.
                </p>
              <div className="flex md:flex-row flex-col gap-3 md:gap-6 w-full mt-6">
                <a
                  href="https://docs.google.com/forms/d/1Rkec6koWqBudRyfk_vMfsG6kaEIJeMiJFC1l7uUvUeA/viewform?edit_requested=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-dm-sans text-[20px] md:text-[25px] text-center bg-[#A3841D] text-white px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Apply Now
                </a>
              </div>
            </div>

            <div>
              <div className="px-6">
                <h2 className="text-4xl font-bold font-nunito text-center text-[#A3841D] mb-10">
                  Mechanics Software Developer FAQs
                </h2>

                <div className="space-y-5">
                  {msdQuestions.map((faq, index) => {
                    const isOpen = openMSDIndex === index;

                    return (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-xl shadow-sm overflow-hidden bg-white"
                      >
                        <button
                          onClick={() => toggleMSDFAQ(index)}
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
      </div>
     
    </>
  );
};

export default DirectorHiring;

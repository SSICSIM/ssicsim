import { CF_DOMAIN } from "../utils/consts";
import { useState } from "react";

const DirectorHiring = () => {
  const [openDirectorateIndex, setOpenDirectorateIndex] = useState<number | null>(null);
  const [openOAIndex, setOpenOAIndex] = useState<number | null>(null);
  const [openMSDIndex, setOpenMSDIndex] = useState<number | null>(null);


  const toggleDirectorateFAQ = (index: number) => {
    setOpenDirectorateIndex(openDirectorateIndex === index ? null : index);
  };

  const toggleOAFAQ = (index: number) => {
    setOpenOAIndex(openOAIndex === index ? null : index);
  }

  const toggleMSDFAQ = (index: number) => {
    setOpenMSDIndex(openMSDIndex === index ? null : index);
  }

  const directorateQuestions = [
    {
        question: "What is a crisis committee? What commitees can I pitch?",
        answer: (
            <div className="space-y-3">
                <p>
                    Crisis committees are faster-paced simulations compared to normal MUN committees, where delegates respond to live updates and timed updates. Your committee idea should be a topic that <strong>allows for interesting and evolving situations that gradually build overtime</strong>.
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

  const oaQuestions = [
    {
        question: "What are the requirements to apply to be an Operations Assistant for SSICSIM 2026?",
        answer: (
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Open to all students who will be enrolled at a Canadian post-secondary institution in Fall 2026.
            </li>
            <li>
              <strong> Preferred (Not Required): </strong> At least 1 year of experience in Operations at SSICSIM/UTMUN/NAMUN.
            </li>
          </ul>
        ),
    },
  ]

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
          We've noticed that internal processes and committee management before and during the conference that often lack simplicity and automation. This year, we want to use this opportunity to experiment and improve the experience for both delegates and staff. This is a new role this year, and we're excited to see how it develops! <br></br><br></br> One main area where we've identified complexity is in committee mechanics, where tracking certain elements during the conference can be challenging, and that's where we come in!
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
            Open Roles
          </h1>
        </div>
      </div>

      {/* General Information Section */}
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
                Thank you for your interest in joining SSICSIM 2026! Applications for all positions are due{" "}
                <span className="font-bold underline">
                  Wednesday, March 18, 2026 at 11:59 PM.
                </span>{" "}
                Please review the role-specific FAQs & the roles and repsonsbilities document below before applying.
              </p>
                            
              <p className="text-[15px] lg:text-[20px] font-light text-[#A3841D] font-dm-sans">
                In the event that we select you for an interview, you will be contacted by email. Please keep an eye on your spam box after submitting your application.
              </p>
              
              <p className="text-[15px] lg:text-[20px] font-light text-[#A3841D] font-dm-sans">
                If you have any questions, feel free to email{" "}
                <a href="mailto:academics@ssicsim.ca" className="underline font-bold hover:text-[#8A7018] transition-colors">
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

      <div className="relative py-12 bg-white w-full">
        {/* Text Content */}
        <div className="relative z-10 flex max-w-[3000px] mx-auto">
          <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-8 px-6">
            <div className="p-4">
              <p className="text-[30px] font-extralight text-[#A3841D] font-grotesque">
                SSICSIM 2026
              </p>
              <h2 className="mt-2 text-[60px] font-bold text-[#A3841D] font-nunito leading-[1]">
                Director
              </h2>
              <p className="text-[15px] md:text-[20px] mt-4 lg:text-[25px] font-light text-[#A3841D] font-dm-sans">
                We're looking for people who share our vision for clarity, stability, and innovation. As a Director, you will have the opportunity to reflect these values through the creative process of writing, planning, and directing a crisis committee at SSICSIM 2026!  <br></br><br></br>

                You'll be leading one or more committee teams consisting of a small group of staff members through the creation of a crisis committee and overseeing process of planning and creating committee content.
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
              </div>
            </div>
            <div>
              {/* FAQ Section */}
              <div className="px-6">
                <h2 className="text-4xl font-bold font-nunito text-center text-[#A3841D] mb-10">
                  Director FAQs
                </h2>

                <div className="space-y-5">
                  {directorateQuestions.map((faq, index) => {
                    const isOpen = openDirectorateIndex === index;

                    return (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-xl shadow-sm overflow-hidden bg-white"
                      >
                        {/* Question */}
                        <button
                          onClick={() => toggleDirectorateFAQ(index)}
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
      
      {/* Separator Line */}
      <div className="w-full bg-white">
        <div className="max-w-[3000px] mx-auto">
          <hr className="border-t-2 border-[#A3841D] my-8" />
        </div>
      </div>

      <div className="relative py-12 bg-white w-full">
        {/* Text Content */}
        <div className="relative z-10 flex max-w-[3000px] mx-auto">
          <div className="flex flex-col-reverse md:grid md:grid-cols-2 w-full gap-8 px-6">
            {/* FAQ Section - Now on the left for second hiring */}
            <div>
              {/* FAQ Section */}
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
                        {/* Question */}
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
            {/* Text Content - Now on the right for second hiring */}
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
        {/* Divider */}
      </div>

      {/* Separator Line */}
      <div className="w-full bg-white">
        <div className="max-w-[3000px] mx-auto">
          <hr className="border-t-2 border-[#A3841D] my-8" />
        </div>
      </div>

      <div className="relative py-12 bg-white w-full">
        {/* Text Content */}
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
              {/* FAQ Section */}
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
                        {/* Question */}
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

import { CF_DOMAIN } from "../utils/consts";
import { useState } from "react";

const SecHiring = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const questions = [
    {
      question:
        "What is the structure of the SSICSIM Executive Board & Secretariat team?",
      answer: (
        <p>
          SSICSIM is largely governed by two groups: the{" "}
          <strong>Executive Board</strong> and the
          <strong> Secretariat</strong>. Secretary-General, the Deputy
          Secretary-General, and the three Under-Secretary Generals. These
          individuals are responsible for managing the three branches of
          SSICSIM: Academics, Internal, and External. Below the Executive Board
          lies the Secretariat.
          <br />
          <br />
          Each Secretariat member is aligned within one of the three branches,
          and is responsible for managing a specific set of tasks within that
          branch. As a Secretariat member, you will report to one of the Under
          Secretary-Generals while fulfilling your duties. For example, the
          Assistant Secretary-General Hiring is responsible for hiring Directors
          and General Staff over the course of the year for the Academics branch
          under the Under Secretary-General of Academics, Jackie Wang.
        </p>
      ),
    },
    {
      question:
        "What are the requirements to apply to be a Secretariat member for SSICSIM 2026?",
      answer: (
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Must be a registered University of Toronto student for the 2026–2027
            academic year
          </li>
          <li>
            Should have at least one year of Model UN experience (recommended
            but not required)
          </li>
        </ul>
      ),
    },
    {
      question: "What roles are offered at SSICSIM 2026?",
      answer: (
        <div className="space-y-4">
          <div>
            <h4>
              The following positions are available for application. Any new
              roles that have just been added are marked with an asterisk.
            </h4>
          </div>
          <div>
            <h4 className="font-semibold">Equity Branch</h4>
            <ul className="list-disc pl-6">
              <li>Assistant Secretary-General, Equity</li>
              <li>Assistant Secretary-General, Equity Training *</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">Academics Branch</h4>
            <ul className="list-disc pl-6">
              <li>Assistant Secretary-General, Historical Crises</li>
              <li>Assistant Secretary-General, Fictional Crises</li>
              <li>Assistant Secretary-General, Conceptual Crises</li>
              <li>Assistant Secretary-General, Hiring</li>
              <li>Assistant Secretary-General, Training</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">External Branch</h4>
            <ul className="list-disc pl-6">
              <li>Assistant Secretary-General, Marketing *</li>
              <li>Assistant Secretary-General, Corporate Relations</li>
              <li>Co-Assistant Secretary-General, Design & IT (2)</li>
              <li>Chargé(e) D’Affaires</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">Internal Branch</h4>
            <ul className="list-disc pl-6">
              <li>Assistant Secretary-General, Logistics (2) *</li>
            </ul>
          </div>
        </div>
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
            Secretariat Hiring
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
              <h2 className="ml-[-3px] mb-[-10px] mt-[10px] text-[60px] md:text-[72px] md:text-[60px] lg:text-[72px] font-bold text-[#A3841D] font-nunito leading-[1]">
                Secretariat Hiring
              </h2>
              <p className="text-[15px] mt-4 lg:text-[20px] font-light text-[#A3841D] font-dm-sans">
                Thank you for your interest in a SSICSIM 2026 Secretariat
                Position! Applications are due{" "}
                <span className="font-bold underline">
                  Saturday, January 17, 2026 at 11:59 PM.
                </span>{" "}
                Please read the Secretariat FAQs before applying and for more
                information with regards to the roles offered.
              </p>
              <p className="text-[15px] mt-4 lg:text-[20px] font-light text-[#A3841D] font-dm-sans">
                You can find more detailed descriptions of each role by clicking
                on the Roles and Responsbilities button. For roles which involve
                design, you may optionally submit samples of your creative work
                in the application.
              </p>
              <p className="text-[15px] mt-4 lg:text-[20px] font-light text-[#A3841D] font-dm-sans">
                In the event that we select you for an interview, you will be
                contacted by email. Please keep an eye on your spam box after
                submitting your application.
              </p>
              <p className="text-[15px] mt-4 lg:text-[20px] font-light text-[#A3841D] font-dm-sans">
                If you have any questions, feel free to email{" "}
                <a href="mailto:sg@ssicsim.ca" className="underline font-bold">
                  sg@ssicsim.ca
                </a>
                . Good luck with your application!
              </p>
              <div className="flex md:flex-row flex-col gap-3 md:gap-6 w-full mt-6">
                <a
                  href="https://docs.google.com/forms/u/4/d/e/1FAIpQLScqLiFG4FBHW0Gsm8mIMD30YbLAlPZSkd-vkbZ5FjSgEShqAw/formResponse"
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
                  Secretariat FAQs
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

export default SecHiring;

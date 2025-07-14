import RegistrationStep from "../components/RegistrationStep";
import {
  FaUsers,
  FaClipboardList,
  FaMoneyCheckAlt,
  FaBook,
} from "react-icons/fa"; // Import icons from React Icons

const Register = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="w-full h-[80vh] overflow-hidden">
        <img
          src="/assets/photos/UoftAerialPhoto.jpg"
          alt="University of Toronto Aerial View"
          className="absolute top-0 left-0 w-full h-[80vh] object-cover z-10"
        />
      </div>
      <div className="absolute top-0 left-0 w-full h-[80vh] bg-black opacity-40 z-10" />
      <div className="absolute top-0 left-0 w-full h-[80vh] flex flex-col items-start justify-center z-20">
        <p className="text-white text-left text-4xl md:text-7xl font-bold  w-[80vw] lg:w-[800px] font-dm-sans ml-6 leading-tight">
          Registration
        </p>
      </div>
      <div className="relative bg-gray-100 min-w-full min-h-screen pt-7">
        {/* Gold Mesh Gradient Background */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#white] via-[#FFC107] to-[#white] opacity-30"></div>
        {/* Pricing Section */}
        {/* Pricing Section */}
        <div className="container mx-auto py-10 mt-6">
          <h2 className="text-5xl font-bold font-dm-sans text-center mb-8">
            Pricing*
          </h2>
          <p className="text-center text-gray-500 mb-6">
            *All prices are in Canadian Dollars (CAD$)
          </p>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:w-auto w-[80%] mx-auto">
            {/* Early Bird Pricing */}
            <div className="bg-[#A3841D] text-white p-6 rounded-lg shadow-lg flex flex-col justify-center items-center">
              <p className="text-6xl font-bold">$65</p>
              <p className="text-lg font-dm-sans mt-4">
                Early Bird Registration
              </p>
              <p className="text-sm font-light mt-2">July 1st – July 31st</p>
            </div>

            {/* Regular Pricing */}
            <div className="bg-gray-100 text-gray-400 p-6 rounded-lg shadow-lg flex flex-col justify-center items-center">
              <p className="text-6xl font-bold">$90</p>
              <p className="text-lg font-dm-sans mt-4">Regular Registration</p>
              <p className="text-sm font-light mt-2">
                August 1st – September 21st, or until we reach capacity.
              </p>
            </div>

            {/* Late Bird Pricing */}
            <div className="bg-gray-100 text-gray-400 p-6 rounded-lg shadow-lg flex flex-col justify-center items-center">
              <p className="text-6xl font-bold">$100</p>
              <p className="text-lg font-dm-sans mt-4">
                Late Bird Registration
              </p>
              <p className="text-sm font-light mt-2">
                September 22nd – September 30th, or until we reach capacity.
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-t-2 border-gray-300 my-10" />

        {/* Registration Section */}
        <div className="relative z-10 flex justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 grid-rows-4 md:w-[80%] min-h-[100%]">
            {/* First Column (Spanning All Rows) */}
            <div className="row-span-4 p-6 flex flex-col justify-center">
              <h1 className="text-4xl md:text-7xl font-bold font-dm-sans lg:ml-6">
                Registration
              </h1>
              <p className="text-gray-700 text-2xl font-dm-sans font-light w-[80vw] lg:w-[30vw] lg:ml-6 pt-2">
                Whether you are an individual or group delegation, it’s easy to
                register for SSICSIM 2025!
              </p>

              {/* Buttons */}
              <div className="flex gap-4 mt-6 md:ml-6">
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSc_GvoYq_1N5WmPg7UH048-OdMSZTlzSGuHwh8YZIsy2K7rXQ/formResponse"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#A3841D] text-white px-6 py-3 rounded-lg font-dm-sans text-lg hover:bg-[#8a6f1b] transition-colors"
                >
                  Early Bird Registration
                </a>
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSduLLlMb5D1-NwLzUlN2PAxgLH3b-6EeFAigwAu-mRw79CULg/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#A3841D] text-white px-6 py-3 rounded-lg font-dm-sans text-lg hover:bg-[#8a6f1b] transition-colors"
                >
                  Delegation RSVP
                </a>
              </div>
            </div>
            {/* Second Column - Row 1 */}
            <div className="pt-6">
              <RegistrationStep
                title="Delegation Registration"
                description="If attending SSICSIM as a delegation, please make sure your Faculty Advisor/Head Delegate filled out the Delegation RSVP Form for their delegation. Once we confirm your delegation’s RSVP, your delegates may then fill out the Early Bird Registration Form indicating their delegation affiliation and committee preferences."
                icon={
                  <FaUsers className="w-[30px] h-[30px] md:w-[50px] md:h-[50px]" />
                } // Delegation icon
              />
            </div>
            <div className="pt-6">
              <RegistrationStep
                title="Choose Your Committee & Register"
                description="Look through the list of committees, and select three committees you would like to be a part of. Make sure you read all the descriptions! Then, fill out the delegate registration form."
                icon={
                  <FaClipboardList className="w-[30px] h-[30px] md:w-[50px] md:h-[50px]" />
                } // Committee selection icon
              />
            </div>
            <div className="pt-6">
              <RegistrationStep
                title="Confirm Payment"
                description="Each Independent Delegate and individually-paying Group Delegate will be issued an invoice at the time they receive confirmation of their registration. They will be given twenty-one (21) days to pay the invoice total in full by e-transfer or cash."
                icon={
                  <FaMoneyCheckAlt className="w-[30px] h-[30px] md:w-[50px] md:h-[50px]" />
                } // Payment confirmation icon
              />
            </div>
            <div className="pt-6">
              <RegistrationStep
                title="Receive Assignment & Get Ready"
                description="Once you have paid your invoice, you will receive your committee assignment. You will also get access to the SSICSIM 2025 Background Guide, which will help you prepare for the conference."
                icon={
                  <FaBook className="w-[30px] h-[30px] md:w-[50px] md:h-[50px]" />
                } // Assignment and preparation icon
              />
            </div>{" "}
          </div>
        </div>
        <hr className="border-t-2 border-gray-300 my-10" />
        {/* Financial Aid Section */}
        <div className="grid grid-cols-1 gap-6 w-[90%] mx-auto">
          {/* Financial Aid Section */}
          <div className="container mx-auto py-20 text-center w-[90%] bg-gradient-to-br from-[#A3841D] to-[#C2A95F] h-auto rounded-2xl p-6 z-20 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-5xl font-bold font-dm-sans text-white mb-8">
              Financial Aid
            </h2>
            <p className="text-lg text-white font-dm-sans mb-4">
              <span className="font-bold">
                SSICSIM offers financial aid options
              </span>{" "}
              to help cover the costs associated with the conference. You can
              apply for this aid during the registration process, even if your
              school is covering part of your expenses. Our goal is to make our
              experiences as accessible as possible at all times. We never want
              attendees to have finance or payment as a barrier to entry to our
              conference.
            </p>
            <p className="text-lg text-white font-dm-sans mb-4">
              <span className="font-bold">
                When you begin the registration process
              </span>
              , you will find an option to apply for financial aid on the
              registration form. Please provide a brief explanation of your
              financial situation and the reasons why you are seeking
              assistance. This information will help us understand your
              circumstances and provide the necessary support.
            </p>
            <p className="text-lg text-white font-dm-sans mb-4">
              <span className="font-bold">
                Financial aid provided by SSICSIM
              </span>{" "}
              is only applicable towards the delegate registration fee. SSICSIM
              does not subsidize external costs such as transportation or
              accommodations. Please note that full or partial financial aid is
              not guaranteed and will be assessed on a case-by-case basis.
              Consequently, delegation registration emails might take longer to
              send out for those who requested aid due to the processing time.
            </p>
            <p className="text-lg text-white font-dm-sans mb-4">
              If you have questions about financial aid, please contact our
              Equity Team:
            </p>
            <p className="text-lg text-white font-dm-sans mb-4">
              Deputy-Secretary-General of Equity,{" "}
              <span className="font-bold">Leora Kasneci</span> at{" "}
              <a
                href="mailto:dsg@ssicsim.ca"
                className="underline text-blue-300 hover:text-blue-500"
              >
                dsg@ssicsim.ca
              </a>
            </p>
            <p className="text-lg text-white font-dm-sans mb-4">
              Assistant-Secretary-General of Equity,{" "}
              <span className="font-bold">Brian Daniel</span> at{" "}
              <a
                href="mailto:equity@ssicsim.ca"
                className="underline text-blue-300 hover:text-blue-500"
              >
                equity@ssicsim.ca
              </a>
            </p>
          </div>

          {/* Payments Section */}
          <div className="container mx-auto py-20 text-center w-[90%] bg-gradient-to-br from-[#A3841D] to-[#C2A95F] h-auto rounded-2xl p-6 z-20 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-center">
            <h2 className="text-5xl font-bold font-dm-sans text-white mb-8">
              Payments
            </h2>
            <p className="text-2xl text-white font-dm-sans mb-4">
              If you have questions or concerns on{" "}
              <span className="font-bold">how</span> to pay the delegate
              registration fee, please contact our USG Internal.
            </p>
            <p className="text-2xl text-white font-dm-sans mb-8">
              Connor Begg |{" "}
              <a
                href="mailto:internal@ssicsim.ca"
                className="underline text-blue-300 hover:text-blue-500"
              >
                internal@ssicsim.ca
              </a>
            </p>
            <p className="text-2xl text-white font-dm-sans mb-8">
              Alternatively, you may view this helpful document on how to pay
              the delegate registration fee at any of Canada’s largest banks:
            </p>

            {/* Payment Guide Button */}
            <div className="flex justify-center">
              <a
                href="https://drive.google.com/file/d/1hA7hktafKiSc7ObrBf9KwaPY1z_b896z/view"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-[#A3841D] px-6 py-3 rounded-lg font-dm-sans text-lg hover:bg-gray-100 transition-colors shadow-md hover:shadow-lg"
              >
                Payment Guide
              </a>
            </div>
          </div>
        </div>
        <hr className="border-t-2 border-gray-300 mt-10" />
      </div>{" "}
    </>
  );
};

export default Register;

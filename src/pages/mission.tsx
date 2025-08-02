import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Mission = () => {
  return (
    <>
      {/* Hero Banner */}
      <div className="relative w-full min-h-[400px] h-[80vh] max-h-[1200px]">
        <img
          src="/assets/photos/UoftAerialPhoto.jpg"
          alt="University of Toronto Aerial View"
          className="absolute top-0 left-0 w-full h-full object-cover z-10"
          loading="lazy"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-20" />
        <div className="relative z-30 max-w-7xl mx-auto h-full flex items-center px-6">
          <h1 className="text-white text-5xl md:text-7xl font-bold font-nunito leading-tight">
            Our Mission
          </h1>
        </div>
      </div>

      {/* Mission Section */}
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <p className="text-2xl font-light text-[#A3841D] font-grotesque mb-2">
              SSICSIM 2025
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#A3841D] font-nunito leading-snug mb-10">
              Our Mission
            </h2>
            <p className="text-lg md:text-xl text-gray-700 font-dm-sans max-w-3xl mx-auto mb-16">
              SSICSIM is founded on the principle that delegates should be learning about diplomacy and conflict resolution in its purest form: fast-paced and constantly changing.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="bg-[#F7F5EF] p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
              <h3 className="text-2xl font-bold text-[#A3841D] font-nunito mb-4">Think Fast</h3>
              <p className="text-gray-700 text-md font-dm-sans leading-relaxed">
                In the crisis format, delegates are challenged to make decisions on their feet that reflect their roles and their committee’s objectives.
              </p>
            </div>
            <div className="bg-[#F7F5EF] p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
              <h3 className="text-2xl font-bold text-[#A3841D] font-nunito mb-4">Lead Boldly</h3>
              <p className="text-gray-700 text-md font-dm-sans leading-relaxed">
                Delegates are pressured to act decisively — unlocking creative paths and driving the direction of the committee.
              </p>
            </div>
            <div className="bg-[#F7F5EF] p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
              <h3 className="text-2xl font-bold text-[#A3841D] font-nunito mb-4">Shape the Future</h3>
              <p className="text-gray-700 text-md font-dm-sans leading-relaxed">
                Crisis empowers delegates to go beyond scripts, building real diplomatic instincts and adaptive leadership skills.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Land Acknowledgement */}
      <section className="relative py-20 bg-[#F9F8F5]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center px-6">
          {/* Image */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <img
              src="/assets/photos/LandAcknowledgement.JPG"
              alt="Land Acknowledgement"
              className="w-full h-auto rounded-xl shadow-xl object-cover"
            />
          </motion.div>

          {/* Text */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <p className="text-xl font-light text-[#A3841D] font-grotesque mb-2">
              SSICSIM 2025
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#A3841D] font-nunito leading-snug mb-6">
              Land Acknowledgement
            </h2>
            <div className="border-t-4 border-[#A3841D] pt-6 space-y-5 text-gray-700 text-lg md:text-xl font-dm-sans leading-relaxed">
              <p>
                The land we gather on is traditionally cared for by the Wendat, Haudenosaunee, and Anishinaabek nations, who have lived in balance with it for generations. These Indigenous peoples aided early European settlers and contributed vital survival knowledge.
              </p>
              <p>
                The region of Tkaronto (Toronto) is governed by a treaty with the Mississaugas of the Credit and is part of the Dish With One Spoon agreement, promoting shared stewardship between the Anishinaabek and Haudenosaunee.
              </p>
              <p>
                The acknowledgement honours the continuing presence of all First Nations, Métis, and Inuit peoples. It emphasizes the need for reconciliation through respectful and renewed relationships between Indigenous and settler peoples, rooted in the spirit of the Covenant Chain agreement.
              </p>
              <p>
                More than a ritual statement, this land acknowledgement calls for action, critical reflection, and personal responsibility in upholding treaty obligations and engaging meaningfully with the histories and rights of Indigenous peoples.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* University of Toronto Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center px-6">
          {/* Image */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <img
              src="/assets/photos/UofT_Campus_Shot.jpg"
              alt="University of Toronto"
              className="w-full h-auto rounded-xl shadow-xl object-cover"
            />
          </motion.div>

          {/* Text */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="text-2xl font-light text-[#A3841D] font-grotesque mb-2">
              SSICSIM 2025
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#A3841D] font-nunito leading-snug mb-6">
              University of Toronto
            </h2>
            <div className="border-t-4 border-[#A3841D] pt-6 space-y-5 text-gray-700 text-lg md:text-xl font-dm-sans leading-relaxed">
              <p>
                Founded in 1827 as King’s College, the University of Toronto (U of T) is Canada’s top public research university, comprising three campuses and the largest student body in the country. It is known for its high caliber of education and academic, cultural, and co-curricular diversity. The St. George campus, located in downtown Toronto, features seven colleges and major faculties like Arts & Science, Law, Medicine, and Applied Science & Engineering. U of T was ranked Canada’s top university and 16th globally in the 2015 U.S. News & World Report. Notable alumni include Adrienne Clarkson, Margaret Atwood, Lester B. Pearson, and Frederick Banting.
              </p>
              <p>
                Hosting SSICsim here places delegates in a thriving academic hub, and they are encouraged to explore the campus and engage with staff about their U of T experiences.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Mission;

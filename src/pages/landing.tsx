import ScrollScrub from '../components/ScrollTriger';
import CurrentCard from '../components/CurrentCard';

const Landing = () => {
  return (
    <>
    <div> 
      <div className="w-full h-screen overflow-hidden">
        <img src="/assets/photos/UoftAerialPhoto.jpg" alt="University of Toronto Ariel View" className="absolute top-0 left-0 w-full h-screen object-cover z-10" />
      </div>
      <div className="absolute top-0 left-0 w-full h-screen bg-black opacity-40 z-10" />
      <div className="absolute left-0 top-0 w-0 h-0 border-t-[80vh] mt-[20vh] mb-[20px] border-t-transparent border-l-[60vw] border-l-[#D3AF37]/50 z-10" />
      <div className="absolute right-0 top-0 w-0 h-0 border-t-[80vh] mt-[20vh] mb-[20px] border-t-transparent border-b-transparent border-r-[60vw] border-r-[#D3AF37]/50 border-opacity-50 z-10" />

      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-start justify-center ml-6 z-20">
        <p className="text-white text-left text-7xl font-bold w-[800px] font-sans leading-tight">Canada’s Premier Model UN Crisis Simulation</p>
        <p className="text-white text-left text-[35px] font-normal italic w-[800px]">Toronto, ON</p>
      </div>
    </div>
    <div className="bg-white h-screen w-full">
        <div className="flex flex-col items-center justify-center h-full">
            <h3 className="text-4xl font-dm-sans mb-4"> The numbers tell the story </h3>
            <ScrollScrub> <h1 className="text-6xl font-bold mb-2">13 years</h1> </ScrollScrub>
            <ScrollScrub> <h1 className="text-6xl font-bold mb-2">300+ delegates </h1> </ScrollScrub>
            <ScrollScrub> <h1 className="text-6xl font-bold mb-2">One unrivaled experience</h1> </ScrollScrub>
        </div>
    </div>
    <div className="relative bg-[#A3841D] min-h-screen w-full grid grid-rows-auto">
  {/* Text Content */}
  <div className="relative z-10 flex items-center">
    <div className="grid grid-cols-2 gap-4">
      <div className="p-4 ml-[50px]">
        <p className="text-[30px] font-extralight text-white font-grotesque">SSICSM 2025</p>
        <p className="text-[72px] font-bold text-white font-grotesque leading-[1]">
          Where Strategy Meets Urgency
        </p>
      </div>
      <div className="p-4 w-[80%] flex flex-col justify-center">
        <p className="text-[20px] font-light text-white font-dm-sans">
          Most MUNs focus on structured diplomacy—SSICSIM does it differently. Delegates think on their feet, adapt fast, and tackle real-time crises like real-world leaders.
        </p>
        <button className="bg-white text-black px-6 py-2 mt-4 rounded-lg hover:bg-gray-200 w-[200px] transition-colors">
          Learn More
        </button>
      </div>
    </div>
  </div>

  {/* Divider */}
  <div className="w-full h-[2px] bg-white my-4"></div>

  {/* Cards Section */}
  <div className="grid grid-cols-3 gap-4">
    <div className="p-4">
      <CurrentCard
        title="A Staff Team Like No Other"
        image="/assets/photos/Photo1.png"
        description="Our staff team is a diverse group of individuals with a wide range of expertise, from crisis management to diplomacy. We are committed to providing an unparalleled experience for all delegates."
      />
    </div>
    <div className="p-4">
      <CurrentCard
        title="Constant Collaboration"
        image="/assets/photos/Photo2.png"
        description="With the added pressure of crises, delegates must work together to find solutions. Our simulation encourages teamwork and collaboration, allowing delegates to develop their leadership skills."
      />
    </div>
    <div className="p-4">
      <CurrentCard
        title="Real-Time Crisis Action"
        image="/assets/photos/Photo3.png"
        description="In SSICSIM, delegates are faced with real-time crises that require quick thinking and decisive action. This unique approach to Model UN allows delegates to experience the thrill of crisis management firsthand."
      />
    </div>
  </div>
  <div className="bg-white h-screen w-full">
    
  </div>

</div>    </>
  )
}

export default Landing
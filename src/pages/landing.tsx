import ScrollScrub from '../components/ScrollTriger';

const Landing = () => {
  return (
    <>
    <div> 
      <div className="w-full h-screen overflow-hidden">
        <img src="/assets/photos/UoftAerialPhoto.jpg" alt="University of Toronto Ariel View" className="absolute top-0 left-0 w-full h-screen object-cover z-10" />
      </div>
      <div className="absolute top-0 left-0 w-full h-screen bg-black opacity-50 z-10" />
      <div className="absolute left-0 top-0 w-0 h-0 border-t-[80vh] mt-[20vh] mb-[20px] border-t-transparent border-l-[60vw] border-l-[#D3AF37]/50 z-10" />
      <div className="absolute right-0 top-0 w-0 h-0 border-t-[80vh] mt-[20vh] mb-[20px] border-t-transparent border-b-transparent border-r-[60vw] border-r-[#D3AF37]/50 border-opacity-50 z-10" />

      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-start justify-center ml-6 z-20">
        <p className="text-white text-left text-7xl font-bold w-[800px] leading-tight">Canada’s Premier Model UN Crisis Simulation</p>
        <p className="text-white text-left text-[35px] font-normal italic w-[800px]">Toronto, ON</p>
      </div>
    </div>
    <div className="bg-white h-screen w-full">
        <div className="flex flex-col items-center justify-center h-full">
            <h3 className="text-4xl font-bold mb-4"> The numbers tell the story </h3>
            <ScrollScrub> <h1 className="text-6xl font-bold mb-2">13 years</h1> </ScrollScrub>
            <ScrollScrub> <h1 className="text-6xl font-bold mb-2">300+ delegates </h1> </ScrollScrub>
            <ScrollScrub> <h1 className="text-6xl font-bold mb-2">One unrivaled experience</h1> </ScrollScrub>
        </div>
    </div>
    <div className="bg-[#D3AF37] h-screen w-full">
    </div>

    </>
  )
}

export default Landing
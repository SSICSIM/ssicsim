import './App.css'

function App() {

  return (
    <>
      <div className="w-full h-screen overflow-hidden">
        <img src="/assets/photos/UoftAerialPhoto.jpg" alt="University of Toronto Ariel View" className="absolute top-0 left-0 w-full h-full object-cover z-10" />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>
        {/* Uncomment the video section if you want to use a video background instead of an image */}
        {/* <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          disablePictureInPicture
          controls={false}
        >
          <source src="/assets/videos/UniversityOfTorontoAriel.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video> */}
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60 z-0" />

      {/* Left triangle */}
      <div className="absolute left-0 top-0 w-0 h-0 border-t-[80vh] mt-[20vh] border-t-transparent border-l-[60vw] border-l-[#D3AF37]/50 z-10" />

      {/* Right triangle */}
      <div className="absolute right-0 top-0 w-0 h-0 border-t-[80vh] mt-[20vh] border-t-transparent border-b-transparent border-r-[60vw] border-r-[#D3AF37]/50 border-opacity-50 z-10" />

      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-start justify-center ml-6 z-20">
        <p className="text-white text-left text-7xl font-bold w-[800px] leading-tight">Canada’s Premier Model UN Crisis Simulation</p>
        <p className="text-white text-left text-[35px] font-normal italic w-[800px]">Toronto, ON</p>
      </div>
    </>
  )
}

export default App

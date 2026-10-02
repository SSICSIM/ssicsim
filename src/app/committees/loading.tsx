// Shown while the committees page fetches guide links from the admin portal.
export default function Loading() {
  return (
    <>
      <div className="relative block w-full min-h-[400px] h-[80vh] max-h-[1200px] bg-black/80">
        <div className="max-w-[2000px] mx-auto absolute inset-0 w-full flex flex-col items-start justify-center">
          <h1 className="text-white text-left text-4xl font-bold w-[80vw] lg:w-[800px] font-nunito leading-tight ml-6 md:text-7xl">
            Committees
          </h1>
        </div>
      </div>

      <div className="container mx-auto py-10" aria-busy="true">
        <p className="text-center text-lg text-gray-700 mb-6">
          Loading committees and guides...
        </p>
        <div
          className="grid grid-cols-1 w-[100%] mx-auto
            md:grid-cols-2 md:w-[85%] md:mx-auto
            xl:grid-cols-3 xl:w-[100%] gap-4 justify-items-center"
        >
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className="w-[90%] md:w-[100%] h-[400px] rounded-lg bg-gradient-to-b from-gray-300 to-[#e8d9a0] animate-pulse"
            />
          ))}
        </div>
      </div>
    </>
  );
}

import { Link } from "react-router-dom";

const UnderConstruction = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-100">
      {/* Animated Construction Icon */}
      <div className="flex items-center justify-center mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-20 w-20 text-[#A3841D] animate-spin"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8v4m0 4h.01M4.93 4.93l1.41 1.41m12.72 12.72l-1.41-1.41M4 12h4m4 0h4m4 0h4m-4.93-4.93l-1.41 1.41m-12.72 12.72l1.41-1.41"
          />
        </svg>
      </div>
      <h1 className="text-4xl font-bold text-[#A3841D]">Under Construction</h1>
      <p className="text-lg font-dm-sans text-gray-700 mt-4">
        We're working hard to bring this page to life. Stay tuned!
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-[#A3841D] text-white rounded-lg hover:bg-[#C2A95F] transition-colors"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default UnderConstruction;
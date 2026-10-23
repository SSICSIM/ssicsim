import type { Metadata } from "next";
import Image from "next/image";
import BuildingMap from "@/components/venue/BuildingMap";
import { CF_DOMAIN } from "@/utils/consts";

export const metadata: Metadata = {
  title: "Venue Map | SSICSIM 2026",
  description:
    "Explore the OISE building (252 Bloor St W) in 3D and find your committee room.",
};

export default function Page() {
  return (
    <main className="bg-[#F7F5EF] min-h-screen pb-16">
      <header className="relative pt-44 pb-8 px-4 sm:px-8 overflow-hidden">
        <Image
          src={`${CF_DOMAIN}/UoftAerialPhoto.jpg?format=webp`}
          alt="University of Toronto Aerial View"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50" />
        <div className="relative max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-white font-nunito drop-shadow-md">
            OISE Building
          </h1>
          <p className="text-white/80 font-dm-sans mt-1 drop-shadow">
            252 Bloor St W, Toronto
          </p>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-6">
        <BuildingMap />
      </div>
    </main>
  );
}

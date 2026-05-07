"use client";

import { secretariat } from "../utils/data";
import { CF_DOMAIN } from "../utils/consts";
import Image from "next/image";

type Member = (typeof secretariat)[0];

type Branch = {
  name: string;
  displayName: string;
  photos: string[];
  blurb: string;
};

const BRANCHES: Branch[] = [
  {
    name: "Executive Board",
    displayName: "Executive Board",
    photos: [`${CF_DOMAIN}/executiveboard.jpg?format=webp`],
    blurb:
      "The leadership team steering every aspect of SSICSIM 2026 — from vision to execution.",
  },
  {
    name: "External",
    displayName: "External & Internal",
    photos: [
      `${CF_DOMAIN}/external.jpg?format=webp`,
      `${CF_DOMAIN}/internal.jpg?format=webp`,
    ],
    blurb:
      "Connecting SSICSIM to the world: corporate relations, logistics, design, and marketing.",
  },
  {
    name: "Internal",
    displayName: "Academics & Equity",
    photos: [
      `${CF_DOMAIN}/equity.jpg?format=webp`,
      `${CF_DOMAIN}/acad.jpg?format=webp`,
    ],
    blurb:
      "The people building the committees, training delegates, and keeping operations sharp.",
  },
];

const ROTATIONS = [
  "-rotate-2",
  "rotate-1",
  "-rotate-1",
  "rotate-2",
  "rotate-0",
  "-rotate-1",
  "rotate-2",
];

const PIN_COLORS = [
  "bg-[#A3841D]",
  "bg-red-400",
  "bg-sky-400",
  "bg-emerald-400",
  "bg-violet-400",
  "bg-pink-400",
  "bg-orange-400",
];

/* ── Polaroid ──────────────────────────────────────────────── */
const PolaroidCard = ({ member, index }: { member: Member; index: number }) => (
  <div
    className={`
      group ${ROTATIONS[index % ROTATIONS.length]}
      hover:rotate-0 hover:scale-105 transition-all duration-300
      flex flex-col items-center cursor-default flex-shrink-0
    `}
  >
    <div
      className={`${PIN_COLORS[index % PIN_COLORS.length]} w-5 h-5 rounded-full shadow-md flex items-center justify-center -mb-2.5 z-10 relative border border-white/30`}
    >
      <div className="w-2 h-2 rounded-full bg-white/50" />
    </div>
    <div className="bg-white p-2 pb-9 md:p-3 md:pb-12 shadow-md group-hover:shadow-xl">
      <div className="relative overflow-hidden w-28 h-32 md:w-40 md:h-44">
        <Image
          src={member.image}
          alt={member.name}
          fill
          sizes="(max-width: 768px) 112px, 160px"
          className="object-cover object-top"
        />
      </div>
      <div className="mt-2 text-center">
        <p className="font-nunito font-bold text-gray-800 text-[12px] md:text-[14px] leading-tight">
          {member.name}
        </p>
        <p className="font-dm-sans text-[9px] md:text-[10px] text-[#A3841D] mt-0.5 leading-tight">
          {member.position}
        </p>
      </div>
    </div>
  </div>
);

/* ── Main ──────────────────────────────────────────────────── */
export default function Team() {
  const membersByBranch: Record<string, Member[]> = {};
  secretariat.forEach((m) => {
    if (!membersByBranch[m.branch]) membersByBranch[m.branch] = [];
    membersByBranch[m.branch].push(m);
  });

  return (
    <>
      {/* ── Hero ── */}
      <div className="relative block w-full min-h-[300px] h-[60vh] md:h-[80vh] max-h-[1200px]">
        <Image
          src={`${CF_DOMAIN}/UoftAerialPhoto.jpg?format=webp`}
          alt="University of Toronto Aerial View"
          fill
          priority
          sizes="100vw"
          className="absolute top-0 left-0 object-cover z-10"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10" />
        <div className="max-w-[2000px] mx-auto absolute inset-0 flex flex-col items-start justify-center z-20 px-6 md:px-16">
          <p className="font-dm-sans text-[9px] tracking-[0.6em] text-white/50 uppercase mb-3">
            SSICSIM · 2026 · Secretariat
          </p>
          <h1 className="text-white text-3xl md:text-7xl font-bold font-nunito leading-tight uppercase">
            Our Team
          </h1>
          <div className="mt-4 flex items-center gap-3">
            <div className="w-12 h-px bg-[#A3841D]" />
            <p className="font-dm-sans text-[10px] tracking-[0.4em] text-white/40 uppercase">
              Vol. I
            </p>
          </div>
        </div>
      </div>

      {/* ── Intro ── */}
      <div className="text-center py-10 md:py-16 px-6 bg-white border-b-2 border-gray-900">
        <p className="font-dm-sans text-[8px] tracking-[0.6em] text-[#A3841D] uppercase mb-4">
          Meet the Secretariat
        </p>
        <h2 className="text-3xl md:text-5xl font-bold font-nunito text-gray-900 uppercase tracking-tight">
          The Minds Behind SSICSIM
        </h2>
        <div className="flex items-center gap-4 max-w-xs mx-auto my-5">
          <div className="flex-1 h-px bg-gray-200" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#A3841D]" />
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <p className="font-dm-sans text-base md:text-lg font-light text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Our dedicated secretariat team is committed to delivering an
          unparalleled Model UN experience.
        </p>
      </div>

      {/* ── Magazine spreads ── */}
      {BRANCHES.map((branch, i) => {
        const members = membersByBranch[branch.name] ?? [];
        const reversed = i % 2 !== 0;
        const multiPhoto = branch.photos.length > 1;

        return (
          <section
            key={branch.name}
            className={`flex flex-col border-b-2 border-gray-900 bg-[#f4f0e8] ${
              reversed ? "md:flex-row-reverse" : "md:flex-row"
            }`}
          >
            {/* ── Photo side — hidden on mobile ── */}
            <div className="hidden md:block relative md:w-[44%] shrink-0 self-stretch overflow-hidden">
              {multiPhoto ? (
                <div className="flex flex-col h-full">
                  {branch.photos.map((src, pi) => (
                    <div key={pi} className="relative flex-1 overflow-hidden">
                      <Image
                        src={src}
                        alt={`${branch.displayName} ${pi + 1}`}
                        fill
                        sizes="44vw"
                        className="object-cover object-top"
                      />
                      {pi < branch.photos.length - 1 && (
                        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/30 z-10" />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <Image
                  src={branch.photos[0]}
                  alt={branch.displayName}
                  fill
                  sizes="44vw"
                  className="object-cover object-top"
                />
              )}

              {/* Dark gradient at bottom for caption legibility */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              {/* Edge gradient toward content */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: reversed
                    ? "linear-gradient(to left, rgba(244,240,232,0.3) 0%, transparent 25%)"
                    : "linear-gradient(to right, rgba(244,240,232,0.3) 0%, transparent 25%)",
                }}
              />

              {/* Gold corner accent */}
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-[#A3841D] z-10" />
              <div className="absolute -bottom-4 -right-4 w-20 h-20 border-2 border-[#C9A84C]/70 z-10" />

              {/* Photo caption strip */}
              <div className="absolute bottom-8 left-6 right-10 z-20">
                <div className="h-px bg-white/25 mb-2" />
                <p className="font-dm-sans text-[8px] tracking-[0.35em] text-white/50 uppercase">
                  {branch.displayName} — SSICSIM 2026
                </p>
              </div>

              {/* Page number */}
              <div className="absolute top-6 left-6 z-10">
                <span className="font-dm-sans text-[9px] tracking-[0.45em] text-white/40 uppercase">
                  0{i + 1}&ensp;/&ensp;03
                </span>
              </div>
            </div>

            {/* ── Content side ── */}
            <div className="flex-1 relative flex flex-col px-6 md:px-14 py-8 md:py-12 overflow-hidden">
              {/* Oversized watermark number */}
              <div className="absolute -top-4 right-0 font-nunito font-bold leading-none text-gray-900/[0.035] select-none pointer-events-none z-0 text-[160px] md:text-[220px]">
                0{i + 1}
              </div>

              {/* Masthead */}
              <div className="flex items-center gap-3 mb-6 md:mb-8 shrink-0 relative z-10">
                <div className="w-1.5 h-1.5 rounded-full bg-[#A3841D]" />
                <span className="font-dm-sans text-[8px] tracking-[0.5em] text-gray-400 uppercase shrink-0">
                  SSICSIM · 2026
                </span>
                <span className="flex-1 h-px bg-gray-300" />
                <span className="font-dm-sans text-[8px] tracking-[0.3em] text-[#A3841D] shrink-0">
                  Secretariat
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-[#A3841D]" />
              </div>

              {/* Branch title block */}
              <div className="shrink-0 mb-6 md:mb-8 relative z-10">
                {/* Team Profile label */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-5 h-px bg-[#A3841D]" />
                  <span className="font-dm-sans text-[8px] tracking-[0.55em] text-[#A3841D] uppercase">
                    Team Profile
                  </span>
                </div>

                <h2 className="font-nunito text-3xl md:text-5xl font-bold text-gray-900 uppercase tracking-tight leading-none mb-4">
                  {branch.displayName}
                </h2>

                {/* Double rule */}
                <div className="flex flex-col gap-[3px] mb-5 w-full">
                  <div className="h-[3px] bg-gray-900 w-full" />
                  <div className="h-px bg-gray-900 w-2/5" />
                </div>

                {/* Pull-quote blurb */}
                <div className="border-l-[3px] border-[#A3841D] pl-4">
                  <p className="font-dm-sans text-sm italic text-gray-500 leading-relaxed">
                    {branch.blurb}
                  </p>
                </div>
              </div>

              {/* Members section */}
              <div className="relative z-10">
                {/* Members header */}
                <div className="flex items-center gap-3 mb-5 md:mb-6">
                  <span className="font-dm-sans text-[8px] tracking-[0.5em] text-gray-400 uppercase shrink-0">
                    Secretariat Members
                  </span>
                  <span className="flex-1 h-px bg-gray-200" />
                  <span className="font-dm-sans text-[9px] font-bold text-gray-300 tabular-nums">
                    {String(members.length).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex flex-wrap gap-4 md:gap-6 items-start content-start justify-center">
                  {members.map((m, idx) => (
                    <PolaroidCard key={idx} member={m} index={idx} />
                  ))}
                </div>
              </div>

              {/* Editorial footer */}
              <div className="mt-8 md:mt-10 flex items-center gap-4 border-t border-gray-200 pt-4 shrink-0 relative z-10">
                <span className="font-dm-sans text-[7px] tracking-[0.5em] text-gray-300 uppercase">
                  University of Toronto
                </span>
                <span className="flex-1 h-px bg-gray-200" />
                <span className="font-dm-sans text-[7px] tracking-[0.35em] text-[#A3841D]/50 uppercase">
                  Vol. I · No.&thinsp;{i + 1}
                </span>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}

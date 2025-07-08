import React, { useState } from "react";
import CommiteeCard from "../components/CommiteeCard";

const committeesData = [
  {
    title: "The Epic of Sundiata",
    description:
      "A council of nobles, warriors, and merchants must navigate myth, politics, and war to secure Sundiata’s rise to power.",
    expandedDescription: `“Sundjata became an emperor seven centuries ago. His memory rests with the griot or djeli.”\n\nAs the Empire of Ghana disintegrated, warlords were determined to control this resource-rich region of West Africa for as long as possible. In the midst of this chaos, a young boy has been taken by his mother into the wilderness to escape political rivals.\n\nBut when the brutal King Sumanguru invades, a messenger is sent to find Sundiata (Sundjata), who has been prophesied to become one of the greatest leaders Africa has ever seen. Now it is time for Sundiata to decide if he will answer the call. This prophecy of his future sets the stage for the creation of a new empire. From the battlefield to the royal court, if Sundiata is to be enthroned, there is work to be done.\n\nDelegates in this committee will play a variety of roles in Sundiata's council, including nobles, merchants, and warriors. Using diplomacy and warfare, they will need to secure Sundiata's ascension to the throne (securing their own futures along the way). Relying on history, narrative, and myth, the Epic of Sundiata will question what it means to be destined and how an emperor is born.`,
    backgroundGuideLink: "https://example.com/historical-guide",
    director: "John Doe",
    directorImage: "/assets/photos/DirectorImage.jpg",
    category: "Historical",
    backgroundImage: "/assets/photos/commitees/EpicOfSudiata.jpg",
  },
  {
    title: "Fight for the Layton Legacy: 2011 NDP Leadership Race",
    description:
      "The NDP faces internal power struggles after Jack Layton’s death; candidates must battle for leadership amid shifting political tides.",
    expandedDescription: `It’s 2011, and an Orange Wave has flooded the House of Commons. With 102 seats, 30 percent of the popular vote, and the Official Opposition status they have never before held, the New Democratic Party—historically, the perennial “plus” in Canada’s two-party-plus political system—is, for the first time ever, on the apparent cusp of forming government.\n\nBut it’s not quite smooth sailing. Just four months after the election, Jack Layton, the party’s iconic leader, passed away. Now, an NDP on the rise is looking for a new standard-bearer. Interest, intrigue, and a dash of classic leftist infighting all promise to be in abundant supply.\n\nIn this committee, you’ll jump into the hotly-contested NDP Leadership Race of 2012. Throughout the campaign, you’ll work with (and against) your fellow delegates to take control of key party factions, craft a winning message, and take the reins of Canada’s second-largest party—all while the chaos of Canadian politics shapes and reshapes the political landscape beyond recognition.\n\nThe tides are turning in Ottawa—it’s time to sink or swim. Welcome to the fight for the Layton Legacy.`,
    backgroundGuideLink: "https://example.com/fictional-guide",
    director: "Jane Smith",
    directorImage: "/assets/photos/DirectorImage2.jpg",
    category: "Historical",
    backgroundImage: "/assets/photos/commitees/NDP.png",
  },
  {
    title: "Viva La Revolution: Cake, Blood and Banque",
    description: "add description here",
    expandedDescription: `It is 1787, France is on the brink of total collapse. Royal coffers are drained, the cost of bread has skyrocketed and as public unrest seethes outside the walls of Versailles – the Bourgeoisie and Third Estate are beginning to join together. With the threat of famine looming over France, the monarchy’s debt to the people, and the Estates-General convening under pressure — delegates will have the opportunity to reshape the French monarchy, constitution and revolution as we know it today.\n\nIn an economically focused crisis committee, based on the events leading up to the French Revolution of 1789 and following, delegates will be guided in converging new economic policies, developing public policy and controlling the chaos of public uproar. Will their reforms save the Ancien Régime, or will it fall alongside the guillotine? The fate of France’s economy lies in their hands; currency, debt, and class structure. Viva La Fiscal Revolution!`,
    backgroundGuideLink: "https://example.com/historical-guide",
    director: "Alice Johnson",
    directorImage: "/assets/photos/DirectorImage3.jpg",
    category: "Historical",
    backgroundImage: "/assets/photos/commitees/VIvaLaRevolution.webp",
  },
  {
    title: "Bakumatsu: The Fall of the Shogunate",
    description: "Engage with unconventional and abstract topics.",
    expandedDescription: `It is 1787, France is on the brink of total collapse. Royal coffers are drained, the cost of bread has skyrocketed and as public unrest seethes outside the walls of Versailles – the Bourgeoisie and Third Estate are beginning to join together. With the threat of famine looming over France, the monarchy’s debt to the people, and the Estates-General convening under pressure — delegates will have the opportunity to reshape the French monarchy, constitution and revolution as we know it today.\n\nIn an economically focused crisis committee, based on the events leading up to the French Revolution of 1789 and following, delegates will be guided in converging new economic policies, developing public policy and controlling the chaos of public uproar. Will their reforms save the Ancien Régime, or will it fall alongside the guillotine? The fate of France’s economy lies in their hands; currency, debt, and class structure. Viva La Fiscal Revolution!`,
    backgroundGuideLink: "https://example.com/historical-guide",
    director: "Alice Johnson",
    directorImage: "/assets/photos/DirectorImage3.jpg",
    category: "Historical",
    backgroundImage: "/assets/photos/commitees/Bakamatsu.jpg",
  },
  {
    title: "English Civil War",
    description: "Engage with unconventional and abstract topics.",
    expandedDescription: `It is 1787, France is on the brink of total collapse. Royal coffers are drained, the cost of bread has skyrocketed and as public unrest seethes outside the walls of Versailles – the Bourgeoisie and Third Estate are beginning to join together. With the threat of famine looming over France, the monarchy’s debt to the people, and the Estates-General convening under pressure — delegates will have the opportunity to reshape the French monarchy, constitution and revolution as we know it today.\n\nIn an economically focused crisis committee, based on the events leading up to the French Revolution of 1789 and following, delegates will be guided in converging new economic policies, developing public policy and controlling the chaos of public uproar. Will their reforms save the Ancien Régime, or will it fall alongside the guillotine? The fate of France’s economy lies in their hands; currency, debt, and class structure. Viva La Fiscal Revolution!`,
    backgroundGuideLink: "https://example.com/historical-guide",
    director: "Alice Johnson",
    directorImage: "/assets/photos/DirectorImage3.jpg",
    category: "Historical",
    backgroundImage: "/assets/photos/commitees/EnglishCivilWar.jpeg",
  },
  {
    title: "Historical Ad Hoc",
    description: "Engage with unconventional and abstract topics.",
    expandedDescription: `It is 1787, France is on the brink of total collapse. Royal coffers are drained, the cost of bread has skyrocketed and as public unrest seethes outside the walls of Versailles – the Bourgeoisie and Third Estate are beginning to join together. With the threat of famine looming over France, the monarchy’s debt to the people, and the Estates-General convening under pressure — delegates will have the opportunity to reshape the French monarchy, constitution and revolution as we know it today.\n\nIn an economically focused crisis committee, based on the events leading up to the French Revolution of 1789 and following, delegates will be guided in converging new economic policies, developing public policy and controlling the chaos of public uproar. Will their reforms save the Ancien Régime, or will it fall alongside the guillotine? The fate of France’s economy lies in their hands; currency, debt, and class structure. Viva La Fiscal Revolution!`,
    backgroundGuideLink: "https://example.com/historical-guide",
    director: "Alice Johnson",
    directorImage: "/assets/photos/DirectorImage3.jpg",
    category: "Historical",
    backgroundImage: "/assets/photos/commitees/HistoricalAdHoc.jpg",
  },
  {
    title: "March of the Machine: The Phyrexian Invasion",
    description: "Engage with unconventional and abstract topics.",
    expandedDescription: `It is 1787, France is on the brink of total collapse. Royal coffers are drained, the cost of bread has skyrocketed and as public unrest seethes outside the walls of Versailles – the Bourgeoisie and Third Estate are beginning to join together. With the threat of famine looming over France, the monarchy’s debt to the people, and the Estates-General convening under pressure — delegates will have the opportunity to reshape the French monarchy, constitution and revolution as we know it today.\n\nIn an economically focused crisis committee, based on the events leading up to the French Revolution of 1789 and following, delegates will be guided in converging new economic policies, developing public policy and controlling the chaos of public uproar. Will their reforms save the Ancien Régime, or will it fall alongside the guillotine? The fate of France’s economy lies in their hands; currency, debt, and class structure. Viva La Fiscal Revolution!`,
    backgroundGuideLink: "https://example.com/historical-guide",
    director: "Alice Johnson",
    directorImage: "/assets/photos/DirectorImage3.jpg",
    category: "Fictional",
    backgroundImage: "/assets/photos/commitees/ThePhyrexianInvasion.png",
  },
  {
    title: "See You This Summer!",
    description: "Engage with unconventional and abstract topics.",
    expandedDescription: `It is 1787, France is on the brink of total collapse. Royal coffers are drained, the cost of bread has skyrocketed and as public unrest seethes outside the walls of Versailles – the Bourgeoisie and Third Estate are beginning to join together. With the threat of famine looming over France, the monarchy’s debt to the people, and the Estates-General convening under pressure — delegates will have the opportunity to reshape the French monarchy, constitution and revolution as we know it today.\n\nIn an economically focused crisis committee, based on the events leading up to the French Revolution of 1789 and following, delegates will be guided in converging new economic policies, developing public policy and controlling the chaos of public uproar. Will their reforms save the Ancien Régime, or will it fall alongside the guillotine? The fate of France’s economy lies in their hands; currency, debt, and class structure. Viva La Fiscal Revolution!`,
    backgroundGuideLink: "https://example.com/historical-guide",
    director: "Alice Johnson",
    directorImage: "/assets/photos/DirectorImage3.jpg",
    category: "Fictional",
    backgroundImage: "/assets/photos/commitees/GravityFalls.webp",
  },
  {
    title: "Stardew Valley: The Last Harvest",
    description: "Engage with unconventional and abstract topics.",
    expandedDescription: `It is 1787, France is on the brink of total collapse. Royal coffers are drained, the cost of bread has skyrocketed and as public unrest seethes outside the walls of Versailles – the Bourgeoisie and Third Estate are beginning to join together. With the threat of famine looming over France, the monarchy’s debt to the people, and the Estates-General convening under pressure — delegates will have the opportunity to reshape the French monarchy, constitution and revolution as we know it today.\n\nIn an economically focused crisis committee, based on the events leading up to the French Revolution of 1789 and following, delegates will be guided in converging new economic policies, developing public policy and controlling the chaos of public uproar. Will their reforms save the Ancien Régime, or will it fall alongside the guillotine? The fate of France’s economy lies in their hands; currency, debt, and class structure. Viva La Fiscal Revolution!`,
    backgroundGuideLink: "https://example.com/historical-guide",
    director: "Alice Johnson",
    directorImage: "/assets/photos/DirectorImage3.jpg",
    category: "Fictional",
    backgroundImage: "/assets/photos/commitees/StardewValley.webp",
  },
  {
    title: "The 39 Clues: Cahills vs. Vespers",
    description: "Engage with unconventional and abstract topics.",
    expandedDescription: `It is 1787, France is on the brink of total collapse. Royal coffers are drained, the cost of bread has skyrocketed and as public unrest seethes outside the walls of Versailles – the Bourgeoisie and Third Estate are beginning to join together. With the threat of famine looming over France, the monarchy’s debt to the people, and the Estates-General convening under pressure — delegates will have the opportunity to reshape the French monarchy, constitution and revolution as we know it today.\n\nIn an economically focused crisis committee, based on the events leading up to the French Revolution of 1789 and following, delegates will be guided in converging new economic policies, developing public policy and controlling the chaos of public uproar. Will their reforms save the Ancien Régime, or will it fall alongside the guillotine? The fate of France’s economy lies in their hands; currency, debt, and class structure. Viva La Fiscal Revolution!`,
    backgroundGuideLink: "https://example.com/historical-guide",
    director: "Alice Johnson",
    directorImage: "/assets/photos/DirectorImage3.jpg",
    category: "Fictional",
    backgroundImage: "/assets/photos/commitees/39Clues.jpg",
  },
  {
    title: "Valorant: CONV//ERGENCE",
    description: "Engage with unconventional and abstract topics.",
    expandedDescription: `It is 1787, France is on the brink of total collapse. Royal coffers are drained, the cost of bread has skyrocketed and as public unrest seethes outside the walls of Versailles – the Bourgeoisie and Third Estate are beginning to join together. With the threat of famine looming over France, the monarchy’s debt to the people, and the Estates-General convening under pressure — delegates will have the opportunity to reshape the French monarchy, constitution and revolution as we know it today.\n\nIn an economically focused crisis committee, based on the events leading up to the French Revolution of 1789 and following, delegates will be guided in converging new economic policies, developing public policy and controlling the chaos of public uproar. Will their reforms save the Ancien Régime, or will it fall alongside the guillotine? The fate of France’s economy lies in their hands; currency, debt, and class structure. Viva La Fiscal Revolution!`,
    backgroundGuideLink: "https://example.com/historical-guide",
    director: "Alice Johnson",
    directorImage: "/assets/photos/DirectorImage3.jpg",
    category: "Fictional",
    backgroundImage: "/assets/photos/commitees/ValorantConvClear.jpg",
  },
  {
    title: "Fictional Ad Hoc",
    description: "Engage with unconventional and abstract topics.",
    expandedDescription: `It is 1787, France is on the brink of total collapse. Royal coffers are drained, the cost of bread has skyrocketed and as public unrest seethes outside the walls of Versailles – the Bourgeoisie and Third Estate are beginning to join together. With the threat of famine looming over France, the monarchy’s debt to the people, and the Estates-General convening under pressure — delegates will have the opportunity to reshape the French monarchy, constitution and revolution as we know it today.\n\nIn an economically focused crisis committee, based on the events leading up to the French Revolution of 1789 and following, delegates will be guided in converging new economic policies, developing public policy and controlling the chaos of public uproar. Will their reforms save the Ancien Régime, or will it fall alongside the guillotine? The fate of France’s economy lies in their hands; currency, debt, and class structure. Viva La Fiscal Revolution!`,
    backgroundGuideLink: "https://example.com/historical-guide",
    director: "Alice Johnson",
    directorImage: "/assets/photos/DirectorImage3.jpg",
    category: "Fictional",
    backgroundImage: "/assets/photos/commitees/FictionalAdHoc.avif",
  },
  {
    title: "The Fall of Atlantis",
    description: "Engage with unconventional and abstract topics.",
    expandedDescription: `It is 1787, France is on the brink of total collapse. Royal coffers are drained, the cost of bread has skyrocketed and as public unrest seethes outside the walls of Versailles – the Bourgeoisie and Third Estate are beginning to join together. With the threat of famine looming over France, the monarchy’s debt to the people, and the Estates-General convening under pressure — delegates will have the opportunity to reshape the French monarchy, constitution and revolution as we know it today.\n\nIn an economically focused crisis committee, based on the events leading up to the French Revolution of 1789 and following, delegates will be guided in converging new economic policies, developing public policy and controlling the chaos of public uproar. Will their reforms save the Ancien Régime, or will it fall alongside the guillotine? The fate of France’s economy lies in their hands; currency, debt, and class structure. Viva La Fiscal Revolution!`,
    backgroundGuideLink: "https://example.com/historical-guide",
    director: "Alice Johnson",
    directorImage: "/assets/photos/DirectorImage3.jpg",
    category: "Conceptual",
    backgroundImage: "/assets/photos/commitees/AtlantisClear.jpg",
  },
  {
    title: "Met Gala 2026",
    description: "Engage with unconventional and abstract topics.",
    expandedDescription: `It is 1787, France is on the brink of total collapse. Royal coffers are drained, the cost of bread has skyrocketed and as public unrest seethes outside the walls of Versailles – the Bourgeoisie and Third Estate are beginning to join together. With the threat of famine looming over France, the monarchy’s debt to the people, and the Estates-General convening under pressure — delegates will have the opportunity to reshape the French monarchy, constitution and revolution as we know it today.\n\nIn an economically focused crisis committee, based on the events leading up to the French Revolution of 1789 and following, delegates will be guided in converging new economic policies, developing public policy and controlling the chaos of public uproar. Will their reforms save the Ancien Régime, or will it fall alongside the guillotine? The fate of France’s economy lies in their hands; currency, debt, and class structure. Viva La Fiscal Revolution!`,
    backgroundGuideLink: "https://example.com/historical-guide",
    director: "Alice Johnson",
    directorImage: "/assets/photos/DirectorImage3.jpg",
    category: "Conceptual",
    backgroundImage: "/assets/photos/commitees/MetGala.webp",

  },
  {
    title: "Second Renaissance",
    description: "Engage with unconventional and abstract topics.",
    expandedDescription: `It is 1787, France is on the brink of total collapse. Royal coffers are drained, the cost of bread has skyrocketed and as public unrest seethes outside the walls of Versailles – the Bourgeoisie and Third Estate are beginning to join together. With the threat of famine looming over France, the monarchy’s debt to the people, and the Estates-General convening under pressure — delegates will have the opportunity to reshape the French monarchy, constitution and revolution as we know it today.\n\nIn an economically focused crisis committee, based on the events leading up to the French Revolution of 1789 and following, delegates will be guided in converging new economic policies, developing public policy and controlling the chaos of public uproar. Will their reforms save the Ancien Régime, or will it fall alongside the guillotine? The fate of France’s economy lies in their hands; currency, debt, and class structure. Viva La Fiscal Revolution!`,
    backgroundGuideLink: "https://example.com/historical-guide",
    director: "Alice Johnson",
    directorImage: "/assets/photos/DirectorImage3.jpg",
    category: "Conceptual",
    backgroundImage: "/assets/photos/commitees/SecondRenaissance.png",

  },
  {
    title: "Tetris",
    description: "Engage with unconventional and abstract topics.",
    expandedDescription: `It is 1787, France is on the brink of total collapse. Royal coffers are drained, the cost of bread has skyrocketed and as public unrest seethes outside the walls of Versailles – the Bourgeoisie and Third Estate are beginning to join together. With the threat of famine looming over France, the monarchy’s debt to the people, and the Estates-General convening under pressure — delegates will have the opportunity to reshape the French monarchy, constitution and revolution as we know it today.\n\nIn an economically focused crisis committee, based on the events leading up to the French Revolution of 1789 and following, delegates will be guided in converging new economic policies, developing public policy and controlling the chaos of public uproar. Will their reforms save the Ancien Régime, or will it fall alongside the guillotine? The fate of France’s economy lies in their hands; currency, debt, and class structure. Viva La Fiscal Revolution!`,
    backgroundGuideLink: "https://example.com/historical-guide",
    director: "Alice Johnson",
    directorImage: "/assets/photos/DirectorImage3.jpg",
    category: "Conceptual",
    backgroundImage: "/assets/photos/commitees/Tetris.jpg",

  },
  {
    title: "Saving Selene City: A Lunar Colony Crisis",
    description: "Engage with unconventional and abstract topics.",
    expandedDescription: `It is 1787, France is on the brink of total collapse. Royal coffers are drained, the cost of bread has skyrocketed and as public unrest seethes outside the walls of Versailles – the Bourgeoisie and Third Estate are beginning to join together. With the threat of famine looming over France, the monarchy’s debt to the people, and the Estates-General convening under pressure — delegates will have the opportunity to reshape the French monarchy, constitution and revolution as we know it today.\n\nIn an economically focused crisis committee, based on the events leading up to the French Revolution of 1789 and following, delegates will be guided in converging new economic policies, developing public policy and controlling the chaos of public uproar. Will their reforms save the Ancien Régime, or will it fall alongside the guillotine? The fate of France’s economy lies in their hands; currency, debt, and class structure. Viva La Fiscal Revolution!`,
    backgroundGuideLink: "https://example.com/historical-guide",
    director: "Alice Johnson",
    directorImage: "/assets/photos/DirectorImage3.jpg",
    category: "Conceptual",
    backgroundImage: "/assets/photos/commitees/LunarCrisis.jpg",

  },
  {
    title: "Conceptual Ad Hoc",
    description: "Engage with unconventional and abstract topics.",
    expandedDescription: `It is 1787, France is on the brink of total collapse. Royal coffers are drained, the cost of bread has skyrocketed and as public unrest seethes outside the walls of Versailles – the Bourgeoisie and Third Estate are beginning to join together. With the threat of famine looming over France, the monarchy’s debt to the people, and the Estates-General convening under pressure — delegates will have the opportunity to reshape the French monarchy, constitution and revolution as we know it today.\n\nIn an economically focused crisis committee, based on the events leading up to the French Revolution of 1789 and following, delegates will be guided in converging new economic policies, developing public policy and controlling the chaos of public uproar. Will their reforms save the Ancien Régime, or will it fall alongside the guillotine? The fate of France’s economy lies in their hands; currency, debt, and class structure. Viva La Fiscal Revolution!`,
    backgroundGuideLink: "https://example.com/historical-guide",
    director: "Alice Johnson",
    directorImage: "/assets/photos/DirectorImage3.jpg",
    category: "Conceptual",
    backgroundImage: "/assets/photos/commitees/ConceptualAdHoc.png",

  },
];

const Committees = () => {
  const [filter, setFilter] = useState<string>("All");

  // Filter committees based on the selected category
  const filteredCommittees =
    filter === "All"
      ? committeesData
      : committeesData.filter((committee) => committee.category === filter);

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
      <div className="absolute top-0 left-0 w-full h-[80vh] flex flex-col items-start justify-center ml-6 z-20">
        <p className="text-white text-left text-7xl font-bold w-[800px] font-sans leading-tight">
          Committees
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="container mx-auto py-10">
        {/* Blurb */}
        <div className="text-center mb-6">
          <p className="text-lg text-gray-700">
            Click on the buttons below to filter through specific committees by
            category.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            className={`px-4 py-2 rounded ${
              filter === "All"
                ? "bg-[#A3841D] text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setFilter("All")}
          >
            All
          </button>
          <button
            className={`px-4 py-2 rounded ${
              filter === "Historical"
                ? "bg-[#A3841D] text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setFilter("Historical")}
          >
            Historical
          </button>
          <button
            className={`px-4 py-2 rounded ${
              filter === "Fictional"
                ? "bg-[#A3841D] text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setFilter("Fictional")}
          >
            Fictional
          </button>
          <button
            className={`px-4 py-2 rounded ${
              filter === "Conceptual"
                ? "bg-[#A3841D] text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setFilter("Conceptual")}
          >
            Conceptual
          </button>
        </div>

        {/* Committee Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCommittees.map((committee, index) => (
            <CommiteeCard
              key={index}
              title={committee.title}
              description={committee.description}
              expandedDescription={committee.expandedDescription}
              backgroundGuideLink={committee.backgroundGuideLink}
              director={committee.director}
              directorImage={committee.directorImage}
              backgroundImage={committee.backgroundImage}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Committees;

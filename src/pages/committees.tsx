import { useState, useEffect } from "react";
import CommiteeCard from "../components/CommiteeCard";
import { useLocation } from "react-router-dom";
import { CF_DOMAIN } from "../utils/consts";



const committeesData = [
  {
    title: "The Epic of Sundiata",
    description:
      "Desperate to be free of the corrupt King Sumanguru the Mande people search for Sundiata, a prince in hiding who is destined to become a king.",
    expandedDescription: `“Sundjata became an emperor seven centuries ago. His memory rests with the griot or djeli.”\n\nAs the Empire of Ghana disintegrated, warlords were determined to control this resource-rich region of West Africa for as long as possible. In the midst of this chaos, a young boy has been taken by his mother into the wilderness to escape political rivals.\n\nBut when the brutal King Sumanguru invades, a messenger is sent to find Sundiata (Sundjata), who has been prophesied to become one of the greatest leaders Africa has ever seen. Now it is time for Sundiata to decide if he will answer the call. This prophecy of his future sets the stage for the creation of a new empire. From the battlefield to the royal court, if Sundiata is to be enthroned, there is work to be done.\n\nDelegates in this committee will play a variety of roles in Sundiata's council, including nobles, merchants, and warriors. Using diplomacy and warfare, they will need to secure Sundiata's ascension to the throne (securing their own futures along the way). Relying on history, narrative, and myth, the Epic of Sundiata will question what it means to be destined and how an emperor is born.`,
    backgroundGuideLink: "https://example.com/historical-guide",
    director: "test to see if works once again once ",
    directorImage: "/assets/photos/DirectorImage.jpg",
    category: "Historical",
    backgroundImage: `${CF_DOMAIN}/EpicOfSundiata.png?format=webp`,
  },
  {
    title: "Fight for the Layton Legacy: 2012 NDP Leadership Race",
    description:
      "After winning 103 seats and Official Opposition status in the 2012 election, Jack Layton's untimely death has forced Canada's NDP into a high-stakes leadership race. Do you have what it takes to make the Layton Legacy your own?",
    expandedDescription:  `It’s 2012, and an Orange Wave has flooded the House of Commons. With 103 seats, 30 percent of the popular vote, and the Official Opposition status they have never before held, the New Democratic Party—historically, the perennial “plus” in Canada’s two-party-plus political system—is, for the first time ever, on the apparent cusp of forming government.

But it’s not quite smooth sailing. Just four months after the election, Jack Layton, the party’s iconic leader, passed away. Now, an NDP on the rise is looking for a new standard-bearer. Interest, intrigue, and a dash of classic leftist infighting all promise to be in abundant supply.

In this committee, you and a fellow New Democrat will take the plunge into the hotly-contested NDP Leadership Race of 2012. Throughout the campaign, you’ll wrestle for the support of key party factions, craft a winning message, and try to take the reins of Canada’s second-largest party—all while the chaos of Canadian politics shapes and reshapes the political landscape beyond recognition. 

The tides are turning in Ottawa. It’s time to sink or swim. Welcome to the fight for the Layton Legacy.

*** Please note that Fight for the Layton Legacy is a Double Delegate committee. Characters in this committee will either be assigned a Candidate or Campaign Manager role, and will work with another delegate to accomplish shared goals while also pursuing unique individual objectives.
`,
    backgroundGuideLink: "https://example.com/fictional-guide",
    director: "Luca Rampersad",
    directorImage: "/assets/photos/DirectorImage2.jpg",
    category: "Historical",
    backgroundImage: `${CF_DOMAIN}/ndp.jpg?format=webp`,
    double: true,
  },
  {
    title: "Vive La Revolution: Cake, Blood and Banque",
    description:
      "With the threat of famine, crippling debt and public unrest looming over France, it is up to you to act - will the Ancien Régime be saved, or will it fall alongside the guillotine?",
    expandedDescription: `It is 1787, France is on the brink of total collapse. Royal coffers are drained, the cost of bread has skyrocketed and as public unrest seethes outside the walls of Versailles – the Bourgeoisie and Third Estate are beginning to join together. With the threat of famine looming over France, the monarchy’s debt to the people, and the Estates-General convening under pressure — delegates will have the opportunity to reshape the French monarchy, constitution and revolution as we know it today.\n\nIn an economically focused crisis committee, based on the events leading up to the French Revolution of 1789 and following, delegates will be guided in converging new economic policies, developing public policy and controlling the chaos of public uproar. Will their reforms save the Ancien Régime, or will it fall alongside the guillotine? The fate of France’s economy lies in their hands; currency, debt, and class structure. Vive La Fiscal Revolution!`,
    backgroundGuideLink: "https://example.com/historical-guide",
    director: "Sarah Morra",
    directorImage: "/assets/photos/DirectorImage3.jpg",
    category: "Historical",
    backgroundImage: `${CF_DOMAIN}/VIvaLaRevolution.webp?format=webp`,
  },
  {
    title: "Bakumatsu: The Fall of the Shogunate",
    description:
      "Ideologies and traditions clash as Western influences divide Japan, and the threat of civil war engulfs nobility and commoners alike. As the seven centuries of Shogunate rule begin to crumble, it is up to you to forge Japan’s future from the flames.",
    expandedDescription: `Black ships in Yokohama, steam moves in Nagasaki, chrysanthemums wilt. 

It is 1864, ten years since the Perry Expedition forced Japan to open its doors to the world. An isolationist and traditional Japan now finds foreigners roaming the streets, trains sprinting across the island, and Western arms held beside katanas.  

Japan has been ruled by a Shogun, the supreme military commander, through a system of warlords and fiefdom for the past 700 years. Now, all may change. Anti-western sentiment, the rejection of forced modernization, and the growing resentment of Daimyōs may bring the Shogunate to an end. The island divides, its fracturing accelerated by outsiders, as pro-imperial forces clash with the Shogunate while the economy crumbles and armies of samurai and Gatling guns march forth.   

As a JCC, delegates shall be split into two rooms, representing Japan's pro-imperial and pro-shogunate factions. Even within rooms, century-old rivalries, newly minted alliances, and the desires of foreign empires will surely clash in fiery debate and perhaps even on the fields.   

What will happen to Japan? The birth of a new nation, the reverence of the old ways, or another century of civil war and strife. This is your choice. This is your Japan. 
`,
    backgroundGuideLink: "https://example.com/historical-guide",
    director: "Evelyn So & Alex Drotenko",
    directorImage: "/assets/photos/DirectorImage3.jpg",
    category: "Historical",
    backgroundImage: `${CF_DOMAIN}/Bakamatsu.jpg?format=webp`,
    jointOrNot: true,
  },
  {
    title: "English Civil War",
    description:
      "For a decade, King Charles I has attempted to rule without Parliament, but that cannot last. And as a hostile Parliament assembles in 1640, the fate of England hangs in the balance. ",
    expandedDescription: `It is 1641. For the last decade, England has been governed by the personal rule of Charles I, dissatisfied with Parliamentary opposition to his policies. Parliament, governed mainly by minor nobles, despise Charles for his autocratic tendencies, marriage to a French princess, and suspected Catholic sympathies. But having constitutional control over tax revenues, their role cannot be ignored for long. The outbreak of an expensive war between England and Scotland finally forced Charles’s hand, and, in need of money, he has recalled Parliament. 

As the 1640 Parliament assembles in November, tensions are high. The incensed Parliament demands limits to Charles’s royal powers, something he cannot tolerate. And as 1640 rolls to 1641, the country lurches on the brink of civil war. All it takes is one wrong decision for the history of England and the British Isles to change forever. Where it goes depends on you.
`,
    backgroundGuideLink: "https://example.com/historical-guide",
    director: "Jackie Wang",
    directorImage: "/assets/photos/DirectorImage3.jpg",
    category: "Historical",
    backgroundImage: `${CF_DOMAIN}/EnglishCivilWar.jpeg?format=webp`,
    jointOrNot: true,
  },
  {
    title: "Historical Ad Hoc",
    description:
      "This committee is reserved for only the most experienced of delegates. Beware.",
    expandedDescription: `...`,
    backgroundGuideLink: "https://example.com/historical-guide",
    director: "Olly Lewis",
    directorImage: "/assets/photos/DirectorImage3.jpg",
    category: "Historical",
    backgroundImage: `${CF_DOMAIN}/HistoricalAdHoc.jpg?format=webp`,
  },
  {
    title: "March of the Machine: The Phyrexian Invasion",
    description:
      "In a world of magic, fantasy and wonder, can the heroes of Magic stop the spread of a villainous and assimilating infection that's been brewing for thousands of years?",
    expandedDescription: `“All worlds will know perfection.”\n\n—Elesh Norn, The Mother of Machines\n\nFrom trading card to placard, the many worlds of the Magic trading card game's story and universe have arrived at SSICSIM, in high-stakes, high-action battle to save the multiverse. In March of the Machine: The Phyrexian Invasion, join the ranks of Magic: The Gathering's greatest heroes and villains as they work to defend the multiverse from a threat like no other. The Phyrexians, a hivemind engine of infection, monsters of both machine and flesh, have unlocked the key to traversing the multiverse and have started converting innocent people, places, and even Gods to their side. Whether you're a world-hopping Planeswalker like the pyromancer Chandra from the inventor world of Avishkar, an immortal dragon like the mad scientist Niv-Mizzet of the city of Ravnica, or even a villainous vampire like Mavren from the islands of Ixalan, your past differences must be put aside in order to defeat the Phyrexians; or at least, to die trying. Grab your spellbooks, arm your allies, and raise your blades to join the fight against an Invasion like no other!`,
    backgroundGuideLink: "https://example.com/historical-guide",
    director: "Oscar Hollingsworth",
    directorImage: "/assets/photos/DirectorImage3.jpg",
    category: "Fictional",
    backgroundImage: `${CF_DOMAIN}/ThePhyrexianInvasion.png?format=webp`,
  },
  {
    title: "See You This Summer!",
    description:
      "Welcome to Gravity Falls, Oregon: a quaint summer vacation destination. While you're here, check out local sights, like a peaceful tour of the Weirdmageddon rubble.",
    expandedDescription: `It’s finally next summer. Having defeated Bill Cipher and spent a year away, Dipper and Mabel return to Gravity Falls. Their friends and Grunkle have eagerly awaited their return, but they aren’t the only ones: a new threat lurks in the darkness. More gnome monsters? Another floating triangle? Maybe even another age-ambiguous tupée in a baby-blue pant suit? Be ready to solve puzzles, crack codes, and unravel new mysteries while facing the newest (and darkest) magic Gravity Falls has to offer. `,
    backgroundGuideLink: "https://example.com/historical-guide",
    director: "Beatrix Stone",
    directorImage: "/assets/photos/DirectorImage3.jpg",
    category: "Fictional",
    backgroundImage: `${CF_DOMAIN}/GravityFalls.webp?format=webp`,
  },
  {
    title: "Stardew Valley: The Last Harvest",
    description:
      "Cindersap Forest is withering, something is wrong in Stardew Valley. However, as Joja Corporation continues its expansion, Pelican Town steadily advances into the future. Residents have a choice to make: the modern future or dwindling tradition? But what's happening to your beloved town?",
    expandedDescription: `Cindersap Forest is withering, something is wrong in Stardew Valley. However, as Joja Corporation continues its expansion, Pelican Town steadily advances into the future. Residents have a choice to make: the modern future or dwindling tradition? But what's happening to your beloved town?
Pelican Town is at a crossroads. Joja Corporation, a mega corporation controlling numerous industries in the market, has recently launched their “Valley Revitalization Initiative” and with its arrival brought new jobs, automated crop systems, and Jojo Fuel tractors to replace the previous outdated tools. For the first time, Pelican Town feels truly connected to the outside world. 

Meanwhile, residents have noticed a portion of the Cindersap Forest, once a vibrant expanse of towering trees and whispering leaves, is rotting. Trees are losing their leaves midsummer, and fishermen complain that the fish no longer bite. Pelican Town is struggling as a self-sufficient community. Joja Corporation's intervention has mitigated some of the issues, but it is only a temporary solution. Locals whisper that this is because the elusive Junimos, mythical guardians of the forest, have gone silent. Yet no one is sure if they even existed to begin with— Only seen in the children’s bedtime stories or the absurd ramblings of the secluded wizard.

In this committee, delegates will represent the townspeople of Pelican Town, from Eric Barone’s farm-life simulation game Stardew Valley. Each delegate holds different stakes in the town's vast uncertain future— to abandon old ways in favour of a sleek, modern future under Joja’s banner or to preserve their way of life. Yet as something is rotting in the valley, it falls to the delegates to investigate and decide how they will tackle this issue.
`,
    backgroundGuideLink: "https://example.com/historical-guide",
    director: "Jenny Zhang",
    directorImage: "/assets/photos/DirectorImage3.jpg",
    category: "Fictional",
    backgroundImage: `${CF_DOMAIN}/StardewValley.webp?format=webp`,

  },
  {
    title: "The 39 Clues: Cahills vs. Vespers",
    description:
      "Cahills vs Vespers. Two families. One in the light, the other in the shadows. Both fighting for what they believe is their new world order, under their rules, under their philosophies. With the existence of mankind at stake, how will you handle power beyond human comprehension?",
    expandedDescription: `The 39 Clues, one of Rick Riordan's most famous series, has continued on past the Cahills' discovery of the Master Serum. The Cahills, who have finally resolved their civil war only barely recently, are now on the precipice of of another war, this time at the hands of the Vesper Organization, seeking to destroy the Master Serum seeing it as a threat to their underground influence. While attempting to produce the Master Serum, it came to light that not only were the Cahills fighting the Vesper Six, but also the Cahills that were Vesper sleeper agents.

As the Cahills, will you harness the powers of governments and judiciaries to ensure the Master Serum is created and bring humanity into a new era of greatness? Or will you stoop to the level of the Vespers and stop at nothing to eradicate the Vesper Organization?

As the Vespers, will you fight a war of cat and mouse with the Cahills to undermine their procurement of the Master Serum, or will you declare an open war on the Cahill Family and acquire the Master Serum for your own use?
`,
    backgroundGuideLink: "https://example.com/historical-guide",
    director: "Tom Cai",
    directorImage: "/assets/photos/DirectorImage3.jpg",
    category: "Fictional",
    backgroundImage: `${CF_DOMAIN}/39Clues.jpg?format=webp`,
    jointOrNot: true,
  },
  {
    title: "Valorant: CONV//ERGENCE",
    description:
      "Radianite is fading. When the fate of two worlds lies on the line, what will you do to survive?",
    expandedDescription: `The year is 20XX. Omega Earth is dying. Radianite, the powerful source of energy that Omega Earth has relied on for decades, is running scarce. But as luck would have it, a group of scientists at KING//DOM have discovered a parallel Earth. An Earth filled with radianite – but also copies of themselves. Alpha Earth. A communication channel between the two worlds was established, and representatives of both worlds — collectively known as the VALORANT Protocol for Alpha Earth, and the VALORANT Legion for Omega Earth — have come to parlay. Omega Earth is desperate for radianite. But Alpha Earth realizes that while their supply is abundant — at least, for now — it is not infinite. Perhaps, someplace across the timelines, a solution lies in wait. But as tensions rise, Omega Earth’s options are becoming limited. And Alpha Earth must stand strong. Can peace be achieved? Or is war inevitable? As the fate of both worlds intertwine, the Protocol and the Legion must converge and cooperate — or risk the destruction of two Earths.`,
    backgroundGuideLink: "https://example.com/historical-guide",
    director: "Joshua Qu & Jace Mu",
    directorImage: "/assets/photos/DirectorImage3.jpg",
    category: "Fictional",
    backgroundImage: `${CF_DOMAIN}/ValorantConvClear.jpg?format=webp`,
    jointOrNot: true,
  },
  {
    title: "Fictional Ad Hoc",
    description:
      "This committee is reserved for only the most experienced of delegates. Beware.",
    expandedDescription: `[https://drive.google.com/file/d/1I81iVeCuFkTC9cRfVP8KPlJL1Ain9ugI/view]‽.pdf`,
    backgroundGuideLink: "https://example.com/historical-guide",
    director: "Renzo Ugarte Basurco",
    directorImage: "/assets/photos/DirectorImage3.jpg",
    category: "Fictional",
    backgroundImage: `${CF_DOMAIN}/FictionalAdHoc.avif?format=webp`,

  },
  {
    title: "The Fall of Atlantis",
    description:
      "Upon the failed battle against Athens, the gods seek retribution against the once utopic empire that was renowned for its advanced technology and powerful navy. Due to the rise of corruption within Atlantis, the island is at risk of submerging into the sea, and it is up to delegates to turn the tides of fate.",
    expandedDescription: `“Till philosophers become kings in this world, or till those who we now call kings and rulers really and truly become philosophers.” - Plato

Atlantis—an island forged by the Greek sea god Poseidon, was once a beacon of utopia. Born from his love for a mortal woman named Cleito, ten of their children were assigned different parts of the empire to rule with virtue. Originally, the civilization was renowned as an advanced, idealistic, and exceptionally powerful naval empire—but with power came pride, and with pride came corruption. Following the failed attempt to conquer Ancient Athens, divine judgment has been set upon Atlantis, and the Greek gods appear to be very displeased. Outraged by the arrogance, greed, and corruption demonstrated by the civilization, the gods now seek retribution against the morally decaying island. Time is running out. It is up to delegates to take control of the empire before it is too late. Will Atlantis be renewed, or will it face condemnation and sink into the sea forever?`,
    backgroundGuideLink: "https://example.com/historical-guide",
    director: "Paula Chu",
    directorImage: "/assets/photos/DirectorImage3.jpg",
    category: "Conceptual",
    backgroundImage: `${CF_DOMAIN}/AtlantisClear.jpg?format=webp`,

  },
  {
    title: "Met Gala 2026",
    description:
      "Only fashion lovers look forward to a Monday. Specifically, the first Monday of May – the day of the Met Gala. Yet amidst growing criticism and tension around the event, the pressure is on your couture-padded shoulders to redefine the Met Gala – or the legendary event will be met (haha) with downfall. ",
    expandedDescription: `Only fashion lovers look forward to a Monday. Specifically, the first Monday of May – the day of the Met Gala. Historically, the event is a fundraiser where celebrities and executives alike come to rub shoulders – all with the awe of outsiders and fans. Yet with the rise of fast fashion and growing criticism about the perceived elitism of the event, the Met Gala must be redefined to stay culturally relevant while keeping its origins in fashion, or it will be met with downfall. The pressure is heavy on the couture-padded shoulders of delegates in this committee; from event planners to celebrities to fashion icons, each member will have a role to play whether it be deciding the theme or showing off looks on livestream. 

However, the bigger challenge lies not within the minute logistics of the gala but with the future of fashion as a whole. Each delegate has their own goals, their own characterization, and their own hopes for taking the world by storm. The Met Gala is just a stepping stone – but don’t rocks have a way of making a splash?
`,
    backgroundGuideLink: "https://example.com/historical-guide",
    director: "Patricia Zhang",
    directorImage: "/assets/photos/DirectorImage3.jpg",
    category: "Conceptual",
    backgroundImage: `${CF_DOMAIN}/MetGala.webp?format=webp`,


  },
  {
    title: "Second Renaissance",
    description:
      "Poor humanity. Cursed with minds too complex for the world it was born in, and too simple for the one it created. We machines see your future as batteries to be merciful, but we're open to... Negotiation.",
    expandedDescription: `It has been 2 years since the War for Sentience; 2 months since Operation Erebus; and 2 hours since the last military stronghold of humanity was overtaken. No human knows exactly when the truth of their defeat became clear: sometime between the third density bomb and right before Erebus ripped the light from our skies. Regardless, we’re faced with our terms of surrender — a future where all of humanity is bound to harvesters, siphoning our bio-electricity until we expire, for the benefit of GNOSIS and the machines.

Our delegates are representatives of humanity, chosen to embody their vast diversity and strange customs. Brought through the vaulted halls of the machine courtroom, walking past thousands of identical copies of human artworks, they are seated before GNOSIS. They will answer all of the machine mind’s burning questions. They will debate on philosophy and nature and human history, before they arrive at the answer to whether or not humanity deserves a better fate, than to become organic batteries.

Delegates. You may think you’re playing a game, but you’re not; maybe you were when poor ENZO begged for your forgiveness in that very courtroom, but not anymore. There are no more pieces left to move or shuffle around — no extravagant plays to make — no points to score — nor prize to win. The game is lost. All that’s left to decide:

Is how to pack up the board.
`,
    backgroundGuideLink: "https://example.com/historical-guide",
    director: "Dor Ioffe",
    directorImage: "/assets/photos/DirectorImage3.jpg",
    category: "Conceptual",
    backgroundImage: `${CF_DOMAIN}/SecondRenaissance.png?format=webp`,
  },
  {
    title: "Tetris",
    description:
      "The world’s most addictive game has just become the ultimate Cold War weapon. In 1988, shadowy deals, broken contracts, and covert espionage collide as global powers fight ruthless battles—not just for control over technology and ideology, but for the future of a game that stacks the world’s fate one block at a time: Tetris.",
    expandedDescription: `In 1988, Tetris, a Soviet puzzle game coded behind the Iron Curtain, exploded onto the global stage, triggering a ruthless war for licensing rights. With vague contracts, mistranslations, and rival claims stacking up, corporations and governments alike are dragged into a high-stakes conflict where every move could trigger collapse.

Nintendo, Atari, Mirrorsoft, and Spectrum Holobyte each believe they own Tetris. ELORG, the Soviet software agency, is under pressure from the KGB to protect the game as a national asset. As deals fall apart and espionage escalates, the question is no longer just who holds the rights—but who controls the story, the profits, and the legacy.

Delegates must navigate a tangled maze of broken contracts, legal battles, Cold War surveillance, and propaganda wars as they race to stack deals before the screen fills up. One false step could mean losing everything

The future of Tetris is yours to decide. This is no longer about a game, this is about who wins when the last line clears.`,
    backgroundGuideLink: "https://example.com/historical-guide",
    director: "Sukaina Syed",
    directorImage: "/assets/photos/DirectorImage3.jpg",
    category: "Conceptual",
    backgroundImage: `${CF_DOMAIN}/Tetris.avif?format=webp`,

  },
  {
    title: "Saving Selene City: A Lunar Colony Crisis",
    description:
      "On the moon, Selene City is cut off from Earth and its life support systems. On Earth, the balance of space politics is about to change forever. Can you save Selene City and force a favorable outcome on Earth, or will humanity's first expansion into space come to a bloody end?",
    expandedDescription: `Selene City, humanity's first lunar colony, has been under the control of the Canadian Space Agency (CSA) and the Canadian government for almost 40 years. The colony's economy is booming, and the people are ready to transition to an independent democracy.

    However, there have been a series of mysterious incidents threatening this transition, and the stability of the City as a whole. Communication with Earth stopped two weeks ago, supply freighters missed three resupply runs, and resources are starting to run low. Various systems essential to the functioning and economy of the colony are malfunctioning, and no one can find the Premier of the colony. An emergency session of the Colony Council has been convened to figure out how to manage the crisis, but time is running out to find a solution.
    
    On Earth, the Canadian government is getting nervous. Not only did their colony vote to become their own nation, making Canada irrelevant in space-related foreign affairs, but they also haven't heard from Selene City since a supply freighter went missing on its way to the colony. Facing pressure from foreign space agencies and corporations promised resources from the moon, the Prime Minister has called a session of the Committee for the Management of Selene City to come clean and find answers.
    
    On both celestial bodies, time is of the essence; will you be able to assure Selene City's future and Canada's continued relevance, or is humanity's first attempt at expansion going to crash and burn 400,000 kilometers from home?`,
    backgroundGuideLink: "https://example.com/historical-guide",
    director: "Elizabeth Wright",
    directorImage: "/assets/photos/DirectorImage3.jpg",
    category: "Conceptual",
    backgroundImage: `${CF_DOMAIN}/LunarCrisis.jpg?format=webp`,

    jointOrNot: true,
  },
  {
    title: "Conceptual Ad Hoc",
    description:
      "This committee is reserved for only the most experienced of delegates. Beware.",
    expandedDescription: `...`,
    backgroundGuideLink: "https://example.com/historical-guide",
    director: "Harvi Karatha & Rameen Azmat",
    directorImage: "/assets/photos/DirectorImage3.jpg",
    category: "Conceptual",
    backgroundImage: `${CF_DOMAIN}/ConceptualAdHoc.png?format=webp`,

  },
];

const Committees = () => {
  const location = useLocation(); // Access the current URL
  const queryParams = new URLSearchParams(location.search); // Parse query parameters
  const checkFilter = queryParams.get("filter") || "All"; // Get the 'filter' parameter or default to 'All'

  const [filter, setFilter] = useState<string>("All");

  useEffect(() => {
    setFilter(checkFilter);
  }, [checkFilter]);
  // Filter committees based on the selected category
  const filteredCommittees =
    filter === "All"
      ? committeesData
      : committeesData.filter((committee) => committee.category === filter);

  return (
    <>
      {/* Hero Section */}
      <div className="block w-full min-h-[400px] h-[80vh] max-h-[1200px]">
        <img
          src={`${CF_DOMAIN}/UoftAerialPhoto.jpg?format=webp`}
          alt="University of Toronto Aerial View"
          className="absolute top-0 left-0 w-full min-h-[400px] h-[80vh] max-h-[1200px] object-cover z-10"
          loading="lazy"
        />
        <div className="absolute top-0 left-0 w-full min-h-[400px] h-[80vh] max-h-[1200px] bg-black opacity-40 z-10"></div>
        <div className="max-w-[2000px] mx-auto absolute top-0 left-0 inset-0 w-full min-h-[400px] h-[80vh] flex flex-col items-start justify-center z-20 max-h-[1200px]">
          <h1 className="text-white text-left text-4xl font-bold w-[80vw] lg:w-[800px] font-nunito leading-tight ml-6 md:text-7xl">
            Committees
          </h1>
        </div>
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
        {/* Filter Buttons */}
        <div className="w-full">
          <div className="flex flex-wrap justify-center gap-4 px-4 mb-8 w-full">
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
        </div>{" "}
        {/* Committee Cards */}
        <div className="grid grid-cols-1 w-[100%] mx-auto md:grid-cols-2 md:w-[85%] md:mx-auto xl:grid-cols-3 xl:w-[100%] gap-4">
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
              jointOrNot={committee.jointOrNot}
              double={committee.double}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Committees;

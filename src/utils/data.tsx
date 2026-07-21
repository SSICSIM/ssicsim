import { CF_DOMAIN } from "../utils/consts";

interface Event {
  title: string;
  description: string;
  dates: string[];
  times: string[];
  locations: string[];
  spots?: string;
  image: string;
  link: string;
}

export const events: Event[] = [
  {
    title: "Delegate Training",
    description:
      "Never competed at Model UN conference before? Need a refresher on the flow of debate in crisis committees? Sign up for a Delegate Training session, hosted by our Co-ASGs of Hiring & Training, to learn all you need to know before participating in your first crisis committee!\n\n[Delegates must check in to the conference at OISE first before attending Delegate Training.]\n\n[Note:] Delegates are only permitted to attend {one} of the two sessions.",
    dates: ["Friday, October 24", "Friday, October 24"],
    times: ["1:00 – 2:00 PM", "3:00 – 4:00 PM"],
    locations: ["MS 2170", "MS 2170"],
    spots: "In Person: 280 (140 per session), Online: Unlimited",
    image: `${CF_DOMAIN}/DelegateTraining.JPG?format=webp`,
    link: "https://docs.google.com/forms/d/e/1FAIpQLSdL4hvJuvKMe3Go06UGxOhCunXApg6srVDFpwFmBAIMIpLxJg/viewform?usp=header",
  },
  {
    title: "Legislative Assembly Tour",
    description:
      "Join us for a free tour of the Legislative Assembly of Ontario at Queen’s Park! Discover the building's history and architecture, and learn about the traditions and function of Parliament. \n\n[Delegates must check in to the conference and meet at OISE first before attending the Legislative Assembly Tour. We will be leaving at 9:30 AM sharp!]",
    dates: ["Friday, October 24"],
    times: ["9:30 – 11:00 AM"],
    locations: ["OISE 8200"],
    spots: "35",
    image: `${CF_DOMAIN}/LegislativeAssemblyTours.jpg?format=webp`,
    link: "https://docs.google.com/forms/d/e/1FAIpQLSfp3zMulrxqlxRGFErmU6uVP6wOVNzano6un0_I6DbD9Pw29Q/viewform",
  },
  {
    title: "Charity Photoshoot",
    description:
      "For just a small donation to charity, get your own professional headshot or a group photo with your friends at University College, a historic Romanesque Revival-style building at the University of Toronto. Sign up for a slot today before spots fill up!\n\n[Note:] Costs for individual photos are different from group photos; please see the first page of the sign-up form for more information.\n\n[Delegates must check in to the conference at OISE first before attending the Charity Photoshoot.]",
    dates: ["Friday, October 24", "Saturday, October 25", "Sunday, October 26"],
    times: ["2:00 – 3:00 PM", "12:00 – 1:30 PM", "12:00 – 1:30 PM"],
    locations: ["UC 255", "UC 255", "UC 255"],
    spots: "240 (10 per 10-minute slot)",
    image: `${CF_DOMAIN}/CharityPhotoshoot.JPG?format=webp`,
    link: "https://docs.google.com/forms/d/e/1FAIpQLSendroJs6xX0WKW25DGxuwczpSofUyOwszep-_Ri2V1GuGVkQ/viewform",
  },
  {
    title: "Midnight Crisis",
    description:
      "Looking for another crisis committee to participate in? Can’t get enough of the crisis committees at SSICSIM? Sign up for (Midnight Crisis), a short but sweet committee directed by the Secretariat in the late hours of the first conference day! This year’s Midnight Crisis is ad hoc, so the committee topic will be revealed at the beginning of the session. ",
    dates: ["Friday, October 24"],
    times: ["8:00 – 11:00 PM"],
    locations: ["OI 2295"],
    spots: "20",
    image: `${CF_DOMAIN}/MidnightCrisis.jpg?format=webp`,
    link: "https://docs.google.com/forms/d/e/1FAIpQLSdVUzu9bIN6aSXWs6ANbv3SqgZjhxtmj3hkdsOqLSahnfP2nQ/viewform",
  },
  {
    title: "Delegate Social",
    description:
      "Looking to unwind after a long day of formal debate? Hoping to connect with other Delegates, Staff, and Secretariat members at SSICSIM? Sign up for Delegate Social, a lively event we’ll be hosting in the heart of the University of Toronto! [Free refreshments and dinner will be provided.]",
    dates: ["Saturday, October 25"],
    times: ["7:30 – 11:00 PM"],
    locations: ["St. Michael’s College (Father Madden Hall)"],
    spots: "120",
    image: `${CF_DOMAIN}/DelegateSocial.JPG?format=webp`,
    link: "https://forms.gle/LKUUnKbYrepvxMiF7",
  },
];

export const committeesData = [
  {
    title: "Fall of the Qing: Five Coloured Banners Over Jing",
    description:
      "“A divided China would certainly lose its place in the world” - Sun Yat-Sen.\n\n1936, the Qing Empire lingers on. Almost ten years ago, the revolutionary dreams of the Northern Expedition were shattered by the German Empire, who rose to the top of the world following their victory in the Great War.",
    expandedDescription:
      "“A divided China would certainly lose its place in the world” - Sun Yat-Sen.\n\n1936, the Qing Empire lingers on. Almost ten years ago, the revolutionary dreams of the Northern Expedition were shattered by the German Empire, who rose to the top of the world following their victory in the Great War.\n\nBy February, however, a reversal of fortune emerged: The German stock markets crashed! Qing hegemony evaporated overnight and China slipped into the control of a plethora of local factions. Violence and economic catastrophe were boiling over. With the last of their power, the central government invites the local leaders to one final conference.\n\nThese visionaries come with a shared goal of reversing the economic recession but also their own personal ideologies and ambitions on the future of China. As delegates, you will represent these political leaders, generals and diplomats. How will you act to save an economy in freefall, react to growing foreign influence and foster your ideology in shaping the future of China? Will you collaborate and win the hearts of the people or will you seek your own mandate in this Kaiserreich-inspired alt-history scenario?",
    backgroundGuides: [],
    contactEmail: "",
    director: "Chance Hattrick & Glenn Yu",
    directorImage: "",
    category: "Historical",
    backgroundImage: "/assets/photos/commitees/FallOfTheQing.jpg",
    jointOrNot: false,
    double: false,
  },
  {
    title: "Land of the Pharaohs: Egyptian Reunification",
    description:
      "After losing central authority in Memphis, Egypt fell into political turmoil when the nomarchs took power and divided the kingdom into two.",
    expandedDescription:
      "After losing central authority in Memphis, Egypt fell into political turmoil when the nomarchs took power and divided the kingdom into two. Reaching the First Intermediate Period (2181-2055 BC), Egypt faced numerous internal conflicts, power struggles, and provincial leaders taking advantage of their wealth for roles once reserved for kings. As such, this period is defined as a dark age, and seeks to reach a golden age through reunification.\n\nBut no kingdom, especially no golden age, could ever be upheld without careful and strategic leadership. It is then in the hands of the delegates to demonstrate their abilities to lead a kingdom and protect it from all harm. Whether it be solving economic issues, fighting external attacks, dealing with political turmoil, curses, pyramid invasions, or the demise by the gods, it is all in the hands of delegates to ensure Egypt does not once again fall into the darkness.\n\nIt is only with a strong Pharaoh who unites the land, alongside his loyal subjects who support him that Egypt can be guaranteed as a whole. May the Pharaoh’s land remain in the light, or you, dear loyal subjects, shall not exist \\(tomb of Khnumhotep, Dyn. 12.\\) 𓂀",
    backgroundGuides: [],
    contactEmail: "",
    director: "Wajid Zaman & Paula Chu",
    directorImage: "",
    category: "Historical",
    backgroundImage: "/assets/photos/commitees/LandOfThePharohs.jpg",
    jointOrNot: false,
    double: false,
  },
  {
    title: "Forged in Flames: The Franco-Prussian War",
    description:
      "The year is 1870. A feud between the world’s predominant powers — the reigning hegemon, France, and the ambitious upstart, Prussia — has begun to brew.",
    expandedDescription:
      "(A war of game-changing technologies and tested wartime tactics. Cunning versus clinicality, infantry versus artillery, lightning speed versus rock-solid defence.) <A war of French pride and German hunger for glory. Forged in Flames.>\n\nThe year is 1870. A feud between the world’s predominant powers — the reigning hegemon, France, and the ambitious upstart, Prussia — has begun to brew. Threatened by Chancellor Otto von Bismarck’s brazen flanking of Emperor Napoleon III through a crisis for Spain’s throne, and taunted by a communication secretly edited to incite public outrage, by summer 1870, France finds itself heavily under pressure.\n\nAlthough strong and experienced, France is fragmented — internal divisions have caused rifts both in the courtroom and on the battlefield in recent times. And even though Prussia’s armies have access to superior technologies in transportation and battle — a key advantage on their side — they lack the sheer experience needed to topple a continental giant with such sheer strength.\n\nWill the legacy of the French Empire win out over modern technologies? Or will the newly united forces led by Prussia usher in a new era for Europe, and perhaps, for Germany?",
    backgroundGuides: [],
    contactEmail: "",
    director: "Aryan Rajagopal & Joshua Qu",
    directorImage: "",
    category: "Historical",
    backgroundImage: "/assets/photos/commitees/FrancoPrussianWar.jpg",
    jointOrNot: true,
    double: false,
  },
  {
    title: "Relinquo vos Liberos: The Rovereta Affair, 1957",
    description:
      "The Most Serene Republic teeters on the brink of civil war.\n\nIn this Joint Crisis Committee, delegates will join an alliance and battle for the fate of Saint Marinus’ chosen republic.",
    expandedDescription:
      "In the winter of 366 A.D., Saint Marinus lay dying on Monte Titano. With his last words, he ordained the destiny of the republic that bears his name, besieged by Emperor and Pope: (Relinquo vos liberos ab utroque homine — I leave you free from both men.)\n\nOver a millenium later, the founding legend of San Marino  — a fiercely independent microstate of 15,000 people — appears more prophecy than myth, as two heavyweights clash over its future.\n\nWhen six members of the ruling Communist/Socialist Committee of Freedom defect to the opposition Popular Alliance of Christian Democrats and Independent Socialists, the balance of power shifts and a constitutional crisis ensues. Parliament is dissolved. The Committee of Freedom hunker down in the capital. The Popular Alliance establish a provisional government in a half-built iron foundry in Rovereta.\n\nThe Most Serene Republic teeters on the brink of civil war.\n\nIn this Joint Crisis Committee, delegates will join an alliance and battle for the fate of Saint Marinus’ chosen republic. But, on a microscopic battlefield with waning supplies, it will be influence and soft power — not just military might — that decides who secures San Marino’s destiny for themselves.",
    backgroundGuides: [],
    contactEmail: "",
    director: "Ngila Stone & Luca Rampersad",
    directorImage: "",
    category: "Historical",
    backgroundImage: "/assets/photos/commitees/Relinquo.png",
    jointOrNot: true,
    double: false,
  },
  {
    title: "Historical Ad Hoc",
    description: "???",
    expandedDescription: "???",
    backgroundGuides: [],
    contactEmail: "",
    director: "Alexander Boldis",
    directorImage: "",
    category: "Historical",
    backgroundImage: "/assets/photos/commitees/HistoricalAdHoc.jpg",
    jointOrNot: false,
    double: false,
  },
  {
    title: "Lord of the Rings: The Shattered Fellowship",
    description:
      "With the appearance of the One Ring of Power, Middle-Earth is drowning in absolute peril.",
    expandedDescription:
      "“One Ring to rule them all, One Ring to find them; One Ring to bring them all and in the darkness bind them”\n\nWith the appearance of the One Ring of Power, Middle-Earth is drowning in absolute peril. Amassing his army of Orcs, the piercing Eye of Sauron is ever-watching, waiting for the return of his ring to obtain complete dominion over Middle-Earth. In Rivendell’s hallowed halls, a legendary fellowship unites the races once more with one goal in mind: to destroy the ring and prevent a retelling of the War of the Last Alliance. Now in the late Third Age, it is your turn to fly—and if luck has it, across the bridge of Khazad-dûm too.\n\nAmidst the racial feuds within the fellowship, tensions grow between them as they attempt to navigate the treacherous path to Mordor. Through the Misty Mountains, Forest of  Lothlórien, the Dead Marshes, and more, they face the terror of Sauron through his growing army, Nazgûl, and wide-spread corruption. Paths may separate, battles may ensue, but the purpose of the quest must not be lost: the ring must be destroyed in the fires of Mount Doom.\n\nWill you be able to resist the temptations of the ring and the corruption of Lord Sauron, thus rising above evil to save Middle Earth from catastrophe?",
    backgroundGuides: [],
    contactEmail: "",
    director: "Samantha Chang & Hasnain Heryani",
    directorImage: "",
    category: "Fictional",
    backgroundImage: "/assets/photos/commitees/LordOfTheRings.png",
    jointOrNot: false,
    double: false,
  },
  {
    title: "Death Note (2006, Japan)",
    description:
      "It started with a sudden, untraceable surge of heart attacks striking down criminals worldwide. The public names this unseen force Kira, a self-proclaimed arbiter of justice operating entirely outside the law.",
    expandedDescription:
      '<“The human whose name is written in this note shall die.">\n<このノートに名前を書かれた人間は死ぬ.>\n\nIt started with a sudden, untraceable surge of heart attacks striking down criminals worldwide. The public names this unseen force Kira, a self-proclaimed arbiter of justice operating entirely outside the law.\n\nWielding a supernatural notebook known as the Death Note, the user gains the ability to kill anyone simply by writing their name and visualizing their face. In their hands, morality itself has been weaponized. What began as isolated incidents has rapidly escalated into a global crisis. Criminals are no longer the only targets, fear spreads faster than information, and international legal systems are beginning to crumble.\n\nSociety is fracturing under deep ideological divisions. Is Kira a saviour correcting a broken world, or a tyrant establishing a justice system built on fear? As public panic rises, the world watches in terror.\n\nThe global order is collapsing, and the clock is ticking. In the pursuit of a perfect world, justice itself becomes a source of fear, and it is up to you to decide what that looks like. Will you uphold the traditional structures of accountability, or will you allow the international legal order to be rewritten by a single individual? The judgement begins now.',
    backgroundGuides: [],
    contactEmail: "",
    director: "Sukaina Syed",
    directorImage: "",
    category: "Fictional",
    backgroundImage: "/assets/photos/commitees/DeathNote.jpg",
    jointOrNot: false,
    double: false,
  },
  {
    title: "The Meteor of Extinction: Pokemon Omega Ruby Alpha Sapphire",
    description:
      "Welcome trainers, to the world of Pokémon – mysterious, wondrous creatures who live in and shape the earth, the land, the sea and sky, and who will work with you to save this world.",
    expandedDescription:
      "Welcome trainers, to the world of Pokémon – mysterious, wondrous creatures who live in and shape the earth, the land, the sea and sky, and who will work with you to save this world.\n\nOf all pokémon regions, Hoenn may have the deepest relationship with the land, seas and skies, as they are host to the powerful legendary pokémon Kyogre, Groudon and Rayquaza. Currently, Hoenn is recovering from the fight between Kyogre and Groudon. However, the residents of Hoenn now must deal with a new crisis: a giant meteor is headed towards the region, and is sure to wipe it off of the map. Thankfully, powerful factions in Hoenn have many ways that they can deal with the disaster, – if they can pause their politics and long-held grudges long enough to work together.\n\nWill Team Aqua and Team Magma be able to put aside their rivalry? Which is superior, Devon Corp’s science or the Draconids’ traditions? Maybe most importantly: will the Pokémon league be cancelled??? Maybe, if even the legendary pokémon of Hoenn managed to stop fighting, perhaps there is still hope for this committee.\n\nAll delegates in the committee will be assigned human characters, except Team Rocket’s Meowth.",
    backgroundGuides: [],
    contactEmail: "",
    director: "Annabelle Chin",
    directorImage: "",
    category: "Fictional",
    backgroundImage: "/assets/photos/commitees/Pokemon.jpg",
    jointOrNot: false,
    double: false,
  },
  {
    title: "A Wizarding Puzzle",
    description:
      "Dear Witch/Wizard,\n\nWe are pleased to inform you that you have been accepted at Hogwarts School of Witchcraft and Wizardry. Due to these extenuating circumstances, we will require assistance from all of our students in combating ongoing issues.",
    expandedDescription:
      "Dear Witch/Wizard,\n\nWe are pleased to inform you that you have been accepted at Hogwarts School of Witchcraft and Wizardry. Please find enclosed a list of all necessary books and equipment.\n\nAs you may have heard, we have been experiencing abnormal events. Rest assured your safety is our utmost priority, and we look forward to meeting you. Due to these extenuating circumstances, we will require assistance from all of our students in combating ongoing issues. Your vigilance is appreciated.\n\nTerm begins on 1 September. We await your owl by no later than 31 July.\n\nYours sincerely,\nAdirondack Quickleberry\nDeputy Headmaster",
    backgroundGuides: [],
    contactEmail: "",
    director: "Renzo Ugarte Basurco & Maria Aponiuk Sawicz",
    directorImage: "",
    category: "Fictional",
    backgroundImage: "/assets/photos/commitees/Wizarding.jpg",
    jointOrNot: true,
    double: false,
  },
  {
    title: "Fictional Ad Hoc",
    description: "???",
    expandedDescription: "???",
    backgroundGuides: [],
    contactEmail: "",
    director: "Jordan Bickramsingh",
    directorImage: "",
    category: "Fictional",
    backgroundImage: "/assets/photos/commitees/FictionalAdHoc.avif",
    jointOrNot: false,
    double: false,
  },
  {
    title: "Marshall, Carter & Dark: The Firm",
    description:
      "MC&D holds a monopoly over the weird, the anomalous, and the impossible; selling miracles, magics, and machinery since the Middle Ages.",
    expandedDescription:
      "(Winning and losing are meaningless. There is no need to move pieces when you can move the board. When you can end the match, there's only one reason to continue.)\n\n(It's all about playing the game.)\n\nMC&D holds a monopoly over the weird, the anomalous, and the impossible; selling miracles, magics, and machinery since the Middle Ages. Headquartered in London, their services are frequented by King Arthur, Iýa, Napoleon, and more, serving as the crossroads of arcane knowledge. With enough economic power to topple nations, rewrite histories, and shatter worlds, MC&D have been playing from the shadows for centuries. Yet, these are unprecedented times, as oracles and augurs alike burn from madness. In an era of technological innovation and astronomical economic expansion, the richest mortals to ever exist are minted, amidst the backdrop of renewing imperial power. Mr. Dark himself heads the 479th annual meeting, hosting name partners, their heirs, and a deluge of their staff, some ancient and some unborn. It is 1882, and threats, paranormal and normal, arise.\n\nA new game begins for this new age.",
    backgroundGuides: [],
    contactEmail: "",
    director: "Evelyn So",
    directorImage: "",
    category: "Conceptual",
    backgroundImage: "/assets/photos/commitees/MarshallCarterDark.png",
    jointOrNot: false,
    double: false,
  },
  {
    title: "Rising Idols: Fame is a Weapon",
    description:
      "It is well known that idol groups - from One Direction to Twice - are different from the average artist. Extremely likable, and extremely liable.",
    expandedDescription:
      "It is well known that idol groups - from One Direction to Twice - are different from the average artist. Extremely likable, and extremely liable. Idol groups are meant to follow a strict schedule of comeback and promotion, preventing fans from turning their heads away for even a second. But this kind of pressure demands perfection, whether it’s talent, performance or personality. Even the smallest slip up removes the illusion of perfection, and your entire career can come crumbling down.\n\nWhen just one slip up can turn fame into a weapon, the creation and execution of the newest CO-ED group must be handled with utmost care.\n\nInspired by real life companies, like HYBE (creators of BTS) and YG (creators of BLACKPINK), delegates now have the mission to create and guide a group that will rival their talent and fame. Make them the face of music and stardom, but make sure they don't fall into the relentless claws of the fans.\n\nMake their talents bloom, control their scandals, and get them their wins. After all, the only thing more powerful than the group, is the company that controls them.",
    backgroundGuides: [],
    contactEmail: "",
    director: "Akshaya Churesh",
    directorImage: "",
    category: "Conceptual",
    backgroundImage: "/assets/photos/commitees/RisingIdols.jpeg",
    jointOrNot: false,
    double: false,
  },
  {
    title: "Family Ties: The Titanomachy",
    description:
      "Everyone has heard of the Olympians, ruled by Zeus, the King of the Gods. But who came before them? How did their rule come crashing down?",
    expandedDescription:
      "Everyone has heard of the Olympians, ruled by Zeus, the King of the Gods. But who came before them? How did their rule come crashing down? This little-known battle that paved the way for the Olympians is known in Greek Mythology as the Titanomachy.\n\nTides are changing in the world of the Gods. It’s time for a new generation to take over for the Titans. But they aren’t ready to concede. As children turn against their elders, the road ahead is so much more than power dynamics and politics: it is deeply influenced by family ties. But the members of this committee can change things. They can work to mend the broken power structures on Mount Othrys and consolidate leadership amongst themselves, securing peace between the Titans and Olympians. If they fail, a brutal war awaits, and this time, we’re unsure as to who will come out on top.",
    backgroundGuides: [],
    contactEmail: "",
    director: "Lily Cohen",
    directorImage: "",
    category: "Conceptual",
    backgroundImage: "/assets/photos/commitees/Titanomachy.jpg",
    jointOrNot: false,
    double: false,
  },
  {
    title: "Digital Gold Rush",
    description:
      "It is 2022, the world is healing from the aftermath of the COVID pandemic. Yet something appears to have fundamentally changed. Instead of a single world existing, now we face the prominence of the digital world.",
    expandedDescription:
      "It is 2022, the world is healing from the aftermath of the COVID pandemic. Humanity is ready to return to “normal life”.  Yet something appears to have fundamentally changed.  Instead of a single world existing, now we face the prominence of the digital world. Social media companies are pushing for more content while online shopping apps are encouraging overconsumption.\n\nNow a new wave of change hits the digital world as AI is unleashed to the public. With this new tool, data brokers wish to see and buy everything about you: where you are, what you’ve seen, what you’ve bought, who you talk to and who you know. Everything about you is out there collected and sifted like how they did with gold back in 1849. We are in a gold rush, but a digital one where data is the new gold.\n\nAnd in this period, you collect the gold, working to scrape as much information from your loyal customers. You will make your service addictive, market it a necessity. No matter what, force the consumers to use your product.\n\nFinally, it is up to you if you wish to work with your competitors which will make lobbying effective and profit immense. However be careful, the public will push back if they figure out what you are doing.\n\nIn this committee, delegates will navigate through the tensions between technological advancement, profit maximization, and public demand for regulation.",
    backgroundGuides: [],
    contactEmail: "",
    director: "Eileen Jones",
    directorImage: "",
    category: "Conceptual",
    backgroundImage: "/assets/photos/commitees/DigitalGoldRush.jpg",
    jointOrNot: false,
    double: false,
  },
  {
    title: "Welcome to Salisbury Heights",
    description:
      "In Salisbury Heights, everything is peaceful. People go to work, see their families, hang out with their neighbours, and live the American dream.",
    expandedDescription:
      "(“Life Live Simple & Good.”)\n(– Town Motto)\n\nIn Salisbury Heights, everything is peaceful. A charming small town in the American Midwest. People go to work, see their families, hang out with their neighbours, and live the American dream. This idyllic life is maintained by the Town Council, members of the community who work to address the needs and wants of Salisbury’s residents -  even if petty gossip and interpersonal conflicts can leak into Council policy. Not everybody has the same faith in the town’s security, happiness, and Sunday BBQs at Lindberg’s backyard, though. Every town has its secrets, and the Conspiracy Theorists of Salisbury Heights gather in parallel to the Town Council, looking to uncover the truth about their town and the universe at large. The Conspiracy Theorists believe the Town Council is behind some grand conspiracy, hiding something, though they disagree on what: aliens? Chemicals in the water? Government surveillance? The recent disappearance of Mary Kennedy, one of the teachers at Salisbury High, has  created a rift between the rival groups: the Council has to keep the town stable, and the Theorists believe Mary was onto something big… In Salisbury Heights, small town life faces big questions: Is the truth more important than peace? When does gossip turn into grand conspiracy? Can life be this simple?",
    backgroundGuides: [],
    contactEmail: "",
    director: "Beatrix Stone & Oscar Hollingsworth",
    directorImage: "",
    category: "Conceptual",
    backgroundImage: "/assets/photos/commitees/WelcomeToSalisburyHeights.png",
    jointOrNot: true,
    double: false,
  },
  {
    title: "Conceptual Ad Hoc",
    description: "???",
    expandedDescription: "Watch, and learn.",
    backgroundGuides: [],
    contactEmail: "",
    director: "???",
    directorImage: "",
    category: "Conceptual",
    backgroundImage: "/assets/photos/commitees/ConceptualAdHoc.png",
    jointOrNot: true,
    double: false,
  },
];

export const scheduleData = [
  {
    day: "Friday, September 26",
    sessions: [
      {
        time: "5:00 PM – 6:00 PM",
        title: "Opening Ceremony",
        location: "Main Hall",
      },
      {
        time: "6:15 PM – 8:00 PM",
        title: "Committee Session I",
        location: "Assigned Rooms",
      },
    ],
  },
  {
    day: "Saturday, September 27",
    sessions: [
      {
        time: "9:00 AM – 12:00 PM",
        title: "Committee Session II",
        location: "Assigned Rooms",
      },
      {
        time: "1:00 PM – 4:00 PM",
        title: "Committee Session III",
        location: "Assigned Rooms",
      },
      {
        time: "7:00 PM – 10:00 PM",
        title: "Delegate Social",
        location: "Atrium",
      },
    ],
  },
  {
    day: "Sunday, September 28",
    sessions: [
      {
        time: "9:00 AM – 12:00 PM",
        title: "Committee Session IV",
        location: "Assigned Rooms",
      },
      {
        time: "1:00 PM – 2:00 PM",
        title: "Closing Ceremony",
        location: "Main Hall",
      },
    ],
  },
];

export const resources = [
  {
    title: "Rules of Procedures",
    description: "Understand the rules and procedures for the conference.",
    href: "https://drive.google.com/file/d/1CPD-I1XtxcrSHqEyWHYlxXyDsHF5X00G/view?usp=sharing",
    bg: `${CF_DOMAIN}/rop.jpeg?format=webp`, // example placeholder
  },
  {
    title: "Delegate's Guide to Crisis MUN",
    description:
      "A comprehensive guide for delegates participating in Crisis MUN.",
    href: "https://drive.google.com/file/d/18UHASiviwqNX4SCHptRfz_2rLLJbJPe1/view",
    bg: `${CF_DOMAIN}/delegates-guide.jpeg?format=webp`,
  },
  {
    title: "Committee Archives",
    description: "Explore past committee topics and materials.",
    href: "https://docs.google.com/document/d/1rj6pCLqc5eRTqLvVRy-XHe31KqZ1gckAcjwZpHCj9Wc/edit?usp=sharing",
    bg: `${CF_DOMAIN}/archive.jpg?format=webp`,
  },
];

export const secretariat = [
  // Executive Board
  {
    name: "Elisha Yao",
    position: "Secretary-General",
    image: `${CF_DOMAIN}/elisha.jpg?format=webp`,
    branch: "Executive Board",
  },
  {
    name: "Nicholas Ali",
    position: "DSG, Equity",
    image: `${CF_DOMAIN}/nicholas.png?format=webp`,
    branch: "Executive Board",
  },
  {
    name: "Jackie Wang",
    position: "USG, Academics",
    image: `${CF_DOMAIN}/jackie.jpg?format=webp`,
    branch: "Executive Board",
  },
  {
    name: "Ethan Currie",
    position: "USG, External",
    image: `${CF_DOMAIN}/ethan.jpg?format=webp`,
    branch: "Executive Board",
  },
  {
    name: "Pavel Nazarenko",
    position: "USG, Internal",
    image: `${CF_DOMAIN}/pavel.jpg?format=webp`,
    branch: "Executive Board",
  },
  // External
  {
    name: "Fatima Shakeel",
    position: "Corporate Relations",
    image: `${CF_DOMAIN}/fatima.jpg?format=webp`,
    branch: "External",
  },
  {
    name: "Joanna Wang",
    position: "Chargée d’Affaires",
    image: `${CF_DOMAIN}/joanna.jpg?format=webp`,
    branch: "External",
  },
  {
    name: "Arcadia Leung",
    position: "Co-ASG, Design & IT",
    image: `${CF_DOMAIN}/arcadia.jpg?format=webp`,
    branch: "External",
  },
  {
    name: "Sharon Yan",
    position: "Co-ASG, Design & IT",
    image: `${CF_DOMAIN}/sharon.jpg?format=webp`,
    branch: "External",
  },
  {
    name: "Rome Zebrowski",
    position: "Co-ASG, Logistics",
    image: `${CF_DOMAIN}/rome.jpg?format=webp`,
    branch: "External",
  },
  {
    name: "Yvonne Yeh",
    position: "Co-ASG, Logistics",
    image: `${CF_DOMAIN}/yvonne.jpg?format=webp`,
    branch: "External",
  },
  {
    name: "Sarah Link",
    position: "ASG, Marketing",
    image: `${CF_DOMAIN}/sarah.jpg?format=webp`,
    branch: "External",
  },
  // Internal
  {
    name: "Jay Kaur",
    position: "ASG, Equity",
    image: `${CF_DOMAIN}/jay.png?format=webp`,
    branch: "Internal",
  },
  {
    name: "Bryanna Donoghue",
    position: "ASG, Equity Training",
    image: `${CF_DOMAIN}/bryanna.jpg?format=webp`,
    branch: "Internal",
  },
  {
    name: "Dor Ioffe",
    position: "ASG, Conceptual",
    image: `${CF_DOMAIN}/dor.png?format=webp`,
    branch: "Internal",
  },
  {
    name: "Krisztian Drimba",
    position: "ASG, Historical",
    image: `${CF_DOMAIN}/kris.jpg?format=webp`,
    branch: "Internal",
  },
  {
    name: "Abraar Hussai",
    position: "ASG, Fictional",
    image: `${CF_DOMAIN}/abraar.jpg?format=webp`,
    branch: "Internal",
  },
  {
    name: "Alex Drotenko",
    position: "ASG, Hiring",
    image: `${CF_DOMAIN}/alex.jpg?format=webp`,
    branch: "Internal",
  },
  {
    name: "Oafe Cheung",
    position: "ASG, Training",
    image: `${CF_DOMAIN}/oafe.jpg?format=webp`,
    branch: "Internal",
  },
];

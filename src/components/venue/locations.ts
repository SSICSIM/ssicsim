// Conference locations shown on the venue map. Rooms use the floor-plan numbering
// ("OI 4410" is room 4-410, "OI G162" is G-162). Committees list front rooms only.
export interface VenueLocation {
  name: string;
  group: string;
  rooms: string[];
  note?: string;
  // Ground-floor position for places the floor-plan data has no room outline for.
  point?: { x: number; z: number };
  // Locations outside OISE can't be shown in the model; `short` names the walking-directions button.
  external?: { building: string; mapsQuery: string; short: string };
}

export const VENUE_LOCATIONS: VenueLocation[] = [
  {
    name: "East Entrance",
    group: "Entrances",
    rooms: ["G-110V"],
    note: "Ground floor, beside the main elevators.",
  },
  {
    name: "West Entrance (north doors)",
    group: "Entrances",
    rooms: ["G-160N"],
    note: "Ground floor, by the stairs at the north end of the lobby.",
    point: { x: 14.0, z: -4.3 },
  },
  {
    name: "West Entrance (south doors)",
    group: "Entrances",
    rooms: ["G-160V"],
    note: "Ground floor.",
    point: { x: -4.85, z: -1.6 },
  },

  {
    name: "Registration Room",
    group: "General",
    rooms: ["8-200"],
    note: "Day 1 only. On Days 2 and 3, register at the Secretariat Room.",
  },
  {
    name: "Opening & Closing Ceremonies",
    group: "General",
    rooms: ["G-162"],
    note: "OISE auditorium",
  },
  { name: "Prayer Room", group: "General", rooms: ["10-200"] },
  {
    name: "Midnight Crisis",
    group: "Events",
    rooms: ["8-200"],
    note: "Friday, 7:30–11:00 pm.",
  },
  {
    name: "Delegate Training Room",
    group: "General",
    rooms: ["UC 179"],
    note: "Friday, 12–1 pm and 2–3 pm.",
    external: {
      building: "University College (not in OISE)",
      mapsQuery: "University College, 15 King's College Cir, Toronto",
      short: "UC",
    },
  },
  {
    name: "Delegate Social",
    group: "General",
    rooms: ["Victoria College (Alumni Hall)"],
    note: "Saturday, 7–10 pm.",
    external: {
      building: "not in OISE",
      mapsQuery: "Alumni Hall, Victoria College, Toronto",
      short: "Vic",
    },
  },

  {
    name: "Fall of the Qing: Five Coloured Banners Over Jing",
    group: "Historical Branch",
    rooms: ["4-410"],
  },
  {
    name: "Land of the Pharaohs: Egyptian Reunification",
    group: "Historical Branch",
    rooms: ["4-418"],
  },
  {
    name: "Forged in Flames: The Franco-Prussian War",
    group: "Historical Branch",
    rooms: ["8-170", "8-180"],
  },
  {
    name: "Relinquo vos Liberos: The Rovereta Affair, 1957",
    group: "Historical Branch",
    rooms: ["8-214", "8-220"],
  },
  { name: "Historical Ad Hoc", group: "Historical Branch", rooms: ["4-420"] },

  {
    name: "Lord of the Rings: The Shattered Fellowship",
    group: "Fictional Branch",
    rooms: ["5-230"],
  },
  {
    name: "Death Note (2006, Japan)",
    group: "Fictional Branch",
    rooms: ["5-270"],
  },
  {
    name: "The Meteor of Extinction: Pokémon Omega Ruby Alpha Sapphire",
    group: "Fictional Branch",
    rooms: ["2-289"],
  },
  {
    name: "A Wizarding Puzzle",
    group: "Fictional Branch",
    rooms: ["5-280", "5-290"],
  },
  { name: "Fictional Ad Hoc", group: "Fictional Branch", rooms: ["8-280"] },

  {
    name: "Marshall, Carter & Dark: The Firm",
    group: "Conceptual Branch",
    rooms: ["2-198"],
  },
  {
    name: "Rising Idols: Fame is a Weapon",
    group: "Conceptual Branch",
    rooms: ["2-199"],
  },
  {
    name: "Family Ties: The Titanomachy",
    group: "Conceptual Branch",
    rooms: ["2-227"],
  },
  { name: "Digital Gold Rush", group: "Conceptual Branch", rooms: ["2-286"] },
  {
    name: "Welcome to Salisbury Heights",
    group: "Conceptual Branch",
    rooms: ["2-295", "2-296"],
  },
  { name: "Conceptual Ad Hoc", group: "Conceptual Branch", rooms: ["2-279"] },
];

// Open lobbies the floor plans number like rooms; shown and routed as hallway.
export const OPEN_AREAS = new Set(["2-200", "G-158", "G-160", "G-170"]);

export const OISE_ADDRESS = "252 Bloor St W, Toronto";

/** Google Maps walking directions from OISE. */
export const walkingDirections = (to: string) =>
  `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(OISE_ADDRESS)}&destination=${encodeURIComponent(to)}&travelmode=walking`;

export const levelOf = (room: string) =>
  room.startsWith("G-") ? "1" : room.startsWith("M") ? "M" : room.split("-")[0];

/** "8-200" -> "OI 8200", "G-162" -> "OI G162" (how rooms are written on conference materials). */
export const roomCode = (room: string) =>
  room.includes("-") ? `OI ${room.replace("-", "")}` : room;

/** Floors with something on them for the conference; the rest stay in the model but can't be opened. */
export const USED_LEVELS = new Set(
  VENUE_LOCATIONS.filter((l) => !l.external).map((l) => levelOf(l.rooms[0])),
);

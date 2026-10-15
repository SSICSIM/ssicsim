// Registration forms for the optional conference events. Shared by the form
// view and the API route (which builds the confirmation email), so this file
// must stay free of client-only code. Answer keys must match the admin portal
// backend's per-event answer schemas.

export type EventSlug =
  | "midnight-crisis"
  | "delegate-social"
  | "delegate-training";

export interface EventPolicy {
  title: string;
  body: string;
  // Each must be checked; stored under `key` as true.
  acks: { key: string; label: string }[];
}

export interface EventSession {
  key: string;
  label: string;
}

export interface EventFormConfig {
  slug: EventSlug;
  title: string;
  date: string;
  time: string;
  location: string;
  intro: string[];
  // Midnight Crisis is selective; everyone else is first come, first served.
  selective: boolean;
  policies: EventPolicy[];
}

const WITHDRAWAL_BODY = (event: string, deadline?: string) =>
  `If you are unable to attend ${event} and need to withdraw after registering, you must inform the Chargée d'Affaires, Joanna Wang, by emailing registration@ssicsim.ca as soon as possible${deadline ? ` (no later than ${deadline})` : ""}. This allows us to make the necessary accommodations for your absence.`;

export const TRAINING_SESSIONS: EventSession[] = [
  { key: "session_1", label: "Session 1: 12:00 – 1:00 PM (in person, UC 179)" },
  { key: "session_2", label: "Session 2: 2:00 – 3:00 PM (in person, UC 179)" },
];

export const ALLERGY_OPTIONS = [
  "None",
  "Peanuts",
  "Tree nuts",
  "Dairy",
  "Eggs",
  "Gluten",
  "Soy",
  "Shellfish",
  "Fish",
];

export const DIETARY_OPTIONS = [
  "No restrictions",
  "Vegetarian",
  "Vegan",
  "Halal",
  "Kosher",
  "Pescatarian",
  "Keto",
];

export const MOTIVATION_MAX_WORDS = 100;

export const EVENT_FORMS: Record<EventSlug, EventFormConfig> = {
  "midnight-crisis": {
    slug: "midnight-crisis",
    title: "Midnight Crisis",
    date: "Friday, October 23, 2026",
    time: "7:30 – 11:00 PM",
    location: "OI 8200 (in person)",
    selective: true,
    intro: [
      "Midnight Crisis is a special, fast-paced crisis committee held on the first day of the conference after regular committee sessions have ended, close to midnight. It is completely independent from regular SSICSIM 2026 committees. No background knowledge is needed and delegates of all experience levels can join.",
      "The topic is revealed at the beginning of the session. It changes every year and tends to be more creative and light-hearted than typical Model UN crisis committees. To prepare, come in with an open mind and be ready for chaos.",
      "Registering does not guarantee you a position. Due to highly limited availability, we'll review all applications and email you if you're selected.",
    ],
    policies: [
      {
        title: "Attendance Policy",
        body: "Given that availability for Midnight Crisis is limited and requires that we hold your spot, attendance for the entire duration of this committee is MANDATORY. Please only apply if you are certain you can attend and stay for the entirety of the committee from 7:30 PM to 11:00 PM on Friday, October 23, 2026.",
        acks: [
          {
            key: "attendance_policy_ack",
            label: "I agree to the Attendance Policy.",
          },
          {
            key: "attendance_mandatory_ack",
            label:
              "I understand that attendance for the entirety of Midnight Crisis is mandatory.",
          },
        ],
      },
      {
        title: "Withdrawal Policy",
        body: WITHDRAWAL_BODY(
          "Midnight Crisis",
          "Wednesday, October 21 @ 11:59 PM",
        ),
        acks: [
          {
            key: "withdrawal_policy_ack",
            label: "I agree to the Withdrawal Policy.",
          },
          {
            key: "withdrawal_notice_ack",
            label:
              "I understand that if I am unable to attend Midnight Crisis, I will notify the Chargée d'Affaires no later than Wednesday, October 21 @ 11:59 PM.",
          },
        ],
      },
    ],
  },
  "delegate-social": {
    slug: "delegate-social",
    title: "Delegate Social",
    date: "Saturday, October 24, 2026",
    time: "7:00 – 10:00 PM",
    location: "Victoria College, Alumni Hall (in person)",
    selective: false,
    intro: [
      "Looking to unwind after a long day of formal debate? Hoping to connect with other Delegates, Staff, and Secretariat members at SSICSIM? Sign up for the Delegate Social, a lively event in the heart of the University of Toronto! Free refreshments and dinner will be provided.",
      "Spots are given on a first come, first served basis. Once the event is full, new registrations join the waitlist.",
    ],
    policies: [
      {
        title: "Withdrawal Policy",
        body: WITHDRAWAL_BODY("the Delegate Social"),
        acks: [
          {
            key: "withdrawal_policy_ack",
            label: "I agree to the Withdrawal Policy.",
          },
          {
            key: "withdrawal_notice_ack",
            label:
              "I understand that if I am unable to attend the Delegate Social, I will notify the Chargée d'Affaires as soon as possible.",
          },
        ],
      },
    ],
  },
  "delegate-training": {
    slug: "delegate-training",
    title: "Delegate Training",
    date: "Friday, October 23, 2026",
    time: "12:00 – 1:00 PM or 2:00 – 3:00 PM",
    location: "UC 179, University College (15 King's College Cir)",
    selective: false,
    intro: [
      "Whether you are new to Model UN or have a wealth of experience, all delegates are welcome to attend Delegate Training and learn about everything from Rules and Procedure to crisis and everything in between, hosted by our Co-ASGs of Hiring & Training.",
      "We're offering two in-person sessions, and the same content is covered in both. Please only sign up for one session to make room for other delegates. Delegates must check in to the conference at OISE first before attending in person.",
    ],
    policies: [],
  },
};

export function getEventForm(slug: string): EventFormConfig | undefined {
  return (EVENT_FORMS as Record<string, EventFormConfig>)[slug];
}

export function countWords(text: string): number {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

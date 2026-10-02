// Server-only: pulls guide links for each committee from the admin portal.
// Reads ADMIN_API_TOKEN, so never import this from a client component.

const BACKEND = process.env.BACKEND_API_URL ?? "http://localhost:8000";
const TOKEN = process.env.ADMIN_API_TOKEN ?? "";

// How long (seconds) Next caches the admin response before refetching.
const REVALIDATE_SECONDS = 300;

export interface CommitteeGuide {
  description: string;
  link: string;
}

interface AdminCommittee {
  name: string;
  background_guide_link: string | null;
  mechanics_guide_link: string | null;
  character_guide_link: string | null;
  additional_links?: { name: string; url: string }[] | null;
}

// Committee names in the admin portal are typed by hand, so compare loosely
// (case, spacing, curly quotes, en/em dashes) against the titles in data.tsx.
export function normalizeCommitteeName(name: string): string {
  return name
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—]/g, "-")
    .replace(/\s+/g, " ")
    .trim();
}

function toGuides(committee: AdminCommittee): CommitteeGuide[] {
  const guides: CommitteeGuide[] = [];
  const add = (description: string, link: string | null | undefined) => {
    const trimmed = link?.trim();
    if (trimmed) guides.push({ description, link: trimmed });
  };

  add("Background Guide", committee.background_guide_link);
  add("Mechanics Guide", committee.mechanics_guide_link);
  add("Character Guide", committee.character_guide_link);
  for (const extra of committee.additional_links ?? []) {
    add(extra.name.trim(), extra.url);
  }
  return guides;
}

/**
 * Returns guides keyed by normalized committee name, or null if the admin
 * portal can't be reached (callers should fall back to the static data).
 */
export async function getCommitteeGuides(): Promise<Map<
  string,
  CommitteeGuide[]
> | null> {
  try {
    const res = await fetch(`${BACKEND}/api/committees`, {
      headers: { "X-Admin-Token": TOKEN },
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) {
      console.error(`Committee guides fetch failed: ${res.status}`);
      return null;
    }
    const committees = (await res.json()) as AdminCommittee[];
    return new Map(
      committees.map((c) => [normalizeCommitteeName(c.name), toGuides(c)]),
    );
  } catch (error) {
    console.error("Committee guides fetch failed:", error);
    return null;
  }
}

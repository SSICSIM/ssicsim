import Committees from "@/views/committees";
import { committeesData } from "@/utils/data";
import {
  getCommitteeGuides,
  normalizeCommitteeName,
  type CommitteeGuide,
} from "@/lib/committee-guides";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  // Await searchParams first so the build bails out to dynamic rendering
  // before we hit the admin portal.
  const { filter } = await searchParams;
  const adminGuides = await getCommitteeGuides();

  // The admin portal is the source of truth for guide links. Fall back to the
  // static links in data.tsx only when the portal is unreachable or doesn't
  // know about a committee.
  const guidesByTitle: Record<string, CommitteeGuide[]> = {};
  for (const committee of committeesData) {
    guidesByTitle[committee.title] =
      adminGuides?.get(normalizeCommitteeName(committee.title)) ??
      committee.backgroundGuides ??
      [];
  }

  return (
    <Committees initialFilter={filter || "All"} guidesByTitle={guidesByTitle} />
  );
}

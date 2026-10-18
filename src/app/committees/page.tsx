import Committees from "@/views/committees";

// Guide links live in data.tsx (snapshotted from the admin portal), so this
// page never waits on the backend.
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const { filter } = await searchParams;
  return <Committees initialFilter={filter || "All"} />;
}

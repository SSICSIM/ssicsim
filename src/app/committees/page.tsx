import Committees from "@/views/committees";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const { filter } = await searchParams;

  return <Committees initialFilter={filter || "All"} />;
}

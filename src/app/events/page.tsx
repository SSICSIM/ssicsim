import Events from "@/views/events";
import { getAllEventStatuses } from "@/lib/event-status";

// Shows whether each event is open, full, or closed, rebuilt every 30s.
export const revalidate = 30;

export default async function Page() {
  const statuses = await getAllEventStatuses();
  return <Events statuses={statuses} />;
}

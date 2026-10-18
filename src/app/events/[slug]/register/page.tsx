import { notFound } from "next/navigation";
import EventRegister from "@/views/event-register";
import { getEventForm } from "@/lib/event-forms";
import { getEventStatus } from "@/lib/event-status";

// Rendered per request; event status is cached for 30s in event-status.ts.
export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEventForm(slug);
  if (!event) notFound();
  const status = await getEventStatus(event.slug);
  return (
    <EventRegister
      slug={event.slug}
      closed={status?.closed ?? false}
      full={status?.full ?? false}
      fullSessions={status?.fullSessions ?? []}
    />
  );
}

import { notFound } from "next/navigation";
import EventRegister from "@/views/event-register";
import { getEventForm } from "@/lib/event-forms";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEventForm(slug);
  if (!event) notFound();
  return <EventRegister slug={event.slug} />;
}

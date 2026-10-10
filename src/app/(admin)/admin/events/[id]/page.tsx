import Link from "next/link";
import { notFound } from "next/navigation";
import { getEventAdmin } from "@/lib/events";
import { EventForm } from "@/components/admin/EventForm";
import { btnGhost, PageHead } from "@/components/admin/ui";
import { deleteEventAction, saveEventAction } from "../../actions";

export const dynamic = "force-dynamic";

export default async function EditEvent({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ created?: string }> }) {
  const { id } = await params;
  const { created } = await searchParams;
  const ev = getEventAdmin(Number(id));
  if (!ev) notFound();
  return (
    <>
      <PageHead title={ev.texts.en?.title || ev.texts.th?.title || ev.slug} sub={created ? "Event created." : undefined}>
        <Link href={`/admin/events/${ev.id}/registrations`} className={btnGhost}>Registrations</Link>
        {ev.status === "published" && (
          <Link href={`/th/events/${ev.slug}`} target="_blank" className={btnGhost}>View on site ↗</Link>
        )}
      </PageHead>
      <EventForm action={saveEventAction} event={ev} />
      <details className="mt-12 max-w-[920px] rounded-xl border border-[#5a2a2a] p-5">
        <summary className="cursor-pointer text-sm text-[#FF9C8A]">Delete this event</summary>
        <p className="text-sm text-muted">This permanently removes the event and all of its registrations.</p>
        <form action={deleteEventAction}>
          <input type="hidden" name="id" value={ev.id} />
          <button type="submit" className="rounded-full bg-[#C2413B] px-5 py-2 text-sm font-semibold text-white">Yes, delete permanently</button>
        </form>
      </details>
    </>
  );
}

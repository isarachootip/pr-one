import { EventForm } from "@/components/admin/EventForm";
import { PageHead } from "@/components/admin/ui";
import { saveEventAction } from "../../actions";

export default function NewEvent() {
  return (
    <>
      <PageHead title="New event" />
      <EventForm action={saveEventAction} />
    </>
  );
}

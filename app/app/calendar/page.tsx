import type { Metadata } from "next";
import { CalendarView } from "@/components/workouts/CalendarView";

export const metadata: Metadata = {
  title: "Kalendarz — Coach Zone",
};

export default function CalendarPage() {
  return <CalendarView />;
}

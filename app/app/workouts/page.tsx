import type { Metadata } from "next";
import { WorkoutsList } from "@/components/workouts/WorkoutsList";

export const metadata: Metadata = {
  title: "Treningi — Coach Zone",
};

export default function WorkoutsPage() {
  return <WorkoutsList />;
}

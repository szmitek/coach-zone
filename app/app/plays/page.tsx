import type { Metadata } from "next";
import { PlaysList } from "@/components/plays/PlaysList";

export const metadata: Metadata = {
  title: "Zagrywki — Coach Zone",
};

export default function PlaysPage() {
  return <PlaysList />;
}

"use client";

import { useRouter } from "next/navigation";
import { DeletePlayButton } from "./DeletePlayButton";

export function PlayDetailHeader({
  playId,
  playName,
  canDelete,
}: {
  playId: string;
  playName: string;
  canDelete: boolean;
}) {
  const router = useRouter();

  function handleDeleted() {
    router.push("/app/plays");
    router.refresh();
  }

  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <h1 className="text-3xl font-bold tracking-tight">{playName}</h1>
      {canDelete && (
        <DeletePlayButton playId={playId} onDeleted={handleDeleted} />
      )}
    </div>
  );
}

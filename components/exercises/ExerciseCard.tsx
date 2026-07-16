import Link from "next/link";
import type {
  Category,
  Exercise,
  PublicProfile,
  Sport,
} from "@/lib/supabase/types";
import { formatDuration } from "@/lib/exercises";
import { AuthorBadge } from "./AuthorBadge";
import { CategoryBadge } from "./CategoryBadge";
import { DifficultyIndicator } from "./DifficultyIndicator";
import { SportBadge } from "./SportBadge";

export function ExerciseCard({
  exercise,
  category,
  sport,
  authorsById,
  currentUserId,
}: {
  exercise: Exercise;
  category: Category | undefined;
  sport: Sport | undefined;
  authorsById: Map<string, PublicProfile>;
  currentUserId: string | null;
}) {
  return (
    <Link
      href={`/app/exercises/${exercise.id}`}
      className="flex flex-col rounded-2xl border border-neutral-200 p-5 transition-colors hover:border-emerald-600/50 hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900"
    >
      <h3 className="font-semibold tracking-tight">{exercise.title}</h3>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {sport && <SportBadge name={sport.name_pl} />}
        {category && (
          <CategoryBadge name={category.name_pl} slug={category.slug} />
        )}
        <DifficultyIndicator difficulty={exercise.difficulty} />
        <span className="text-xs text-neutral-500 dark:text-neutral-500">
          {formatDuration(exercise.duration_min)}
        </span>
        <AuthorBadge
          authorId={exercise.author_id}
          currentUserId={currentUserId}
          authorsById={authorsById}
        />
      </div>

      {exercise.description && (
        <p className="mt-3 line-clamp-2 text-sm text-neutral-600 dark:text-neutral-400">
          {exercise.description}
        </p>
      )}
    </Link>
  );
}

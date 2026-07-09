import { categoryBadgeClasses } from "@/lib/exercises";

export function CategoryBadge({ name, slug }: { name: string; slug: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${categoryBadgeClasses(slug)}`}
    >
      {name}
    </span>
  );
}

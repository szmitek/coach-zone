"use client";

import { useId } from "react";
import { audienceEquals, type Audience } from "@/lib/audience";

export function AudienceSelector({
  legend,
  teams,
  value,
  onChange,
  permanenceNotice,
}: {
  legend: string;
  teams: Array<{ id: string; name: string }>;
  value: Audience;
  onChange: (audience: Audience) => void;
  /** Shown as a plain-language warning right where the choice is made - e.g. exercises are immutable, this is exercise-only. */
  permanenceNotice?: string;
}) {
  const name = useId();

  const options: Array<{ key: string; audience: Audience; label: string; description: string }> =
    [
      {
        key: "personal",
        audience: { kind: "personal" },
        label: "Tylko ja",
        description: "Widoczne tylko dla Ciebie.",
      },
      ...teams.map((team) => ({
        key: `team:${team.id}`,
        audience: { kind: "team", teamId: team.id } as Audience,
        label: team.name,
        description: "Widoczne dla sztabu tej drużyny.",
      })),
      {
        key: "public",
        audience: { kind: "public" },
        label: "Biblioteka publiczna",
        description: "Widoczne dla wszystkich trenerów w Coach Zone.",
      },
    ];

  return (
    <fieldset>
      <legend className="block text-sm font-medium">{legend}</legend>
      <div className="mt-1.5 space-y-2">
        {options.map((option) => {
          const selected = audienceEquals(value, option.audience);
          return (
            <label
              key={option.key}
              className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors ${
                selected
                  ? "border-emerald-600/50 bg-emerald-50/50 dark:bg-emerald-950/20"
                  : "border-neutral-300 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-900"
              }`}
            >
              <input
                type="radio"
                name={name}
                checked={selected}
                onChange={() => onChange(option.audience)}
                className="mt-0.5 h-4 w-4 shrink-0 border-neutral-300 text-emerald-600 focus:ring-emerald-600/50 dark:border-neutral-700"
              />
              <span>
                <span className="block text-sm font-medium">
                  {option.label}
                </span>
                <span className="block text-xs text-neutral-500 dark:text-neutral-500">
                  {option.description}
                </span>
              </span>
            </label>
          );
        })}
      </div>
      {permanenceNotice && (
        <p className="mt-2 text-xs text-amber-700 dark:text-amber-400">
          {permanenceNotice}
        </p>
      )}
    </fieldset>
  );
}

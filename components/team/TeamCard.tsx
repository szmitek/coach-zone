import type { PublicProfile, Team, TeamInvite, TeamMember } from "@/lib/supabase/types";
import { InvitesPanel } from "./InvitesPanel";
import { RemoveMemberButton } from "./RemoveMemberButton";

const ROLE_LABELS: Record<TeamMember["role"], string> = {
  head_coach: "Head coach",
  assistant_coach: "Assistant coach",
};

export function TeamCard({
  team,
  members,
  invites,
  authorsById,
  currentUserId,
  onChanged,
}: {
  team: Team;
  members: TeamMember[];
  invites: TeamInvite[];
  authorsById: Map<string, PublicProfile>;
  currentUserId: string;
  onChanged: () => void;
}) {
  const myMembership = members.find(
    (member) => member.user_id === currentUserId,
  );
  const isHeadCoach = myMembership?.role === "head_coach";

  const sortedMembers = [...members].sort((a, b) =>
    a.joined_at.localeCompare(b.joined_at),
  );

  return (
    <div className="rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">{team.name}</h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-500">
          {team.short_name}
        </p>
      </div>

      {/* Not paginated and never will be - a coaching staff is a handful of people. */}
      <ul className="mt-4 space-y-2">
        {sortedMembers.map((member) => {
          const isMe = member.user_id === currentUserId;
          const displayName =
            authorsById.get(member.user_id)?.display_name ?? "Trener";
          return (
            <li
              key={member.user_id}
              className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-neutral-200 px-3 py-2 text-sm dark:border-neutral-800"
            >
              <span className="flex items-center gap-2">
                <span>
                  {displayName}
                  {isMe && (
                    <span className="text-neutral-500 dark:text-neutral-500">
                      {" "}
                      (Ty)
                    </span>
                  )}
                </span>
                <span className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-xs font-medium text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400">
                  {ROLE_LABELS[member.role]}
                </span>
              </span>
              {isHeadCoach && !isMe && (
                <RemoveMemberButton
                  teamId={team.id}
                  userId={member.user_id}
                  label="Usuń"
                  confirmLabel={`Usunąć ${displayName} z drużyny?`}
                  onRemoved={onChanged}
                />
              )}
            </li>
          );
        })}
      </ul>

      {isHeadCoach ? (
        <InvitesPanel
          teamId={team.id}
          invites={invites}
          currentUserId={currentUserId}
          onChanged={onChanged}
        />
      ) : (
        <div className="mt-6 border-t border-neutral-200 pt-6 dark:border-neutral-800">
          <RemoveMemberButton
            teamId={team.id}
            userId={currentUserId}
            label="Opuść drużynę"
            confirmLabel="Na pewno chcesz opuścić tę drużynę?"
            onRemoved={onChanged}
          />
        </div>
      )}
    </div>
  );
}

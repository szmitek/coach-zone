"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type {
  PublicProfile,
  Team,
  TeamInvite,
  TeamMember,
} from "@/lib/supabase/types";
import { CreateTeamForm } from "./CreateTeamForm";
import { TeamCard } from "./TeamCard";

export function TeamManager({ userId }: { userId: string }) {
  const [teams, setTeams] = useState<Team[] | null>(null);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [invites, setInvites] = useState<TeamInvite[]>([]);
  const [authors, setAuthors] = useState<PublicProfile[]>([]);
  const [loadError, setLoadError] = useState(false);
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setTeams(null);
    setLoadError(false);

    const supabase = createClient();
    // RLS already scopes every one of these to "my" teams (is_team_member /
    // is_team_head_coach), so no explicit team_id filter is needed here -
    // same pattern as ExercisesLibrary relying on RLS for exercises.
    Promise.all([
      supabase.from("teams").select("*").order("created_at", { ascending: true }),
      supabase.from("team_members").select("*"),
      supabase
        .from("team_invites")
        .select("*")
        .order("created_at", { ascending: false }),
      supabase.rpc("list_public_profiles"),
    ]).then(([teamsRes, membersRes, invitesRes, profilesRes]) => {
      if (cancelled) return;
      if (teamsRes.error || !teamsRes.data) {
        setLoadError(true);
        return;
      }
      setTeams(teamsRes.data);
      setMembers(membersRes.data ?? []);
      setInvites(invitesRes.data ?? []);
      setAuthors(profilesRes.data ?? []);
    });

    return () => {
      cancelled = true;
    };
  }, [reloadToken]);

  const authorsById = useMemo(() => {
    const map = new Map<string, PublicProfile>();
    for (const author of authors) map.set(author.id, author);
    return map;
  }, [authors]);

  const membersByTeam = useMemo(() => {
    const map = new Map<string, TeamMember[]>();
    for (const member of members) {
      const list = map.get(member.team_id) ?? [];
      list.push(member);
      map.set(member.team_id, list);
    }
    return map;
  }, [members]);

  const invitesByTeam = useMemo(() => {
    const map = new Map<string, TeamInvite[]>();
    for (const invite of invites) {
      const list = map.get(invite.team_id) ?? [];
      list.push(invite);
      map.set(invite.team_id, list);
    }
    return map;
  }, [invites]);

  function refresh() {
    setReloadToken((n) => n + 1);
  }

  if (loadError) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-900/50 dark:bg-red-950/40">
        <p className="text-sm text-red-700 dark:text-red-400">
          Nie udało się wczytać drużyny. Spróbuj ponownie.
        </p>
        <button
          type="button"
          onClick={refresh}
          className="mt-3 rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-500"
        >
          Spróbuj ponownie
        </button>
      </div>
    );
  }

  if (teams === null) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 2 }, (_, i) => (
          <div
            key={i}
            className="h-32 animate-pulse rounded-2xl bg-neutral-100 dark:bg-neutral-900"
          />
        ))}
      </div>
    );
  }

  if (teams.length === 0) {
    return (
      <div className="max-w-md">
        <CreateTeamForm userId={userId} onCreated={refresh} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {teams.map((team) => (
        <TeamCard
          key={team.id}
          team={team}
          members={membersByTeam.get(team.id) ?? []}
          invites={invitesByTeam.get(team.id) ?? []}
          authorsById={authorsById}
          currentUserId={userId}
          onChanged={refresh}
        />
      ))}
    </div>
  );
}

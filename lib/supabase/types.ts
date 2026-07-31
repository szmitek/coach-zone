export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Difficulty = 1 | 2 | 3 | 4 | 5;

export type WorkoutSection = "warmup" | "main" | "positional" | "cooldown";

export type TeamRole = "head_coach" | "assistant_coach";

// One entry per team the caller shares with that profile - see
// list_public_profiles() in
// supabase/migrations/20260729101241_list_public_profiles_team_roles.sql.
export interface TeamRoleEntry {
  team_id: string;
  role: TeamRole;
}

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      categories: {
        Row: {
          id: number;
          name_en: string;
          name_pl: string;
          slug: string;
        };
        Insert: {
          id?: number;
          name_en: string;
          name_pl: string;
          slug: string;
        };
        Update: {
          id?: number;
          name_en?: string;
          name_pl?: string;
          slug?: string;
        };
        Relationships: [];
      };
      exercise_positions: {
        Row: {
          exercise_id: string;
          position_id: string;
        };
        Insert: {
          exercise_id: string;
          position_id: string;
        };
        Update: {
          exercise_id?: string;
          position_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "exercise_positions_exercise_id_fkey";
            columns: ["exercise_id"];
            isOneToOne: false;
            referencedRelation: "exercises";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "exercise_positions_position_id_fkey";
            columns: ["position_id"];
            isOneToOne: false;
            referencedRelation: "positions";
            referencedColumns: ["id"];
          },
        ];
      };
      exercises: {
        Row: {
          author_id: string | null;
          board_field_mode: string | null;
          board_state: Json | null;
          category_id: number;
          created_at: string;
          description: string | null;
          difficulty: Difficulty | null;
          duration_min: number | null;
          equipment: string[];
          id: string;
          is_public: boolean;
          media_url: string | null;
          sport_id: number | null;
          steps: string[];
          team_id: string | null;
          title: string;
          updated_at: string;
        };
        Insert: {
          author_id?: string | null;
          board_field_mode?: string | null;
          board_state?: Json | null;
          category_id: number;
          created_at?: string;
          description?: string | null;
          difficulty?: Difficulty | null;
          duration_min?: number | null;
          equipment?: string[];
          id?: string;
          is_public?: boolean;
          media_url?: string | null;
          sport_id?: number | null;
          steps?: string[];
          team_id?: string | null;
          title: string;
          updated_at?: string;
        };
        Update: {
          author_id?: string | null;
          board_field_mode?: string | null;
          board_state?: Json | null;
          category_id?: number;
          created_at?: string;
          description?: string | null;
          difficulty?: Difficulty | null;
          duration_min?: number | null;
          equipment?: string[];
          id?: string;
          is_public?: boolean;
          media_url?: string | null;
          sport_id?: number | null;
          steps?: string[];
          team_id?: string | null;
          title?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "exercises_author_id_fkey";
            columns: ["author_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "exercises_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "exercises_sport_id_fkey";
            columns: ["sport_id"];
            isOneToOne: false;
            referencedRelation: "sports";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "exercises_team_id_fkey";
            columns: ["team_id"];
            isOneToOne: false;
            referencedRelation: "teams";
            referencedColumns: ["id"];
          },
        ];
      };
      positions: {
        Row: {
          code: string;
          id: string;
          label: string;
          sort_order: number;
          sport_id: number;
        };
        Insert: {
          code: string;
          id?: string;
          label: string;
          sort_order?: number;
          sport_id: number;
        };
        Update: {
          code?: string;
          id?: string;
          label?: string;
          sort_order?: number;
          sport_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "positions_sport_id_fkey";
            columns: ["sport_id"];
            isOneToOne: false;
            referencedRelation: "sports";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: {
          active_team_id: string | null;
          avatar_url: string | null;
          club_name: string | null;
          created_at: string;
          display_name: string;
          id: string;
          onboarding_completed: boolean;
        };
        Insert: {
          active_team_id?: string | null;
          avatar_url?: string | null;
          club_name?: string | null;
          created_at?: string;
          display_name: string;
          id: string;
          onboarding_completed?: boolean;
        };
        Update: {
          active_team_id?: string | null;
          avatar_url?: string | null;
          club_name?: string | null;
          created_at?: string;
          display_name?: string;
          id?: string;
          onboarding_completed?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_active_team_id_fkey";
            columns: ["active_team_id"];
            isOneToOne: false;
            referencedRelation: "teams";
            referencedColumns: ["id"];
          },
        ];
      };
      sports: {
        Row: {
          id: number;
          name_en: string;
          name_pl: string;
          slug: string;
        };
        Insert: {
          id?: number;
          name_en: string;
          name_pl: string;
          slug: string;
        };
        Update: {
          id?: number;
          name_en?: string;
          name_pl?: string;
          slug?: string;
        };
        Relationships: [];
      };
      team_invites: {
        Row: {
          created_at: string;
          created_by: string;
          expires_at: string;
          id: string;
          revoked_at: string | null;
          team_id: string;
          token: string;
        };
        Insert: {
          created_at?: string;
          created_by: string;
          expires_at?: string;
          id?: string;
          revoked_at?: string | null;
          team_id: string;
          token?: string;
        };
        Update: {
          created_at?: string;
          created_by?: string;
          expires_at?: string;
          id?: string;
          revoked_at?: string | null;
          team_id?: string;
          token?: string;
        };
        Relationships: [
          {
            foreignKeyName: "team_invites_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "team_invites_team_id_fkey";
            columns: ["team_id"];
            isOneToOne: false;
            referencedRelation: "teams";
            referencedColumns: ["id"];
          },
        ];
      };
      team_members: {
        Row: {
          joined_at: string;
          role: TeamRole;
          team_id: string;
          user_id: string;
        };
        Insert: {
          joined_at?: string;
          role: TeamRole;
          team_id: string;
          user_id: string;
        };
        Update: {
          joined_at?: string;
          role?: TeamRole;
          team_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "team_members_team_id_fkey";
            columns: ["team_id"];
            isOneToOne: false;
            referencedRelation: "teams";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "team_members_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      teams: {
        Row: {
          created_at: string;
          created_by: string;
          id: string;
          name: string;
          short_name: string;
        };
        Insert: {
          created_at?: string;
          created_by: string;
          id?: string;
          name: string;
          short_name: string;
        };
        Update: {
          created_at?: string;
          created_by?: string;
          id?: string;
          name?: string;
          short_name?: string;
        };
        Relationships: [
          {
            foreignKeyName: "teams_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      workout_items: {
        Row: {
          assigned_to: string | null;
          duration_min: number | null;
          exercise_id: string;
          id: string;
          position: number;
          section: WorkoutSection;
          workout_id: string;
        };
        Insert: {
          assigned_to?: string | null;
          duration_min?: number | null;
          exercise_id: string;
          id?: string;
          position: number;
          section: WorkoutSection;
          workout_id: string;
        };
        Update: {
          assigned_to?: string | null;
          duration_min?: number | null;
          exercise_id?: string;
          id?: string;
          position?: number;
          section?: WorkoutSection;
          workout_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "workout_items_exercise_id_fkey";
            columns: ["exercise_id"];
            isOneToOne: false;
            referencedRelation: "exercises";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "workout_items_workout_id_fkey";
            columns: ["workout_id"];
            isOneToOne: false;
            referencedRelation: "workouts";
            referencedColumns: ["id"];
          },
        ];
      };
      workouts: {
        Row: {
          created_at: string;
          id: string;
          is_public: boolean;
          last_edited_by: string | null;
          notes: string | null;
          owner_id: string;
          scheduled_for: string | null;
          share_id: string;
          team_id: string | null;
          team_name: string | null;
          title: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          is_public?: boolean;
          last_edited_by?: string | null;
          notes?: string | null;
          owner_id: string;
          scheduled_for?: string | null;
          share_id?: string;
          team_id?: string | null;
          team_name?: string | null;
          title: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          is_public?: boolean;
          last_edited_by?: string | null;
          notes?: string | null;
          owner_id?: string;
          scheduled_for?: string | null;
          share_id?: string;
          team_id?: string | null;
          team_name?: string | null;
          title?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "workouts_last_edited_by_fkey";
            columns: ["last_edited_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "workouts_owner_id_fkey";
            columns: ["owner_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "workouts_team_id_fkey";
            columns: ["team_id"];
            isOneToOne: false;
            referencedRelation: "teams";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      duplicate_workout: {
        Args: { p_workout_id: string };
        Returns: Database["public"]["Tables"]["workouts"]["Row"];
      };
      generate_share_id: { Args: never; Returns: string };
      get_invite_preview: { Args: { p_token: string }; Returns: InvitePreview | null };
      get_shared_workout: { Args: { p_share_id: string }; Returns: SharedWorkoutPayload | null };
      is_pseudonym_available: {
        Args: { p_display_name: string };
        Returns: boolean;
      };
      is_team_head_coach: { Args: { p_team_id: string }; Returns: boolean };
      is_team_member: { Args: { p_team_id: string }; Returns: boolean };
      join_team_with_token: { Args: { p_token: string }; Returns: JoinTeamResult };
      list_public_profiles: {
        Args: never;
        Returns: {
          display_name: string;
          id: string;
          team_roles: TeamRoleEntry[];
        }[];
      };
      my_team_ids: { Args: never; Returns: string[] };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;

export type Exercise = Database["public"]["Tables"]["exercises"]["Row"];
export type Category = Database["public"]["Tables"]["categories"]["Row"];
export type Sport = Database["public"]["Tables"]["sports"]["Row"];
export type Position = Database["public"]["Tables"]["positions"]["Row"];
export type ExercisePosition =
  Database["public"]["Tables"]["exercise_positions"]["Row"];
export type Workout = Database["public"]["Tables"]["workouts"]["Row"];
export type WorkoutItem = Database["public"]["Tables"]["workout_items"]["Row"];
export type Team = Database["public"]["Tables"]["teams"]["Row"];
export type TeamMember = Database["public"]["Tables"]["team_members"]["Row"];
export type TeamInvite = Database["public"]["Tables"]["team_invites"]["Row"];

// Shape returned by the list_public_profiles() RPC - the only channel
// through which a coach can see another coach's attribution (see
// supabase/migrations/20260712100000_coach_pseudonyms.sql). Never carries
// email, club_name, or avatar_url. team_roles only ever lists teams shared
// with the caller (see
// supabase/migrations/20260729101241_list_public_profiles_team_roles.sql),
// not every team the profile belongs to.
export interface PublicProfile {
  id: string;
  display_name: string;
  team_roles: TeamRoleEntry[];
}

// Shape returned by the get_shared_workout() RPC (see
// supabase/migrations/20260709100400_shared_workout_exercise_details.sql).
// exercise is null only if the item's exercise row was somehow removed -
// the FK normally prevents this, but the left join guards against it.
export interface SharedWorkoutItem {
  id: string;
  workout_id: string;
  exercise_id: string;
  section: WorkoutSection;
  position: number;
  duration_min: number | null;
  assigned_to: string | null;
  exercise: {
    id: string;
    title: string;
    description: string | null;
    steps: string[];
    equipment: string[];
    media_url: string | null;
  } | null;
}

export interface SharedWorkoutPayload {
  workout: Workout;
  items: SharedWorkoutItem[];
}

// Shape returned by the get_invite_preview() RPC (see
// supabase/migrations/20260728133850_team_support.sql). Null when the token
// doesn't match any team_invites row; `valid` reflects revoked_at/expires_at
// so the join page can distinguish "no such invite" from "invite exists but
// is dead" before the visitor commits to anything.
export interface InvitePreview {
  team_name: string;
  short_name: string;
  valid: boolean;
}

// Shape returned by the join_team_with_token() RPC. Joining twice is a
// no-op that still reports ok: true (see the migration's ON CONFLICT DO
// NOTHING), not an error - re-running the join is always safe to call.
export type JoinTeamResult =
  | { ok: true; team_id: string }
  | {
      ok: false;
      reason: "not_found" | "expired" | "revoked" | "not_authenticated";
    };

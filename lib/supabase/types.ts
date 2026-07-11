export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Difficulty = 1 | 2 | 3 | 4 | 5;

export type WorkoutSection = "warmup" | "main" | "positional" | "cooldown";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          display_name: string;
          club_name: string | null;
          avatar_url: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          display_name: string;
          club_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          display_name?: string;
          club_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      categories: {
        Row: {
          id: number;
          slug: string;
          name_pl: string;
          name_en: string;
        };
        Insert: {
          id?: number;
          slug: string;
          name_pl: string;
          name_en: string;
        };
        Update: {
          id?: number;
          slug?: string;
          name_pl?: string;
          name_en?: string;
        };
        Relationships: [];
      };
      sports: {
        Row: {
          id: number;
          slug: string;
          name_pl: string;
          name_en: string;
        };
        Insert: {
          id?: number;
          slug: string;
          name_pl: string;
          name_en: string;
        };
        Update: {
          id?: number;
          slug?: string;
          name_pl?: string;
          name_en?: string;
        };
        Relationships: [];
      };
      exercises: {
        Row: {
          id: string;
          author_id: string | null;
          category_id: number;
          sport_id: number;
          title: string;
          description: string | null;
          steps: string[];
          duration_min: number | null;
          difficulty: Difficulty | null;
          equipment: string[];
          media_url: string | null;
          board_state: Json | null;
          is_public: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          author_id?: string | null;
          category_id: number;
          sport_id: number;
          title: string;
          description?: string | null;
          steps?: string[];
          duration_min?: number | null;
          difficulty?: Difficulty | null;
          equipment?: string[];
          media_url?: string | null;
          board_state?: Json | null;
          is_public?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          author_id?: string | null;
          category_id?: number;
          sport_id?: number;
          title?: string;
          description?: string | null;
          steps?: string[];
          duration_min?: number | null;
          difficulty?: Difficulty | null;
          equipment?: string[];
          media_url?: string | null;
          board_state?: Json | null;
          is_public?: boolean;
          created_at?: string;
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
        ];
      };
      workouts: {
        Row: {
          id: string;
          owner_id: string;
          title: string;
          team_name: string | null;
          scheduled_for: string | null;
          notes: string | null;
          share_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          owner_id: string;
          title: string;
          team_name?: string | null;
          scheduled_for?: string | null;
          notes?: string | null;
          share_id?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          owner_id?: string;
          title?: string;
          team_name?: string | null;
          scheduled_for?: string | null;
          notes?: string | null;
          share_id?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "workouts_owner_id_fkey";
            columns: ["owner_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      workout_items: {
        Row: {
          id: string;
          workout_id: string;
          exercise_id: string;
          section: WorkoutSection;
          position: number;
          duration_min: number | null;
          assigned_to: string | null;
        };
        Insert: {
          id?: string;
          workout_id: string;
          exercise_id: string;
          section: WorkoutSection;
          position: number;
          duration_min?: number | null;
          assigned_to?: string | null;
        };
        Update: {
          id?: string;
          workout_id?: string;
          exercise_id?: string;
          section?: WorkoutSection;
          position?: number;
          duration_min?: number | null;
          assigned_to?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "workout_items_workout_id_fkey";
            columns: ["workout_id"];
            isOneToOne: false;
            referencedRelation: "workouts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "workout_items_exercise_id_fkey";
            columns: ["exercise_id"];
            isOneToOne: false;
            referencedRelation: "exercises";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: {
      get_shared_workout: {
        Args: { p_share_id: string };
        Returns: SharedWorkoutPayload | null;
      };
      duplicate_workout: {
        Args: { p_workout_id: string };
        Returns: Database["public"]["Tables"]["workouts"]["Row"];
      };
    };
    Enums: Record<string, never>;
  };
}

export type Exercise = Database["public"]["Tables"]["exercises"]["Row"];
export type Category = Database["public"]["Tables"]["categories"]["Row"];
export type Sport = Database["public"]["Tables"]["sports"]["Row"];
export type Workout = Database["public"]["Tables"]["workouts"]["Row"];
export type WorkoutItem = Database["public"]["Tables"]["workout_items"]["Row"];

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

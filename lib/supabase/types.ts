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
      exercises: {
        Row: {
          id: string;
          author_id: string | null;
          category_id: number;
          title: string;
          description: string | null;
          steps: string[];
          duration_min: number | null;
          difficulty: Difficulty | null;
          equipment: string[];
          media_url: string | null;
          is_public: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          author_id?: string | null;
          category_id: number;
          title: string;
          description?: string | null;
          steps?: string[];
          duration_min?: number | null;
          difficulty?: Difficulty | null;
          equipment?: string[];
          media_url?: string | null;
          is_public?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          author_id?: string | null;
          category_id?: number;
          title?: string;
          description?: string | null;
          steps?: string[];
          duration_min?: number | null;
          difficulty?: Difficulty | null;
          equipment?: string[];
          media_url?: string | null;
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
        Returns: Json;
      };
    };
    Enums: Record<string, never>;
  };
}

export type Exercise = Database["public"]["Tables"]["exercises"]["Row"];
export type Category = Database["public"]["Tables"]["categories"]["Row"];

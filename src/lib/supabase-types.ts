export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      characters: {
        Row: {
          background: Database["public"]["Enums"]["backgrounds"]
          biography: string
          class: Database["public"]["Enums"]["class"]
          created_at: string
          creator_id: string
          game_id: string
          id: string
          inventory: Json[]
          race: Database["public"]["Enums"]["race"]
          skills: Database["public"]["Enums"]["skills"][]
          stats: Json
        }
        Insert: {
          background: Database["public"]["Enums"]["backgrounds"]
          biography: string
          class: Database["public"]["Enums"]["class"]
          created_at?: string
          creator_id: string
          game_id: string
          id?: string
          inventory: Json[]
          race: Database["public"]["Enums"]["race"]
          skills: Database["public"]["Enums"]["skills"][]
          stats: Json
        }
        Update: {
          background?: Database["public"]["Enums"]["backgrounds"]
          biography?: string
          class?: Database["public"]["Enums"]["class"]
          created_at?: string
          creator_id?: string
          game_id?: string
          id?: string
          inventory?: Json[]
          race?: Database["public"]["Enums"]["race"]
          skills?: Database["public"]["Enums"]["skills"][]
          stats?: Json
        }
        Relationships: [
          {
            foreignKeyName: "characters_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "characters_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
        ]
      }
      games: {
        Row: {
          chat_log: Json[]
          created_at: string
          id: string
          initial_player: string
        }
        Insert: {
          chat_log: Json[]
          created_at?: string
          id?: string
          initial_player: string
        }
        Update: {
          chat_log?: Json[]
          created_at?: string
          id?: string
          initial_player?: string
        }
        Relationships: [
          {
            foreignKeyName: "games_initial_player_fkey"
            columns: ["initial_player"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      players: {
        Row: {
          created_at: string
          id: number
          room_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          room_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          room_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "players_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "players_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      rooms: {
        Row: {
          created_at: string
          game_id: string
          host: string
          id: string
        }
        Insert: {
          created_at?: string
          game_id: string
          host: string
          id?: string
        }
        Update: {
          created_at?: string
          game_id?: string
          host?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "rooms_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rooms_game_id_fkey1"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rooms_host_fkey"
            columns: ["host"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rooms_host_fkey1"
            columns: ["host"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          id: string
          username: string
        }
        Insert: {
          created_at?: string
          id: string
          username: string
        }
        Update: {
          created_at?: string
          id?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "players_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      alignment:
        | "lawful good"
        | "neutral good"
        | "chaotic good"
        | "lawful neutral"
        | "neutral"
        | "chaotic neutral"
        | "lawful evil"
        | "neutral evil"
        | "chaotic evil"
      backgrounds: "soldier" | "criminal" | "sage" | "acolyte" | "entertainer"
      class:
        | "fighter"
        | "wizard"
        | "rogue"
        | "cleric"
        | "paladin"
        | "barbarian"
        | "sorcerer"
        | "druid"
        | "ranger"
        | "monk"
        | "bard"
      race: "human" | "elf" | "dwarf" | "halfling" | "tiefling"
      skills:
        | "perception"
        | "stealth"
        | "athletics"
        | "persuasion"
        | "arcana"
        | "intimidation"
        | "investigation"
        | "insight"
        | "survival"
        | "deception"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

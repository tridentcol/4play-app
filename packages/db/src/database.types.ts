export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      blocks: {
        Row: {
          blocked_id: string
          blocker_id: string
          created_at: string | null
          id: string
          reason: string | null
        }
        Insert: {
          blocked_id: string
          blocker_id: string
          created_at?: string | null
          id?: string
          reason?: string | null
        }
        Update: {
          blocked_id?: string
          blocker_id?: string
          created_at?: string | null
          id?: string
          reason?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blocks_blocked_id_fkey"
            columns: ["blocked_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blocks_blocker_id_fkey"
            columns: ["blocker_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          booker_id: string
          cancelled_at: string | null
          court_id: string
          created_at: string | null
          end_at: string
          id: string
          match_id: string | null
          notes: string | null
          participants: string[] | null
          platform_fee: number
          start_at: string
          status: Database["public"]["Enums"]["booking_status"] | null
          total_amount: number
        }
        Insert: {
          booker_id: string
          cancelled_at?: string | null
          court_id: string
          created_at?: string | null
          end_at: string
          id?: string
          match_id?: string | null
          notes?: string | null
          participants?: string[] | null
          platform_fee?: number
          start_at: string
          status?: Database["public"]["Enums"]["booking_status"] | null
          total_amount: number
        }
        Update: {
          booker_id?: string
          cancelled_at?: string | null
          court_id?: string
          created_at?: string | null
          end_at?: string
          id?: string
          match_id?: string | null
          notes?: string | null
          participants?: string[] | null
          platform_fee?: number
          start_at?: string
          status?: Database["public"]["Enums"]["booking_status"] | null
          total_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "bookings_booker_id_fkey"
            columns: ["booker_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_court_id_fkey"
            columns: ["court_id"]
            isOneToOne: false
            referencedRelation: "courts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          created_at: string | null
          id: string
          last_message_at: string | null
          last_message_preview: string | null
          match_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          last_message_at?: string | null
          last_message_preview?: string | null
          match_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          last_message_at?: string | null
          last_message_preview?: string | null
          match_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversations_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: true
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
        ]
      }
      courts: {
        Row: {
          created_at: string | null
          has_lighting: boolean | null
          id: string
          is_active: boolean | null
          is_indoor: boolean | null
          name: string
          price_per_hour: number
          sport: Database["public"]["Enums"]["sport"]
          surface: Database["public"]["Enums"]["surface_type"] | null
          venue_id: string
        }
        Insert: {
          created_at?: string | null
          has_lighting?: boolean | null
          id?: string
          is_active?: boolean | null
          is_indoor?: boolean | null
          name: string
          price_per_hour: number
          sport: Database["public"]["Enums"]["sport"]
          surface?: Database["public"]["Enums"]["surface_type"] | null
          venue_id: string
        }
        Update: {
          created_at?: string | null
          has_lighting?: boolean | null
          id?: string
          is_active?: boolean | null
          is_indoor?: boolean | null
          name?: string
          price_per_hour?: number
          sport?: Database["public"]["Enums"]["sport"]
          surface?: Database["public"]["Enums"]["surface_type"] | null
          venue_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "courts_venue_id_fkey"
            columns: ["venue_id"]
            isOneToOne: false
            referencedRelation: "venues"
            referencedColumns: ["id"]
          },
        ]
      }
      matches: {
        Row: {
          created_at: string | null
          id: string
          profile_a: string
          profile_b: string
          sport: Database["public"]["Enums"]["sport"]
          unmatched_at: string | null
          unmatched_by: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          profile_a: string
          profile_b: string
          sport: Database["public"]["Enums"]["sport"]
          unmatched_at?: string | null
          unmatched_by?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          profile_a?: string
          profile_b?: string
          sport?: Database["public"]["Enums"]["sport"]
          unmatched_at?: string | null
          unmatched_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "matches_profile_a_fkey"
            columns: ["profile_a"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_profile_b_fkey"
            columns: ["profile_b"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_unmatched_by_fkey"
            columns: ["unmatched_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          attachments: Json | null
          body: string
          conversation_id: string
          created_at: string | null
          id: string
          read_at: string | null
          sender_id: string
        }
        Insert: {
          attachments?: Json | null
          body: string
          conversation_id: string
          created_at?: string | null
          id?: string
          read_at?: string | null
          sender_id: string
        }
        Update: {
          attachments?: Json | null
          body?: string
          conversation_id?: string
          created_at?: string | null
          id?: string
          read_at?: string | null
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string | null
          currency: string
          id: string
          payment_method: string | null
          profile_id: string
          purpose: string
          raw_response: Json | null
          reference_id: string
          updated_at: string | null
          wompi_status: Database["public"]["Enums"]["payment_status"] | null
          wompi_transaction_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          currency?: string
          id?: string
          payment_method?: string | null
          profile_id: string
          purpose: string
          raw_response?: Json | null
          reference_id: string
          updated_at?: string | null
          wompi_status?: Database["public"]["Enums"]["payment_status"] | null
          wompi_transaction_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          currency?: string
          id?: string
          payment_method?: string | null
          profile_id?: string
          purpose?: string
          raw_response?: Json | null
          reference_id?: string
          updated_at?: string | null
          wompi_status?: Database["public"]["Enums"]["payment_status"] | null
          wompi_transaction_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      player_sports: {
        Row: {
          created_at: string | null
          id: string
          is_primary: boolean | null
          level: number
          profile_id: string
          sport: Database["public"]["Enums"]["sport"]
          years_playing: number | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_primary?: boolean | null
          level: number
          profile_id: string
          sport: Database["public"]["Enums"]["sport"]
          years_playing?: number | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_primary?: boolean | null
          level?: number
          profile_id?: string
          sport?: Database["public"]["Enums"]["sport"]
          years_playing?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "player_sports_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          availability: Json | null
          bio: string | null
          birthdate: string | null
          city: string | null
          created_at: string | null
          deleted_at: string | null
          favorite_venues: string[] | null
          full_name: string
          gender: Database["public"]["Enums"]["gender_type"] | null
          id: string
          is_active: boolean | null
          is_verified: boolean | null
          last_seen_at: string | null
          location: unknown
          neighborhood: string | null
          photos: string[] | null
          primary_photo_idx: number | null
          updated_at: string | null
          username: string
        }
        Insert: {
          availability?: Json | null
          bio?: string | null
          birthdate?: string | null
          city?: string | null
          created_at?: string | null
          deleted_at?: string | null
          favorite_venues?: string[] | null
          full_name: string
          gender?: Database["public"]["Enums"]["gender_type"] | null
          id: string
          is_active?: boolean | null
          is_verified?: boolean | null
          last_seen_at?: string | null
          location?: unknown
          neighborhood?: string | null
          photos?: string[] | null
          primary_photo_idx?: number | null
          updated_at?: string | null
          username: string
        }
        Update: {
          availability?: Json | null
          bio?: string | null
          birthdate?: string | null
          city?: string | null
          created_at?: string | null
          deleted_at?: string | null
          favorite_venues?: string[] | null
          full_name?: string
          gender?: Database["public"]["Enums"]["gender_type"] | null
          id?: string
          is_active?: boolean | null
          is_verified?: boolean | null
          last_seen_at?: string | null
          location?: unknown
          neighborhood?: string | null
          photos?: string[] | null
          primary_photo_idx?: number | null
          updated_at?: string | null
          username?: string
        }
        Relationships: []
      }
      push_tokens: {
        Row: {
          created_at: string | null
          device_id: string | null
          id: string
          platform: string
          profile_id: string
          token: string
        }
        Insert: {
          created_at?: string | null
          device_id?: string | null
          id?: string
          platform: string
          profile_id: string
          token: string
        }
        Update: {
          created_at?: string | null
          device_id?: string | null
          id?: string
          platform?: string
          profile_id?: string
          token?: string
        }
        Relationships: [
          {
            foreignKeyName: "push_tokens_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      reports: {
        Row: {
          context: string | null
          created_at: string | null
          id: string
          message_id: string | null
          reason: Database["public"]["Enums"]["report_reason"]
          reported_id: string
          reporter_id: string
          status: Database["public"]["Enums"]["report_status"] | null
        }
        Insert: {
          context?: string | null
          created_at?: string | null
          id?: string
          message_id?: string | null
          reason: Database["public"]["Enums"]["report_reason"]
          reported_id: string
          reporter_id: string
          status?: Database["public"]["Enums"]["report_status"] | null
        }
        Update: {
          context?: string | null
          created_at?: string | null
          id?: string
          message_id?: string | null
          reason?: Database["public"]["Enums"]["report_reason"]
          reported_id?: string
          reporter_id?: string
          status?: Database["public"]["Enums"]["report_status"] | null
        }
        Relationships: [
          {
            foreignKeyName: "reports_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reports_reported_id_fkey"
            columns: ["reported_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reports_reporter_id_fkey"
            columns: ["reporter_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          cancel_at_period_end: boolean | null
          created_at: string | null
          current_period_end: string | null
          current_period_start: string | null
          id: string
          plan: string | null
          profile_id: string
          status: Database["public"]["Enums"]["subscription_status"] | null
          trial_ends_at: string | null
          updated_at: string | null
          wompi_subscription_id: string | null
        }
        Insert: {
          cancel_at_period_end?: boolean | null
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan?: string | null
          profile_id: string
          status?: Database["public"]["Enums"]["subscription_status"] | null
          trial_ends_at?: string | null
          updated_at?: string | null
          wompi_subscription_id?: string | null
        }
        Update: {
          cancel_at_period_end?: boolean | null
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan?: string | null
          profile_id?: string
          status?: Database["public"]["Enums"]["subscription_status"] | null
          trial_ends_at?: string | null
          updated_at?: string | null
          wompi_subscription_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      swipes: {
        Row: {
          created_at: string | null
          direction: Database["public"]["Enums"]["swipe_direction"]
          id: string
          sport_context: Database["public"]["Enums"]["sport"] | null
          swiped_id: string
          swiper_id: string
        }
        Insert: {
          created_at?: string | null
          direction: Database["public"]["Enums"]["swipe_direction"]
          id?: string
          sport_context?: Database["public"]["Enums"]["sport"] | null
          swiped_id: string
          swiper_id: string
        }
        Update: {
          created_at?: string | null
          direction?: Database["public"]["Enums"]["swipe_direction"]
          id?: string
          sport_context?: Database["public"]["Enums"]["sport"] | null
          swiped_id?: string
          swiper_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "swipes_swiped_id_fkey"
            columns: ["swiped_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "swipes_swiper_id_fkey"
            columns: ["swiper_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      venues: {
        Row: {
          address: string | null
          amenities: string[] | null
          city: string
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          is_partner: boolean | null
          location: unknown
          name: string
          neighborhood: string | null
          opening_hours: Json | null
          phone: string | null
          photos: string[] | null
          slug: string
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          amenities?: string[] | null
          city?: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_partner?: boolean | null
          location?: unknown
          name: string
          neighborhood?: string | null
          opening_hours?: Json | null
          phone?: string | null
          photos?: string[] | null
          slug: string
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          amenities?: string[] | null
          city?: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_partner?: boolean | null
          location?: unknown
          name?: string
          neighborhood?: string | null
          opening_hours?: Json | null
          phone?: string | null
          photos?: string[] | null
          slug?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      nearby_profiles: {
        Args: {
          p_lat: number
          p_limit?: number
          p_lon: number
          p_max_level?: number
          p_min_level?: number
          p_radius_km?: number
          p_sport?: Database["public"]["Enums"]["sport"]
        }
        Returns: {
          distance_km: number
          full_name: string
          id: string
          level: number
          neighborhood: string
          photos: string[]
          username: string
        }[]
      }
      nearby_venues: {
        Args: {
          p_lat: number
          p_limit?: number
          p_lon: number
          p_radius_km?: number
          p_sport?: Database["public"]["Enums"]["sport"]
        }
        Returns: {
          distance_km: number
          has_sport: boolean
          id: string
          min_price: number
          name: string
          neighborhood: string
          photos: string[]
          slug: string
        }[]
      }
    }
    Enums: {
      booking_status: "pending" | "confirmed" | "cancelled" | "completed"
      gender_type: "male" | "female" | "other" | "prefer_not"
      payment_status: "PENDING" | "APPROVED" | "DECLINED" | "VOIDED" | "ERROR"
      report_reason:
        | "spam"
        | "harassment"
        | "fake"
        | "inappropriate_content"
        | "other"
      report_status: "pending" | "reviewed" | "actioned" | "dismissed"
      sport: "tennis" | "padel"
      subscription_status:
        | "trialing"
        | "active"
        | "past_due"
        | "cancelled"
        | "expired"
      surface_type: "clay" | "hard" | "grass" | "crystal" | "resin"
      swipe_direction: "like" | "dislike" | "super"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      booking_status: ["pending", "confirmed", "cancelled", "completed"],
      gender_type: ["male", "female", "other", "prefer_not"],
      payment_status: ["PENDING", "APPROVED", "DECLINED", "VOIDED", "ERROR"],
      report_reason: [
        "spam",
        "harassment",
        "fake",
        "inappropriate_content",
        "other",
      ],
      report_status: ["pending", "reviewed", "actioned", "dismissed"],
      sport: ["tennis", "padel"],
      subscription_status: [
        "trialing",
        "active",
        "past_due",
        "cancelled",
        "expired",
      ],
      surface_type: ["clay", "hard", "grass", "crystal", "resin"],
      swipe_direction: ["like", "dislike", "super"],
    },
  },
} as const

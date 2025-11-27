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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      customers: {
        Row: {
          id: string
          gender: Database["public"]["Enums"]["gender_enum"] | null
          age: number | null
          seniorcitizen: boolean | null
          tenure: number | null
          plantype: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          gender?: Database["public"]["Enums"]["gender_enum"] | null
          age?: number | null
          seniorcitizen?: boolean | null
          tenure?: number | null
          plantype?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          gender?: Database["public"]["Enums"]["gender_enum"] | null
          age?: number | null
          seniorcitizen?: boolean | null
          tenure?: number | null
          plantype?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      ,
      profiles: {
        Row: {
          created_at: string
          email: string
          full_name: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email: string
          full_name?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      ,
      predictions: {
        Row: {
          id: string
          user_id: string
          features: Json
          prediction: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          features: Json
          prediction: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          features?: Json
          prediction?: number
          created_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      ,
      users: {
        Row: {
          id: string
          user_id: string
          customer_id: string | null
          gender: Database["public"]["Enums"]["gender_enum"] | null
          age: number | null
          senior_citizen: boolean | null
          tenure: number | null
          plan_type: string | null
          monthly_charges: number | null
          total_charges: number | null
          home_internet: boolean | null
          mobile_device: boolean | null
          phone_service: boolean | null
          multiple_products: boolean | null
          family_members: number | null
          online_security: boolean | null
          online_backup: boolean | null
          device_protection: boolean | null
          tech_support: boolean | null
          additional_services: string | null
          streaming_tv: boolean | null
          streaming_movies: boolean | null
          contract: Database["public"]["Enums"]["contract_enum"] | null
          paperless_billing: boolean | null
          payment_method: Database["public"]["Enums"]["payment_method_enum"] | null
          fcr_last_call: boolean | null
          time_to_solve_minutes: number | null
          customer_complaints: number | null
          it_tickets_raised: number | null
          churn: boolean | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          customer_id?: string | null
          gender?: Database["public"]["Enums"]["gender_enum"] | null
          age?: number | null
          senior_citizen?: boolean | null
          tenure?: number | null
          plan_type?: string | null
          monthly_charges?: number | null
          total_charges?: number | null
          home_internet?: boolean | null
          mobile_device?: boolean | null
          phone_service?: boolean | null
          multiple_products?: boolean | null
          family_members?: number | null
          online_security?: boolean | null
          online_backup?: boolean | null
          device_protection?: boolean | null
          tech_support?: boolean | null
          additional_services?: string | null
          streaming_tv?: boolean | null
          streaming_movies?: boolean | null
          contract?: Database["public"]["Enums"]["contract_enum"] | null
          paperless_billing?: boolean | null
          payment_method?: Database["public"]["Enums"]["payment_method_enum"] | null
          fcr_last_call?: boolean | null
          time_to_solve_minutes?: number | null
          customer_complaints?: number | null
          it_tickets_raised?: number | null
          churn?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          customer_id?: string | null
          gender?: Database["public"]["Enums"]["gender_enum"] | null
          age?: number | null
          senior_citizen?: boolean | null
          tenure?: number | null
          plan_type?: string | null
          monthly_charges?: number | null
          total_charges?: number | null
          home_internet?: boolean | null
          mobile_device?: boolean | null
          phone_service?: boolean | null
          multiple_products?: boolean | null
          family_members?: number | null
          online_security?: boolean | null
          online_backup?: boolean | null
          device_protection?: boolean | null
          tech_support?: boolean | null
          additional_services?: string | null
          streaming_tv?: boolean | null
          streaming_movies?: boolean | null
          contract?: Database["public"]["Enums"]["contract_enum"] | null
          paperless_billing?: boolean | null
          payment_method?: Database["public"]["Enums"]["payment_method_enum"] | null
          fcr_last_call?: boolean | null
          time_to_solve_minutes?: number | null
          customer_complaints?: number | null
          it_tickets_raised?: number | null
          churn?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "user" | "admin" | "cse_expert"
      ,
      gender_enum: "male" | "female"
      ,
      contract_enum: "month_to_month" | "one_year" | "two_year"
      ,
      payment_method_enum: "electronic_check" | "mailed_check" | "bank_transfer" | "credit_card"
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
      app_role: ["user", "admin", "cse_expert"],
    },
    Tables: {
      customers: true,
      profiles: true,
      user_roles: true,
      predictions: true,
    },
  },
} as const

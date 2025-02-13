export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          name: string
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          sort_order?: number
          created_at?: string
        }
      }
      products: {
        Row: {
          id: string
          category_id: string
          name: string
          price: number
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          category_id: string
          name: string
          price?: number
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          category_id?: string
          name?: string
          price?: number
          sort_order?: number
          created_at?: string
        }
      }
      product_options: {
        Row: {
          id: string
          product_id: string
          name: string
          price: number
          option_type: string
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          product_id: string
          name: string
          price?: number
          option_type: string
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          name?: string
          price?: number
          option_type?: string
          sort_order?: number
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

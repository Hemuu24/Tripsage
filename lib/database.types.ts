// Database type definitions for TypeScript

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          full_name: string | null
          bio: string | null
          avatar_url: string | null
          location: string | null
          travel_style: string | null
          languages: string[] | null
          interests: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username?: string | null
          full_name?: string | null
          bio?: string | null
          avatar_url?: string | null
          location?: string | null
          travel_style?: string | null
          languages?: string[] | null
          interests?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          full_name?: string | null
          bio?: string | null
          avatar_url?: string | null
          location?: string | null
          travel_style?: string | null
          languages?: string[] | null
          interests?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      posts: {
        Row: {
          id: string
          user_id: string
          title: string
          content: string
          images: string[] | null
          location: string | null
          tags: string[] | null
          trip_dates: {
            start_date: string | null
            end_date: string | null
          } | null
          looking_for_companions: boolean
          max_companions: number | null
          likes_count: number
          comments_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          content: string
          images?: string[] | null
          location?: string | null
          tags?: string[] | null
          trip_dates?: {
            start_date: string | null
            end_date: string | null
          } | null
          looking_for_companions?: boolean
          max_companions?: number | null
          likes_count?: number
          comments_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          content?: string
          images?: string[] | null
          location?: string | null
          tags?: string[] | null
          trip_dates?: {
            start_date: string | null
            end_date: string | null
          } | null
          looking_for_companions?: boolean
          max_companions?: number | null
          likes_count?: number
          comments_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      post_likes: {
        Row: {
          id: string
          post_id: string
          user_id: string
          created_at: string
        }
        Insert: {
          id?: string
          post_id: string
          user_id: string
          created_at?: string
        }
        Update: {
          id?: string
          post_id?: string
          user_id?: string
          created_at?: string
        }
      }
      comments: {
        Row: {
          id: string
          post_id: string
          user_id: string
          content: string
          parent_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          post_id: string
          user_id: string
          content: string
          parent_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          post_id?: string
          user_id?: string
          content?: string
          parent_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      trip_companions: {
        Row: {
          id: string
          post_id: string
          user_id: string
          status: 'pending' | 'accepted' | 'declined'
          message: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          post_id: string
          user_id: string
          status?: 'pending' | 'accepted' | 'declined'
          message?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          post_id?: string
          user_id?: string
          status?: 'pending' | 'accepted' | 'declined'
          message?: string | null
          created_at?: string
          updated_at?: string
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

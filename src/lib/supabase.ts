import { createClient } from '@supabase/supabase-js'

// 環境変数を取得
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// デバッグ情報を詳細に出力
console.log('=== Supabase Environment Variables ===')
console.log('Raw URL from env:', supabaseUrl)
console.log('Raw Key exists:', !!supabaseAnonKey)

// ハードコーディングでテスト（一時的）
const hardcodedUrl = 'https://osvdawblkzasztccimib.supabase.co'
const hardcodedKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zdmRhd2Jsa3phc3p0Y2NpbWliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1NzUxODgsImV4cCI6MjA2NjE1MTE4OH0.WSzM3FGfiuxhjgAyF1KacZj2DIBJAecFFILRFPAAPAM'

console.log('Using hardcoded values for testing')
console.log('Hardcoded URL:', hardcodedUrl)

// 一時的にハードコーディングした値を使用
export const supabase = createClient(hardcodedUrl, hardcodedKey)

export interface Task {
  id: number
  title: string
  description?: string
  completed: boolean
  created_at: string
}

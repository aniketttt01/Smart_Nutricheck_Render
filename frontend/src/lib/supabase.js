import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn('Supabase credentials not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY')
}

export const supabase = createClient(SUPABASE_URL || '', SUPABASE_ANON_KEY || '')

// Helper function to upload image
export async function uploadImage(file, userId, analysisId) {
  const fileExt = file.name.split('.').pop()
  const fileName = `${userId}/${analysisId}-${Date.now()}.${fileExt}`

  const { data, error } = await supabase.storage
    .from('analysis-images')
    .upload(fileName, file)

  if (error) throw error
  return data.path
}

// Helper function to save analysis result
export async function saveAnalysisResult(userId, analysisData) {
  const { data, error } = await supabase
    .from('analysis_results')
    .insert([
      {
        user_id: userId,
        name: analysisData.name,
        age: analysisData.age,
        height: analysisData.height,
        weight: analysisData.weight,
        bmi: analysisData.bmi,
        bmi_category: analysisData.bmi_category,
        ml_result: analysisData.ml_result,
        confidence: analysisData.confidence,
        final_status: analysisData.final_status,
        image_path: analysisData.image_path,
        created_at: new Date().toISOString(),
      },
    ])
    .select()

  if (error) throw error
  return data[0]
}

// Helper function to get user's analysis history
export async function getUserAnalysisHistory(userId) {
  const { data, error } = await supabase
    .from('analysis_results')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

// Helper function to delete analysis result
export async function deleteAnalysisResult(resultId) {
  const { error } = await supabase
    .from('analysis_results')
    .delete()
    .eq('id', resultId)

  if (error) throw error
}

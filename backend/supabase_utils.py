from supabase import create_client
import os

SUPABASE_URL = os.environ.get("SUPABASE_URL", "")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_KEY", "")

supabase_client = None

def get_supabase():
    global supabase_client
    if not supabase_client and SUPABASE_URL and SUPABASE_KEY:
        supabase_client = create_client(SUPABASE_URL, SUPABASE_KEY)
    return supabase_client

def save_analysis_to_supabase(analysis_data, user_id=None):
    """Save analysis result to Supabase database"""
    client = get_supabase()
    if not client:
        print("[Supabase] Warning: Supabase not configured")
        return None

    try:
        data = {
            "user_id": user_id or "anonymous",
            "name": analysis_data.get("name"),
            "age": analysis_data.get("age"),
            "height": analysis_data.get("height"),
            "weight": analysis_data.get("weight"),
            "bmi": analysis_data.get("bmi"),
            "bmi_category": analysis_data.get("bmi_category"),
            "ml_result": analysis_data.get("ml_result"),
            "confidence": analysis_data.get("confidence"),
            "final_status": analysis_data.get("final_status"),
            "image_path": analysis_data.get("image_path"),
        }

        response = client.table("analysis_results").insert(data).execute()
        print("[Supabase] Analysis saved successfully")
        return response
    except Exception as e:
        print(f"[Supabase] Error saving analysis: {str(e)}")
        return None

def upload_image_to_supabase(file_path, bucket_name="analysis-images"):
    """Upload image to Supabase storage"""
    client = get_supabase()
    if not client:
        print("[Supabase] Warning: Supabase not configured")
        return None

    try:
        with open(file_path, "rb") as f:
            file_name = os.path.basename(file_path)
            response = client.storage.from_(bucket_name).upload(file_name, f)
        print(f"[Supabase] Image uploaded: {file_name}")
        return response
    except Exception as e:
        print(f"[Supabase] Error uploading image: {str(e)}")
        return None

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3

app = FastAPI()

# --- CORS Configuration ---
# Allow requests from our Next.js frontend
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Pydantic Models ---
class PromptRequest(BaseModel):
    prompt: str

# --- Helper Functions ---
def get_db_schema():
    """Connects to the SQLite DB and fetches the schema."""
    schema = {"tables": []}
    try:
        # Use a `with` statement for robust connection handling
        with sqlite3.connect("database.db") as conn:
            cursor = conn.cursor()
            
            # Get table names, filtering out internal sqlite tables
            cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
            tables = [row[0] for row in cursor.fetchall() if not row[0].startswith('sqlite_')]
            
            for table_name in tables:
                cursor.execute(f"PRAGMA table_info({table_name});")
                columns = [{"name": row[1], "type": row[2]} for row in cursor.fetchall()]
                schema["tables"].append({"name": table_name, "columns": columns})
    except sqlite3.Error as e:
        print(f"Database error: {e}")
        # In a real app, you might want to return a proper HTTP error
        return {"error": str(e), "tables": []}
    return schema

# --- API Endpoints ---
@app.get("/api/schema")
async def schema():
    """Returns the database schema."""
    return get_db_schema()

@app.post("/api/generate-sql")
async def generate_sql(request: PromptRequest):
    """
    (Placeholder) Takes a natural language prompt and returns a mock SQL query.
    """
    prompt = request.prompt.lower()
    
    # Basic, placeholder logic. This is where a real NL-to-SQL engine would go.
    if "all employees" in prompt:
        return {"sql": "SELECT id, name, salary, department_id\nFROM employees;"}
    if "departments" in prompt:
        return {"sql": "SELECT id, name\nFROM departments;"}
    
    return {"sql": "-- No query generated. Try 'show me all employees'."}
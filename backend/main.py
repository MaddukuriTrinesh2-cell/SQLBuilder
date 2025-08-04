from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from database import get_db_schema

app = FastAPI()

# --- CORS Configuration ---
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

class DBDetails(BaseModel):
    db_type: str
    username: str
    password: str
    host: str
    port: str
    db_name: str

# --- API Endpoints ---
@app.post("/api/connect")
def connect_to_db(details: DBDetails):
    """
    Connects to the specified database and returns its schema.
    """
    schema = get_db_schema(
        db_type=details.db_type,
        username=details.username,
        password=details.password,
        host=details.host,
        port=details.port,
        db_name=details.db_name,
    )
    if schema is not None:
        return {"status": "success", "schema": schema}
    else:
        raise HTTPException(status_code=400, detail="Failed to connect to the database or fetch schema.")

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
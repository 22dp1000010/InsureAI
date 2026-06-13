from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient
import os

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://angular-frontend-fyfna5angzbwgzdt.westeurope-01.azurewebsites.net/"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load configuration
ENDPOINT = os.getenv("PROJECT_ENDPOINT")
AGENT_NAME = os.getenv("AGENT_NAME")
AGENT_VERSION = os.getenv("AGENT_VERSION")

# Initialize Foundry client
API_KEY = os.getenv("AZURE_API_KEY")

project_client = AIProjectClient(
    endpoint=ENDPOINT,
    credential=DefaultAzureCredential(),
)
openai_client = project_client.get_openai_client()



class ChatRequest(BaseModel):
    message: str

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/chat")
def chat(request: ChatRequest):
    try:
        response = openai_client.responses.create(
            input=[{"role": "user", "content": request.message}],
            extra_body={
                "agent_reference": {
                    "name": AGENT_NAME,
                    "version": AGENT_VERSION,
                    "type": "agent_reference",
                }
            },
        )
        return {"response": response.output_text}
    except Exception as e:
        print("ERROR:", e)
        return {"error": str(e)}

"""@app.post("/chat")
def chat(request: ChatRequest):
    return {"response": "Backend working!"}"""
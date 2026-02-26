from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(title="Dynamic Portfolio API", version="1.0.0")

# Security: Allow your frontend to communicate with this backend
# Once deployed to Vercel, replace "*" with your actual Vercel domain
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Data Models ---


class Project(BaseModel):
    id: str
    title: str
    description: str
    tags: List[str]  # Changed to 'tags' to match your React frontend perfectly
    github_link: Optional[str] = None
    live_link: Optional[str] = None


class ContactMessage(BaseModel):
    name: str
    email: str
    message: str


# --- Mock Database ---
PORTFOLIO_PROJECTS = [
    {
        "id": "cryo-em-pipeline",
        "title": "Cryo-EM Algorithm Pipeline",
        "description": "Developed robust algorithms for processing and rendering high-resolution microscopic image data. Focused on optimizing computational efficiency for complex biological structures.",
        "tags": ["Python", "Computer Vision", "Data Structures", "NumPy"],
        "github_link": "https://github.com/yourusername/cryo-em",
    },
    {
        "id": "mindfulpath",
        "title": "MindfulPath Integration",
        "description": "A comprehensive application integrating natural language processing to curate personalized daily routines, bridging wellness practices like yoga and meditation with tech.",
        "tags": ["React", "NLP", "Python", "API Integration"],
        "github_link": "https://github.com/yourusername/mindfulpath",
    }
]

# --- API Endpoints ---


@app.get("/", tags=["Health Check"])
async def root():
    """This is the endpoint cron-job.org will ping to keep the server awake."""
    return {"status": "online", "message": "Backend is awake and ready."}


@app.get("/api/projects", response_model=List[Project], tags=["Portfolio Data"])
async def get_projects():
    """Fetches all dynamic projects for the frontend scroll interface."""
    return PORTFOLIO_PROJECTS


@app.post("/api/contact", tags=["Contact Form"])
async def submit_contact(contact: ContactMessage):
    """Handles incoming messages from the frontend contact form."""
    print(f"New connection request from: {contact.name} ({contact.email})")
    print(f"Message: {contact.message}")

    return {
        "success": True,
        "message": "Transmission received. I will review your message and reach out shortly."
    }

if __name__ == "__main__":
    import uvicorn
    # This runs the server locally so you can test it before deploying to Render
    uvicorn.run(app, host="0.0.0.0", port=8000)

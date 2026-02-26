from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

app = FastAPI(title="Dynamic Portfolio API", version="1.0.0")

# Security: Allow your frontend to communicate with this backend
# Once deployed, replace "*" with your actual frontend domain
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Data Models ---


class ContactMessage(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None  # Added phone field to match the new UI
    message: str


# --- API Endpoints ---

@app.get("/", tags=["Health Check"])
async def root():
    """This is the endpoint cron-job.org will ping to keep the server awake."""
    return {"status": "online", "message": "Backend is awake and ready."}


@app.post("/api/contact", tags=["Contact Form"])
async def submit_contact(contact: ContactMessage):
    """Handles incoming messages from the frontend contact form."""
    print(f"--- New Connection Request ---")
    print(f"Name: {contact.name}")
    print(f"Email: {contact.email}")
    if contact.phone:
        print(f"Phone: {contact.phone}")
    print(f"Message: {contact.message}")
    print(f"------------------------------")

    return {
        "success": True,
        "message": "Transmission received. I will review your message and reach out shortly."
    }

if __name__ == "__main__":
    import uvicorn
    # This runs the server locally so you can test it before deploying to Render
    uvicorn.run(app, host="0.0.0.0", port=8000)

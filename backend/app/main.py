from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1 import projects

app = FastAPI(
    title="Sitecel API",
    description="API para gestion de proyectos de Sitecel Technology",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://sitecel.cl"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir router de proyectos
app.include_router(projects.router, prefix="/api/v1", tags=["projects"])

@app.get("/")
def root():
    return {
        "message": "Sitecel API v0.1.0",
        "status": "running"
    }

@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.get("/db-check")
def database_check():
    from app.db.session import engine
    try:
        with engine.connect() as conn:
            result = conn.execute("SELECT 1")
        return {"database": "connected", "status": "ok"}
    except Exception as e:
        return {"database": "error", "message": str(e)}

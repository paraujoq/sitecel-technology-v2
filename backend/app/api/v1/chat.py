from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field
from typing import List, Dict, Optional
from app.services.ai_service import ai_service

router = APIRouter()

class ChatMessage(BaseModel):
    role: str = Field(..., description="Rol del mensaje: 'user' o 'assistant'")
    content: str = Field(..., description="Contenido del mensaje")

class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=500, description="Mensaje del usuario")
    history: Optional[List[ChatMessage]] = Field(default=[], description="Historial de conversación")
    
    class Config:
        json_schema_extra = {
            "example": {
                "message": "¿Qué servicios de telecomunicaciones ofrecen?",
                "history": [
                    {"role": "user", "content": "Hola"},
                    {"role": "assistant", "content": "¡Hola! Soy el asistente virtual de Sitecel. ¿En qué puedo ayudarte?"}
                ]
            }
        }

class ChatResponse(BaseModel):
    response: str = Field(..., description="Respuesta del asistente")
    
    class Config:
        json_schema_extra = {
            "example": {
                "response": "En Sitecel ofrecemos servicios especializados de telecomunicaciones..."
            }
        }

@router.post("/chat", response_model=ChatResponse, status_code=status.HTTP_200_OK)
async def chat_with_bot(request: ChatRequest):
    """
    Endpoint para chatear con el asistente virtual de IA.
    
    - **message**: Mensaje del usuario (requerido)
    - **history**: Historial de conversación para contexto (opcional)
    
    Retorna la respuesta generada por el asistente de IA.
    """
    try:
        print(f"💬 [CHAT] Mensaje recibido: {request.message[:50]}...")
        
        # Convertir history a formato dict simple
        history_dict = [
            {"role": msg.role, "content": msg.content} 
            for msg in request.history
        ] if request.history else []
        
        # Generar respuesta con IA
        response_text = ai_service.chat(
            user_message=request.message,
            history=history_dict
        )
        
        print(f"✅ [CHAT] Respuesta generada: {response_text[:50]}...")
        
        return ChatResponse(response=response_text)
        
    except Exception as e:
        print(f"❌ [CHAT] Error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al procesar el mensaje: {str(e)}"
        )

@router.get("/chat/health", status_code=status.HTTP_200_OK)
async def chat_health():
    """Verificar que el servicio de chat está funcionando"""
    try:
        # Intentar una llamada simple a Gemini
        test_response = ai_service.chat("test")
        return {
            "status": "healthy",
            "service": "AI Chat",
            "model": "gemini-1.5-flash"
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=f"Servicio de chat no disponible: {str(e)}"
        )
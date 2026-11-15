from fastapi import APIRouter

from modules.health.schemas import HealthResponse
from modules.health.services import get_health

router = APIRouter(prefix="/api", tags=["health"])


@router.get("/health", response_model=HealthResponse)
def health() -> HealthResponse:
    return get_health()

from fastapi import APIRouter

from modules.database.schemas import DatabaseStatus, QueryRequest, QueryResult
from modules.database.services import get_status, run_query

router = APIRouter(prefix="/api/database", tags=["database"])


@router.get("/status", response_model=DatabaseStatus)
def status() -> DatabaseStatus:
    return get_status()


@router.post("/query", response_model=QueryResult)
def query(request: QueryRequest) -> QueryResult:
    return run_query(request.sql)

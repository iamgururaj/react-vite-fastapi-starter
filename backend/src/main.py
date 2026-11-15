import logging

from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from starlette.exceptions import HTTPException

from common.config import settings
from modules.database.routes import router as database_router
from modules.health.routes import router

api = FastAPI(title="App Template API")
api.include_router(router)
api.include_router(database_router)


@api.exception_handler(HTTPException)
async def http_error(request: Request, exc: HTTPException):
    return JSONResponse(status_code=exc.status_code, content={"error": {"message": str(exc.detail)}}, headers=exc.headers)


@api.exception_handler(RequestValidationError)
async def validation_error(request: Request, exc: RequestValidationError):
    return JSONResponse(status_code=422, content={"error": {"message": "Invalid request"}})


@api.exception_handler(Exception)
async def server_error(request: Request, exc: Exception):
    logging.getLogger(__name__).exception("Request failed")
    return JSONResponse(status_code=503, content={"error": {"message": "Service unavailable. Check database migrations and server logs."}})


app = CORSMiddleware(api, allow_origins=settings.cors_origins, allow_methods=["GET", "POST"], allow_headers=["Content-Type"])

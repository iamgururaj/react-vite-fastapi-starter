from sqlmodel import Session

from common.database import engine
from modules.health.models import AppMetadata


def read_metadata() -> AppMetadata:
    with Session(engine) as session:
        metadata = session.get(AppMetadata, 1)
        if metadata is None:
            raise RuntimeError("Initial migration required")
        return metadata

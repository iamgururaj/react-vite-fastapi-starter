from pathlib import Path

from sqlalchemy.engine import make_url
from sqlmodel import create_engine

from common.config import ROOT, settings

url = make_url(settings.database_url)
if url.get_backend_name() != "sqlite":
    raise ValueError("This starter requires SQLite")
if url.database and url.database != ":memory:":
    path = Path(url.database)
    if not path.is_absolute():
        path = ROOT / path
    path.parent.mkdir(parents=True, exist_ok=True)
    url = url.set(database=str(path.resolve()))
engine = create_engine(url, connect_args={"check_same_thread": False})

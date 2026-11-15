from alembic import context
from sqlmodel import SQLModel

from common.database import engine
from modules.health.models import AppMetadata  # noqa: F401

if context.is_offline_mode():
    context.configure(url=str(engine.url), target_metadata=SQLModel.metadata, literal_binds=True)
    with context.begin_transaction():
        context.run_migrations()
else:
    with engine.connect() as connection:
        context.configure(connection=connection, target_metadata=SQLModel.metadata, render_as_batch=True)
        with context.begin_transaction():
            context.run_migrations()

from modules.health.repositories import read_metadata
from modules.health.schemas import HealthResponse


def get_health() -> HealthResponse:
    metadata = read_metadata()
    return HealthResponse(status="ok", database_status="connected", schema_label=metadata.schema_label)

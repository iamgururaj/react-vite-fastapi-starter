from pydantic import BaseModel, ConfigDict
from pydantic.alias_generators import to_camel


class HealthResponse(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)
    status: str
    database_status: str
    schema_label: str

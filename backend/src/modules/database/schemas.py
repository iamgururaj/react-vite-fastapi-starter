from pydantic import BaseModel, ConfigDict, Field
from pydantic.alias_generators import to_camel


class ApiSchema(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)


class DatabaseStatus(ApiSchema):
    status: str
    sqlite_version: str
    database_name: str
    size_bytes: int
    tables: list[str]


class QueryRequest(ApiSchema):
    sql: str = Field(min_length=1, max_length=10000)


class QueryResult(ApiSchema):
    columns: list[str]
    rows: list[list[str | int | float | None]]
    row_count: int
    truncated: bool
    elapsed_ms: float

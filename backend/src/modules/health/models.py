from sqlmodel import Field, SQLModel


class AppMetadata(SQLModel, table=True):
    __tablename__ = "app_metadata"  # pyright: ignore[reportAssignmentType] -- SQLModel accepts a string table name.
    id: int = Field(primary_key=True)
    schema_label: str

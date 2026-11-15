"""Create application metadata and seed its schema label."""

import sqlalchemy as sa
from alembic import op

revision = "0001"
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    table = op.create_table("app_metadata", sa.Column("id", sa.Integer(), primary_key=True), sa.Column("schema_label", sa.String(), nullable=False))
    op.bulk_insert(table, [{"id": 1, "schema_label": "initial"}])


def downgrade():
    op.drop_table("app_metadata")

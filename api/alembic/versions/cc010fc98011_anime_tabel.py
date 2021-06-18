"""anime tabel

Revision ID: cc010fc98011
Revises: 9f2638f213c2
Create Date: 2021-06-18 13:04:51.343927

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'cc010fc98011'
down_revision = '9f2638f213c2'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'anime',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column("anilist_id", sa.Integer, unique=True, nullable=False),
        sa.Column('name', sa.Text, nullable=False),
        sa.Column("data", sa.JSON, nullable=False)
    )
    pass


def downgrade():
    op.drop_table('anime')
    pass
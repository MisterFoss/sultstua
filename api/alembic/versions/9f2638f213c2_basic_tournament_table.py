"""basic tournament table

Revision ID: 9f2638f213c2
Revises: 
Create Date: 2021-06-17 18:16:47.125464

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9f2638f213c2'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'tournament',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('name', sa.Text, nullable=False),
    )
    pass


def downgrade():
    op.drop_table('tournament')
    pass

"""tournament-anime-table

Revision ID: 2d71c6d48fae
Revises: cc010fc98011
Create Date: 2021-06-18 15:29:05.472886

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2d71c6d48fae'
down_revision = 'cc010fc98011'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'tournament_anime',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('tournament_id', sa.Integer, sa.ForeignKey("tournament.id"), nullable=False),
        sa.Column('anime_id', sa.Integer, sa.ForeignKey("anime.id"), nullable=False)
    )
    pass


def downgrade():
    op.drop_table('tournament_anime')
    pass

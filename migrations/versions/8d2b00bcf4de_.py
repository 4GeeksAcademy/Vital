"""empty message

Revision ID: 8d2b00bcf4de
Revises: 7ea6be6446c4
Create Date: 2023-11-21 23:46:07.022455

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8d2b00bcf4de'
down_revision = '7ea6be6446c4'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('favorites_meals',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('favorite_breakfast', sa.String(length=300), nullable=True),
    sa.Column('favorite_lunch', sa.String(length=300), nullable=True),
    sa.Column('favorite_dinner', sa.String(length=300), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('favorites_meals')
    # ### end Alembic commands ###

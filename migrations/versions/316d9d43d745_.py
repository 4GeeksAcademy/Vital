"""empty message

Revision ID: 316d9d43d745
Revises: 6f63e499de1d
Create Date: 2023-10-19 02:43:01.801010

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '316d9d43d745'
down_revision = '6f63e499de1d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('favorite', schema=None) as batch_op:
        batch_op.add_column(sa.Column('favorite_cardio', sa.String(length=300), nullable=True))
        batch_op.add_column(sa.Column('favorite_chest', sa.String(length=300), nullable=True))
        batch_op.add_column(sa.Column('favorite_lower_arms', sa.String(length=300), nullable=True))
        batch_op.add_column(sa.Column('favorite_lower_legs', sa.String(length=300), nullable=True))
        batch_op.add_column(sa.Column('favorite_neck', sa.String(length=300), nullable=True))
        batch_op.add_column(sa.Column('favorite_upper_arms', sa.String(length=300), nullable=True))
        batch_op.add_column(sa.Column('favorite_upper_legs', sa.String(length=300), nullable=True))
        batch_op.add_column(sa.Column('favorite_waist', sa.String(length=300), nullable=True))
        batch_op.drop_column('favorite_arms')
        batch_op.drop_column('favorite_legs')
        batch_op.drop_column('favorite_abs')

    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('username', sa.String(length=30), nullable=False))
        batch_op.add_column(sa.Column('role', sa.String(length=50), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('role')
        batch_op.drop_column('username')

    with op.batch_alter_table('favorite', schema=None) as batch_op:
        batch_op.add_column(sa.Column('favorite_abs', sa.VARCHAR(length=300), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('favorite_legs', sa.VARCHAR(length=300), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('favorite_arms', sa.VARCHAR(length=300), autoincrement=False, nullable=True))
        batch_op.drop_column('favorite_waist')
        batch_op.drop_column('favorite_upper_legs')
        batch_op.drop_column('favorite_upper_arms')
        batch_op.drop_column('favorite_neck')
        batch_op.drop_column('favorite_lower_legs')
        batch_op.drop_column('favorite_lower_arms')
        batch_op.drop_column('favorite_chest')
        batch_op.drop_column('favorite_cardio')

    # ### end Alembic commands ###
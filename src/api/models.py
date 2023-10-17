from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)

    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(30), unique=False, nullable=False)
    name = db.Column(db.String(30), unique=False, nullable=False)
    lastname = db.Column(db.String(30), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.id} {self.name} {self.lastname}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "lastname": self.lastname,
            "email": self.email
        }

class Administrator(User):
    __tablename__ = "admins"
    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    is_active = db.Column(db.Boolean, nullable=False)

    def __repr__(self):
        return f'<Administrator {self.id} {self.name} {self.lastname}, {self.is_admin}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "lastname": self.lastname,
            "is_admin": self.is_active
        }

class Gym(db.Model):
    __tablename__ = "gyms"
    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(200), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=True)
    address = db.Column(db.String(500), nullable=False)
    description = db.Column(db.String(500), nullable=True)
    phone = db.Column(db.String(20), nullable=True)
    image = db.Column(db.String(200), nullable=True)
    
    def __repr__(self):
        return f'<Gym {self.id} {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
        }

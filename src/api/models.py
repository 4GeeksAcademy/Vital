from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)

    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(30), unique=False, nullable=False)
    username = db.Column(db.String(30), unique=False, nullable=False)
    name = db.Column(db.String(30), unique=False, nullable=False)
    lastname = db.Column(db.String(30), unique=False, nullable=False)
    is_active = db.Column(db.Boolean, unique=False, nullable=False)

    def __init__(self, email, password, username, name, lastname):
        self.email = email
        self.password = password
        self.username = username
        self.name = name
        self.lastname = lastname
        self.is_active = True

    def __repr__(self):
        return f'<User {self.id} {self.name} {self.lastname}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "lastname": self.lastname,
            "email": self.email
        }

class Favorite(db.Model):
    tablename = "favorites"
    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    user = db.relationship('User')
    
    favorite_back = db.Column(db.String(300), unique=False, nullable=True)
    favorite_cardio = db.Column(db.String(300), unique=False, nullable=True)
    favorite_chest = db.Column(db.String(300), unique=False, nullable=True)
    favorite_lower_arms = db.Column(db.String(300), unique=False, nullable=True)
    favorite_lower_legs = db.Column(db.String(300), unique=False, nullable=True)
    favorite_neck = db.Column(db.String(300), unique=False, nullable=True)
    favorite_shoulders = db.Column(db.String(300), unique=False, nullable=True)
    favorite_upper_arms = db.Column(db.String(300), unique=False, nullable=True)
    favorite_upper_legs = db.Column(db.String(300), unique=False, nullable=True)
    favorite_waist = db.Column(db.String(300), unique=False, nullable=True)

    def __init__(self, favorite_back, favorite_cardio, favorite_chest, favorite_lower_arms, favorite_lower_legs, favorite_neck, favorite_shoulders, favorite_upper_arms, favorite_upper_legs, favorite_waist):
        favorite_back = self.favorite_back
        favorite_cardio = self.favorite_cardio
        favorite_chest = self.favorite_chest
        favorite_lower_arms = self.favorite_lower_arms
        favorite_lower_legs = self.favorite_lower_legs
        favorite_neck = self.favorite_neck
        favorite_shoulders = self.favorite_shoulders
        favorite_upper_arms = self.favorite_upper_arms
        favorite_upper_legs = self.favorite_lower_legs
        favorite_waist = self.favorite_waist
    
    def repr(self):
        return f'<Favorite {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "favorite_back": self.favorite_back,
            "favorite_cardio": self.favorite_cardio,
            "favorite_chest": self.favorite_chest,
            "favorite_lower_arms": self.lower_arms,
            "favorite_lower_legs": self.lower_legs,
            "favorite_neck": self.favorite_neck,
            "favorite_shoulders": self.favorite_shoulders,
            "favorite_upper_arms": self.favorite_upper_arms,
            "favorite_upper_legs": self.favorite_upper_legs,
            "favorite_waist": self.favorite_waist
        }

class Administrator(User):
    __tablename__ = "administrators"
    
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    role = db.Column(db.String(50), nullable=False)

    def __init__(self, email, password, username, name, lastname, role):
        super().__init__(email=email, password=password, username=username, name=name, lastname=lastname)
        self.role = role

    def __repr__(self):
        return f'<Administrator {self.id} {self.name} {self.lastname}, {self.role}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "lastname": self.lastname,
            "role": self.role
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

    def __init__(self, name, email, address, description, phone, image):
        self.name = name
        self.email = email
        self.address = address
        self.description = description
        self.phone = phone
        self.image = image
    
    def __repr__(self):
        return f'<Gym {self.id} {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email
        }
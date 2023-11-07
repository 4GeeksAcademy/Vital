from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)

    email = db.Column(db.String(120), unique=False, nullable=False)
    password = db.Column(db.String(200), unique=False, nullable=False)
    username = db.Column(db.String(30), unique=True, nullable=False)
    name = db.Column(db.String(30), unique=False, nullable=False)
    lastname = db.Column(db.String(30), unique=False, nullable=False)
    role = db.Column(db.String(50), nullable=False)
    is_active = db.Column(db.Boolean, unique=False, nullable=False)

    def __init__(self, email, password, username, name, lastname):
        self.email = email
        self.password = password
        self.username = username
        self.name = name
        self.lastname = lastname
        self.role = "user"
        self.is_active = True

    def __repr__(self):
        return f"<User {self.id} {self.name} {self.lastname}>"

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "lastname": self.lastname,
            "email": self.email,
            "username": self.username,
            "is_active": self.is_active,
        }


class Favorite(db.Model):
    tablename = "favorites"
    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    user = db.relationship("User")

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

    def __init__(
        self,
        user,
        favorite_back,
        favorite_cardio,
        favorite_chest,
        favorite_lower_arms,
        favorite_lower_legs,
        favorite_neck,
        favorite_shoulders,
        favorite_upper_arms,
        favorite_upper_legs,
        favorite_waist,
    ):
        self.user = user
        self.favorite_back = favorite_back
        self.favorite_cardio = favorite_cardio
        self.favorite_chest = favorite_chest
        self.favorite_lower_arms = favorite_lower_arms
        self.favorite_lower_legs = favorite_lower_legs
        self.favorite_neck = favorite_neck
        self.favorite_shoulders = favorite_shoulders
        self.favorite_upper_arms = favorite_upper_arms
        self.favorite_upper_legs = favorite_upper_legs
        self.favorite_waist = favorite_waist

    def repr(self):
        return f"<Favorite {self.id}>"

    def serialize(self):
        return {
            "id": self.id,   
            "user_id": self.user_id,         
            "favorite_back": self.favorite_back,
            "favorite_cardio": self.favorite_cardio,
            "favorite_chest": self.favorite_chest,
            "favorite_lower_arms": self.favorite_lower_arms,
            "favorite_lower_legs": self.favorite_lower_legs,
            "favorite_neck": self.favorite_neck,
            "favorite_shoulders": self.favorite_shoulders,
            "favorite_upper_arms": self.favorite_upper_arms,
            "favorite_upper_legs": self.favorite_upper_legs,
            "favorite_waist": self.favorite_waist,
        }

class Favorite_back(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    favorite_back = db.Column(db.String(300), unique=False, nullable=True)

class Administrator(User):
    __tablename__ = "administrators"
    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    role = db.Column(db.String(50), nullable=False)

    def __init__(self, email, password, username, name, lastname):
        super().__init__(
            email=email,
            password=password,
            username=username,
            name=name,
            lastname=lastname,
        )
        self.role = "admin"

    def __repr__(self):
        return f"<Administrator {self.id} {self.name} {self.lastname}, {self.role}>"

    def serialize(self):
        return {"user": super().serialize(), "role": self.role}


class Gym(db.Model):
    __tablename__ = "gyms"
    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(200), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=True)
    address = db.Column(db.String(500), nullable=False)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(500), nullable=True)
    phone = db.Column(db.String(20), nullable=True)    
    is_active = db.Column(db.Boolean, unique=False, nullable=False)

    def __init__(self, name, email, address, latitude, longitude, description, phone):
        self.name = name
        self.email = email
        self.address = address
        self.latitude = latitude
        self.longitude = longitude
        self.description = description
        self.phone = phone       
        self.is_active = True

    def __repr__(self):
        return f"<Gym {self.id} {self.name}>"

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "address": self.address,
            "latitude": self.latitude,
            "longitude": self.longitude,
            "description": self.description,
            "phone": self.phone,
            "is_active": self.is_active,            
            }


class Profile(db.Model):
    __tablename__ = "profile"
    id = db.Column(db.Integer, primary_key=True)

    profile_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    profile = db.relationship("User")

    jobies = db.Column(db.String(200), unique=False, nullable=False)
    profile_name = db.Column(db.String(120), unique=True, nullable=True)
    profile_image = db.Column(db.String(500), nullable=False)
    description = db.Column(db.String(500), nullable=True)
    phone = db.Column(db.String(20), nullable=True)
    is_active = db.Column(db.Boolean, unique=False, nullable=False)

    def __init__(self, name, email, address, description, phone, image):
        self.name = name
        self.email = email
        self.address = address
        self.description = description
        self.phone = phone
        self.image = image
        self.is_active = True

    def __repr__(self):
        return f"<Profile {self.id} {self.name}>"

    def serialize(self):
        return {
            "id": self.id,
            "profile name": self.profile_namee,
            "profile image": self.profile_image,
            "description": self.description,
            "phone": self.phone,
        }

class Newsletter(db.Model):
    __tablename__ = "newsletter"
    id = db.Column(db.Integer, primary_key=True)

    email = db.Column(db.String(200), unique=False, nullable=False)    
    is_active = db.Column(db.Boolean, unique=False, nullable=False)

    def __init__(self, email):
        
        self.email = email        
        self.is_active = True

    def __repr__(self):
        return f"<Gym {self.id} {self.email}>"

    def serialize(self):
        return {"email": self.email, "Active": self.is_active}
    
class NewsletterFiles(db.Model):
    __tablename__ = "newsletterfiles"
    id = db.Column(db.Integer, primary_key=True)        
    title = db.Column(db.String(500), nullable=False)
    file = db.column(db.BINARY)
    date = db.Column(db.DateTime, nullable=False)   

    def __init__(self, newsletter_file):
        
        self.newsletter_file = newsletter_file        
        self.is_active = True

    def __repr__(self):
        return f"<Gym {self.id} {self.newsletter_file}>"

    def serialize(self):
        return {"newsletter file": self.file, "Date": self.date}

class Transactions(db.Model):
    __tablename__ = "transactions"
    id = db.Column(db.Integer, primary_key=True)
    order = db.Column(db.Integer, nullable=False)
    date = db.Column(db.DateTime, nullable=False)
    amount = db.Column(db.Float, nullable=False)
    comission = db.Column(db.Float, nullable=False)

    def __init__(self, order, date, amount, commission):

        self.order = order
        self.date = date
        self.amount = amount
        self.comission = commission

    def __repr__(self):
        return f"<Transaction {self.id}, {self.date}>"

    def serialize(self):
        return {
            "id": self.id,
            "order": self.order,
            "date": self.date,
            "amount": self.amount,
            "comission": self.comission
        }
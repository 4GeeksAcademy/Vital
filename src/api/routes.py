"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Administrator, Favorite, Gym, Newsletter, NewsletterFiles, Transactions, Profile
from api.utils import generate_sitemap, APIException
import random
import math
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from datetime import timedelta
import re
import bcrypt
import stripe
import os as OS
from email.message import EmailMessage
import ssl
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

stripe.api_key = "sk_test_51Nv9PcKpc9PSomxGEipel1aWPJxzGHNS7W0K4zN9k0QGAKumWU8KKRXrNAx6lT7sUJ641GQRqYR6e0xd8adhcie9007AnUr8nu"

def check(email):
    regex = r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b"
    # pass the regular expression
    # and the string into the fullmatch() method
    if re.fullmatch(regex, email):
        return True
    else:
        return False


api = Blueprint("api", __name__)

@api.route("/token", methods=["POST"])
def create_token():
    username = request.json.get("username", None)
    password = request.json.get("password", None)    
    if username is None or password is None:
        return {"message": "parameters missing"}, 400
    
    user = User.query.filter_by(username=username).one_or_none()
    if user is None:
        return {"message": "user doesn't exist"}, 400
    
    password_byte = bytes(password, "utf-8")   

    profile = Profile.query.filter_by(user=user).one_or_none()

    if bcrypt.checkpw(password_byte, user.password.encode("utf-8")):
        return {
            "token": create_access_token(
                identity=user.username, expires_delta=timedelta(hours=3)
            ),
            "user": user.serialize(),
            "profile": profile.serialize()
        }, 200
    return {"message": "Access no granted"}, 501

@api.route("/change-password", methods=["PUT"])
@jwt_required()
def change_password():
    front_username = request.args.get("username", None)
    username = get_jwt_identity()
    body = request.get_json()
    print(body)
    old_password = body.get("oldPassword", None)
    new_password = body.get("newPassword", None)

    if username != front_username:
        return {"msg": "User not authorized"}, 501
    if old_password is None or new_password is None:
        return {"msg": "Missing fields"}, 400
    user = User.query.filter_by(username=username).first()
    if user is None:
        return {"msg": "User doesn't exist"}, 400
    password_byte = bytes(old_password, "utf-8")
    if bcrypt.checkpw(password_byte, user.password.encode("utf-8")):
        try:
            bpassword = bytes(new_password, "utf-8")
            salt = bcrypt.gensalt()
            hashed = bcrypt.hashpw(bpassword, salt)
            user.password = hashed.decode("utf-8")
            db.session.commit()
            return {"msg": "Password changed successfully", "status": "ok"}, 200
        except ValueError as error:
            return {"msg": "Something went wrong" + error}, 500
    else:
        return {"msg": "Password doesn't match"}, 400

@api.route("get-user/<username>", methods=["GET"])
@jwt_required()
def get_user(username):
    front_username = request.args.get("username", None)
    username = get_jwt_identity()
    if username != front_username:
        return {"msg": "User not authorized"}, 501
    user = User.query.filter_by(username=username).first()
    if user is None:
        return {"msg": "User doesn't exist"}, 400
    return user.serialize(), 200

@api.route("/token-admin", methods=["POST"])
def create_token_admin():    
    username = request.json.get("username", None)
    password = request.json.get("password", None)    
    if username is None or password is None:
        return {"message": "parameters missing"}, 400
    admin = Administrator.query.filter_by(username=username).one_or_none()    
    profile = Profile.query.filter_by(user=admin).one_or_none()      
    if admin is None:
        return {"message": "user doesn't exist"}, 400
    password_byte = bytes(password, "utf-8")   
    if bcrypt.checkpw(password_byte, admin.password.encode("utf-8")):
        return {
            "token": create_access_token(identity=admin.username, expires_delta=timedelta(hours=3)),
            "admin": admin.serialize(),
            "profile": profile.serialize()            
        }, 200
    return {"message": "Access no granted"}, 501

@api.route("/users", methods=["GET"])
@jwt_required()
def handle_users():
    front_username = request.args.get("username", None)
    username = get_jwt_identity()
    if username != front_username:
        return {"msg": "User not authorized"}, 501
    try:
        users = User.query.filter_by(role="user").all()
        print(users)
        return [user.serialize() for user in users], 200
    except ValueError as error:
        return {"msg": "Something went wrong" + error}, 500
    
@api.route("favorites/<username>", methods=["GET"])
def get_favorites(username):
    user = User.query.filter_by(username=username).first()
    if user is None:
        return {"msg": "User doesn't exist"}, 400
    favorites = Favorite.query.filter_by(user=user).first()
    if favorites is None:
        return {"msg": "User doesn't have favorites"}, 400    
    return favorites.serialize() , 200

@api.route("create-user", methods=["POST"])
def create_user():
    body = request.get_json()
    email = body.get("email", None)
    password = body.get("password", None)
    username = body.get("username", None)
    name = body.get("name", None)
    lastname = body.get("lastname", None)
    if (
        email is None
        or password is None
        or username is None
        or name is None
        or lastname is None
    ):
        return {"msg": "Missing fields"}, 400
    if check(email) == False:
        return {"msg": "Invalid email"}, 400
    user = User.query.filter_by(email=email).first()
    if user is None:
        try:
           
            bpassword = bytes(password, "utf-8")
            salt = bcrypt.gensalt()
            hashed = bcrypt.hashpw(bpassword, salt)
            user = User(
                email=email,
                password=hashed.decode("utf-8"),
                username=username,
                name=name,
                lastname=lastname,
            )            
            db.session.add(user)
            db.session.commit()
            favorite = Favorite(user=user, favorite_back=[], favorite_cardio=[], favorite_chest=[], favorite_lower_arms=[], favorite_lower_legs=[], favorite_neck=[], favorite_shoulders=[], favorite_upper_arms=[], favorite_upper_legs=[], favorite_waist=[])
            db.session.add(favorite)
            db.session.commit()
            # return {"msg": "antes del profile"}
            profile = Profile(user=user, jobies="", profile_image="", description="", phone="")
            db.session.add(profile)
            db.session.commit()
            return {"msg": "User created successfully"}, 200
        except ValueError as error:
            return {"msg": "Something went wrong" + error}, 500
    else:
        return {"msg": "User already exists"}, 400

@api.route("create-admin", methods=["POST"])
@jwt_required()
def create_admin():
    front_username = request.args.get("username", None)
    username = get_jwt_identity()
    if username != front_username:
        return {"msg": "User not authorized"}, 501
    body = request.get_json()
    email = body.get("email", None)
    password = body.get("password", None)
    username = body.get("username", None)
    name = body.get("name", None)
    lastname = body.get("lastname", None)    
    if (
        email is None
        or password is None
        or username is None
        or name is None
        or lastname is None       
    ):
        return {"msg": "Missing fields"}, 400
    if check(email) == False:
        return {"msg": "Invalid email"}, 400
    admin_user = Administrator.query.filter_by(email=email).first()
    if admin_user is not None:
        return {"msg": "Admin User already exists"}, 400
    bpassword = bytes(password, "utf-8")
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(bpassword, salt)
    if admin_user is None:
        try:
            admin = Administrator( 
                email=email,               
                password=hashed.decode("utf-8"),
                username=username,
                name=name,
                lastname=lastname,                
            )            
            db.session.add(admin)
            db.session.commit()
            user = User.query.filter_by(username=username).first()
            profile = Profile(user=user, jobies="", profile_image="", description="", phone="")            
            db.session.add(profile)
            db.session.commit()
            return {"msg": "Admin created successfully"}, 200
        except ValueError as error:
            return {"msg": "Something went wrong" + error}, 500
    else:
        return {"msg": "Admin User already exists"}, 400

@api.route("create-main-admin", methods=["POST"])
def create_main_admin():
    admin_user = Administrator.query.filter_by(username="admin").first()    
    bpassword = bytes("12345", "utf-8")
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(bpassword, salt)
    if admin_user is None:
        try:
            admin = Administrator(
                    email="admin@vital.com",               
                    password=hashed.decode("utf-8"),
                    username="admin",
                    name="Administrator",
                    lastname="Vital",                    
                ) 
            db.session.add(admin)
            db.session.commit()
            user = User.query.filter_by(username="admin").first()
            profile = Profile(user=user, jobies="", profile_image="", description="", phone="")            
            db.session.add(profile)
            db.session.commit()
            return {"msg": "Admin created successfully"}, 200
        except ValueError as error:
            return {"msg": "Something went wrong" + error}, 500
    else:
        return {"msg": "Admin User already exists"}, 400

@api.route("get-admins", methods=["GET"])
@jwt_required()
def get_admins():   
    front_username = request.args.get("username", None)
    username = get_jwt_identity()
    if username != front_username:
        return {"msg": "User not authorized"}, 501
    admins = Administrator.query.all()
    if admins is None:
        return {"msg": "Admins don't exist"}, 400
    return [admin.serialize() for admin in admins], 200

@api.route("validate-token", methods=["GET"])
@jwt_required()
def validate_token():
    front_username = request.args.get("username", None)
    username = get_jwt_identity()
    if username != front_username:
        return {"msg": "User not authorized"}, 501
    return {"msg": "User authorized"}, 200
    
@api.route("add-favorite/<username>", methods=["PUT"])
def add_favorites(username):
    body = request.get_json()    
    favorite_back = body.get("back", None)
    favorite_cardio = body.get("cardio", None)
    favorite_chest = body.get("chest", None)
    favorite_lower_arms = body.get("lowerarms", None)
    favorite_lower_legs = body.get("lowerlegs", None)
    favorite_neck = body.get("neck", None)
    favorite_shoulders = body.get("shoulders", None)
    favorite_upper_arms = body.get("upperarms", None)
    favorite_upper_legs = body.get("upperlegs", None)
    favorite_waist = body.get("waist", None)
    if favorite_back is None or favorite_cardio is None or favorite_chest is None or favorite_lower_arms is None or favorite_lower_legs is None or favorite_neck is None or favorite_shoulders is None or favorite_upper_arms is None or favorite_upper_legs is None or favorite_waist is None:
        return {"msg": "Missing fields"}, 400
    
    #favorite_back, favorite_cardio, favorite_chest, favorite_lower_arms, favorite_lower_legs, favorite_neck, favorite_shoulders, favorite_upper_arms, favorite_upper_legs, favorite_waist
    user = User.query.filter_by(username=username).first()    
    favorite = Favorite.query.filter_by(user=user).first() 
    if favorite is None:
        return {"msg": "User doesn't have favorites"}, 400
    try:
        favorite.favorite_back = favorite_back
        favorite.favorite_cardio = favorite_cardio
        favorite.favorite_chest = favorite_chest
        favorite.favorite_lower_arms = favorite_lower_arms
        favorite.favorite_lower_legs = favorite_lower_legs
        favorite.favorite_neck = favorite_neck
        favorite.favorite_shoulders = favorite_shoulders
        favorite.favorite_upper_arms = favorite_upper_arms
        favorite.favorite_upper_legs = favorite_upper_legs
        favorite.favorite_waist = favorite_waist
        db.session.commit()
        return {"msg": "Favorites added succesfully"}, 200
    except ValueError as error:
        return {"msg": "Something went wrong" + error}, 500
    
    
       
    
@api.route("create-gym", methods=["POST"])
def create_gym():
    body = request.get_json()
    name = body.get("name", None)
    email = body.get("email", None)
    address = body.get("address", None)
    latitude = body.get("latitude", None)
    longitude = body.get("longitude", None)
    description = body.get("description", None)
    phone = body.get("phone", None)

    print(body)

    if (
        name is None
        or email is None
        or address is None
        or latitude is None
        or longitude is None
        or description is None
        or phone is None        
    ):
        return {"msg": "Missing fields"}, 400
    if check(email) == False:
        return {"msg": "Invalid email"}, 400
    gym = Gym.query.filter_by(email=email).first()
    if gym is None:
        try:
            gym = Gym(
                #name, email, address, latitude, longitude, description, phone, image
                name=name,
                email=email,
                address=address,
                latitude=latitude,
                longitude=longitude,
                description=description,
                phone=phone,                              
            )
            db.session.add(gym)
            db.session.commit()
            return {"msg": "Gym created successfully"}, 200
        except ValueError as error:
            return {"msg": "Something went wrong" + error}, 500
    else:
        return {"msg": "Gym already exists"}, 400
    
@api.route("get-gym/<email>", methods=["GET"])
def get_gym(email):
    gym = Gym.query.filter_by(email=email).first()
    if gym is None:
        return {"msg": "Gym doesn't exist"}, 400
    return gym.serialize(), 200

@api.route("get-gyms", methods=["GET"])
@jwt_required()
def get_gyms():
    front_username = request.args.get("username", None)
    username = get_jwt_identity()
    print(username)
    if username != front_username:
        return {"msg": "User not authorized"}, 501
    gyms = Gym.query.all()
    if gyms is None:
        return {"msg": "Gyms don't exist"}, 400
    return [gym.serialize() for gym in gyms], 200

@api.route("update-gym", methods=["PUT"])
@jwt_required()
def update_gym():
    front_username = request.args.get("username", None)
    username = get_jwt_identity()
    if username != front_username:
        return {"msg": "User not authorized"}, 501
    body = request.get_json()
    name = body.get("name", None)
    email = body.get("email", None)
    address = body.get("address", None)
    latitude = body.get("latitude", None)
    longitude = body.get("longitude", None)
    description = body.get("description", None)
    phone = body.get("phone", None)       
    if (
        name is None
        or email is None
        or address is None
        or latitude is None
        or longitude is None
        or description is None
        or phone is None      
    ):
        return {"msg": "Missing fields"}, 400
    if check(email) == False:
        return {"msg": "Invalid email"}, 400
    gym = Gym.query.filter_by(email=email).first()
    if gym is None:
        return {"msg": "Gym doesn't exist"}, 400
    try:
        gym.name = name
        gym.email = email
        gym.address = address
        gym.latitude = latitude
        gym.longitude = longitude
        gym.description = description
        gym.phone = phone        
        db.session.commit()
        return {"msg": "Gym updated successfully"}, 200
    except ValueError as error:
        return {"msg": "Something went wrong" + error}, 500
    
@api.route("delete-gym/<email>", methods=["DELETE"])
def delete_gym(email):
    gym = Gym.query.filter_by(email=email).first()
    if gym is None:
        return {"msg": "Gym doesn't exist"}, 400
    try:
        db.session.delete(gym)
        db.session.commit()
        return {"msg": "Gym deleted successfully"}, 200
    except ValueError as error:
        return {"msg": "Something went wrong" + error}, 500
    
@api.route("update-status", methods=["PUT"])
@jwt_required()
def update_status():
    front_username = request.args.get("username", None)
    username = get_jwt_identity()
    body = request.get_json()
    email = body.get("email", None)
    if username != front_username:
        return {"msg": "User not authorized"}, 501
    gym = Gym.query.filter_by(email=email).first()
    if gym is None:
        return {"msg": "Gym doesn't exist"}, 400
    try:
        gym.is_active = not gym.is_active
        db.session.commit()
        return {"msg": "Gym updated successfully"}, 200
    except ValueError as error:
        return {"msg": "Something went wrong" + error}, 500
    
@api.route("newsletter", methods=["POST"])
def add_newsletter():
    body = request.get_json()
    email = body.get("email", None)
    if email is None:
        return {"msg": "Missing email"}, 400
    if check(email) == False:
        return {"msg": "Invalid email"}, 400
    newsletter = Newsletter.query.filter_by(email=email).first()
    if newsletter is not None:
        newsletter.is_active = True
        return {"msg": "Newsletter enable"}, 400
    try:
        newsletter = Newsletter(email=email)
        db.session.add(newsletter)
        db.session.commit()
        return {"msg": "Newsletter added successfully"}, 200
    except ValueError as error:
        return {"msg": "Something went wrong" + error}, 500
    
@api.route("get-newsletter", methods=["GET"])
@jwt_required()
def get_newsletter():
    front_username = request.args.get("username", None)
    username = get_jwt_identity()
    if username != front_username:
        return {"msg": "User not authorized"}, 501
    newsletters = Newsletter.query.all()
    if newsletters is None:
        return {"msg": "Newsletters don't exist"}, 400
    return [newsletter.serialize() for newsletter in newsletters], 200

@api.route("update-newsletter", methods=["PUT"])
@jwt_required()
def update_newsletter():
    front_username = request.args.get("username", None)
    username = get_jwt_identity()
    if username != front_username:
        return {"msg": "User not authorized"}, 501
    body = request.get_json()
    email = body.get("email", None)
    if email is None:
        return {"msg": "Missing email"}, 400
    if check(email) == False:
        return {"msg": "Invalid email"}, 400
    newsletter = Newsletter.query.filter_by(email=email).first()
    if newsletter is None:
        return {"msg": "Newsletter doesn't exist"}, 400
    try:
        newsletter.is_active = not newsletter.is_active
        db.session.commit()
        return newsletter.serialize(), 200
    except ValueError as error:
        return {"msg": "Something went wrong" + error}, 500


@api.route("disable-newsletter/<email>", methods=["PUT"])
def disable_newsletter(email):
    newsletter = Newsletter.query.filter_by(email=email).first()
    if newsletter is None:
        return {"msg": "Newsletter doesn't exist"}, 400
    try:
        newsletter.is_active = False
        db.session.commit()
        return {"msg": "Newsletter disabled successfully"}, 200
    except ValueError as error:
        return {"msg": "Something went wrong" + error}, 500
    
@api.route("enable-newsletter/<email>", methods=["PUT"])
def enable_newsletter(email):
    newsletter = Newsletter.query.filter_by(email=email).first()
    if newsletter is None:
        return {"msg": "Newsletter doesn't exist"}, 400
    try:
        newsletter.is_active = True
        db.session.commit()
        return {"msg": "Newsletter disabled successfully"}, 200
    except ValueError as error:
        return {"msg": "Something went wrong" + error}, 500

@api.route("send-email", methods=["POST"])
def send_email():
    body = request.get_json()
    email_sender = "diegoguillen70@gmail.com" #body.get("email_sender", None)
    newsletters = Newsletter.query.filter_by(is_active=True).all()
    if newsletters is None:
        return {"msg": "There are not newsletters yet"}, 400
    email_receiver_arr = [newsletter.email for newsletter in newsletters]
    if len(email_receiver_arr) == 0:
        return {"msg": "There are not newsletters yet"}, 400
    if len(email_receiver_arr) == 1:
        email_receiver = email_receiver_arr[0]
    else:
        email_receiver = ",".join(email_receiver_arr)
        #return {"msg": email_receiver}, 200
    email_password = OS.environ.get("EMAIL_PASSWORD")
    subject = body.get("subject", None)
    body_message = body.get("body_message", None)

    em = EmailMessage()
    em['From'] = email_sender
    em['To'] = email_receiver
    em['Subject'] = subject
    msg = MIMEText(body_message, 'html')
    em.attach(msg)
    em.set_content(msg)

    context = ssl.create_default_context()
    try:
        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls(context=context)
            server.login(email_sender, email_password)
            server.send_message(em)
            return {"msg": "Email sent successfully"}, 200
    except Exception as error:
        return {"msg": "Something went wrong" + error}, 500
    
@api.route("add-transactions", methods=["POST"])
def add_transactions():
    body = request.get_json()
    order = body.get("order", None)
    date = body.get("date", None)
    amount = body.get("amount", None)
    commission = body.get("commission", None)

    if order is None or date is None or amount is None or commission is None:
        return {"msg": "Missing fields"}, 400
    
    try:
        transaction = Transactions(order=order, date=date, amount=amount, commission=commission)
        db.session.add(transaction)
        db.session.commit()
        return {"msg": "Transaction added succesfully"}, 200
    except ValueError as error:
        return {"msg": "Something went wrong" + error}, 500

@api.route("get-transactions", methods=["GET"])
@jwt_required()
def get_transactions():
    front_username = request.args.get("username", None)
    username = get_jwt_identity()
    if username != front_username:
        return {"msg": "User not authorized"}, 501
    transactions = Transactions.query.all()
    if transactions is None:
        return {"msg": "There are not transactions yet"}, 400
    return [transaction.serialize() for transaction in transactions], 200

@api.route("payment", methods=["POST"])
def pay():  
  data = request.get_json()
  intent = None
  print(data)
  try: 
    if 'payment_method_id' in data:
      # Create the PaymentIntent
      intent = stripe.PaymentIntent.create(
        payment_method = data['payment_method_id'],
        amount = data['amount'],
        currency = 'USD', 
        confirmation_method = 'manual',  
        confirm = True,   
        return_url='https://vital-gym.netlify.app/payment-success'                 
      )
      #return {"msg": "Payment done successfully"}, 200
    elif 'payment_intent_id' in data:
      intent = stripe.PaymentIntent.confirm(data['payment_intent_id'])

  except stripe.error.CardError as e:
    # Display error on client
    return {'error': e.user_message}, 200
  try :
    # save the transaction
    transaction = Transactions(payment_id=intent.id, order=data["order"], amount=intent.amount/100)
    db.session.add(transaction)
    db.session.commit()
    return generate_response(intent)
  except Exception as error:
        stripe.PaymentIntent.cancel(intent.id)
        return {"msg": "Something went wrong" + error}, 500

def generate_response(intent):
  # Note that if your API version is before 2019-02-11, 'requires_action'
  # appears as 'requires_source_action'.
  print(intent.status)
  if intent.status == 'requires_action' and intent.next_action.type == 'use_stripe_sdk':
    # Tell the client to handle the action
    return {
      'requires_action': True,
      'payment_intent_client_secret': intent.client_secret,
    }, 200
  elif intent.status == 'succeeded':
    # the transaction need to be save in the database
    # save the transaction
    
    
    return {'success': True}, 200  
  else:
    # Invalid status
    return {'error': 'Invalid PaymentIntent status'}, 500
  
    
@api.route("my-profile/<username>", methods=["GET"])
@jwt_required()
def get_profile(username):
    front_username = request.args.get("username", None)
    username = get_jwt_identity()
    if username != front_username:
        return {"msg": "User not authorized"}, 501
    user = User.query.filter_by(username=username).first()
    profile = Profile.query.filter_by(user=user).first()
    if user is None or profile is None:
        return {"msg": "User doesn't exist"}, 400
    return profile.serialize(), 200

@api.route("update-profile/<username>", methods=["PUT"])
def update_profile(username):
    body = request.get_json()
    jobies = body.get("jobies", None)
    profile_image = body.get("profile_image", None)
    description = body.get("description", None)
    phone = body.get("phone", None)
    name = body.get("name", None)
    lastname = body.get("lastname", None)
    email = body.get("email", None)

    if jobies is None or profile_image is None or description is None or phone is None or name is None or lastname is None or email is None:
        return {"msg": "Missing fields"}, 400
    user = User.query.filter_by(username=username).first()
    profile = Profile.query.filter_by(user=user).first()

    if user is None:
        return {"msg": "User doesn't exist"}, 400
    
    try:
        profile.jobies = jobies
        profile.profile_image = profile_image
        profile.description = description
        profile.phone = phone
        user.name = name
        user.lastname = lastname
        user.email = email
        db.session.commit()
        return {
            "msg": "Profile updated succesfully",
            "user": user.serialize(),
            "profile": profile.serialize()}, 200
    except ValueError as error:
        return {"msg": "Something went wrong" + error}, 500
    
@api.route("update-user", methods=["PUT"])
@jwt_required()
def update_user_data():
    front_username = request.args.get("username", None)
    username = get_jwt_identity()
    if username != front_username:
        return {"msg": "User not authorized"}, 501
    body = request.get_json()
    name = body.get("name", None)
    lastname = body.get("lastname", None)
    email = body.get("email", None)
    description = body.get("description", None)
    phone = body.get("phone", None)
    jobies = body.get("jobies", None)
    if name is None or lastname is None or email is None or description is None or phone is None or jobies is None:
        return {"msg": "Missing fields"}, 400
    user = User.query.filter_by(username=username).first()
    profile = Profile.query.filter_by(user=user).first()

    if user is None:
        return {"msg": "User doesn't exist"}, 400
    
    try:        
        user.name = name
        user.lastname = lastname
        user.email = email
        db.session.commit()
        profile.description = description
        profile.phone = phone
        profile.jobies = jobies
        db.session.commit()
        return {
            "msg": "User updated successfully",
            "status": "ok",
            "user": user.serialize(),
            "profile": profile.serialize()}, 200
    except ValueError as error:
        return {"msg": "Something went wrong" + error}, 500
    
@api.route("reset-password", methods=["PUT"])
@jwt_required()
def reset_password():    
    front_username = request.args.get("username", None)
    username = get_jwt_identity()
    if username != front_username:
        return {"msg": "User not authorized"}, 501
    #return {"msg": "before query"}, 501
    body = request.get_json()
    email = body.get("email", None)
    username_user = body.get("username", None)
    password = body.get("password", None)    
    if username_user is None or email is None or password is None:
        return {"msg": "Missing fields"}, 400
    
    user = User.query.filter_by(username=username_user).first()
    if user is None:
        return {"msg": "User doesn't exist"}, 400
    try:
        bpassword = bytes(password, "utf-8")
        salt = bcrypt.gensalt()
        hashed = bcrypt.hashpw(bpassword, salt)
        user.password = hashed.decode("utf-8")
        db.session.commit()
        return {"msg": "Password reset successfully", "status": "ok"}, 200
    except ValueError as error:
        return {"msg": "Something went wrong" + error}, 500
    
                 

    
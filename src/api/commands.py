
import click
from api.models import db, User, Administrator
import bcrypt

"""
In this file, you can add as many commands as you want using the @app.cli.command decorator
Flask commands are usefull to run cronjobs or tasks outside of the API but sill in integration 
with youy database, for example: Import the price of bitcoin every night as 12am
"""
def setup_commands(app):
    
    """ 
    This is an example command "insert-test-users" that you can run from the command line
    by typing: $ flask insert-test-users 5
    Note: 5 is the number of users to add
    """
    @app.cli.command("add-admin")
    def add_admin():
        try:
            admin = Administrator.query.filter_by(username="admin").first()
            if admin:
                print("Admin user already exists")
                return           
            bpassword = bytes("12345", "utf-8")
            salt = bcrypt.gensalt()
            hashed = bcrypt.hashpw(bpassword, salt)
            admin = Administrator(
                    email="admin@vital.com",               
                    password=hashed.decode("utf-8"),
                    username="admin",
                    name="Administrator",
                    lastname="Vital",                    
                )  
            db.session.add(admin)
            db.session.commit()
            print("Admin: ", admin.email, " created.")
        except Exception as e:
            print(e)
            print("Admin user already exists")          

    # @app.cli.command("insert-test-users") # name of our command
    # def insert_test_users():
    #     """Inserts test users into the database"""
    #     try:
    #         for i in range(1, 6):
    #             bpassword = bytes("12345", "utf-8")
    #             salt = bcrypt.gensalt()
    #             hashed = bcrypt.hashpw(bpassword, salt)
    #             user = User(
    #                 email="user"+ str(i) +"@vital.com",
    #                 password=hashed.decode("utf-8"),
    #                 username="user"+ str(i),
    #                 name="User"+ str(i),
    #                 lastname="Vital"+ str(i)
    #             )
    #             db.session.add(user)
    #             db.session.commit()
    #             print("User: ", user.usrname, " created.")
    #     except Exception as e:
    #         print(e)
    #         print("Users already exists")
            

    # @app.cli.command("insert-test-data")
    # def insert_test_data():
    #     pass
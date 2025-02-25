# __init__.py

from flask import Flask
from flask_cors import CORS
from pymongo import MongoClient
from .config import Config
from .api.tasks import tasks_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    client = MongoClient(app.config["MONGO_URI"])
    db = client["task_tracker"]
    app.db = db

    CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})
    app.register_blueprint(tasks_bp)

    @app.route('/test')
    def test():
        return {"status": "Backend is alive"}


    return app

    
    

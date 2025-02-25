# tasks.py

from flask import Blueprint, current_app, jsonify, request
from ..models.task import get_all_tasks, add_task, update_task, delete_task

tasks_bp = Blueprint("tasks", __name__, url_prefix="/tasks")

@tasks_bp.route("/", methods=["GET"])
def get_tasks():
    db = current_app.db
    tasks = get_all_tasks(db)
    return jsonify(tasks)

@tasks_bp.route("/", methods=["POST"])
def add_new_task():
    title = request.get_json()["title"]
    db = current_app.db
    task = add_task(db, title)
    return jsonify(task)

@tasks_bp.route("/<task_id>", methods=["PUT"])
def update_existing_task(task_id):
    done = request.get_json()["done"]
    db = current_app.db
    task = update_task(db,task_id, done)
    return jsonify(task)

@tasks_bp.route("/<task_id>", methods=["DELETE"])
def delete_existing_task(task_id):
    db = current_app.db
    result = delete_task(db,task_id)
    return jsonify(result)
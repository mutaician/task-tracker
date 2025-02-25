from bson.objectid import ObjectId

def get_all_tasks(db):
    task_list = []
    for task in db.tasks.find():
        task_id = str(task["_id"])
        task_list.append({
            "_id": task_id,
            "title": task["title"],
            "done": task["done"]
        })
    return task_list

def add_task(db, title):
    task = {"title": title, "done": False}
    result = db.tasks.insert_one(task)
    task_result = db.tasks.find_one({"_id": result.inserted_id})
    task_result["_id"] = str(task_result["_id"])
    return task_result

def update_task(db, task_id, done):
    oid = ObjectId(task_id)
    db.tasks.update_one({"_id": oid}, {"$set": {"done": done}})
    task_result = db.tasks.find_one({"_id": oid})
    task_result["_id"] = str(task_result["_id"])
    return task_result

def delete_task(db, task_id):
    oid = ObjectId(task_id)
    result = db.tasks.delete_one({"_id": oid})
    if result.deleted_count == 1:
        return {"Success": True}
    else:
        return {"Success": False}
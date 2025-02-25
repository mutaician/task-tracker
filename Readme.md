# Task Tracker
A simple task management app built with React (frontend), Flask (backend), and MongoDB.

## Setup
- **Backend**: `cd server`, `source venv/bin/activate`, `uv pip install -r requirements.txt`, `python run.py`
- **Frontend**: `cd client`, `pnpm install`, `pnpm run dev`
- Requires MongoDB running locally on `mongodb://127.0.0.1:27017`.

## Features
- Add, toggle, and delete tasks.
- Persisted in MongoDB.
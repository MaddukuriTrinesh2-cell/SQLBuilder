# PromptQL

A lightweight, fast, and intuitive web application that allows users to connect to a relational database, explore the schema, and write SQL queries using natural language.

## Features

- **Database Schema Explorer**: Connect to an SQLite database and view tables, columns, and data types.
- **Natural Language to SQL**: Enter plain English instructions to generate SQL queries. (Currently a placeholder).
- **Three-Panel UI**: A clean, efficient layout for exploring schema, writing prompts, and viewing generated SQL.

## Security

We understand that connecting your database to an LLM raises security concerns. Here's how we address them:

- **We only send schema, not data:** When you connect your database, we only send the table and column names (the schema) to the LLM. We never send your actual data.
- **You have full control:** You can choose which tables and columns are exposed to the LLM. This allows you to hide sensitive information.
- **Your credentials are safe:** We never store your database credentials. They are only used to connect to your database and are discarded immediately after.

## Tech Stack

- **Backend**: Python, FastAPI, SQLAlchemy
- **Frontend**: Next.js, React, TypeScript, Tailwind CSS

## How to Run

### 1. Backend Setup

```bash
# Navigate to the backend directory
cd backend

# Create a virtual environment and activate it
python -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`

# Install dependencies
pip install -r requirements.txt

# Set up the initial SQLite database
python setup_db.py

# Run the FastAPI server
uvicorn main:app --reload
```
The backend will be available at `http://127.0.0.1:8000`.

### 2. Frontend Setup

```bash
# Navigate to the frontend directory in a new terminal
cd frontend

# Install dependencies
npm install

# Run the Next.js development server
npm run dev
```
The frontend will be available at `http://localhost:3000`
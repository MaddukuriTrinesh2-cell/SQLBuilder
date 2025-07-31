import sqlite3

def setup_database():
    """Creates and populates the SQLite database with sample data."""
    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()

    # Drop tables if they exist to ensure a clean slate
    cursor.execute("DROP TABLE IF EXISTS employees")
    cursor.execute("DROP TABLE IF EXISTS departments")

    # Create departments table
    cursor.execute("""
    CREATE TABLE departments (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL
    )""")

    # Create employees table
    cursor.execute("""
    CREATE TABLE employees (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        salary REAL,
        department_id INTEGER,
        FOREIGN KEY (department_id) REFERENCES departments (id)
    )""")

    # Insert sample data
    cursor.execute("INSERT INTO departments (id, name) VALUES (1, 'Engineering'), (2, 'Sales')")
    cursor.execute("INSERT INTO employees (name, salary, department_id) VALUES ('Alice', 80000, 1), ('Bob', 95000, 1), ('Charlie', 65000, 2)")

    conn.commit()
    conn.close()
    print("Database `database.db` created and populated successfully.")

if __name__ == "__main__":
    setup_database()
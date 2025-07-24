import os
import sqlite3

def create_database_schema():
    """
    Connects to the SQLite database and creates the necessary tables
    if they do not already exist. This script focuses solely on schema creation, and only needs to be ran once.
    """
    # Determine the path to the database file
    # This assumes the script is in SCOUT/utils/ and the DB is in SCOUT/server/src/db.sqlite
    current_dir = os.path.dirname(os.path.abspath(__file__))
    db_path = os.path.join(current_dir, '..', 'server', 'src', 'db.sqlite')
    db_path = os.path.abspath(db_path)

    print(f"Attempting to create/connect to database schema at: {db_path}")

    try:
        # Connect to the database (it will be created if it doesn't exist)
        with sqlite3.connect(db_path) as conn:
            cur = conn.cursor()

            # Enable foreign key enforcement
            cur.execute("PRAGMA foreign_keys = ON;")
            print("Foreign key enforcement enabled.")

            # Create PRODUCT table
            # pid: Primary Key, auto-incrementing
            # pname: Product Name (TEXT, UNIQUE to prevent duplicates)
            # yield: Yield ratio (REAL, default to 1.0 if not provided)
            # date_added: Date the product was added (TEXT, stores as YYYY-MM-DD)
            cur.execute("""
                CREATE TABLE IF NOT EXISTS PRODUCT (
                    pid INTEGER PRIMARY KEY AUTOINCREMENT,
                    pname TEXT NOT NULL UNIQUE,
                    yield REAL DEFAULT 1.0,
                    date_added TEXT NOT NULL
                );
            """)
            print("Table 'PRODUCT' checked/created.")

            # Create SALES table
            # pid: Foreign Key to PRODUCT.pid
            # date: Sale date (TEXT, YYYY-MM-DD)
            # sold: Number of units sold (INTEGER)
            # promo_count: Number of promotional units (INTEGER)
            # UNIQUE constraint on (pid, date) to prevent duplicate sales entries for the same product on the same day
            cur.execute("""
                CREATE TABLE IF NOT EXISTS SALES (
                    pid INTEGER NOT NULL,
                    date TEXT NOT NULL,
                    sold INTEGER DEFAULT 0,
                    promo_count INTEGER DEFAULT 0,
                    PRIMARY KEY (pid, date),
                    FOREIGN KEY (pid) REFERENCES PRODUCT(pid)
                );
            """)
            print("Table 'SALES' checked/created.")

            # Create SALES_DAYPART table
            # pid: Foreign Key to PRODUCT.pid
            # date: Sale date (TEXT, YYYY-MM-DD)
            # daypart_name: e.g., 'breakfast', 'lunch', 'afternoon', 'dinner' (TEXT)
            # sold_and_promo_count: Total units sold including promo for that daypart (INTEGER)
            # UNIQUE constraint on (pid, date, daypart_name)
            cur.execute("""
                CREATE TABLE IF NOT EXISTS SALES_DAYPART (
                    pid INTEGER NOT NULL,
                    date TEXT NOT NULL,
                    daypart_name TEXT NOT NULL,
                    sold_and_promo_count INTEGER DEFAULT 0,
                    PRIMARY KEY (pid, date, daypart_name),
                    FOREIGN KEY (pid, date) REFERENCES SALES(pid, date)
                );
            """)
            print("Table 'SALES_DAYPART' checked/created.")

            # Create WASTE table
            # pid: Foreign Key to PRODUCT.pid
            # date: Waste date (TEXT, YYYY-MM-DD)
            # unit_quantity: Quantity of units wasted (INTEGER)
            # UNIQUE constraint on (pid, date) to prevent duplicate waste entries for the same product on the same day
            cur.execute("""
                CREATE TABLE IF NOT EXISTS WASTE (
                    pid INTEGER NOT NULL,
                    date TEXT NOT NULL,
                    unit_quantity INTEGER DEFAULT 1,
                    PRIMARY KEY (pid, date),
                    FOREIGN KEY (pid) REFERENCES PRODUCT(pid)
                );
            """)
            print("Table 'WASTE' checked/created.")

            # Create YIELD_RATIO table
            cur.execute("""
                CREATE TABLE IF NOT EXISTS YIELD_RATIO (
                    pid1 INTEGER NOT NULL,
                    pid2 INTEGER NOT NULL,
                    ratio REAL NOT NULL,
                    quantity_unit TEXT NOT NULL,
                    PRIMARY KEY (pid1, pid2),
                    FOREIGN KEY (pid1) REFERENCES PRODUCT(pid),
                    FOREIGN KEY (pid2) REFERENCES PRODUCT(pid)
                );
            """)
            print("Table 'YIELD_RATIO' checked/created.")

            # Create PREFERRED_PRODUCTS table
            cur.execute("""
                CREATE TABLE IF NOT EXISTS PREFERRED_PRODUCTS (
                    pname TEXT NOT NULL,
                    preferred_pid INTEGER NOT NULL,
                    PRIMARY KEY (pname),
                    FOREIGN KEY (preferred_pid) REFERENCES PRODUCT(pid)
                );
            """)
            print("Table 'PREFERRED_PRODUCTS' checked/created.")

            conn.commit() # Commit all changes to the database
            print("Database schema initialized successfully.")

    except sqlite3.Error as e:
        print(f"An SQLite error occurred: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

if __name__ == "__main__":
    create_database_schema()

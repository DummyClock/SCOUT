import os
import sqlite3

def insert_sample_data():
    """
    Connects to the SQLite database and inserts sample data into the tables.
    Assumes the tables (PRODUCT, SALES, SALES_DAYPART, WASTE) already exist.
    """
    # Determine the path to the database file
    # This assumes the script is in SCOUT/utils/ and the DB is in SCOUT/server/src/db.sqlite
    current_dir = os.path.dirname(os.path.abspath(__file__))
    db_path = os.path.join(current_dir, '..', 'server', 'src', 'db.sqlite')
    db_path = os.path.abspath(db_path)

    print(f"Attempting to connect to database for data insertion at: {db_path}")

    try:
        # Connect to the database
        with sqlite3.connect(db_path) as conn:
            cur = conn.cursor()

            # --- Insert sample products ---
            # Using INSERT OR IGNORE to prevent errors if running multiple times
            # Note: Explicit PIDs are provided here as in your JS, ensure they don't clash
            # if you have existing auto-incremented data.
            product_data = [
                (1, 'Sandwich - CFA', 1, "DATE('now')"),
                (2, 'Sandwich - CFA Deluxe No Cheese', 1, "DATE('now')"),
                (3, 'Sandwich - CFA Deluxe w/American', 1, "DATE('now')"),
                (4, 'Sandwich - CFA Deluxe w/Colby Jack', 1, "DATE('now')"),
                (5, 'Sandwich - CFA Deluxe w/Pepper Jack', 1, "DATE('now')"),
                (6, 'Sandwich - Spicy Deluxe w/Colby Jack', 1, "DATE('now')"),
                (7, 'Sandwich - Spicy Deluxe w/Pepper Jack', 1, "DATE('now')"),
                (8, 'Nuggets, 30 Count', 30, "DATE('now')"),
                (9, 'Strips, 4 Count', 4, "DATE('now')")
            ]
            for pid, pname, yield_val, date_added in product_data:
                cur.execute("INSERT OR IGNORE INTO PRODUCT (pid, pname, yield, date_added) VALUES (?, ?, ?, ?)",
                            (pid, pname, yield_val, date_added))
            print("Sample products inserted/ignored.")

            # --- Insert sample sales ---
            sales_data = [
                (1, "DATE('now')", 60, 2), (2, "DATE('now')", 60, 2), (3, "DATE('now')", 60, 2),
                (4, "DATE('now')", 60, 2), (5, "DATE('now')", 60, 2), (6, "DATE('now')", 45, 3),
                (7, "DATE('now')", 38, 2), (8, "DATE('now')", 25, 1), (9, "DATE('now')", 20, 0)
            ]
            for pid, date, sold, promo_count in sales_data:
                cur.execute("INSERT OR IGNORE INTO SALES (pid, date, sold, promo_count) VALUES (?, ?, ?, ?)",
                            (pid, date, sold, promo_count))
            print("Sample sales inserted/ignored.")

            # --- Insert sample daypart data ---
            sales_daypart_data = [
                (1, "DATE('now')", 'breakfast', 0), (1, "DATE('now')", 'lunch', 30),
                (1, "DATE('now')", 'afternoon', 5), (1, "DATE('now')", 'dinner', 25),
                (2, "DATE('now')", 'breakfast', 0), (2, "DATE('now')", 'lunch', 34),
                (2, "DATE('now')", 'afternoon', 9), (2, "DATE('now')", 'dinner', 25),
                (3, "DATE('now')", 'breakfast', 0), (3, "DATE('now')", 'lunch', 30),
                (3, "DATE('now')", 'afternoon', 5), (3, "DATE('now')", 'dinner', 25),
                (4, "DATE('now')", 'breakfast', 0), (4, "DATE('now')", 'lunch', 30),
                (4, "DATE('now')", 'afternoon', 5), (4, "DATE('now')", 'dinner', 25),
                (5, "DATE('now')", 'breakfast', 0), (5, "DATE('now')", 'lunch', 30),
                (5, "DATE('now')", 'afternoon', 5), (5, "DATE('now')", 'dinner', 25),
                (6, "DATE('now')", 'lunch', 25), (6, "DATE('now')", 'dinner', 20),
                (7, "DATE('now')", 'lunch', 20), (7, "DATE('now')", 'dinner', 18),
                (8, "DATE('now')", 'lunch', 15), (8, "DATE('now')", 'dinner', 10),
                (9, "DATE('now')", 'lunch', 12), (9, "DATE('now')", 'dinner', 8)
            ]
            for pid, date, daypart_name, sold_and_promo_count in sales_daypart_data:
                cur.execute("INSERT OR IGNORE INTO SALES_DAYPART (pid, date, daypart_name, sold_and_promo_count) VALUES (?, ?, ?, ?)",
                            (pid, date, daypart_name, sold_and_promo_count))
            print("Sample daypart data inserted/ignored.")

            # --- Insert sample waste data ---
            waste_data = [
                (1, "DATE('now')", 0), (2, "DATE('now')", 0), (3, "DATE('now')", 0),
                (4, "DATE('now')", 0), (5, "DATE('now')", 0), (6, "DATE('now')", 1),
                (7, "DATE('now')", 2), (8, "DATE('now')", 0), (9, "DATE('now')", 1)
            ]
            for pid, date, unit_quantity in waste_data:
                cur.execute("INSERT OR IGNORE INTO WASTE (pid, date, unit_quantity) VALUES (?, ?, ?)",
                            (pid, date, unit_quantity))
            print("Sample waste data inserted/ignored.")

            conn.commit() # Commit all changes to the database
            print("Sample data inserted successfully.")

    except sqlite3.Error as e:
        print(f"An SQLite error occurred during data insertion: {e}")
    except Exception as e:
        print(f"An unexpected error occurred during data insertion: {e}")

if __name__ == "__main__":
    insert_sample_data()
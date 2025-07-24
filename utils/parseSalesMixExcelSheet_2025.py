import re
import os
import pandas as pd
import sqlite3

# Path to db file
current_dir = os.path.dirname(os.path.abspath(__file__))
db_path = os.path.join(current_dir, '..', 'db', 'data.db')
db_path = os.path.abspath(db_path)

# Read keywords from a file (hardcode it for now, but will read from a file in the future)
keyword_collection = {
    "Protein": {
        "Filets": [r".*Sandwich.*CFA.*", r"Filet - CFA"],
        "Spicy": [r".*Sandwich.*Spicy.*", r"Filet - Spicy"],
        "Nuggets": [r"Nuggets, .*"],
        "Strips": [r"Strips, .*"]
    },
    "Prep": {
    }
}

# Flatten all patterns (assuming patterns are not empty)
all_patterns = []
for category, subdict in keyword_collection.items():
    for key, patterns in subdict.items():
        all_patterns.extend(patterns)
combined_pattern = '|'.join(all_patterns)

# Store the column numbers for Product_name, Sold, & Promo
PNAME_IDX = 0
PROMO_IDX = 5
SOLD_IDX = 14

# Connect to the database using a 'with' statement for proper resource management
with sqlite3.connect(db_path) as conn:
    cur = conn.cursor()

    # Open up each Excel Sheet
    folder_path = './excelSheets'
    if not os.path.exists(folder_path):
        print(f"Error: Folder '{folder_path}' does not exist.")
    else:
        for file_name in os.listdir(folder_path):
            full_path = os.path.join(folder_path, file_name)

            # Skip non-Excel files
            if not file_name.lower().endswith(('.xlsx', '.xls')):
                print(f"Skipping non-Excel file: {file_name}")
                continue

            print(f"Processing file: {file_name}")
            try:
                # Downloaded headers are weird, so we need to do some formatting
                df = pd.read_excel(full_path, header=[5, 6, 7]) 
            except Exception as e:
                print(f"Error reading Excel file {file_name}: {e}")
                continue # Skip to the next file

            # Check if the DataFrame is empty or doesn't have enough columns
            if df.empty or df.shape[1] <= max(PNAME_IDX, PROMO_IDX, SOLD_IDX):
                print(f"Skipping {file_name}: DataFrame is empty or has too few columns.")
                continue

            # Search each row for data
            for index, row_data in df.iterrows():
                try:
                    pname = str(row_data.iat[PNAME_IDX])
                    promo_str = str(row_data.iat[PROMO_IDX])
                    sold_str = str(row_data.iat[SOLD_IDX])
                except IndexError:
                    print(f"Skipping row {index} in {file_name}: Column index out of bounds. Check PNAME_IDX, PROMO_IDX, SOLD_IDX.")
                    continue
                except Exception as e:
                    print(f"Skipping row {index} in {file_name}: Error accessing cell data - {e}")
                    continue

                # Add data into DB -> Regex match combined_pattern
                if re.search(combined_pattern, pname):
                    # Try to convert sold and promo to integers (originally floats), otherwise skip
                    try:
                        sold = int(float(sold_str))
                        promo = int(float(promo_str))
                    except ValueError:
                        print(f"Warning: Could not convert sold ('{sold_str}') or promo ('{promo_str}') for product '{pname}' in file '{file_name}'. Skipping this product.")
                        continue # Skip

                    # --- PID and PRODUCT/PREFERRED_PRODUCTS Logic ---
                    # 1. Check if product already exists in PRODUCT table
                    cur.execute("SELECT pid FROM PRODUCT WHERE pname = ?", (pname,))
                    result = cur.fetchone()

                    pid = None
                    if result:
                        pid = result[0] # Product already exists, get its PID
                    else:
                        # Product does not exist, insert into PRODUCT table
                        # Note: pid is auto-incremented, omit it from the INSERT statement
                        cur.execute("""
                            INSERT INTO PRODUCT (pname, yield, date_added) VALUES (?, ?, DATE('now', '-1 day'))
                        """, (pname, 1)) # 'yield' is hardcoded to 1, 
                        pid = cur.lastrowid # Get the ID of the last inserted row

                    if pid is None:
                        print(f"Error: Could not determine PID for product '{pname}'. Skipping.")
                        continue # Safety measure, if this branch runs then autoincrement is not working

                    # 2. Add product to PREFERRED_PRODUCTS table (if it's not already there)
                    cur.execute("INSERT OR IGNORE INTO PREFERRED_PRODUCTS (pname, preferred_pid) VALUES (?, ?)", (pname, pid))

                    # 3. Insert into SALES table
                    # IGNORE if a record with the same pid and date already exists
                    cur.execute("""
                        INSERT OR IGNORE INTO SALES (pid, date, sold, promo_count) VALUES (?, DATE('now', '-1 day'), ?, ?)
                    """, (pid, sold, promo))

            # Commit changes after each file is processed
            conn.commit() 
    print("All Excel files processed. Data committed to the database.")
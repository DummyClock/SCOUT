import re
import os
import pandas as pd
import sqlite3
from datetime import datetime, timedelta
import sys # Import sys for stderr

def validate_or_get_yesterday(date_str=None):
    """
    Validates a SQL-style date string (YYYY-MM-DD).
    If valid, returns the formatted date string.
    If date_str is None or invalid, returns yesterday's date in YYYY-MM-DD format.
    """
    if date_str:
        try:
            parsed_date = datetime.strptime(date_str, "%Y-%m-%d")
            return parsed_date.strftime("%Y-%m-%d")
        except ValueError:
            # date string is not in the expected format
            print(f"Invalid date format passed: '{date_str}'. Using yesterday's date instead.", file=sys.stderr)
    
    # If no date string is provided or parsing failed, return yesterday's date
    yesterday = datetime.now() - timedelta(days=1)
    return yesterday.strftime("%Y-%m-%d")

def generateYieldValue(pname):
    """
    Determines the yield value for a product based on its name.
    It first tries to extract a number from the product name.
    If no number is found, it checks for specific "Tray" items and returns
    a hardcoded yield value based on tray type and size.
    Defaults to 1.0 if no specific yield is determined.
    """
    number_pattern = r'\d+\.?\d*'
    match_number = re.search(number_pattern, pname)
    if match_number:
        try:
            return float(match_number.group(0)) # Returns the number as a float
        except ValueError:
            # If the extracted number cannot be converted to float, default to 1.0
            print(f"Warning: Could not convert extracted number '{match_number.group(0)}' to float for product '{pname}'. Using default yield 1.0.", file=sys.stderr)
            return 1.0

    # If no number is found, check for specific "Tray" items
    tray_pattern = r"^(Nugget Tray|Chicken\s*Strips Tray),\s*(Small|Medium|Large)$"
    match_tray = re.fullmatch(tray_pattern, pname)

    if match_tray:
        # Hardcoded: Extract the tray type and size using capturing groups (eventually should be read from a file instead)
        tray_type = match_tray.group(1)
        tray_size = match_tray.group(2)

        if tray_type == "Nugget Tray":
            if tray_size == "Small":
                return 64.0
            elif tray_size == "Medium":
                return 120.0
            elif tray_size == "Large":
                return 200.0
        elif tray_type == "Chicken Strips Tray":
            if tray_size == "Small":
                return 24.0
            elif tray_size == "Medium":
                return 45.0
            elif tray_size == "Large":
                return 75.0
        # If tray type/size matched but not in hardcoded values, return default
        return 1.0
    # return the default yield if no number or specific tray pattern is found
    return 1.0

def process_excel_data(date_to_use):
    """
    Processes Excel files from a specified folder, extracts product and sales data,
    and inserts it into an SQLite database.

    Args:
        date_to_use (str): The date string (YYYY-MM-DD) to be used for
                           'date_added' in PRODUCT and 'date' in SALES table insertions.
    """
    # Path to db file
    current_dir = os.path.dirname(os.path.abspath(__file__))
    db_path = os.path.join(current_dir, '..', 'server', 'src', 'db.sqlite')
    db_path = os.path.abspath(db_path)

    print(f"Attempting to connect to database at: {db_path}")

    try:
        # Connect to the database using a 'with' statement for proper resource management
        with sqlite3.connect(db_path) as conn:
            cur = conn.cursor()
            cur.execute("PRAGMA foreign_keys = ON;") # Ensure foreign key constraints are enforced

            # Read keywords from a file (hardcode it for now, but will read from a file in the future)
            # These patterns are used to filter which product names to process
            keyword_collection = {
                "Protein": {
                    "Filets": [r".*Sandwich.*CFA.*", r"Filet - CFA"],
                    "Spicy": [r".*Sandwich.*Spicy.*", r"Filet - Spicy"],
                    "Nuggets": [r"Nuggets, .*", r".*Nugget Tray.*"],
                    "Strips": [r"Strips, .*", r".*Strips Tray.*"]
                },
                "Prep": {
                }
            }

            # Flatten all patterns into a single list for combined regex search
            all_patterns = []
            for category, subdict in keyword_collection.items():
                for key, patterns in subdict.items():
                    all_patterns.extend(patterns)
            combined_pattern = '|'.join(all_patterns) # Combine all patterns with OR

            # Store the column numbers for Product_name, Sold, & Promo
            PNAME_IDX = 0  # Index for Product Name column
            PROMO_IDX = 9  # Index for Promotional Count column
            SOLD_IDX = 14  # Index for Sold Units column

            # Open up each Excel Sheet from the specified folder
            folder_path = './excelSheets'
            if not os.path.exists(folder_path):
                print(f"Error: Folder '{folder_path}' does not exist. Please create it and place Excel files inside.", file=sys.stderr)
                return # Exit the function if the folder doesn't exist
            
            # Iterate through each file in the folder
            for file_name in os.listdir(folder_path):
                full_path = os.path.join(folder_path, file_name)

                # Skip directories and non-Excel files
                if os.path.isdir(full_path) or not file_name.lower().endswith(('.xlsx', '.xls')):
                    print(f"Skipping non-Excel file or directory: {file_name}")
                    continue

                print(f"Processing file: {file_name}")
                try:
                    # Read the Excel file, assuming headers are spread across rows 5, 6, and 7 (0-indexed)
                    df = pd.read_excel(full_path, header=[5, 6, 7])
                except Exception as e:
                    print(f"Error reading Excel file {file_name}: {e}", file=sys.stderr)
                    continue # Skip to the next file if reading fails

                # Check if the DataFrame is empty or doesn't have enough columns
                if df.empty or df.shape[1] <= max(PNAME_IDX, PROMO_IDX, SOLD_IDX):
                    print(f"Skipping {file_name}: DataFrame is empty or has too few columns for required indices.", file=sys.stderr)
                    continue

                # Iterate through each row of the DataFrame to extract and process data
                for index, row_data in df.iterrows():
                    try:
                        # Access data using .iat for integer-location based indexing
                        pname = str(row_data.iat[PNAME_IDX])
                        promo_str = str(row_data.iat[PROMO_IDX])
                        sold_str = str(row_data.iat[SOLD_IDX])
                    except IndexError:
                        print(f"Skipping row {index} in {file_name}: Column index out of bounds. Check PNAME_IDX, PROMO_IDX, SOLD_IDX definitions relative to Excel file structure.", file=sys.stderr)
                        continue
                    except Exception as e:
                        print(f"Skipping row {index} in {file_name}: Error accessing cell data - {e}", file=sys.stderr)
                        continue

                    # Only process rows where the product name matches one of the defined patterns
                    if re.search(combined_pattern, pname):
                        # Try to convert sold and promo to integers (they might be floats in Excel)
                        try:
                            sold = int(float(sold_str))
                            promo = int(float(promo_str))
                        except ValueError:
                            print(f"Warning: Could not convert sold ('{sold_str}') or promo ('{promo_str}') for product '{pname}' in file '{file_name}'. Skipping this product.", file=sys.stderr)
                            continue # Skip this product if conversion fails

                        # --- PID and PRODUCT/PREFERRED_PRODUCTS Logic ---
                        # 1. Check if product already exists in PRODUCT table to avoid duplicates
                        cur.execute("SELECT pid FROM PRODUCT WHERE pname = ?", (pname, ))
                        result = cur.fetchone()

                        pid = None
                        if result:
                            pid = result[0] # Product already exists, retrieve its PID
                        else:
                            # Product does not exist, insert into PRODUCT table
                            # 'pid' is AUTOINCREMENT, so it's omitted from INSERT.
                            # 'date_added' now uses the 'date_to_use' parameter.
                            cur.execute("""
                                INSERT INTO PRODUCT (pname, yield, date_added) VALUES (?, ?, ?)
                            """, (pname, generateYieldValue(pname), date_to_use))
                            pid = cur.lastrowid # Get the ID of the newly inserted row

                        if pid is None:
                            print(f"Error: Could not determine PID for product '{pname}'. Skipping.", file=sys.stderr)
                            continue # Safety measure: if PID isn't obtained, skip to prevent further errors

                        # 2. Add product to PREFERRED_PRODUCTS table (if it's not already there)
                        # INSERT OR IGNORE prevents errors if the product name already exists in this table
                        cur.execute("INSERT OR IGNORE INTO PREFERRED_PRODUCTS (pname, preferred_pid) VALUES (?, ?)", (pname, pid))

                        # 3. Insert into SALES table
                        # IGNORE if a record with the same pid and date already exists (PRIMARY KEY constraint)
                        # 'date' now uses the 'date_to_use' parameter.
                        cur.execute("""
                            INSERT OR IGNORE INTO SALES (pid, date, sold, promo_count) VALUES (?, ?, ?, ?)
                        """, (pid, date_to_use, sold, promo))

                # Commit changes after each file is processed to save progress
                conn.commit()
            print("All Excel files processed. Data committed to the database.")

    except sqlite3.Error as e:
        # Catch SQLite-specific errors (e.g., database file access issues, malformed SQL)
        print(f"An SQLite error occurred during database connection or operation: {e}", file=sys.stderr)
    except Exception as e:
        # Catch any other unexpected errors during the overall process
        print(f"An unexpected error occurred during processing: {e}", file=sys.stderr)

if __name__ == "__main__":
    # Get the input date from command-line arguments, if provided
    input_date = sys.argv[1] if len(sys.argv) > 1 else None
    
    # Validate the input date or get yesterday's date
    valid_date = validate_or_get_yesterday(input_date)
    print(f"No date passed, default to using date: {valid_date} for database insertions.") # Inform the user which date is being used
    
    # Process the Excel data and insert into the database using the determined valid_date
    process_excel_data(valid_date)
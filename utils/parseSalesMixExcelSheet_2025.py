""" 
    Find the row with the value “Entrees”
    Search backwards from the row with “Entrees”
    Search every row
        If pattern match with any of the keywords exist, take that row’s data (name, sold, promo) create entry in DB for PRODUCT (if it doesn’t exist (yield should default to 1), & SALES, 
        STOP once you read the row with “Desserts” header
"""
import re, os, pandas as pd;

# Read keywords from a file (hardcode it for now)
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

# Store the column numbers for Sold & Promo
PNAME_IDX = 0
PROMO_IDX = 5
SOLD_IDX = 14
#digital_offer_idx = 9

# Open up each Excel Sheet
folder_path = './excelSheets'
for file_name in os.listdir(folder_path):
    full_path = os.path.join(folder_path, file_name)
    df = pd.read_excel(full_path, header=[5,6,7])
    #print(df.iat[0, PNAME_IDX], df.iat[0, PROMO_IDX], df.iat[0, SOLD_IDX])   # For debugging




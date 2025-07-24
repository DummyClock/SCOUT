""" 
    Search every row
        If pattern match with any of the keywords exist, take that row’s data (name, sold, promo) create entry in DB for PRODUCT (if it doesn’t exist (yield should default to 1), & SALES, 
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

# Flatten all patterns
all_patterns = []
for category, subdict in keyword_collection.items():
    for key, patterns in subdict.items():
        all_patterns.extend(patterns)
combined_pattern = '|'.join(all_patterns)
#print("new regex pattern:", combined_pattern)

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

  # Search each df row
  for row in range(0,df.shape[0]):
    if re.match(combined_pattern, str(df.iat[row, PNAME_IDX])):
      print(str(df.iat[row, PNAME_IDX]), str(df.iat[row, PROMO_IDX]), str(df.iat[row, SOLD_IDX]))
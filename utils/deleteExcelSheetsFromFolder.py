import os

# Get absolute path to the excelSheets folder
current_dir = os.path.dirname(os.path.abspath(__file__))
folder_path1 = os.path.join(current_dir, 'excelSheets')
folder_path2 = os.path.join(current_dir, 'excelSheetsDaypart')

# Loop through .xsl & .xsls files in the folder
for filename in os.listdir(folder_path1):
    if filename.endswith('.xls') or filename.endswith('.xsls'):
        file_path = os.path.join(folder_path1, filename)
        try:
            os.remove(file_path)
            print(f"Deleted: {file_path}")
        except Exception as e:
            print(f"Error deleting {file_path}: {e}")

for filename in os.listdir(folder_path2):
    if filename.endswith('.xls') or filename.endswith('.xsls'):
        file_path = os.path.join(folder_path2, filename)
        try:
            os.remove(file_path)
            print(f"Deleted: {file_path}")
        except Exception as e:
            print(f"Error deleting {file_path}: {e}")

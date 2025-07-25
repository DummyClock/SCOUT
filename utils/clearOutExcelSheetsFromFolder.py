import os

# Get absolute path to the excelSheets folder
current_dir = os.path.dirname(os.path.abspath(__file__))
folder_path = os.path.join(current_dir, 'excelSheets')

# Loop through .xsl & .xsls files in the folder
for filename in os.listdir(folder_path):
    if filename.endswith('.xsl') or filename.endswith('.xsls'):
        file_path = os.path.join(folder_path, filename)
        try:
            os.remove(file_path)
            print(f"Deleted: {file_path}")
        except Exception as e:
            print(f"Error deleting {file_path}: {e}")

import os
import time
import shutil
from selenium import webdriver 
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import WebDriverException
from selenium.webdriver.support.ui import WebDriverWait
from datetime import date, timedelta
from auth import USERNAME, PASSWORD, PIN

# Default to using yesterday as startDate
def downloadSalesMix(startDate=None):
    # default grab yesterday 
    if startDate == None:
        startDate = str((date.today() - timedelta(days=1)).strftime("%m/%d/%Y"))
    print("Attempting to download salesMix for: ", startDate)

    # Temp: fix formatting of real startDate
    # startDate = "07/24/2025"

    #Prepare download location for files (if it doesn't exist already)
    daypart_dir = os.path.dirname(os.path.realpath(__file__))+ '\\excelSheetsDaypart'
    if not os.path.exists(daypart_dir):
        os.makedirs(daypart_dir)
        print("Created a directory to store regular salesMix\n\tPath: '" + daypart_dir +"'")

    regular_dir = os.path.dirname(os.path.realpath(__file__)) + '\\excelSheets'
    if not os.path.exists(regular_dir):
        os.makedirs(regular_dir)
        print("Created a  directory to store regdaypart salesMix\n\tPath: '" + regular_dir +"'")

    # Prepare Webdriver
    prefs = {
        "download.default_directory": daypart_dir,
        "download.prompt_for_download":False,
        "directory_upgrade":True,
    }
    options = Options()
    #options.add_argument("--headless=new")
    options.add_experimental_option("prefs", prefs)
    
    # Download files, Can attempt 3x 
    attempts = 0
    maxAttempts = 6
    while attempts < maxAttempts:
        try:
            # Launch webdriver instance
            driver = webdriver.Chrome(options = options)
            driver.get("https://www.cfahome.com/go/appurl.go?app=RSMW")
            print("Attempting CFAHome login")
            time.sleep(8) # Give time for dynamic elements to load  

            # Login (verify you're on the password variant not phone # variant)
            # Enter username
            driver.find_element(By.ID, "input28").send_keys(USERNAME)
            driver.find_element(By.XPATH, '//*[@type="submit"]').click()
            time.sleep(8)

            # if on phone_number page, switch to password page
            if driver.find_elements(By.XPATH, '//*[@class="phone-authenticator-challenge o-form o-form-edit-mode"]'):
                driver.find_element(By.CLASS_NAME, "link js-switchAuthenticator")
                driver.find_element(By.CSS_SELECTOR, '[aria-label="Select Password."]').click()
                time.sleep(8)

            # Enter password (CFAHome)
            driver.find_element(By.ID, "input54").send_keys(PASSWORD, Keys.ENTER)
            time.sleep(10)

            # If it asks for SMS...fetch code from email

            #Enter PIN (ServicePoint)
            driver.find_element(By.ID, "MainContent_txtEchoWindow").send_keys(PIN, Keys.ENTER)
            time.sleep(8)
            driver.find_element(By.ID, "tvMainMenut8").click() #(Opens Sales Mix dropdown)
            time.sleep(4)
            driver.find_element(By.ID, "tvMainMenut10").click() #(Opens Sales Mix)
            time.sleep(4)
            
        # 1. Fetch Regular Sales Mix Data
            files_before_download = set(os.listdir(daypart_dir))    # Take note of the empty directory

            # Set start date filter
            date_field_1 = driver.find_element(By.ID, "MainContent_BusDate1_I")
            date_field_1.click()
            time.sleep(2)
            for i in range(0,10):   # Clear out input box manually
                date_field_1.send_keys(Keys.BACKSPACE)
            time.sleep(2)
            date_field_1.send_keys(startDate)
            date_field_1.send_keys(Keys.ENTER)
            time.sleep(2)

            # Set end date filter
            date_field_2 = driver.find_element(By.ID, "MainContent_BusDate2_I")
            date_field_2.click()
            time.sleep(2)
            for i in range(0,10):   # Clear out input box manually
                date_field_2.send_keys(Keys.BACKSPACE)
            date_field_2.clear()
            date_field_2.send_keys(startDate)
            date_field_2.send_keys(Keys.ENTER)
            time.sleep(2)
            print("Attempting to download Regular Sales Mix data...")
            driver.find_element(By.ID, "MainContent_btnExportData").click()

            # Wait for the file to fully download, then move it
            download_timeout = 60 
            start_time = time.time()
            new_file_path = None
            while time.time() - start_time < download_timeout:
                current_files = set(os.listdir(daypart_dir))
                new_files = list(current_files - files_before_download)
                if new_files:
                    downloaded_filename = new_files[0]
                    new_file_path = os.path.join(daypart_dir, downloaded_filename)
                    # Check if the file is fully downloaded (e.g., not a .crdownload or .tmp file)
                    if not downloaded_filename.endswith(('.crdownload', '.tmp', '.part')):
                        print(f"Detected downloaded file: {downloaded_filename}")
                        break
                time.sleep(1)
            if new_file_path and os.path.exists(new_file_path):
                file_extension = os.path.splitext(new_file_path)[1]
                new_regular_filename = f"SalesMix_Regular_{startDate.replace('/', '-')}{file_extension}"
                destination_path_regular = os.path.join(regular_dir, new_regular_filename)
                shutil.move(new_file_path, destination_path_regular)
                print(f"Moved and renamed '{os.path.basename(new_file_path)}' to '{destination_path_regular}'")
            else:
                print(f"Error: Regular SalesMix file not found in '{daypart_dir}' after download within {download_timeout} seconds.")
                raise FileNotFoundError("Regular SalesMix file not found.")
            time.sleep(5) # Give a moment after moving the file




        # 2. Fetch Daypart variant of SalesMix Data
            driver.find_element(By.ID, "MainContent_mergReportType_RB1_I_D").click()
            time.sleep(12)

            # Set Report Items (Select Favorites)
            # Search in 'Favorites' for 'All Main Chicken'
            driver.find_element(By.ID, "MainContent_btnSavedItems_DXI0_T").click()
            time.sleep(3)
            driver.find_element(By.XPATH, "//span[text()='All Main Chicken']").click()
            time.sleep(8)
            driver.find_element(By.ID, "MainContent_btnExportData").click()

            # Search in 'Favorites' for 'Prep Entrees'
            driver.find_element(By.ID, "MainContent_btnSavedItems_DXI0_T").click()
            time.sleep(3)
            driver.find_element(By.XPATH, "//span[text()='Prep Entrees']").click()
            time.sleep(8)
            driver.find_element(By.ID, "MainContent_btnExportData").click()

            # Search in 'Favorites' for 'Prep Sides'
            driver.find_element(By.ID, "MainContent_btnSavedItems_DXI0_T").click()
            time.sleep(3)
            driver.find_element(By.XPATH, "//span[text()='Prep Sides']").click()
            time.sleep(8)
            driver.find_element(By.ID, "MainContent_btnExportData").click()

            # Signout
            time.sleep(3)
            driver.get("https://portal.cfahome.com/util/logout.aspx")

            return True   # escape while loop
        except WebDriverException as e:
            print("Connection error occured. Reattempting to launch in a minute...")
            attempts += 1
            #clearDirectory(download_dir)   # Delete temp files; attempt to redownload after the wait time
            time.sleep(60)

    #If connection error occured too many times, default to
    print("Unable to connect to CFA Home. Try again later.")
    return False

if __name__ == "__main__":
    downloadSalesMix()
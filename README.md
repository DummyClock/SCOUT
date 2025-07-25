# Welcome to the SCOUT Repo

## About
[ 🚧Under construction🚧 ]

### Development Stack
- Front-end: React JS
- Back-end: Node JS
- Database: SQLite
- UI Library: MaterialUI

## Getting Started
Assuming you are on **Windows** using **bash** (Git Bash, WSL, or similar). 
If you're using VS Code, do **Crtl + `** to access a Bash cdl Terminal. 
    - Also, you should open 2 separete terminals, one for the client & one for the server. 
      You can do this by going to the *Terminal* tab and clicking the **+** icon on the right side.

### Running Front-end
1. Navigate to client folder (Type **cd .\client**)
2. Install all dependencies (Type **npm install**)
3. Create a *.env* as such ↓↓↓
        +-------------------------------------------------------------+
        | # Make sure this mirrors PORT in ../server/.env         |
        | REACT_APP_SERVER_PORT=5000                                  |   
        +-------------------------------------------------------------+
4. Type **npm start** to launch

### Running Back-end
1. Navigate to client folder (Type **cd .\server**)
2. Install all dependencies (Type '**npm install**)
3. Create a *.env* as such ↓↓↓
        +-------------------------------------------------------------+
        | # Mirrors SERVER_PORT in ../client/.env                     |
        | PORT=5000                                                   |
        |                                                             |
        | # Matches front-end port                                    | 
        | CLIENT_ORIGIN=http://localhost:3000                         |
        |                                                             |
        | # Use an SQLite URI                                         |
        | DB_URI=''                                                   |
        +-------------------------------------------------------------+
4. Type **node .\src\index.js**

### Preparing Support Scripts
1. Navigate to utils folder (Type **cd .\utils**)
2. Create a *auth.py* as such ↓↓↓
        +-------------------------------------------------------------+
        | USERNAME = "insert CFAHome username here"                   |
        | PASSWORD = "insert CFAHome password here"                   |
        | PIN = "insert POS pin here"                                 |
        |                                                             |
        +-------------------------------------------------------------+
        
### Installing SQLite3 (Windows Instructions)
- This step is meant for debugging the SQLite DB
1. Go to https://www.sqlite.org/download.html
2. Under "Precompiled Binaries for Windows", install "sqlite-tools-win-x64-*.zip"
3. Extract file
4. Move extracted file to Root directory ("C:\")
5. *Optional:* Rename the file as sqlite3
6. Add path to system environment variables
   a. Copy the full file path of the new file 
   b. Tap the "Windows" button
   c. Type in "Edit Environment Variables" and click the first result
   d. Under the "Advance Tab", click "Environment Variables"
   e. Under the "System variables" section, double click "Path"
   f. Click on an empty cell, and paste the full file path
   g. Click "Ok"
7. Tap the "Windows" button && Type "Cld" && Click first result
8. In the console type "sqlite3" && Tap enter. If install correctly you should see the following message as output
+---------------------------------------------------------------+
| SQLite version 3.50.3 2025-07-17 13:25:10                      |
| Enter ".help" for usage hints.                                 |
| Connected to a transient in-memory database.                   |
| Use ".open FILENAME" to reopen on a persistent database.       |
| sqlite>                                                        |
+---------------------------------------------------------------+
9. Bonus: After you're server is live, you can check the database files by typing the following
   a. cd ../server/src  (Go to the src folder inside your server folder)
   b. type 'sqlite3 db.sqlite'
   c. You can run various commands here (i.e. '.tables' to see all the created tables)
   d. type '.exit' to escape



### That's it! You'll be able to start development!
#### **WARNING:** Everytime you pull, you'll have to type **npm install** individually in both the **client folder AND server folder**


## Development Phases
### Phase 1
- [ 🚧Under Construction🚧 ]

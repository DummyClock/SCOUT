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
        | # Make sure this mirrors PORT in ../server/src/.env         |
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

### That's it! You'll be able to start development!
#### **WARNING:** Everytime you pull, you'll have to type **npm install** individually in both the **client folder AND server folder**


## Development Phases
### Phase 1
- [ 🚧Under Construction🚧 ]

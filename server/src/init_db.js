/**
 * Create tables if they don't exist yet
 */
const db = require('./db');

const initDatabase = () => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            // all CREATE TABLE statements
            const createTablesSQL = `
                PRAGMA foreign_keys = ON; -- Enable foreign key enforcement in SQLite

                CREATE TABLE IF NOT EXISTS PRODUCT(
                    pid INTEGER PRIMARY KEY AUTOINCREMENT,
                    pname TEXT NOT NULL,
                    yield FLOAT DEFAULT 1,
                    date_added DATE NOT NULL
                );

                CREATE TABLE IF NOT EXISTS SALES(
                    pid INTEGER NOT NULL,
                    date DATE NOT NULL,
                    sold INTEGER DEFAULT 0,
                    promo_count INTEGER DEFAULT 0,
                    PRIMARY KEY (pid, date),
                    FOREIGN KEY (pid) REFERENCES PRODUCT(pid)
                );

                CREATE TABLE IF NOT EXISTS SALES_DAYPART(
                    pid INTEGER NOT NULL,
                    date DATE NOT NULL,
                    daypart_name TEXT NOT NULL,
                    sold_and_promo_count INTEGER DEFAULT 0,
                    PRIMARY KEY (pid, date, daypart_name),
                    FOREIGN KEY (pid, date) REFERENCES SALES(pid, date)
                );

                CREATE TABLE IF NOT EXISTS WASTE(
                    pid INTEGER NOT NULL,
                    date DATE NOT NULL,
                    unit_quantity INTEGER DEFAULT 1,
                    PRIMARY KEY (pid, date),
                    FOREIGN KEY (pid) REFERENCES PRODUCT(pid)
                );

                CREATE TABLE IF NOT EXISTS YIELD_RATIO (
                    pid1 INTEGER NOT NULL,
                    pid2 INTEGER NOT NULL,
                    ratio FLOAT NOT NULL,
                    quantity_unit TEXT NOT NULL,
                    PRIMARY KEY (pid1, pid2),
                    FOREIGN KEY (pid1) REFERENCES PRODUCT(pid),
                    FOREIGN KEY (pid2) REFERENCES PRODUCT(pid)
                );

                CREATE TABLE IF NOT EXISTS PREFERRED_PRODUCTS (
                    pname TEXT NOT NULL,
                    preferred_pid INTEGER NOT NULL,
                    PRIMARY KEY (pname),
                    FOREIGN KEY (preferred_pid) REFERENCES PRODUCT(pid)
                );

                -- Insert sample products
                INSERT OR IGNORE INTO PRODUCT (pid, pname, yield, date_added) VALUES
                (1, 'Sandwich - CFA', 1, DATE('now')),
                (2, 'Sandwich - CFA Deluxe No Cheese', 1, DATE('now')),
                (3, 'Sandwich - CFA Deluxe w/American', 1, DATE('now')),
                (4, 'Sandwich - CFA Deluxe w/Colby Jack', 1, DATE('now')),
                (5, 'Sandwich - CFA Deluxe w/Pepper Jack', 1, DATE('now')),
                (6, 'Sandwich - Spicy Deluxe w/Colby Jack', 1, DATE('now')),
                (7, 'Sandwich - Spicy Deluxe w/Pepper Jack', 1, DATE('now')),
                (8, 'Nuggets, 30 Count', 30, DATE('now')),
                (9, 'Strips, 4 Count', 4, DATE('now'));

                -- Insert sample sales
                INSERT OR IGNORE INTO SALES (pid, date, sold, promo_count) VALUES
                (1, DATE('now'), 60, 2),
                (2, DATE('now'), 60, 2),
                (3, DATE('now'), 60, 2),
                (4, DATE('now'), 60, 2),
                (5, DATE('now'), 60, 2),
                (6, DATE('now'), 45, 3),
                (7, DATE('now'), 38, 2),
                (8, DATE('now'), 25, 1),
                (9, DATE('now'), 20, 0);

                -- Insert sample daypart data
                INSERT OR IGNORE INTO SALES_DAYPART (pid, date, daypart_name, sold_and_promo_count) VALUES
                (1, DATE('now'), 'breakfast', 0),
                (1, DATE('now'), 'lunch', 30),
                (1, DATE('now'), 'afternoon', 5),
                (1, DATE('now'), 'dinner', 25),
                (2, DATE('now'), 'breakfast', 0),
                (2, DATE('now'), 'lunch', 34),
                (2, DATE('now'), 'afternoon', 9),
                (2, DATE('now'), 'dinner', 25),
                (3, DATE('now'), 'breakfast', 0),
                (3, DATE('now'), 'lunch', 30),
                (3, DATE('now'), 'afternoon', 5),
                (3, DATE('now'), 'dinner', 25),
                (4, DATE('now'), 'breakfast', 0),
                (4, DATE('now'), 'lunch', 30),
                (4, DATE('now'), 'afternoon', 5),
                (4, DATE('now'), 'dinner', 25),
                (5, DATE('now'), 'breakfast', 0),
                (5, DATE('now'), 'lunch', 30),
                (5, DATE('now'), 'afternoon', 5),
                (5, DATE('now'), 'dinner', 25),
                (6, DATE('now'), 'lunch', 25),
                (6, DATE('now'), 'dinner', 20),
                (7, DATE('now'), 'lunch', 20),
                (7, DATE('now'), 'dinner', 18),
                (8, DATE('now'), 'lunch', 15),
                (8, DATE('now'), 'dinner', 10),
                (9, DATE('now'), 'lunch', 12),
                (9, DATE('now'), 'dinner', 8);

                -- Insert sample waste data
                INSERT OR IGNORE INTO WASTE (pid, date, unit_quantity) VALUES
                (1, DATE('now'), 0),
                (2, DATE('now'), 0),
                (3, DATE('now'), 0),
                (4, DATE('now'), 0),
                (5, DATE('now'), 0),
                (6, DATE('now'), 1),
                (7, DATE('now'), 2),
                (8, DATE('now'), 0),
                (9, DATE('now'), 1);
            `;

            // Run the multiple SQL statements (don't use db.run())
            db.exec(createTablesSQL, (err) => {
                if (err) {
                    console.error('Error creating database tables:', err); // Changed error message for clarity
                    reject(err);
                } else {
                    console.log('Database tables initialized successfully');
                    resolve();
                }
            });
        });
    });
};

module.exports = initDatabase;
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

                CREATE TABLE IF NOT EXISTS PRODUCT_PRODUCT_RATIO (
                    pid1 INTEGER NOT NULL,
                    pid2 INTEGER NOT NULL,
                    ratio FLOAT NOT NULL,
                    quantity_unit TEXT NOT NULL,
                    PRIMARY KEY (pid1, pid2),
                    FOREIGN KEY (pid1) REFERENCES PRODUCT(pid),
                    FOREIGN KEY (pid2) REFERENCES PRODUCT(pid)
                );

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
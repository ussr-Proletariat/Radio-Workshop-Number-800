import Database from "better-sqlite3";
const db = new Database("schemes.db")

db.exec(`
    CREATE TABLE IF NOT EXISTS schemes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT null,
    data TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
`);

export function saveScheme(name: string, data: string) {
    db.prepare("INSERT INTO schemes (name, data) VALUES (?, ?)").run(name, data);
}

export function loadSchemes() {
    return db.prepare("SELECT * FROM schemes ORDER BY id DESC").all();
}
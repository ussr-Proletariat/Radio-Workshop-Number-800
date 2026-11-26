import Database from "better-sqlite3";
import { scryptSync, randomBytes } from "crypto";
function hashPassword(password: string): string {
    const salt = randomBytes(16).toString("hex");
    const hash = scryptSync(password, salt, 64).toString("hex");
    return '${salt}:${hash}';
}
function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  const testHash = scryptSync(password, salt, 64).toString("hex");
  return testHash === hash;
}

const db = new Database("schemes.db")

db.exec(`
    CREATE TABLE IF NOT EXISTS schemes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT null,
    data TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nick TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
`);



export function saveScheme(name: string, data: string) {
    db.prepare("INSERT INTO schemes (name, data) VALUES (?, ?)").run(name, data);
}

export function loadSchemes() {
    return db.prepare("SELECT * FROM schemes ORDER BY id DESC").all();
}

export function createUser(nick: string, passwordHash: string){
    db.prepare("INSERT INTO users (nick, password_hash) VALUES (?, ?)").run(nick,passwordHash);
}

export function findUserByNick(nick: string) {
    return db.prepare("SELECT * FROM users WHERE nick = ?").get(nick);
}
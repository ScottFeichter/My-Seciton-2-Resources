-- This ensures that SQLite enforces FOREIGN KEY constraints
PRAGMA foreign_keys = 1;
DROP TABLE IF EXISTS musician_instruments;
DROP TABLE IF EXISTS instruments;
DROP TABLE IF EXISTS musicians;
DROP TABLE IF EXISTS bands;

CREATE TABLE bands (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(100)
);
CREATE TABLE musicians (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  bands_id INTEGER REFERENCES bands(id) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100)
);

CREATE TABLE instruments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type VARCHAR(100) NOT NULL
);

CREATE TABLE musician_instruments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  musicians_id INTEGER REFERENCES musicians(id) NOT NULL,
  instruments_id INTEGER REFERENCES instruments(id) NOT NULL
);

INSERT INTO bands (name)
VALUES ("TOOL");

INSERT INTO bands (name)
VALUES ("PRIMUS");

INSERT INTO musicians (first_name, last_name, bands_id)
VALUES ("Danny", "Carey", 1);

INSERT INTO musicians (first_name, last_name, bands_id)
VALUES ("Maynard", "Keenan", 1);

INSERT INTO musicians (first_name, last_name, bands_id)
VALUES ("Les", "Claypool", 2);

INSERT INTO instruments (type)
VALUES ("drums");

INSERT INTO musician_instruments (musicians_id, instruments_id)
VALUES (1, 1);

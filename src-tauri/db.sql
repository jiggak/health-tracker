CREATE TABLE metrics (
   metric_key TEXT PRIMARY KEY,
   label TEXT NOT NULL,
   position INTEGER NOT NULL,
   metric_type TEXT NOT NULL,
   properties text
);

CREATE TABLE logs (
   id INTEGER PRIMARY KEY,
   metric_key TEXT NOT NULL,
   timestamp INTEGER NOT NULL,
   value TEXT NOT NULL,
   tags TEXT,
   FOREIGN KEY (metric_key) REFERENCES metrics(metric_key)
);

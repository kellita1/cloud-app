CREATE TABLE checkins (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    checkin_time TIMESTAMP DEFAULT NOW()
);

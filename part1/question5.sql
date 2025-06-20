-- Insert: Five Users:
INSERT INTO Users (username, email, password_hash, role) VALUES
('alice123', 'alice@example.com', 'hashed123', 'owner'),
('bobwalker', 'bob@example.com', 'hashed456', 'walker'),
('carol123', 'carol@example.com', 'hashed789', 'owner'),
('jeny321', 'jeny@example.com', 'hashed321', 'walker'),
('sibin227', 'sibin@example.com', 'hashed227', 'owner');

-- Insert: Five Dogs:
INSERT INTO Dogs (name, size, owner_id) VALUES
('Max', 'medium', (SELECT user_id FROM Users WHERE username = 'alice123')),
('Bella', 'small', (SELECT user_id FROM Users WHERE username = 'carol123')),
('Maxine', 'medium', (SELECT user_id FROM Users WHERE username = 'alice123')),
('Bellarina', 'small', (SELECT user_id FROM Users WHERE username = 'alice123')),
('Basil', 'small', (SELECT user_id FROM Users WHERE username = 'alice123'));

-- Insert: Five walk request:
INSERT INTO WalkRequests (dog_id, requested_time, duration, location, status) VALUES
((SELECT dog_id FROM Dogs WHERE name = 'Max'), '2025-06-10 08:00:00', 30, 'Parklands', 'open'),
((SELECT dog_id FROM Dogs WHERE name = 'Bella'), '2025-07-10 08:00:00', 45, 'Beachside Ave', 'accepted'),
((SELECT dog_id FROM Dogs WHERE name = 'Maxine'), '2025-08-10 08:00:00', 45, 'Pinksview', 'open'),
((SELECT dog_id FROM Dogs WHERE name = 'Bellarina'), '2025-09-10 08:00:00', 20, 'Testsview', 'open'),
((SELECT dog_id FROM Dogs WHERE name = 'Basil'), '2025-10-10 08:00:00', 20, 'View', 'open');

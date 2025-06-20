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
('Maxine', 'medium', (SELECT user_id FROM Users WHERE username = 'bobwalker')),
('Bellarina', 'small', (SELECT user_id FROM Users WHERE username = 'jeny321')),
('Basil', 'small', (SELECT user_id FROM Users WHERE username = 'sibin227'));

-- Insert: Five walk request:
INSERT INTO WalkRequests (dog_id, requested_time, duration, location, status) VALUES
((SELECT dog_id FROM Dogs WHERE name = 'MAX'), '2025-06-10 08:00:00', 20, 'Lakesview', )
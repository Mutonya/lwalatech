TRUNCATE TABLE commodity_requests, commodities, users RESTART IDENTITY CASCADE;

-- Insert users
INSERT INTO users ("id", "name", "email", "role", "supervisorId", "createdAt", "updatedAt") VALUES
                                                                                                ('u1', 'Alice CHW', 'alice@example.com', 'chw', 'u3', NOW(), NOW()),
                                                                                                ('u2', 'Bob CHW', 'bob@example.com', 'chw', 'u3', NOW(), NOW()),
                                                                                                ('u3', 'Carol CHA', 'carol@example.com', 'cha', NULL, NOW(), NOW());

-- Insert commodities
INSERT INTO commodities (id, name, description, "createdAt", "updatedAt") VALUES
                                                                              (1, 'Paracetamol', 'Pain reliever and fever reducer', NOW(), NOW()),
                                                                              (2, 'Amoxicillin', 'Antibiotic for bacterial infections', NOW(), NOW());

-- Insert commodity requests
INSERT INTO commodity_requests (id, "chwId", "chaId", "commodityId", quantity, status, "createdAt", "updatedAt") VALUES
                                                                                                                     (1, 'u1', 'u3', 1, 10, 'pending', NOW(), NOW()),
                                                                                                                     (2, 'u2', 'u3', 2, 20, 'approved', NOW(), NOW());

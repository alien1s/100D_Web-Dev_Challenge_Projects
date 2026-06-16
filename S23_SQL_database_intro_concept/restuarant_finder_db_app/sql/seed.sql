USE restaurant_finder;


-- Cuisines
INSERT INTO types (id, name) VALUES 
(1, 'Italian'), (2, 'Mexican'), (3, 'Japanese'), (4, 'Indian'), (5, 'French'),
(6, 'Chinese'), (7, 'Greek'), (8, 'Turkish'), (9, 'American (Traditional)'), (10, 'Lebanese');

-- Addresses
INSERT INTO addresses (id, street, street_number, city, postal_code, country) VALUES
(1, 'Broadway', 152, 'New York', '10001', 'United States'),
(2, 'Oxford Street', 241, 'London', 'W1C 2DG', 'United Kingdom'),
(3, 'Via Roma', 45, 'Rome', '00184', 'Italy'),
(4, 'Champs-Élysées', 102, 'Paris', '75008', 'France'),
(5, 'Shibuya Crossing', 2, 'Tokyo', '150-0002', 'Japan'),
(6, 'Main Street', 742, 'Springfield', '62704', 'United States'),
(7, 'Kaufingerstraße', 12, 'Munich', '80331', 'Germany'),
(8, 'George Street', 333, 'Sydney', '2000', 'Australia');

-- Restaurants
INSERT INTO restaurants (id, name, address_id, type_id) VALUES 
(1, 'Taco Loco', 1, 2),
(2, 'The Golden Curry', 2, 4),
(3, 'Bella Italia', 3, 1),
(4, 'Le Bistro', 4, 5),
(5, 'Sakura Sushi', 5, 3),
(6, 'The Burger Joint', 6, 9),
(7, 'Istanbul Grill', 7, 8),
(8, 'Cedars Lounge', 8, 10);

-- Reviews
INSERT INTO reviews (reviewer_name, rating, text, restaurant_id) VALUES 
('Sarah Jenkins', 5, 'The best tacos I have ever had! Authentic flavors and incredible hot sauce.', 1),
('Alex Mercer', 4, 'Great curry with deep, complex spices. The garlic naan was perfect.', 2),
('Elena Rossi', 5, 'Phenomenal lasagna and an amazing wine selection. Feels exactly like Rome.', 3),
('Liam Dubois', 3, 'The atmosphere was lovely, but the steak was slightly overcooked.', 4),
('Yuki Tanaka', 5, 'Incredible sushi presentation. The fatty tuna completely melted in my mouth.', 5),
('David Miller', 4, 'Solid smash burger with perfectly crispy edges. Great fries too.', 6),
('Amara K.', 2, 'Service was quite slow tonight and the kebab was a bit dry.', 7),
('Zane Malik', 5, 'Unbelievable hummus and fresh, warm pita. The shawarma platter is massive.', 8),
('John Doe', 4, NULL, 1),
('Jane Smith', 3, NULL, 2),
('Carlos M.', 5, 'Insanely good churros as well! Don''t skip them.', 1),
('Emily R.', 4, 'Very crowded on Fridays, but the street tacos are worth the wait.', 1),
('Rajesh K.', 5, 'Authentic taste! Reminds me of home. The spice level is perfect.', 2),
('Jessica T.', 2, 'Food was okay but they forgot my drink order twice.', 2),
('Giovanni B.', 5, 'Al dente perfection. The tiramisu is legendary.', 3),
('Sophia L.', 4, 'Lovely outdoor seating area. Great service.', 3),
('Hiro S.', 5, 'Excellent knife skills by the chef. Best omakase in town.', 5),
('Marcus V.', 3, NULL, 5);
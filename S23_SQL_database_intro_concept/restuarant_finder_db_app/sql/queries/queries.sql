SELECT 
    -- 1. Review Columns
    reviews.id AS review_id,
    reviews.reviewer_name,
    reviews.rating,
    reviews.text AS review_text,
    
    restaurants.name AS restaurant_name,
    
    addresses.street,
    addresses.street_number,
    addresses.city,
    
    types.name AS cuisine

FROM reviews
INNER JOIN restaurants ON reviews.restaurant_id = restaurants.id
INNER JOIN addresses   ON restaurants.address_id = addresses.id
INNER JOIN types       ON restaurants.type_id = types.id
WHERE reviews.rating > 3;
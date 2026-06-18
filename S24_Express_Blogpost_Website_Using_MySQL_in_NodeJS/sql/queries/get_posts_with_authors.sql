SELECT posts.*, authors.name AS author_name 
FROM posts 
INNER JOIN authors ON posts.author_id = authors.id;
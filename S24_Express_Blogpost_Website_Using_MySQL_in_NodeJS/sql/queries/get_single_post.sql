SELECT posts.*, authors.name AS author_name, authors.email AS author_email 
FROM posts INNER JOIN authors ON posts.author_id = authors.id 
WHERE posts.id = ?;
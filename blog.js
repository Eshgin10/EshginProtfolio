const express = require('express');
const router = express.Router();

// Dummy blog posts data
const blogPosts = [
  {
    id: 1,
    title: 'First Blog Post',
    content: 'This is the content of the first blog post.',
    date: '2025-03-22'
  },
  {
    id: 2,
    title: 'Second Blog Post',
    content: 'This is the content of the second blog post.',
    date: '2025-03-23'
  }
];

// Get all blog posts
router.get('/', (req, res) => {
  res.json(blogPosts);
});

// Get a single blog post by ID
router.get('/:id', (req, res) => {
  const post = blogPosts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).send('The blog post with the given ID was not found.');
  res.json(post);
});

module.exports = router;
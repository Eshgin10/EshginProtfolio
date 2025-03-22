const express = require('express');
const router = express.Router();

// Sample blog data (replace with your database later)
const blogPosts = [
    {
        id: 1,
        title: "First Blog Post",
        content: "This is my first blog post content",
        date: new Date().toLocaleDateString()
    }
    // Add more posts as needed
];

// Route to display all blog posts
router.get('/', (req, res) => {
    res.render('blog/index', { posts: blogPosts });
});

// Route to display a single blog post
router.get('/:id', (req, res) => {
    const post = blogPosts.find(p => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).send('The blog post was not found.');
    res.render('blog/post', { post: post });
});

module.exports = router;

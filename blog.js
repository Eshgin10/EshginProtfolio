// Blog posts data
const blogPosts = [
  {
      title: "My First Blog Post",
      date: "March 22, 2025",
      summary: "A brief introduction to my journey as a web developer and what inspires me.",
      content: "This is the full content of my first blog post. I started learning web development a few years ago and have since built projects using HTML, CSS, and JS. This blog will document my progress and share tips I’ve learned along the way!",
      slug: "first-blog-post"
  },
  {
      title: "Learning React: My Experience",
      date: "March 20, 2025",
      summary: "A summary of my experience diving into React.js and building my first app.",
      content: "React has been a game-changer for me. In this post, I’ll walk you through my first React project, the challenges I faced, and how I overcame them. Stay tuned for more!",
      slug: "learning-react"
  }
];

// Check if we're on the blog page
if (window.location.pathname.includes("blog.html")) {
  const blogList = document.getElementById("blog-list");

  // Populate blog list
  if (blogList) {
      blogPosts.forEach((post, index) => {
          const article = document.createElement("article");
          article.style.setProperty('--index', index + 1); // Set the --index variable for staggered animation
          article.innerHTML = `
              <h2><a href="#${post.slug}" onclick="showPost('${post.slug}', event)">${post.title}</a></h2>
              <p class="date">${post.date}</p>
              <p>${post.summary}</p>
          `;
          blogList.appendChild(article);
      });
  }

  // Function to show full post
  window.showPost = function(slug, event) {
      event.preventDefault(); // Prevent default anchor behavior
      const post = blogPosts.find(p => p.slug === slug);
      const main = document.querySelector("main");
      main.innerHTML = `
          <button class="back-home-btn" onclick="window.location.href='index.html'">Back to Home</button>
          <section class="blog-post">
              <h1>${post.title}</h1>
              <p class="date">${post.date}</p>
              <p>${post.content}</p>
              <a href="blog.html" class="back-link">Back to Blog</a>
          </section>
          <img src="/Images/camera.png" alt="Decorative camera" class="deco rocket">
          <img src="/Images/microfone.png" alt="Decorative microphone" class="deco crown">
          <img src="/Images/play.png" alt="Decorative play button" class="deco monitor">
      `;
  };
}
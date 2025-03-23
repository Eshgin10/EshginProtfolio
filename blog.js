// Blog posts data
const blogPosts = [
  {
    title: "How Good Is AI at Writing Code?",
    date: "March 22, 2025",
    summary: " AI tools like ChatGPT help non-coders build simple projects and assist developers in speeding up workflows. While AI struggles with large codebases, tools like Cursor AI and GitHub Copilot enhance productivity. AI won’t replace developers but is becoming a key partner, making coding faster and more accessible. The future of coding is collaborative. ",
    content: `
          <p>In the past month, I’ve integrated AI into every project I’ve worked on, and the results have been fascinating. Today’s AI models have reached a point where they can significantly assist in coding, but their effectiveness varies depending on your skill level. Research shows that AI is most beneficial for two groups: those who don’t know how to code at all and professionals who already have a strong coding background. This blog will explore how AI can be used in both scenarios, from building projects from scratch to enhancing the workflow of experienced developers.</p>

          <h3>Part 1: AI for Non-Coders</h3>
          <p>If you’ve never written a line of code but need a simple website or software for your work, AI can be a game-changer. Tools like ChatGPT and other text-based AI models allow you to create functional applications without hiring a developer. For example, you can ask ChatGPT to build a to-do list app, and it will generate the code for you. Some platforms even offer a preview feature, letting you see the results without running the code locally.</p>
          <p>However, not all AI models are created equal. While ChatGPT introduced the preview feature, others like Gemini and Microsoft Copilot have followed suit. Models like Grok, Claude, and DeepSeek also offer similar capabilities. For non-coders, the biggest advantage is the ability to create small, functional projects without needing deep technical knowledge.</p>

          <h3>Part 2: AI for Professional Developers</h3>
          <p>For those who already know how to code, AI can be a powerful assistant, but it requires a strategic approach. The key is to maintain control over your project while leveraging AI to speed up the process. One of the biggest challenges is that AI models often struggle with large codebases. For instance, models like Claude and Grok can handle around 500-600 lines of code before hitting a limit.</p>
      `,
    slug: "first-blog-post"
  },
  {
    title: "Learning React: My Experience",
    date: "March 20, 2025",
    summary: "A summary of my experience diving into React.js and building my first app.",
    content: `
      <p>React has been a game-changer for me. In this post, I’ll walk you through my first React project, the challenges I faced, and how I overcame them. Stay tuned for more!</p>
  
      <h3>Getting Started with React</h3>
      <p>When I first started learning React, I was amazed by how intuitive and powerful it is. The component-based architecture made it easy to break down complex UIs into smaller, reusable pieces. My first project was a simple to-do list app, which helped me understand the basics of state management and props.</p>
  
      <h3>Challenges I Faced</h3>
      <p>One of the biggest challenges was understanding how state and props work together. At first, I struggled with passing data between components, but after a few tutorials and practice projects, it started to click. Another challenge was setting up the development environment, but tools like Create React App made the process much smoother.</p>
  
      <h3>How I Overcame Them</h3>
      <p>To overcome these challenges, I relied heavily on documentation and online tutorials. I also joined a few coding communities where I could ask questions and get feedback from more experienced developers. Building small projects and experimenting with different features helped solidify my understanding.</p>
  
      <h3>What’s Next?</h3>
      <p>Now that I’ve built a few projects, I’m excited to dive deeper into React. I’m currently learning about hooks and context API, which are making my code even more efficient. I’m also exploring Next.js for server-side rendering and better performance.</p>
  
      <p>If you’re just starting with React, my advice is to be patient and keep practicing. It might seem overwhelming at first, but once you get the hang of it, React can be incredibly rewarding.</p>
    `,
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
  window.showPost = function (slug, event) {
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
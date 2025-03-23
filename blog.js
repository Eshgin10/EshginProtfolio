// Blog posts data
const blogPosts = [
  {
    title: "How Good Is AI at Writing Code?",
    date: "March 20, 2025",
    summary: "Exploring how AI is revolutionizing coding for both beginners and experienced developers, from building projects from scratch to enhancing workflows.",
    content: `
      <p>In the past month, I’ve integrated AI into every project I’ve worked on, and the results have been fascinating. Today’s AI models have reached a point where they can significantly assist in coding, but their effectiveness varies depending on your skill level. Research shows that AI is most beneficial for two groups: those who don’t know how to code at all and professionals who already have a strong coding background. This blog will explore how AI can be used in both scenarios, from building projects from scratch to enhancing the workflow of experienced developers.</p>
  
      <h3>Part 1: AI for Non-Coders</h3>
      <p>If you’ve never written a line of code but need a simple website or software for your work, AI can be a game-changer. Tools like ChatGPT and other text-based AI models allow you to create functional applications without hiring a developer. For example, you can ask ChatGPT to build a to-do list app, and it will generate the code for you. Some platforms even offer a preview feature, letting you see the results without running the code locally.</p>
      <p>However, not all AI models are created equal. While ChatGPT introduced the preview feature, others like Gemini and Microsoft Copilot have followed suit. Models like Grok, Claude, and DeepSeek also offer similar capabilities. For non-coders, the biggest advantage is the ability to create small, functional projects without needing deep technical knowledge.</p>
  
      <h3>Part 2: AI for Professional Developers</h3>
      <p>For those who already know how to code, AI can be a powerful assistant, but it requires a strategic approach. The key is to maintain control over your project while leveraging AI to speed up the process. One of the biggest challenges is that AI models often struggle with large codebases. For instance, models like Claude and Grok can handle around 500-600 lines of code before hitting a limit. This means you’ll need to break your project into smaller chunks and integrate the AI-generated code manually.</p>
      <p>To work effectively with AI, you need to focus on understanding the algorithm rather than just the syntax. Tools like Cursor AI and GitHub Copilot are designed to assist developers in this way. Cursor AI integrates directly into your IDE, allowing it to understand your entire codebase. You can ask it questions like, “Which function handles X feature?” or request specific changes to a block of code. It also offers autocomplete suggestions, making coding faster and more efficient.</p>
      <p>GitHub Copilot, on the other hand, is a cloud-based tool that uses powerful models like GPT-4 to assist with coding. While it’s a paid service, it offers a 30-day free trial. Copilot excels at generating large amounts of code and can be integrated into VS Code for seamless use. Another notable tool is Amazon Q Developer, which also integrates with VS Code and provides advanced code suggestions and edits.</p>
  
      <h3>Conclusion</h3>
      <p>AI is not here to replace developers but to augment their capabilities. For non-coders, it opens up new possibilities for creating software without needing to learn programming. For professionals, it’s a tool that can significantly speed up development and reduce repetitive tasks. The key is to learn how to work alongside AI effectively, leveraging its strengths while maintaining control over your projects.</p>
      <p>Whether you’re a beginner or an experienced developer, now is the time to explore how AI can enhance your workflow. The future of coding is collaborative, and those who embrace AI will have a significant advantage in the years to come.</p>
    `,
    slug: "how-ai-is-transforming-coding"
  },
  {
    title: "Studying at Riga Technical University: My Experience",
    date: "March 20, 2025",
    summary: "An overview of second-semester Computer Science courses at Riga Technical University, covering Mathematics, Discrete Mathematics, Data Structures, Object-Oriented Programming, Physics, and IT Terminology, with insights into course structure, grading, and real-world applications.",
    content: `
      <p>Hello everyone, my name is Eşqin, and I’m studying Computer Science at Riga Technical University. Many of you have reached out to me on Instagram or email, asking about what it’s like to study abroad. So, I decided to create this blog post to give you a clear picture of how classes are structured and what to expect.</p>
  
      <h3>Courses in the Second Semester</h3>
      <p>In the second semester, we have six main courses: Mathematics 2, Discrete Mathematics, Data Structures and Algorithms, Object-Oriented Programming, Physics, and IT Terminology in English. Let me break them down for you.</p>
  
      <h4>Mathematics 2</h4>
      <p>This course is a continuation of Mathematics 1 from the first semester. It focuses heavily on integrals, and the topics are quite similar to what you’d study in every other university. The grading system is divided into labs, homework, midterm exams, and a final exam. Each component contributes to your final grade, and you need at least a 4 out of 10 to pass.</p>
  
      <h4>Discrete Mathematics</h4>
      <p>Discrete Mathematics dives into the logic behind mathematical formulas. For example, instead of memorizing formulas like (a + b)^2, we learn how they are derived using concepts like Pascal’s Triangle. This course helps build a strong foundation for understanding algorithms and critical thinking for programming.</p>
  
      <h4>Data Structures and Algorithms</h4>
      <p>This course teaches us how to write efficient and organized code for large-scale projects. We focus on JavaScript and Node.js, but the professor allows us to use any object-oriented programming language for assignments. The second part of the course introduces robotics, where we learn to program automated systems.</p>
  
      <h4>Object-Oriented Programming</h4>
      <p>Here, we work with C++ and explore the principles of object-oriented programming. The professor also shared insights into the job market, explaining which programming languages are in demand and what kind of projects they are used for.</p>
  
      <h4>Physics</h4>
      <p>Physics is a challenging course, especially because it requires a strong foundation in mathematics. We cover topics like mechanics, kinematics, and Newton’s laws. The professor emphasized that while physics is tough, it’s essential for understanding the world around us.</p>
  
      <h4>IT Terminology in English</h4>
      <p>This course focuses on IT-related terminology and its ethical implications. We discuss topics like AI’s impact on jobs and how to combat misinformation in technology. It’s a thought-provoking course that connects technology with real-world issues.</p>
  
      <h3>Final Thoughts</h3>
      <p>Studying at Riga Technical University has been both challenging and rewarding. The courses are designed to push you to think critically and apply your knowledge practically. If you’re considering studying abroad, I highly recommend it. It’s a great opportunity to grow both academically and personally.</p>
    `,
    slug: "studying-at-rtu"
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
const ARTICLES = [
  {
    id: "how-the-internet-works",
    title: "How the Internet Works: A Beginner's Guide",
    summary: "Ever wondered what happens when you type a URL into your browser? This article explains DNS, HTTP, packets, and the journey of a web request from your device to a server and back.",
    publishDate: "2025-03-10",
    readingMinutes: 6,
    tags: ["networking", "beginner", "HTTP", "DNS"],
    paragraphs: [
      "Every time you visit a website, your computer performs a remarkable sequence of operations in milliseconds. Understanding this process starts with the protocol that powers the web: HTTP. When you type a URL into your browser, the browser uses HTTP to send a request to a remote server asking for the content of that page.",
      "But before the request can even leave your computer, there's a DNS lookup to perform. DNS is like the phone book of the internet — it translates a human-readable domain name like 'github.com' into a numerical IP address that routers understand. Without DNS, you would need to memorize IP addresses instead of domain names.",
      "Once the IP address is known, your computer sends data through the network in small units called packets. Each packet contains not only a portion of your request but also a header with source and destination IP address information. Packets may travel through many different router devices before reaching the destination server.",
      "At the server end, the server receives your HTTP request, processes it, and sends back a response — also in packets. A typical web page response includes HTML, CSS, JavaScript, and image files. The browser reassembles these packets in order and renders the page you see.",
      "Every service on a server listens on a specific port number. Web servers use port 80 for standard HTTP and port 443 for HTTPS — the encrypted version of HTTP. When your browser connects, it specifies the port, and the server knows which application should handle the request.",
      "The entire journey — DNS resolution, TCP connection, HTTP request, server processing, and response — typically completes in under 500 milliseconds for a nearby server. This is measured as latency, and engineers spend significant effort reducing it. Techniques like CDN usage, caching, and optimized protocols all help minimize latency to make the web feel fast."
    ],
    annotations: {
      0: ["http", "server", "protocol"],
      1: ["dns", "ip-address", "router"],
      2: ["packet", "ip-address", "router"],
      3: ["http", "server", "packet"],
      4: ["port", "http", "server"],
      5: ["dns", "http", "latency", "cdn", "caching", "tcp"]
    }
  },
  {
    id: "git-for-beginners",
    title: "Git for Beginners: Understanding Version Control",
    summary: "Git is the most widely used version control system in the world. This guide explains repositories, commits, branches, and merging — the core concepts every developer needs to master.",
    publishDate: "2025-03-24",
    readingMinutes: 7,
    tags: ["git", "version control", "beginner", "development"],
    paragraphs: [
      "Git is a distributed version control system used by virtually every software team in the world. At its core, Git tracks changes to your code over time. The foundation of Git is the repository — a directory that stores all your project files along with the complete history of every change ever made.",
      "When you make changes to code and want to save a snapshot, you create a commit. Each commit captures the exact state of your files at that moment and includes a message describing what was changed and why. Good commit messages are crucial — they help future developers understand the project's history.",
      "One of Git's most powerful features is branching. A branch is an independent copy of your code where you can develop a new feature or fix a bug without affecting the main codebase. Developers typically create a branch for each feature they work on.",
      "When a feature is complete and ready to be integrated, the developer creates a pull request. The merge operation combines the changes from the feature branch into the main branch. If two developers modified the same lines of code, Git will flag these as merge conflicts that must be resolved manually.",
      "Modern development workflows rely heavily on Git. Debugging a production issue often starts with git blame to find which commit introduced a change. Teams use branch protection rules to prevent direct pushes to main, requiring code review before merging. Deployment pipelines trigger automatically when code is merged.",
      "Practices like refactoring benefit enormously from Git. Engineers can make large structural improvements knowing they can always revert to a previous commit if something breaks. The combination of Git with a proper CI/CD pipeline and technical debt management gives teams the confidence to ship code frequently and safely. Managing dependency updates also becomes easier when changes are isolated in separate branches."
    ],
    annotations: {
      0: ["repository", "commit"],
      1: ["commit", "debugging"],
      2: ["branch", "merge"],
      3: ["merge", "branch", "code-review"],
      4: ["commit", "branch", "debugging", "deployment"],
      5: ["refactoring", "commit", "ci-cd", "dependency", "branch", "technical-debt"]
    }
  },
  {
    id: "databases-sql-vs-nosql",
    title: "SQL vs NoSQL: Choosing the Right Database",
    summary: "Relational and non-relational databases serve different use cases. This guide explains when to use SQL, when to use NoSQL, and the core concepts behind each — including transactions, schemas, and sharding.",
    publishDate: "2025-04-07",
    readingMinutes: 7,
    tags: ["databases", "SQL", "NoSQL", "beginner"],
    paragraphs: [
      "At the heart of nearly every application is a database — the system responsible for storing and retrieving data reliably. Choosing the right database requires understanding two major categories: relational (SQL) and non-relational (NoSQL) databases.",
      "Relational databases organize data into tables with rows and columns. You interact with them using SQL, which lets you write queries to filter, join, and aggregate data. Every table has a defined schema specifying the structure of its columns, and relationships between tables are enforced through primary key and foreign key constraints.",
      "A key strength of relational databases is the transaction. A transaction groups multiple operations that either all succeed or all fail together — a property described by the ACID acronym (Atomicity, Consistency, Isolation, Durability). This is essential for financial systems where a failed payment must not leave accounts in an inconsistent state.",
      "NoSQL databases take a different approach. Rather than enforcing a fixed schema, they offer flexibility to store different shapes of data. Document stores like MongoDB store JSON-like documents. Key-value stores like Redis provide ultra-fast access by a simple key. These databases excel when data models evolve rapidly or when horizontal scaling is needed.",
      "When a single database server can no longer handle the load, teams must scale. Replication creates read replicas to distribute query traffic. Sharding horizontally partitions data across multiple servers, each handling a slice of the dataset. Both approaches add operational complexity.",
      "For performance, adding an index on frequently queried columns is one of the most impactful optimizations. A query that scans millions of rows drops to milliseconds with the right index. Using an ORM simplifies database access from application code, and a well-configured connection pool prevents the database from being overwhelmed by too many simultaneous connections."
    ],
    annotations: {
      0: ["database", "sql", "nosql"],
      1: ["sql", "query", "schema", "primary-key", "foreign-key"],
      2: ["transaction", "acid"],
      3: ["nosql", "schema", "cache"],
      4: ["replication", "sharding"],
      5: ["index", "query", "orm", "connection-pool"]
    }
  },
  {
    id: "docker-and-containers",
    title: "Docker and Containers: What Every Developer Should Know",
    summary: "Containers have transformed how software is built and deployed. This article explains what Docker is, how containerization works, and why Kubernetes is used to orchestrate containers at scale.",
    publishDate: "2025-04-14",
    readingMinutes: 7,
    tags: ["docker", "containers", "devops", "kubernetes"],
    paragraphs: [
      "Before containers, deploying an application meant managing its dependencies on each server manually. Docker changed everything by introducing containerization — packaging an application with all its runtime dependencies into a single portable unit that runs identically anywhere.",
      "A Docker image is a read-only blueprint created from a Dockerfile. When you run an image, it becomes a container — an isolated process with its own filesystem and network. Because containers share the host OS kernel rather than running a full virtual machine, they start in seconds and use much less memory.",
      "Docker alone works well for single-machine deployments, but running hundreds of containers across dozens of servers requires orchestration. Kubernetes is the industry-standard tool for this. It groups containers into pods, distributes them across a cluster of nodes, and automatically restarts any container that fails.",
      "One of Kubernetes' most powerful features is its integration with a load balancer. Incoming traffic is distributed across healthy pods automatically. When traffic spikes, auto-scaling creates additional pod replicas and removes them when load decreases, ensuring efficient resource usage.",
      "The full workflow — writing code, building a Docker image, pushing it to a registry, and deploying to Kubernetes — is automated by a CI/CD pipeline. When a developer merges code into the main branch, the pipeline compiles the application, runs tests, builds a new image, and triggers a deployment. The new version rolls out gradually, with monitoring watching for errors.",
      "Infrastructure as Code using tools like Terraform and Helm manages Kubernetes resources declaratively. A Helm chart bundles Kubernetes configuration into a reusable package. This makes provisioning a new environment as simple as running a single command, eliminating the configuration drift that comes from manual changes."
    ],
    annotations: {
      0: ["containerization", "docker", "runtime"],
      1: ["docker", "process", "filesystem"],
      2: ["orchestration", "kubernetes", "cluster", "load-balancer"],
      3: ["load-balancer", "auto-scaling", "monitoring"],
      4: ["ci-cd", "compile", "deployment", "monitoring", "docker"],
      5: ["iac", "terraform", "helm", "kubernetes", "provisioning"]
    }
  },
  {
    id: "web-security-basics",
    title: "Web Security Basics: Protecting Your Application",
    summary: "Security vulnerabilities in web applications can have serious consequences. This guide covers the most common threats — XSS, SQL injection, CSRF, DDoS — and the defenses every developer should implement.",
    publishDate: "2025-04-21",
    readingMinutes: 8,
    tags: ["security", "web", "intermediate", "OWASP"],
    paragraphs: [
      "Web security is not optional. A single vulnerability can expose millions of users' data, destroy a company's reputation, and result in severe financial penalties. Every developer who builds web applications must understand the most common attack vectors and how to defend against them.",
      "One of the most prevalent attacks is XSS (Cross-Site Scripting). In an XSS attack, a malicious user injects JavaScript into a web page that is then executed by other users' browsers, potentially stealing cookies or redirecting users to fake sites. The primary defense is sanitization — escaping all user-provided content before rendering it as HTML.",
      "SQL injection is another classic and devastating attack. When user input is directly inserted into SQL queries without sanitization, attackers can manipulate the query to access any data in the database. Parameterized queries in your ORM or query builder eliminate this risk entirely.",
      "CSRF attacks trick authenticated users into unknowingly submitting malicious requests. A CSRF token — a random value embedded in forms and validated on the server — prevents this. The server rejects any request that doesn't include the expected token.",
      "Authentication and authorization must both be implemented correctly. Users must prove their identity (authentication), and the system must enforce what each identity is allowed to do (authorization). Using OAuth for third-party login and JWT tokens for API authentication are standard approaches. Enabling two-factor authentication significantly reduces account takeover risk.",
      "For protecting infrastructure, encryption via TLS is non-negotiable — all data in transit must use HTTPS. Rate limiting API endpoints mitigates brute-force attacks and DDoS attempts. Maintaining comprehensive audit logs lets security teams investigate incidents after the fact. And regular penetration testing finds vulnerabilities before attackers do."
    ],
    annotations: {
      0: ["vulnerability", "authentication"],
      1: ["xss", "sanitization", "cookie"],
      2: ["sql-injection", "sanitization", "orm", "query"],
      3: ["csrf"],
      4: ["authentication", "authorization", "oauth", "jwt", "two-factor-auth"],
      5: ["encryption", "ssl-tls", "api-rate-limit", "ddos", "brute-force", "audit-log", "penetration-testing"]
    }
  },
  {
    id: "rest-api-design",
    title: "How REST APIs Work: A Practical Guide",
    summary: "REST APIs are the backbone of modern web and mobile applications. This guide explains HTTP methods, endpoints, status codes, authentication, and best practices for designing APIs that developers love.",
    publishDate: "2025-05-05",
    readingMinutes: 7,
    tags: ["API", "REST", "web development", "intermediate"],
    paragraphs: [
      "A REST API is the contract between a server and the applications that consume it. REST stands for Representational State Transfer and is built on top of HTTP. It defines a standard way for clients to read, create, update, and delete resources using HTTP methods like GET, POST, PUT, and DELETE.",
      "Each operation in a REST API is addressed through an endpoint — a specific URL path representing a resource. For example, 'GET /users/42' retrieves the user with ID 42, while 'DELETE /users/42' removes them. Good endpoint naming uses nouns, not verbs, and follows consistent conventions that make the API intuitive to explore.",
      "A REST API must be stateless: each request from the client contains all the information the server needs to process it. There is no session stored on the server between requests. Instead, authentication is typically handled via a JWT token or OAuth access token included in the request header.",
      "APIs communicate status through HTTP status codes. 200 means success, 201 means a resource was created, 400 signals a bad request from the client, 401 means authentication failed, 403 indicates the user lacks authorization, and 404 means the resource wasn't found. Using these codes correctly makes the API self-documenting.",
      "As APIs grow in usage, performance and reliability become critical. Rate limiting prevents any single client from overloading the server. Caching frequently requested data with appropriate HTTP cache headers reduces server load and improves response times. Middleware handles cross-cutting concerns like logging and authentication without cluttering endpoint handlers.",
      "REST is not always the best choice. GraphQL is an alternative that allows clients to request exactly the data they need, eliminating the over-fetching problem common in REST APIs. WebSocket connections suit use cases requiring real-time, bidirectional communication — like chat or live dashboards — where polling the REST endpoint would be too slow."
    ],
    annotations: {
      0: ["rest", "http", "server", "client"],
      1: ["endpoint", "rest"],
      2: ["session", "authentication", "jwt", "oauth"],
      3: ["http", "authentication", "authorization"],
      4: ["api-rate-limit", "caching", "middleware", "logging"],
      5: ["graphql", "websocket", "rest"]
    }
  },
  {
    id: "intro-to-machine-learning",
    title: "Introduction to Machine Learning for Software Engineers",
    summary: "Machine learning is reshaping software development. This article explains the core concepts — training, models, datasets, overfitting, and neural networks — with examples relevant to software engineers.",
    publishDate: "2025-05-12",
    readingMinutes: 8,
    tags: ["AI", "machine learning", "beginner", "LLM"],
    paragraphs: [
      "Machine learning is a field of computer science where systems learn patterns from data rather than following hand-written rules. For software engineers, understanding machine learning has become essential — it powers recommendation systems, fraud detection, search ranking, and language models that generate code.",
      "At the core of machine learning is the model — a mathematical structure with parameters that are adjusted during training. The training process feeds the model examples from a dataset, compares its predictions against the correct answers, and uses gradient descent to adjust the parameters in the direction that reduces errors.",
      "Deep learning uses neural networks with many layers to learn complex representations. Each layer transforms the data into a higher-level abstraction — early layers detect simple patterns like edges, while later layers recognize complex concepts. Training deep learning models requires significant compute, typically on GPU clusters.",
      "A common pitfall is overfitting: when a model learns the training data too precisely — including its noise — and fails to generalize to new examples. Regularization techniques, dropout layers, and collecting more training data all help prevent overfitting. Evaluating accuracy on a held-out test dataset (never used during training) is how you detect it.",
      "Large Language Models (LLMs) are transformer-based models trained on massive text datasets. They can answer questions, write code, and translate languages. Developers interact with LLMs through APIs using carefully crafted prompts. Fine-tuning an LLM on domain-specific data adapts it to specialized tasks. However, LLMs are prone to hallucination — generating confident but false information.",
      "NLP (Natural Language Processing) applications use embedding representations to convert text into numerical vectors that capture semantic meaning. Computer vision models apply similar ideas to images, enabling use cases like defect detection and medical imaging. The field of AI moves rapidly — new transformer architectures regularly achieve state-of-the-art performance on previously difficult tasks."
    ],
    annotations: {
      0: ["machine-learning", "model", "dataset"],
      1: ["model", "training", "dataset", "gradient-descent"],
      2: ["deep-learning", "neural-network", "abstraction", "training"],
      3: ["overfitting", "accuracy", "training", "dataset"],
      4: ["llm", "transformer", "prompt", "fine-tuning", "hallucination"],
      5: ["nlp", "embedding", "computer-vision", "transformer"]
    }
  },
  {
    id: "linux-command-line",
    title: "The Linux Command Line: Essential Skills for Developers",
    summary: "Every developer working with servers, containers, or CI/CD pipelines needs Linux command-line skills. This guide covers the shell, processes, filesystem navigation, environment variables, and automation with cron.",
    publishDate: "2025-05-19",
    readingMinutes: 7,
    tags: ["linux", "CLI", "terminal", "beginner"],
    paragraphs: [
      "The Linux command line is the primary interface for interacting with servers, containers, and cloud infrastructure. At the center of this interface is the shell — a program that interprets your commands. Bash and Zsh are the most common shells, and proficiency with them is a foundational skill for every backend developer and DevOps engineer.",
      "Everything in Linux is a file. The filesystem organizes files in a hierarchical tree starting at '/'. Understanding filesystem permissions — who can read, write, or execute each file — is critical for security and debugging. The kernel mediates all access to the filesystem through syscalls, enforcing permission rules.",
      "Linux allows you to run multiple programs simultaneously as separate processes. Each process has a unique ID (PID) and its own memory space. Programs can spawn threads to perform concurrent work within the same process. The 'ps' and 'top' commands let you inspect running processes and their resource consumption.",
      "One of Linux's most powerful features is the pipe. Pipes connect commands so the stdout of one becomes the stdin of the next. This lets you compose complex operations from simple tools: 'grep' to filter, 'sort' to order, 'wc' to count, and 'awk' to transform. This Unix philosophy of small, composable tools is incredibly powerful.",
      "Automation is central to Linux administration. The cron scheduler runs scripts at specified times without human intervention. Environment variables allow applications to receive configuration without hardcoding values. A daemon runs as a background process managed by systemd, starting automatically and restarting if it crashes.",
      "For servers with limited memory, the OS uses swap space on disk as an overflow buffer. When physical memory is exhausted, the kernel moves inactive memory pages to swap. Excessive swap usage severely degrades performance. The 'df -h' command checks disk usage, while 'df -i' shows inode usage — running out of inodes prevents creating new files even with free disk space."
    ],
    annotations: {
      0: ["shell", "kernel", "daemon"],
      1: ["filesystem", "kernel", "syscall"],
      2: ["process", "thread", "memory"],
      3: ["pipe", "stdin-stdout"],
      4: ["cron", "environment-variable", "daemon"],
      5: ["swap", "kernel", "memory", "inode"]
    }
  }
];

/**
 * VOCABULARY — the single authoritative word store for TechEnglish.
 * All lessons, articles, and daily rotations reference word IDs defined here.
 *
 * Categories: networking | software-dev | cloud-devops | databases |
 *             security | web-dev | ai-ml | os-systems |
 *             project-management | workplace | ui-ux |
 *             testing-qa | data-analytics | mobile-dev
 */
const VOCABULARY = [

  /* ================================================
   * NETWORKING  (20 words)
   * ================================================ */
  {
    id: "bandwidth",
    word: "bandwidth",
    category: "networking",
    partOfSpeech: "noun",
    phonetic: "/ˈbændwɪdθ/",
    definition: "The maximum rate of data transfer across a network path, usually measured in Mbps or Gbps.",
    exampleSentences: [
      "The company upgraded its bandwidth from 100 Mbps to 1 Gbps to handle increased traffic.",
      "Video streaming services consume a large amount of bandwidth.",
      "Network engineers monitor bandwidth usage to prevent bottlenecks.",
      "Cloud storage services require high bandwidth for fast uploads and downloads."
    ]
  },
  {
    id: "latency",
    word: "latency",
    category: "networking",
    partOfSpeech: "noun",
    phonetic: "/ˈleɪtənsi/",
    definition: "The time delay between a request being sent and the response being received, typically measured in milliseconds.",
    exampleSentences: [
      "High latency makes online gaming frustrating because actions are delayed.",
      "The new fiber optic cable reduced latency by 40 milliseconds.",
      "Developers optimize their APIs to minimize latency for better user experience.",
      "CDN usage is one of the most effective techniques to reduce latency for global users."
    ]
  },
  {
    id: "protocol",
    word: "protocol",
    category: "networking",
    partOfSpeech: "noun",
    phonetic: "/ˈproʊtəkɒl/",
    definition: "A set of rules and standards that govern how data is transmitted and received across a network.",
    exampleSentences: [
      "HTTP is the protocol used by web browsers to communicate with servers.",
      "Engineers must choose the right network protocol for each application's needs.",
      "The TCP protocol ensures data packets arrive in the correct order.",
      "Security protocols like TLS encrypt data during transmission."
    ]
  },
  {
    id: "router",
    word: "router",
    category: "networking",
    partOfSpeech: "noun",
    phonetic: "/ˈruːtər/",
    definition: "A networking device that forwards data packets between networks, directing internet traffic.",
    exampleSentences: [
      "The office router connects all workstations to the internet.",
      "Configuring the router's firewall rules is an important security task.",
      "A faulty router can cause entire network segments to lose connectivity.",
      "Border routers connect an organization's network to its internet service provider."
    ]
  },
  {
    id: "firewall",
    word: "firewall",
    category: "networking",
    partOfSpeech: "noun",
    phonetic: "/ˈfaɪərwɔːl/",
    definition: "A network security system that monitors and controls incoming and outgoing traffic based on security rules.",
    exampleSentences: [
      "The firewall blocked unauthorized access attempts from external IP addresses.",
      "System administrators configure firewall rules to protect sensitive data.",
      "Cloud providers offer managed firewall services for enterprise customers.",
      "A web application firewall specifically protects against HTTP-based attacks."
    ]
  },
  {
    id: "dns",
    word: "DNS",
    category: "networking",
    partOfSpeech: "noun",
    phonetic: "/diː en ɛs/",
    definition: "Domain Name System — a hierarchical naming system that translates domain names into IP addresses.",
    exampleSentences: [
      "DNS resolves 'google.com' into an IP address your browser can connect to.",
      "A DNS outage can make websites unreachable even if the servers are running fine.",
      "DevOps engineers update DNS records when migrating to a new server.",
      "DNS caching reduces lookup time by storing recently resolved addresses."
    ]
  },
  {
    id: "ip-address",
    word: "IP address",
    category: "networking",
    partOfSpeech: "noun",
    phonetic: "/aɪ piː ˈædrɛs/",
    definition: "A unique numerical label assigned to each device on a network, used to identify and locate it.",
    exampleSentences: [
      "Every device on the internet has a unique IP address for identification.",
      "The server's IP address was changed after a security incident.",
      "IPv6 was introduced to solve the shortage of available IP addresses.",
      "Network tools like ping use IP addresses to test connectivity between hosts."
    ]
  },
  {
    id: "packet",
    word: "packet",
    category: "networking",
    partOfSpeech: "noun",
    phonetic: "/ˈpækɪt/",
    definition: "A small unit of data formatted for network transmission; large messages are broken into multiple packets.",
    exampleSentences: [
      "Network analyzers like Wireshark capture packets to diagnose connectivity issues.",
      "Each packet contains a header with source and destination information.",
      "Packet loss causes degraded audio quality in VoIP calls.",
      "The firewall inspects each packet to determine if it should be allowed through."
    ]
  },
  {
    id: "http",
    word: "HTTP",
    category: "networking",
    partOfSpeech: "noun",
    phonetic: "/eɪtʃ tiː tiː piː/",
    definition: "HyperText Transfer Protocol — the foundation of data communication on the World Wide Web.",
    exampleSentences: [
      "Websites that use HTTPS encrypt HTTP traffic using TLS for security.",
      "The API returns HTTP status codes like 200 for success and 404 for not found.",
      "HTTP/2 introduced multiplexing to load multiple resources simultaneously.",
      "Developers use HTTP headers to pass authentication tokens with each request."
    ]
  },
  {
    id: "server",
    word: "server",
    category: "networking",
    partOfSpeech: "noun",
    phonetic: "/ˈsɜːrvər/",
    definition: "A computer or program that provides services, data, or resources to other computers (clients) over a network.",
    exampleSentences: [
      "The web server handles thousands of client requests per second.",
      "Deploying the application to the server requires updating the configuration files.",
      "A database server stores and retrieves data for multiple applications.",
      "Server monitoring tools alert the team when CPU usage exceeds 90%."
    ]
  },
  {
    id: "client",
    word: "client",
    category: "networking",
    partOfSpeech: "noun",
    phonetic: "/ˈklaɪənt/",
    definition: "A computer or application that requests services or data from a server.",
    exampleSentences: [
      "The mobile app acts as a client, sending requests to the backend API server.",
      "In client-server architecture, the client handles the user interface.",
      "A REST API client can be tested using tools like Postman or curl.",
      "The client caches API responses to reduce server load and improve speed."
    ]
  },
  {
    id: "port",
    word: "port",
    category: "networking",
    partOfSpeech: "noun",
    phonetic: "/pɔːrt/",
    definition: "A virtual endpoint identifying specific processes on a networked device, identified by a number (0–65535).",
    exampleSentences: [
      "Web servers typically listen on port 80 for HTTP and port 443 for HTTPS.",
      "The database connection failed because port 5432 was blocked by the firewall.",
      "Developers use port forwarding to access services running in Docker containers.",
      "Security teams regularly scan open ports to identify potential vulnerabilities."
    ]
  },
  {
    id: "gateway",
    word: "gateway",
    category: "networking",
    partOfSpeech: "noun",
    phonetic: "/ˈɡeɪtweɪ/",
    definition: "A network node that serves as an entry point to another network, often translating between different protocols.",
    exampleSentences: [
      "The API gateway routes requests to the appropriate microservices.",
      "A default gateway allows devices on a local network to access the internet.",
      "Payment gateways process credit card transactions securely.",
      "The gateway enforces authentication before allowing requests to reach internal services."
    ]
  },
  {
    id: "subnet",
    word: "subnet",
    category: "networking",
    partOfSpeech: "noun",
    phonetic: "/ˈsʌbnɛt/",
    definition: "A logical subdivision of a larger IP network, used to improve performance and security.",
    exampleSentences: [
      "The company divided its network into subnets to isolate different departments.",
      "Cloud providers let you define subnets within a Virtual Private Cloud.",
      "The database servers are placed in a private subnet with no internet access.",
      "Proper subnet design is essential for scalable network architecture."
    ]
  },
  {
    id: "vpn",
    word: "VPN",
    category: "networking",
    partOfSpeech: "noun",
    phonetic: "/viː piː ɛn/",
    definition: "Virtual Private Network — creates a secure, encrypted connection over a public network.",
    exampleSentences: [
      "Remote employees connect via VPN to securely access internal company resources.",
      "The DevOps team configured a VPN tunnel between the data center and cloud environment.",
      "Using a VPN encrypts your traffic when working from public Wi-Fi.",
      "Site-to-site VPN connects two office locations as if they were on the same network."
    ]
  },
  {
    id: "tcp",
    word: "TCP",
    category: "networking",
    partOfSpeech: "noun",
    phonetic: "/tiː siː piː/",
    definition: "Transmission Control Protocol — a reliable, connection-oriented protocol that guarantees ordered data delivery.",
    exampleSentences: [
      "TCP establishes a three-way handshake before data transmission begins.",
      "Web browsing and email use TCP because data integrity is critical.",
      "TCP automatically retransmits lost packets, ensuring complete delivery.",
      "The overhead of TCP's reliability mechanisms makes it slower than UDP."
    ]
  },
  {
    id: "udp",
    word: "UDP",
    category: "networking",
    partOfSpeech: "noun",
    phonetic: "/juː diː piː/",
    definition: "User Datagram Protocol — a fast, connectionless protocol that sends data without guaranteeing delivery.",
    exampleSentences: [
      "Video calls use UDP because speed is more important than perfect delivery.",
      "UDP packets have less overhead than TCP, making them ideal for real-time applications.",
      "DNS lookups use UDP because the responses are small and speed matters.",
      "Game developers often choose UDP to minimize latency in multiplayer matches."
    ]
  },
  {
    id: "nat",
    word: "NAT",
    category: "networking",
    partOfSpeech: "noun",
    phonetic: "/næt/",
    definition: "Network Address Translation — maps private IP addresses to a public IP address, allowing multiple devices to share one public IP.",
    exampleSentences: [
      "NAT allows all devices on a home network to share a single public IP address.",
      "The router performs NAT to translate internal IP addresses for internet traffic.",
      "NAT complicates peer-to-peer connections because devices are hidden behind it.",
      "Cloud providers use NAT gateways to give private subnets internet access."
    ]
  },
  {
    id: "proxy",
    word: "proxy",
    category: "networking",
    partOfSpeech: "noun",
    phonetic: "/ˈprɒksi/",
    definition: "An intermediary server that forwards requests between clients and servers, often used for caching, filtering, or anonymity.",
    exampleSentences: [
      "The corporate proxy server filters web traffic and blocks unauthorized sites.",
      "A reverse proxy sits in front of web servers to distribute load and cache responses.",
      "Developers use a local proxy to intercept and debug API requests.",
      "Forward proxy servers can anonymize users by hiding their original IP address."
    ]
  },
  {
    id: "mac-address",
    word: "MAC address",
    category: "networking",
    partOfSpeech: "noun",
    phonetic: "/mæk ˈædrɛs/",
    definition: "Media Access Control address — a unique hardware identifier assigned to a network interface card.",
    exampleSentences: [
      "Each network card has a unique MAC address burned in by the manufacturer.",
      "Network switches use MAC addresses to direct traffic within a local network.",
      "MAC address filtering can restrict which devices can connect to a Wi-Fi network.",
      "ARP resolves IP addresses to MAC addresses within a local network segment."
    ]
  },

  /* ================================================
   * SOFTWARE DEVELOPMENT  (20 words)
   * ================================================ */
  {
    id: "repository",
    word: "repository",
    category: "software-dev",
    partOfSpeech: "noun",
    phonetic: "/rɪˈpɒzɪtɔːri/",
    definition: "A central location where source code and project history are stored and managed, typically using version control.",
    exampleSentences: [
      "The team created a new Git repository for the microservice project.",
      "Open-source repositories on GitHub allow developers worldwide to contribute.",
      "The CI/CD pipeline automatically triggers when code is pushed to the repository.",
      "Repository access is controlled through branch protection rules and permissions."
    ]
  },
  {
    id: "commit",
    word: "commit",
    category: "software-dev",
    partOfSpeech: "noun/verb",
    phonetic: "/kəˈmɪt/",
    definition: "A snapshot of code changes saved to a version control repository, with a message describing what was changed.",
    exampleSentences: [
      "Each commit should represent one logical change with a descriptive message.",
      "The developer committed the bug fix and pushed it to the feature branch.",
      "Git blame shows which commit introduced each line of code.",
      "Writing clear commit messages helps future developers understand the project history."
    ]
  },
  {
    id: "branch",
    word: "branch",
    category: "software-dev",
    partOfSpeech: "noun",
    phonetic: "/bræntʃ/",
    definition: "A parallel version of a repository that diverges from the main codebase, used to develop features in isolation.",
    exampleSentences: [
      "The developer created a feature branch to work on the new login system.",
      "Branch naming conventions like 'feature/' help organize the repository.",
      "The main branch is protected and requires pull request reviews before merging.",
      "Long-lived branches are risky because they accumulate merge conflicts over time."
    ]
  },
  {
    id: "merge",
    word: "merge",
    category: "software-dev",
    partOfSpeech: "verb/noun",
    phonetic: "/mɜːrdʒ/",
    definition: "The process of integrating changes from one branch into another, combining their histories.",
    exampleSentences: [
      "After the code review was approved, she merged the feature branch into main.",
      "Merge conflicts occur when two branches modify the same lines of code.",
      "The team uses squash merge to keep the main branch history clean.",
      "Automated tests must pass before any branch can be merged."
    ]
  },
  {
    id: "api",
    word: "API",
    category: "software-dev",
    partOfSpeech: "noun",
    phonetic: "/eɪ piː aɪ/",
    definition: "Application Programming Interface — a set of rules and endpoints allowing different software applications to communicate.",
    exampleSentences: [
      "The mobile app fetches user data through the REST API.",
      "Third-party integrations use our public API to sync data.",
      "Good API design includes clear documentation and consistent error responses.",
      "The API rate limit was increased after the startup grew to 10,000 daily users."
    ]
  },
  {
    id: "endpoint",
    word: "endpoint",
    category: "software-dev",
    partOfSpeech: "noun",
    phonetic: "/ˈɛndpɔɪnt/",
    definition: "A specific URL in an API where requests can be sent to access a resource or trigger an action.",
    exampleSentences: [
      "The '/users/{id}' endpoint returns a user's profile data in JSON format.",
      "Each API endpoint has different authentication and authorization requirements.",
      "Load testing the most critical endpoints ensures the system handles peak traffic.",
      "Deprecated endpoints are removed after notifying API consumers in advance."
    ]
  },
  {
    id: "refactoring",
    word: "refactoring",
    category: "software-dev",
    partOfSpeech: "noun",
    phonetic: "/ˌriːˈfæktərɪŋ/",
    definition: "The process of restructuring existing code to improve readability and maintainability without changing its external behavior.",
    exampleSentences: [
      "The team spent a sprint refactoring the authentication module to reduce technical debt.",
      "Refactoring should be done incrementally with tests to catch regressions.",
      "Extracting helper functions is a common refactoring technique.",
      "Good test coverage gives engineers confidence when refactoring complex code."
    ]
  },
  {
    id: "debugging",
    word: "debugging",
    category: "software-dev",
    partOfSpeech: "noun",
    phonetic: "/diːˈbʌɡɪŋ/",
    definition: "The process of identifying, analyzing, and fixing errors or bugs in software code.",
    exampleSentences: [
      "The engineer spent hours debugging the race condition in the payment service.",
      "Using a debugger to set breakpoints makes it easier to inspect variable states.",
      "Logging is essential for debugging issues that only occur in production.",
      "Rubber duck debugging — explaining your code aloud — can help you find bugs quickly."
    ]
  },
  {
    id: "deployment",
    word: "deployment",
    category: "software-dev",
    partOfSpeech: "noun",
    phonetic: "/dɪˈplɔɪmənt/",
    definition: "The process of releasing and installing a software application to a target environment such as production.",
    exampleSentences: [
      "The team performs zero-downtime deployments using blue-green deployment strategy.",
      "Every deployment is preceded by automated tests and a code review.",
      "Rollback procedures must be tested before any major deployment.",
      "Kubernetes manages container deployment, scaling, and self-healing automatically."
    ]
  },
  {
    id: "dependency",
    word: "dependency",
    category: "software-dev",
    partOfSpeech: "noun",
    phonetic: "/dɪˈpɛndənsi/",
    definition: "An external library, package, or module that a software project requires to function.",
    exampleSentences: [
      "The project has 47 npm dependencies listed in the package.json file.",
      "Outdated dependencies are a common source of security vulnerabilities.",
      "Using a lockfile ensures all developers install the exact same dependency versions.",
      "Circular dependencies between modules can make code difficult to maintain."
    ]
  },
  {
    id: "unit-test",
    word: "unit test",
    category: "software-dev",
    partOfSpeech: "noun",
    phonetic: "/ˈjuːnɪt tɛst/",
    definition: "An automated test that verifies the behavior of a small, isolated piece of code such as a single function.",
    exampleSentences: [
      "Writing unit tests for each function ensures individual components work correctly.",
      "High unit test coverage gives developers confidence when refactoring code.",
      "Mocking external dependencies allows unit tests to run without network access.",
      "The CI pipeline runs all unit tests on every pull request before review."
    ]
  },
  {
    id: "framework",
    word: "framework",
    category: "software-dev",
    partOfSpeech: "noun",
    phonetic: "/ˈfreɪmwɜːrk/",
    definition: "A reusable software platform that provides a foundation and structure for building applications.",
    exampleSentences: [
      "React is a JavaScript framework for building interactive user interfaces.",
      "The backend is built with the NestJS framework, which supports TypeScript.",
      "Choosing the right framework can significantly speed up development time.",
      "Frameworks enforce coding conventions that make it easier for new developers to join a project."
    ]
  },
  {
    id: "runtime",
    word: "runtime",
    category: "software-dev",
    partOfSpeech: "noun",
    phonetic: "/ˈrʌntaɪm/",
    definition: "The environment in which a program executes, including the software infrastructure needed to run it.",
    exampleSentences: [
      "Node.js is a JavaScript runtime that allows running JavaScript outside the browser.",
      "Runtime errors occur during program execution, unlike compile-time errors.",
      "Container images bundle an application with its runtime dependencies.",
      "The runtime version must match between development and production environments."
    ]
  },
  {
    id: "compile",
    word: "compile",
    category: "software-dev",
    partOfSpeech: "verb",
    phonetic: "/kəmˈpaɪl/",
    definition: "To translate source code written in a high-level programming language into machine-executable code.",
    exampleSentences: [
      "TypeScript code must be compiled to JavaScript before it can run in the browser.",
      "The build pipeline compiles the application and packages it as a Docker image.",
      "A compile error prevents the program from building until the issue is resolved.",
      "Ahead-of-time compilation improves startup performance for mobile applications."
    ]
  },
  {
    id: "abstraction",
    word: "abstraction",
    category: "software-dev",
    partOfSpeech: "noun",
    phonetic: "/æbˈstrækʃən/",
    definition: "Hiding complex implementation details behind a simple interface, showing only necessary information.",
    exampleSentences: [
      "Database abstraction layers allow switching databases without rewriting business logic.",
      "Good abstraction reduces code complexity and makes systems easier to understand.",
      "APIs are a form of abstraction that hide the internal implementation of a service.",
      "Over-abstraction can make code harder to understand, so balance is important."
    ]
  },
  {
    id: "design-pattern",
    word: "design pattern",
    category: "software-dev",
    partOfSpeech: "noun",
    phonetic: "/dɪˈzaɪn ˈpætərn/",
    definition: "A reusable solution to a commonly occurring problem in software design.",
    exampleSentences: [
      "The singleton design pattern ensures only one instance of a class exists.",
      "Learning common design patterns helps developers write more maintainable code.",
      "The observer pattern is widely used in event-driven JavaScript applications.",
      "Design patterns provide a shared vocabulary for developers to discuss solutions."
    ]
  },
  {
    id: "technical-debt",
    word: "technical debt",
    category: "software-dev",
    partOfSpeech: "noun",
    phonetic: "/ˈtɛknɪkəl dɛt/",
    definition: "The implied cost of rework caused by choosing a quick but limited solution over a better, more thorough approach.",
    exampleSentences: [
      "Years of shortcuts had accumulated significant technical debt in the codebase.",
      "The team allocated 20% of each sprint to paying down technical debt.",
      "Technical debt increases maintenance costs and slows down future development.",
      "Refactoring sessions are necessary to reduce technical debt before it becomes unmanageable."
    ]
  },
  {
    id: "agile",
    word: "Agile",
    category: "software-dev",
    partOfSpeech: "noun/adjective",
    phonetic: "/ˈædʒaɪl/",
    definition: "A software development methodology that emphasizes iterative development, collaboration, and rapid delivery of working software.",
    exampleSentences: [
      "The company switched to Agile development to ship features faster.",
      "Agile teams work in short sprints and adapt to changing requirements.",
      "Daily standups are a core Agile ceremony for team synchronization.",
      "Agile promotes delivering working software over comprehensive documentation."
    ]
  },
  {
    id: "sprint",
    word: "sprint",
    category: "software-dev",
    partOfSpeech: "noun",
    phonetic: "/sprɪnt/",
    definition: "A fixed-length iteration in Agile development, typically 1–2 weeks, during which a set of features is built and delivered.",
    exampleSentences: [
      "The team completed five new features in the two-week sprint.",
      "Sprint planning involves selecting user stories from the backlog.",
      "A sprint retrospective helps the team identify what went well and what to improve.",
      "Each sprint ends with a review demo showing stakeholders the completed work."
    ]
  },
  {
    id: "code-review",
    word: "code review",
    category: "software-dev",
    partOfSpeech: "noun",
    phonetic: "/koʊd rɪˈvjuː/",
    definition: "The systematic examination of source code by peers to identify bugs, enforce standards, and share knowledge.",
    exampleSentences: [
      "All changes must pass code review before being merged into the main branch.",
      "Code review feedback should be constructive and focused on the code, not the author.",
      "Automated linters reduce the time spent on style issues during code review.",
      "Regular code reviews spread knowledge of the codebase across the entire team."
    ]
  },

  /* ================================================
   * CLOUD & DEVOPS  (20 words)
   * ================================================ */
  {
    id: "containerization",
    word: "containerization",
    category: "cloud-devops",
    partOfSpeech: "noun",
    phonetic: "/kənˌteɪnərɪˈzeɪʃən/",
    definition: "A lightweight virtualization method that packages an application and its dependencies into an isolated container.",
    exampleSentences: [
      "Docker popularized containerization, making application deployment more consistent.",
      "Containerization ensures the app runs the same way in development and production.",
      "The migration to containerization reduced infrastructure costs by 35%.",
      "Containerization enables teams to deploy dozens of microservices independently."
    ]
  },
  {
    id: "orchestration",
    word: "orchestration",
    category: "cloud-devops",
    partOfSpeech: "noun",
    phonetic: "/ˌɔːrkɪˈstreɪʃən/",
    definition: "The automated management, coordination, and scheduling of containerized workloads and services.",
    exampleSentences: [
      "Kubernetes is the industry-standard tool for container orchestration.",
      "Orchestration platforms handle service discovery, load balancing, and auto-healing.",
      "Without orchestration, managing hundreds of containers manually is impractical.",
      "The orchestration layer restarts failed containers automatically within seconds."
    ]
  },
  {
    id: "microservice",
    word: "microservice",
    category: "cloud-devops",
    partOfSpeech: "noun",
    phonetic: "/ˈmaɪkroʊˌsɜːrvɪs/",
    definition: "A small, independently deployable service that performs a single business function in a distributed application.",
    exampleSentences: [
      "The monolith was broken into microservices to allow teams to deploy independently.",
      "Each microservice owns its own database to avoid tight coupling.",
      "Microservice architecture improves fault isolation — one failure doesn't crash everything.",
      "Service meshes like Istio manage communication between microservices."
    ]
  },
  {
    id: "load-balancer",
    word: "load balancer",
    category: "cloud-devops",
    partOfSpeech: "noun",
    phonetic: "/loʊd ˈbælənsər/",
    definition: "A system that distributes incoming network traffic across multiple servers to prevent any single server from being overwhelmed.",
    exampleSentences: [
      "The load balancer distributes requests across five web servers to handle peak traffic.",
      "A health check failing causes the load balancer to remove that server from rotation.",
      "Application load balancers can route requests based on URL path or headers.",
      "Without a load balancer, a single server becomes a bottleneck and single point of failure."
    ]
  },
  {
    id: "auto-scaling",
    word: "auto-scaling",
    category: "cloud-devops",
    partOfSpeech: "noun",
    phonetic: "/ˈɔːtoʊ ˈskeɪlɪŋ/",
    definition: "A cloud feature that automatically adjusts the number of servers or resources based on current demand.",
    exampleSentences: [
      "Auto-scaling added 10 additional instances during Black Friday's traffic surge.",
      "Cloud cost savings come from auto-scaling down during off-peak hours.",
      "Configuring auto-scaling policies requires understanding your traffic patterns.",
      "Horizontal auto-scaling adds more instances, while vertical scaling increases instance size."
    ]
  },
  {
    id: "cdn",
    word: "CDN",
    category: "cloud-devops",
    partOfSpeech: "noun",
    phonetic: "/siː diː ɛn/",
    definition: "Content Delivery Network — a distributed network of servers that delivers content to users from geographically nearby locations.",
    exampleSentences: [
      "Using a CDN reduced page load times by 60% for users in Southeast Asia.",
      "Static assets like images and JavaScript files are served through the CDN.",
      "CDN providers cache content at edge locations close to end users worldwide.",
      "A CDN also provides DDoS protection by absorbing large volumes of malicious traffic."
    ]
  },
  {
    id: "sla",
    word: "SLA",
    category: "cloud-devops",
    partOfSpeech: "noun",
    phonetic: "/ɛs ɛl eɪ/",
    definition: "Service Level Agreement — a contract specifying the expected performance and availability of a service.",
    exampleSentences: [
      "The cloud provider's SLA guarantees 99.9% uptime each month.",
      "Violating the SLA entitles customers to service credits as compensation.",
      "Setting internal SLAs helps teams prioritize incident response.",
      "Engineers design systems with redundancy to meet strict SLA requirements."
    ]
  },
  {
    id: "throughput",
    word: "throughput",
    category: "cloud-devops",
    partOfSpeech: "noun",
    phonetic: "/ˈθruːpʊt/",
    definition: "The rate at which a system processes work, measured as requests or transactions completed per unit of time.",
    exampleSentences: [
      "The message queue processes 50,000 events per second at peak throughput.",
      "Database throughput dropped significantly when an index was missing.",
      "Load testing measures system throughput under simulated production conditions.",
      "High throughput is critical for real-time analytics pipelines processing streaming data."
    ]
  },
  {
    id: "redundancy",
    word: "redundancy",
    category: "cloud-devops",
    partOfSpeech: "noun",
    phonetic: "/rɪˈdʌndənsi/",
    definition: "The use of duplicate components so that if one fails, another can take over without interruption.",
    exampleSentences: [
      "Data redundancy across three availability zones protects against regional outages.",
      "The network team added redundancy to the fiber connection after a cable cut.",
      "RAID storage uses redundancy to prevent data loss from a single disk failure.",
      "Geographic redundancy ensures services remain available even during a data center disaster."
    ]
  },
  {
    id: "failover",
    word: "failover",
    category: "cloud-devops",
    partOfSpeech: "noun",
    phonetic: "/ˈfeɪloʊvər/",
    definition: "The automatic switching to a backup system or server when the primary one fails or becomes unavailable.",
    exampleSentences: [
      "Automatic failover switched the database to the standby replica in under 30 seconds.",
      "The application was designed for seamless failover with no user-visible interruption.",
      "Testing the failover process regularly is essential for disaster recovery readiness.",
      "DNS failover redirects traffic to a healthy region when one region goes down."
    ]
  },
  {
    id: "provisioning",
    word: "provisioning",
    category: "cloud-devops",
    partOfSpeech: "noun",
    phonetic: "/prəˈvɪʒənɪŋ/",
    definition: "The process of setting up and configuring IT infrastructure resources such as servers, networks, and storage.",
    exampleSentences: [
      "Infrastructure as Code automates server provisioning, eliminating manual configuration.",
      "Provisioning a new environment used to take days; now it takes minutes with automation.",
      "Cloud provisioning APIs allow developers to spin up resources programmatically.",
      "Terraform handles provisioning across multiple cloud providers with a single configuration."
    ]
  },
  {
    id: "kubernetes",
    word: "Kubernetes",
    category: "cloud-devops",
    partOfSpeech: "noun",
    phonetic: "/kjuːbərˈnɛtɪs/",
    definition: "An open-source container orchestration platform for automating deployment, scaling, and management of containerized applications.",
    exampleSentences: [
      "The team migrated from manual Docker deployments to Kubernetes for better scaling.",
      "Kubernetes health probes automatically restart containers that stop responding.",
      "A Kubernetes cluster consists of a control plane and multiple worker nodes.",
      "Helm charts simplify deploying complex applications on Kubernetes."
    ]
  },
  {
    id: "cluster",
    word: "cluster",
    category: "cloud-devops",
    partOfSpeech: "noun",
    phonetic: "/ˈklʌstər/",
    definition: "A group of interconnected servers that work together as a single system to provide high availability and performance.",
    exampleSentences: [
      "The Kubernetes cluster runs 200 containers across 20 worker nodes.",
      "A database cluster replicates data across multiple nodes for fault tolerance.",
      "Adding nodes to the cluster increased capacity to handle the growing workload.",
      "Cluster autoscaler adds or removes nodes based on pending resource requests."
    ]
  },
  {
    id: "ci-cd",
    word: "CI/CD",
    category: "cloud-devops",
    partOfSpeech: "noun",
    phonetic: "/siː aɪ siː diː/",
    definition: "Continuous Integration/Continuous Delivery — automating testing and deployment so code can be shipped frequently and reliably.",
    exampleSentences: [
      "The CI/CD pipeline runs tests, builds the image, and deploys to staging automatically.",
      "Implementing CI/CD reduced the team's release cycle from weeks to hours.",
      "A failing CI check prevents broken code from being merged to the main branch.",
      "CD pipelines include manual approval gates before deploying to production."
    ]
  },
  {
    id: "iac",
    word: "IaC",
    category: "cloud-devops",
    partOfSpeech: "noun",
    phonetic: "/aɪ eɪ siː/",
    definition: "Infrastructure as Code — managing and provisioning infrastructure through machine-readable configuration files.",
    exampleSentences: [
      "IaC tools like Terraform allow version-controlling your entire cloud infrastructure.",
      "Using IaC ensures development and production environments are identical.",
      "The IaC configuration was reviewed in a pull request before applying changes.",
      "IaC enables disaster recovery by recreating the entire infrastructure from code."
    ]
  },
  {
    id: "docker",
    word: "Docker",
    category: "cloud-devops",
    partOfSpeech: "noun",
    phonetic: "/ˈdɒkər/",
    definition: "An open-source platform for developing, shipping, and running applications inside portable containers.",
    exampleSentences: [
      "The developer used Docker to create a consistent environment for the whole team.",
      "A Dockerfile defines the instructions for building a Docker image.",
      "Docker Compose lets you define and run multi-container applications with a single command.",
      "Docker Hub is a registry for storing and sharing container images publicly."
    ]
  },
  {
    id: "monitoring",
    word: "monitoring",
    category: "cloud-devops",
    partOfSpeech: "noun",
    phonetic: "/ˈmɒnɪtərɪŋ/",
    definition: "The continuous observation of system metrics, logs, and health indicators to detect problems and ensure reliability.",
    exampleSentences: [
      "Prometheus and Grafana are popular tools for infrastructure monitoring.",
      "Monitoring dashboards provide real-time visibility into application performance.",
      "Without proper monitoring, issues can go undetected until users complain.",
      "The on-call engineer was paged by the monitoring system when error rates spiked."
    ]
  },
  {
    id: "logging",
    word: "logging",
    category: "cloud-devops",
    partOfSpeech: "noun",
    phonetic: "/ˈlɒɡɪŋ/",
    definition: "The practice of recording events, errors, and diagnostic information generated by software applications.",
    exampleSentences: [
      "Structured logging makes it easier to search and filter log entries.",
      "Centralized logging aggregates logs from all services into one searchable platform.",
      "The team added detailed logging to diagnose the intermittent production failure.",
      "Log retention policies balance storage costs with compliance and debugging needs."
    ]
  },
  {
    id: "terraform",
    word: "Terraform",
    category: "cloud-devops",
    partOfSpeech: "noun",
    phonetic: "/ˈtɛrəfɔːrm/",
    definition: "An open-source IaC tool by HashiCorp that allows declarative provisioning of cloud infrastructure across multiple providers.",
    exampleSentences: [
      "The team uses Terraform to manage AWS and Azure resources from a single codebase.",
      "Terraform's plan command shows what changes will be applied before executing them.",
      "Terraform state files track the current infrastructure to detect configuration drift.",
      "Migrating to Terraform eliminated the inconsistencies caused by manual cloud console changes."
    ]
  },
  {
    id: "helm",
    word: "Helm",
    category: "cloud-devops",
    partOfSpeech: "noun",
    phonetic: "/hɛlm/",
    definition: "A package manager for Kubernetes that simplifies deploying and managing applications using reusable templates called charts.",
    exampleSentences: [
      "The team installs third-party software on Kubernetes using Helm charts.",
      "Helm allows parameterizing deployments so the same chart works in dev and production.",
      "Rolling back a failed deployment is straightforward with Helm's rollback command.",
      "Helm repositories host charts that can be shared and reused across organizations."
    ]
  },

  /* ================================================
   * DATABASES  (20 words)
   * ================================================ */
  {
    id: "database",
    word: "database",
    category: "databases",
    partOfSpeech: "noun",
    phonetic: "/ˈdeɪtəbeɪs/",
    definition: "An organized collection of structured information or data, typically stored and accessed electronically.",
    exampleSentences: [
      "The application stores user profiles in a relational database.",
      "Database performance is critical for applications with millions of concurrent users.",
      "Regular database backups protect against data loss from hardware failure.",
      "The database administrator tuned query performance to reduce response times."
    ]
  },
  {
    id: "sql",
    word: "SQL",
    category: "databases",
    partOfSpeech: "noun",
    phonetic: "/ɛs kjuː ɛl/",
    definition: "Structured Query Language — the standard language for managing and querying relational databases.",
    exampleSentences: [
      "The analyst wrote an SQL query to calculate monthly revenue from the sales table.",
      "SQL joins allow combining data from multiple related tables in a single query.",
      "Learning SQL is essential for anyone working with data in software development.",
      "The SQL injection vulnerability was fixed by using parameterized queries."
    ]
  },
  {
    id: "nosql",
    word: "NoSQL",
    category: "databases",
    partOfSpeech: "noun",
    phonetic: "/noʊ ɛs kjuː ɛl/",
    definition: "A category of databases that store data in non-tabular formats, designed for flexibility, scalability, and unstructured data.",
    exampleSentences: [
      "MongoDB is a popular NoSQL database that stores data as JSON-like documents.",
      "NoSQL databases are preferred when data models are expected to change frequently.",
      "The team chose a NoSQL database to handle the unpredictable schema of user-generated content.",
      "NoSQL databases can scale horizontally across many servers more easily than relational ones."
    ]
  },
  {
    id: "query",
    word: "query",
    category: "databases",
    partOfSpeech: "noun",
    phonetic: "/ˈkwɪəri/",
    definition: "A request for data or information from a database, typically written in SQL or another query language.",
    exampleSentences: [
      "The query took 3 seconds to run because it was missing an index on the email column.",
      "Optimizing slow queries is one of the most impactful database performance improvements.",
      "The ORM generates SQL queries automatically from high-level application code.",
      "A complex query joining five tables was simplified by creating a database view."
    ]
  },
  {
    id: "schema",
    word: "schema",
    category: "databases",
    partOfSpeech: "noun",
    phonetic: "/ˈskiːmə/",
    definition: "The structure or blueprint of a database, defining tables, columns, data types, and relationships.",
    exampleSentences: [
      "Any change to the database schema requires a migration to update the structure.",
      "The schema was designed to enforce data integrity through constraints and foreign keys.",
      "A schemaless NoSQL database allows different records to have different fields.",
      "Database schema documentation helps new developers understand the data model quickly."
    ]
  },
  {
    id: "index",
    word: "index",
    category: "databases",
    partOfSpeech: "noun",
    phonetic: "/ˈɪndɛks/",
    definition: "A data structure that improves the speed of data retrieval operations on a database table.",
    exampleSentences: [
      "Adding an index on the user_id column reduced query time from 2 seconds to 5ms.",
      "Too many indexes slow down write operations because each index must be updated.",
      "A unique index prevents duplicate values from being inserted into a column.",
      "The database administrator analyzed query execution plans to identify missing indexes."
    ]
  },
  {
    id: "transaction",
    word: "transaction",
    category: "databases",
    partOfSpeech: "noun",
    phonetic: "/trænˈzækʃən/",
    definition: "A sequence of database operations executed as a single unit that either fully succeeds or fully fails (ACID properties).",
    exampleSentences: [
      "A bank transfer is wrapped in a transaction to ensure money isn't lost if it fails midway.",
      "Database transactions guarantee that partial updates never leave data in an inconsistent state.",
      "The transaction was rolled back after an error occurred during the payment processing.",
      "Long-running transactions can cause lock contention that slows other database operations."
    ]
  },
  {
    id: "primary-key",
    word: "primary key",
    category: "databases",
    partOfSpeech: "noun",
    phonetic: "/ˈpraɪmɛri kiː/",
    definition: "A column (or set of columns) that uniquely identifies each row in a database table.",
    exampleSentences: [
      "The users table uses an auto-incrementing integer as its primary key.",
      "Primary keys are automatically indexed, making lookups by ID very fast.",
      "Using UUIDs as primary keys avoids conflicts when merging data from multiple sources.",
      "Every table should have a primary key to ensure rows can be uniquely referenced."
    ]
  },
  {
    id: "foreign-key",
    word: "foreign key",
    category: "databases",
    partOfSpeech: "noun",
    phonetic: "/ˈfɒrɪn kiː/",
    definition: "A column that establishes a relationship between two tables by referencing the primary key of another table.",
    exampleSentences: [
      "The orders table has a foreign key to the users table to track which user placed each order.",
      "Foreign key constraints prevent orphaned records by enforcing referential integrity.",
      "Cascading deletes via foreign keys can automatically remove related records.",
      "The database refused to insert the record because the foreign key value didn't exist."
    ]
  },
  {
    id: "join",
    word: "JOIN",
    category: "databases",
    partOfSpeech: "noun",
    phonetic: "/dʒɔɪn/",
    definition: "An SQL operation that combines rows from two or more tables based on a related column.",
    exampleSentences: [
      "The query uses an INNER JOIN to fetch orders along with customer names.",
      "A LEFT JOIN returns all rows from the left table even when there's no matching row on the right.",
      "Excessive JOINs in a query can cause performance issues on large tables.",
      "Understanding different types of JOINs is a fundamental SQL skill."
    ]
  },
  {
    id: "migration",
    word: "migration",
    category: "databases",
    partOfSpeech: "noun",
    phonetic: "/maɪˈɡreɪʃən/",
    definition: "A versioned script that modifies the database schema or data, allowing controlled evolution of the data model.",
    exampleSentences: [
      "The developer wrote a migration to add the new 'phone_number' column to the users table.",
      "Database migrations are version-controlled alongside application code.",
      "A failed migration in production caused a one-hour incident and required a rollback.",
      "Running migrations automatically as part of the deployment process reduces human error."
    ]
  },
  {
    id: "orm",
    word: "ORM",
    category: "databases",
    partOfSpeech: "noun",
    phonetic: "/oʊ ɑːr ɛm/",
    definition: "Object-Relational Mapper — a library that translates between object-oriented code and relational database tables.",
    exampleSentences: [
      "The ORM generates SQL queries automatically, so developers rarely write raw SQL.",
      "TypeORM is a popular ORM for TypeScript and Node.js applications.",
      "ORMs can generate inefficient queries; sometimes writing raw SQL is necessary for performance.",
      "The ORM's migration tool automatically generates schema change scripts."
    ]
  },
  {
    id: "replication",
    word: "replication",
    category: "databases",
    partOfSpeech: "noun",
    phonetic: "/ˌrɛplɪˈkeɪʃən/",
    definition: "The process of copying and maintaining database objects across multiple servers to ensure redundancy and availability.",
    exampleSentences: [
      "Database replication creates read replicas to distribute query load across servers.",
      "Replication lag can cause stale reads when data is written to the primary but not yet synced.",
      "Multi-region replication ensures the database remains available if one region fails.",
      "The primary database handles writes while replicas serve read-only queries."
    ]
  },
  {
    id: "sharding",
    word: "sharding",
    category: "databases",
    partOfSpeech: "noun",
    phonetic: "/ˈʃɑːrdɪŋ/",
    definition: "A database scaling technique that horizontally partitions data across multiple servers, each handling a subset of the data.",
    exampleSentences: [
      "The social media platform uses sharding to distribute its billion-row user table.",
      "Sharding by user ID ensures users from the same region access the same database shard.",
      "Poorly chosen shard keys can create hot spots where one shard handles most of the traffic.",
      "Sharding adds complexity to queries that need to combine data from multiple shards."
    ]
  },
  {
    id: "connection-pool",
    word: "connection pool",
    category: "databases",
    partOfSpeech: "noun",
    phonetic: "/kəˈnɛkʃən puːl/",
    definition: "A cache of database connections maintained so they can be reused, reducing the overhead of establishing new connections.",
    exampleSentences: [
      "A connection pool of 20 connections handles hundreds of concurrent requests efficiently.",
      "Exhausting the connection pool causes requests to queue, degrading application performance.",
      "PgBouncer is a popular connection pool for PostgreSQL databases.",
      "Setting the correct connection pool size requires balancing database and application capacity."
    ]
  },
  {
    id: "normalization",
    word: "normalization",
    category: "databases",
    partOfSpeech: "noun",
    phonetic: "/ˌnɔːrməlaɪˈzeɪʃən/",
    definition: "The process of organizing a database schema to reduce data redundancy and improve data integrity.",
    exampleSentences: [
      "Normalization eliminated duplicate customer addresses stored in multiple tables.",
      "Third Normal Form (3NF) is a commonly targeted level of normalization.",
      "Sometimes intentional denormalization improves read performance at the cost of redundancy.",
      "The database designer applied normalization rules to ensure each fact is stored only once."
    ]
  },
  {
    id: "stored-procedure",
    word: "stored procedure",
    category: "databases",
    partOfSpeech: "noun",
    phonetic: "/stɔːrd prəˈsiːdʒər/",
    definition: "A precompiled SQL program stored in the database that can be executed by name, encapsulating complex business logic.",
    exampleSentences: [
      "The payment system uses a stored procedure to ensure the charge and inventory update happen atomically.",
      "Stored procedures can improve performance by executing logic close to the data.",
      "The team moved complex reporting logic from application code into a stored procedure.",
      "Debugging stored procedures requires database-specific tools and can be challenging."
    ]
  },
  {
    id: "cache",
    word: "cache",
    category: "databases",
    partOfSpeech: "noun",
    phonetic: "/kæʃ/",
    definition: "A high-speed data storage layer that stores a subset of frequently accessed data so future requests are served faster.",
    exampleSentences: [
      "Redis is commonly used as a cache to store frequently read database query results.",
      "Cache invalidation — knowing when to clear stale data — is one of the hardest problems in computing.",
      "The API response time dropped from 200ms to 5ms after adding a caching layer.",
      "Cache hit rate is a key metric; a low rate means most requests still reach the database."
    ]
  },
  {
    id: "acid",
    word: "ACID",
    category: "databases",
    partOfSpeech: "noun",
    phonetic: "/ˈæsɪd/",
    definition: "A set of properties (Atomicity, Consistency, Isolation, Durability) that guarantee database transactions are processed reliably.",
    exampleSentences: [
      "PostgreSQL is an ACID-compliant database, making it suitable for financial applications.",
      "ACID properties ensure that a partially completed transaction never corrupts the database.",
      "The team chose a relational database for its ACID guarantees over a faster NoSQL alternative.",
      "Understanding ACID is fundamental to designing reliable data storage systems."
    ]
  },
  {
    id: "backup",
    word: "backup",
    category: "databases",
    partOfSpeech: "noun",
    phonetic: "/ˈbækʌp/",
    definition: "A copy of data stored separately so it can be restored if the original is lost, corrupted, or deleted.",
    exampleSentences: [
      "Automated daily backups are scheduled during off-peak hours to minimize impact.",
      "The team discovered the backup was corrupt only after attempting to restore from it.",
      "A backup strategy should include regular testing of the restore process.",
      "Point-in-time recovery allows restoring the database to any moment within the backup window."
    ]
  },

  /* ================================================
   * SECURITY  (20 words)
   * ================================================ */
  {
    id: "authentication",
    word: "authentication",
    category: "security",
    partOfSpeech: "noun",
    phonetic: "/ɔːˌθɛntɪˈkeɪʃən/",
    definition: "The process of verifying the identity of a user, device, or system before granting access.",
    exampleSentences: [
      "The app uses email and password authentication for user login.",
      "Multi-factor authentication adds a second verification step after password entry.",
      "OAuth allows users to authenticate with a third-party provider like Google.",
      "Failed authentication attempts are logged and trigger account lockout after five tries."
    ]
  },
  {
    id: "authorization",
    word: "authorization",
    category: "security",
    partOfSpeech: "noun",
    phonetic: "/ˌɔːθərɪˈzeɪʃən/",
    definition: "The process of determining what resources or actions an authenticated user is permitted to access or perform.",
    exampleSentences: [
      "Even after authentication, the user needs authorization to access admin features.",
      "Role-based access control is a common authorization pattern for web applications.",
      "The API returns a 403 Forbidden error when an authenticated user lacks authorization.",
      "Authorization logic should be enforced on the server, never relying on client-side checks."
    ]
  },
  {
    id: "encryption",
    word: "encryption",
    category: "security",
    partOfSpeech: "noun",
    phonetic: "/ɪnˈkrɪpʃən/",
    definition: "The process of converting data into an unreadable format using an algorithm, so only authorized parties can access it.",
    exampleSentences: [
      "All data at rest is protected by AES-256 encryption.",
      "TLS encryption protects data in transit between the browser and the server.",
      "End-to-end encryption means only the sender and recipient can read the message.",
      "The leaked database was useless to attackers because all passwords used encryption."
    ]
  },
  {
    id: "hashing",
    word: "hashing",
    category: "security",
    partOfSpeech: "noun",
    phonetic: "/ˈhæʃɪŋ/",
    definition: "A one-way function that converts data into a fixed-length string (hash) that cannot be reversed to the original.",
    exampleSentences: [
      "Passwords are stored as bcrypt hashes so the plaintext is never saved.",
      "Hashing algorithms like SHA-256 produce a unique fingerprint for any input.",
      "File hashing verifies integrity — if the hash changes, the file was tampered with.",
      "Rainbow table attacks against hashing are defeated by adding a random salt to each password."
    ]
  },
  {
    id: "ssl-tls",
    word: "TLS",
    category: "security",
    partOfSpeech: "noun",
    phonetic: "/tiː ɛl ɛs/",
    definition: "Transport Layer Security — a cryptographic protocol that secures communication over a network (successor to SSL).",
    exampleSentences: [
      "HTTPS websites use TLS to encrypt data between the browser and the server.",
      "A TLS certificate issued by a Certificate Authority verifies the server's identity.",
      "The security audit revealed that the API was still using TLS 1.0, which is outdated.",
      "Let's Encrypt provides free TLS certificates, making HTTPS accessible to everyone."
    ]
  },
  {
    id: "xss",
    word: "XSS",
    category: "security",
    partOfSpeech: "noun",
    phonetic: "/ɛks ɛs ɛs/",
    definition: "Cross-Site Scripting — a vulnerability where attackers inject malicious scripts into web pages viewed by other users.",
    exampleSentences: [
      "The XSS vulnerability allowed attackers to steal session cookies from logged-in users.",
      "Escaping user input before rendering it in HTML is the primary defense against XSS.",
      "Stored XSS attacks persist in the database and affect every user who views the page.",
      "Content Security Policy headers significantly reduce the risk of XSS attacks."
    ]
  },
  {
    id: "sql-injection",
    word: "SQL injection",
    category: "security",
    partOfSpeech: "noun",
    phonetic: "/ɛs kjuː ɛl ɪnˈdʒɛkʃən/",
    definition: "An attack where malicious SQL code is inserted into input fields to manipulate database queries.",
    exampleSentences: [
      "The login form was vulnerable to SQL injection because user input was not sanitized.",
      "Using parameterized queries completely prevents SQL injection attacks.",
      "An SQL injection attack gave the hacker access to the entire user database.",
      "OWASP ranks SQL injection as one of the most critical web application security risks."
    ]
  },
  {
    id: "ddos",
    word: "DDoS",
    category: "security",
    partOfSpeech: "noun",
    phonetic: "/diː diː oʊ ɛs/",
    definition: "Distributed Denial of Service — an attack that floods a server with traffic from multiple sources to make it unavailable.",
    exampleSentences: [
      "The gaming company's servers went down for three hours during a DDoS attack.",
      "CDN providers offer DDoS mitigation by absorbing traffic at their edge nodes.",
      "Rate limiting API endpoints helps reduce the impact of DDoS attacks.",
      "The DDoS attack generated 500 Gbps of traffic, overwhelming the datacenter's bandwidth."
    ]
  },
  {
    id: "vulnerability",
    word: "vulnerability",
    category: "security",
    partOfSpeech: "noun",
    phonetic: "/ˌvʌlnərəˈbɪlɪti/",
    definition: "A weakness in a system that can be exploited by an attacker to gain unauthorized access or cause harm.",
    exampleSentences: [
      "The security team runs regular scans to identify new vulnerabilities in dependencies.",
      "The Log4Shell vulnerability affected millions of systems and required an emergency patch.",
      "A responsible disclosure program allows researchers to report vulnerabilities confidentially.",
      "Patching known vulnerabilities quickly is one of the most effective security practices."
    ]
  },
  {
    id: "oauth",
    word: "OAuth",
    category: "security",
    partOfSpeech: "noun",
    phonetic: "/oʊˈɔːθ/",
    definition: "An open standard for authorization that allows users to grant third-party applications limited access to their accounts without sharing passwords.",
    exampleSentences: [
      "The app uses OAuth to let users log in with their Google or GitHub accounts.",
      "OAuth access tokens expire after a short period to limit the damage of token theft.",
      "Implementing OAuth correctly is complex; using a trusted library is strongly recommended.",
      "OAuth scopes define which specific resources a third-party app can access."
    ]
  },
  {
    id: "jwt",
    word: "JWT",
    category: "security",
    partOfSpeech: "noun",
    phonetic: "/dʒɒt/",
    definition: "JSON Web Token — a compact, self-contained token for securely transmitting information between parties as a JSON object.",
    exampleSentences: [
      "After login, the server issues a JWT that the client includes in subsequent API requests.",
      "JWT payloads are base64-encoded, not encrypted, so sensitive data should never be stored in them.",
      "The server validates the JWT signature on every request to ensure it hasn't been tampered with.",
      "Setting a short expiration on JWTs limits the window of opportunity if a token is stolen."
    ]
  },
  {
    id: "penetration-testing",
    word: "penetration testing",
    category: "security",
    partOfSpeech: "noun",
    phonetic: "/ˌpɛnɪˈtreɪʃən ˈtɛstɪŋ/",
    definition: "Authorized simulated attacks on a computer system to evaluate its security posture and find vulnerabilities before attackers do.",
    exampleSentences: [
      "The company hired a security firm to conduct annual penetration testing.",
      "Penetration testing found three critical vulnerabilities that the development team had missed.",
      "A penetration testing report prioritizes findings by severity and recommended remediation.",
      "Bug bounty programs are a continuous form of penetration testing by the security community."
    ]
  },
  {
    id: "certificate",
    word: "certificate",
    category: "security",
    partOfSpeech: "noun",
    phonetic: "/səˈtɪfɪkɪt/",
    definition: "A digital document that verifies the identity of a website or entity and enables encrypted communication.",
    exampleSentences: [
      "An expired TLS certificate caused the browser to display a security warning.",
      "Certificate Authorities like DigiCert issue certificates after verifying domain ownership.",
      "Certificate pinning prevents man-in-the-middle attacks by trusting only specific certificates.",
      "The DevOps team automated certificate renewal to avoid service disruptions from expiry."
    ]
  },
  {
    id: "two-factor-auth",
    word: "two-factor authentication",
    category: "security",
    partOfSpeech: "noun",
    phonetic: "/tuː ˈfæktər ɔːˌθɛntɪˈkeɪʃən/",
    definition: "A security method requiring two forms of identity verification — typically a password plus a one-time code.",
    exampleSentences: [
      "The company made two-factor authentication mandatory for all employee accounts.",
      "Authenticator apps generate time-based codes for two-factor authentication.",
      "Two-factor authentication significantly reduces account takeover risk even if passwords are leaked.",
      "SMS-based two-factor authentication is better than nothing but weaker than app-based codes."
    ]
  },
  {
    id: "zero-trust",
    word: "zero trust",
    category: "security",
    partOfSpeech: "noun",
    phonetic: "/ˈzɪəroʊ trʌst/",
    definition: "A security model that assumes no user or device should be trusted by default, requiring continuous verification for all access.",
    exampleSentences: [
      "The zero trust architecture treats every access request as potentially malicious.",
      "Remote work accelerated the adoption of zero trust security frameworks.",
      "In a zero trust model, VPN access alone is not sufficient to reach internal resources.",
      "Zero trust principles require authenticating and authorizing every request individually."
    ]
  },
  {
    id: "sanitization",
    word: "sanitization",
    category: "security",
    partOfSpeech: "noun",
    phonetic: "/ˌsænɪtaɪˈzeɪʃən/",
    definition: "The process of cleaning or validating user input to prevent malicious code from being executed by the application.",
    exampleSentences: [
      "Input sanitization prevents XSS attacks by stripping HTML tags from user-submitted text.",
      "The security guide recommends sanitization on both client and server sides.",
      "Database sanitization using parameterized queries prevents SQL injection attacks.",
      "A missing sanitization step in the comment field allowed an attacker to inject a script."
    ]
  },
  {
    id: "access-control",
    word: "access control",
    category: "security",
    partOfSpeech: "noun",
    phonetic: "/ˈæksɛs kənˈtroʊl/",
    definition: "Mechanisms that restrict which users or systems can view or modify resources based on defined policies.",
    exampleSentences: [
      "Role-based access control assigns permissions based on a user's role in the organization.",
      "The misconfigured access control allowed any authenticated user to view admin reports.",
      "Principle of least privilege means users should have the minimum access control needed.",
      "Access control lists define which IP addresses can connect to specific servers."
    ]
  },
  {
    id: "audit-log",
    word: "audit log",
    category: "security",
    partOfSpeech: "noun",
    phonetic: "/ˈɔːdɪt lɒɡ/",
    definition: "A chronological record of security-relevant events, actions, and changes made within a system.",
    exampleSentences: [
      "The audit log showed that the administrator account was used to delete records at 3 AM.",
      "Compliance regulations require maintaining audit logs for a minimum of two years.",
      "Immutable audit logs prevent bad actors from covering their tracks after an incident.",
      "Security teams analyze audit logs to detect unusual patterns that may indicate a breach."
    ]
  },
  {
    id: "csrf",
    word: "CSRF",
    category: "security",
    partOfSpeech: "noun",
    phonetic: "/siː ɛs ɑːr ɛf/",
    definition: "Cross-Site Request Forgery — an attack that tricks users into unknowingly submitting malicious requests to a site they're authenticated with.",
    exampleSentences: [
      "The CSRF attack tricked users into changing their email addresses without their knowledge.",
      "CSRF tokens are random values added to forms to verify the request originated from the site itself.",
      "The SameSite cookie attribute is an effective defense against CSRF attacks.",
      "Modern web frameworks include built-in CSRF protection that is enabled by default."
    ]
  },
  {
    id: "brute-force",
    word: "brute-force",
    category: "security",
    partOfSpeech: "noun/adjective",
    phonetic: "/bruːt fɔːrs/",
    definition: "An attack method that tries every possible combination of credentials until the correct one is found.",
    exampleSentences: [
      "Rate limiting login attempts prevents brute-force attacks from testing millions of passwords.",
      "A brute-force attack on the admin panel was detected and the IP was automatically blocked.",
      "Strong passwords with high entropy are computationally expensive to crack by brute-force.",
      "Account lockout policies limit the effectiveness of brute-force attacks on user credentials."
    ]
  },

  /* ================================================
   * WEB DEVELOPMENT  (20 words)
   * ================================================ */
  {
    id: "dom",
    word: "DOM",
    category: "web-dev",
    partOfSpeech: "noun",
    phonetic: "/dɒm/",
    definition: "Document Object Model — a programming interface representing an HTML document as a tree of objects that can be manipulated with JavaScript.",
    exampleSentences: [
      "JavaScript manipulates the DOM to update the page without a full reload.",
      "Virtual DOM libraries like React minimize expensive DOM operations for performance.",
      "Directly querying the DOM inside a loop causes performance issues due to reflows.",
      "Developers use browser DevTools to inspect and modify the DOM in real time."
    ]
  },
  {
    id: "rest",
    word: "REST",
    category: "web-dev",
    partOfSpeech: "noun",
    phonetic: "/rɛst/",
    definition: "Representational State Transfer — an architectural style for building web APIs using standard HTTP methods.",
    exampleSentences: [
      "The backend exposes a REST API with endpoints for users, products, and orders.",
      "REST APIs use HTTP methods like GET, POST, PUT, and DELETE for different operations.",
      "REST is stateless — each request contains all the information needed to process it.",
      "The mobile team consumed the REST API to build the iOS and Android apps."
    ]
  },
  {
    id: "graphql",
    word: "GraphQL",
    category: "web-dev",
    partOfSpeech: "noun",
    phonetic: "/ˈɡræfkjuːɛl/",
    definition: "A query language and runtime for APIs that allows clients to request exactly the data they need in a single request.",
    exampleSentences: [
      "GraphQL replaced several REST endpoints by letting clients specify exactly which fields they need.",
      "The mobile app uses GraphQL to reduce over-fetching of data.",
      "GraphQL's strongly typed schema serves as automatic API documentation.",
      "Migrating from REST to GraphQL improved the app's performance by reducing payload size."
    ]
  },
  {
    id: "webhook",
    word: "webhook",
    category: "web-dev",
    partOfSpeech: "noun",
    phonetic: "/ˈwɛbhʊk/",
    definition: "A mechanism where a server sends an HTTP request to a specified URL when a specific event occurs, enabling real-time notifications.",
    exampleSentences: [
      "Stripe sends a webhook to our server every time a payment succeeds or fails.",
      "The CI system sends a webhook to Slack when a build completes.",
      "Webhook endpoints must validate the incoming request signature to prevent spoofing.",
      "Webhooks eliminate the need for polling by pushing events to the receiver immediately."
    ]
  },
  {
    id: "cors",
    word: "CORS",
    category: "web-dev",
    partOfSpeech: "noun",
    phonetic: "/kɔːrz/",
    definition: "Cross-Origin Resource Sharing — a browser security mechanism that controls how web pages can request resources from a different domain.",
    exampleSentences: [
      "The frontend received a CORS error when calling an API on a different domain.",
      "The server was configured to allow CORS requests only from the company's domain.",
      "Preflight CORS requests use the OPTIONS method to check server permissions before the actual request.",
      "A misconfigured CORS policy that allows all origins creates a security vulnerability."
    ]
  },
  {
    id: "session",
    word: "session",
    category: "web-dev",
    partOfSpeech: "noun",
    phonetic: "/ˈsɛʃən/",
    definition: "A server-side mechanism for maintaining state across multiple HTTP requests from the same user.",
    exampleSentences: [
      "After login, a session is created on the server and a session ID is stored in a cookie.",
      "Sessions expire after 30 minutes of inactivity to reduce security risks.",
      "Storing sessions in Redis allows multiple server instances to share session state.",
      "Session hijacking occurs when an attacker steals a session ID to impersonate a user."
    ]
  },
  {
    id: "cookie",
    word: "cookie",
    category: "web-dev",
    partOfSpeech: "noun",
    phonetic: "/ˈkʊki/",
    definition: "A small piece of data stored in the browser and sent with every request to the server for state management.",
    exampleSentences: [
      "The authentication cookie is set with HttpOnly to prevent JavaScript from accessing it.",
      "GDPR regulations require websites to obtain consent before setting non-essential cookies.",
      "The Secure cookie flag ensures the cookie is only sent over HTTPS connections.",
      "Session cookies are deleted when the browser is closed; persistent cookies have an expiry date."
    ]
  },
  {
    id: "spa",
    word: "SPA",
    category: "web-dev",
    partOfSpeech: "noun",
    phonetic: "/ɛs piː eɪ/",
    definition: "Single-Page Application — a web application that loads once and dynamically updates content without full page reloads.",
    exampleSentences: [
      "React and Vue are popular frameworks for building SPAs.",
      "A SPA provides a smoother user experience because navigation doesn't reload the entire page.",
      "SPAs must handle routing on the client side since the server only serves one HTML file.",
      "The initial load of a SPA can be slow because it needs to download the entire JavaScript bundle."
    ]
  },
  {
    id: "ssr",
    word: "SSR",
    category: "web-dev",
    partOfSpeech: "noun",
    phonetic: "/ɛs ɛs ɑːr/",
    definition: "Server-Side Rendering — generating HTML on the server for each request rather than in the browser.",
    exampleSentences: [
      "Next.js makes it easy to build React applications with SSR for better SEO.",
      "SSR improves initial page load time because the browser receives fully rendered HTML.",
      "E-commerce sites use SSR to ensure product pages are indexed by search engines.",
      "SSR adds server load because HTML is generated on every request rather than once at build time."
    ]
  },
  {
    id: "websocket",
    word: "WebSocket",
    category: "web-dev",
    partOfSpeech: "noun",
    phonetic: "/ˈwɛbˌsɒkɪt/",
    definition: "A communication protocol providing full-duplex channels over a single TCP connection for real-time browser-server communication.",
    exampleSentences: [
      "The chat application uses WebSockets to push new messages to users instantly.",
      "WebSocket connections remain open, unlike HTTP which creates a new connection per request.",
      "WebSockets are ideal for real-time features like live dashboards and collaborative editing.",
      "The server sent a WebSocket message to all connected clients when stock prices changed."
    ]
  },
  {
    id: "responsive-design",
    word: "responsive design",
    category: "web-dev",
    partOfSpeech: "noun",
    phonetic: "/rɪˈspɒnsɪv dɪˈzaɪn/",
    definition: "A web design approach that makes pages render well on all screen sizes using flexible layouts and CSS media queries.",
    exampleSentences: [
      "Mobile traffic now exceeds desktop, making responsive design essential.",
      "CSS Grid and Flexbox are the foundation of modern responsive design layouts.",
      "Media queries allow applying different CSS rules based on the viewport width.",
      "Google's search ranking algorithm penalizes sites that are not responsive design-friendly."
    ]
  },
  {
    id: "minification",
    word: "minification",
    category: "web-dev",
    partOfSpeech: "noun",
    phonetic: "/ˌmɪnɪfɪˈkeɪʃən/",
    definition: "The process of removing unnecessary characters from code (spaces, comments, long names) to reduce file size and improve load time.",
    exampleSentences: [
      "Minification of JavaScript files reduced the bundle size by 40%.",
      "Build tools like webpack and Vite perform minification automatically for production builds.",
      "Minified code is unreadable to humans; source maps are needed for debugging.",
      "CSS minification removes whitespace and combines rules to produce smaller stylesheets."
    ]
  },
  {
    id: "bundler",
    word: "bundler",
    category: "web-dev",
    partOfSpeech: "noun",
    phonetic: "/ˈbʌndlər/",
    definition: "A tool that combines multiple JavaScript files and their dependencies into one or more optimized files for the browser.",
    exampleSentences: [
      "webpack is the most widely used bundler for large JavaScript applications.",
      "Vite is a modern bundler that uses ES modules for extremely fast development builds.",
      "The bundler analyzes the dependency tree to eliminate dead code through tree shaking.",
      "Configuring the bundler to split code into chunks improves initial page load performance."
    ]
  },
  {
    id: "pwa",
    word: "PWA",
    category: "web-dev",
    partOfSpeech: "noun",
    phonetic: "/piː dʌbljuː eɪ/",
    definition: "Progressive Web App — a web application that uses modern browser features to deliver app-like experiences, including offline support.",
    exampleSentences: [
      "The PWA can be installed on a phone's home screen and works without internet access.",
      "Service workers are the key technology that enables PWA offline functionality.",
      "Starbucks built a PWA to improve performance for customers with slow connections.",
      "A PWA uses a web app manifest to define how the app appears when installed."
    ]
  },
  {
    id: "ajax",
    word: "AJAX",
    category: "web-dev",
    partOfSpeech: "noun",
    phonetic: "/ˈeɪdʒæks/",
    definition: "Asynchronous JavaScript and XML — a technique for making asynchronous HTTP requests from a web page without reloading it.",
    exampleSentences: [
      "The search box uses AJAX to fetch suggestions as the user types.",
      "AJAX revolutionized web development by enabling dynamic content updates without page reloads.",
      "Modern AJAX requests use the fetch API or axios library instead of XMLHttpRequest.",
      "Gmail was one of the first mainstream applications to demonstrate the power of AJAX."
    ]
  },
  {
    id: "cdn-web",
    word: "CDN",
    category: "web-dev",
    partOfSpeech: "noun",
    phonetic: "/siː diː ɛn/",
    definition: "Content Delivery Network — a network of servers that caches and serves static web assets from locations close to users.",
    exampleSentences: [
      "The website serves JavaScript libraries from a CDN to improve load speed globally.",
      "Moving static files to a CDN reduced the origin server's bandwidth costs significantly.",
      "A CDN edge cache served the images without the request ever reaching the origin.",
      "CDN cache purging ensures users receive updated files after a new deployment."
    ]
  },
  {
    id: "api-rate-limit",
    word: "rate limiting",
    category: "web-dev",
    partOfSpeech: "noun",
    phonetic: "/reɪt ˈlɪmɪtɪŋ/",
    definition: "A technique that controls the number of requests a client can make to an API within a given time window.",
    exampleSentences: [
      "The API enforces rate limiting of 100 requests per minute per user.",
      "When rate limiting is exceeded, the server returns a 429 Too Many Requests status code.",
      "Rate limiting protects the API from DDoS attacks and prevents a single user from monopolizing resources.",
      "Implementing exponential backoff in the client helps handle rate limiting gracefully."
    ]
  },
  {
    id: "load-time",
    word: "load time",
    category: "web-dev",
    partOfSpeech: "noun",
    phonetic: "/loʊd taɪm/",
    definition: "The time it takes for a web page to fully render in the browser, a critical factor in user experience and SEO.",
    exampleSentences: [
      "Every 100ms improvement in load time increased conversion rates by 1%.",
      "Lazy loading images reduced the initial page load time by 2 seconds.",
      "Google's Core Web Vitals measure load time as a ranking signal.",
      "The team used Lighthouse to audit and improve the application's load time."
    ]
  },
  {
    id: "middleware",
    word: "middleware",
    category: "web-dev",
    partOfSpeech: "noun",
    phonetic: "/ˈmɪdlwɛər/",
    definition: "Software that sits between a request and a response in a web application, performing tasks like authentication, logging, or data transformation.",
    exampleSentences: [
      "The authentication middleware verifies the JWT token before every protected route.",
      "Logging middleware records request details and response times automatically.",
      "Express.js uses a chain of middleware functions to process HTTP requests.",
      "Rate limiting is commonly implemented as middleware to protect all API endpoints."
    ]
  },
  {
    id: "caching",
    word: "caching",
    category: "web-dev",
    partOfSpeech: "noun",
    phonetic: "/ˈkæʃɪŋ/",
    definition: "Storing copies of responses or computed results so future identical requests can be served faster.",
    exampleSentences: [
      "HTTP caching headers tell browsers how long to cache a response before requesting it again.",
      "Server-side caching with Redis reduced database load by 70%.",
      "Aggressive caching of static assets is safe because file names include a content hash.",
      "Cache busting appends a version number to URLs to force browsers to download updated files."
    ]
  },

  /* ================================================
   * AI & MACHINE LEARNING  (20 words)
   * ================================================ */
  {
    id: "machine-learning",
    word: "machine learning",
    category: "ai-ml",
    partOfSpeech: "noun",
    phonetic: "/məˈʃiːn ˈlɜːrnɪŋ/",
    definition: "A subset of AI where systems learn from data to improve their performance without being explicitly programmed.",
    exampleSentences: [
      "Machine learning algorithms detect fraudulent transactions by learning from historical patterns.",
      "The recommendation engine uses machine learning to personalize content for each user.",
      "Machine learning requires large, high-quality datasets to produce reliable models.",
      "Software engineers are increasingly expected to understand basic machine learning concepts."
    ]
  },
  {
    id: "deep-learning",
    word: "deep learning",
    category: "ai-ml",
    partOfSpeech: "noun",
    phonetic: "/diːp ˈlɜːrnɪŋ/",
    definition: "A machine learning technique using multi-layered neural networks to learn representations from large amounts of data.",
    exampleSentences: [
      "Deep learning enabled major breakthroughs in image recognition and speech processing.",
      "Training deep learning models requires significant GPU compute resources.",
      "Deep learning models for natural language processing have transformed the AI industry.",
      "Self-driving car perception systems rely on deep learning for object detection."
    ]
  },
  {
    id: "neural-network",
    word: "neural network",
    category: "ai-ml",
    partOfSpeech: "noun",
    phonetic: "/ˈnjʊərəl ˈnɛtwɜːrk/",
    definition: "A computational model loosely inspired by the human brain, consisting of interconnected layers of nodes that process data.",
    exampleSentences: [
      "The neural network learned to classify handwritten digits with 99% accuracy.",
      "Adding more layers to a neural network creates a deeper, more powerful model.",
      "Convolutional neural networks are specialized for processing image data.",
      "Training a neural network involves adjusting millions of parameters to minimize prediction error."
    ]
  },
  {
    id: "training",
    word: "training",
    category: "ai-ml",
    partOfSpeech: "noun",
    phonetic: "/ˈtreɪnɪŋ/",
    definition: "The process of feeding data to a machine learning model and adjusting its parameters to minimize prediction errors.",
    exampleSentences: [
      "Training the image classification model took 48 hours on a cluster of 8 GPUs.",
      "More training data generally leads to better model performance.",
      "The model was training on a dataset of 10 million labeled customer reviews.",
      "Overfitting occurs when a model trains too well on training data and fails to generalize."
    ]
  },
  {
    id: "inference",
    word: "inference",
    category: "ai-ml",
    partOfSpeech: "noun",
    phonetic: "/ˈɪnfərəns/",
    definition: "Using a trained machine learning model to make predictions on new, unseen data.",
    exampleSentences: [
      "The inference API processes thousands of prediction requests per second in production.",
      "Inference latency must be under 50ms for real-time recommendation use cases.",
      "Quantizing a model reduces its size and speeds up inference without much accuracy loss.",
      "Running inference at the edge avoids sending sensitive data to a central server."
    ]
  },
  {
    id: "model",
    word: "model",
    category: "ai-ml",
    partOfSpeech: "noun",
    phonetic: "/ˈmɒdəl/",
    definition: "A mathematical representation learned from data that can make predictions or decisions on new inputs.",
    exampleSentences: [
      "The team trained a model to classify support tickets by urgency.",
      "Deploying the model to production required setting up a serving infrastructure.",
      "The model achieved 94% accuracy on the test dataset.",
      "Regular model retraining ensures it adapts to changing data distributions over time."
    ]
  },
  {
    id: "dataset",
    word: "dataset",
    category: "ai-ml",
    partOfSpeech: "noun",
    phonetic: "/ˈdeɪtəsɛt/",
    definition: "A structured collection of data used for training, validating, or testing a machine learning model.",
    exampleSentences: [
      "The dataset contains 100,000 labeled images for training the classification model.",
      "Data quality is critical — a biased dataset produces a biased model.",
      "The team split the dataset into 80% training, 10% validation, and 10% test sets.",
      "Augmenting the dataset with synthetic data improved model performance significantly."
    ]
  },
  {
    id: "overfitting",
    word: "overfitting",
    category: "ai-ml",
    partOfSpeech: "noun",
    phonetic: "/ˌoʊvərˈfɪtɪŋ/",
    definition: "When a model learns the training data too precisely, including its noise, and fails to generalize to new examples.",
    exampleSentences: [
      "The model showed overfitting when its training accuracy was 99% but test accuracy was 70%.",
      "Regularization techniques like dropout reduce overfitting in neural networks.",
      "Collecting more training data is one of the most effective ways to prevent overfitting.",
      "Overfitting is detected by comparing performance on the training set versus a held-out validation set."
    ]
  },
  {
    id: "gradient-descent",
    word: "gradient descent",
    category: "ai-ml",
    partOfSpeech: "noun",
    phonetic: "/ˈɡreɪdiənt dɪˈsɛnt/",
    definition: "An optimization algorithm used to minimize a model's loss function by iteratively adjusting its parameters in the direction of steepest descent.",
    exampleSentences: [
      "Gradient descent is the core optimization algorithm behind most machine learning models.",
      "Stochastic gradient descent processes one training example at a time, making it faster.",
      "The learning rate controls how large the steps are during gradient descent.",
      "Adaptive optimizers like Adam adjust the learning rate automatically during training."
    ]
  },
  {
    id: "nlp",
    word: "NLP",
    category: "ai-ml",
    partOfSpeech: "noun",
    phonetic: "/ɛn ɛl piː/",
    definition: "Natural Language Processing — a field of AI focused on enabling computers to understand, interpret, and generate human language.",
    exampleSentences: [
      "NLP powers chatbots, translation services, and sentiment analysis systems.",
      "The NLP model extracts key information from unstructured medical notes.",
      "Tokenization is a fundamental NLP step that splits text into words or subwords.",
      "Advances in NLP led to breakthrough applications like GPT and language translation APIs."
    ]
  },
  {
    id: "llm",
    word: "LLM",
    category: "ai-ml",
    partOfSpeech: "noun",
    phonetic: "/ɛl ɛl ɛm/",
    definition: "Large Language Model — a deep learning model trained on massive text corpora capable of generating and understanding human language.",
    exampleSentences: [
      "GPT-4 is an LLM that can write code, summarize documents, and answer questions.",
      "Developers use LLM APIs to add AI-powered features to their applications.",
      "Running an LLM requires significant compute resources due to its billions of parameters.",
      "Fine-tuning an LLM on domain-specific data improves its performance for specialized tasks."
    ]
  },
  {
    id: "fine-tuning",
    word: "fine-tuning",
    category: "ai-ml",
    partOfSpeech: "noun",
    phonetic: "/ˈfaɪn tjuːnɪŋ/",
    definition: "The process of further training a pre-trained model on a specific dataset to adapt it to a particular task or domain.",
    exampleSentences: [
      "The company fine-tuned a general LLM on its support tickets to create a domain-specific chatbot.",
      "Fine-tuning requires significantly less data and compute than training from scratch.",
      "Fine-tuning a pre-trained image model on medical scans achieved high accuracy with a small dataset.",
      "LoRA is a parameter-efficient fine-tuning technique that modifies only a small subset of weights."
    ]
  },
  {
    id: "computer-vision",
    word: "computer vision",
    category: "ai-ml",
    partOfSpeech: "noun",
    phonetic: "/kəmˈpjuːtər ˈvɪʒən/",
    definition: "A field of AI that trains computers to interpret and understand visual information from images and videos.",
    exampleSentences: [
      "Computer vision algorithms detect defects on the assembly line in real time.",
      "Self-driving cars rely on computer vision to identify pedestrians and traffic signs.",
      "Face recognition is a computer vision application with significant privacy implications.",
      "Transfer learning allows applying a computer vision model trained on ImageNet to custom datasets."
    ]
  },
  {
    id: "transformer",
    word: "transformer",
    category: "ai-ml",
    partOfSpeech: "noun",
    phonetic: "/trænsˈfɔːrmər/",
    definition: "A neural network architecture that uses self-attention mechanisms, forming the foundation of modern NLP models like GPT and BERT.",
    exampleSentences: [
      "The transformer architecture revolutionized NLP when it was introduced in 2017.",
      "GPT models are built on the transformer architecture with billions of parameters.",
      "The transformer's self-attention mechanism allows it to relate words across long distances in a sentence.",
      "Vision Transformers (ViT) apply the transformer architecture to image classification tasks."
    ]
  },
  {
    id: "prompt",
    word: "prompt",
    category: "ai-ml",
    partOfSpeech: "noun",
    phonetic: "/prɒmpt/",
    definition: "The input text or instruction given to a language model to elicit a desired response.",
    exampleSentences: [
      "Writing an effective prompt is a skill known as prompt engineering.",
      "The prompt was refined several times before the model produced accurate summaries.",
      "System prompts define the model's persona and instructions for a chat application.",
      "Few-shot prompts include examples to guide the model toward the desired output format."
    ]
  },
  {
    id: "feature",
    word: "feature",
    category: "ai-ml",
    partOfSpeech: "noun",
    phonetic: "/ˈfiːtʃər/",
    definition: "An individual measurable property or characteristic of the data used as input to a machine learning model.",
    exampleSentences: [
      "Feature engineering — selecting and transforming input variables — is crucial for model performance.",
      "The fraud detection model uses transaction amount, time, and location as features.",
      "Highly correlated features can be dropped to simplify the model without losing accuracy.",
      "Feature importance scores show which inputs have the greatest influence on the model's predictions."
    ]
  },
  {
    id: "accuracy",
    word: "accuracy",
    category: "ai-ml",
    partOfSpeech: "noun",
    phonetic: "/ˈækjərəsi/",
    definition: "The proportion of correct predictions made by a model out of all predictions, used to evaluate its performance.",
    exampleSentences: [
      "The spam classifier achieved 98% accuracy on the held-out test dataset.",
      "Accuracy alone can be misleading on imbalanced datasets — precision and recall matter too.",
      "The model's accuracy dropped when it was tested on data from a different distribution.",
      "Improving accuracy from 95% to 99% required three times more training data."
    ]
  },
  {
    id: "embedding",
    word: "embedding",
    category: "ai-ml",
    partOfSpeech: "noun",
    phonetic: "/ɪmˈbɛdɪŋ/",
    definition: "A dense numerical vector representation of data (like words or images) that captures semantic meaning for use in machine learning models.",
    exampleSentences: [
      "Word embeddings represent words as vectors so similar words are close together in vector space.",
      "The search engine uses embeddings to find semantically similar documents.",
      "Sentence embeddings allow comparing the meaning of two texts mathematically.",
      "Pre-trained embeddings from models like BERT are reused to save training time."
    ]
  },
  {
    id: "api-key",
    word: "API key",
    category: "ai-ml",
    partOfSpeech: "noun",
    phonetic: "/ˈeɪpiːaɪ kiː/",
    definition: "A unique identifier used to authenticate requests to an API, allowing usage tracking and access control.",
    exampleSentences: [
      "The LLM API requires an API key to authenticate requests and track usage costs.",
      "API keys must be kept secret and never committed to a public repository.",
      "Rotating API keys regularly limits the damage if one is accidentally exposed.",
      "The team uses environment variables to store API keys instead of hardcoding them."
    ]
  },
  {
    id: "hallucination",
    word: "hallucination",
    category: "ai-ml",
    partOfSpeech: "noun",
    phonetic: "/həˌluːsɪˈneɪʃən/",
    definition: "When a language model generates confident-sounding but factually incorrect or fabricated information.",
    exampleSentences: [
      "The LLM's hallucination produced a plausible but entirely fictional citation.",
      "Retrieval-augmented generation reduces hallucination by grounding responses in real documents.",
      "Developers must validate LLM outputs in critical applications to catch hallucinations.",
      "Hallucination is a fundamental challenge for language models used in high-stakes domains like medicine."
    ]
  },

  /* ================================================
   * OS & SYSTEMS  (15 words)
   * ================================================ */
  {
    id: "kernel",
    word: "kernel",
    category: "os-systems",
    partOfSpeech: "noun",
    phonetic: "/ˈkɜːrnəl/",
    definition: "The core component of an operating system that manages hardware resources and provides services to applications.",
    exampleSentences: [
      "The Linux kernel handles memory allocation, process scheduling, and hardware communication.",
      "A kernel panic is a fatal error that forces the OS to halt to prevent damage.",
      "Kernel updates often include critical security patches that should be applied promptly.",
      "Containerization uses Linux kernel features like namespaces and cgroups for isolation."
    ]
  },
  {
    id: "process",
    word: "process",
    category: "os-systems",
    partOfSpeech: "noun",
    phonetic: "/ˈprɒsɛs/",
    definition: "An instance of a program currently running in the operating system, with its own memory space and system resources.",
    exampleSentences: [
      "Each web server worker runs as a separate process to isolate failures.",
      "The task manager shows all running processes and their CPU and memory usage.",
      "Zombie processes occur when a child process finishes but the parent hasn't read its exit status.",
      "Inter-process communication allows processes to exchange data using pipes or sockets."
    ]
  },
  {
    id: "thread",
    word: "thread",
    category: "os-systems",
    partOfSpeech: "noun",
    phonetic: "/θrɛd/",
    definition: "The smallest unit of execution within a process; multiple threads share the same memory space and run concurrently.",
    exampleSentences: [
      "Web servers use thread pools to handle multiple requests concurrently.",
      "A race condition occurs when two threads access shared data without proper synchronization.",
      "Node.js uses a single thread with an event loop to handle concurrent I/O operations.",
      "The database connection pool uses a separate thread for each active connection."
    ]
  },
  {
    id: "memory",
    word: "memory",
    category: "os-systems",
    partOfSpeech: "noun",
    phonetic: "/ˈmɛməri/",
    definition: "RAM (Random Access Memory) — the fast, volatile storage used by the OS to hold running programs and their data.",
    exampleSentences: [
      "The application crashed with an out-of-memory error after processing a large file.",
      "Memory leaks cause an application's memory usage to grow until it is killed by the OS.",
      "Profiling tools help developers identify which parts of the code consume excessive memory.",
      "Kubernetes evicts pods when the node is running low on memory."
    ]
  },
  {
    id: "filesystem",
    word: "filesystem",
    category: "os-systems",
    partOfSpeech: "noun",
    phonetic: "/ˈfaɪlsɪstəm/",
    definition: "The method and data structures used by an operating system to organize and store files on a storage device.",
    exampleSentences: [
      "Linux uses the ext4 filesystem by default for most installations.",
      "Container volumes mount a host filesystem path into the container's filesystem.",
      "Filesystem permissions control which users can read, write, or execute each file.",
      "A full filesystem causes applications to fail when they try to write new data."
    ]
  },
  {
    id: "shell",
    word: "shell",
    category: "os-systems",
    partOfSpeech: "noun",
    phonetic: "/ʃɛl/",
    definition: "A command-line interface that allows users to interact with the operating system by typing commands.",
    exampleSentences: [
      "Bash is the default shell on most Linux distributions.",
      "Shell scripts automate repetitive tasks like backups and log rotation.",
      "DevOps engineers spend much of their time in the shell managing servers.",
      "Zsh with plugins provides autocomplete and syntax highlighting to improve shell productivity."
    ]
  },
  {
    id: "environment-variable",
    word: "environment variable",
    category: "os-systems",
    partOfSpeech: "noun",
    phonetic: "/ɪnˈvaɪrənmənt ˈvɛəriəbl/",
    definition: "A dynamic named value stored in the OS environment that can be accessed by programs to control configuration.",
    exampleSentences: [
      "Database credentials are stored in environment variables instead of hardcoded in source code.",
      "Docker Compose uses environment variables to pass configuration to containers.",
      "The CI/CD pipeline sets environment variables to differentiate staging and production deployments.",
      "Using a .env file to manage environment variables keeps secrets out of version control."
    ]
  },
  {
    id: "daemon",
    word: "daemon",
    category: "os-systems",
    partOfSpeech: "noun",
    phonetic: "/ˈdiːmən/",
    definition: "A background process that runs continuously, performing system tasks like serving requests or monitoring.",
    exampleSentences: [
      "The nginx daemon runs in the background, serving web requests around the clock.",
      "Systemd manages daemons and can automatically restart them if they crash.",
      "The Docker daemon must be running for the docker command to work.",
      "Monitoring daemons collect metrics and send them to a central monitoring platform."
    ]
  },
  {
    id: "cron",
    word: "cron",
    category: "os-systems",
    partOfSpeech: "noun",
    phonetic: "/krɒn/",
    definition: "A Unix-based job scheduler that runs commands or scripts automatically at specified times or intervals.",
    exampleSentences: [
      "A cron job runs the database backup script every night at 2 AM.",
      "The cron expression '0 9 * * 1' runs a job at 9 AM every Monday.",
      "Kubernetes CronJobs use the same scheduling syntax as Unix cron.",
      "Missed cron jobs can cause data processing delays if the system was offline."
    ]
  },
  {
    id: "pipe",
    word: "pipe",
    category: "os-systems",
    partOfSpeech: "noun",
    phonetic: "/paɪp/",
    definition: "A Unix mechanism that connects the output of one command to the input of another, enabling powerful command chaining.",
    exampleSentences: [
      "The command 'cat log.txt | grep ERROR | wc -l' counts all error lines using pipes.",
      "Unix pipes are a fundamental tool for composing complex operations from simple commands.",
      "Named pipes allow different processes to communicate by writing and reading from a file-like channel.",
      "Piping output through 'less' makes it easy to scroll through long command output."
    ]
  },
  {
    id: "syscall",
    word: "syscall",
    category: "os-systems",
    partOfSpeech: "noun",
    phonetic: "/ˈsɪskɔːl/",
    definition: "System call — the mechanism by which a program requests a service from the operating system kernel.",
    exampleSentences: [
      "Reading a file requires a syscall that transfers control from user space to the kernel.",
      "The strace tool shows every syscall made by a process, useful for performance debugging.",
      "Seccomp filters restrict which syscalls a containerized process is allowed to make.",
      "Excessive syscalls can become a performance bottleneck in high-throughput applications."
    ]
  },
  {
    id: "swap",
    word: "swap",
    category: "os-systems",
    partOfSpeech: "noun",
    phonetic: "/swɒp/",
    definition: "A space on disk used as an extension of RAM when physical memory is exhausted, though much slower.",
    exampleSentences: [
      "The server started using swap when the application's memory usage exceeded 8 GB.",
      "Heavy swap usage causes severe performance degradation due to disk I/O latency.",
      "Cloud VMs often have swap disabled; applications must stay within their memory allocation.",
      "Monitoring swap usage helps detect memory leaks before they cause application crashes."
    ]
  },
  {
    id: "inode",
    word: "inode",
    category: "os-systems",
    partOfSpeech: "noun",
    phonetic: "/ˈaɪnoʊd/",
    definition: "A data structure in a filesystem that stores metadata about a file or directory, including permissions and location on disk.",
    exampleSentences: [
      "Each file occupies one inode, and running out of inodes prevents creating new files even with free disk space.",
      "The inode stores file metadata like ownership, permissions, and timestamps.",
      "Hard links point multiple directory entries to the same inode without duplicating data.",
      "Checking inode usage with 'df -i' is important on servers handling millions of small files."
    ]
  },
  {
    id: "stdin-stdout",
    word: "stdin/stdout",
    category: "os-systems",
    partOfSpeech: "noun",
    phonetic: "/ˈstændɪn ˈstændaʊt/",
    definition: "Standard input (stdin) and standard output (stdout) — the default streams for reading input from and writing output to the terminal.",
    exampleSentences: [
      "Reading from stdin allows a script to accept piped input from another command.",
      "Writing to stdout is how most CLI tools return their results.",
      "Redirecting stdout to a file with '>' captures command output for later analysis.",
      "Docker containers log to stdout/stderr so the orchestration layer can collect logs."
    ]
  },
  {
    id: "virtualization",
    word: "virtualization",
    category: "os-systems",
    partOfSpeech: "noun",
    phonetic: "/ˌvɜːrtʃuəlaɪˈzeɪʃən/",
    definition: "Technology that creates virtual instances of hardware or software resources, allowing multiple environments on a single physical machine.",
    exampleSentences: [
      "Virtualization allows one physical server to run dozens of independent virtual machines.",
      "Cloud computing is built on virtualization technology managed at massive scale.",
      "Type 1 hypervisors run directly on hardware, while Type 2 run on top of an OS.",
      "Containerization is more lightweight than full virtualization because it shares the host kernel."
    ]
  }

];

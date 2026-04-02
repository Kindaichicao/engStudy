/**
 * LESSONS — category-based lessons referencing word IDs in vocabulary.js.
 * Word data is NOT stored here; it lives in VOCABULARY.
 * Requires: vocabulary.js loaded first.
 */
const LESSONS = [
  {
    id: "networking-basics",
    title: "Networking Basics",
    description: "Core vocabulary for understanding computer networks, internet protocols, and network infrastructure.",
    level: "beginner",
    estimatedMinutes: 30,
    wordIds: [
      "bandwidth", "latency", "protocol", "router", "firewall",
      "dns", "ip-address", "packet", "http", "server",
      "client", "port", "gateway", "subnet", "vpn",
      "tcp", "udp", "nat", "proxy", "mac-address",
      "dhcp", "icmp", "arp", "lan", "wan",
      "ethernet", "switch-network", "multicast", "traceroute", "ping",
      "socket", "hostname", "dns-record", "network-interface", "bandwidth-throttling"
    ]
  },
  {
    id: "software-development",
    title: "Software Development",
    description: "Essential vocabulary for professional software engineers — version control, APIs, and development practices.",
    level: "intermediate",
    estimatedMinutes: 30,
    wordIds: [
      "repository", "commit", "branch", "merge", "api",
      "endpoint", "refactoring", "debugging", "deployment", "dependency",
      "unit-test", "framework", "runtime", "compile", "abstraction",
      "design-pattern", "technical-debt", "agile", "sprint", "code-review",
      "ide", "version-control", "pull-request", "sdk", "library",
      "algorithm", "data-structure", "recursion", "inheritance", "polymorphism"
    ]
  },
  {
    id: "cloud-infrastructure",
    title: "Cloud & Infrastructure",
    description: "Advanced vocabulary for cloud computing, DevOps, container orchestration, and infrastructure management.",
    level: "advanced",
    estimatedMinutes: 30,
    wordIds: [
      "containerization", "orchestration", "microservice", "load-balancer", "auto-scaling",
      "cdn", "sla", "throughput", "redundancy", "failover",
      "provisioning", "kubernetes", "cluster", "ci-cd", "iac",
      "docker", "monitoring", "logging", "terraform", "helm",
      "serverless", "artifact", "pipeline", "rollback", "blue-green-deployment",
      "canary-deployment", "service-mesh", "ingress", "pod", "registry"
    ]
  },
  {
    id: "databases",
    title: "Databases",
    description: "Key terms for working with relational and NoSQL databases, query optimization, and data modeling.",
    level: "intermediate",
    estimatedMinutes: 30,
    wordIds: [
      "database", "sql", "nosql", "query", "schema",
      "index", "transaction", "primary-key", "foreign-key", "join",
      "migration", "orm", "replication", "sharding", "connection-pool",
      "normalization", "stored-procedure", "cache", "acid", "backup",
      "cursor-db", "view-db", "trigger", "deadlock", "partitioning",
      "materialized-view", "full-text-search", "data-integrity", "denormalization", "write-ahead-log"
    ]
  },
  {
    id: "security",
    title: "Cybersecurity",
    description: "Essential security vocabulary covering authentication, encryption, common attacks, and defense techniques.",
    level: "intermediate",
    estimatedMinutes: 30,
    wordIds: [
      "authentication", "authorization", "encryption", "hashing", "ssl-tls",
      "xss", "sql-injection", "ddos", "vulnerability", "oauth",
      "jwt", "penetration-testing", "certificate", "two-factor-auth", "zero-trust",
      "sanitization", "access-control", "audit-log", "csrf", "brute-force",
      "phishing", "malware", "ransomware", "intrusion-detection", "siem",
      "key-management", "security-patch", "threat-model", "data-breach", "compliance"
    ]
  },
  {
    id: "web-development",
    title: "Web Development",
    description: "Frontend and backend web development vocabulary covering APIs, browser technology, and web performance.",
    level: "beginner",
    estimatedMinutes: 30,
    wordIds: [
      "dom", "rest", "graphql", "webhook", "cors",
      "session", "cookie", "spa", "ssr", "websocket",
      "responsive-design", "minification", "bundler", "pwa", "ajax",
      "api-rate-limit", "load-time", "middleware", "caching", "cdn-web",
      "html", "css", "javascript", "typescript", "component",
      "state-management", "routing-web", "seo", "lazy-loading", "hydration"
    ]
  },
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    description: "Modern AI and ML vocabulary for software engineers working with models, data, and intelligent systems.",
    level: "advanced",
    estimatedMinutes: 30,
    wordIds: [
      "machine-learning", "deep-learning", "neural-network", "training", "inference",
      "model", "dataset", "overfitting", "gradient-descent", "nlp",
      "llm", "fine-tuning", "computer-vision", "transformer", "prompt",
      "feature", "accuracy", "embedding", "api-key", "hallucination",
      "reinforcement-learning", "supervised-learning", "unsupervised-learning", "classification", "regression-ml",
      "clustering", "tokenization", "attention-mechanism", "generative-ai", "rag"
    ]
  },
  {
    id: "os-systems",
    title: "OS & Systems",
    description: "Operating system and systems programming vocabulary every backend developer should know.",
    level: "intermediate",
    estimatedMinutes: 25,
    wordIds: [
      "kernel", "process", "thread", "memory", "filesystem",
      "shell", "environment-variable", "daemon", "cron", "pipe",
      "syscall", "swap", "inode", "stdin-stdout", "virtualization",
      "cpu", "gpu", "ram", "disk-io", "boot",
      "permission", "symlink", "signal", "mutex", "semaphore"
    ]
  },

  /* ─── New categories ─────────────────────────────────────────── */

  {
    id: "project-management",
    title: "Project Management",
    description: "Agile, Scrum, and project management vocabulary used daily in IT teams for planning, tracking, and delivering software.",
    level: "beginner",
    estimatedMinutes: 35,
    wordIds: [
      "stakeholder", "milestone", "roadmap", "backlog", "kanban",
      "scrum", "retrospective", "velocity", "epic", "user-story",
      "acceptance-criteria", "burndown-chart", "capacity", "deliverable", "estimate",
      "priority", "scope", "timeline", "risk", "blocker",
      "release", "feature-flag", "mvp", "requirement", "specification",
      "standup", "sprint-review", "story-point", "definition-of-done", "product-owner",
      "scrum-master", "sprint-planning", "iteration", "changelog", "hotfix",
      "patch", "versioning", "rollout", "go-live", "sign-off",
      "technical-spec", "feasibility", "resource-allocation", "bottleneck", "tradeoff",
      "escalation", "kickoff", "dependency-mgmt", "okr", "kpi"
    ]
  },
  {
    id: "workplace",
    title: "IT Workplace & Communication",
    description: "Common English words and phrases used every day in IT companies for meetings, collaboration, and team communication.",
    level: "beginner",
    estimatedMinutes: 35,
    wordIds: [
      "sync", "alignment", "leverage", "iterate", "pivot",
      "deadline", "feedback", "follow-up", "ownership", "accountability",
      "proactive", "collaborate", "brainstorm", "onboarding", "offboarding",
      "handoff", "workaround", "touch-base", "heads-up", "action-item",
      "takeaway", "pain-point", "use-case", "edge-case", "proof-of-concept",
      "best-practice", "lessons-learned", "knowledge-base", "documentation", "demo",
      "presentation", "proposal", "approval", "cross-functional", "remote-work",
      "pair-programming", "mentoring", "performance-review", "tech-lead", "full-stack",
      "backend", "frontend", "open-source", "legacy-code", "boilerplate",
      "codebase", "downtime", "uptime", "outage", "incident",
      "postmortem", "runbook", "on-call", "sre", "bandwidth-work"
    ]
  },
  {
    id: "ui-ux",
    title: "UI/UX Design",
    description: "User interface and user experience vocabulary for developers and designers building modern digital products.",
    level: "intermediate",
    estimatedMinutes: 30,
    wordIds: [
      "wireframe", "mockup", "prototype", "user-flow", "persona",
      "accessibility", "usability", "interaction-design", "information-architecture", "a-b-testing",
      "user-research", "design-system", "style-guide", "color-palette", "typography",
      "whitespace", "grid-layout", "breakpoint", "animation", "transition",
      "hover-state", "modal", "breadcrumb", "pagination", "infinite-scroll",
      "skeleton-screen", "dark-mode", "theme", "icon", "dropdown",
      "carousel", "card-ui", "navigation", "sidebar", "header-ui",
      "footer", "call-to-action", "tooltip-ui", "toast-notification", "progress-bar"
    ]
  },
  {
    id: "testing-qa",
    title: "Testing & Quality Assurance",
    description: "Comprehensive testing vocabulary — from unit tests to performance testing, QA processes, and CI/CD testing strategies.",
    level: "intermediate",
    estimatedMinutes: 30,
    wordIds: [
      "regression-test", "smoke-test", "integration-test", "e2e-test", "test-coverage",
      "assertion", "mock-object", "stub", "test-fixture", "test-suite",
      "test-case", "tdd", "bdd", "load-testing", "stress-testing",
      "performance-testing", "manual-testing", "automated-testing", "test-environment", "staging",
      "production", "sandbox", "bug", "bug-report", "severity",
      "reproducibility", "flaky-test", "snapshot-test", "code-coverage", "continuous-testing",
      "acceptance-test", "boundary-testing", "test-pyramid", "quality-assurance", "test-automation",
      "test-data", "test-plan", "test-report", "exploratory-testing", "canary-testing"
    ]
  },
  {
    id: "data-analytics",
    title: "Data & Analytics",
    description: "Data engineering and analytics vocabulary for building dashboards, pipelines, and data-driven products.",
    level: "advanced",
    estimatedMinutes: 30,
    wordIds: [
      "dashboard", "metric", "visualization", "etl", "data-warehouse",
      "data-lake", "data-pipeline", "bi", "report", "aggregation",
      "real-time-analytics", "batch-processing", "stream-processing", "data-modeling", "data-quality",
      "data-governance", "data-catalog", "anomaly-detection", "time-series", "cohort-analysis",
      "funnel-analysis", "retention", "churn", "conversion-rate", "segmentation",
      "attribution", "event-tracking", "session-analytics", "heatmap", "clickstream",
      "data-enrichment", "big-data", "data-cleansing", "olap", "data-mart"
    ]
  },
  {
    id: "mobile-dev",
    title: "Mobile Development",
    description: "Mobile app development vocabulary covering native, hybrid, and cross-platform approaches for iOS and Android.",
    level: "intermediate",
    estimatedMinutes: 25,
    wordIds: [
      "native-app", "hybrid-app", "cross-platform", "mobile-sdk", "push-notification",
      "deep-link", "app-store", "gesture", "touch-event", "offline-mode",
      "local-storage", "biometric-auth", "geolocation", "screen-size", "orientation",
      "splash-screen", "app-lifecycle", "background-process", "crash-reporting", "in-app-purchase",
      "app-performance", "webview", "responsive-layout", "notification-channel", "app-bundle",
      "hot-reload", "widget", "permissions-mobile", "battery-optimization", "release-channel"
    ]
  }
];

/**
 * Hydrate a lesson: attach full word objects from VOCABULARY.
 * Call this whenever you need lesson.words to be populated.
 */
function hydrateLesson(lesson) {
  if (lesson.words) return lesson; // already hydrated (e.g., daily lesson)
  return {
    ...lesson,
    words: lesson.wordIds.map(id => VOCABULARY.find(w => w.id === id)).filter(Boolean)
  };
}

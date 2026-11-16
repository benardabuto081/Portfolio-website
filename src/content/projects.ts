/**
 * Project content. Every claim about implementation status here is drawn from
 * the brief or from the project's own repository documentation. When a
 * project changes, update its `components` and `currentState` first.
 */

export type ImplementationState =
  | "implemented"
  | "partial"
  | "in-progress"
  | "planned"
  | "not-started";

export type ProjectComponent = {
  name: string;
  detail: string;
  /** Omit for entries without an implementation status, e.g. company teams. */
  state?: ImplementationState;
  /** Overrides the default label for the state, e.g. "Not in live path". */
  stateLabel?: string;
};

export type ProjectVisualKind = "sauti" | "scribe" | "rentra" | "quelea";

export type ProjectHeading =
  | "question"
  | "approach"
  | "components"
  | "contribution"
  | "decisions"
  | "currentState"
  | "nextQuestions";

export type Project = {
  slug: string;
  title: string;
  category: string;
  status: string;
  summary: string;
  description: string[];
  cta: string;
  visual: ProjectVisualKind;
  /** Primary external link. `short` is the visible text on the homepage. */
  source: { label: string; href: string; short?: string };
  /** Additional external links shown in the project page's metadata panel. */
  links?: { label: string; href: string }[];
  /** Plain list of technologies or data sources — shown as text, not badges. */
  stack: string[];
  stackLabel?: string;
  /** Overrides for the default section headings on the project page. */
  headings?: Partial<Record<ProjectHeading, string>>;
  question: string[];
  approach: string[];
  components: ProjectComponent[];
  contribution: string[];
  decisions: { title: string; body: string }[];
  currentState: { summary: string; notes: string[] };
  nextQuestions: string[];
};

export const projects: Project[] = [
  {
    slug: "sauti-labs",
    title: "Sauti Labs",
    category: "African Speech & Language AI",
    status: "Research & Products Company",
    summary:
      "An AI research and products company building the models and technologies that let machines understand and generate speech across Africa’s linguistic diversity.",
    description: [
      "Sauti Labs is an African-language AI company. It develops the research, technologies, infrastructure, and products that enable AI to understand, generate, and communicate across African languages — from speech recognition and speech synthesis to multilingual language modelling and voice AI.",
      "I founded the company and lead it as CEO and Chief Research Officer. I set its research agenda and long-term direction, working alongside a leadership team that covers operations, technology, machine learning, and legal and responsible-AI governance.",
    ],
    cta: "Explore Sauti Labs",
    visual: "sauti",
    source: { label: "Sauti Labs website", href: "https://sautilabs.co.ke", short: "sautilabs.co.ke" },
    links: [
      { label: "Sauti Labs on GitHub", href: "https://github.com/Sauti-Labs" },
      { label: "Sauti Labs on LinkedIn", href: "https://www.linkedin.com/company/sauti-labs" },
    ],
    stack: ["Speech Intelligence", "Language Intelligence", "Language Resources", "Model Intelligence", "Responsible AI"],
    stackLabel: "Research teams",
    headings: {
      question: "Why Sauti Labs exists",
      approach: "How the company works",
      components: "Research teams and product",
      contribution: "My role",
      decisions: "Principles we work by",
      currentState: "Where the company is now",
      nextQuestions: "Questions we are working on",
    },
    question: [
      "AI is changing how people communicate with technology, but the quality of that experience still depends heavily on the language a person speaks. Across many African languages, the technology needed to make speech and language AI feel natural, work reliably, and stay accessible is not where it needs to be.",
      "Closing that gap takes more than a research breakthrough or a new model. It takes representative data, rigorous research, reliable engineering, linguistic knowledge, and products designed around the people who use them. Sauti Labs was founded to do that work end to end.",
    ],
    approach: [
      "The company deliberately spans the boundary between research and product. The quality of a speech system depends on the data behind it, the models that power it, the engineering that makes it reliable, and the experience it delivers. Progress in one of those means little if it never reaches the others.",
      "Research is organised into five teams — Speech Intelligence, Language Intelligence, Language Resources, Model Intelligence, and Responsible AI — whose work feeds the technology and infrastructure behind Sauti’s products. The first of those products, Sauti Cloud, brings speech recognition, speech generation, and voice AI together for developers and organisations.",
    ],
    components: [
      {
        name: "Speech Intelligence",
        detail: "Speech recognition, speech synthesis, multilingual and cross-lingual speech modelling, and robustness across speakers, accents, and real recording conditions.",
      },
      {
        name: "Language Intelligence",
        detail: "Multilingual language understanding, text generation and adaptation, and evaluation and benchmarking for African languages.",
      },
      {
        name: "Language Resources",
        detail: "Speech, text, and translation datasets; corpus engineering, validation, annotation, and documentation of provenance, licensing, and versions.",
      },
      {
        name: "Model Intelligence",
        detail: "Training and adapting models that learn from limited data, evaluating where they fail, and making them efficient enough to deploy under real constraints.",
      },
      {
        name: "Responsible AI",
        detail: "Safety, fairness, privacy, robustness, and misuse prevention — including the specific risks of speech synthesis and voice cloning.",
      },
      {
        name: "Sauti Cloud",
        detail: "African speech and language AI for developers and organisations: speech recognition, speech generation, and voice AI.",
        state: "in-progress",
        stateLabel: "Early access",
      },
    ],
    contribution: [
      "As founder, CEO, and Chief Research Officer, I direct Sauti Labs’ research agenda, strategy, and long-term development, and I am responsible for how research priorities translate into technology and product.",
      "My own technical work centres on machine learning research and AI systems engineering for speech and language: the models, datasets, and systems needed to develop, optimise, and deploy language technology across Africa’s linguistic landscape. I work closely with the technology and machine learning leads on how research results become reliable, deployable systems.",
    ],
    decisions: [
      {
        title: "Research and product, together",
        body: "We pursue research to overcome technical limits, develop the technology to address them, and engineer that into products designed around people’s needs. Keeping these in one company keeps each honest about the others.",
      },
      {
        title: "Language resources are infrastructure",
        body: "Speech and text data carry voices, personal information, and cultural knowledge. Every resource stays connected to its origin, licence, version, and permitted use, so the models built on it remain traceable.",
      },
      {
        title: "Say what has been demonstrated",
        body: "We distinguish demonstrated capabilities from research objectives and unverified assumptions, and avoid presenting a model or result as more capable than the evidence supports.",
      },
      {
        title: "Plan for misuse, not just use",
        body: "Speech synthesis and voice cloning enable impersonation and deception as easily as accessibility. Foreseeable misuse is part of how we assess a technology before it ships, not after.",
      },
      {
        title: "Work that can be reviewed and reproduced",
        body: "Documentation, appropriate testing, and reviewable contributions are expected across research and engineering, so that results can be checked by someone other than the person who produced them.",
      },
    ],
    currentState: {
      summary:
        "Sauti Labs has an established leadership team and five research teams, and its first product, Sauti Cloud, is in development with an early-access waitlist open to developers, researchers, and organisations.",
      notes: [
        "Sauti Cloud is not yet generally available; early-access sign-ups are taken through the Sauti Labs website.",
        "The company is open to contributors across machine learning research, AI systems engineering, African language resources, product and design, and responsible AI.",
      ],
    },
    nextQuestions: [
      "What does an honest evaluation set look like for African-language speech when recordings are scarce and unevenly spread across speakers, dialects, and domains?",
      "How far can cross-lingual transfer carry speech models into languages with very little training data, and where does it break down?",
      "What is the right trade-off between model capability, latency, and compute cost for speech systems that must run under practical resource constraints?",
      "Which safeguards make expressive speech synthesis useful without making impersonation easy?",
    ],
  },
  {
    slug: "scribe-ai",
    title: "Scribe AI",
    category: "AI Systems & Offline-First Applications",
    status: "Active Engineering",
    summary:
      "An offline-first church production system combining a local speech-intelligence prototype with a separately developed desktop application architecture.",
    description: [
      "Scribe AI explores how speech intelligence and carefully designed application systems can support live church production. Its original Python prototype processes microphone audio locally, identifies spoken Bible references, retrieves verses from a local database, and presents candidates for human approval.",
      "The project has since expanded into a dedicated desktop application built with Tauri and React. The desktop application establishes a command-driven architecture for production workflows, output management, permissions, and operator interaction. It remains a separate development track: the Python speech engine has not yet been integrated into the desktop application.",
    ],
    cta: "Explore Scribe AI",
    visual: "scribe",
    source: { label: "Scribe AI on GitHub", href: "https://github.com/benardabuto081/-scribe-ai" },
    stack: [
      "Tauri 2",
      "React 18",
      "TypeScript",
      "Rust",
      "Zustand",
      "Tailwind CSS 4",
      "Python",
      "Faster-Whisper",
      "SQLite",
    ],
    question: [
      "Church production often depends on an operator listening for spoken scripture references, finding the corresponding passage, and putting it on screen at the right moment. This work can happen on modest hardware and in environments where a stable internet connection cannot be assumed.",
      "The engineering challenge is broader than transcription. It involves building an offline-capable application in which speech processing, production controls, output windows, and operator decisions work together reliably, while keeping automated detection separate from final human approval.",
    ],
    approach: [
      "Scribe has two distinct implementation tracks. The Python prototype captures microphone audio in five-second chunks and runs Faster-Whisper locally on the CPU. A rule-based detector identifies references across the 66 books of the Bible, validates chapter numbers, normalises spoken reference formats, and retrieves passages from a local SQLite database containing the KJV text. An operator can approve, dismiss, or manually enter a reference before it is displayed.",
      "The desktop application is a separate Tauri 2 and React foundation. Its architecture uses a typed command bus to mediate application actions, with validation, permission checks, undo support, and audit logging. The Rust layer manages application-level state, while the frontend provides the studio shell, operator interface, and separate Audience and Stage output windows.",
      "The desktop command architecture also establishes keyboard shortcuts, a command palette, and an AI permission gate. These are application foundations rather than evidence that every production workflow is complete. The Python engine is not yet connected to this command system, and several desktop screens and persistence capabilities remain unfinished.",
      "Lyric matching and service-state detection also exist in the Python codebase, but they are separate from the working microphone-to-scripture workflow. Their integration and evaluation against real service recordings remain outstanding.",
    ],
    components: [
      {
        name: "Desktop application foundation",
        detail: "Tauri 2 and React studio shell, built with TypeScript and Rust.",
        state: "implemented",
        stateLabel: "Foundation built",
      },
      {
        name: "Typed command architecture",
        detail: "Command bus with validation, permissions, undo, audit logging, and keyboard interaction.",
        state: "implemented",
        stateLabel: "Core architecture built",
      },
      {
        name: "Audience and Stage outputs",
        detail: "Separate output windows and Rust-managed application output state.",
        state: "implemented",
        stateLabel: "Foundation built",
      },
      {
        name: "Local speech recognition",
        detail: "Python microphone pipeline using Faster-Whisper on CPU with five-second audio chunks and voice-activity filtering.",
        state: "implemented",
        stateLabel: "Working prototype",
      },
      {
        name: "Scripture detection and lookup",
        detail: "Rule-based detection across 66 Bible books, reference validation, spoken-form normalisation, and local SQLite lookup.",
        state: "implemented",
        stateLabel: "Working prototype",
      },
      {
        name: "Operator approval",
        detail: "Human approval, dismissal, or manual entry before a detected scripture reference is displayed.",
        state: "implemented",
        stateLabel: "Python prototype",
      },
      {
        name: "Desktop and AI-engine integration",
        detail: "Connecting the Python speech-processing pipeline to the Tauri command architecture and desktop production workflows.",
        state: "in-progress",
      },
      {
        name: "Lyric and service-state intelligence",
        detail: "Separate Python modules for lyric matching and service-state detection; not yet integrated into the live microphone path.",
        state: "partial",
        stateLabel: "Separate modules",
      },
      {
        name: "Desktop persistence and complete workflows",
        detail: "Persistent application data and the remaining production screens and workflows.",
        state: "in-progress",
      },
    ],
    contribution: [
      "I designed and developed the Python speech-processing prototype, including the local transcription loop, scripture-reference detection and validation, spoken-reference normalisation, SQLite lookup, and operator approval workflow.",
      "I also developed the desktop application's architectural foundation using Tauri, React, TypeScript, and Rust. This includes the typed command-bus approach, command validation and permissions, undo and audit mechanisms, keyboard interaction, and the separation of operator controls from Audience and Stage outputs.",
      "A significant part of the work has been defining boundaries between automated intelligence and production control. The speech engine, desktop application, and unfinished detection modules are documented as distinct implementation states rather than presented as one integrated system.",
    ],
    decisions: [
      {
        title: "Offline operation as a system constraint",
        body: "The Python scripture workflow runs locally against local models and data. A network connection is not required for its microphone-to-lookup path, which is important in the environments the application is intended to support.",
      },
      {
        title: "Automation does not own the final decision",
        body: "Speech recognition and reference detection can make mistakes. A human approval step separates an automated candidate from the content that reaches a production display.",
      },
      {
        title: "Commands mediate desktop actions",
        body: "The desktop application uses a typed command architecture rather than allowing interface components to perform arbitrary application mutations. This provides a central place for validation, permissions, undo, and audit behaviour.",
      },
      {
        title: "Separate operator and audience surfaces",
        body: "Production controls and audience-facing output have different responsibilities. The desktop architecture gives them separate windows rather than treating the operator interface as the presentation surface.",
      },
      {
        title: "Keep implementation status explicit",
        body: "A working Python prototype, a desktop foundation, and planned integration are different engineering milestones. The project does not describe them as a completed unified product.",
      },
    ],
    currentState: {
      summary:
        "Scribe AI has a working offline Python prototype for microphone transcription, scripture detection, local Bible lookup, and operator approval. Separately, its Tauri desktop application has a substantial architectural foundation, including a typed command system and independent output windows. The two tracks are not yet integrated.",
      notes: [
        "The desktop application still has unfinished screens and workflows; persistent application data is not yet implemented.",
        "The Python lyric detector and service-state machine are not connected to the live microphone path.",
        "The speech engine has not yet been integrated into the Tauri desktop application.",
        "The scripture workflow has not undergone systematic evaluation on recordings of real church services.",
      ],
    },
    nextQuestions: [
      "How should the Python speech engine communicate with the desktop command system without weakening the application's permission and state boundaries?",
      "What persistence model best supports production data, application recovery, and reliable output state?",
      "How do transcription and scripture detection perform on real recordings with different accents, background music, and overlapping speech?",
      "How should lyric detection and service-state tracking be integrated into the live audio workflow and evaluated independently?",
    ],
  },
  {
    slug: "rentra",
    title: "Rentra",
    category: "Product Engineering & Software Systems",
    status: "In Development",
    summary:
      "A rental operations platform modelling the relationships, records, and workflows connecting tenants, landlords, properties, and rental activity.",
    description: [
      "Rentra is a software project focused on the operational complexity of rental housing. It models the relationships between people, organisations, property portfolios, buildings, units, and tenancies, including cases where a tenant uses the platform independently of their landlord.",
      "The system has a Flutter mobile client and a modular NestJS backend backed by PostgreSQL. The backend contains domain modules for authentication, users, organisations, properties, tenants, payments, maintenance, and related workflows. The mobile application currently covers selected onboarding and tenant-facing experiences; the broader rental operations product remains under development.",
    ],
    cta: "Explore Rentra",
    visual: "rentra",
    source: { label: "Rentra on GitHub", href: "https://github.com/benardabuto081/Rentra" },
    stack: [
      "Flutter",
      "Dart",
      "NestJS 11",
      "TypeScript",
      "TypeORM",
      "PostgreSQL",
      "Supabase",
      "Africa's Talking",
      "Resend",
    ],
    question: [
      "Rental operations involve several parties with different responsibilities. Landlords manage properties, caretakers handle delegated operational tasks, and tenants occupy units and interact with the people responsible for them. These relationships are often coordinated through fragmented records and informal communication.",
      "The engineering challenge is to represent these relationships in a coherent system: how properties and units relate to organisations, how a tenancy connects a person to a unit, how permissions should follow those relationships, and how tenants can use the platform when their landlord is not registered.",
    ],
    approach: [
      "Rentra uses a Flutter mobile client and a single NestJS backend. The backend is organised into domain modules and owns the API, authentication, business logic, and persistence. PostgreSQL is hosted through Supabase and accessed through TypeORM. SMS and email verification use Africa's Talking and Resend, respectively.",
      "The domain model separates organisations, buildings, rooms, tenants, and tenancy-related records. In product language, these concepts represent rental portfolios, properties, units, and the people connected to them. Payments and maintenance have backend modules, but the existence of those modules should not be confused with complete end-to-end mobile workflows.",
      "Authentication includes account registration and sign-in flows, one-time verification codes, JWT-based sessions, and passkey-related functionality. The backend also distinguishes managed tenants from independent tenants. An independent tenant can maintain a self-declared rental record without requiring their landlord to be registered on the platform.",
      "The Flutter application contains onboarding, authentication, and tenant-facing screens. Its current service integration is limited, however, and several backend capabilities do not yet have complete mobile experiences. Authorisation and ownership scoping also require further work across the API.",
    ],
    components: [
      {
        name: "NestJS backend architecture",
        detail: "Modular backend covering authentication, users, organisations, buildings, rooms, tenants, payments, maintenance, and dashboard functionality.",
        state: "implemented",
        stateLabel: "Modules present",
      },
      {
        name: "PostgreSQL persistence",
        detail: "Relational data model accessed through TypeORM, with PostgreSQL hosted on Supabase.",
        state: "implemented",
      },
      {
        name: "Registration and authentication",
        detail: "Account registration, sign-in, JWT sessions, and SMS/email verification flows.",
        state: "implemented",
        stateLabel: "Core flows built",
      },
      {
        name: "Passkey workflows",
        detail: "Backend functionality for generating and redeeming landlord-issued passkeys.",
        state: "implemented",
        stateLabel: "Backend implemented",
      },
      {
        name: "Tenant onboarding and mobile experience",
        detail: "Flutter onboarding, verification, role selection, and selected tenant-facing screens.",
        state: "partial",
        stateLabel: "Selected workflows built",
      },
      {
        name: "Payments and maintenance",
        detail: "Backend modules and records exist; complete operational workflows and mobile integration remain unfinished.",
        state: "partial",
      },
      {
        name: "Managed and independent tenants",
        detail: "Separate modelling for platform-managed tenancies and self-declared rental relationships.",
        state: "implemented",
        stateLabel: "Domain model present",
      },
      {
        name: "API authorisation and ownership scoping",
        detail: "Role checks exist on core routes, but protection and record-level ownership enforcement need broader coverage.",
        state: "in-progress",
      },
      {
        name: "Caretaker property assignments",
        detail: "Property-level caretaker assignment and permission scoping.",
        state: "planned",
      },
      {
        name: "Independent-to-managed conversion",
        detail: "Linking a tenant's self-declared rental to a managed tenancy when the landlord joins.",
        state: "planned",
      },
    ],
    contribution: [
      "I have worked on the system architecture and domain model: defining the boundaries between backend modules, representing organisations and rental properties, and modelling the relationships between tenants, units, and tenancies.",
      "My work also covers the relationship between the Flutter client and the NestJS API, authentication and verification flows, and the distinction between managed and independent tenants.",
      "A central design concern has been making the software reflect real rental arrangements rather than assuming every landlord, tenant, and property is already represented on the platform. The implementation is being developed incrementally, with unfinished API protection and mobile workflows treated as outstanding engineering work.",
    ],
    decisions: [
      {
        title: "The backend owns business rules",
        body: "The mobile client is an interface to the system, not the authority on access or business rules. Authentication and authorisation decisions belong on the server, where they can be enforced independently of the client.",
      },
      {
        title: "Model rental relationships explicitly",
        body: "A person, a property, a unit, and a tenancy are different domain concepts. Keeping them distinct makes it possible to represent ownership, occupancy, and operational responsibilities without collapsing them into one user record.",
      },
      {
        title: "Support tenants outside managed portfolios",
        body: "Not every tenant's landlord will use the platform. Independent rental records allow tenants to maintain their own rental information without inventing a managed relationship that does not exist.",
      },
      {
        title: "Separate implementation from product scope",
        body: "A backend module or data model does not automatically mean a complete user-facing workflow exists. The project tracks backend foundations, mobile integration, and unfinished capabilities separately.",
      },
    ],
    currentState: {
      summary:
        "Rentra has a modular NestJS backend, a PostgreSQL data model, authentication and verification functionality, and a Flutter application with selected onboarding and tenant-facing workflows. Several backend domains exist, but payments and maintenance are not complete end-to-end mobile features. API authorisation and ownership scoping also need further coverage.",
      notes: [
        "The Flutter client does not yet expose the full set of backend capabilities as complete user workflows.",
        "Some API routes still need consistent role protection and record-level ownership checks.",
        "Caretaker assignment to specific properties has not been implemented.",
        "Converting an independent tenant record into a managed tenancy remains planned work.",
        "The current backend is a modular monolith, not a microservices architecture.",
      ],
    },
    nextQuestions: [
      "How should ownership and tenancy relationships be enforced consistently across every API operation?",
      "What is the safest way to complete payments and maintenance workflows from the backend through to the mobile client?",
      "How should caretaker responsibilities and property-level permissions be represented in the domain model?",
      "How can an independent rental record be linked to a managed tenancy without losing the tenant's existing history?",
    ],
  },
  {
    slug: "queleaguard",
    title: "QueleaGuard",
    category: "Applied Machine Learning Research",
    status: "Active Research",
    summary:
      "Investigating environmental, spatial, temporal, and agricultural drivers of red-billed quelea occurrence around Ahero Rice Irrigation Scheme.",
    description: [
      "QueleaGuard is an applied machine learning research project investigating the environmental, spatial, temporal, and agricultural factors associated with red-billed quelea occurrence around Ahero Rice Irrigation Scheme in Kisumu County, Kenya.",
      "The project brings together geospatial and environmental data to investigate a research question with agricultural relevance. Its data sources include CHIRPS precipitation, ERA5-Land environmental variables, MODIS vegetation information, SRTM elevation, and hydrological data.",
      "The work emphasizes research design, data integration, spatial reasoning, predictor selection, and the need for careful evaluation when modeling ecological observations.",
    ],
    cta: "Explore QueleaGuard",
    visual: "quelea",
    source: { label: "QueleaGuard on GitHub", href: "https://github.com/benardabuto081/QueleaGuard" },
    stack: [
      "GBIF occurrence records",
      "Africa rice distribution map (Jiang et al. 2025)",
      "CHIRPS precipitation",
      "ERA5-Land",
      "MODIS NDVI",
      "SRTM elevation",
      "HydroRIVERS",
      "Python",
    ],
    stackLabel: "Data & tools",
    question: [
      "Red-billed quelea are a major pest of cereal crops across sub-Saharan Africa. Around Ahero Rice Irrigation Scheme, control is largely reactive: action is taken after the birds arrive.",
      "The research question is whether historical occurrence records, combined with environmental and agricultural data, can explain where and when quelea occur around the scheme. The project models occurrence, not crop damage: the records describe where birds were observed, not where damage happened, and that distinction is kept throughout.",
    ],
    approach: [
      "The analysis covers an extent of roughly 50 km around the scheme, divided into a grid of about 5.5 km cells. Occurrence records come from GBIF. Because the data contains presences only, background points are sampled using a target-group approach and treated explicitly as an approximation of absence, not as confirmed absence.",
      "Each record is joined to environmental features: rainfall from CHIRPS, meteorology from ERA5-Land, vegetation from MODIS NDVI, terrain from SRTM, and distance to rivers and the lake from hydrological data.",
      "The research is organised in three levels: environmental drivers of occurrence; whether the rice-agricultural landscape adds information beyond the environment; and whether combining the two improves occurrence estimation. Rice availability is represented continuously — the proportion of rice within 500 m, 1 km, and 2 km of each record, and the distance to the nearest rice — rather than as inside or outside a scheme boundary, because the mapped scheme polygons turned out to cover only a fraction of the surrounding rice landscape.",
      "Evaluation is designed before any training: records are grouped into five spatially separated cross-validation folds, and a compact baseline set of ten predictors plus season was chosen after checking correlations between candidate features.",
    ],
    components: [
      {
        name: "Study area & analysis grid",
        detail: "Scheme boundary, analysis extent, and grid definition.",
        state: "implemented",
        stateLabel: "Complete",
      },
      {
        name: "Occurrence data",
        detail: "GBIF records spatially matched to the grid; 133 feature-complete presence records.",
        state: "implemented",
        stateLabel: "Complete",
      },
      {
        name: "Background sampling",
        detail: "Target-group background, month-stratified and checked against presence conflicts.",
        state: "implemented",
        stateLabel: "Complete, checked",
      },
      {
        name: "Environmental features",
        detail: "Rainfall, meteorology, vegetation, terrain, and hydrology extracted for every record.",
        state: "implemented",
        stateLabel: "Complete, checked",
      },
      {
        name: "Rice-landscape features (Level 2)",
        detail: "Rice proportion at three scales and distance to nearest rice, with a cropland cross-check of temporal stability.",
        state: "implemented",
        stateLabel: "Extracted, checked",
      },
      {
        name: "Spatial cross-validation folds",
        detail: "Five folds from presence-anchored k-means clustering, verified for coverage and reproducibility.",
        state: "implemented",
        stateLabel: "Defined",
      },
      {
        name: "Baseline predictor set",
        detail: "Ten predictors plus season, chosen after correlation and redundancy checks.",
        state: "implemented",
        stateLabel: "Selected",
      },
      {
        name: "Exploratory analysis (Level 1)",
        detail: "Spatial, temporal, and environmental patterns in the assembled dataset.",
        state: "in-progress",
      },
      {
        name: "Model training & validation",
        detail: "Including spatial cross-validation, treated as mandatory given clustered records.",
        state: "not-started",
      },
    ],
    contribution: [
      "I own the project end to end. On the research side, that means framing the question, defining the study area and analysis grid, choosing a presence-background design, and keeping a numbered decision log that records each methodological choice and the evidence behind it.",
      "On the engineering side, it means acquiring and integrating the geospatial and environmental data, building the extraction and validation pipeline, and diagnosing data problems — including a temporal sampling bias in an earlier background pool and a fill-value filtering bug in vegetation extraction, each documented rather than silently patched.",
    ],
    decisions: [
      {
        title: "Model occurrence, not damage",
        body: "Observation records say where birds were seen. Treating them as evidence of crop damage would make any result mean something it does not. The framing is kept as a hard constraint.",
      },
      {
        title: "Presence-background, stated as an approximation",
        body: "Without confirmed absences, background points are a modelling device. Documenting that limitation up front shapes how any later result can be interpreted.",
      },
      {
        title: "Spatial validation is mandatory",
        body: "Occurrence records are spatially clustered. Random train–test splits would leak information between nearby points and overstate performance, so spatial cross-validation is part of the design before any model is trained.",
      },
      {
        title: "Log problems instead of patching them silently",
        body: "Every non-trivial finding is recorded with its evidence before it is acted on. Bugs found in the data pipeline are written up, which makes the dataset auditable.",
      },
    ],
    currentState: {
      summary:
        "The modelling dataset is assembled and quality-checked, including the rice-landscape features, and the evaluation design is fixed: spatially blocked cross-validation folds and a compact baseline predictor set. Model training and validation have not yet started, so there are no model results to report. QueleaGuard is not a prediction service or an early-warning system.",
      notes: [
        "The project began as a capstone for the Ngao Labs Data Science & AI Bootcamp. A snapshot model built for that presentation is not the research dataset or model described here.",
        "The rice features come from a single 2023 rice-extent map. A cropland cross-check suggests the landscape was broadly stable across earlier observation years, but does not prove it.",
        "One cross-validation fold is small, so per-fold results will be noisy; that will be reported alongside any metric.",
      ],
    },
    nextQuestions: [
      "Which environmental predictors still carry information about occurrence once spatial autocorrelation is accounted for?",
      "Does the rice-agricultural landscape add explanatory value beyond general environmental conditions?",
      "How strongly does sampling bias in citizen-science records shape what any model can learn?",
      "How well does a baseline model transfer across spatially separated folds, and what does its weakest fold reveal about where the data runs out?",
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  const count = projects.length;
  return {
    previous: projects[(index - 1 + count) % count],
    next: projects[(index + 1) % count],
  };
}

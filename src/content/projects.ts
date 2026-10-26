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
    category: "Applied AI & Offline-First Systems",
    status: "Active Engineering",
    summary:
      "An exploration of offline-first speech intelligence for church production, connecting spoken scripture references to a local Bible lookup workflow.",
    description: [
      "Scribe AI explores how speech recognition and lightweight local processing can support church production workflows. Its scripture-detection path is designed to identify spoken Bible references, retrieve corresponding verses from a local source, and present a result for human approval before anything is displayed.",
      "The project is especially concerned with practical system behavior: how audio becomes a candidate transcription, how scripture references are identified, how local lookup works, and how a production operator remains in control of the final output.",
    ],
    cta: "Explore Scribe AI",
    visual: "scribe",
    source: { label: "Scribe AI on GitHub", href: "https://github.com/benardabuto081/-scribe-ai" },
    stack: ["Python", "Faster-Whisper (local, CPU)", "SQLite", "RapidFuzz", "Tkinter"],
    question: [
      "During a church service, someone usually has to listen closely enough to catch a scripture reference and pull it up on screen by hand, without interrupting the flow of the service. That person is often a volunteer, working on modest hardware, with software that assumes a stable internet connection.",
      "The question is whether local speech recognition and lightweight detection can take over the recognition step — while a person stays in control of what reaches the screen, and without depending on the internet at all.",
    ],
    approach: [
      "Microphone audio is buffered into five-second chunks and transcribed locally with Faster-Whisper running on the CPU. A rule-based detector looks for scripture references in the transcript, covering all 66 books and common abbreviations, and rejects references that cannot exist, such as a chapter number beyond the end of a book.",
      "Detected references are normalised from spoken forms — “chapter three verse sixteen” — and looked up in a local SQLite Bible database. The result goes to an operator console, where a person approves, dismisses, or manually enters a reference before anything is displayed.",
      "A service-state machine and a lyric detector also exist as separate, tested modules. They are not yet connected to the live audio path.",
    ],
    components: [
      {
        name: "Local transcription",
        detail: "Faster-Whisper small model on CPU, five-second chunks with voice-activity filtering.",
        state: "implemented",
        stateLabel: "In live path",
      },
      {
        name: "Scripture reference detection",
        detail: "Pattern-based detection across 66 books, validated against real chapter counts.",
        state: "implemented",
        stateLabel: "In live path",
      },
      {
        name: "Local Bible lookup",
        detail: "SQLite database with normalisation of spoken reference formats.",
        state: "implemented",
        stateLabel: "In live path",
      },
      {
        name: "Operator approval & display",
        detail: "Approve, dismiss, or manually enter a reference; fullscreen display after approval.",
        state: "implemented",
        stateLabel: "In live path",
      },
      {
        name: "Service-state machine",
        detail: "Keyword-based tracking of the part of the service (worship, sermon, prayer, announcements).",
        state: "partial",
        stateLabel: "Not in live path",
      },
      {
        name: "Lyric detection",
        detail: "Fuzzy matching of transcript text against a song library, currently placeholder test data.",
        state: "partial",
        stateLabel: "Not in live path",
      },
      {
        name: "Swappable speech-recognition backend",
        detail: "An interface so other transcription models can be used and compared.",
        state: "planned",
      },
    ],
    contribution: [
      "I designed and built the offline-first workflow and the scripture-detection path: the local transcription loop, the detection rules and reference validation, the normalisation and local lookup, and the human approval step that sits between detection and display.",
      "I also wrote the separate state-machine and lyric-detection modules, and documented clearly where they are and are not connected.",
    ],
    decisions: [
      {
        title: "No network in the live path",
        body: "A dropped connection during a service is not an edge case in the settings this project is designed for. Every component in the live path runs as a local process against local data. The project’s working principle is: if the internet disappears, the service continues.",
      },
      {
        title: "AI as a detector, not a decision-maker",
        body: "Speech recognition and pattern matching will make mistakes. Putting an operator approval step between detection and display means a wrong detection costs a click, not a wrong verse on a church screen.",
      },
      {
        title: "Deterministic detection where it is sufficient",
        body: "Scripture references follow a small number of known formats, so rule-based detection with validity checks is inspectable and predictable. There is no numeric confidence score yet; the safety layer is the human operator.",
      },
      {
        title: "Context across chunk boundaries",
        body: "A reference can be split between two five-second audio chunks. Carrying a short tail of the previous transcript forward reduces the chance of losing it.",
      },
      {
        title: "Module boundaries for a future backend swap",
        body: "Transcription, detection, state, and display are separate modules. This is intended to make it possible to replace the transcription model later — including with models better suited to African languages — although that interface has not been built yet.",
      },
    ],
    currentState: {
      summary:
        "The scripture path is working: audio, transcription, reference detection, local lookup, operator approval, and display are connected in the live entry point and run offline. Lyric detection and service-state logic are not integrated into the live audio path. The pipeline that combines them currently runs against simulated text, not a microphone.",
      notes: [
        "The lyric-matching threshold has not been validated against real transcription noise, and the song library is placeholder test data.",
        "Detection has not yet been evaluated systematically on recordings of real services.",
        "There is no cloud component; any platform features beyond the local application are future direction only.",
      ],
    },
    nextQuestions: [
      "How do the detection rules behave on real recorded services, with accents, crosstalk, and music in the background? This needs an evaluation set built from real audio.",
      "How should the live entry point and the full pipeline be unified so state tracking and lyric detection run on live audio?",
      "What interface would let different speech-recognition models be swapped in and compared fairly?",
      "Would a confidence signal help the operator, or just add noise to a decision they already make well?",
    ],
  },
  {
    slug: "rentra",
    title: "Rentra",
    category: "Product Engineering & Software Systems",
    status: "In Development",
    summary:
      "A rental-management software project exploring the workflows, permissions, and data models needed to coordinate tenants, landlords, caretakers, and rental operations.",
    description: [
      "Rentra explores the engineering behind rental-management workflows. The project considers how tenants, landlords, and caretakers interact with rental records, how responsibilities and permissions are represented, and how operational workflows can be modeled in software.",
      "The technical direction includes a Flutter mobile application, a NestJS backend, and PostgreSQL/Supabase technologies. The project provides a context for thinking about domain modeling, backend boundaries, data relationships, and the design of software around real-world operational processes.",
    ],
    cta: "Explore Rentra",
    visual: "rentra",
    source: { label: "Rentra on GitHub", href: "https://github.com/benardabuto081/Rentra" },
    stack: ["Flutter", "NestJS", "TypeScript", "TypeORM", "PostgreSQL (Supabase)"],
    question: [
      "Rental relationships involve several parties with different responsibilities: tenants who rent a unit, landlords who own or manage properties, and caretakers who run day-to-day operations on a landlord’s behalf. Much of this is coordinated informally.",
      "The engineering question is how to model those relationships in software: who can see and change which records, how a tenancy connects to a unit, a building, and a portfolio, and what should happen when one of the parties is not on the platform at all.",
    ],
    approach: [
      "Rentra is a Flutter mobile application talking to a single NestJS backend over HTTPS and JSON. The backend owns authentication, authorisation, business rules, and persistence, and stores data in PostgreSQL hosted on Supabase through TypeORM. Sign-in uses signed tokens, and verification codes are sent by SMS and email.",
      "The domain model follows the structure of a rental operation: a landlord’s portfolio contains buildings, buildings contain rentable units, and a tenancy links a person to a unit. Payments and maintenance requests attach to that structure. A separate record lets a tenant whose landlord is not on Rentra still keep track of their own rental.",
    ],
    components: [
      {
        name: "Registration, sign-in & verification",
        detail: "Account flows for landlords and tenants, with one-time codes by SMS and email.",
        state: "implemented",
      },
      {
        name: "Portfolios, buildings, units & tenancies",
        detail: "Core rental records and their relationships in the backend.",
        state: "implemented",
      },
      {
        name: "Payments & maintenance records",
        detail: "Payment records for managed tenancies and maintenance requests.",
        state: "implemented",
      },
      {
        name: "Tenant onboarding in the mobile app",
        detail: "Registration, verification, role selection, setup, and the main tenant screens.",
        state: "implemented",
      },
      {
        name: "Role-based authorisation",
        detail: "Enforced on core controllers; still being extended across the rest of the API.",
        state: "in-progress",
      },
      {
        name: "Ownership scoping",
        detail: "Ensuring a tenant can reach only their own records, beyond role checks.",
        state: "in-progress",
      },
      {
        name: "Independent-to-managed tenancy conversion",
        detail: "Linking a self-declared rental to a real tenancy when a landlord joins.",
        state: "planned",
      },
      {
        name: "Caretaker assignment to properties",
        detail: "Scoping a caretaker’s permissions to specific buildings.",
        state: "planned",
      },
    ],
    contribution: [
      "I am responsible for the software architecture: the domain model, the boundaries between backend modules, how roles and permissions are represented and enforced, and how the mobile application talks to the backend.",
      "Most of the interesting work has been in modelling the rental workflows themselves — deciding what a tenancy, a unit, and a portfolio are in the data model, and how the system should behave when the real-world relationship is incomplete.",
    ],
    decisions: [
      {
        title: "Authorisation lives in the backend",
        body: "The mobile client renders and calls the API; the backend decides who may do what. Role checks are enforced by guards on the server, so a modified client cannot grant itself permissions.",
      },
      {
        title: "Internal names separate from product language",
        body: "The backend speaks of organisations and rooms; people using the app see a property portfolio and units. Keeping the two vocabularies apart lets the data model stay precise without leaking technical concepts into the interface.",
      },
      {
        title: "Modelling the absent landlord",
        body: "Many tenants’ landlords will not be on the platform. A separate self-declared rental record lets those tenants keep their own history, with the intention that it can later be linked to a managed tenancy.",
      },
      {
        title: "Writing down where implementation lags the plan",
        body: "The repository documents which parts of the product plan exist in code and which do not. That makes it possible to reason about the system as it actually is.",
      },
    ],
    currentState: {
      summary:
        "Rentra is in active development. Core rental records — portfolios, buildings, units, tenancies, payments, and maintenance — are implemented in the backend, and the mobile app covers tenant onboarding and the main tenant screens. Authorisation is still being extended across the API, and several planned capabilities have no implementation yet.",
      notes: [
        "Converting a self-declared rental into a managed tenancy is not yet implemented.",
        "There is no model yet for assigning caretakers to specific properties.",
        "Later product ideas in the roadmap have no backend or mobile implementation.",
      ],
    },
    nextQuestions: [
      "How should ownership be enforced alongside roles, so that each tenant can reach only their own records?",
      "What is the right model for converting a self-declared rental into a managed tenancy without losing its history?",
      "How should caretakers be scoped to particular buildings, and what should they be able to change?",
      "When the data model stabilises, how should the move from automatic schema synchronisation to explicit migrations be handled?",
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

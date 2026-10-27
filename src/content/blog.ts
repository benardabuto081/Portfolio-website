/**
 * Blog posts. Each post is structured content so it renders consistently and
 * stays fully static. Inline `code` is written with backticks, and links as
 * [text](https://…). External claims are listed in `sources`.
 *
 * Dates: `period` is when the work a post describes took place (established
 * from git history and project documentation); `published` is when the post
 * actually went live on this site. Posts are ordered by `period`.
 */

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "quote"; text: string }
  | { type: "code"; code: string }
  | { type: "table"; head: string[]; rows: string[][] };

export type BlogPost = {
  slug: string;
  title: string;
  summary: string;
  /** When the work behind the post took place, YYYY-MM. */
  period: string;
  /** When the post was published on this site, YYYY-MM-DD. */
  published: string;
  /** Project slug the post draws on, for cross-linking. */
  project: string;
  topics: string[];
  body: BlogBlock[];
  sources?: { title: string; publisher: string; url: string }[];
};

const allPosts: BlogPost[] = [
  {
    slug: "when-the-api-chose-my-sampling-design",
    title: "The API chose my sampling design",
    summary:
      "How an undocumented sort order in a public biodiversity API put 97% of my background points in January — and what I changed so that kind of bias gets caught before a model ever sees it.",
    period: "2026-08",
    published: "2026-10-27",
    project: "queleaguard",
    topics: ["Data quality", "Species distribution modelling", "Reproducibility"],
    body: [
      {
        type: "p",
        text: "Exploratory analysis is supposed to be the calm part of a project. For QueleaGuard, it was where I found that 122 of my 126 background records — 96.8% — fell in January or February. Among the real quelea observations, only 20.3% did.",
      },
      {
        type: "p",
        text: "Nothing had crashed. Every validation check up to that point had passed. If I had gone straight to training, the model would almost certainly have looked good. That is exactly what made it dangerous.",
      },
      { type: "h2", text: "Why the background points exist at all" },
      {
        type: "p",
        text: "QueleaGuard investigates where red-billed quelea occur around Ahero Rice Irrigation Scheme. The occurrence data comes from GBIF, which aggregates citizen-science sightings, mostly from eBird. That data is presence-only: it records where birds were seen, never where someone looked and saw nothing.",
      },
      {
        type: "p",
        text: "To model occurrence you need something to contrast presences against. I used an approximate target-group background: other bird species recorded in the same area stand in for “a birder was here and did not record quelea.” It corrects for the fact that observations cluster around places people actually go birding, rather than pretending effort is spread evenly across the landscape.",
      },
      {
        type: "p",
        text: "It is an approximation. Individual records are a noisier proxy for effort than complete checklists, and I wrote that limitation down when I adopted the method. But it only works if the background sample is drawn fairly across space and time. Mine was not.",
      },
      { type: "h2", text: "Why a calendar bias is so harmful here" },
      {
        type: "p",
        text: "Almost every environmental feature in the dataset moves with the seasons: rainfall, temperature, dewpoint, vegetation greenness. If nearly all background points are in January and February while presences are spread across the year, a model can separate the two classes by learning the calendar. It would report strong performance, and the performance would say nothing about quelea ecology.",
      },
      {
        type: "quote",
        text: "A confound like this does not produce an error. It produces a convincing result.",
      },
      { type: "h2", text: "Finding the cause" },
      {
        type: "p",
        text: "The effort-proxy pool came from a script that queried GBIF’s `occurrence/search` endpoint one year at a time, capped at 150 records per year through pagination. Looking at the raw pool, several years — 2000, 2011, and 2012 — were 150 out of 150 January.",
      },
      {
        type: "p",
        text: "GBIF does not publish a guaranteed default sort order for that endpoint. Empirically, results within a year-only query came back front-loaded from January, and in any year with more records than the cap, the cap cut the list off before it reached the rest of the year. My sampling design had been decided by the order in which a server happened to return rows.",
      },
      {
        type: "p",
        text: "The uncomfortable part is that I had already fixed a year-level version of the same problem when I first built the pool. This was the same class of bug one level down, and it survived because no one — me — had run a month-level check on the pool.",
      },
      { type: "h2", text: "The fix: stop depending on the order" },
      {
        type: "p",
        text: "The endpoint accepts a `month` parameter alongside `year`. Instead of working around an undocumented ordering, I removed the dependency on it: one query per year–month pair, 16 years × 12 months = 192 queries, each targeting around 13 records.",
      },
      {
        type: "table",
        head: ["", "Before", "After"],
        rows: [
          ["Effort-proxy records", "Year-capped, January-heavy", "2,371, stratified by month"],
          ["Largest single-month share", "90.7%", "8.8%"],
          ["Records per month", "Extremely uneven", "182–208"],
        ],
      },
      {
        type: "p",
        text: "While rebuilding the pool I also closed a gap found during an earlier validation pass. Three background records appeared to come from the same eBird checklist as a confirmed quelea sighting — which directly contradicts what a background point is meant to represent. The rebuilt pipeline now excludes any effort-proxy record that shares a grid cell and date with a confirmed presence before sampling, instead of hoping validation catches it afterwards. That rule removed 94 records that would have reintroduced the same contradiction.",
      },
      { type: "h2", text: "Checking before moving on" },
      {
        type: "p",
        text: "I held back the expensive part — re-extracting rainfall, meteorology, and vegetation features for the new records — until the corrected sample passed its own checks:",
      },
      {
        type: "list",
        items: [
          "Month distribution: the largest single month is 18.8% of presences (November) and 16.8% of background records (May). No class is concentrated in one season any more.",
          "Cross-class contradictions: zero cell-and-date pairs shared between presences and background.",
          "Year coverage: both classes span 2000–2026, weighted towards 2021–2024 in both, which matches the growth of eBird rather than an artefact of the query.",
          "Spatial coverage: background points now fall in 81 grid cells instead of 49.",
        ],
      },
      {
        type: "p",
        text: "The month-biased files were kept, renamed, and documented as superseded rather than deleted. If anyone wants to see how much the bias would have mattered, the evidence is still there.",
      },
      { type: "h2", text: "What I took from it" },
      {
        type: "list",
        ordered: true,
        items: [
          "Whenever a data request has a cap, ask what decides which records come back. If the answer is “whatever the server does,” the sample is not under your control.",
          "Stratify on the dimensions the model will be sensitive to. Season matters to every feature here, so month had to be part of the sampling design, not something I hoped would average out.",
          "Check the distribution of every dimension the model can see, for each class separately. A pooled check would have hidden this.",
          "Write the problem down instead of quietly patching it. The decision log entry is now the most useful explanation of why the dataset looks the way it does.",
        ],
      },
      {
        type: "p",
        text: "QueleaGuard has not trained its research models yet, so I cannot tell you how much this changed the results. What I can say is that whatever those results turn out to be, they will not be a measurement of what month it is.",
      },
    ],
  },
  {
    slug: "spatial-cross-validation-with-clustered-data",
    title: "Spatial cross-validation when the data won’t spread out",
    summary:
      "Random k-fold overstates performance on clustered ecological data. The obvious alternatives broke on my dataset too — here is the fold design QueleaGuard ended up with, and why.",
    period: "2026-10",
    published: "2026-10-27",
    project: "queleaguard",
    topics: ["Model evaluation", "Spatial data", "Research design"],
    body: [
      {
        type: "p",
        text: "Before QueleaGuard trains a single research model, it needs a way to tell whether that model is any good. For ecological point data, that question is harder than it looks, and I went through two designs that failed before settling on one I trust.",
      },
      { type: "h2", text: "Why random folds are not an option" },
      {
        type: "p",
        text: "Observations that are close together in space tend to look alike: similar rainfall, similar vegetation, similar distance to water. If a random split puts one record in training and its neighbour a few hundred metres away in testing, the model is partly being tested on data it has effectively already seen. The well-established result (Roberts et al., 2017; Valavi et al., 2019) is that this underestimates predictive error, and that spatially blocked cross-validation is required instead.",
      },
      {
        type: "p",
        text: "So the question was not whether to block spatially, but how to block a dataset that is extremely uneven.",
      },
      { type: "h2", text: "Attempt one: use the grid I already had" },
      {
        type: "p",
        text: "The analysis already divides the area around Ahero into 328 grid cells of about 5.5 km. Blocking on those cells was the natural first idea. But only 93 of the 328 cells contain any records, and one cell — a persistent site on the Winam Gulf shore — holds 62 of the 266 records on its own. Grouping folds by cell would have produced folds dominated or emptied by a handful of cells.",
      },
      { type: "h2", text: "Attempt two: cluster all the points" },
      {
        type: "p",
        text: "Next I clustered every record’s coordinates with k-means into five groups. One of the resulting folds contained no presence records at all.",
      },
      {
        type: "p",
        text: "In hindsight the reason is simple. Background points are spread across the whole 50 km analysis extent, while presences concentrate near the rice scheme and the persistent site. Clustering all points together can carve out a region that is pure background. A fold with no presences cannot be evaluated: precision, recall, and F1 are undefined.",
      },
      { type: "h2", text: "What worked: anchor the clusters on presences" },
      {
        type: "p",
        text: "The fix was to fit k-means (k = 5, fixed seed) on presence coordinates only, which places the five centroids where the birds were actually recorded, and then assign every record — presence and background — to its nearest centroid. Because each centroid sits among presences, a presence-free fold cannot occur by construction.",
      },
      {
        type: "table",
        head: ["Fold", "Presence", "Background", "Total"],
        rows: [
          ["0", "8", "42", "50"],
          ["1", "9", "5", "14"],
          ["2", "11", "20", "31"],
          ["3", "36", "22", "58"],
          ["4", "69", "44", "113"],
        ],
      },
      {
        type: "p",
        text: "The folds are uneven, and I left them that way. Fold 4 is large because it contains the persistent shoreline site; fold 1 is small. Rebalancing them would mean moving records away from their spatial neighbours, which is precisely what blocking exists to prevent.",
      },
      { type: "h2", text: "Checking that the folds do what they claim" },
      {
        type: "list",
        items: [
          "All 62 records from the persistent site landed in a single fold, so that cluster cannot leak between training and testing.",
          "Only one grid cell was split across two folds. Its two records are 4.6 km apart — further than the largest 2 km neighbourhood used by the rice-landscape features, so they do not share the same feature window. That does not rule out every form of spatial autocorrelation, and I have not claimed it does.",
          "The fold file covers the modelling dataset exactly: every record once, no duplicates, five fold IDs, both classes present in every fold.",
          "Re-running the same clustering on the same data reproduces the assignment with zero mismatches.",
        ],
      },
      { type: "h2", text: "A related choice: keep coordinates out of the model" },
      {
        type: "p",
        text: "The same reasoning shaped the baseline predictor set. Latitude and longitude are deliberately excluded. With data this concentrated, a model given raw coordinates could learn where the clusters are instead of which environmental conditions are associated with quelea — and spatial folds would then be measuring how well it memorised geography. The baseline uses ten environmental and landscape predictors plus season, chosen after checking for redundancy between candidates.",
      },
      { type: "h2", text: "What this design does not fix" },
      {
        type: "p",
        text: "Fold 1 has 14 records, 9 of them presences. Any metric computed on it will be noisy, and the honest response is to report per-fold results alongside the average rather than let one number stand in for all of them. The dataset is small — 133 presences — and no fold design changes that.",
      },
      {
        type: "p",
        text: "No model has been trained on these folds yet. The point of fixing the evaluation design first is that when results do arrive, I will not be tempted to choose the validation scheme that makes them look best.",
      },
    ],
  },
  {
    slug: "ai-as-a-detector-not-a-decision-maker",
    title: "AI as a detector, not a decision-maker",
    summary:
      "Designing Scribe AI’s live path: offline speech recognition, rule-based scripture detection, and a human approval step that keeps a wrong guess off a church screen.",
    period: "2026-07",
    published: "2026-10-27",
    project: "scribe-ai",
    topics: ["Applied AI", "Offline-first systems", "Human-in-the-loop"],
    body: [
      {
        type: "p",
        text: "Scribe AI listens to a church service and tries to catch scripture references as they are spoken — “turn with me to John chapter three, verse sixteen” — so the verse can be put on screen without a volunteer scrambling to type it. It is a small system, but it sits in an unforgiving place: whatever it gets wrong is projected in front of the whole room.",
      },
      {
        type: "p",
        text: "Two constraints shaped nearly every design decision: it must keep working without the internet, and nothing it detects should reach the screen without a person agreeing.",
      },
      { type: "h2", text: "Offline is a requirement, not a feature" },
      {
        type: "p",
        text: "In the settings Scribe is designed for, a dropped connection in the middle of a service is ordinary, not an edge case. So everything in the live path runs as a local process against local data: microphone capture, speech recognition, detection, Bible lookup, and display. There is no network call anywhere in it.",
      },
      {
        type: "p",
        text: "Speech recognition uses Faster-Whisper’s small model on the CPU, quantised to int8, with greedy decoding (`beam_size=1`) and voice-activity filtering to skip silence. Audio is captured at 16 kHz and transcribed in five-second chunks. These are deliberate trade-offs for the kind of laptop a church production desk actually has: a smaller, faster model that keeps up with speech, rather than a more accurate one that falls behind it.",
      },
      { type: "h2", text: "Rules, where rules are enough" },
      {
        type: "p",
        text: "It would have been easy to reach for a learned model to find references in the transcript. I did not, because the problem does not need one. Spoken references come in a small number of shapes, and the detector covers four:",
      },
      {
        type: "code",
        code: "John 3:16\nJohn chapter 3 verse 16\nJohn 3 16\nJohn 316        ← how speech recognition often writes it",
      },
      {
        type: "p",
        text: "The patterns match against all 66 book names and common abbreviations. Every match is then checked against the real number of chapters in that book, so “Genesis 60” is rejected because Genesis has 50. That check matters most for the compressed form, where the transcript gives a run of digits and the detector has to decide where the chapter ends and the verse begins.",
      },
      {
        type: "p",
        text: "The benefit is not accuracy for its own sake. It is that every decision is inspectable: when the detector fires or fails to fire, you can read exactly why. There is no confidence score, and I have not pretended there is one. Validity is binary.",
      },
      { type: "h2", text: "References don’t respect chunk boundaries" },
      {
        type: "p",
        text: "A preacher does not pause neatly every five seconds. “John chapter three” can land at the end of one chunk and “verse sixteen” at the start of the next. When a chunk produces no detection, the last 60 characters of its transcript are carried forward and prepended to the next one. When a chunk does produce a detection, the carried text is cleared, so the same reference is not detected twice.",
      },
      { type: "h2", text: "The approval step" },
      {
        type: "p",
        text: "A detection never goes straight to the screen. It goes to an operator console, a separate always-on-top window where a person can approve it, dismiss it, or type a reference manually. Only an operator’s action — approving a detection or entering a reference themselves — puts a verse on the display.",
      },
      {
        type: "p",
        text: "This is the system’s answer to “what happens when the AI is wrong?” A misheard reference costs the operator one click. Without the gate, it costs a wrong verse in front of a congregation. The manual entry path also means the operator is never dependent on the detector: if it misses something, they can still put it up.",
      },
      {
        type: "p",
        text: "There is a smaller engineering detail behind that. Audio capture and transcription run on a background thread, while the console and display belong to the Tkinter UI thread. The audio thread never touches the interface directly; it schedules work on the UI thread with `root.after`, which keeps the two from fighting over the same widgets.",
      },
      { type: "h2", text: "Being clear about what is not connected" },
      {
        type: "p",
        text: "Scribe also contains a service-state machine — keyword rules that track whether the service is in worship, sermon, prayer, or announcements — and a lyric detector that fuzzy-matches transcript text against a song library. Both are implemented and tested. Neither is connected to the live microphone path yet. They run together in a separate pipeline that is driven by simulated text.",
      },
      {
        type: "p",
        text: "I think saying that plainly matters more than it might seem. It would be easy to describe the module list and let a reader assume it all runs live. The lyric matcher’s threshold has only been tested on clean text, and the song library is placeholder data. Those are real limitations, and they belong in the description of the system, not in a footnote.",
      },
      { type: "h2", text: "What comes next" },
      {
        type: "list",
        items: [
          "An evaluation set built from recordings of real services, with accents, crosstalk, and music, so detection is measured on the conditions it will face.",
          "One live entry point that includes state tracking and lyric detection, replacing the split between the live path and the simulated pipeline.",
          "An interface around speech recognition so other models — including ones better suited to African languages — can be swapped in and compared fairly.",
        ],
      },
      {
        type: "p",
        text: "The general lesson I keep returning to: the most important design decision in an applied AI system is often not the model. It is where the model’s output is allowed to go, and who gets to say no.",
      },
    ],
  },
  {
    slug: "modelling-the-landlord-who-isnt-there",
    title: "Modelling the landlord who isn’t there",
    summary:
      "Most rental software assumes both sides of a tenancy are on the platform. That assumption fails for many tenants — so Rentra had to represent the relationship before the landlord arrives.",
    period: "2026-06",
    published: "2026-10-27",
    project: "rentra",
    topics: ["Domain modelling", "Backend architecture", "Product engineering"],
    body: [
      {
        type: "p",
        text: "The first version of most rental-management software makes a quiet assumption: the landlord signs up, adds a property, and invites tenants. Every record begins on the landlord’s side. When I started building Rentra in June 2026, I began from that assumption too. The first entities in the repository were users and the passkeys a landlord issues to tenants.",
      },
      {
        type: "p",
        text: "It took about two weeks for the assumption to break. If Rentra only works once a landlord has joined, then a tenant whose landlord never joins gets nothing: no rent history, no reminders, no record of what they have paid. For a product meant to make rental life more orderly, the tenant is often the person who most needs that record.",
      },
      { type: "h2", text: "Two kinds of tenant" },
      {
        type: "p",
        text: "Rentra now distinguishes two kinds of tenant. A managed tenant is linked to a real tenancy: a unit, in a building, in a landlord’s portfolio. An independent tenant is someone whose landlord is not on Rentra. They declare their own rental — a name for the property, the rent, how often it is due, and where it is paid — and Rentra keeps the record on their behalf.",
      },
      {
        type: "p",
        text: "In the code, that self-declared rental is its own entity, a `ShadowRentalRelationship`, rather than a tenancy with some fields left empty. There were three reasons for keeping it separate:",
      },
      {
        type: "list",
        items: [
          "A managed tenancy has an owner on the other side; a self-declared rental has only the tenant’s word. Mixing them in one table would mean every query about rent, arrears, or occupancy has to ask which kind of record it is looking at, and every authorisation rule has to account for a landlord who might not exist.",
          "The information is genuinely different. A self-declared rental records where rent is actually paid — an M-Pesa Paybill, a Till number, or a bank — and allows daily, weekly, or monthly billing cycles, because those are the facts a tenant knows. A managed tenancy gets its structure from the landlord’s records instead.",
          "It keeps uncertainty visible. Each self-declared rental carries a status — unverified, converted, or ended — so nothing about it pretends to be confirmed.",
        ],
      },
      { type: "h2", text: "When the landlord arrives" },
      {
        type: "p",
        text: "The interesting part is what happens when the absent landlord joins. Rentra’s answer is a passkey: a code the landlord generates for a specific unit. A new tenant can redeem it to register directly as a managed tenant. An independent tenant who already has an account can redeem it to link that account to the real unit.",
      },
      {
        type: "p",
        text: "What is not built yet is the step after that: carrying the self-declared rental’s history across into the managed tenancy. The `converted` status exists in the schema, but no code path sets it, and payments are not yet linked to self-declared rentals at all. I would rather leave that gap visible than paper over it, because merging two records about the same rental is where the hard questions live. Which rent amount wins if the two disagree? Does a payment the tenant recorded become confirmed once the landlord can see it, or only once the landlord agrees?",
      },
      { type: "h2", text: "Roles are not ownership" },
      {
        type: "p",
        text: "The second modelling lesson came later, when I added role-based authorisation. Rentra has three roles — tenant, landlord, and caretaker — and the backend enforces them with guards on its controllers, so a modified mobile client cannot grant itself permissions.",
      },
      {
        type: "p",
        text: "Role checks answer one question: is this kind of user allowed to do this kind of thing? They do not answer the question that matters most for a tenant’s data: is this your record? The tenant role permits viewing a tenancy; it must not permit viewing someone else’s. That second check, ownership scoping, is still being built, and it is a different mechanism, because it depends on the relationship between a specific user and a specific record rather than on a label attached to the user.",
      },
      {
        type: "p",
        text: "Caretakers expose the same gap from the other side. A caretaker acts on a landlord’s behalf — but for which buildings? There is not yet an entity that scopes a caretaker to particular properties, so the role exists without the relationship that would make it safe to grant widely.",
      },
      { type: "h2", text: "Two vocabularies" },
      {
        type: "p",
        text: "One smaller decision has held up well. Internally, the backend talks about organisations and rooms; people using the app see a property portfolio and units. The internal names are precise and stable, and the product names are the ones people actually use. Keeping them apart lets the data model be refactored without rewriting the interface, and lets the interface speak plainly without leaking database concepts.",
      },
      { type: "h2", text: "What I took from it" },
      {
        type: "p",
        text: "Domain modelling is mostly the work of noticing which real situations your first schema cannot represent. The absent landlord is not an edge case in the markets Rentra is designed for; I suspect it is closer to the norm. Giving it its own entity, with an explicit status and an explicit path to becoming something else, made the system more honest about what it actually knows.",
      },
      {
        type: "p",
        text: "The repository’s README now lists, line by line, which of these pieces exist in code and which do not. That list has been almost as useful to me as the code itself.",
      },
    ],
  },
  {
    slug: "coverage-is-not-capability",
    title: "Coverage is not capability: what Whisper taught me about African speech",
    summary:
      "A language appearing in a model’s supported list says little about whether the model will work for your speakers. Why Whisper struggled with the speech I needed, and what I now check before building on any speech model.",
    period: "2026-07",
    published: "2026-10-27",
    project: "scribe-ai",
    topics: ["Speech recognition", "Model evaluation", "Low-resource languages"],
    body: [
      {
        type: "p",
        text: "When I built the first version of Scribe AI in July 2026, speech recognition was the part I expected to be easy. OpenAI’s Whisper was open, widely used, and described as multilingual. I ran it locally through Faster-Whisper, wired it into the live pipeline, and moved on to the parts I thought would be hard.",
      },
      {
        type: "p",
        text: "That expectation did not survive the speech I actually needed to handle. On the African languages and accents I cared about, the results were disappointing — not reliable enough to build on. The problem was not a bug in my pipeline. When I went back to the Whisper paper, it turned out to be close to what the model’s own training data predicts.",
      },
      { type: "h2", text: "What “multilingual” meant in practice" },
      {
        type: "p",
        text: "Whisper was trained on 680,000 hours of labelled audio. The paper’s dataset statistics show how that total divides: 438,218 hours of English speech recognition, 125,739 hours of translation into English, and 117,113 hours of speech recognition spread across 96 other languages.",
      },
      {
        type: "p",
        text: "Within that last group the distribution is extremely uneven. Swahili, one of Africa’s most widely spoken languages, is listed with about 5.4 hours of transcribed speech. Dholuo does not appear in Whisper’s language list at all.",
      },
      {
        type: "quote",
        text: "“The amount of pre-training speech recognition data for a given language is very predictive of zero-shot performance on that language.” — Radford et al., the Whisper paper",
      },
      {
        type: "p",
        text: "So the model was behaving exactly as its training implies. The mistake was mine: I had read “multilingual” as a property of the model, when it is really a distribution over languages, and the speech I needed sat in its thin tail.",
      },
      { type: "h2", text: "Wider coverage, the same question" },
      {
        type: "p",
        text: "Whisper is not the only option, and the field has moved. In 2023 Meta released Massively Multilingual Speech (MMS), extending speech recognition to more than 1,100 languages, largely by training on recorded readings of the New Testament — around 32 hours per language. In late 2025 Meta released Omnilingual ASR, which it describes as covering more than 1,600 languages, under the Apache 2.0 licence.",
      },
      {
        type: "p",
        text: "These are real achievements, and they changed what is possible for languages that previously had no speech recognition at all. But they sharpen the lesson rather than retiring it. Meta reports a character error rate below 10 for about 78% of the languages it evaluated with Omnilingual ASR; among low-resource languages, the figure falls to about 36%. Coverage is a list. Capability is a distribution of error rates — usually measured on someone else’s test set.",
      },
      {
        type: "p",
        text: "Three questions now matter more to me than whether a language appears on the list:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Does it work on my speakers? Training and benchmark audio is mostly clean and often read aloud. A sermon, a phone call, or a support conversation is spontaneous, accented, frequently noisy, and often switches language mid-sentence. The only reliable way to know is to measure word or character error rate on a small set of your own recordings, transcribed by hand.",
          "Can I use it for what I am building? Licences differ. The original MMS models were released for non-commercial use only — fine for research, a blocker for a product.",
          "Can it run where my users are? Scribe runs on whatever laptop a church production desk has, with no internet. That rules out large models on modest CPUs, whatever their accuracy. A model that is accurate in a data centre and unusable on the target hardware is not a solution for that setting.",
        ],
      },
      { type: "h2", text: "Where that left Scribe — and me" },
      {
        type: "p",
        text: "For Scribe, the practical response was architectural. Speech recognition sits in its own module, separate from detection and display, so that a better model can be swapped in later; a formal interface for doing that is still on the roadmap. And every detection still passes through a human operator before it reaches the screen. Neither fixes recognition quality, but together they keep the system safe to use while recognition remains imperfect.",
      },
      {
        type: "p",
        text: "For me, the experience raised a larger question. If a developer in Kenya wants to build a voice product for people who speak Dholuo, or Kalenjin, or simply Kenyan-accented English, what do they build it on? Searching for an answer is what led me into African speech and language AI as a field, and eventually to start Sauti Labs. [I have written about that separately](/blog/why-i-started-sauti-labs).",
      },
    ],
    sources: [
      {
        title: "Robust Speech Recognition via Large-Scale Weak Supervision (Radford et al.)",
        publisher: "arXiv",
        url: "https://arxiv.org/abs/2212.04356",
      },
      {
        title: "Whisper language list (tokenizer.py)",
        publisher: "openai/whisper on GitHub",
        url: "https://github.com/openai/whisper/blob/main/whisper/tokenizer.py",
      },
      {
        title: "Scaling Speech Technology to 1,000+ Languages (Pratap et al., MMS)",
        publisher: "arXiv",
        url: "https://arxiv.org/abs/2305.13516",
      },
      {
        title: "Meta’s new open source models speak more than 1,100 languages",
        publisher: "The Decoder",
        url: "https://the-decoder.com/metas-new-open-source-models-speak-more-than-1100-languages/",
      },
      {
        title: "Omnilingual ASR: Open-Source Multilingual Speech Recognition for 1600+ Languages",
        publisher: "arXiv",
        url: "https://arxiv.org/abs/2511.09690",
      },
      {
        title: "Meta’s Omnilingual ASR brings speech recognition to 1,600 languages",
        publisher: "The Decoder",
        url: "https://the-decoder.com/metas-omnilingual-asr-brings-speech-recognition-to-1600-languages/",
      },
    ],
  },
  {
    slug: "why-i-started-sauti-labs",
    title: "Why I started Sauti Labs",
    summary:
      "It began with a speech model that didn’t understand the people I was building for. What I found when I went looking for alternatives, and why I think the distance between African-language research and usable products is worth building a company around.",
    period: "2026-08",
    published: "2026-10-27",
    project: "sauti-labs",
    topics: ["Sauti Labs", "African languages", "Speech AI"],
    body: [
      { type: "p", text: "Sauti Labs started with a practical problem, not a plan to start a company." },
      {
        type: "p",
        text: "In July 2026 I was building Scribe AI, an offline system that listens to a church service and puts the scripture being referenced on screen. Everything in it depends on speech recognition, and for that I used OpenAI’s Whisper. On the African languages and accents the system needed to handle, it disappointed me. [I have written separately about why](/blog/coverage-is-not-capability): Whisper’s training data is overwhelmingly English, Swahili appears with roughly five hours of transcribed speech, and Dholuo — the language that first drew me into this — is not among its languages at all.",
      },
      {
        type: "p",
        text: "So I went looking for something better: a model I could access, integrate, and rely on. That search took longer than I expected, and it changed what I was looking for.",
      },
      { type: "h2", text: "Arriving in a field that already existed" },
      {
        type: "p",
        text: "The first thing I learned is that I was arriving late to serious, sustained work. [Masakhane](https://www.masakhane.io/), a grassroots community whose stated mission is to strengthen and spur NLP research in African languages, has spent years building open datasets, models, and benchmarks. Its MasakhaNER project, for example, released the first large, publicly available named-entity recognition dataset for ten African languages, with the code and models alongside it.",
      },
      {
        type: "p",
        text: "Closer to home, the Maseno Centre for Applied AI is collecting voice data in five Kenyan languages, Dholuo among them, as part of African Next Voices — a multi-country effort, funded mainly by the Gates Foundation, to build speech datasets for African languages. In South Africa, [Lelapa AI](https://lelapa.ai/) builds products directly: its Vulavula platform transcribes and translates contact-centre conversations in languages such as isiZulu and Sesotho, and its researchers have released InkubaLM, an open small language model for five African languages. Global labs have moved too: Meta’s speech models now claim coverage of more than sixteen hundred languages.",
      },
      {
        type: "p",
        text: "This is not a field waiting to be discovered. It has years of difficult, often under-resourced work behind it, and whatever I build stands on that work.",
      },
      { type: "h2", text: "The distance I kept running into" },
      {
        type: "p",
        text: "And yet, as a developer with a concrete problem, I kept running into the same distance. A dataset existed, but not a model trained for my use. A model listed my language, but its error rates on that language were far from what a product needs. A model worked, but its licence ruled out commercial use, or it needed hardware my users did not have. The products that did exist had been built, sensibly, around particular languages and particular markets — which is how products should start, but which left the speech I needed uncovered.",
      },
      {
        type: "p",
        text: "Over time that experience hardened into a conviction. I sometimes put it bluntly:",
      },
      {
        type: "quote",
        text: "Africa doesn’t need another conference paper. It needs products that are accessible to the people and work for them in the most efficient and natural way.",
      },
      {
        type: "p",
        text: "I should be clear about what I mean, because it is easy to read as a criticism of research. It is not. Papers, datasets, and benchmarks are how a field learns what works; without them there would be nothing for products to stand on, and research and product are not opposites. My point is about where the work tends to stop. Knowledge has its largest effect when someone carries it the rest of the way: into a model trained on real speech, served behind an interface a developer can call, packaged so that a business can deploy it, and good enough that the person on the other end stops noticing it is there. That last stretch is often nobody’s job. It is the stretch I want to work on.",
      },
      { type: "h2", text: "Why speech" },
      {
        type: "p",
        text: "I chose speech and voice because I think they will become one of the main ways people interact with AI and with digital services generally — and many African languages are underrepresented in precisely the systems that make those interactions possible.",
      },
      {
        type: "p",
        text: "That underrepresentation is more than a technical inconvenience. It limits what people can build: a developer who wants to create a voice service for their own community — a clinic line, an advisory service for farmers, a support agent for a local business — cannot do it if there is no capable model underneath. It shapes how people reach services and how naturally they can speak to the technology around them. And when I listen to AI-generated speech in African languages today, I often hear the gap: pronunciation that is slightly off, an accent that belongs to someone else, a delivery without the rhythm of a real speaker.",
      },
      {
        type: "p",
        text: "Something I watched recently made the stakes concrete. It was a demonstration of a system that let a person who had lost the ability to speak talk again, in a synthetic version of their own voice. Programmes such as ElevenLabs’ Impact Program now offer this kind of voice restoration to people living with conditions like ALS. What stayed with me was not the technical achievement, impressive as it is, but what was returned to that person. I found myself asking what the equivalent would mean for someone whose language no such system yet speaks.",
      },
      { type: "h2", text: "What I’m building towards" },
      {
        type: "p",
        text: "ElevenLabs is the clearest example I know of carrying research the rest of the way. Its work spans speech generation, voice cloning, dubbing, and conversational agents, and what I find inspiring is less any single model than the range of things its products let people do. I want Sauti Labs to make the same connection between serious technical work and useful products — for languages, accents, and settings that existing systems were not designed around, and with the linguistic, social, and technical challenges those bring.",
      },
      {
        type: "p",
        text: "[Sauti Labs](https://sautilabs.co.ke) is an AI research and products company. Its research teams work across speech, language, language resources, model intelligence, and responsible AI, and its first product, Sauti Cloud, is in early access. The ambition is broader than any one capability — speech recognition, natural speech synthesis, voice cloning and dubbing, conversational systems and voice agents, and the datasets, models, and infrastructure beneath them — and broader than any one language. Dholuo shaped how I came to this work, but the work is meant for African languages generally.",
      },
      {
        type: "p",
        text: "None of that is finished. Those capabilities are a direction, not a description of what exists today, and I am still learning: from the communities and companies that came before, and from the work itself.",
      },
      { type: "h2", text: "Why take the risk" },
      {
        type: "p",
        text: "Speech and language AI is expensive and research-intensive. It needs data, compute, funding, expertise, and time — exactly the things many young Africans who see these problems clearly do not have. I decided to take the risk anyway, because I think the problems are important enough to justify being early and under-resourced, and because I want people like me to be among those who build these systems, not only among those who receive them already designed around other languages and other contexts.",
      },
      {
        type: "p",
        text: "I want African languages to take a full part in whatever AI becomes. That is why Sauti Labs exists.",
      },
    ],
    sources: [
      { title: "Masakhane", publisher: "masakhane.io", url: "https://www.masakhane.io/" },
      {
        title: "MasakhaNER: Named Entity Recognition for African Languages (Adelani et al., 2021)",
        publisher: "Transactions of the ACL",
        url: "https://aclanthology.org/2021.tacl-1.66",
      },
      {
        title: "African languages for AI: the project that’s gathering a huge new dataset (Marivate, Adebara, Wanzare)",
        publisher: "The Conversation",
        url: "https://theconversation.com/african-languages-for-ai-the-project-thats-gathering-a-huge-new-dataset-266371",
      },
      { title: "Lelapa AI and Vulavula", publisher: "lelapa.ai", url: "https://lelapa.ai/" },
      {
        title: "InkubaLM: A small language model for low-resource African languages",
        publisher: "arXiv",
        url: "https://arxiv.org/abs/2408.17024",
      },
      {
        title: "Omnilingual ASR: Open-Source Multilingual Speech Recognition for 1600+ Languages",
        publisher: "arXiv",
        url: "https://arxiv.org/abs/2511.09690",
      },
      {
        title: "Robust Speech Recognition via Large-Scale Weak Supervision (Radford et al.)",
        publisher: "arXiv",
        url: "https://arxiv.org/abs/2212.04356",
      },
      {
        title: "ElevenLabs Impact Program announcement",
        publisher: "ElevenLabs",
        url: "https://elevenlabs.io/blog/impact-program-announcement",
      },
    ],
  },
];

/** Posts ordered by the period of the work they describe, newest first. */
export const posts: BlogPost[] = [...allPosts].sort(
  (a, b) => b.period.localeCompare(a.period) || b.published.localeCompare(a.published),
);

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug);
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** "2026-06" -> "June 2026". */
export function formatPeriod(period: string): string {
  return new Date(`${period}-01T00:00:00Z`).toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** Rough reading time at ~220 words per minute. */
export function readingTime(post: BlogPost): number {
  const text = post.body
    .map((block) => {
      if (block.type === "list") return block.items.join(" ");
      if (block.type === "table") return block.rows.flat().join(" ");
      if (block.type === "code") return block.code;
      return block.text;
    })
    .join(" ");
  return Math.max(1, Math.round(text.split(/\s+/).length / 220));
}

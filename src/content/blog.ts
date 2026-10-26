/**
 * Blog posts. Each post is structured content so it renders consistently and
 * stays fully static. Inline `code` is written with backticks.
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
  /** ISO date, YYYY-MM-DD. */
  date: string;
  /** Project slug the post draws on, for cross-linking. */
  project: string;
  topics: string[];
  body: BlogBlock[];
};

export const posts: BlogPost[] = [
  {
    slug: "when-the-api-chose-my-sampling-design",
    title: "The API chose my sampling design",
    summary:
      "How an undocumented sort order in a public biodiversity API put 97% of my background points in January — and what I changed so that kind of bias gets caught before a model ever sees it.",
    date: "2026-10-27",
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
    date: "2026-10-27",
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
    date: "2026-10-27",
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
];

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

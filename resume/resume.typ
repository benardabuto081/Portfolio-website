// Resume layout. All content comes from resume.json — edit that, not this file.
// Single column, real text, standard headings: chosen for ATS parsing and print.

#let data = json("resume.json")

#let ink = rgb("#1a1a1a")
#let muted = rgb("#555451")
#let accent = rgb("#36553f")
#let rule-color = rgb("#cfcac0")

#set document(
  title: data.name + " — Resume",
  author: data.name,
  keywords: ("Machine Learning Research Engineer", "AI Systems Engineer", "NLP", "Speech Technology"),
)
#set page(paper: "a4", margin: (x: 14mm, top: 11mm, bottom: 10mm))
#set text(font: "Inter", size: 9.4pt, fill: ink, lang: "en", ligatures: false, hyphenate: false)
#set par(leading: 0.5em, spacing: 0.55em)
#show link: set text(fill: accent)

// Section headings are real headings so the PDF outline and tags reflect the structure.
#show heading.where(level: 2): it => block(above: 11pt, below: 5pt, sticky: true)[
  #text(size: 8.8pt, weight: "semibold", tracking: 0.09em, fill: accent, upper(it.body))
  #v(-6pt)
  #line(length: 100%, stroke: 0.5pt + rule-color)
]

#let bullets(items) = list(
  marker: text(fill: muted)[•],
  indent: 1pt,
  body-indent: 6pt,
  spacing: 0.42em,
  ..items,
)

#let dates(d) = text(fill: muted, size: 9pt, d)

// ---------------------------------------------------------------- Header
#block(below: 3pt, text(size: 21pt, weight: "semibold", tracking: -0.01em, data.name))
#block(below: 5pt, text(size: 10.5pt, weight: "medium", fill: accent, data.headline))
#for line in data.contact {
  block(above: 0pt, below: 2.5pt, text(size: 8.6pt, fill: muted, line.map(c =>
    if "url" in c { link(c.url, c.text) } else { c.text }
  ).join([#h(4pt)·#h(4pt)])))
}

// ---------------------------------------------------------------- Summary
== Summary
#data.summary

// ---------------------------------------------------------------- Experience
== Experience
#for job in data.experience {
  block(above: 9pt, below: 3pt, sticky: true)[
    #text(weight: "semibold", job.title), #job.org#if "link" in job [ (#link(job.link.url, job.link.text))]
    #h(1fr) #dates(job.dates)
  ]
  bullets(job.bullets)
}

// ---------------------------------------------------------------- Projects
== Selected Projects
#for p in data.projects {
  block(above: 9pt, below: 2pt, sticky: true)[
    #text(weight: "semibold", p.name) — #p.focus #h(1fr) #dates(p.dates)
  ]
  block(below: 3pt, sticky: true, text(size: 8.6pt, fill: muted)[
    #p.tech #h(4pt)·#h(4pt) #link(p.link.url, p.link.text)
  ])
  bullets(p.bullets)
}

// ---------------------------------------------------------------- Education
== Education & Training
#for e in data.education {
  block(above: 5.5pt, below: 0pt)[
    #text(weight: "semibold", e.programme), #e.org #h(1fr) #dates(e.dates)
    #if "detail" in e [ \ #text(size: 8.8pt, fill: muted, e.detail)]
  ]
}

// ---------------------------------------------------------------- Skills
== Technical Skills
#for s in data.skills {
  block(above: 3.5pt, below: 0pt)[#text(weight: "semibold", s.label + ":") #s.items]
}

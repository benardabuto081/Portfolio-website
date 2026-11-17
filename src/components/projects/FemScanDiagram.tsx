import { Figure } from "./Figure";

const pathways = [
  {
    number: "01",
    title: "Patient history",
    detail: "Demographic, medical, and lifestyle features",
    output: "HPV risk scoring",
  },
  {
    number: "02",
    title: "Cytology image",
    detail: "Cervical cell image input",
    output: "Five-category image classification",
  },
];

const categories = [
  "Superficial-intermediate",
  "Parabasal",
  "Koilocytotic",
  "Dyskeratotic",
  "Metaplastic",
];

export function FemScanDiagram() {
  return (
    <Figure
      label="Fig. F — Model components and exploratory architecture"
      caption="Conceptual diagram based on the repository. It distinguishes the implemented scoring and image-classification paths from the exploratory multimodal architecture; it does not represent a validated clinical workflow or measured model performance."
    >
      <div className="space-y-8">
        <div className="grid gap-4 md:grid-cols-2">
          {pathways.map((pathway) => (
            <div key={pathway.number} className="border border-line bg-surface p-4 sm:p-5">
              <p className="meta text-accent">{pathway.number} / INPUT</p>
              <h3 className="mt-3 font-serif text-2xl">{pathway.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{pathway.detail}</p>
              <div className="my-5 flex justify-center text-muted" aria-hidden="true">↓</div>
              <div className="border border-line bg-panel px-3 py-3">
                <p className="meta text-muted">MODEL COMPONENT</p>
                <p className="mt-1 text-sm font-medium">{pathway.output}</p>
              </div>
              {pathway.number === "02" ? (
                <div className="mt-4">
                  <p className="meta mb-2 text-muted">CLASSIFICATION LABELS</p>
                  <ul className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <li key={category} className="border border-line px-2 py-1 text-xs text-muted">
                        {category}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-xs leading-relaxed text-muted">
                    Grad-CAM can generate an image overlay associated with the classifier output.
                  </p>
                </div>
              ) : (
                <p className="mt-3 text-xs leading-relaxed text-muted">
                  The scorer uses patient-history variables; it does not directly analyse HPV laboratory results.
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-center text-muted" aria-hidden="true">↓</div>

        <div className="border border-dashed border-accent/70 bg-panel p-4 sm:p-5">
          <p className="meta text-accent">EXPLORATORY MODEL</p>
          <h3 className="mt-2 font-serif text-2xl">Multimodal architecture</h3>
          <p className="mt-2 max-w-[70ch] text-sm leading-relaxed text-muted">
            The repository also defines a model that combines image features and clinical tabular
            features, with an optional colposcopy image branch.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="border border-line bg-surface p-3">
              <p className="meta text-muted">OUTPUT 01</p>
              <p className="mt-1 text-sm font-medium">Progression risk</p>
            </div>
            <div className="border border-line bg-surface p-3">
              <p className="meta text-muted">OUTPUT 02</p>
              <p className="mt-1 text-sm font-medium">Current cancer probability</p>
            </div>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-muted">
            This architecture is an implementation exploration, not evidence of a trained,
            clinically validated model.
          </p>
        </div>

        <div className="border-l-2 border-accent px-4 py-3">
          <p className="meta text-muted">Intended product direction</p>
          <p className="mt-2 font-serif text-xl leading-snug">
            Bring relevant screening information into a workflow that supports clinical review.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            The diagram does not imply that all components were integrated into one operational system.
          </p>
        </div>
      </div>
    </Figure>
  );
}

export type PipelineStage = {
  id: string;
  label: string;
  text: string;
};

export const pipelineStages: PipelineStage[] = [
  {
    id: "data",
    label: "Data",
    text: "Useful machine learning begins with understanding the data: how it was collected, what it represents, what is missing, and how its limitations affect the questions we can ask.",
  },
  {
    id: "experiments",
    label: "Experiments",
    text: "Experiments turn ideas into testable questions. I am interested in clear hypotheses, controlled comparisons, reproducible workflows, and understanding why a method succeeds or fails.",
  },
  {
    id: "models",
    label: "Models",
    text: "Models are the computational core, but implementing them is only part of the work. Their behavior depends on the data, training process, assumptions, and environment in which they operate.",
  },
  {
    id: "evaluation",
    label: "Evaluation",
    text: "Evaluation asks whether a system actually works for the task and setting it was designed for. That means appropriate metrics, honest comparisons, careful validation, and transparent limitations.",
  },
  {
    id: "systems",
    label: "Systems",
    text: "Systems engineering connects individual components into something dependable. Interfaces, data flows, resource constraints, reproducibility, and failure handling all matter.",
  },
  {
    id: "applications",
    label: "Applications",
    text: "The final question is how technical capabilities become useful in practice. I am interested in the gap between promising research results and systems that address real problems.",
  },
];

export const researchInterests: string[] = [
  "Machine learning research engineering",
  "AI systems and ML infrastructure",
  "African speech and language technology",
  "Automatic speech recognition and text-to-speech",
  "Multilingual and low-resource NLP",
  "Dataset and language-resource development",
  "Model evaluation and reproducibility",
  "Applied machine learning and geospatial research",
];

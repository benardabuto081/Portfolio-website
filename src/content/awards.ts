const femscanAward = {
  slug: "femscan",
  title: "FemScan",
  subtitle: "AI-assisted cervical health screening and decision support",
  event: "Chuka University AI for Health Innovation Challenge",
  institution: "Chuka University",
  date: "February 2026",
  placement: "3rd Place · Second Runners-Up",
  recognition:
    "Awarded third place among 17 competing teams and more than 100 participants.",
  summary:
    "A multidisciplinary healthcare technology project exploring how machine learning could support cervical health screening through cytology image analysis and patient-history risk assessment.",
  image: "/images/awards/femscan-team.png",
  imageAlt:
    "The FemScan team at the Chuka University AI for Health Innovation Challenge award ceremony.",
  presentationImage: "/images/awards/femscan-award-presentation.jpg",
  presentationImageAlt:
    "FemScan award presentation at the Chuka University AI for Health Innovation Challenge.",
  presentationImageCaption:
    "FemScan at the Chuka University AI for Health Innovation Challenge. Photograph: Chuka University.",
  institutionalCoverage: {
    title: "Students Showcase AI-Driven Health Innovations",
    href: "https://fast.chuka.ac.ke/students-showcase-ai-driven-health-innovations-as-hackathon-ends/",
    imageHref: "https://fast.chuka.ac.ke/wp-content/uploads/2026/03/DSC_2153.jpg",
  },
  source: {
    label: "CerviScan on GitHub",
    href: "https://github.com/Donitero/CerviScan",
  },
  links: [
    {
      label: "Cervical image classifier",
      href: "https://github.com/Donitero/CerviScan/blob/main/models/cervical_classifier.py",
    },
    {
      label: "Multimodal classifier",
      href: "https://github.com/Donitero/CerviScan/blob/main/models/multimodal_classifier.py",
    },
    {
      label: "HPV risk scorer",
      href: "https://github.com/Donitero/CerviScan/blob/main/models/hpv_risk_scorer.py",
    },
    {
      label: "Grad-CAM implementation",
      href: "https://github.com/Donitero/CerviScan/blob/main/models/gradcam.py",
    },
    {
      label: "Image model training",
      href: "https://github.com/Donitero/CerviScan/blob/main/scripts/train_cervical.py",
    },
    {
      label: "Multimodal training",
      href: "https://github.com/Donitero/CerviScan/blob/main/scripts/train_multimodal.py",
    },
  ],
  stack: [
    "Python",
    "PyTorch",
    "EfficientNetV2-S",
    "EfficientNet-B0",
    "Streamlit",
    "SHAP",
    "Grad-CAM",
    "scikit-learn",
    "XGBoost-ready scoring",
  ],
  question: [
    "Cervical cancer prevention depends on identifying risk and detecting precancerous changes early enough for appropriate clinical follow-up. That work can involve different kinds of information: a patient's medical and lifestyle history, cervical cytology, and other clinical observations.",
    "FemScan was conceived around the question of whether machine learning could help bring some of these signals into a more coherent screening and decision-support experience. The ambition was not to replace clinical judgement, but to explore how image analysis and patient risk assessment might support the screening process.",
    "The project was developed as a multidisciplinary healthcare technology challenge. Its technical repository, named CerviScan, contains several related modelling components that explore different parts of this problem.",
  ],
  approach: [
    "The implementation explored multiple modelling paths rather than one fully integrated, clinically validated pipeline. A cervical cytology image classifier uses EfficientNetV2-S to classify images into five cell categories. A Grad-CAM implementation can produce visual overlays showing image regions associated with a model prediction.",
    "A separate HPV risk scorer accepts patient-history features such as age, smoking, sexual history, previous cervical biopsies, and time since the last Pap smear. It can use a supplied model or fall back to a heuristic scoring function. It does not directly analyse laboratory HPV test or genotype results.",
    "The repository also contains a separate cancer risk scorer and an exploratory multimodal architecture. The multimodal model combines image features with tabular clinical information and can optionally include a colposcopy image branch. Its two output heads are designed to estimate progression risk and current cancer probability.",
    "The training code defines pipelines for the image and multimodal models. The multimodal training script can generate synthetic clinical data when a clinical CSV is absent. The existence of training code and model architecture should not be interpreted as evidence that a model was successfully trained, clinically evaluated, or deployed.",
  ],
  components: [
    {
      name: "Cervical cytology classifier",
      detail:
        "An EfficientNetV2-S image-classification model built around five SIPaKMeD cell categories: superficial-intermediate, parabasal, koilocytotic, dyskeratotic, and metaplastic. These are cytology categories, not direct cancer diagnoses.",
      state: "implemented",
      stateLabel: "Model code present",
    },
    {
      name: "Grad-CAM visualisation",
      detail:
        "Generates heatmap overlays to illustrate image regions associated with the classifier's output. These visualisations are exploratory explanations, not proof of clinical reasoning.",
      state: "implemented",
      stateLabel: "Implementation present",
    },
    {
      name: "HPV risk scorer",
      detail:
        "Uses patient-history features to estimate HPV acquisition risk. Supports a supplied joblib model and SHAP explanations, with a heuristic fallback when trained weights are unavailable.",
      state: "implemented",
      stateLabel: "Scoring code present",
    },
    {
      name: "Cancer risk scorer",
      detail:
        "A separate risk-scoring component using demographic, medical-history, and lifestyle features. It is not evidence of a validated cervical-cancer prediction model.",
      state: "implemented",
      stateLabel: "Scoring code present",
    },
    {
      name: "Multimodal classifier",
      detail:
        "An exploratory architecture combining cytology image features, clinical tabular features, and an optional colposcopy image branch, with separate progression-risk and current-cancer output heads.",
      state: "in-progress",
      stateLabel: "Exploratory architecture",
    },
    {
      name: "Streamlit application",
      detail:
        "A prototype interface organised around screening and scoring, image capture and analysis, and clinical report presentation.",
      state: "partial",
      stateLabel: "Prototype interface",
    },
  ],
  contribution: [
    "I contributed to the product concept, machine-learning solution design, and technical development. The work involved translating a broad healthcare challenge into a set of technical components that could be explored independently and potentially brought together into a screening-support experience.",
    "The technical direction covered cervical cytology image classification, visual explanation, patient-history risk scoring, and the exploration of a multimodal architecture. The project was multidisciplinary, and the competition result belongs to the team rather than being an individual award.",
  ],
  decisions: [
    {
      title: "Treat different clinical signals distinctly",
      body:
        "Cytology images and patient-history variables are different data modalities. The repository explores separate components for them before considering how image and tabular representations might be combined.",
    },
    {
      title: "Distinguish cell classification from diagnosis",
      body:
        "The image classifier predicts among five cytology cell categories. Those categories should not be presented as definitive diagnoses of cervical cancer.",
    },
    {
      title: "Make model outputs inspectable",
      body:
        "Grad-CAM and SHAP-related code provide ways to inspect aspects of model behaviour. Such explanations can aid investigation, but they do not establish clinical validity.",
    },
    {
      title: "Separate prototypes from evidence",
      body:
        "A model definition, a training script, and a working clinical system are different things. The project's implementation status needs to be described according to what the repository demonstrates.",
    },
  ],
  currentState: {
    summary:
      "CerviScan contains prototype application code, image and risk-scoring components, training pipelines, and an exploratory multimodal model architecture. The repository does not establish clinical validation, proven diagnostic performance, or deployment in a real screening setting.",
    notes: [
      "The HPV risk scorer uses patient-history variables; it is not a direct HPV laboratory-test analyser.",
      "The five image-classifier outputs are cytology cell categories, not cancer diagnoses.",
      "The multimodal training script can generate synthetic clinical data when the expected clinical CSV is unavailable.",
      "The demo preparation script creates synthetic placeholder images, visual overlays, and heuristic demo scores.",
      "The available code does not, by itself, establish successful model training, independent evaluation, or clinical validation.",
    ],
  },
  nextQuestions: [
    "How should representative, appropriately consented clinical datasets be collected and governed for this kind of research?",
    "How does the cytology classifier perform on an independently held-out dataset, with class-wise metrics and clinically relevant error analysis?",
    "Can the multimodal architecture demonstrate measurable value over its individual image and tabular branches?",
    "How should clinical experts participate in evaluating model outputs and deciding whether a system is suitable for further investigation?",
  ],
  imageCaption:
    "The FemScan team at the Chuka University AI for Health Innovation Challenge, where the project received third place.",
} as const;

export const awards = [femscanAward] as const;

export type Award = (typeof femscanAward);

const QUESTIONS = [
  {
    id: 0,
    question: "Do you multitask while attending an online meeting?",
    options: [
      {
        name: "oh yes, definitly",
        id: "yes",
      },
      {
        name: "nope, never",
        id: "never",
      },
      {
        name: "maybe",
        id: "maybe",
      },
    ],
  },
  {
    id: 1,
    question: "Did you enjoy working from home?",
    options: [
      {
        name: "Oh yes!",
        id: "yes",
      },
      {
        name: "Big No",
        id: "no",
      },
    ],
  },
  {
    id: 2,
    question: "Which work model is best for you?",
    options: [
      {
        name: "Fully Remote",
        id: "remote",
      },
      {
        name: "Working From The Office",
        id: "in_office",
      },
      {
        name: "Hybrid Work",
        id: "hybrid",
      },
    ],
  },
];

const SHEET_MAP = [
  {
    id: 0,
    cells: [
      { id: "yes", cell: "A3" },
      { id: "never", cell: "B3" },
      { id: "no", cell: "C3" },
    ],
  },
];
export { QUESTIONS, SHEET_MAP };

const QUESTIONS = [
  {
    id: 1,
    question: "Do you multitask while attending an online meeting?",
    options: [
      {
        name: "Oh yes, definitly",
        id: "yes",
      },
      {
        name: "Nope, never",
        id: "never",
      },
      {
        name: "Maybe",
        id: "maybe",
      },
    ],
  },
  {
    id: 2,
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
    id: 3,
    question: "Which work model is best for you?",
    options: [
      {
        name: "Fully remote",
        id: "remote",
      },
      {
        name: "Hybrid work",
        id: "hybrid",
      },
      {
        name: "Working from the office",
        id: "in_office",
      },
    ],
  },
];

const SHEET_MAP = {
  1: { yes: "A3", never: "B3", maybe: "C3" },
  2: { yes: "A7", no: "B7" },
  3: { remote: "A11", in_office: "B11", hybrid: "C11" },
};
export { QUESTIONS, SHEET_MAP };

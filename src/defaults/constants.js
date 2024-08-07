export const siteName = "Coach&Couch";
export const siteDomain = "https://coach-and-couch.vercel.app";
export const baseName = "/marketplace-project";

export const settings = ["Profile", "Settings", "Logout"];

export const ratingOptions = [
  { title: "5 зірок", rating: 5 },
  { title: "4 зірки", rating: 4 },
  { title: "3 зірки", rating: 3 },
];

export const priceOptions = [
  { title: "до 10$", price: 10, id: 1 },
  { title: "від 10$ до 20$", price: 20, id: 2 },
  { title: "від 20$", price: 50, id: 3 },
];

export const hobbyOptions = [
  { title: "Садівництво", hobby: "Gardening" },
  { title: "Фотографія", hobby: "Photography" },
  { title: "Кулінарія", hobby: "Cooking" },
];

export const languageProficiencyLevels = {
  en: [
    { value: "beginner", label: "Beginner" },
    { value: "elementary", label: "Elementary" },
    { value: "intermediate", label: "Intermediate" },
    { value: "upperIntermediate", label: "Upper Intermediate" },
    { value: "advanced", label: "Advanced" },
    { value: "proficient", label: "Proficient" },
  ],
  ua: [
    { value: "beginner", label: "Початківець" },
    { value: "elementary", label: "Початковий" },
    { value: "intermediate", label: "Середній" },
    { value: "upperIntermediate", label: "Вище середнього" },
    { value: "advanced", label: "Просунутий" },
    { value: "proficient", label: "Вільне володіння" },
  ],
};

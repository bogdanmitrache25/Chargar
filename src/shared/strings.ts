export const normalizeString = (str: string) => {
  return str
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
};

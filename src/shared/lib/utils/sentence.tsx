import { faker } from "@faker-js/faker";

export const generateSentence = (count: number): string => {
  return Array.from({ length: count }, () => faker.word.noun()).join(" ");
}

export const generateWordsArray = (count: number): string[] => {
  return Array.from({ length: count }, () => faker.word.noun());
}
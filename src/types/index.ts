// types.ts
export interface Team {
  id: number;
  name: string;
  points: number;
  color: string;
}

export interface Question {
  id: string;
  title: string;
  description: string;
  points: number;
  options: string[];
  correctAnswer: number | string;  // Can be either index for multiple choice or string for open questions
  used: boolean;
  imageDescription?: string;  // Optional description for images
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  questions: Question[];
}

export interface QuizConfig {
  aspectRatio: string;
  defaultPointsDeduction: number;
}

export interface QuizData {
  config: QuizConfig;
  teams: Team[];
  categories: Category[];
}

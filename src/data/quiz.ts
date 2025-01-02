// src/data/quiz.ts
import { QuizData } from '../types';

export const quizData: QuizData = {
  config: {
    aspectRatio: "16:9",
    defaultPointsDeduction: 0.5,
    title: "Quiz Title"
  },
  teams: [
    { id: 1, name: "Team 1", points: 0, color: "#FF9ECD" },
{ id: 2, name: "Team 2", points: 0, color: "#90EE90" },
  ],
  categories: [
    
    {
      "id": "AnimalQuiz",
      "name": "Template: Animal Knowledge",
      "icon": "🦁",
      "color": "#FF8C00",
      "questions": [
      {
      "id": "template1",
      "title": "Farm Sound",
      "description": "What sound does a cow make?",
      "points": 100,
      "options": [],
      "correctAnswer": "moo",
      "used": false,
      "imageDescription": ""
      },
      {
      "id": "template2",
      "title": "Pet Choice",
      "description": "Which of these is a common house pet?",
      "points": 150,
      "options": ["cat", "lion", "elephant", "shark"],
      "correctAnswer": "cat",
      "used": false,
      "imageDescription": ""
      },
      {
      "id": "template3",
      "title": "Bird Count",
      "description": "How many wings does a bird have?",
      "points": 200,
      "options": [],
      "correctAnswer": "2",
      "used": false,
      "imageDescription": ""
      },
      {
      "id": "template4",
      "title": "Animal Home",
      "description": "Where does a fish live?",
      "points": 250,
      "options": ["water", "sky", "trees", "desert"],
      "correctAnswer": "water",
      "used": false,
      "imageDescription": ""
      },
      {
      "id": "template5",
      "title": "Animal Food",
      "description": "What food do rabbits love to eat?",
      "points": 300,
      "options": [],
      "correctAnswer": "carrots",
      "used": false,
      "imageDescription": ""
      }
      ]
      }
  ]
};
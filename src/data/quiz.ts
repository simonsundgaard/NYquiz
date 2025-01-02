// src/data/quiz.ts
import { QuizData } from '../types';

export const quizData: QuizData = {
  config: {
    aspectRatio: "16:9",
    defaultPointsDeduction: 0.5,
  },
  teams: [
    { id: 1, name: "Mikala", points: 0, color: "#FF9ECD" },
{ id: 2, name: "Morten", points: 0, color: "#90EE90" },
{ id: 3, name: "Gustav", points: 0, color: "#ADD8E6" },
{ id: 4, name: "Katrine", points: 0, color: "#FFB6C1" },
{ id: 5, name: "Josefine", points: 0, color: "#F4C095" }
  ],
  categories: [
    {
      
      id: "melocadier",
      name: "Melocadier",
      icon: "🎹🎬",
      color: "#1a237e",
      questions: [
        {
          id: "melo1",
          title: "Gæt melododien",
          description: "Svar hurtigst. Forkerte svar giver halvdelen af værdien i minus", // This would be your actual image path
          points: 100,
          options: [], // No options - open question
          correctAnswer: "Last christmas",
          used: false,
          imageDescription: ""
        },
        {
          id: "melo2",
          title: "Gæt melododien",
          description: "Svar hurtigst. Forkerte svar giver halvdelen af værdien i minus \n Sang A", // This would be your actual image path
          points: 50,
          options: [], // No options - open question
          correctAnswer: "Harry potter",
          used: false,
          imageDescription: ""
        },
        {
          id: "melo3",
          title: "Gæt melododien",
          description: "Svar hurtigst. Forkerte svar giver halvdelen af værdien i minus", // This would be your actual image path
          points: 150,
          options: [], // No options - open question
          correctAnswer: "Happy birthsday to you",
          used: false,
          imageDescription: ""
        },
        {
          id: "melo4",
          title: "Gæt melododien",
          description: "Svar hurtigst. Forkerte svar giver halvdelen af værdien i minus", // This would be your actual image path
          points: 200,
          options: [], // No options - open question
          correctAnswer: "My heart will go on (titanic)",
          used: false,
          imageDescription: ""
        },
        {
          id: "melo5",
          title: "Gæt melododien",
          description: "Svar hurtigst. Forkerte svar giver halvdelen af værdien i minus", // This would be your actual image path
          points: 250,
          options: [], // No options - open question
          correctAnswer: "Hey jude",
          used: false,
          imageDescription: ""
        },
        {
          id: "melo6",
          title: "Gæt melododien",
          description: "Svar hurtigst. Forkerte svar giver halvdelen af værdien i minus", // This would be your actual image path
          points: 300,
          options: [], // No options - open question
          correctAnswer: "YMCA",
          used: false,
          imageDescription: ""
        },
      ]
    },
    {
      
      id: "bedstenyheder",
      name: "Verdens bedste nyheder",
      icon: "📰",
      color: "#4d2600",
      questions: [
        {
          id: "vb1",
          title: "Hvilket land i verden sætter flest solceller op?",
          description: "Vi starter i klimaets tegn. Den grønne omstilling i energisektoren har ikke været til at overse i år, og mange lande hopper med på den grønne bølge. ", // This would be your actual image path
          points: 100,
          options: ["Kenya", "Indien", "Kina"], // No options - open question
          correctAnswer: 2,
          used: false,
          imageDescription: "Scene from the movie where two people stand at the front of a large ship"
        },
        {
          id: "vb2",
          title: "Hvad er det, der er blevet forbudt at reklamere for i Haag?",
          description: "I 2024 lavede den hollandske by Haag som den første by i verden et historisk reklameforbud. Forbuddet blev vedtaget, fordi reklamerne er til for stor skade på befolkningen.", // This would be your actual image path
          points: 150,
          options: ["Transfedtsyrer", "Fossile brændstoffer", "Nikotin"], // No options - open question
          correctAnswer: 1,
          used: false,
          imageDescription: "Scene from the movie where two people stand at the front of a large ship"
        },
        {
          id: "vb3",
          title: "Hvilket dyr har fået en elskovskur i Grækenland?",
          description: "Ikke alle dyr har lige gode muligheder for at yngle, blandt andet på grund af os mennesker, klimaforandringer og natur, der forsvinder. Men en særlig art har fået deres egen private strand i Grækenland, og det har tændt for romantikken – nu formerer de sig som aldrig før.", // This would be your actual image path
          points: 200,
          options: ["Den uægte karette-skildpadde", "Rævehajen", "Strandkrabben"], // No options - open question
          correctAnswer: 0,
          used: false,
          imageDescription: "Scene from the movie where two people stand at the front of a large ship"
        },
        {
          id: "vb4",
          title: "Hvilke af disse dyr blev i 2024 ikke længere kategoriseret som truet?",
          description: "Biodiversiteten er under pres. Men hver dag bliver der arbejdet hårdt for at redde de truede dyr.", // This would be your actual image path
          points: 150,
          options: ["Saigaantilopen", "Pandaen", "Den ibiriske los"], // No options - open question
          correctAnswer: 2,
          used: false,
          imageDescription: "Scene from the movie where two people stand at the front of a large ship"
        },
        {
          id: "vb5",
          title: "Hvor mange liv blev i gennemsnit reddet per minut i 2024 ved hjælp af vacciner på verdensplan?",
          description: "Vacciner redder liv. Det fik Verdenssundhedsorganisationen, WHO, til at lave en strategi for 50 år siden, som skulle få flere vacciner ud i verden, og det har virket.", // This would be your actual image path
          points: 200,
          options: ["1 liv blev reddet i minuttet", "3 liv blev reddet i minuttet", "6 liv blev reddet i minuttet"], // No options - open question
          correctAnswer: 2,
          used: false,
          imageDescription: "Scene from the movie where two people stand at the front of a large ship"
        },
        {
          id: "vb6",
          title: "Hvilket erhverv har nu næsten lige så mange kvinder som mænd på verdensplan?",
          description: "Der er også sket fremskridt i ligestillingens tegn. Der er nemlig et erhverv, som så længe, vi kan huske, har været mandsdomineret, men i dag ser det anderledes ud.", // This would be your actual image path
          points: 200,
          options: ["Forskere", "Piloter", "Politiere"], // No options - open question
          correctAnswer: 0,
          used: false,
          imageDescription: "Scene from the movie where two people stand at the front of a large ship"
        },
      ]
    },
    {
      id: "hammerslag",
      name: "Hammerslag på Lolland",
      icon: "🏠",
      color: "#1b5e20",
      questions: [
        {
          id: "g1",
          title: "Vestergade 15E",
          description: "/images/vestergade.jpeg", // This would be your actual image path
          points: 300,
          options: [],
          correctAnswer: "9.500.000 kr og 4.188 i ejerudgift",
          used: false,
          imageDescription: ""
        },
        {
          id: "g2",
          title: "Vestermark",
          description: "/images/vestermark.jpeg", // This would be your actual image path
          points: 300,
          options: [],
          correctAnswer: "1.395.000 og 1200 kr i ejerudgift",
          used: false,
          imageDescription: ""
        },
        {
          id: "g3",
          title: "Egholmvej",
          description: "/images/egholmvej.jpeg", // This would be your actual image path
          points: 300,
          options: [],
          correctAnswer: "1.850.000 og 1516 kr i ejerudgift",
          used: false,
          imageDescription: ""
        },
        {
          id: "g4",
          title: "Viemosevej 89",
          description: "/images/viemosevej.jpeg", // This would be your actual image path
          points: 300,
          options: [],
          correctAnswer: "495.000 og 1095 kr i ejerudgift",
          used: false,
          imageDescription: ""
        },
      ]
    },
    {
      id: "skilz",
      name: "Skilzz",
      icon: "🤹‍♀️",
      color: "#75740c",
      questions: [
        {
          id: "s1",
          title: "Rotér gummiringe længst",
          description: "", // This would be your actual image path
          points: 300,
          options: [],
          correctAnswer: "",
          used: false,
          imageDescription: ""
        },
        {
          id: "s2",
          title: "Stabel kopper og samel igen",
          description: "", // This would be your actual image path
          points: 300,
          options: [],
          correctAnswer: "",
          used: false,
          imageDescription: ""
        },
        {
          id: "s3",
          title: "Gæt en blevægt",
          description: "", // This would be your actual image path
          points: 300,
          options: [],
          correctAnswer: "",
          used: false,
          imageDescription: ""
        },
        {
          id: "s4",
          title: "Stå på ét ben",
          description: "", // This would be your actual image path
          points: 300,
          options: [],
          correctAnswer: "",
          used: false,
          imageDescription: ""
        },
        {
          id: "s5",
          title: "Kom tættest på målet med en bil",
          description: "Turnering", // This would be your actual image path
          points: 500,
          options: [],
          correctAnswer: "",
          used: false,
          imageDescription: ""
        },
      ]
    },
    {
      id: "kapitalismen",
      name: "Kapitalismen",
      icon: "🤑",
      color: "#000000",
      questions: [
        {
          id: "ka1",
          title: "Holder huden sund",
          description: "", // This would be your actual image path
          points: 100,
          options: [],
          correctAnswer: "Sanex",
          used: false,
          imageDescription: ""
        },
        {
          id: "ka2",
          title: "Når du er sulten for sjov",
          description: "", // This would be your actual image path
          points: 150,
          options: [],
          correctAnswer: "KIMs",
          used: false,
          imageDescription: ""
        },
        {
          id: "ka3",
          title: "Gør det, du er bedst til - det gør vi",
          description: "", // This would be your actual image path
          points: 200,
          options: [],
          correctAnswer: "Danske Bank",
          used: false,
          imageDescription: ""
        },
        {
          id: "ka4",
          title: "Sig navnet!",
          description: "", // This would be your actual image path
          points: 250,
          options: [],
          correctAnswer: "Oma",
          used: false,
          imageDescription: ""
        },
        {
          id: "ka5",
          title: "Where energy is opportunity",
          description: "", // This would be your actual image path
          points: 300,
          options: [],
          correctAnswer: "Saudi Aramco",
          used: false,
          imageDescription: ""
        },
      ]
    },
    {
      id: "værd",
      name: "Hva' det værd?",
      icon: "💰",
      color: "#800000",
      questions: [
        {
        id: "27500",
        title: "Hva' det værd?",
        description: "/images/27500.jpeg",
        points: 100,
        options: [],
        correctAnswer: "27500 kr",
        used: false,
        imageDescription: ""
        },
        {
        id: "1",
        title: "Hva' det værd?",
        description: "/images/1.jpeg",
        points: 100,
        options: [],
        correctAnswer: "1 kr",
        used: false,
        imageDescription: ""
        },
        // Continuing with same pattern for all images
        {
        id: "10",
        title: "Hva' det værd?",
        description: "/images/10.jpeg",
        points: 100,
        options: [],
        correctAnswer: "10 kr",
        used: false,
        imageDescription: ""
        },
        {
        id: "30",
        title: "Hva' det værd?",
        description: "/images/30.jpeg",
        points: 100,
        options: [],
        correctAnswer: "30 kr",
        used: false,
        imageDescription: ""
        },
        {
        id: "50",
        title: "Hva' det værd?",
        description: "/images/50.jpeg",
        points: 100,
        options: [],
        correctAnswer: "50 kr",
        used: false,
        imageDescription: ""
        },
        {
        id: "75",
        title: "Hva' det værd?",
        description: "/images/75.jpeg",
        points: 100,
        options: [],
        correctAnswer: "75 kr",
        used: false,
        imageDescription: ""
        },
        {
        id: "99",
        title: "Hva' det værd?",
        description: "/images/99.jpeg",
        points: 100,
        options: [],
        correctAnswer: "99 kr",
        used: false,
        imageDescription: ""
        },
        {
        id: "123",
        title: "Hva' det værd?",
        description: "/images/123.jpeg",
        points: 100,
        options: [],
        correctAnswer: "123 kr",
        used: false,
        imageDescription: ""
        },
        {
        id: "125",
        title: "Hva' det værd?",
        description: "/images/125.jpeg",
        points: 100,
        options: [],
        correctAnswer: "125 kr",
        used: false,
        imageDescription: ""
        },
        {
        id: "200",
        title: "Hva' det værd?",
        description: "/images/200.jpeg",
        points: 100,
        options: [],
        correctAnswer: "200 kr",
        used: false,
        imageDescription: ""
        },
        {
        id: "400",
        title: "Hva' det værd?",
        description: "/images/400.jpeg",
        points: 100,
        options: [],
        correctAnswer: "400 kr",
        used: false,
        imageDescription: ""
        },
        {
        id: "600",
        title: "Hva' det værd?",
        description: "/images/600.jpeg",
        points: 100,
        options: [],
        correctAnswer: "600 kr",
        used: false,
        imageDescription: ""
        },
        {
        id: "1000",
        title: "Hva' det værd?",
        description: "/images/1000.jpeg",
        points: 100,
        options: [],
        correctAnswer: "1000 kr",
        used: false,
        imageDescription: ""
        },
        {
        id: "2200",
        title: "Hva' det værd?",
        description: "/images/2200.jpeg",
        points: 100,
        options: [],
        correctAnswer: "2200 kr",
        used: false,
        imageDescription: ""
        },
        {
        id: "8250",
        title: "Hva' det værd?",
        description: "/images/8250.jpeg",
        points: 100,
        options: [],
        correctAnswer: "8250 kr",
        used: false,
        imageDescription: ""
        },
        {
        id: "11600",
        title: "Hva' det værd?",
        description: "/images/11600.jpeg",
        points: 100,
        options: [],
        correctAnswer: "11600 kr",
        used: false,
        imageDescription: ""
        }
        ]
    },
    {
      id: "ai",
      name: "KI",
      icon: "🤖",
      color: "#03878a",
      questions: [
        {
        id: "q1",
        title: "Tæl kopper på bordet",
        description: "Der står 8 kopper på bordet. Hvor mange er der?",
        points: 100,
        options: [],
        correctAnswer: "8",
        used: false,
        imageDescription: ""
        },
        {
        id: "q2",
        title: "Farven på bilen",
        description: "Hvilken farve har den røde bil?",
        points: 100,
        options: [],
        correctAnswer: "rød",
        used: false,
        imageDescription: ""
        },
        {
        id: "q3",
        title: "Regne stykke",
        description: "Hvad er 5 + 5?",
        points: 100,
        options: [],
        correctAnswer: "10",
        used: false,
        imageDescription: ""
        },
        {
        id: "q4",
        title: "Dagens dato",
        description: "Hvilken dag er det i dag?",
        points: 100,
        options: [],
        correctAnswer: "tirsdag",
        used: false,
        imageDescription: ""
        },
        {
        id: "q5",
        title: "Bogstaver",
        description: "Hvor mange bogstaver er der i ordet 'Hund'?",
        points: 100,
        options: [],
        correctAnswer: "4",
        used: false,
        imageDescription: ""
        }
        ]
    },
  ]
};
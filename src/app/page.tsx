"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Trophy,
  Plus,
  Minus,
  ArrowLeft,
  Eye,
  RotateCcw,
  PlayCircle,
  Pencil,
  Upload,
  Download,
  Save,
  X,
} from "lucide-react";
import { quizData as initialQuizData } from "../data/quiz";
import { Category, Question, Team, QuizData } from "../types";
import { strings } from "../config/strings";
import EditMode from "@/components/EditMode";

const QuestionContent = ({
  description,
  imageDescription,
}: {
  description: string;
  imageDescription?: string;
}) => {
  return (
    <>
      {description.split("\n").map((part, index) => {
        if (part.startsWith("/images/")) {
          const imagePath = part.startsWith("/") ? part.slice(1) : part;
          return (
            <div key={index} className="mb-4 relative w-full aspect-video">
              <Image
                src={`/${imagePath}`}
                alt={imageDescription || "Quiz image"}
                fill
                className="object-contain rounded-lg"
              />
            </div>
          );
        }
        return (
          part.trim() && (
            <p key={index} className="text-xl mb-4 text-gray-100">
              {part}
            </p>
          )
        );
      })}
    </>
  );
};

export default function QuizApp() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentView, setCurrentView] = useState<"categories" | "question">(
    "categories"
  );
  const [currentQuestion, setCurrentQuestion] = useState<
    (Question & { categoryId: string }) | null
  >(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [quizData, setQuizData] = useState<QuizData>(initialQuizData);

  useEffect(() => {
    try {
      const savedState = localStorage.getItem("quizState");
      if (savedState) {
        setQuizData(JSON.parse(savedState));
      }
    } catch (error) {
      console.error("Error loading from localStorage:", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("quizState", JSON.stringify(quizData));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }, [quizData]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === "Space" && !isEditMode) {
        event.preventDefault();
        if (currentView === "question") {
          if (!showAnswer) {
            setShowAnswer(true);
          } else {
            handleBackToCategories();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentView, showAnswer, isEditMode]);

  const handleSaveQuizData = (newData: QuizData) => {
    setQuizData(newData);
    setIsEditMode(false);
  };

  const getNextQuestion = (categoryId: string): Question | undefined => {
    const category = quizData.categories.find((cat) => cat.id === categoryId);
    if (!category) return undefined;

    const unusedQuestions = category.questions
      .filter((q) => !q.used)
      .sort((a, b) => a.points - b.points);
    return unusedQuestions[0];
  };

  const handleCategoryClick = (categoryId: string) => {
    const nextQuestion = getNextQuestion(categoryId);
    if (nextQuestion) {
      setCurrentQuestion({ ...nextQuestion, categoryId });
      setCurrentView("question");
      setShowAnswer(false);
    }
  };

  const markQuestionAsUsed = () => {
    if (!currentQuestion) return;

    setQuizData((prev) => ({
      ...prev,
      categories: prev.categories.map((category) => {
        if (category.id === currentQuestion.categoryId) {
          return {
            ...category,
            questions: category.questions.map((q) =>
              q.id === currentQuestion.id ? { ...q, used: true } : q
            ),
          };
        }
        return category;
      }),
    }));
  };

  const updateTeamPoints = (
    teamId: number,
    points: number,
    isDeduction = false
  ) => {
    setQuizData((prev) => ({
      ...prev,
      teams: prev.teams.map((team) => {
        if (team.id === teamId) {
          const pointChange = isDeduction
            ? -Math.floor(
                points * initialQuizData.config.defaultPointsDeduction
              )
            : points;
          return {
            ...team,
            points: team.points + pointChange,
          };
        }
        return team;
      }),
    }));
  };

  const handleBackToCategories = () => {
    if (currentQuestion) {
      markQuestionAsUsed();
    }
    setCurrentView("categories");
    setCurrentQuestion(null);
    setShowAnswer(false);
  };

  const resetQuiz = () => {
    if (
      window.confirm(
        "Are you sure you want to reset the quiz? This will clear all progress."
      )
    ) {
      setQuizData((prev) => ({
        ...prev,
        teams: prev.teams.map((team) => ({ ...team, points: 0 })),
        categories: prev.categories.map((category) => ({
          ...category,
          questions: category.questions.map((q) => ({ ...q, used: false })),
        })),
      }));
      setCurrentView("categories");
      setCurrentQuestion(null);
      setShowAnswer(false);
    }
  };
  return (
    <main className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold">{quizData.config.title}</h1>
        </div>
        {currentView === "question" && !isEditMode && (
          <p className="text-gray-400">{strings.header.spacebarHint}</p>
        )}
      </div>
      {currentView === "categories" && !isEditMode && (
        <div className="flex space-x-2 absolute top-4 right-4">
          <Button variant="ghost" onClick={resetQuiz}>
            <RotateCcw className="mr-2 h-4 w-4" /> Reset point and used
            questions
          </Button>
          <Button variant="ghost" onClick={() => setIsEditMode(true)}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Button>
        </div>
      )}

      {/* Main Content */}
      {isEditMode ? (
        <EditMode
          quizData={quizData}
          onSave={handleSaveQuizData}
          onCancel={() => setIsEditMode(false)}
        />
      ) : (
        <div className="mb-8">
          {currentView === "categories" ? (
            <div className="relative max-w-6xl mx-auto">
              <div className="grid grid-cols-4 gap-8 px-4">
                {quizData.categories.map((category) => {
                  const remainingQuestions = category.questions.filter(
                    (q) => !q.used
                  ).length;
                  return (
                    <Card
                      key={category.id}
                      className="p-12 cursor-pointer hover:bg-gray-700 transition-colors text-white"
                      style={{ backgroundColor: `${category.color}33` }}
                      onClick={() =>
                        remainingQuestions > 0 &&
                        handleCategoryClick(category.id)
                      }
                    >
                      <div className="text-center">
                        <div className="text-7xl mb-6">{category.icon}</div>
                        <h2 className="text-3xl font-bold mb-4">
                          {category.name}
                        </h2>
                        <div className="text-xl">
                          {remainingQuestions}{" "}
                          {strings.categories.remainingQuestions}
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              {currentQuestion && (
                <Card className="p-8 bg-gray-800 text-white">
                  <div className="flex justify-between mb-4">
                    <Button
                      variant="ghost"
                      onClick={handleBackToCategories}
                      className="text-white"
                    >
                      <ArrowLeft className="mr-2" /> {strings.buttons.back}
                    </Button>
                    <div className="text-2xl font-bold">
                      {currentQuestion.points} {strings.question.points}
                    </div>
                  </div>

                  <h2 className="text-3xl font-bold mb-4">
                    {currentQuestion.title}
                  </h2>

                  <QuestionContent
                    description={currentQuestion.description}
                    imageDescription={currentQuestion.imageDescription}
                  />

                  {currentQuestion.options.length > 0 && (
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {currentQuestion.options.map((option, index) => (
                        <div
                          key={index}
                          className={`p-4 border-2 rounded-lg text-center text-white ${
                            showAnswer &&
                            index === currentQuestion.correctAnswer
                              ? "border-green-500 bg-green-500/20"
                              : "border-gray-600"
                          }`}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex justify-center mb-8">
                    <Button
                      variant="outline"
                      onClick={() => setShowAnswer(true)}
                      disabled={showAnswer}
                    >
                      <Eye className="mr-2" /> {strings.buttons.reveal}
                    </Button>
                  </div>

                  {showAnswer &&
                    typeof currentQuestion.correctAnswer === "string" && (
                      <div className="mt-4 p-4 border-2 border-green-500 bg-green-500/20 rounded-lg">
                        <h3 className="font-bold mb-2">
                          {strings.question.correctAnswer}
                        </h3>
                        <p>{currentQuestion.correctAnswer}</p>
                      </div>
                    )}
                </Card>
              )}
            </div>
          )}
        </div>
      )}

      {/* Teams Footer */}
      {!isEditMode && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4">
          <div className="flex justify-around items-center max-w-6xl mx-auto">
            {quizData.teams.map((team) => (
              <div
                key={team.id}
                className="flex items-center space-x-4 rounded-lg p-3"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
              >
                <Trophy style={{ color: team.color }} />

                <div
                  className="flex flex-col cursor-pointer hover:opacity-80"
                  onClick={() => {
                    const newPoints = prompt(
                      `Enter new points for ${team.name}:`,
                      team.points.toString()
                    );
                    if (newPoints !== null) {
                      const points = parseInt(newPoints);
                      if (!isNaN(points)) {
                        setQuizData((prev) => ({
                          ...prev,
                          teams: prev.teams.map((t) =>
                            t.id === team.id ? { ...t, points } : t
                          ),
                        }));
                      }
                    }
                  }}
                >
                  <div className="font-bold">{team.name}</div>
                  <div className="text-2xl">{team.points}</div>
                </div>

                {currentView === "question" && !isEditMode && (
                  <div className="flex space-x-3">
                    <Button
                      variant="ghost"
                      size="default"
                      className="text-green-500 hover:text-green-400 p-1"
                      onClick={() =>
                        updateTeamPoints(team.id, currentQuestion?.points || 0)
                      }
                    >
                      <Plus size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="default"
                      className="text-red-500 hover:text-red-400 p-1"
                      onClick={() =>
                        updateTeamPoints(
                          team.id,
                          currentQuestion?.points || 0,
                          true
                        )
                      }
                    >
                      <Minus size={16} />
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

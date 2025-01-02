'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, Plus, Minus, ArrowLeft, Eye, RotateCcw } from 'lucide-react';
import { quizData } from '../data/quiz';
import { Category, Question, Team } from '../types';
import { strings } from '../config/strings';

const QuestionContent = ({ description, imageDescription }: { description: string, imageDescription?: string }) => {
  return (
    <>
      {description.split('\n').map((part, index) => {
        if (part.startsWith('/images/')) {
          const imagePath = part.startsWith('/') ? part.slice(1) : part;
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
        return part.trim() && <p key={index} className="text-xl mb-4 text-gray-100">{part}</p>;
      })}
    </>
  );
};

export default function QuizApp() {
  const [currentView, setCurrentView] = useState<'categories' | 'question'>('categories');
  const [currentQuestion, setCurrentQuestion] = useState<(Question & { categoryId: string }) | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [teams, setTeams] = useState<Team[]>(quizData.teams);
  const [categories, setCategories] = useState<Category[]>(quizData.categories);

  // Load saved state on mount
  useEffect(() => {
    try {
      const savedState = localStorage.getItem('quizState');
      if (savedState) {
        const { teams: savedTeams, categories: savedCategories } = JSON.parse(savedState);
        setTeams(savedTeams);
        setCategories(savedCategories);
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
  }, []);

  // Save state when teams or categories change
  useEffect(() => {
    try {
      localStorage.setItem('quizState', JSON.stringify({ teams, categories }));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [teams, categories]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault();

        if (currentView === 'question') {
          if (!showAnswer) {
            setShowAnswer(true);
          } else {
            handleBackToCategories();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [currentView, showAnswer]);

  const getNextQuestion = (categoryId: string): Question | undefined => {
    const category = categories.find(cat => cat.id === categoryId);
    if (!category) return undefined;
    
    const unusedQuestions = category.questions
      .filter(q => !q.used)
      .sort((a, b) => a.points - b.points);
    return unusedQuestions[0];
  };

  const handleCategoryClick = (categoryId: string) => {
    const nextQuestion = getNextQuestion(categoryId);
    if (nextQuestion) {
      setCurrentQuestion({ ...nextQuestion, categoryId });
      setCurrentView('question');
      setShowAnswer(false);
    }
  };

  const markQuestionAsUsed = () => {
    if (!currentQuestion) return;
    
    setCategories(prevCategories => {
      return prevCategories.map(category => {
        if (category.id === currentQuestion.categoryId) {
          return {
            ...category,
            questions: category.questions.map(q => 
              q.id === currentQuestion.id ? { ...q, used: true } : q
            )
          };
        }
        return category;
      });
    });
  };

  const updateTeamPoints = (teamId: number, points: number, isDeduction = false) => {
    setTeams(prevTeams => {
      return prevTeams.map(team => {
        if (team.id === teamId) {
          const pointChange = isDeduction ? 
            -Math.floor(points * quizData.config.defaultPointsDeduction) : 
            points;
          return {
            ...team,
            points: team.points + pointChange
          };
        }
        return team;
      });
    });
  };

  const handleBackToCategories = () => {
    if (currentQuestion) {
      markQuestionAsUsed();
    }
    setCurrentView('categories');
    setCurrentQuestion(null);
    setShowAnswer(false);
  };

  const resetQuiz = () => {
    if (window.confirm('Are you sure you want to reset the quiz? This will clear all progress.')) {
      setTeams(quizData.teams);
      setCategories(quizData.categories);
      setCurrentView('categories');
      setCurrentQuestion(null);
      setShowAnswer(false);
      localStorage.removeItem('quizState');
    }
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">{strings.header.title}</h1>
        {currentView === 'question' && (
          <p className="text-gray-400">{strings.header.spacebarHint}</p>
        )}
      </div>

      {/* Main Content */}
      <div className="mb-8">
        {currentView === 'categories' ? (
          <div className="relative max-w-6xl mx-auto">
            <div className="grid grid-cols-4 gap-8 px-4">
              {categories.map(category => {
                const remainingQuestions = category.questions.filter(q => !q.used).length;
                return (
                  <Card 
                    key={category.id}
                    className="p-12 cursor-pointer hover:bg-gray-700 transition-colors text-white"
                    style={{ backgroundColor: `${category.color}33` }}
                    onClick={() => remainingQuestions > 0 && handleCategoryClick(category.id)}
                  >
                    <div className="text-center">
                      <div className="text-7xl mb-6">{category.icon}</div>
                      <h2 className="text-3xl font-bold mb-4">{category.name}</h2>
                      <div className="text-xl">
                        {remainingQuestions} {strings.categories.remainingQuestions}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
            {/* Reset button positioned absolutely */}
            <div className="absolute bottom-4 right-4">
              <Button
                variant="outline"
                className="text-black hover:text-white border-white hover:bg-white/20"
                onClick={resetQuiz}
              >
                <RotateCcw className="mr-2 h-4 w-4" /> Reset Quiz
              </Button>
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

                <h2 className="text-3xl font-bold mb-4">{currentQuestion.title}</h2>
                
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
                          showAnswer && index === currentQuestion.correctAnswer
                            ? 'border-green-500 bg-green-500/20'
                            : 'border-gray-600'
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
                    className="text-black hover:text-white border-white hover:bg-white/20"
                  >
                    <Eye className="mr-2" /> {strings.buttons.reveal}
                  </Button>
                </div>

                {showAnswer && typeof currentQuestion.correctAnswer === 'string' && (
                  <div className="mt-4 p-4 border-2 border-green-500 bg-green-500/20 rounded-lg">
                    <h3 className="font-bold mb-2">{strings.question.correctAnswer}</h3>
                    <p>{currentQuestion.correctAnswer}</p>
                  </div>
                )}
              </Card>
            )}
          </div>
        )}
      </div>

      {/* Teams Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4">
        <div className="flex justify-around items-center max-w-6xl mx-auto">
          {teams.map(team => (
            <div 
              key={team.id}
              className="flex items-center space-x-4"
            >
              <Trophy style={{ color: team.color }} />
              <div>
                <div className="font-bold">{team.name}</div>
                <div className="text-2xl">{team.points}</div>
              </div>
              {currentView === 'question' && (
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    className="text-green-500 hover:text-green-400"
                    onClick={() => updateTeamPoints(team.id, currentQuestion?.points || 0)}
                  >
                    <Plus />
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-red-500 hover:text-red-400"
                    onClick={() => updateTeamPoints(team.id, currentQuestion?.points || 0, true)}
                  >
                    <Minus />
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Plus, Save, Trash2, X, Upload, Download } from "lucide-react";
import { Category, Question, Team, QuizData } from "@/types";
import { strings } from "../config/strings";

const saveCategoriesAndQuestions = (quiz: QuizData) => {
  const data = JSON.stringify(
    {
      categories: quiz.categories,
      config: quiz.config,
    },
    null,
    2
  );
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "quiz-categories.json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const loadCategoriesAndQuestions = async (
  file: File
): Promise<Partial<QuizData>> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        resolve(data);
      } catch (err) {
        reject(new Error("Invalid quiz file"));
      }
    };
    reader.onerror = () => reject(new Error("Error reading file"));
    reader.readAsText(file);
  });
};

const saveTeamState = (quiz: QuizData) => {
  const data = JSON.stringify({ teams: quiz.teams }, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "quiz-teams.json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const loadTeamState = async (file: File): Promise<{ teams: Team[] }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (data.teams) {
          resolve(data);
        } else {
          reject(new Error("No team data found"));
        }
      } catch (err) {
        reject(new Error("Invalid team file"));
      }
    };
    reader.onerror = () => reject(new Error("Error reading file"));
    reader.readAsText(file);
  });
};

const generateNewId = (existingIds: string[]): string => {
  let newId;
  do {
    newId = crypto.randomUUID();
  } while (existingIds.includes(newId));
  return newId;
};

const regenerateIds = (categories: Category[]): Category[] => {
  const existingIds = categories.flatMap((cat) => [
    cat.id,
    ...cat.questions.map((q) => q.id),
  ]);

  return categories.map((category) => ({
    ...category,
    id: generateNewId(existingIds),
    questions: category.questions.map((question) => ({
      ...question,
      id: generateNewId(existingIds),
    })),
  }));
};

const handleCategoryImport = async (
  file: File,
  editedData: QuizData,
  onUpdate: (data: QuizData) => void
) => {
  try {
    const data = await loadCategoriesAndQuestions(file);
    if (data.categories) {
      const newCategories = regenerateIds(data.categories);
      const newData = {
        ...editedData,
        categories: [...editedData.categories, ...newCategories],
      };
      onUpdate(newData);
    }
  } catch (err) {
    alert("Error loading quiz file");
  }
};

interface EditModeProps {
  quizData: QuizData;
  onSave: (data: QuizData) => void;
  onCancel: () => void;
}

const EditMode: React.FC<EditModeProps> = ({ quizData, onSave, onCancel }) => {
  const [editedData, setEditedData] = useState<QuizData>(
    structuredClone(quizData)
  );
  const [editedTitle, setEditedTitle] = useState(
    editedData.config?.title || strings.header.title
  );

  const generateRandomColor = () => {
    const colors = [
      "#FF6B6B", // Red
      "#4ECDC4", // Teal
      "#45B7D1", // Blue
      "#96CEB4", // Sage
      "#FFEEAD", // Yellow
      "#D4A5A5", // Pink
      "#9B6B9B", // Purple
      "#77DD77", // Green
      "#FFB347", // Orange
      "#B19CD9", // Lavender
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const scrollToElement = (id: string) => {
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const addCategory = () => {
    const newCategory: Category = {
      id: crypto.randomUUID(),
      name: "New Category",
      icon: "📝",
      color: generateRandomColor(),
      questions: [],
    };

    setEditedData((prevData) => ({
      ...prevData,
      categories: [...prevData.categories, newCategory],
    }));

    // Ensure DOM is updated before scrolling
    setTimeout(() => {
      scrollToElement(`category-${newCategory.id}`);
    }, 0);
  };

  const updateCategory = (categoryId: string, updates: Partial<Category>) => {
    setEditedData({
      ...editedData,
      categories: editedData.categories.map((cat) =>
        cat.id === categoryId ? { ...cat, ...updates } : cat
      ),
    });
  };

  const deleteCategory = (categoryId: string) => {
    setEditedData({
      ...editedData,
      categories: editedData.categories.filter((cat) => cat.id !== categoryId),
    });
  };

  const addQuestion = (categoryId: string) => {
    const newQuestion: Question = {
      id: crypto.randomUUID(),
      title: "New Question",
      description: "",
      points: 100,
      options: [],
      correctAnswer: "",
      used: false,
    };

    setEditedData({
      ...editedData,
      categories: editedData.categories.map((cat) =>
        cat.id === categoryId
          ? { ...cat, questions: [...cat.questions, newQuestion] }
          : cat
      ),
    });
    scrollToElement(`question-${newQuestion.id}`);
  };

  const updateQuestion = (
    categoryId: string,
    questionId: string,
    updates: Partial<Question>
  ) => {
    setEditedData({
      ...editedData,
      categories: editedData.categories.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              questions: cat.questions.map((q) =>
                q.id === questionId ? { ...q, ...updates } : q
              ),
            }
          : cat
      ),
    });
  };

  const deleteQuestion = (categoryId: string, questionId: string) => {
    setEditedData({
      ...editedData,
      categories: editedData.categories.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              questions: cat.questions.filter((q) => q.id !== questionId),
            }
          : cat
      ),
    });
  };

  const addTeam = () => {
    const newTeam: Team = {
      id: editedData.teams.length + 1,
      name: "New Team",
      points: 0,
      color: generateRandomColor(),
    };
    setEditedData({
      ...editedData,
      teams: [...editedData.teams, newTeam],
    });
  };

  const updateTeam = (teamId: number, updates: Partial<Team>) => {
    setEditedData({
      ...editedData,
      teams: editedData.teams.map((team) =>
        team.id === teamId ? { ...team, ...updates } : team
      ),
    });
  };

  const deleteTeam = (teamId: number) => {
    setEditedData({
      ...editedData,
      teams: editedData.teams.filter((team) => team.id !== teamId),
    });
  };

  const deleteAllCategories = () => {
    if (
      window.confirm(
        "Are you sure you want to delete all categories? This cannot be undone."
      )
    ) {
      setEditedData((prev) => ({
        ...prev,
        categories: [],
      }));
    }
  };

  return (
    <div>
      <div className="bg-gray-900 border-b border-gray-800 p-4">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex items-center">
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="text-2xl font-bold bg-transparent border-b border-gray-600 focus:outline-none"
            />
          </div>
          <h2 className="text-2xl font-bold">Edit Quiz</h2>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 p-4 z-50">
        <div className="max-w-6xl mx-auto flex items-center space-x-2">
          <div className="flex-1 flex items-center">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                onClick={() => saveCategoriesAndQuestions(editedData)}
              >
                <Download className="mr-2 h-4 w-4" />
                Export Categories
              </Button>
              <label className="cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  accept=".json"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      await handleCategoryImport(
                        file,
                        editedData,
                        setEditedData
                      );
                      setEditedData((currentData) => {
                        //onSave(currentData);
                        return currentData;
                      });
                    }
                  }}
                />
                <Button variant="outline" asChild>
                  <span>
                    <Upload className="mr-2 h-4 w-4" />
                    Import Categories
                  </span>
                </Button>
              </label>
            </div>

            <div className="border-l border-gray-600 mx-4 h-6" />

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                onClick={() => saveTeamState(editedData)}
              >
                <Download className="mr-2 h-4 w-4" />
                Export Teams
              </Button>
              <label className="cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  accept=".json"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      try {
                        const data = await loadTeamState(file);
                        setEditedData((prev) => {
                          const newData = {
                            ...prev,
                            teams: data.teams,
                          };
                          //onSave(newData);
                          return newData;
                        });
                      } catch (err) {
                        alert("Error loading team file");
                      }
                    }
                  }}
                />
                <Button variant="outline" asChild>
                  <span>
                    <Upload className="mr-2 h-4 w-4" />
                    Import Teams
                  </span>
                </Button>
              </label>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="cancel" onClick={onCancel}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button
              variant="confirm"
              onClick={() =>
                onSave({
                  ...editedData,
                  config: {
                    ...editedData.config,
                    title: editedTitle,
                  },
                })
              }
            >
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>

      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">Teams</h3>
          <div className="flex space-x-2">
            <Button
              variant="destructive"
              onClick={() => {
                if (
                  window.confirm("Are you sure you want to delete all teams?")
                ) {
                  setEditedData((prev) => ({
                    ...prev,
                    teams: [],
                  }));
                }
              }}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete All Teams
            </Button>
            <Button onClick={addTeam} variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Add Team
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {editedData.teams.map((team) => (
            <Card key={team.id} className="p-4 space-y-4">
              <div className="flex justify-between items-center">
                <input
                  type="text"
                  value={team.name}
                  onChange={(e) =>
                    updateTeam(team.id, { name: e.target.value })
                  }
                  className="bg-transparent border-b border-gray-600 focus:outline-none"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteTeam(team.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <input
                type="color"
                value={team.color}
                onChange={(e) => updateTeam(team.id, { color: e.target.value })}
                className="w-full h-8"
              />
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">Categories</h3>
          <div className="flex space-x-2">
            <Button variant="destructive" onClick={deleteAllCategories}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete All Categories
            </Button>
            <Button onClick={addCategory} variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          </div>
        </div>

        {editedData.categories.map((category) => (
          <Card
            key={category.id}
            id={`category-${category.id}`}
            className="p-6 space-y-4"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  value={category.icon}
                  onChange={(e) =>
                    updateCategory(category.id, { icon: e.target.value })
                  }
                  className="w-16 bg-transparent border-b border-gray-600 focus:outline-none"
                />
                <input
                  type="text"
                  value={category.name}
                  onChange={(e) =>
                    updateCategory(category.id, { name: e.target.value })
                  }
                  className="bg-transparent border-b border-gray-600 focus:outline-none"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={category.color}
                  onChange={(e) =>
                    updateCategory(category.id, { color: e.target.value })
                  }
                  className="w-8 h-8"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteCategory(category.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold">Questions</h4>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addQuestion(category.id)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Question
                </Button>
              </div>

              {category.questions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.questions.map((question) => (
                    <Card
                      key={question.id}
                      id={`question-${question.id}`}
                      className="p-4 space-y-2 bg-gray-300"
                    >
                      <div className="flex justify-between items-center">
                        <input
                          type="text"
                          value={question.title}
                          onChange={(e) =>
                            updateQuestion(category.id, question.id, {
                              title: e.target.value,
                            })
                          }
                          className="flex-1 bg-transparent border-b border-gray-600 focus:outline-none w-full mr-2"
                          placeholder="Question title"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            deleteQuestion(category.id, question.id)
                          }
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <textarea
                        value={question.description}
                        onChange={(e) =>
                          updateQuestion(category.id, question.id, {
                            description: e.target.value,
                          })
                        }
                        className="w-full bg-transparent rounded p-2 text-sm"
                        rows={4}
                        placeholder="Question description"
                      />
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={question.correctAnswer}
                          onChange={(e) =>
                            updateQuestion(category.id, question.id, {
                              correctAnswer: e.target.value,
                            })
                          }
                          className="flex-1 bg-transparent border-b border-gray-600 focus:outline-none"
                          placeholder="Correct answer"
                        />
                        <input
                          type="number"
                          value={question.points}
                          onChange={(e) =>
                            updateQuestion(category.id, question.id, {
                              points: parseInt(e.target.value),
                            })
                          }
                          className="w-12 bg-transparent rounded border-b border-gray-600 focus:outline-none"
                          placeholder="Points"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <h5 className="text-sm font-semibold">Options</h5>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const newOptions = [...question.options, ""];
                              updateQuestion(category.id, question.id, {
                                options: newOptions,
                              });
                            }}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="space-y-1">
                          {question.options.map((option, index) => (
                            <div key={index} className="flex space-x-1">
                              <input
                                type="text"
                                value={option}
                                onChange={(e) => {
                                  const newOptions = [...question.options];
                                  newOptions[index] = e.target.value;
                                  updateQuestion(category.id, question.id, {
                                    options: newOptions,
                                  });
                                }}
                                className="flex-1 bg-transparent border-b border-gray-600 focus:outline-none text-sm"
                                placeholder={`Option ${index + 1}`}
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  const newOptions = question.options.filter(
                                    (_, i) => i !== index
                                  );
                                  updateQuestion(category.id, question.id, {
                                    options: newOptions,
                                  });
                                }}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center p-4 text-gray-500">
                  No questions yet
                </div>
              )}
            </div>
          </Card>
        ))}
      </section>
      <div className="h-20" />
    </div>
  );
};

export default EditMode;

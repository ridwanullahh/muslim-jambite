
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Clock, Award, RotateCcw } from 'lucide-react';
import { Quiz, QuizQuestion } from '@/types/sdk';

interface QuizCardProps {
  quiz: Quiz;
  onComplete?: (score: number, answers: number[]) => void;
}

export const QuizCard = ({ quiz, onComplete }: QuizCardProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(quiz.timeLimit || 0);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    const score = calculateScore();
    setShowResults(true);
    onComplete?.(score, selectedAnswers);
  };

  const calculateScore = () => {
    let correct = 0;
    quiz.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct += question.points;
      }
    });
    return correct;
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setTimeLeft(quiz.timeLimit || 0);
  };

  if (showResults) {
    const score = calculateScore();
    const totalPoints = quiz.questions.reduce((sum, q) => sum + q.points, 0);
    const percentage = Math.round((score / totalPoints) * 100);
    const passed = percentage >= quiz.passingScore;

    return (
      <Card>
        <CardHeader className="text-center">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${passed ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
            {passed ? (
              <Award className={`w-8 h-8 ${passed ? 'text-green-600' : 'text-red-600'}`} />
            ) : (
              <RotateCcw className={`w-8 h-8 ${passed ? 'text-green-600' : 'text-red-600'}`} />
            )}
          </div>
          <CardTitle className={passed ? 'text-green-600' : 'text-red-600'}>
            {passed ? 'Congratulations!' : 'Better Luck Next Time'}
          </CardTitle>
          <CardDescription>
            You scored {score} out of {totalPoints} points ({percentage}%)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {passed ? `You passed! (Required: ${quiz.passingScore}%)` : `You need ${quiz.passingScore}% to pass`}
            </p>
          </div>
          
          <div className="space-y-3">
            {quiz.questions.map((question, index) => {
              const userAnswer = selectedAnswers[index];
              const isCorrect = userAnswer === question.correctAnswer;
              
              return (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-sm font-medium text-left">{question.question}</p>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${isCorrect ? 'bg-green-500' : 'bg-red-500'}`}>
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 text-left">
                    Your answer: {question.options[userAnswer] || 'No answer'}
                  </p>
                  {!isCorrect && (
                    <p className="text-xs text-green-600 text-left">
                      Correct: {question.options[question.correctAnswer]}
                    </p>
                  )}
                  {question.explanation && (
                    <p className="text-xs text-gray-500 mt-1 text-left">{question.explanation}</p>
                  )}
                </div>
              );
            })}
          </div>

          <Button onClick={restartQuiz} className="w-full">
            <RotateCcw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;
  const question = quiz.questions[currentQuestion];

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-left">{quiz.title}</CardTitle>
          {quiz.timeLimit && (
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
            </div>
          )}
        </div>
        <CardDescription className="text-left">
          Question {currentQuestion + 1} of {quiz.questions.length}
        </CardDescription>
        <Progress value={progress} className="w-full" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-4 text-left">{question.question}</h3>
          <div className="space-y-2">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-3 text-left rounded-lg border transition-colors ${
                  selectedAnswers[currentQuestion] === index
                    ? 'border-brand-primary bg-brand-primary/10'
                    : 'border-gray-200 dark:border-gray-700 hover:border-brand-primary/50'
                }`}
              >
                <span className="font-medium mr-3">{String.fromCharCode(65 + index)}.</span>
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          <Button
            onClick={handleNextQuestion}
            disabled={selectedAnswers[currentQuestion] === undefined}
          >
            {currentQuestion === quiz.questions.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

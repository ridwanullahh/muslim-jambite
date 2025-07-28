import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { BlogPostSelector } from './BlogPostSelector';
import { Plus, Edit, Trash2, MessageSquare, HelpCircle } from 'lucide-react';
import { Quiz, Poll, QuizQuestion, PollOption } from '@/types/sdk';

export const AdminQuizPollManager = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [polls, setPolls] = useState<Poll[]>([]);
  const [activeTab, setActiveTab] = useState('quizzes');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [selectedPoll, setSelectedPoll] = useState<Poll | null>(null);

  // Quiz form state
  const [quizForm, setQuizForm] = useState({
    title: '',
    postIds: [] as string[],
    questions: [] as QuizQuestion[],
    passingScore: 70,
    timeLimit: 0,
    attempts: 3
  });

  // Poll form state
  const [pollForm, setPollForm] = useState({
    question: '',
    postIds: [] as string[],
    options: [] as PollOption[],
    expiresAt: ''
  });

  const [newQuestion, setNewQuestion] = useState({
    question: '',
    type: 'multiple_choice' as 'multiple_choice' | 'true_false' | 'short_answer' | 'essay',
    options: ['', '', '', ''],
    correctAnswer: 0,
    correctAnswers: [] as number[],
    explanation: '',
    points: 1
  });

  const [newPollOption, setNewPollOption] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      console.log('Loading quizzes and polls...');
      // Placeholder for actual SDK calls
      setQuizzes([]);
      setPolls([]);
    } catch (error) {
      console.error('Error loading quiz/poll data:', error);
    }
  };

  const handleCreateQuiz = async () => {
    try {
      const quizData = {
        ...quizForm,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      console.log('Creating quiz:', quizData);
      setQuizzes(prev => [...prev, quizData as Quiz]);
      setIsDialogOpen(false);
      resetQuizForm();
    } catch (error) {
      console.error('Error creating quiz:', error);
    }
  };

  const handleCreatePoll = async () => {
    try {
      const pollData = {
        ...pollForm,
        id: Date.now().toString(),
        totalVotes: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        options: pollForm.options.map((option, index) => ({
          id: `option-${index}`,
          text: option.text,
          votes: 0,
          percentage: 0
        }))
      };

      console.log('Creating poll:', pollData);
      setPolls(prev => [...prev, pollData as Poll]);
      setIsDialogOpen(false);
      resetPollForm();
    } catch (error) {
      console.error('Error creating poll:', error);
    }
  };

  const addQuestion = () => {
    if (newQuestion.question.trim()) {
      let question: QuizQuestion;
      
      switch (newQuestion.type) {
        case 'multiple_choice':
          if (newQuestion.options.every(opt => opt.trim())) {
            question = {
              id: Date.now().toString(),
              question: newQuestion.question,
              type: 'multiple_choice',
              options: newQuestion.options,
              correctAnswer: newQuestion.correctAnswer,
              explanation: newQuestion.explanation,
              points: newQuestion.points
            };
          } else {
            return;
          }
          break;
        case 'true_false':
          question = {
            id: Date.now().toString(),
            question: newQuestion.question,
            type: 'true_false',
            options: ['True', 'False'],
            correctAnswer: newQuestion.correctAnswer,
            explanation: newQuestion.explanation,
            points: newQuestion.points
          };
          break;
        case 'short_answer':
          question = {
            id: Date.now().toString(),
            question: newQuestion.question,
            type: 'short_answer',
            correctAnswer: newQuestion.options[0], // Use first option as correct answer
            explanation: newQuestion.explanation,
            points: newQuestion.points
          };
          break;
        case 'essay':
          question = {
            id: Date.now().toString(),
            question: newQuestion.question,
            type: 'essay',
            explanation: newQuestion.explanation,
            points: newQuestion.points
          };
          break;
        default:
          return;
      }

      setQuizForm(prev => ({
        ...prev,
        questions: [...prev.questions, question]
      }));

      setNewQuestion({
        question: '',
        type: 'multiple_choice',
        options: ['', '', '', ''],
        correctAnswer: 0,
        correctAnswers: [],
        explanation: '',
        points: 1
      });
    }
  };

  const addPollOption = () => {
    if (newPollOption.trim()) {
      const option: PollOption = {
        id: Date.now().toString(),
        text: newPollOption,
        votes: 0,
        percentage: 0
      };

      setPollForm(prev => ({
        ...prev,
        options: [...prev.options, option]
      }));

      setNewPollOption('');
    }
  };

  const resetQuizForm = () => {
    setQuizForm({
      title: '',
      postIds: [],
      questions: [],
      passingScore: 70,
      timeLimit: 0,
      attempts: 3
    });
    setSelectedQuiz(null);
  };

  const resetPollForm = () => {
    setPollForm({
      question: '',
      postIds: [],
      options: [],
      expiresAt: ''
    });
    setSelectedPoll(null);
  };

  const renderQuestionForm = () => {
    switch (newQuestion.type) {
      case 'multiple_choice':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {newQuestion.options.map((option, index) => (
                <div key={index}>
                  <Label>Option {index + 1}</Label>
                  <Input
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...newQuestion.options];
                      newOptions[index] = e.target.value;
                      setNewQuestion(prev => ({ ...prev, options: newOptions }));
                    }}
                    placeholder={`Option ${index + 1}`}
                  />
                </div>
              ))}
            </div>
            <div>
              <Label>Correct Answer</Label>
              <Select
                value={newQuestion.correctAnswer.toString()}
                onValueChange={(value) => setNewQuestion(prev => ({ ...prev, correctAnswer: parseInt(value) }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {newQuestion.options.map((_, index) => (
                    <SelectItem key={index} value={index.toString()}>
                      Option {index + 1}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      case 'true_false':
        return (
          <div>
            <Label>Correct Answer</Label>
            <Select
              value={newQuestion.correctAnswer.toString()}
              onValueChange={(value) => setNewQuestion(prev => ({ ...prev, correctAnswer: parseInt(value) }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">True</SelectItem>
                <SelectItem value="1">False</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );
      case 'short_answer':
        return (
          <div>
            <Label>Correct Answer</Label>
            <Input
              value={newQuestion.options[0]}
              onChange={(e) => {
                const newOptions = [...newQuestion.options];
                newOptions[0] = e.target.value;
                setNewQuestion(prev => ({ ...prev, options: newOptions }));
              }}
              placeholder="Enter the correct answer"
            />
          </div>
        );
      case 'essay':
        return (
          <div className="p-4 bg-gray-50 rounded">
            <p className="text-sm text-gray-600">
              Essay questions will be manually graded. Students will provide written responses.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  const renderQuizDialog = () => (
    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>
          {selectedQuiz ? 'Edit Quiz' : 'Create New Quiz'}
        </DialogTitle>
      </DialogHeader>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Quiz Title</Label>
            <Input
              value={quizForm.title}
              onChange={(e) => setQuizForm(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter quiz title"
            />
          </div>
          <div>
            <Label>Blog Posts</Label>
            <BlogPostSelector
              selectedPosts={quizForm.postIds}
              onPostsChange={(postIds) => setQuizForm(prev => ({ ...prev, postIds }))}
              multiple={true}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label>Passing Score (%)</Label>
            <Input
              type="number"
              value={quizForm.passingScore}
              onChange={(e) => setQuizForm(prev => ({ ...prev, passingScore: parseInt(e.target.value) }))}
              min="0"
              max="100"
            />
          </div>
          <div>
            <Label>Time Limit (minutes, 0 = no limit)</Label>
            <Input
              type="number"
              value={quizForm.timeLimit}
              onChange={(e) => setQuizForm(prev => ({ ...prev, timeLimit: parseInt(e.target.value) }))}
              min="0"
            />
          </div>
          <div>
            <Label>Max Attempts</Label>
            <Input
              type="number"
              value={quizForm.attempts}
              onChange={(e) => setQuizForm(prev => ({ ...prev, attempts: parseInt(e.target.value) }))}
              min="1"
            />
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Add Question</h3>
          <div className="space-y-4">
            <div>
              <Label>Question</Label>
              <Textarea
                value={newQuestion.question}
                onChange={(e) => setNewQuestion(prev => ({ ...prev, question: e.target.value }))}
                placeholder="Enter your question"
                rows={3}
              />
            </div>
            <div>
              <Label>Question Type</Label>
              <Select
                value={newQuestion.type}
                onValueChange={(value) => setNewQuestion(prev => ({ 
                  ...prev, 
                  type: value as any,
                  options: value === 'true_false' ? ['True', 'False'] : ['', '', '', ''],
                  correctAnswer: 0
                }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="multiple_choice">Multiple Choice</SelectItem>
                  <SelectItem value="true_false">True/False</SelectItem>
                  <SelectItem value="short_answer">Short Answer</SelectItem>
                  <SelectItem value="essay">Essay</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {renderQuestionForm()}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Points</Label>
                <Input
                  type="number"
                  value={newQuestion.points}
                  onChange={(e) => setNewQuestion(prev => ({ ...prev, points: parseInt(e.target.value) }))}
                  min="1"
                />
              </div>
              <div>
                <Label>Explanation (optional)</Label>
                <Textarea
                  value={newQuestion.explanation}
                  onChange={(e) => setNewQuestion(prev => ({ ...prev, explanation: e.target.value }))}
                  placeholder="Explain the correct answer"
                  rows={2}
                />
              </div>
            </div>
            <Button onClick={addQuestion} type="button">Add Question</Button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Questions ({quizForm.questions.length})</h3>
          <div className="space-y-2">
            {quizForm.questions.map((question, index) => (
              <div key={question.id} className="p-3 border rounded">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium">{index + 1}. {question.question}</span>
                    <Badge variant="outline" className="ml-2 text-xs">
                      {question.type?.replace('_', ' ') || 'Multiple Choice'}
                    </Badge>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setQuizForm(prev => ({
                        ...prev,
                        questions: prev.questions.filter(q => q.id !== question.id)
                      }));
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreateQuiz}>
            {selectedQuiz ? 'Update Quiz' : 'Create Quiz'}
          </Button>
        </div>
      </div>
    </DialogContent>
  );

  const renderPollDialog = () => (
    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>
          {selectedPoll ? 'Edit Poll' : 'Create New Poll'}
        </DialogTitle>
      </DialogHeader>
      <div className="space-y-6">
        <div>
          <Label>Poll Question</Label>
          <Textarea
            value={pollForm.question}
            onChange={(e) => setPollForm(prev => ({ ...prev, question: e.target.value }))}
            placeholder="What would you like to ask?"
            rows={3}
          />
        </div>

        <div>
          <Label>Blog Posts</Label>
          <BlogPostSelector
            selectedPosts={pollForm.postIds}
            onPostsChange={(postIds) => setPollForm(prev => ({ ...prev, postIds }))}
            multiple={true}
          />
        </div>

        <div>
          <Label>Expiration Date (optional)</Label>
          <Input
            type="datetime-local"
            value={pollForm.expiresAt}
            onChange={(e) => setPollForm(prev => ({ ...prev, expiresAt: e.target.value }))}
          />
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Add Option</h3>
          <div className="flex space-x-2">
            <Input
              value={newPollOption}
              onChange={(e) => setNewPollOption(e.target.value)}
              placeholder="Enter poll option"
            />
            <Button onClick={addPollOption}>Add</Button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Options ({pollForm.options.length})</h3>
          <div className="space-y-2">
            {pollForm.options.map((option, index) => (
              <div key={option.id} className="flex items-center justify-between p-2 border rounded">
                <span>{option.text}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setPollForm(prev => ({
                      ...prev,
                      options: prev.options.filter(o => o.id !== option.id)
                    }));
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreatePoll}>
            {selectedPoll ? 'Update Poll' : 'Create Poll'}
          </Button>
        </div>
      </div>
    </DialogContent>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quiz & Poll Management</h1>
          <p className="text-gray-600">Create interactive quizzes and polls for your blog</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => activeTab === 'quizzes' ? resetQuizForm() : resetPollForm()}>
              <Plus className="w-4 h-4 mr-2" />
              New {activeTab === 'quizzes' ? 'Quiz' : 'Poll'}
            </Button>
          </DialogTrigger>
          {activeTab === 'quizzes' ? renderQuizDialog() : renderPollDialog()}
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="quizzes" className="flex items-center space-x-2">
            <HelpCircle className="w-4 h-4" />
            <span>Quizzes</span>
          </TabsTrigger>
          <TabsTrigger value="polls" className="flex items-center space-x-2">
            <MessageSquare className="w-4 h-4" />
            <span>Polls</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="quizzes" className="space-y-4">
          <div className="grid gap-4">
            {quizzes.map((quiz) => (
              <Card key={quiz.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{quiz.title}</CardTitle>
                      <p className="text-sm text-gray-600">
                        {quiz.questions.length} questions • {quiz.passingScore}% passing score
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{quiz.attempts} attempts</Badge>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="polls" className="space-y-4">
          <div className="grid gap-4">
            {polls.map((poll) => (
              <Card key={poll.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{poll.question}</CardTitle>
                      <p className="text-sm text-gray-600">
                        {poll.options.length} options • {poll.totalVotes} votes
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">
                        {poll.expiresAt ? 'Expires' : 'No expiry'}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Brain, Clock, Target, CheckCircle } from "lucide-react";

interface Question {
  id: string;
  category: string;
  question: string;
  options: string[];
  type: "single" | "scale";
}

const questions: Question[] = [
  {
    id: "1",
    category: "Psychometric",
    question: "I enjoy experimenting with how small changes affect large systems.",
    options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
    type: "scale"
  },
  {
    id: "2",
    category: "Psychometric", 
    question: "I prefer clear logic when writing instructions.",
    options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
    type: "scale"
  },
  {
    id: "3",
    category: "Technical",
    question: "Which of these best describes prompt engineering?",
    options: [
      "Writing code for AI models",
      "Crafting inputs to get better AI outputs", 
      "Training machine learning models",
      "Debugging software applications"
    ],
    type: "single"
  },
  {
    id: "4",
    category: "Technical",
    question: "What is 'temperature' in the context of AI language models?",
    options: [
      "The processing speed of the model",
      "A parameter controlling randomness in outputs",
      "The training data size",
      "The model's accuracy score"
    ],
    type: "single"
  },
  {
    id: "5",
    category: "Aptitude",
    question: "I can work on the same prompt until I get better output.",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    type: "scale"
  },
  {
    id: "6",
    category: "Aptitude",
    question: "I believe I can always improve my skill with practice.",
    options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
    type: "scale"
  }
];

const Assessment = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");

  const progress = ((currentQuestion) / questions.length) * 100;

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (selectedAnswer) {
      setAnswers(prev => ({
        ...prev,
        [questions[currentQuestion].id]: selectedAnswer
      }));
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer("");
      } else {
        // Navigate to results with answers
        navigate("/results", { state: { answers } });
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setSelectedAnswer(answers[questions[currentQuestion - 1].id] || "");
    }
  };

  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen p-4 flex items-center justify-center">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Should I Become a <span className="hero-gradient">Prompt Engineer</span>?
          </h1>
          <p className="text-muted-foreground text-lg mb-6">
            Discover your potential in the exciting field of AI prompt engineering
          </p>
          
          {/* Progress */}
          <div className="flex items-center gap-4 max-w-md mx-auto">
            <Clock className="h-5 w-5 text-primary" />
            <div className="flex-1">
              <div className="assessment-progress">
                <div 
                  className="assessment-progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <span className="text-sm text-muted-foreground">
              {currentQuestion + 1}/{questions.length}
            </span>
          </div>
        </div>

        {/* Question Card */}
        <Card className="assessment-card p-8 mb-8">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary uppercase tracking-wide">
                {currentQ.category}
              </span>
            </div>
            <h2 className="text-2xl font-semibold mb-2">
              {currentQ.question}
            </h2>
          </div>

          {/* Answer Options */}
          <div className="space-y-3 mb-8">
            {currentQ.options.map((option, index) => (
              <div
                key={index}
                className={`question-option ${selectedAnswer === option ? 'selected' : ''}`}
                onClick={() => handleAnswer(option)}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    selectedAnswer === option ? 'border-primary-foreground' : 'border-border'
                  }`}>
                    {selectedAnswer === option && (
                      <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                    )}
                  </div>
                  <span className="text-foreground">{option}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="px-8"
            >
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={!selectedAnswer}
              className="px-8 glow-effect"
              style={{ background: 'var(--gradient-primary)' }}
            >
              {currentQuestion === questions.length - 1 ? 'Get Results' : 'Next'}
            </Button>
          </div>
        </Card>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <Target className="h-8 w-8 text-primary" />
            <h3 className="font-semibold">Psychometric Analysis</h3>
            <p className="text-sm text-muted-foreground">
              Evaluate personality traits and cognitive fit
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Brain className="h-8 w-8 text-primary" />
            <h3 className="font-semibold">Technical Assessment</h3>
            <p className="text-sm text-muted-foreground">
              Test your understanding of AI and prompt engineering
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <CheckCircle className="h-8 w-8 text-primary" />
            <h3 className="font-semibold">Career Guidance</h3>
            <p className="text-sm text-muted-foreground">
              Get personalized recommendations and learning paths
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assessment;
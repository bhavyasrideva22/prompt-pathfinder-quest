import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  Code, 
  Target, 
  TrendingUp, 
  CheckCircle, 
  AlertCircle,
  BookOpen,
  Users,
  Lightbulb,
  Home
} from "lucide-react";

interface ScoreData {
  psychometric: number;
  technical: number;
  aptitude: number;
  overall: number;
  recommendation: "Yes" | "Maybe" | "Not Now";
}

const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const answers = location.state?.answers || {};

  // Calculate scores based on answers (simplified scoring logic)
  const calculateScores = (): ScoreData => {
    const psychometricAnswers = Object.entries(answers).slice(0, 2);
    const technicalAnswers = Object.entries(answers).slice(2, 4);
    const aptitudeAnswers = Object.entries(answers).slice(4, 6);

    const scoreAnswer = (answer: string): number => {
      const scaleAnswers = {
        "Strongly Disagree": 1, "Never": 1,
        "Disagree": 2, "Rarely": 2,
        "Neutral": 3, "Sometimes": 3,
        "Agree": 4, "Often": 4,
        "Strongly Agree": 5, "Always": 5
      };
      
      const technicalCorrect = {
        "Crafting inputs to get better AI outputs": 5,
        "A parameter controlling randomness in outputs": 5
      };

      return scaleAnswers[answer as keyof typeof scaleAnswers] || 
             (technicalCorrect[answer as keyof typeof technicalCorrect] || 2);
    };

    const psychometric = Math.round(
      (psychometricAnswers.reduce((sum, [_, answer]) => sum + scoreAnswer(answer as string), 0) / psychometricAnswers.length) * 20
    );
    
    const technical = Math.round(
      (technicalAnswers.reduce((sum, [_, answer]) => sum + scoreAnswer(answer as string), 0) / technicalAnswers.length) * 20
    );
    
    const aptitude = Math.round(
      (aptitudeAnswers.reduce((sum, [_, answer]) => sum + scoreAnswer(answer as string), 0) / aptitudeAnswers.length) * 20
    );

    const overall = Math.round((psychometric + technical + aptitude) / 3);

    let recommendation: "Yes" | "Maybe" | "Not Now" = "Not Now";
    if (overall >= 80) recommendation = "Yes";
    else if (overall >= 60) recommendation = "Maybe";

    return { psychometric, technical, aptitude, overall, recommendation };
  };

  const scores = calculateScores();

  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case "Yes": return "text-green-400";
      case "Maybe": return "text-yellow-400";
      default: return "text-red-400";
    }
  };

  const getRecommendationIcon = (rec: string) => {
    switch (rec) {
      case "Yes": return <CheckCircle className="h-8 w-8 text-green-400" />;
      case "Maybe": return <AlertCircle className="h-8 w-8 text-yellow-400" />;
      default: return <AlertCircle className="h-8 w-8 text-red-400" />;
    }
  };

  const getNextSteps = (rec: string, overall: number) => {
    if (rec === "Yes") {
      return [
        "Start with OpenAI's GPT-4 or Claude to practice prompt crafting",
        "Take the DeepLearning.AI Prompt Engineering course",
        "Join AI communities on Discord or Reddit for peer feedback",
        "Build a portfolio of prompt engineering projects",
        "Apply for prompt engineer roles at AI companies"
      ];
    } else if (rec === "Maybe") {
      return [
        "Learn AI fundamentals through online courses",
        "Practice with free AI tools like ChatGPT",
        "Study prompt engineering terminology and concepts",
        "Follow AI researchers and prompt engineers on social media",
        "Retake this assessment in 3-6 months"
      ];
    } else {
      return [
        "Explore foundational AI literacy courses",
        "Consider UX design or technical writing paths",
        "Build general programming or analytical skills",
        "Learn about AI ethics and responsible AI development",
        "Explore related fields like data analysis or content strategy"
      ];
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Your <span className="hero-gradient">Assessment Results</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Here's your personalized evaluation for becoming a prompt engineer
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overall Recommendation */}
            <Card className="assessment-card p-8">
              <div className="text-center mb-6">
                {getRecommendationIcon(scores.recommendation)}
                <h2 className={`text-3xl font-bold mt-4 mb-2 ${getRecommendationColor(scores.recommendation)}`}>
                  {scores.recommendation}
                </h2>
                <p className="text-muted-foreground">
                  {scores.recommendation === "Yes" 
                    ? "You show strong potential for prompt engineering!"
                    : scores.recommendation === "Maybe"
                    ? "You have some potential but need to develop key skills."
                    : "Consider building foundational skills first."
                  }
                </p>
              </div>

              <div className="flex justify-center">
                <div className="text-center">
                  <div className="text-6xl font-bold hero-gradient mb-2">
                    {scores.overall}
                  </div>
                  <div className="text-sm text-muted-foreground">Overall Score</div>
                </div>
              </div>
            </Card>

            {/* Detailed Scores */}
            <Card className="assessment-card p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Detailed Analysis
              </h3>
              
              <div className="space-y-6">
                {/* Psychometric */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <Brain className="h-4 w-4 text-primary" />
                      <span className="font-medium">Psychometric Fit</span>
                    </div>
                    <span className="font-bold">{scores.psychometric}/100</span>
                  </div>
                  <Progress value={scores.psychometric} className="h-2" />
                  <p className="text-sm text-muted-foreground mt-1">
                    Personality traits and cognitive style alignment
                  </p>
                </div>

                {/* Technical */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <Code className="h-4 w-4 text-primary" />
                      <span className="font-medium">Technical Knowledge</span>
                    </div>
                    <span className="font-bold">{scores.technical}/100</span>
                  </div>
                  <Progress value={scores.technical} className="h-2" />
                  <p className="text-sm text-muted-foreground mt-1">
                    Understanding of AI and prompt engineering concepts
                  </p>
                </div>

                {/* Aptitude */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      <span className="font-medium">Learning Aptitude</span>
                    </div>
                    <span className="font-bold">{scores.aptitude}/100</span>
                  </div>
                  <Progress value={scores.aptitude} className="h-2" />
                  <p className="text-sm text-muted-foreground mt-1">
                    Growth mindset and persistence for skill development
                  </p>
                </div>
              </div>
            </Card>

            {/* Career Paths */}
            <Card className="assessment-card p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Relevant Career Paths
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: "Prompt Engineer", match: scores.overall >= 80 ? "High" : scores.overall >= 60 ? "Medium" : "Low" },
                  { title: "AI Interaction Designer", match: scores.psychometric >= 70 ? "High" : "Medium" },
                  { title: "LLM QA Tester", match: scores.technical >= 70 ? "High" : "Medium" },
                  { title: "AI Product Manager", match: scores.overall >= 70 ? "High" : "Medium" }
                ].map((career, index) => (
                  <div key={index} className="p-4 rounded-lg border border-border">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{career.title}</span>
                      <Badge variant={career.match === "High" ? "default" : career.match === "Medium" ? "secondary" : "outline"}>
                        {career.match} Match
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Next Steps */}
            <Card className="assessment-card p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                Next Steps
              </h3>
              <ul className="space-y-3">
                {getNextSteps(scores.recommendation, scores.overall).map((step, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Resources */}
            <Card className="assessment-card p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Recommended Resources
              </h3>
              <div className="space-y-3">
                <a href="#" className="block p-3 rounded border border-border hover:border-primary transition-colors">
                  <div className="font-medium text-sm">DeepLearning.AI Course</div>
                  <div className="text-xs text-muted-foreground">Prompt Engineering for Developers</div>
                </a>
                <a href="#" className="block p-3 rounded border border-border hover:border-primary transition-colors">
                  <div className="font-medium text-sm">OpenAI Cookbook</div>
                  <div className="text-xs text-muted-foreground">Practical examples and techniques</div>
                </a>
                <a href="#" className="block p-3 rounded border border-border hover:border-primary transition-colors">
                  <div className="font-medium text-sm">AI Discord Communities</div>
                  <div className="text-xs text-muted-foreground">Connect with other practitioners</div>
                </a>
              </div>
            </Card>

            {/* Actions */}
            <div className="space-y-3">
              <Button 
                className="w-full glow-effect" 
                style={{ background: 'var(--gradient-primary)' }}
                onClick={() => navigate("/assessment")}
              >
                Retake Assessment
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate("/")}
              >
                <Home className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
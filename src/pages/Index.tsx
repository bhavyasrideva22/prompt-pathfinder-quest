import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, Zap, Target, Users, Clock, CheckCircle } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const startAssessment = () => {
    navigate("/assessment");
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Should I Become a{" "}
              <span className="hero-gradient">Prompt Engineer</span>?
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Discover if you have what it takes to excel in one of tech's most exciting new fields.
              Get personalized insights in just 10 minutes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              onClick={startAssessment}
              className="text-lg px-8 py-6 h-auto glow-effect"
              style={{ background: 'var(--gradient-primary)' }}
            >
              <Brain className="mr-2 h-6 w-6" />
              Start Assessment
            </Button>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Takes 10-15 minutes</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold hero-gradient mb-2">95%</div>
              <div className="text-muted-foreground">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold hero-gradient mb-2">10K+</div>
              <div className="text-muted-foreground">Assessments Taken</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold hero-gradient mb-2">4.9★</div>
              <div className="text-muted-foreground">User Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Comprehensive Assessment Framework
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our scientifically-designed evaluation covers all aspects of prompt engineering success
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="assessment-card p-8 text-center">
              <Brain className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Psychometric Analysis</h3>
              <p className="text-muted-foreground mb-4">
                Evaluate personality traits, cognitive styles, and thinking patterns that align with successful prompt engineers.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Openness to experience</li>
                <li>• Analytical thinking</li>
                <li>• Creative problem solving</li>
                <li>• Attention to detail</li>
              </ul>
            </Card>

            <Card className="assessment-card p-8 text-center">
              <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Technical Knowledge</h3>
              <p className="text-muted-foreground mb-4">
                Test your understanding of AI systems, language models, and prompt engineering fundamentals.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• LLM architecture basics</li>
                <li>• Prompt optimization</li>
                <li>• Parameter understanding</li>
                <li>• Best practices</li>
              </ul>
            </Card>

            <Card className="assessment-card p-8 text-center">
              <Target className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Aptitude & Growth</h3>
              <p className="text-muted-foreground mb-4">
                Measure your learning agility, persistence, and growth mindset for continuous improvement.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Learning velocity</li>
                <li>• Iteration mindset</li>
                <li>• Experimental approach</li>
                <li>• Resilience to failure</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* What You'll Get */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What You'll Discover
            </h2>
            <p className="text-lg text-muted-foreground">
              Get personalized insights and actionable guidance for your prompt engineering journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: CheckCircle,
                title: "Personalized Score",
                description: "Get a comprehensive assessment score with detailed breakdown across all evaluation areas."
              },
              {
                icon: Target,
                title: "Career Fit Analysis",
                description: "Understand which prompt engineering roles align best with your skills and interests."
              },
              {
                icon: Users,
                title: "Learning Roadmap",
                description: "Receive a customized learning path with specific courses, resources, and milestones."
              },
              {
                icon: Brain,
                title: "Skill Gap Analysis",
                description: "Identify exactly which skills to develop first to become job-ready faster."
              }
            ].map((feature, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="assessment-card p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Discover Your Potential?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who've used our assessment to make informed decisions about their AI careers.
            </p>
            <Button
              size="lg"
              onClick={startAssessment}
              className="text-lg px-12 py-6 h-auto glow-effect"
              style={{ background: 'var(--gradient-primary)' }}
            >
              <Brain className="mr-2 h-6 w-6" />
              Start Your Assessment Now
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              No signup required • Results in 10 minutes • Completely free
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;

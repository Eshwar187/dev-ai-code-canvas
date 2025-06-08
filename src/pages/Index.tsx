import React, { useState } from 'react';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';
import CodeEditor from '@/components/CodeEditor';
import PromptInput from '@/components/PromptInput';
import ResultsDashboard from '@/components/ResultsDashboard';
import AnimatedButton from '@/components/AnimatedButton';
import TypewriterText from '@/components/TypewriterText';
import FloatingElements from '@/components/FloatingElements';
import { Card } from '@/components/ui/card';
import { Sparkles, Code2, Brain, Zap } from 'lucide-react';

const Index = () => {
  const [code, setCode] = useState('');
  const [prompt, setPrompt] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const exampleCode = `function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price * items[i].quantity;
  }
  return total;
}`;

  const correctedCode = `function calculateTotal(items) {
  // Input validation
  if (!Array.isArray(items)) {
    throw new Error('Items must be an array');
  }
  
  return items.reduce((total, item) => {
    // Validate item structure
    if (!item || typeof item.price !== 'number' || typeof item.quantity !== 'number') {
      throw new Error('Invalid item structure');
    }
    
    // Handle negative values
    const price = Math.max(0, item.price);
    const quantity = Math.max(0, item.quantity);
    
    return total + (price * quantity);
  }, 0);
}`;

  const handleAnalyze = async () => {
    if (!code.trim() || !prompt.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 2000);
  };

  const handleLogin = () => {
    console.log('Login clicked');
  };

  const handleSignup = () => {
    console.log('Signup clicked');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    console.log('Logout clicked');
  };

  const loadExample = () => {
    setCode(exampleCode);
    setPrompt('Please analyze this function for security vulnerabilities, logic errors, and performance optimizations. Suggest improvements and best practices.');
  };

  return (
    <ThemeProvider defaultTheme="dark">
      <div className="min-h-screen bg-background relative overflow-hidden">
        <FloatingElements />
        
        <Navbar
          isAuthenticated={isAuthenticated}
          onLogin={handleLogin}
          onSignup={handleSignup}
          onLogout={handleLogout}
        />
        
        <main className="container mx-auto px-4 py-8 relative z-10">
          {!showResults ? (
            <div className="space-y-8">
              {/* Hero Section */}
              <div className="text-center space-y-6 mb-12 animate-fade-in">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-electric-blue/20 to-emerald-green/20 px-4 py-2 rounded-full border border-border/50 animate-scale-in">
                  <Sparkles className="h-4 w-4 electric-blue animate-pulse" />
                  <span className="text-sm font-medium">AI-Powered Code Analysis</span>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-electric-blue via-emerald-green to-electric-blue bg-clip-text text-transparent animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <TypewriterText text="Analyze. Improve. Deploy." speed={100} delay={500} />
                </h1>
                
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
                  Get instant security audits, performance optimizations, and code improvements 
                  powered by advanced AI. Write better code, faster.
                </p>

                <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '0.6s' }}>
                  <div className="flex items-center space-x-2 hover:text-electric-blue transition-colors duration-200">
                    <Code2 className="h-4 w-4 electric-blue" />
                    <span>Multi-language support</span>
                  </div>
                  <div className="flex items-center space-x-2 hover:text-emerald-green transition-colors duration-200">
                    <Brain className="h-4 w-4 emerald-green" />
                    <span>AI-powered analysis</span>
                  </div>
                  <div className="flex items-center space-x-2 hover:text-warning-amber transition-colors duration-200">
                    <Zap className="h-4 w-4 warning-amber" />
                    <span>Instant results</span>
                  </div>
                </div>
              </div>

              {/* Dual Input Interface */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Code Editor */}
                <div className="space-y-4 animate-slide-in-left">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-foreground">Your Code</h2>
                    <AnimatedButton
                      variant="outline"
                      size="sm"
                      onClick={loadExample}
                      className="hover:bg-accent/50"
                    >
                      Load Example
                    </AnimatedButton>
                  </div>
                  <CodeEditor
                    value={code}
                    onChange={setCode}
                    placeholder="// Paste or type your code here..."
                    language="javascript"
                  />
                </div>

                {/* Prompt Input */}
                <div className="space-y-4 animate-slide-in-right">
                  <h2 className="text-xl font-semibold text-foreground">Analysis Request</h2>
                  <PromptInput
                    value={prompt}
                    onChange={setPrompt}
                    onSubmit={handleAnalyze}
                    isLoading={isAnalyzing}
                  />
                </div>
              </div>

              {/* Features Cards */}
              <div className="grid md:grid-cols-3 gap-6 mt-16">
                {[
                  {
                    icon: <Code2 className="h-6 w-6 electric-blue" />,
                    title: "Smart Analysis",
                    description: "Advanced AI understands context and provides meaningful insights for your code.",
                    color: "electric-blue"
                  },
                  {
                    icon: <Brain className="h-6 w-6 emerald-green" />,
                    title: "Security First",
                    description: "Comprehensive security analysis to identify vulnerabilities and suggest fixes.",
                    color: "emerald-green"
                  },
                  {
                    icon: <Zap className="h-6 w-6 warning-amber" />,
                    title: "Performance Boost",
                    description: "Optimize algorithms and improve code efficiency with AI-powered suggestions.",
                    color: "warning-amber"
                  }
                ].map((feature, index) => (
                  <Card key={feature.title} className={`p-6 border-border/50 hover:border-${feature.color}/50 transition-all duration-300 group animate-fade-in hover:transform hover:scale-105`} style={{ animationDelay: `${0.8 + index * 0.1}s` }}>
                    <div className="space-y-4">
                      <div className={`w-12 h-12 bg-${feature.color}/20 rounded-lg flex items-center justify-center group-hover:bg-${feature.color}/30 transition-all duration-300 group-hover:rotate-6`}>
                        {feature.icon}
                      </div>
                      <h3 className="text-lg font-semibold">{feature.title}</h3>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Back Button */}
              <AnimatedButton
                variant="ghost"
                onClick={() => setShowResults(false)}
                className="mb-4 hover:bg-accent/50"
              >
                ← Back to Editor
              </AnimatedButton>

              {/* Results */}
              <ResultsDashboard
                originalCode={code}
                correctedCode={correctedCode}
                isVisible={showResults}
              />
            </div>
          )}
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Index;


import React, { useState } from 'react';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';
import CodeEditor from '@/components/CodeEditor';
import PromptInput from '@/components/PromptInput';
import ResultsDashboard from '@/components/ResultsDashboard';
import { Button } from '@/components/ui/button';
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
    // Clerk authentication would be integrated here
    console.log('Login clicked');
  };

  const handleSignup = () => {
    // Clerk authentication would be integrated here
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
      <div className="min-h-screen bg-background">
        <Navbar
          isAuthenticated={isAuthenticated}
          onLogin={handleLogin}
          onSignup={handleSignup}
          onLogout={handleLogout}
        />
        
        <main className="container mx-auto px-4 py-8">
          {!showResults ? (
            <div className="space-y-8">
              {/* Hero Section */}
              <div className="text-center space-y-6 mb-12">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-electric-blue/20 to-emerald-green/20 px-4 py-2 rounded-full border border-border/50">
                  <Sparkles className="h-4 w-4 electric-blue" />
                  <span className="text-sm font-medium">AI-Powered Code Analysis</span>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-electric-blue via-emerald-green to-electric-blue bg-clip-text text-transparent">
                  Analyze. Improve. Deploy.
                </h1>
                
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Get instant security audits, performance optimizations, and code improvements 
                  powered by advanced AI. Write better code, faster.
                </p>

                <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Code2 className="h-4 w-4 electric-blue" />
                    <span>Multi-language support</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Brain className="h-4 w-4 emerald-green" />
                    <span>AI-powered analysis</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 warning-amber" />
                    <span>Instant results</span>
                  </div>
                </div>
              </div>

              {/* Dual Input Interface */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Code Editor */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-foreground">Your Code</h2>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={loadExample}
                      className="hover:bg-accent/50 smooth-transition"
                    >
                      Load Example
                    </Button>
                  </div>
                  <CodeEditor
                    value={code}
                    onChange={setCode}
                    placeholder="// Paste or type your code here..."
                    language="javascript"
                  />
                </div>

                {/* Prompt Input */}
                <div className="space-y-4">
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
                <Card className="p-6 border-border/50 hover:border-electric-blue/50 smooth-transition group">
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-electric-blue/20 rounded-lg flex items-center justify-center group-hover:bg-electric-blue/30 smooth-transition">
                      <Code2 className="h-6 w-6 electric-blue" />
                    </div>
                    <h3 className="text-lg font-semibold">Smart Analysis</h3>
                    <p className="text-muted-foreground">
                      Advanced AI understands context and provides meaningful insights for your code.
                    </p>
                  </div>
                </Card>

                <Card className="p-6 border-border/50 hover:border-emerald-green/50 smooth-transition group">
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-emerald-green/20 rounded-lg flex items-center justify-center group-hover:bg-emerald-green/30 smooth-transition">
                      <Brain className="h-6 w-6 emerald-green" />
                    </div>
                    <h3 className="text-lg font-semibold">Security First</h3>
                    <p className="text-muted-foreground">
                      Comprehensive security analysis to identify vulnerabilities and suggest fixes.
                    </p>
                  </div>
                </Card>

                <Card className="p-6 border-border/50 hover:border-warning-amber/50 smooth-transition group">
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center group-hover:bg-orange-500/30 smooth-transition">
                      <Zap className="h-6 w-6 warning-amber" />
                    </div>
                    <h3 className="text-lg font-semibold">Performance Boost</h3>
                    <p className="text-muted-foreground">
                      Optimize algorithms and improve code efficiency with AI-powered suggestions.
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Back Button */}
              <Button
                variant="ghost"
                onClick={() => setShowResults(false)}
                className="mb-4 hover:bg-accent/50 smooth-transition"
              >
                ← Back to Editor
              </Button>

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

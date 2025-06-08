
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight, Shield, Zap, Target, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import CodeEditor from './CodeEditor';

interface TestCase {
  id: string;
  title: string;
  description: string;
  status: 'passed' | 'failed' | 'warning';
  details: string;
}

interface TestCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  testCases: TestCase[];
}

interface ResultsDashboardProps {
  originalCode: string;
  correctedCode: string;
  isVisible: boolean;
}

const ResultsDashboard: React.FC<ResultsDashboardProps> = ({
  originalCode,
  correctedCode,
  isVisible
}) => {
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set(['security']));

  const toggleCategory = (categoryId: string) => {
    const newOpenCategories = new Set(openCategories);
    if (newOpenCategories.has(categoryId)) {
      newOpenCategories.delete(categoryId);
    } else {
      newOpenCategories.add(categoryId);
    }
    setOpenCategories(newOpenCategories);
  };

  const testCategories: TestCategory[] = [
    {
      id: 'security',
      title: 'Security',
      icon: <Shield className="h-5 w-5" />,
      color: 'text-red-500',
      testCases: [
        {
          id: 'sec-1',
          title: 'SQL Injection Prevention',
          description: 'Validates protection against SQL injection attacks',
          status: 'passed',
          details: 'Code properly uses parameterized queries and input validation.'
        },
        {
          id: 'sec-2',
          title: 'XSS Protection',
          description: 'Checks for cross-site scripting vulnerabilities',
          status: 'warning',
          details: 'Consider adding input sanitization for user-generated content.'
        }
      ]
    },
    {
      id: 'logic',
      title: 'Logic',
      icon: <Target className="h-5 w-5" />,
      color: 'text-blue-500',
      testCases: [
        {
          id: 'log-1',
          title: 'Edge Case Handling',
          description: 'Tests handling of boundary conditions',
          status: 'failed',
          details: 'Function does not handle null or undefined inputs properly.'
        },
        {
          id: 'log-2',
          title: 'Control Flow',
          description: 'Validates correct execution paths',
          status: 'passed',
          details: 'All execution paths are correctly implemented.'
        }
      ]
    },
    {
      id: 'performance',
      title: 'Performance',
      icon: <Zap className="h-5 w-5" />,
      color: 'text-emerald-500',
      testCases: [
        {
          id: 'perf-1',
          title: 'Time Complexity',
          description: 'Analyzes algorithmic efficiency',
          status: 'warning',
          details: 'Algorithm has O(n²) complexity. Consider optimization.'
        },
        {
          id: 'perf-2',
          title: 'Memory Usage',
          description: 'Checks for memory leaks and optimization',
          status: 'passed',
          details: 'Memory usage is within acceptable limits.'
        }
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="h-4 w-4 text-emerald-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed':
        return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'failed':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'warning':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  if (!isVisible) return null;

  return (
    <div className="slide-in-up">
      <Card className="border-border/50 shadow-xl">
        <Tabs defaultValue="corrected" className="w-full">
          <div className="border-b border-border/50 bg-gradient-to-r from-electric-blue/5 to-emerald-green/5">
            <TabsList className="grid w-full grid-cols-2 bg-transparent">
              <TabsTrigger 
                value="corrected"
                className="data-[state=active]:bg-electric-blue/20 data-[state=active]:text-electric-blue smooth-transition"
              >
                Corrected Code
              </TabsTrigger>
              <TabsTrigger 
                value="tests"
                className="data-[state=active]:bg-emerald-green/20 data-[state=active]:text-emerald-green smooth-transition"
              >
                Test Cases
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="corrected" className="mt-0 p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Improved Code</h3>
                <Badge className="bg-emerald-green/20 text-emerald-green">
                  AI Enhanced
                </Badge>
              </div>
              <CodeEditor
                value={correctedCode}
                onChange={() => {}}
                language="javascript"
                readOnly={true}
              />
            </div>
          </TabsContent>

          <TabsContent value="tests" className="mt-0 p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Analysis Results</h3>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-emerald-green/20 text-emerald-green">
                    6 Passed
                  </Badge>
                  <Badge className="bg-yellow-500/20 text-yellow-500">
                    2 Warnings
                  </Badge>
                  <Badge className="bg-red-500/20 text-red-500">
                    1 Failed
                  </Badge>
                </div>
              </div>

              <div className="space-y-4">
                {testCategories.map((category) => (
                  <Card key={category.id} className="border-border/50">
                    <Collapsible
                      open={openCategories.has(category.id)}
                      onOpenChange={() => toggleCategory(category.id)}
                    >
                      <CollapsibleTrigger asChild>
                        <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-accent/30 smooth-transition">
                          <div className="flex items-center space-x-3">
                            <div className={category.color}>
                              {category.icon}
                            </div>
                            <h4 className="font-medium text-foreground">{category.title}</h4>
                            <Badge variant="outline" className="text-xs">
                              {category.testCases.length} tests
                            </Badge>
                          </div>
                          {openCategories.has(category.id) ? (
                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                      </CollapsibleTrigger>
                      
                      <CollapsibleContent>
                        <div className="px-4 pb-4 space-y-3 border-t border-border/50">
                          {category.testCases.map((testCase) => (
                            <div key={testCase.id} className="p-3 rounded-lg bg-muted/30 border border-border/50">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-1">
                                    {getStatusIcon(testCase.status)}
                                    <h5 className="font-medium text-sm text-foreground">
                                      {testCase.title}
                                    </h5>
                                    <Badge className={getStatusColor(testCase.status)}>
                                      {testCase.status}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground mb-2">
                                    {testCase.description}
                                  </p>
                                  <p className="text-xs text-foreground bg-background/50 p-2 rounded">
                                    {testCase.details}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default ResultsDashboard;

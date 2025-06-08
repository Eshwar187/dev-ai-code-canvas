
import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Download, RotateCcw } from 'lucide-react';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  language?: string;
  readOnly?: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  placeholder = "// Enter your code here...",
  language = "javascript",
  readOnly = false
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [lineNumbers, setLineNumbers] = useState<number[]>([1]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const lines = value.split('\n').length;
    setLineNumbers(Array.from({ length: lines }, (_, i) => i + 1));
  }, [value]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const handleReset = () => {
    onChange('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIsTyping(true);
    onChange(e.target.value);
    
    setTimeout(() => setIsTyping(false), 500);
  };

  const syntaxHighlight = (code: string) => {
    return code
      .replace(/\b(function|const|let|var|if|else|for|while|return|class|extends|import|export|from|default)\b/g, 
        '<span class="text-blue-400">$1</span>')
      .replace(/\b(true|false|null|undefined|NaN|Infinity)\b/g, 
        '<span class="text-purple-400">$1</span>')
      .replace(/(['"`])((?:\\.|(?!\1)[^\\])*?)\1/g, 
        '<span class="text-green-400">$1$2$1</span>')
      .replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, 
        '<span class="text-gray-500">$&</span>')
      .replace(/\b\d+\b/g, 
        '<span class="text-orange-400">$&</span>');
  };

  return (
    <Card className={`relative overflow-hidden code-bg border-border/50 shadow-lg transition-all duration-300 ${isTyping ? 'ring-2 ring-electric-blue/50' : ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-card border-b border-border/50">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
          <span className="text-sm text-muted-foreground ml-4">{language}</span>
          {isTyping && (
            <div className="flex items-center space-x-1 ml-2">
              <div className="w-1 h-1 bg-electric-blue rounded-full animate-bounce"></div>
              <div className="w-1 h-1 bg-electric-blue rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-1 h-1 bg-electric-blue rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-8 w-8 p-0 hover:bg-accent/50 transition-all duration-200 hover:scale-110"
          >
            <Copy className="h-4 w-4" />
          </Button>
          {!readOnly && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="h-8 w-8 p-0 hover:bg-accent/50 transition-all duration-200 hover:scale-110"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Editor */}
      <div className="relative flex">
        {/* Line Numbers */}
        <div className="flex-shrink-0 select-none bg-muted/20 px-3 py-4 text-sm text-muted-foreground border-r border-border/50">
          {lineNumbers.map((num) => (
            <div key={num} className="leading-6 text-right transition-colors duration-200 hover:text-electric-blue">
              {num}
            </div>
          ))}
        </div>

        {/* Code Area */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            readOnly={readOnly}
            className="w-full h-64 px-4 py-4 bg-transparent text-foreground font-mono text-sm leading-6 resize-none focus:outline-none custom-scrollbar transition-all duration-200"
            spellCheck="false"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
          />
          
          {/* Syntax highlighting overlay */}
          {value && (
            <div 
              className="absolute inset-0 px-4 py-4 pointer-events-none text-sm leading-6 font-mono overflow-hidden transition-opacity duration-300"
              dangerouslySetInnerHTML={{ __html: syntaxHighlight(value) }}
            />
          )}
        </div>
      </div>
    </Card>
  );
};

export default CodeEditor;

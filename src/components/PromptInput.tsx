
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Mic, MicOff } from 'lucide-react';
import AnimatedButton from './AnimatedButton';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  isLoading?: boolean;
}

const PromptInput: React.FC<PromptInputProps> = ({
  value,
  onChange,
  onSubmit,
  placeholder = "Describe what you want to analyze or improve in your code...",
  isLoading = false
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      onSubmit();
    }
  };

  const toggleListening = () => {
    setIsListening(!isListening);
  };

  return (
    <Card className={`relative overflow-hidden border-border/50 shadow-lg bg-card transition-all duration-300 ${isFocused ? 'ring-2 ring-emerald-green/50 shadow-emerald-green/20' : ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-electric-blue/10 to-emerald-green/10 border-b border-border/50">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-emerald-green animate-pulse"></div>
          <span className="text-sm font-medium text-foreground">Analysis Prompt</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleListening}
            className={`h-8 w-8 p-0 hover:bg-accent/50 transition-all duration-200 hover:scale-110 ${isListening ? 'text-emerald-green animate-pulse' : 'text-muted-foreground'}`}
          >
            {isListening ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="min-h-[120px] resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent text-foreground placeholder:text-muted-foreground transition-all duration-200"
        />
        
        {/* Action Bar */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
          <div className="text-sm text-muted-foreground animate-fade-in">
            <kbd className="px-2 py-1 text-xs bg-muted rounded transition-colors hover:bg-accent">Ctrl</kbd> + <kbd className="px-2 py-1 text-xs bg-muted rounded transition-colors hover:bg-accent">Enter</kbd> to submit
          </div>
          
          <AnimatedButton
            onClick={onSubmit}
            disabled={!value.trim() || isLoading}
            className="bg-gradient-to-r from-electric-blue to-emerald-green hover:opacity-90 disabled:opacity-50 shadow-lg hover:shadow-xl"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
            ) : (
              <Send className="h-4 w-4 mr-2" />
            )}
            {isLoading ? 'Analyzing...' : 'Analyze Code'}
          </AnimatedButton>
        </div>
      </div>
    </Card>
  );
};

export default PromptInput;


import React from 'react';
import { Code2, Shield, Zap } from 'lucide-react';

const FloatingElements: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating code symbols */}
      <div className="absolute top-20 left-10 animate-float-slow opacity-20">
        <Code2 className="h-8 w-8 electric-blue" />
      </div>
      <div className="absolute top-40 right-20 animate-float-delayed opacity-20">
        <Shield className="h-6 w-6 emerald-green" />
      </div>
      <div className="absolute bottom-32 left-1/4 animate-float-slow opacity-20">
        <Zap className="h-7 w-7 warning-amber" />
      </div>
      <div className="absolute top-1/3 right-1/3 animate-float-delayed opacity-20">
        <div className="w-2 h-2 bg-electric-blue rounded-full" />
      </div>
      <div className="absolute bottom-1/4 right-10 animate-float-slow opacity-20">
        <div className="w-3 h-3 bg-emerald-green rounded-full" />
      </div>
    </div>
  );
};

export default FloatingElements;

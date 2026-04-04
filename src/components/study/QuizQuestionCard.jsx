import React from 'react';
import { Check, X, Info } from 'lucide-react';

const QuizQuestionCard = ({ question, options, selectedLetter, correctLetter, explanation, onSelect }) => {
  const hasAnswered = selectedLetter !== undefined;

return (
    <div className="w-full space-y-4">
      {/* Question Text - Minimized for better focus */}
      <div className="mb-2">
        <p className="text-lg font-bold text-slate-800 leading-snug tracking-tight">
          {question}
        </p>
      </div>
      
      {/* Options Stack - Strictly Vertical */}
      <div className="flex flex-col gap-2">
        {options.map((option, idx) => {
          const letter = String.fromCharCode(65 + idx);
          const isSelected = selectedLetter === letter;
          const isCorrect = letter === correctLetter;
          
          let buttonClass = "border-slate-100 bg-white text-slate-600 hover:border-blue-200 hover:bg-slate-50/50";
          let labelClass = "bg-slate-50 text-slate-400 border-slate-100";

          if (hasAnswered) {
            if (isCorrect) {
              buttonClass = "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm";
              labelClass = "bg-emerald-500 text-white border-emerald-500";
            } else if (isSelected && !isCorrect) {
              buttonClass = "border-red-500 bg-red-50 text-red-700";
              labelClass = "bg-red-500 text-white border-red-500";
            } else {
              buttonClass = "border-slate-50 opacity-50 grayscale-[0.8]";
              labelClass = "bg-slate-50 text-slate-300 border-slate-100";
            }
          }

          return (
            <button
              key={letter}
              disabled={hasAnswered}
              onClick={() => onSelect(letter)}
              className={`w-full flex items-center min-h-[56px] px-4 py-3 rounded-2xl border-2 transition-all font-bold text-sm ${buttonClass} ${!hasAnswered && "active:scale-[0.99]"}`}
            >
              <span className={`flex-shrink-0 inline-block w-7 h-7 rounded-lg border text-center leading-[26px] mr-4 text-[10px] font-black transition-colors ${labelClass}`}>
                {letter}
              </span>
              
              <span className="flex-1 leading-tight">{option}</span>

              {hasAnswered && isCorrect && <Check size={18} className="text-emerald-600 ml-2" strokeWidth={3} />}
              {hasAnswered && isSelected && !isCorrect && <X size={18} className="text-red-600 ml-2" strokeWidth={3} />}
            </button>
          );
        })}
      </div>

      {/* Explanation Section - Compact & Readable */}
      {hasAnswered && explanation && (
        <div className="mt-6 p-5 bg-slate-900 rounded-3xl text-white relative overflow-hidden animate-in fade-in slide-in-from-top-2 duration-500">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Info size={14} className="text-blue-400" />
              <h4 className="text-[9px] font-black uppercase tracking-widest text-blue-400">AI Logic</h4>
            </div>
            
            <p className="text-xs font-medium text-slate-300 leading-relaxed italic border-l-2 border-blue-500/50 pl-4">
              {explanation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizQuestionCard;
import React from 'react';
import { Check, X } from 'lucide-react';

const QuizQuestionCard = ({ question, options, selectedOption, correctIndex, onSelect }) => {
  const hasAnswered = selectedOption !== undefined;

  return (
    <div className="flex flex-col bg-white border border-slate-200 rounded-[32px] shadow-xl shadow-slate-200/40 overflow-hidden">
      {/* Question Header - Solid & Bold */}
      <div className="p-6 bg-slate-50/50 border-b border-slate-100">
        <p className="text-lg font-black text-slate-800 leading-snug">
          {question}
        </p>
      </div>
      
      {/* Options Area - Comfortable spacing */}
      <div className="p-5 space-y-3">
        {options.map((option, idx) => {
          const isSelected = selectedOption === idx;
          const isCorrect = idx === correctIndex;
          
          let buttonClass = "border-slate-100 bg-white text-slate-600 hover:border-blue-300 hover:bg-blue-50/30";
          let labelClass = "bg-slate-100 text-slate-400 border-slate-200";

          if (hasAnswered) {
            if (isCorrect) {
              buttonClass = "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm shadow-emerald-100";
              labelClass = "bg-emerald-500 text-white border-emerald-500";
            } else if (isSelected && !isCorrect) {
              buttonClass = "border-red-500 bg-red-100/50 text-red-700 shadow-sm";
              labelClass = "bg-red-500 text-white border-red-500";
            } else {
              buttonClass = "border-slate-50 opacity-40 grayscale-[0.5]";
            }
          }

          return (
            <button
              key={idx}
              disabled={hasAnswered}
              onClick={() => onSelect(idx)}
              // Height h-16 (64px) is the sweet spot for responsiveness and visibility
              className={`w-full flex items-center h-16 px-5 rounded-2xl border-2 transition-all font-bold text-base ${buttonClass} ${!hasAnswered && "active:scale-[0.97]"}`}
            >
              <span className={`flex-shrink-0 inline-block w-9 h-9 rounded-xl border text-center leading-[34px] mr-4 text-sm font-black ${labelClass}`}>
                {String.fromCharCode(65 + idx)}
              </span>
              
              <span className="flex-1 text-left truncate">{option}</span>

              {hasAnswered && isCorrect && <Check size={22} className="text-emerald-600 ml-2" strokeWidth={3} />}
              {hasAnswered && isSelected && !isCorrect && <X size={22} className="text-red-600 ml-2" strokeWidth={3} />}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuizQuestionCard;
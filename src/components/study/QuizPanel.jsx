import React, { useState } from 'react';
import QuizQuestionCard from './QuizQuestionCard';
import ProgressBar from './ProgressBar';
import { Trophy, ChevronLeft, ChevronRight, CheckCircle, RotateCcw } from 'lucide-react';

const QuizPanel = () => {
  // --- STATE MANAGEMENT ---
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);

  // --- DATA ---
  const questions = [
    { 
      q: "What is the primary function of Ribosomes?", 
      options: ["Energy Production", "Protein Synthesis", "Waste Management", "Cellular Defense"], 
      correct: 1 
    },
    { 
      q: "Which part of the cell contains DNA?", 
      options: ["Nucleus", "Cytoplasm", "Cell Wall", "Mitochondria"], 
      correct: 0 
    },
    { 
      q: "Cells are the building blocks of life.", 
      options: ["True", "False"], 
      correct: 0 
    }
  ];

  // --- HANDLERS ---
  const handleSelect = (idx) => {
    // Prevent changing answer after selection
    if (answers[currentStep] === undefined) {
      setAnswers({ ...answers, [currentStep]: idx });
    }
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  // CRITICAL: This resets the quiz without refreshing the page.
  // This keeps your uploaded book/file from disappearing.
  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers({});
    setIsFinished(false);
  };

  // --- FINISHED UI ---
  if (isFinished) {
    // Calculate Score
    const correctCount = Object.keys(answers).reduce((acc, key) => {
      return answers[key] === questions[key].correct ? acc + 1 : acc;
    }, 0);
    const percentage = Math.round((correctCount / questions.length) * 100);

    return (
      <div className="flex flex-col items-center justify-center p-10 text-center max-w-md mx-auto bg-white rounded-[40px] border border-slate-100 shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="w-20 h-20 bg-yellow-400 rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-yellow-100 rotate-3">
            <Trophy className="text-white" size={42} strokeWidth={2.5} />
        </div>
        
        <h2 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">
          Lesson Mastered!
        </h2>
        
        <div className="my-4">
          <p className="text-4xl font-black text-blue-600">{percentage}%</p>
          <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">Your Score</p>
        </div>

        <button 
          onClick={resetQuiz} 
          className="mt-6 w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-4.5 rounded-2xl font-black text-lg shadow-xl shadow-blue-200 active:scale-95 transition-all hover:bg-blue-700"
        >
          <RotateCcw size={20} />
          RETRY QUIZ
        </button>
      </div>
    );
  }

  const isAnswered = answers[currentStep] !== undefined;

  // --- ACTIVE QUIZ UI ---
  return (
    <div className="flex flex-col w-full max-w-md mx-auto p-4 space-y-5">
      
      {/* Header Info */}
      <div className="flex justify-between items-center px-2">
        <div className="flex flex-col">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Step</span>
            <span className="text-xl font-black text-slate-800 leading-none">
              {currentStep + 1}<span className="text-slate-300 text-sm mx-1">/</span>{questions.length}
            </span>
        </div>
        <div className="w-32">
            <ProgressBar progress={((currentStep + 1) / questions.length) * 100} />
        </div>
      </div>

      {/* Main Question Card */}
      <div className="transition-all duration-300 ease-out">
        <QuizQuestionCard 
          question={questions[currentStep].q}
          options={questions[currentStep].options}
          selectedOption={answers[currentStep]}
          correctIndex={questions[currentStep].correct}
          onSelect={handleSelect}
        />
      </div>

      {/* Bottom Navigation */}
      <div className="flex items-center gap-3 px-1">
        {currentStep > 0 && (
          <button
            onClick={handlePrevious}
            className="w-14 h-14 flex items-center justify-center rounded-2xl border-2 border-slate-100 text-slate-400 hover:bg-slate-50 transition-all active:scale-90"
            title="Previous Question"
          >
            <ChevronLeft size={24} strokeWidth={3} />
          </button>
        )}

        <button
          onClick={handleNext}
          disabled={!isAnswered}
          className={`flex-1 flex items-center justify-center gap-2 h-14 rounded-2xl font-black text-base tracking-tight transition-all shadow-lg ${
            isAnswered 
              ? 'bg-blue-600 text-white shadow-blue-200 active:scale-[0.98] hover:bg-blue-700' 
              : 'bg-slate-100 text-slate-300 cursor-not-allowed shadow-none'
          }`}
        >
          {currentStep === questions.length - 1 ? (
            <span className="flex items-center gap-2">FINISH QUIZ <CheckCircle size={20} /></span>
          ) : (
            <span className="flex items-center gap-2">NEXT QUESTION <ChevronRight size={20} /></span>
          )}
        </button>
      </div>
    </div>
  );
};

export default QuizPanel;
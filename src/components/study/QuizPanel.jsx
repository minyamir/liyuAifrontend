import React, { useState } from 'react';
import QuizQuestionCard from './QuizQuestionCard';
import ProgressBar from './ProgressBar';
import { Trophy, ChevronLeft, ChevronRight, CheckCircle, RotateCcw, Brain, Loader2 } from 'lucide-react';
import { submitQuizResult } from '../../api/aiApi';

const QuizPanel = ({ quizData, onGenerate, loading }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({}); // Format: { 0: "A", 1: "C" }
  const [isFinished, setIsFinished] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const questions = quizData?.questions || [];
  const topic = quizData?.topic || "Topic Mastery";
  const quizId = quizData?.quiz_id;

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-10 text-center space-y-4 animate-pulse">
        <div className="relative">
          <Brain className="text-purple-400" size={48} />
          <Loader2 className="animate-spin text-purple-600 absolute -top-2 -right-2" size={20} />
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Generating Quiz</h3>
          <p className="text-slate-400 text-[10px] max-w-[200px]">
            Liyu AI is creating challenging questions based on your study material...
          </p>
        </div>
      </div>
    );
  }

  // Handle case where quiz isn't generated yet
  if (!quizData || questions.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
        <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mb-4">
          <Brain className="text-purple-500" size={32} />
        </div>
        <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">No Quiz Generated</h3>
        <p className="text-slate-400 text-[10px] mt-2 mb-6 max-w-[220px]">
          Analyze your study material to create a custom practice test.
        </p>
        <button 
          onClick={onGenerate} 
          className="px-8 py-3 bg-purple-600 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-purple-700 transition-all shadow-lg shadow-purple-100"
        >
          Generate Quiz
        </button>
      </div>
    );
  }

  const handleSelect = (letter) => {
    if (answers[currentStep] === undefined) {
      setAnswers({ ...answers, [currentStep]: letter });
    }
  };

  const handleFinish = async () => {
    const correctCount = questions.reduce((acc, q, idx) => (answers[idx] === q.answer ? acc + 1 : acc), 0);
    
    setIsSubmitting(true);
    try {
      await submitQuizResult(quizId, correctCount);
      setIsFinished(true);
    } catch (err) {
      console.error("Submission failed:", err);
      setIsFinished(true); // Still show result even if DB sync fails
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isFinished) {
    const correctCount = questions.reduce((acc, q, idx) => (answers[idx] === q.answer ? acc + 1 : acc), 0);
    const percentage = Math.round((correctCount / questions.length) * 100);

    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-in zoom-in duration-300">
        <div className="w-20 h-20 bg-yellow-400 rounded-[28px] flex items-center justify-center mb-6 shadow-xl shadow-yellow-100 rotate-3">
          <Trophy className="text-white" size={42} />
        </div>
        <h2 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">Results Saved!</h2>
        <div className="my-6">
          <p className="text-5xl font-black text-blue-600">{percentage}%</p>
          <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-1">
            Topic: {topic} • Correct: {correctCount}/{questions.length}
          </p>
        </div>
        <button 
          onClick={() => { setCurrentStep(0); setAnswers({}); setIsFinished(false); }} 
          className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-4 rounded-2xl font-black text-sm tracking-widest hover:bg-black transition-all shadow-xl"
        >
          <RotateCcw size={18} /> RETRY QUIZ
        </button>
      </div>
    );
  }

  const currentQ = questions[currentStep];
  const optionsArray = Object.values(currentQ.options);
  const selectedLetter = answers[currentStep];

  return (
    <div className="flex flex-col w-full h-full bg-white overflow-hidden animate-in fade-in duration-500">
      {/* 1. COMPACT STICKY HEADER */}
      <div className="flex-shrink-0 px-6 py-4 border-b border-slate-50 bg-white/80 backdrop-blur-md sticky top-0 z-20">
        <div className="flex justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="text-[9px] font-black text-purple-600 uppercase tracking-widest bg-purple-50 px-2 py-1 rounded">
              {topic}
            </span>
            <h2 className="text-xl font-black text-slate-800 tracking-tight">
              Q{currentStep + 1}<span className="text-slate-300 mx-1">/</span>{questions.length}
            </h2>
          </div>
          <div className="w-32">
            <div className="flex justify-between text-[9px] font-bold text-slate-400 mb-1 uppercase tracking-widest">
                <span>Progress</span>
                <span>{Math.round(((currentStep + 1) / questions.length) * 100)}%</span>
            </div>
            <ProgressBar progress={((currentStep + 1) / questions.length) * 100} />
          </div>
        </div>
      </div>

      {/* 2. SCROLLABLE CONTENT AREA */}
      <div className="flex-1 overflow-y-auto px-6 py-6 no-scrollbar scroll-smooth">
        <div className="max-w-3xl mx-auto"> 
          <QuizQuestionCard 
            question={currentQ.question}
            options={optionsArray}
            selectedLetter={selectedLetter}
            correctLetter={currentQ.answer}
            explanation={currentQ.explanation}
            onSelect={handleSelect}
          />
        </div>
      </div>

      {/* 3. FIXED BOTTOM NAVIGATION */}
      <div className="flex-shrink-0 p-4 border-t border-slate-100 bg-slate-50/50">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          {currentStep > 0 && (
            <button 
              onClick={() => setCurrentStep(prev => prev - 1)}
              className="w-12 h-12 flex items-center justify-center rounded-xl border-2 border-slate-200 text-slate-400 bg-white hover:bg-slate-50 transition-all active:scale-95"
            >
              <ChevronLeft size={20} strokeWidth={3} />
            </button>
          )}

          <button
            onClick={currentStep === questions.length - 1 ? handleFinish : () => setCurrentStep(prev => prev + 1)}
            disabled={!selectedLetter || isSubmitting}
            className={`flex-1 flex items-center justify-center gap-2 h-12 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg ${
              selectedLetter 
                ? 'bg-blue-600 text-white shadow-blue-100 hover:bg-blue-700' 
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              currentStep === questions.length - 1 
                ? <>Finish Quiz <CheckCircle size={18} /></> 
                : <>Next Question <ChevronRight size={18} /></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizPanel;
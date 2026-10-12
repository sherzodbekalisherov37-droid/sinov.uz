import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  BookOpen, 
  HelpCircle, 
  Minimize2, 
  Trash2,
  CheckCircle2,
  Flame
} from 'lucide-react';
import { ChatMessage, Question, UserProfile } from '../types';
import { askAiMentor } from '../services/aiService';

interface AiMentorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeQuestionContext?: {
    question: Question;
    userAnswerIndex?: number;
  };
  onClearQuestionContext?: () => void;
  userProfile: UserProfile;
}

export const AiMentorDrawer: React.FC<AiMentorDrawerProps> = ({
  isOpen,
  onClose,
  activeQuestionContext,
  onClearQuestionContext,
  userProfile,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg_welcome',
      role: 'assistant',
      text: `Salom, ${userProfile.fullName}! Men sizning AI dars yordamchingizman. ${userProfile.targetExam.toUpperCase()} imtihoniga tayyorgarlikda tushunmagan savollaringiz, grammatika, formulalar yoki test strategiyalari bo'yicha istalgan savolingizni bering.`,
      timestamp: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-prompt when opened with a question context
  useEffect(() => {
    if (activeQuestionContext?.question) {
      const q = activeQuestionContext.question;
      const opts = q.options || [];
      const userSelected = activeQuestionContext.userAnswerIndex !== undefined && typeof activeQuestionContext.userAnswerIndex === 'number' && opts[activeQuestionContext.userAnswerIndex]
        ? opts[activeQuestionContext.userAnswerIndex] 
        : typeof activeQuestionContext.userAnswerIndex === 'string'
        ? activeQuestionContext.userAnswerIndex
        : 'javob berilmagan';
      
      const correctText = q.correctOption !== undefined && opts[q.correctOption] 
        ? opts[q.correctOption] 
        : q.correctTextAnswer || "to'g'ri javob";

      const promptText = `Ushbu savolni tushuntirib bering: "${q.text}". Men ${userSelected ? `"${userSelected}" deb javob berdim` : "javob topolmadim"}. Nega to'g'ri javob "${correctText}" hisoblanadi?`;
      
      setInputVal(promptText);
    }
  }, [activeQuestionContext]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isOpen) return null;

  const handleSendMessage = async (customPrompt?: string) => {
    const textToSend = customPrompt || inputVal;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: 'usr_' + Date.now(),
      role: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsLoading(true);

    try {
      const reply = await askAiMentor(textToSend, {
        examType: userProfile.targetExam,
        currentQuestionText: activeQuestionContext?.question?.text,
        passage: activeQuestionContext?.question?.passage,
        options: activeQuestionContext?.question?.options,
        correctAnswer: activeQuestionContext?.question?.options && activeQuestionContext.question.correctOption !== undefined
          ? activeQuestionContext.question.options[activeQuestionContext.question.correctOption]
          : activeQuestionContext?.question?.correctTextAnswer,
        userAnswer: activeQuestionContext?.userAnswerIndex !== undefined
          ? (activeQuestionContext.question.options?.[activeQuestionContext.userAnswerIndex] ?? String(activeQuestionContext.userAnswerIndex))
          : undefined,
        targetScore: userProfile.targetScore,
      });

      const assistantMsg: ChatMessage = {
        id: 'ai_' + Date.now(),
        role: 'assistant',
        text: reply,
        timestamp: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    "IELTS True/False/Not Given strategiyasi",
    "SAT Math formulalari va qisqa yo'llar",
    "Milliy sertifikatda ona tili sintaksis qoidalari",
    "Qanday qilib testda vaqtni to'g'ri taqsimlay?",
  ];

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[460px] bg-white border-l border-slate-200/80 shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <h3 className="text-sm font-bold text-slate-900 leading-none">AI Dars Yordamchisi</h3>
              <span className="text-[10px] font-semibold uppercase px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-700">
                Online
              </span>
            </div>
            <p className="text-[11px] text-slate-600 leading-tight mt-0.5">
              {userProfile.targetExam.toUpperCase()} bo'yicha shaxsiy repetitor
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-1">
          <button
            onClick={() => setMessages([messages[0]])}
            className="p-1.5 text-slate-600 hover:text-slate-600 hover:bg-slate-200/60 rounded-lg transition-colors"
            title="Tarixni tozalash"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded-lg transition-colors"
            title="Yopish"
            id="close-ai-drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Active Question Context Banner (if triggered from a specific test question) */}
      {activeQuestionContext?.question && (
        <div className="p-3 bg-indigo-50/70 border-b border-indigo-100 flex items-start justify-between text-xs">
          <div className="pr-2">
            <span className="font-bold text-indigo-900 block mb-0.5">
              Faol savol konteksti:
            </span>
            <p className="text-slate-700 font-medium line-clamp-2">
              "{activeQuestionContext.question.text}"
            </p>
          </div>
          {onClearQuestionContext && (
            <button
              onClick={onClearQuestionContext}
              className="text-indigo-600 hover:text-indigo-900 font-bold shrink-0 p-1"
              title="Kontekstni olib tashlash"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs sm:text-sm">
        {messages.map((m) => {
          const isAi = m.role === 'assistant';
          return (
            <div
              key={m.id}
              className={`flex items-start space-x-2.5 ${isAi ? '' : 'flex-row-reverse space-x-reverse'}`}
            >
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                isAi ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-white'
              }`}>
                {isAi ? <Bot className="w-4 h-4" /> : userProfile.fullName.charAt(0)}
              </div>

              <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed shadow-xs whitespace-pre-line ${
                isAi
                  ? 'bg-slate-50 border border-slate-200/80 text-slate-800'
                  : 'bg-slate-900 text-white'
              }`}>
                {m.text}
                <span className={`block text-[10px] mt-1 text-right font-mono ${
                  isAi ? 'text-slate-600' : 'text-slate-300'
                }`}>
                  {m.timestamp}
                </span>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center space-x-2 text-xs text-slate-600 py-2">
            <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce"></div>
            <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.2s]"></div>
            <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.4s]"></div>
            <span className="font-medium text-slate-600">AI tushuntirish tayyorlamoqda...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick suggestions chips */}
      <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50 flex items-center space-x-1.5 overflow-x-auto">
        {quickPrompts.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(q)}
            className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-indigo-300 text-slate-700 hover:text-indigo-700 text-[11px] font-medium whitespace-nowrap transition-colors"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input area */}
      <div className="p-3.5 border-t border-slate-200 bg-white">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center space-x-2"
        >
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Savolingizni yozing..."
            className="flex-1 text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
            id="ai-mentor-input"
          />
          <button
            type="submit"
            disabled={!inputVal.trim() || isLoading}
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white disabled:opacity-40 transition-colors shadow-xs"
            id="send-ai-mentor-btn"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

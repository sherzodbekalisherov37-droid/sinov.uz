import React from 'react';
import { FileEdit, CheckCircle2, AlertCircle } from 'lucide-react';

interface WritingEssayEditorProps {
  questionId: string;
  taskPrompt: string;
  value: string;
  onChange: (val: string) => void;
  minWordCount?: number;
}

export const WritingEssayEditor: React.FC<WritingEssayEditorProps> = ({
  questionId,
  taskPrompt,
  value = '',
  onChange,
  minWordCount = 250,
}) => {
  const words = value.trim() ? value.trim().split(/\s+/).length : 0;
  const characters = value.length;
  const hasMetWordGoal = words >= minWordCount;

  return (
    <div className="space-y-4">
      {/* Editor top status bar */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
        <div className="flex items-center space-x-2">
          <FileEdit className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span className="font-bold text-slate-700 dark:text-slate-200">
            Akademik Insho Muharriri
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5 font-mono">
            <span className={`font-bold ${hasMetWordGoal ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-200'}`}>
              {words}
            </span>
            <span>/ min {minWordCount} so'z</span>
            {hasMetWordGoal ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            ) : (
              <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
            )}
          </div>
          <span className="text-slate-400">·</span>
          <span>{characters} belgi</span>
        </div>
      </div>

      {/* Textarea */}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={14}
        placeholder="Insho matningizni shu yerga yozing... Paragraflarga ajratishni va bog'lovchi so'zlarni (linking words) ishlatishni unutmang."
        className="w-full p-4 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-sm leading-relaxed focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-all font-sans resize-y"
      />
    </div>
  );
};

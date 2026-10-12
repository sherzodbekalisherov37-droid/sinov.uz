export type ExamType = 'ielts' | 'sat' | 'milliy' | 'cefr';

export type UserRole = 'super_admin' | 'admin' | 'teacher' | 'student';

export type QuestionType = 
  | 'multiple_choice' 
  | 'multiple_select' 
  | 'true_false' 
  | 'short_answer' 
  | 'numeric' 
  | 'matching' 
  | 'listening' 
  | 'reading_passage' 
  | 'writing_task' 
  | 'speaking_task';

export type DifficultyLevel = 'Oson' | 'O\'rta' | 'Murakkab';

export interface MatchingPair {
  id: string;
  left: string;
  right: string;
}

export interface Question {
  id: string;
  examType?: ExamType;
  subject?: string; // e.g. 'Matematika', 'Ona tili', 'Reading', 'Math'
  topic?: string; // e.g. 'Algebra', 'Morfologiya', 'Conditionals'
  difficulty?: DifficultyLevel;
  questionType?: QuestionType;
  text: string;
  passage?: string;
  audioSimulationUrl?: string;
  imageUrl?: string;
  formula?: string;
  options?: string[]; // for multiple choice, multiple select, listening, true/false
  correctOption?: number; // 0, 1, 2, 3
  correctOptions?: number[]; // for multiple select
  correctTextAnswer?: string; // for short answer / numeric
  matchingPairs?: MatchingPair[]; // for matching questions
  explanation: string;
  section?: string; // e.g., 'Reading', 'Writing', 'Math', 'Listening'
  skillTag?: string; // e.g., 'Inference', 'Grammar', 'Algebra', 'Vocabulary'
  points: number;
  timeLimitSeconds?: number;
  tags?: string[];
  source?: string;
  sourceYear?: string;
  isOfficialResource?: boolean;
  sourceUrl?: string;
}

export interface MockTest {
  id: string;
  title: string;
  examType: ExamType;
  subject?: string;
  topic?: string;
  description: string;
  durationMinutes: number;
  totalQuestions?: number;
  questions: Question[];
  difficulty: DifficultyLevel;
  tags?: string[];
  author?: string;
  isOfficial?: boolean;
  createdAt?: string;
  isRandomGenerated?: boolean;
  popularity?: number;
  attemptsCount?: number;
}

export type SortOption = 'Popularity' | 'Newest First' | 'Difficulty: Easy to Hard';

export interface SkillPerformance {
  skill?: string;
  correct: number;
  total: number;
  accuracy?: number;
  percentage?: number;
}

export interface SectionScore {
  sectionName: string;
  score: number;
  maxScore: number;
  percentage: number;
  scaledScore?: string;
}

export interface QuestionReviewItem {
  questionId: string;
  questionText: string;
  questionType?: QuestionType;
  userAnswer: any;
  correctAnswer: any;
  isCorrect: boolean;
  explanation: string;
  topic?: string;
  skillTag?: string;
  difficulty?: string;
  timeSpentSeconds?: number;
  pointsEarned?: number;
  maxPoints?: number;
}

export interface UserTestResult {
  id: string;
  testId: string;
  testTitle: string;
  examType: ExamType;
  subject?: string;
  userId: string;
  userName: string;
  completedAt: string;
  score: number;
  maxScore: number;
  percentage: number;
  scaledScore: string; // e.g., "SAT 1420", "IELTS 7.5", "Milliy A+", "CEFR B2"
  diagnosticLevel: string; // e.g., "A+ (92-100%)", "Band 8.0"
  timeSpentSeconds: number;
  averageTimePerQuestion?: number;
  answers: Record<string, any>;
  correctCount: number;
  wrongCount: number;
  unansweredCount: number;
  isPassed?: boolean;
  hasCertificate?: boolean;
  certificateId?: string;
  certificateGrade?: string;
  certificateLevel?: string;
  sectionScores?: Record<string, SectionScore>;
  skillBreakdown: Record<string, SkillPerformance>;
  weakSkills: string[];
  strongSkills: string[];
  recommendations: string[];
  questionReviews?: QuestionReviewItem[];
}

export interface CertificateData {
  id: string;
  testId: string;
  testTitle: string;
  examType: ExamType;
  subject: string;
  userName: string;
  correctCount: number;
  totalQuestions: number;
  score: number;
  percentage: number;
  grade: string;
  levelName: string;
  date: string;
  verificationCode: string;
}

export interface MistakeItem {
  id: string;
  questionId?: string;
  question: Question;
  userAnswer?: any;
  userWrongAnswer?: any;
  attemptDate: string;
  resolved?: boolean;
  retaken?: boolean;
}

export interface ExamConfig {
  examType: ExamType;
  subject?: string;
  topic?: string;
  difficulty?: 'all' | 'Oson' | 'O\'rta' | 'Murakkab';
  questionCount: number;
  durationMinutes: number;
  mode: 'standard' | 'random' | 'mistakes_only' | 'topic_drill' | 'adaptive_weak_skills';
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  date: string;
  type: 'test' | 'result' | 'reminder' | 'system';
  read: boolean;
  link?: string;
}

export interface LeaderboardEntry {
  id: string;
  rank: number;
  userId: string;
  userName: string;
  avatar: string;
  examType: ExamType | 'all';
  score: number;
  accuracy: number;
  testsCount: number;
  isAnonymous?: boolean;
}

export interface UserProfile {
  id: string;
  fullName: string;
  username?: string;
  email: string;
  role?: UserRole;
  targetExam: ExamType;
  targetScore: string;
  currentLevel: string;
  examDate: string; // YYYY-MM-DD
  dailyHours: number;
  studyTimeSlots?: string;
  registeredAt: string;
  completedTestsCount: number;
  avgScore: number;
  avatar?: string;
}

export interface StudyPlanItem {
  id: string;
  day: number;
  dateStr: string;
  title: string;
  description: string;
  category: string;
  estimatedMinutes: number;
  completed: boolean;
  milestone?: string;
  mockTestRecommendation?: string;
}

export interface StudyPlan {
  id: string;
  userId: string;
  targetExam: ExamType;
  targetScore: string;
  remainingDays: number;
  dailyHours: number;
  generatedAt: string;
  items: StudyPlanItem[];
  aiAdvice: string;
  phases: {
    title: string;
    description: string;
    weeks: string;
    focusAreas: string[];
  }[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
  relatedQuestionText?: string;
  relatedCategory?: string;
}

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { TestCatalogView } from './components/TestCatalogView';
import { TestTakingView } from './components/TestTakingView';
import { TestResultView } from './components/TestResultView';
import { StudyPlanView } from './components/StudyPlanView';
import { AnalyticsView } from './components/AnalyticsView';
import { AdminPanelView } from './components/AdminPanelView';
import { MistakesBankView } from './components/MistakesBankView';
import { ExamConfiguratorModal } from './components/ExamConfiguratorModal';
import { AiMentorDrawer } from './components/AiMentorDrawer';
import { OnboardingModal } from './components/OnboardingModal';
import { AiBookTestModal } from './components/AiBookTestModal';
import { PremiumSubscriptionModal } from './components/PremiumSubscriptionModal';

import { 
  CustomSubject,
  ExamConfig,
  ExamType, 
  MistakeItem, 
  MockTest, 
  Question, 
  StudyPlan, 
  UserProfile, 
  UserRole, 
  UserTestResult 
} from './types';
import { INITIAL_MOCK_TESTS } from './data/mockTests';
import { INITIAL_QUESTION_BANK } from './data/questionBank';
import { DEFAULT_USER_PROFILE, INITIAL_STUDENTS_LIST, INITIAL_TEST_RESULTS } from './data/initialData';
import { calculateTestResult, generateStudyPlan } from './utils/scoring';
import { buildConfiguredTest } from './utils/testBuilder';
import { triggerConfetti } from './utils/confetti';
import { syncMonthlyAndBeginnerTests } from './utils/monthlyMockEngine';

export const App: React.FC = () => {
  // Theme state: dark / light
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('sinov_theme');
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('sinov_theme', theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {
      console.warn(e);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // User Profile
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('sinov_user_profile');
      return saved ? JSON.parse(saved) : DEFAULT_USER_PROFILE;
    } catch {
      return DEFAULT_USER_PROFILE;
    }
  });

  // User Role (Super admin, Admin, Teacher, Student)
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>(() => {
    try {
      const saved = localStorage.getItem('sinov_user_role');
      if (saved) return saved as UserRole;
    } catch {}
    return 'student';
  });

  const isAdmin = currentUserRole === 'admin' || currentUserRole === 'super_admin' || currentUserRole === 'teacher';

  const handleChangeUserRole = (role: UserRole) => {
    setCurrentUserRole(role);
    try {
      localStorage.setItem('sinov_user_role', role);
    } catch {}
  };

  // Question Bank
  const [questionBank, setQuestionBank] = useState<Question[]>(() => {
    try {
      const saved = localStorage.getItem('sinov_question_bank');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return INITIAL_QUESTION_BANK;
  });

  useEffect(() => {
    try {
      localStorage.setItem('sinov_question_bank', JSON.stringify(questionBank));
    } catch (e) {
      console.warn(e);
    }
  }, [questionBank]);

  // Mock Tests
  const [mockTests, setMockTests] = useState<MockTest[]>(() => {
    try {
      const saved = localStorage.getItem('sinov_mock_tests');
      let base = INITIAL_MOCK_TESTS;
      if (saved) {
        const parsed: MockTest[] = JSON.parse(saved);
        const existingIds = new Set(parsed.map((t) => t.id));
        const missing = INITIAL_MOCK_TESTS.filter((t) => !existingIds.has(t.id));
        base = [...parsed, ...missing];
      }
      return syncMonthlyAndBeginnerTests(base);
    } catch {
      return syncMonthlyAndBeginnerTests(INITIAL_MOCK_TESTS);
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('sinov_mock_tests', JSON.stringify(mockTests));
    } catch (e) {
      console.warn(e);
    }
  }, [mockTests]);

  // Custom Subjects added by Admin
  const [customSubjects, setCustomSubjects] = useState<CustomSubject[]>(() => {
    try {
      const saved = localStorage.getItem('sinov_custom_subjects');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('sinov_custom_subjects', JSON.stringify(customSubjects));
    } catch (e) {
      console.warn(e);
    }
  }, [customSubjects]);

  const handleAddCustomSubject = (newSubj: CustomSubject) => {
    setCustomSubjects((prev) => [newSubj, ...prev]);
  };

  const handleDeleteCustomSubject = (id: string) => {
    setCustomSubjects((prev) => prev.filter((s) => s.id !== id));
  };

  const handleToggleTestPremium = (testId: string) => {
    setMockTests((prev) =>
      prev.map((t) => (t.id === testId ? { ...t, isPremium: !t.isPremium } : t))
    );
  };

  const handleForceRefreshMonthly = () => {
    setMockTests((prev) => syncMonthlyAndBeginnerTests(prev));
  };

  // Premium Subscription Modal State
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [subscriptionTargetTitle, setSubscriptionTargetTitle] = useState<string | undefined>(undefined);

  const handleOpenSubscriptionModal = (title?: string) => {
    setSubscriptionTargetTitle(title);
    setIsSubscriptionModalOpen(true);
  };

  // Mistakes Bank
  const [userMistakes, setUserMistakes] = useState<MistakeItem[]>(() => {
    try {
      const saved = localStorage.getItem('sinov_mistakes_bank');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('sinov_mistakes_bank', JSON.stringify(userMistakes));
    } catch (e) {
      console.warn(e);
    }
  }, [userMistakes]);

  // Test Results
  const [testResults, setTestResults] = useState<UserTestResult[]>(() => {
    try {
      const saved = localStorage.getItem('sinov_test_results');
      return saved ? JSON.parse(saved) : INITIAL_TEST_RESULTS;
    } catch {
      return INITIAL_TEST_RESULTS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('sinov_test_results', JSON.stringify(testResults));
    } catch (e) {
      console.warn(e);
    }
  }, [testResults]);

  // Study Plan
  const [studyPlan, setStudyPlan] = useState<StudyPlan>(() => {
    try {
      const saved = localStorage.getItem('sinov_study_plan');
      if (saved) return JSON.parse(saved);
    } catch {}
    return generateStudyPlan(DEFAULT_USER_PROFILE);
  });

  useEffect(() => {
    try {
      localStorage.setItem('sinov_study_plan', JSON.stringify(studyPlan));
    } catch (e) {
      console.warn(e);
    }
  }, [studyPlan]);

  // Navigation and active views
  const [activeTab, setActiveTab] = useState<'catalog' | 'mistakes' | 'plan' | 'analytics' | 'mentor' | 'admin'>('catalog');
  const [selectedCategory, setSelectedCategory] = useState<'all' | ExamType>('all');
  const [subjectFilter, setSubjectFilter] = useState<string | undefined>(undefined);
  const [activeTest, setActiveTest] = useState<MockTest | null>(null);
  const [activeResult, setActiveResult] = useState<UserTestResult | null>(null);

  // Modals state
  const [configuratorModal, setConfiguratorModal] = useState<{
    isOpen: boolean;
    examType: ExamType;
    initialSubject?: string;
  }>({
    isOpen: false,
    examType: 'milliy',
  });

  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isAiBookModalOpen, setIsAiBookModalOpen] = useState(false);
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState(false);
  const [aiContext, setAiContext] = useState<{ question: Question; userAnswerIndex?: any } | undefined>(undefined);

  // Profile Save
  const handleSaveProfile = (updatedProfile: UserProfile) => {
    setUserProfile(updatedProfile);
    const newPlan = generateStudyPlan(updatedProfile);
    setStudyPlan(newPlan);
  };

  const handleToggleStudyTask = (taskId: string) => {
    setStudyPlan((prev) => {
      const updatedItems = prev.items.map((item) =>
        item.id === taskId ? { ...item, completed: !item.completed } : item
      );
      return { ...prev, items: updatedItems };
    });
  };

  // Open Configurator Modal
  const handleOpenConfigurator = (examType: ExamType, subject?: string) => {
    setConfiguratorModal({
      isOpen: true,
      examType,
      initialSubject: subject,
    });
  };

  // Start test from Configurator Modal
  const handleStartConfiguredTest = (config: ExamConfig) => {
    const generatedTest = buildConfiguredTest(config, questionBank, userMistakes);
    setActiveTest(generatedTest);
    setActiveResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Start predefined test from catalog
  const handleStartCatalogTest = (testId: string) => {
    const found = mockTests.find((t) => t.id === testId);
    if (found) {
      setActiveTest(found);
      setActiveResult(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Submit test and compute diagnostic result
  const handleFinishTest = (answers: Record<string, any>, timeSpentSeconds: number) => {
    if (!activeTest) return;

    const result = calculateTestResult({
      test: activeTest,
      answers,
      timeSpentSeconds,
      userId: userProfile.id,
      userName: userProfile.fullName,
    });

    // Save result
    setTestResults((prev) => [result, ...prev]);
    setActiveResult(result);
    setActiveTest(null);

    // Save mistakes to Mistake Bank
    const newMistakes: MistakeItem[] = [];
    activeTest.questions.forEach((q) => {
      const review = result.questionReviews?.find((r) => r.questionId === q.id);
      const isCorrect = review !== undefined ? review.isCorrect : false;
      const userAns = answers[q.id];

      if (!isCorrect) {
        newMistakes.push({
          id: `mistake_${Date.now()}_${q.id}`,
          questionId: q.id,
          question: q,
          userAnswer: userAns,
          userWrongAnswer: userAns,
          attemptDate: new Date().toLocaleDateString('uz-UZ'),
          resolved: false,
        });
      }
    });

    if (newMistakes.length > 0) {
      setUserMistakes((prev) => {
        // avoid duplicating same question
        const existingQIds = new Set(prev.map((m) => m.question.id));
        const toAdd = newMistakes.filter((m) => !existingQIds.has(m.question.id));
        return [...toAdd, ...prev];
      });
    }

    // Update userProfile stats
    setUserProfile((prev) => ({
      ...prev,
      completedTestsCount: prev.completedTestsCount + 1,
      avgScore: Math.round(((prev.avgScore * prev.completedTestsCount) + result.percentage) / (prev.completedTestsCount + 1)),
      currentLevel: result.diagnosticLevel,
    }));

    // Trigger celebratory confetti if passed well
    if (result.percentage >= 60) {
      triggerConfetti();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate test from weak skills
  const handleGenerateWeakAreasTest = (weakSkills: string[]) => {
    if (!activeResult) return;
    const test = buildConfiguredTest(
      {
        examType: activeResult.examType,
        questionCount: 15,
        durationMinutes: 25,
        mode: 'adaptive_weak_skills',
      },
      questionBank,
      userMistakes
    );
    setActiveResult(null);
    setActiveTest(test);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Clear single mistake
  const handleClearMistake = (mistakeId: string) => {
    setUserMistakes((prev) => prev.filter((m) => m.id !== mistakeId));
  };

  // Question Bank operations
  const handleAddQuestionToBank = (q: Question) => {
    setQuestionBank((prev) => [q, ...prev]);
  };

  const handleBulkAddQuestions = (newQuestions: Question[]) => {
    setQuestionBank((prev) => [...newQuestions, ...prev]);
  };

  const handleDeleteQuestionFromBank = (qId: string) => {
    setQuestionBank((prev) => prev.filter((q) => q.id !== qId));
  };

  // Mock test operations
  const handleAddMockTest = (newTest: MockTest) => {
    setMockTests((prev) => [newTest, ...prev]);
  };

  const handleDeleteMockTest = (testId: string) => {
    setMockTests((prev) => prev.filter((t) => t.id !== testId));
  };

  // AI Tutor context
  const handleAskAiWithContext = (question: Question, userAnswerIndex?: any) => {
    setAiContext({ question, userAnswerIndex });
    setIsAiDrawerOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans antialiased transition-colors duration-200">
      {/* If currently taking a test, render isolated distraction-free exam engine */}
      {activeTest ? (
        <TestTakingView
          test={activeTest}
          onFinishTest={handleFinishTest}
          onExitTest={() => setActiveTest(null)}
          onAskAiWithContext={handleAskAiWithContext}
        />
      ) : (
        <>
          {/* Main Top Header */}
          <Header
            activeTab={activeTab}
            setActiveTab={(tab) => {
              setActiveTab(tab);
              setActiveResult(null);
            }}
            userProfile={userProfile}
            onOpenProfileModal={() => setIsOnboardingOpen(true)}
            isAdmin={isAdmin}
            currentUserRole={currentUserRole}
            onChangeUserRole={handleChangeUserRole}
            onOpenAiDrawer={() => {
              setAiContext(undefined);
              setIsAiDrawerOpen(true);
            }}
            selectedCategory={selectedCategory}
            onSelectCategory={(cat, subj) => {
              setSelectedCategory(cat);
              setSubjectFilter(subj);
              setActiveTab('catalog');
              setActiveResult(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenAiBookModal={() => setIsAiBookModalOpen(true)}
            mistakesCount={userMistakes.length}
            theme={theme}
            onToggleTheme={toggleTheme}
            onOpenConfigurator={handleOpenConfigurator}
            onOpenSubscriptionModal={() => handleOpenSubscriptionModal()}
          />

          {/* Main Content Area */}
          <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
            {/* If user completed a test or clicked to inspect a result */}
            {activeResult ? (
              <TestResultView
                result={activeResult}
                test={mockTests.find((t) => t.id === activeResult.testId) || {
                  id: activeResult.testId,
                  title: `${activeResult.examType.toUpperCase()} Test Natijasi`,
                  examType: activeResult.examType,
                  description: 'Tahliliy test natijasi',
                  durationMinutes: Math.round(activeResult.timeSpentSeconds / 60) || 30,
                  difficulty: 'O\'rta',
                  totalQuestions: activeResult.maxScore,
                  questions: questionBank.slice(0, activeResult.maxScore),
                  createdAt: new Date().toISOString(),
                }}
                onBackToCatalog={() => {
                  setActiveResult(null);
                  setActiveTab('catalog');
                }}
                onRetakeTest={() => {
                  const testToRetake = mockTests.find((t) => t.id === activeResult.testId);
                  if (testToRetake) {
                    setActiveResult(null);
                    setActiveTest(testToRetake);
                  } else {
                    handleStartConfiguredTest({
                      examType: activeResult.examType,
                      questionCount: activeResult.maxScore,
                      durationMinutes: Math.round(activeResult.timeSpentSeconds / 60) || 30,
                      mode: 'standard',
                    });
                  }
                }}
                onGoToStudyPlan={() => {
                  setActiveResult(null);
                  setActiveTab('plan');
                }}
                onAskAiAboutQuestion={handleAskAiWithContext}
                onGenerateWeakAreasTest={handleGenerateWeakAreasTest}
              />
            ) : (
              <>
                {/* 1. Catalog & Home View */}
                {activeTab === 'catalog' && (
                  <TestCatalogView
                    mockTests={mockTests}
                    onStartTest={handleStartCatalogTest}
                    userProfile={userProfile}
                    onOpenAiDrawer={() => {
                      setAiContext(undefined);
                      setIsAiDrawerOpen(true);
                    }}
                    isAdmin={isAdmin}
                    onOpenCreateTestModal={() => {
                      setCurrentUserRole('admin');
                      setActiveTab('admin');
                    }}
                    selectedCategory={selectedCategory}
                    onSelectCategory={(cat, subj) => {
                      setSelectedCategory(cat);
                      setSubjectFilter(subj);
                    }}
                    subjectFilter={subjectFilter}
                    onClearSubjectFilter={() => setSubjectFilter(undefined)}
                    onOpenAiBookModal={() => setIsAiBookModalOpen(true)}
                    onOpenConfigurator={handleOpenConfigurator}
                    onGoToResults={() => setActiveTab('analytics')}
                    onOpenSubscriptionModal={handleOpenSubscriptionModal}
                    customSubjects={customSubjects}
                  />
                )}

                {/* 2. Mistakes Bank View */}
                {activeTab === 'mistakes' && (
                  <MistakesBankView
                    mistakes={userMistakes}
                    onStartMistakeTest={(t) => {
                      setActiveTest(t);
                      setActiveResult(null);
                    }}
                    onClearMistake={handleClearMistake}
                    onAskAiAboutQuestion={(q) => handleAskAiWithContext(q)}
                  />
                )}

                {/* 3. Individual Study Plan View */}
                {activeTab === 'plan' && (
                  <StudyPlanView
                    studyPlan={studyPlan}
                    userProfile={userProfile}
                    onToggleTask={handleToggleStudyTask}
                    onStartTest={handleStartCatalogTest}
                    onOpenProfileModal={() => setIsOnboardingOpen(true)}
                    onUpdateAiAdvice={(newAdvice) => {
                      setStudyPlan((prev) => ({ ...prev, aiAdvice: newAdvice }));
                    }}
                  />
                )}

                {/* 4. Analytics & Diagnostic View */}
                {activeTab === 'analytics' && (
                  <AnalyticsView
                    userProfile={userProfile}
                    testResults={testResults}
                    onStartTest={handleStartCatalogTest}
                    onViewResultDetails={(res) => setActiveResult(res)}
                  />
                )}

                {/* 5. Admin Panel View */}
                {activeTab === 'admin' && isAdmin && (
                  <AdminPanelView
                    mockTests={mockTests}
                    questionBank={questionBank}
                    onAddQuestionToBank={handleAddQuestionToBank}
                    onBulkAddQuestions={handleBulkAddQuestions}
                    onDeleteQuestionFromBank={handleDeleteQuestionFromBank}
                    onAddMockTest={handleAddMockTest}
                    onDeleteMockTest={handleDeleteMockTest}
                    students={INITIAL_STUDENTS_LIST}
                    testResults={testResults}
                    currentUserRole={currentUserRole}
                    onChangeUserRole={handleChangeUserRole}
                    onBackToStudentView={() => {
                      setActiveTab('catalog');
                    }}
                    onOpenAiBookModal={() => setIsAiBookModalOpen(true)}
                    customSubjects={customSubjects}
                    onAddCustomSubject={handleAddCustomSubject}
                    onDeleteCustomSubject={handleDeleteCustomSubject}
                    onToggleTestPremium={handleToggleTestPremium}
                    onForceRefreshMonthly={handleForceRefreshMonthly}
                  />
                )}
              </>
            )}
          </main>

          {/* Footer */}
          <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 mt-12 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-slate-900 dark:text-white">Sinov.uz</span>
                <span>•</span>
                <span>SAT, Milliy Sertifikat, IELTS va CEFR test maydoni</span>
              </div>
              <div>
                <span>O'zbekiston o'quvchilari uchun 2026 zamonaviy ta'lim platformasi</span>
              </div>
            </div>
          </footer>
        </>
      )}

      {/* Exam Configurator Modal */}
      <ExamConfiguratorModal
        isOpen={configuratorModal.isOpen}
        onClose={() => setConfiguratorModal((prev) => ({ ...prev, isOpen: false }))}
        examType={configuratorModal.examType}
        initialSubject={configuratorModal.initialSubject}
        allQuestions={questionBank}
        userMistakes={userMistakes}
        existingTests={mockTests}
        onStartConfiguredTest={(test) => {
          setConfiguratorModal((prev) => ({ ...prev, isOpen: false }));
          setActiveTest(test);
          setActiveResult(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* AI Book & Document Test Generator Modal */}
      <AiBookTestModal
        isOpen={isAiBookModalOpen}
        onClose={() => setIsAiBookModalOpen(false)}
        onAddTest={handleAddMockTest}
        onStartTestDirectly={(newTest) => {
          setActiveTest(newTest);
          setActiveResult(null);
        }}
        defaultExamType={selectedCategory !== 'all' ? selectedCategory : userProfile.targetExam}
      />

      {/* Profile & Goal Settings Modal */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        userProfile={userProfile}
        onSaveProfile={handleSaveProfile}
      />

      {/* AI Mentor Drawer */}
      <AiMentorDrawer
        isOpen={isAiDrawerOpen}
        onClose={() => setIsAiDrawerOpen(false)}
        activeQuestionContext={aiContext}
        onClearQuestionContext={() => setAiContext(undefined)}
        userProfile={userProfile}
      />

      {/* Premium Subscription Modal */}
      <PremiumSubscriptionModal
        isOpen={isSubscriptionModalOpen}
        onClose={() => setIsSubscriptionModalOpen(false)}
        userProfile={userProfile}
        targetTestTitle={subscriptionTargetTitle}
        onSubscriptionSuccess={(updatedProfile) => {
          setUserProfile(updatedProfile);
        }}
      />
    </div>
  );
};

export default App;

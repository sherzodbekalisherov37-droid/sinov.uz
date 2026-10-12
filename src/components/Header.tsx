import React, { useState, useRef, useEffect } from 'react';
import { 
  BookOpen, 
  Calendar, 
  Sparkles, 
  ShieldCheck, 
  BarChart2, 
  Clock,
  Layers,
  ChevronDown,
  Headphones,
  Edit3,
  Mic,
  Award,
  Globe,
  Zap,
  Bell,
  Check,
  Plus,
  Compass,
  FileText,
  Calculator,
  Languages,
  FlaskConical,
  Scale,
  Atom,
  Landmark,
  BookMarked,
  Sun,
  Moon,
  AlertTriangle,
  Search
} from 'lucide-react';
import { ExamType, UserProfile, UserRole } from '../types';

interface HeaderProps {
  activeTab: 'catalog' | 'mistakes' | 'plan' | 'analytics' | 'mentor' | 'admin';
  setActiveTab: (tab: 'catalog' | 'mistakes' | 'plan' | 'analytics' | 'mentor' | 'admin') => void;
  userProfile: UserProfile;
  onOpenProfileModal: () => void;
  isAdmin: boolean;
  currentUserRole: UserRole;
  onChangeUserRole: (role: UserRole) => void;
  onOpenAiDrawer: () => void;
  selectedCategory: 'all' | ExamType;
  onSelectCategory: (category: 'all' | ExamType, subjectFilter?: string) => void;
  onOpenAiBookModal: () => void;
  mistakesCount?: number;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onOpenConfigurator: (examType: ExamType) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  userProfile,
  onOpenProfileModal,
  isAdmin,
  currentUserRole,
  onChangeUserRole,
  onOpenAiDrawer,
  selectedCategory,
  onSelectCategory,
  onOpenAiBookModal,
  mistakesCount = 0,
  theme,
  onToggleTheme,
  onOpenConfigurator,
}) => {
  const [openDropdown, setOpenDropdown] = useState<ExamType | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navTimeoutRef = useRef<any>(null);

  const handleMouseEnter = (exam: ExamType) => {
    if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);
    setOpenDropdown(exam);
  };

  const handleMouseLeave = () => {
    navTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 200);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('#header-user-menu')) setShowUserMenu(false);
      if (!target.closest('#header-notif-btn')) setShowNotifications(false);
    };
    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, []);

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${
      isScrolled
        ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-xs border-b border-slate-200/80 dark:border-slate-800 py-1'
        : 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                setActiveTab('catalog');
                onSelectCategory('all');
              }}
              className="flex items-center space-x-2.5 text-left group focus:outline-hidden cursor-pointer"
            >
              <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-xl shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <span>S</span>
              </div>
              <div className="flex flex-col">
                <span className="font-black text-slate-900 dark:text-white text-xl tracking-tight leading-none">
                  sinov<span className="text-blue-600 dark:text-blue-400">.uz</span>
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold tracking-wide mt-0.5">
                  Online Imtihon Platformasi
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <button
              onClick={() => {
                setActiveTab('catalog');
                onSelectCategory('all');
              }}
              className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'catalog'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Bosh Sahifa & Testlar
            </button>

            <button
              onClick={() => setActiveTab('mistakes')}
              className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
                activeTab === 'mistakes'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
              <span>Xatolarim</span>
              {mistakesCount > 0 && (
                <span className="text-[10px] bg-rose-500 text-white px-1.5 py-0.2 rounded-full font-bold">
                  {mistakesCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('plan')}
              className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'plan'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              O'quv Rejasi
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'analytics'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Natijalarim
            </button>

            {/* Admin link - only visible if admin / teacher */}
            {isAdmin && (
              <button
                onClick={() => setActiveTab('admin')}
                className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
                  activeTab === 'admin'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Admin Paneli</span>
              </button>
            )}
          </nav>

          {/* Right Tools & User Actions */}
          <div className="flex items-center space-x-2.5">
            {/* Dark / Light Mode Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              title={theme === 'dark' ? "Kunduzgi rejim (Light)" : "Tungi rejim (Dark)"}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* AI Assistant quick button */}
            <button
              onClick={onOpenAiDrawer}
              className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-2 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200/60 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold hover:bg-indigo-100 cursor-pointer transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>AI Ustoz</span>
            </button>

            {/* Notification Bell */}
            <div className="relative" id="header-notif-btn">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors relative cursor-pointer"
                title="Xabarnomalar"
              >
                <Bell className="w-4 h-4" />
                <span className="w-2 h-2 rounded-full bg-blue-600 absolute top-2 right-2 ring-2 ring-white dark:ring-slate-900"></span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 p-4 z-50 animate-fade-in">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black text-slate-900 dark:text-white">Xabarlar</span>
                    <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold cursor-pointer">Barchasi o'qildi</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 bg-blue-50 dark:bg-blue-950/40 rounded-2xl border border-blue-100 dark:border-blue-900/50">
                      <p className="font-bold text-slate-900 dark:text-white">Milliy Sertifikat 2026</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Matematika va Ona tili yangi 30 talik variantlar qo'shildi.</p>
                    </div>
                    <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl">
                      <p className="font-bold text-slate-900 dark:text-white">Kundalik mashq eslatmasi</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Bugungi o'quv rejangiz bo'yicha 1 ta mock test topshiring.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar / User Menu */}
            <div className="relative" id="header-user-menu">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="w-10 h-10 rounded-2xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-black text-xs flex items-center justify-center hover:ring-2 hover:ring-blue-500 transition-all shadow-xs cursor-pointer"
              >
                {userProfile.fullName ? userProfile.fullName.slice(0, 2).toUpperCase() : 'SN'}
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 p-3 z-50 text-xs animate-fade-in">
                  <div className="p-2.5 border-b border-slate-100 dark:border-slate-800 mb-1">
                    <p className="font-bold text-slate-900 dark:text-white truncate">{userProfile.fullName}</p>
                    <p className="text-[11px] text-slate-500 truncate">{userProfile.email}</p>
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 text-[10px] font-bold uppercase">
                        {userProfile.targetExam} ({userProfile.targetScore})
                      </span>
                      <span className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-bold">
                        {currentUserRole}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      onOpenProfileModal();
                    }}
                    className="w-full p-2.5 rounded-xl text-left hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center space-x-2 text-slate-700 dark:text-slate-300 cursor-pointer"
                  >
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    <span>Profil & Imtihon Maqsadi</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      setActiveTab('mistakes');
                    }}
                    className="w-full p-2.5 rounded-xl text-left hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center space-x-2 text-slate-700 dark:text-slate-300 cursor-pointer"
                  >
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                    <span>Xatolarim Banki ({mistakesCount})</span>
                  </button>

                  <div className="border-t border-slate-100 dark:border-slate-800 my-1 pt-1">
                    <span className="text-[10px] text-slate-400 font-bold px-2 block mb-1">
                      Foydalanuvchi roli (Testing):
                    </span>
                    <div className="grid grid-cols-2 gap-1 p-1 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                      {(['student', 'admin', 'teacher', 'super_admin'] as UserRole[]).map((r) => (
                        <button
                          key={r}
                          onClick={() => {
                            onChangeUserRole(r);
                            setShowUserMenu(false);
                          }}
                          className={`p-1 rounded-lg text-[10px] font-bold cursor-pointer transition-colors ${
                            currentUserRole === r ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                          }`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="flex md:hidden items-center justify-between py-2.5 border-t border-slate-200/60 dark:border-slate-800 overflow-x-auto text-xs font-bold space-x-2">
          <button
            onClick={() => {
              setActiveTab('catalog');
              onSelectCategory('all');
            }}
            className={`px-3 py-1.5 rounded-xl shrink-0 ${
              activeTab === 'catalog' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            Testlar
          </button>
          <button
            onClick={() => setActiveTab('mistakes')}
            className={`px-3 py-1.5 rounded-xl shrink-0 ${
              activeTab === 'mistakes' ? 'bg-rose-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            Xatolarim ({mistakesCount})
          </button>
          <button
            onClick={() => setActiveTab('plan')}
            className={`px-3 py-1.5 rounded-xl shrink-0 ${
              activeTab === 'plan' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            Reja
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-3 py-1.5 rounded-xl shrink-0 ${
              activeTab === 'analytics' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            Natijalar
          </button>
          {isAdmin && (
            <button
              onClick={() => setActiveTab('admin')}
              className={`px-3 py-1.5 rounded-xl shrink-0 ${
                activeTab === 'admin' ? 'bg-indigo-600 text-white' : 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300'
              }`}
            >
              Admin
            </button>
          )}
        </div>
      </div>
    </header>
  );
};


import { User, StressResult, MoodEntry, AIAnalysis, MoodType, StressLevel } from '../types';

const STORAGE_KEYS = {
  USERS: 'sm_users',
  STRESS_RESULTS: 'sm_stress',
  MOODS: 'sm_moods',
  AI_HISTORY: 'sm_ai',
  CURRENT_USER: 'sm_current_user'
};

const get = <T,>(key: string): T[] => JSON.parse(localStorage.getItem(key) || '[]');
const save = <T,>(key: string, data: T[]): void => localStorage.setItem(key, JSON.stringify(data));

// Simulation of API Endpoints
export const db = {
  // Auth: POST /api/auth/register, login
  auth: {
    register: (name: string, email: string): User => {
      const users = get<User>(STORAGE_KEYS.USERS);
      const newUser = { id: Math.random().toString(36).substr(2, 9), name, email };
      users.push(newUser);
      save(STORAGE_KEYS.USERS, users);
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(newUser));
      return newUser;
    },
    login: (email: string): User | null => {
      const users = get<User>(STORAGE_KEYS.USERS);
      const user = users.find(u => u.email === email);
      if (user) localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
      return user || null;
    },
    logout: () => localStorage.removeItem(STORAGE_KEYS.CURRENT_USER),
    getCurrentUser: (): User | null => JSON.parse(localStorage.getItem(STORAGE_KEYS.CURRENT_USER) || 'null')
  },

  // Stress: POST /api/stress/submit, GET /api/stress/history
  stress: {
    submit: (userId: string, score: number): StressResult => {
      const history = get<StressResult>(STORAGE_KEYS.STRESS_RESULTS);
      let level = StressLevel.LOW;
      if (score >= 21) level = StressLevel.HIGH;
      else if (score >= 11) level = StressLevel.MODERATE;

      const result: StressResult = {
        id: Math.random().toString(36).substr(2, 9),
        userId,
        score,
        level,
        date: new Date().toISOString()
      };
      history.push(result);
      save(STORAGE_KEYS.STRESS_RESULTS, history);
      return result;
    },
    getHistory: (userId: string) => get<StressResult>(STORAGE_KEYS.STRESS_RESULTS).filter(r => r.userId === userId)
  },

  // Mood: POST /api/mood/add, GET /api/mood/weekly
  mood: {
    add: (userId: string, mood: MoodType, note: string): MoodEntry => {
      const entries = get<MoodEntry>(STORAGE_KEYS.MOODS);
      const entry: MoodEntry = {
        id: Math.random().toString(36).substr(2, 9),
        userId,
        mood,
        note,
        date: new Date().toISOString()
      };
      entries.push(entry);
      save(STORAGE_KEYS.MOODS, entries);
      return entry;
    },
    getWeekly: (userId: string) => {
      const entries = get<MoodEntry>(STORAGE_KEYS.MOODS).filter(e => e.userId === userId);
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      return entries.filter(e => new Date(e.date) >= sevenDaysAgo);
    }
  },

  // AI: POST /api/ai/analyze (handled by geminiService + db save), GET /api/ai/history
  ai: {
    saveAnalysis: (analysis: Partial<AIAnalysis>) => {
      const history = get<AIAnalysis>(STORAGE_KEYS.AI_HISTORY);
      const entry = { ...analysis, id: Math.random().toString(36).substr(2, 9) } as AIAnalysis;
      history.push(entry);
      save(STORAGE_KEYS.AI_HISTORY, history);
      return entry;
    },
    getHistory: (userId: string) => get<AIAnalysis>(STORAGE_KEYS.AI_HISTORY).filter(a => a.userId === userId)
  }
};

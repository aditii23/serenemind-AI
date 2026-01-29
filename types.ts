
export enum MoodType {
  HAPPY = 'Happy',
  SAD = 'Sad',
  ANXIOUS = 'Anxious',
  ANGRY = 'Angry',
  CALM = 'Calm'
}

export enum StressLevel {
  LOW = 'Low Stress',
  MODERATE = 'Moderate Stress',
  HIGH = 'High Stress'
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface StressResult {
  id: string;
  userId: string;
  score: number;
  level: StressLevel;
  date: string;
}

export interface MoodEntry {
  id: string;
  userId: string;
  mood: MoodType;
  note: string;
  date: string;
}

export interface AIAnalysis {
  id: string;
  userId: string;
  inputText: string;
  stressLevel: string;
  emotion: string;
  possibleCause: string;
  tips: string[];
  empatheticSummary: string;
  date: string;
}

export interface Question {
  id: number;
  text: string;
  options: { text: string; score: number }[];
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: 'Breathing' | 'Grounding' | 'Focus';
}

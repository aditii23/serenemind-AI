
import { Question, Exercise, MoodType } from './types';

export const STRESS_QUESTIONS: Question[] = [
  {
    id: 1,
    text: "How often have you been upset because of something that happened unexpectedly?",
    options: [
      { text: "Never", score: 0 },
      { text: "Almost Never", score: 1 },
      { text: "Sometimes", score: 2 },
      { text: "Fairly Often", score: 3 }
    ]
  },
  {
    id: 2,
    text: "How often have you felt that you were unable to control the important things in your life?",
    options: [
      { text: "Never", score: 0 },
      { text: "Almost Never", score: 1 },
      { text: "Sometimes", score: 2 },
      { text: "Fairly Often", score: 3 }
    ]
  },
  {
    id: 3,
    text: "How often have you felt nervous and 'stressed'?",
    options: [
      { text: "Never", score: 0 },
      { text: "Almost Never", score: 1 },
      { text: "Sometimes", score: 2 },
      { text: "Fairly Often", score: 3 }
    ]
  },
  {
    id: 4,
    text: "How often have you felt confident about your ability to handle your personal problems?",
    options: [
      { text: "Never", score: 3 },
      { text: "Almost Never", score: 2 },
      { text: "Sometimes", score: 1 },
      { text: "Fairly Often", score: 0 }
    ]
  },
  {
    id: 5,
    text: "How often have you felt that things were going your way?",
    options: [
      { text: "Never", score: 3 },
      { text: "Almost Never", score: 2 },
      { text: "Sometimes", score: 1 },
      { text: "Fairly Often", score: 0 }
    ]
  },
  {
    id: 6,
    text: "How often have you found that you could not cope with all the things that you had to do?",
    options: [
      { text: "Never", score: 0 },
      { text: "Almost Never", score: 1 },
      { text: "Sometimes", score: 2 },
      { text: "Fairly Often", score: 3 }
    ]
  },
  {
    id: 7,
    text: "How often have you been able to control irritations in your life?",
    options: [
      { text: "Never", score: 3 },
      { text: "Almost Never", score: 2 },
      { text: "Sometimes", score: 1 },
      { text: "Fairly Often", score: 0 }
    ]
  },
  {
    id: 8,
    text: "How often have you felt that you were on top of things?",
    options: [
      { text: "Never", score: 3 },
      { text: "Almost Never", score: 2 },
      { text: "Sometimes", score: 1 },
      { text: "Fairly Often", score: 0 }
    ]
  },
  {
    id: 9,
    text: "How often have you been angered because of things that were outside of your control?",
    options: [
      { text: "Never", score: 0 },
      { text: "Almost Never", score: 1 },
      { text: "Sometimes", score: 2 },
      { text: "Fairly Often", score: 3 }
    ]
  },
  {
    id: 10,
    text: "How often have you felt difficulties were piling up so high that you could not overcome them?",
    options: [
      { text: "Never", score: 0 },
      { text: "Almost Never", score: 1 },
      { text: "Sometimes", score: 2 },
      { text: "Fairly Often", score: 3 }
    ]
  }
];

export const GUIDED_EXERCISES: Exercise[] = [
  {
    id: 'breathe-1',
    title: 'Box Breathing',
    description: 'Inhale, hold, exhale, hold. Repeat for mental clarity.',
    duration: '2 min',
    category: 'Breathing'
  },
  {
    id: 'ground-1',
    title: '5-4-3-2-1 Grounding',
    description: 'A sensory awareness exercise to bring you back to the present moment.',
    duration: '5 min',
    category: 'Grounding'
  },
  {
    id: 'focus-1',
    title: 'Pomodoro Focus Reset',
    description: 'A quick mental reset specifically designed for students between study sessions.',
    duration: '3 min',
    category: 'Focus'
  }
];

export const EMERGENCY_CONTACTS = [
  { name: "Vandrevala Foundation", contact: "9999666555", info: "24/7 Helpline (India)" },
  { name: "AASRA", contact: "9820466726", info: "24/7 Suicide Prevention (India)" },
  { name: "iCall (TISS)", contact: "9152987821", info: "Mon-Sat, 10am-8pm" }
];

export const MOOD_EMOJIS: Record<MoodType, string> = {
  [MoodType.HAPPY]: "😊",
  [MoodType.SAD]: "😔",
  [MoodType.ANXIOUS]: "😰",
  [MoodType.ANGRY]: "😠",
  [MoodType.CALM]: "🧘"
};

import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

// --- Types ---
export interface Answer {
  id: string;
  expertName: string;
  expertRole: string;
  avatar: string;
  content: string;
  date: string;
}

export interface Problem {
  id: string;
  title: string;
  description: string;
  author: string;
  category: 'Web Dev' | 'Design' | 'Marketing' | 'Career';
  date: string;
  status: 'Open' | 'Solved';
  answers: Answer[];
}

interface ProblemContextType {
  problems: Problem[];
  addProblem: (problem: Omit<Problem, 'id' | 'date' | 'status' | 'answers'>) => void;
  addAnswer: (problemId: string, answer: Omit<Answer, 'id' | 'date'>) => void;
}

// --- Mock Data ---
const initialProblems: Problem[] = [
  {
    id: 'p1',
    title: 'How do I optimize React Context re-renders?',
    description: 'My entire app is wrapped in a massive Context provider, and every time a deeply nested component updates the state, the whole app re-renders. What is the best pattern to fix this without switching to Redux?',
    author: 'Alex J.',
    category: 'Web Dev',
    date: '2023-10-25',
    status: 'Solved',
    answers: [
      {
        id: 'a1',
        expertName: 'Elena Rodriguez',
        expertRole: 'Lead Developer',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop',
        content: 'Great question! The key is to split your context. Instead of one massive `AppContext`, create separate contexts for state that changes frequently (like `UIContext`) vs state that rarely changes (like `AuthContext`). Additionally, use `useMemo` on your context value, and for heavily updating state, consider Zustand or Jotai as they are much lighter than Redux but avoid Context re-render issues.',
        date: '2023-10-26'
      }
    ]
  },
  {
    id: 'p2',
    title: 'Facebook Ads ROAS is dropping. Help!',
    description: 'I was getting a 3x ROAS on my e-commerce brand, but in the last two weeks, it dropped to 1.2x. My creatives are the same. What should I test first?',
    author: 'Sarah Brands',
    category: 'Marketing',
    date: '2023-10-27',
    status: 'Open',
    answers: [
      {
        id: 'a2',
        expertName: 'Antor Biswas',
        expertRole: 'Growth Expert',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop',
        content: 'Creative fatigue is the most likely culprit here. If you haven\'t changed creatives in weeks, your frequency is probably too high. First, pause the bleeding campaigns. Second, test 3 new hooks (the first 3 seconds of the video) on your best-performing ad. Meta favors rapid creative testing right now over audience targeting tweaks.',
        date: '2023-10-27'
      }
    ]
  },
  {
    id: 'p3',
    title: 'Switching from Figma to code?',
    description: 'I am a UI/UX designer looking to learn frontend development so I can build my own designs. Should I start with basic HTML/CSS or jump straight into React/Next.js?',
    author: 'DesignMike',
    category: 'Career',
    date: '2023-10-28',
    status: 'Solved',
    answers: [
      {
        id: 'a3',
        expertName: 'Marcus Wright',
        expertRole: 'Creative Director',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop',
        content: 'Do NOT jump straight to React! As a designer, you already understand layouts and visual hierarchy. Translate that directly into CSS first using Flexbox and CSS Grid. Build 2-3 static pages with plain HTML/CSS. Once you feel comfortable styling, then introduce React to handle the logic and components. Check out our Career Guidelines section below for a full roadmap!',
        date: '2023-10-29'
      }
    ]
  }
];

// --- Context Setup ---
const ProblemContext = createContext<ProblemContextType | undefined>(undefined);

export const ProblemProvider = ({ children }: { children: ReactNode }) => {
  const [problems, setProblems] = useState<Problem[]>(initialProblems);

  const addProblem = (newProblem: Omit<Problem, 'id' | 'date' | 'status' | 'answers'>) => {
    const problem: Problem = {
      ...newProblem,
      id: `p${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Open',
      answers: [],
    };
    // Add to top of the list
    setProblems((prev) => [problem, ...prev]);
  };

  const addAnswer = (problemId: string, newAnswer: Omit<Answer, 'id' | 'date'>) => {
    const answer: Answer = {
      ...newAnswer,
      id: `a${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    };

    setProblems((prev) => 
      prev.map(p => {
        if (p.id === problemId) {
          return {
            ...p,
            status: 'Solved', // Mark solved if an expert answers
            answers: [...p.answers, answer]
          };
        }
        return p;
      })
    );
  };

  return (
    <ProblemContext.Provider value={{ problems, addProblem, addAnswer }}>
      {children}
    </ProblemContext.Provider>
  );
};

export const useProblems = () => {
  const context = useContext(ProblemContext);
  if (context === undefined) {
    throw new Error('useProblems must be used within a ProblemProvider');
  }
  return context;
};

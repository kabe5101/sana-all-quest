import wordData from '../data/tagalog_word.json';
import phraseData from '../data/tagalog_phrase.json';
import quizData from '../data/tagalog_grammer.json';
import { Word, Phrase, QuizItem } from '../types';

// Cast data to correct types as JSON imports are often treated as any or unknown
const words = wordData as unknown as Word[];
const phrases = phraseData as unknown as Phrase[];
const quizzes = quizData as unknown as QuizItem[];

export const getWords = (): Word[] => words;
export const getPhrases = (): Phrase[] => phrases;
export const getQuizzes = (): QuizItem[] => quizzes;

export const getWordsByCategory = (category: string): Word[] => {
    return words.filter(word => word.category === category);
};

export const getPhrasesByCategory = (category: string): Phrase[] => {
    return phrases.filter(phrase => phrase.category === category);
};

export const getQuizzesByStage = (stage: number): QuizItem[] => {
    return quizzes.filter(quiz => quiz.stage === stage);
};

export const getWordById = (id: number): Word | undefined => {
    return words.find(word => word.id === id);
};

"use client";

import wordData from '../data/tagalog_word.json';
import phraseData from '../data/tagalog_phrase.json';
import grammarData from '../data/tagalog_grammer.json';
import { Word, Phrase, QuizItem } from '../types';

const words = wordData as unknown as Word[];
const phrases = phraseData as unknown as Phrase[];
const grammars = grammarData as unknown as QuizItem[];

export const getWords = (): Word[] => words;
export const getPhrases = (): Phrase[] => phrases;
export const getQuizzes = (): QuizItem[] => grammars;

// ステージに応じた Word/Phrase の ID 範囲マッピング
const STAGE_WORD_RANGES: Record<number, [number, number]> = {
    1: [1, 10],
    2: [11, 20],
    3: [21, 30],
    4: [41, 50],
    5: [51, 65],
    6: [66, 80],
    7: [81, 95],
    8: [96, 110],
    9: [111, 125],
    10: [1, 15],   // 再利用（難易度高いもの優先）
    11: [16, 30],
    12: [31, 50],
    13: [51, 70],
    14: [71, 90],
    15: [91, 110],
};

// フレーズのID範囲（ID 8001〜8300）
const STAGE_PHRASE_RANGES: Record<number, [number, number]> = {
    1: [8001, 8020],
    2: [8021, 8040],
    3: [8041, 8060],
    4: [8061, 8080],
    5: [8081, 8100],
    6: [8101, 8120],
    7: [8121, 8140],
    8: [8141, 8160],
    9: [8161, 8180],
    10: [8181, 8200],
    11: [8201, 8220],
    12: [8221, 8240],
    13: [8241, 8260],
    14: [8261, 8280],
    15: [8281, 8300],
};

// Fisher-Yates シャッフル
function shuffle<T>(arr: T[]): T[] {
    const result = [...arr];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

// Word → QuizItem 変換
function wordToQuizItem(word: Word, stage: number, baseId: number): QuizItem {
    // 正解以外の選択肢を他の単語からランダムに抽出
    const distractors = words
        .filter(w => w.id !== word.id && w.meaningJa !== word.meaningJa)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(w => w.meaningJa);

    const choices = shuffle([word.meaningJa, ...distractors]);
    const answerIndex = choices.indexOf(word.meaningJa);

    return {
        id: baseId,
        stage,
        type: 'word',
        question: `「${word.word}」の意味は？`,
        choices,
        answerIndex,
        grammarPoint: `単語：${word.partOfSpeech}`,
        explanation: `${word.word}＝${word.meaningJa}。例：${word.exampleTl}`,
    };
}

// Phrase → QuizItem 変換
function phraseToQuizItem(phrase: Phrase, stage: number, baseId: number): QuizItem {
    // 正解以外の選択肢を他のフレーズからランダムに抽出
    const distractors = phrases
        .filter(p => p.id !== phrase.id && p.meaning !== phrase.meaning)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(p => p.meaning);

    const choices = shuffle([phrase.meaning, ...distractors]);
    const answerIndex = choices.indexOf(phrase.meaning);

    return {
        id: baseId,
        stage,
        type: 'phrase',
        question: `「${phrase.text}」の意味は？`,
        choices,
        answerIndex,
        grammarPoint: `フレーズ：${phrase.category || '日常'}`,
        explanation: `${phrase.text}＝${phrase.meaning}。${phrase.example ? `例：${phrase.example}` : ''}`,
    };
}

// メイン：ステージ別クイズ取得（word×5 / grammar×3 / phrase×2）
export const getQuizzesByStage = (stage: number): QuizItem[] => {
    if (stage < 1 || stage > 15) return [];

    // 1. Grammar 問題（3問）
    const grammarItems = grammars
        .filter(q => q.stage === stage);
    const grammarSelected = shuffle(grammarItems).slice(0, 3);

    // 2. Word 問題（5問）
    const [wordMin, wordMax] = STAGE_WORD_RANGES[stage] ?? [1, 10];
    const stageWords = words.filter(w => w.id >= wordMin && w.id <= wordMax);
    const wordSelected = shuffle(stageWords)
        .slice(0, 5)
        .map((w, i) => wordToQuizItem(w, stage, 90000 + stage * 100 + i));

    // 3. Phrase 問題（2問）
    const [phraseMin, phraseMax] = STAGE_PHRASE_RANGES[stage] ?? [8001, 8020];
    const stagePhrases = phrases.filter(p => p.id >= phraseMin && p.id <= phraseMax);
    const phraseSelected = shuffle(stagePhrases)
        .slice(0, 2)
        .map((p, i) => phraseToQuizItem(p, stage, 80000 + stage * 100 + i));

    // 4. 結合してシャッフル
    return shuffle([...wordSelected, ...grammarSelected, ...phraseSelected]);
};

export const getWordById = (id: number): Word | undefined => {
    return words.find(word => word.id === id);
};

export const getWordsByCategory = (category: string): Word[] => {
    return words.filter(word => word.category === category);
};

export const getPhrasesByCategory = (category: string): Phrase[] => {
    return phrases.filter(phrase => phrase.category === category);
};

// ボス戦対象エリアの定義（ボスステージ番号 → 対象ステージ配列）
const BOSS_STAGE_AREAS: Record<number, number[]> = {
    3: [1, 2, 3],
    6: [4, 5, 6],
    9: [7, 8, 9],
    12: [10, 11, 12],
    15: [13, 14, 15],
};

// ボス戦クイズ取得（対象エリア3ステージ分のプールから word×5 / grammar×3 / phrase×2）
export const getBossQuizzes = (bossStage: number): QuizItem[] => {
    const targetStages = BOSS_STAGE_AREAS[bossStage];
    if (!targetStages) return [];

    // 1. Grammar問題プール（対象3ステージ分を結合）
    const grammarPool = grammars.filter(q => targetStages.includes(q.stage));
    const grammarSelected = shuffle(grammarPool).slice(0, 3);

    // 2. Word問題プール（各ステージのID範囲合算）
    const wordItems: QuizItem[] = [];
    targetStages.forEach(stage => {
        const [min, max] = STAGE_WORD_RANGES[stage] ?? [1, 10];
        const stageWords = words.filter(w => w.id >= min && w.id <= max);
        const picked = shuffle(stageWords)
            .slice(0, 2) // 各ステージから2問ずつ → 最大6問から5問選ぶ
            .map((w, i) => wordToQuizItem(w, stage, 70000 + stage * 100 + i));
        wordItems.push(...picked);
    });
    const wordSelected = shuffle(wordItems).slice(0, 5);

    // 3. Phrase問題プール（各ステージのID範囲合算）
    const phraseItems: QuizItem[] = [];
    targetStages.forEach(stage => {
        const [min, max] = STAGE_PHRASE_RANGES[stage] ?? [8001, 8020];
        const stagePhrases = phrases.filter(p => p.id >= min && p.id <= max);
        const picked = shuffle(stagePhrases)
            .slice(0, 1) // 各ステージから1問ずつ → 3問から2問選ぶ
            .map((p, i) => phraseToQuizItem(p, stage, 60000 + stage * 100 + i));
        phraseItems.push(...picked);
    });
    const phraseSelected = shuffle(phraseItems).slice(0, 2);

    return shuffle([...wordSelected, ...grammarSelected, ...phraseSelected]);
};


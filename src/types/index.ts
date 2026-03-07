export interface StoryScene {
    speaker: string;
    text: string;
}

export interface StageStoryData {
    stageId: number;
    title: string;
    startStory: StoryScene[];
    endStory: StoryScene[];
    isBossStage: boolean;
    bossStartStory?: StoryScene[];
    bossEndStory?: StoryScene[];
}

export interface Word {
    id: number;
    word: string;
    root: string;
    partOfSpeech: 'noun' | 'verb' | 'adjective' | 'adverb' | 'preposition' | 'pronoun' | 'conjunction' | 'particle';
    meaningJa: string;
    meaningEn: string;
    exampleTl: string;
    exampleJa: string;
    category: string;
    difficulty: number;
}

export interface Phrase {
    id: number;
    type: 'phrase';
    text: string;
    literalMeaning: string;
    meaning: string;
    usage: string;
    example?: string;
    exampleJa?: string;
    difficulty: number;
    category: string;
}

export interface QuizItem {
    id: number;
    stage: number;
    type: 'meaning' | 'fill_blank' | 'order' | 'error' | 'word' | 'phrase';
    question: string;
    choices: string[];
    answerIndex: number;
    grammarPoint: string;
    explanation: string;
}

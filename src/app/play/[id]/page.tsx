"use client";

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { useGameState } from '../../../lib/GameStateContext';
import GameLayout from '../../../components/GameLayout';
import DialogueBox from '../../../components/DialogueBox';
import ChoiceButton from '../../../components/ChoiceButton';
import StoryViewer from '../../../components/StoryViewer';
import { getQuizzesByStage, getBossQuizzes } from '../../../lib/data_loader';
import { getStoryByStage } from '../../../data/story_data';
import { QuizItem } from '../../../types';

type GamePhase =
    | 'start_story'
    | 'quiz'
    | 'end_story'
    | 'boss_start_story'
    | 'boss_quiz'
    | 'boss_end_story';

const BOSS_STAGES = [3, 6, 9, 12, 15];

export default function PlayStage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const stageId = parseInt(id);

    const router = useRouter();
    const { state, setStage, takeDamage, earnMoney, heal } = useGameState();

    const [phase, setPhase] = useState<GamePhase>('start_story');
    const [quizzes, setQuizzes] = useState<QuizItem[]>([]);
    const [bossQuizzes, setBossQuizzes] = useState<QuizItem[]>([]);
    const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
    const [feedback, setFeedback] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(true);

    const storyData = getStoryByStage(stageId);
    const isBossStage = BOSS_STAGES.includes(stageId);

    useEffect(() => {
        if (!stageId) return;
        setQuizzes(getQuizzesByStage(stageId));
        if (isBossStage) {
            setBossQuizzes(getBossQuizzes(stageId));
        }
        setLoading(false);
    }, [stageId, isBossStage]);

    // ─── ストーリーフェーズの完了処理 ─────────────────────
    const handleStartStoryComplete = () => setPhase('quiz');

    const handleEndStoryComplete = () => {
        if (isBossStage && storyData?.bossStartStory) {
            setPhase('boss_start_story');
        } else {
            finishStage();
        }
    };

    const handleBossStartStoryComplete = () => {
        setCurrentQuizIndex(0);
        setFeedback(null);
        setIsCorrect(null);
        setPhase('boss_quiz');
    };

    const handleBossEndStoryComplete = () => {
        finishStage();
    };

    const finishStage = () => {
        heal(30);
        if (stageId < 15) {
            setStage(stageId + 1);
            router.push('/stage');
        } else {
            router.push('/');
        }
    };

    // ─── クイズ処理 ─────────────────────────────────────
    const currentQuizList = phase === 'boss_quiz' ? bossQuizzes : quizzes;
    const currentQuiz = currentQuizList[currentQuizIndex];

    const handleAnswer = (choiceIndex: number) => {
        if (!currentQuiz) return;
        const correct = choiceIndex === currentQuiz.answerIndex;
        setIsCorrect(correct);
        if (correct) {
            setFeedback('Tama! (Correct!) ' + currentQuiz.explanation);
            earnMoney(100);
        } else {
            setFeedback('Mali! (Wrong!) ' + currentQuiz.explanation);
            takeDamage(20);
        }
    };

    const nextQuiz = () => {
        setFeedback(null);
        setIsCorrect(null);

        if (state.hp <= 0) {
            router.push('/');
            return;
        }

        if (currentQuizIndex < currentQuizList.length - 1) {
            setCurrentQuizIndex(prev => prev + 1);
        } else {
            // クイズ終了
            if (phase === 'quiz') {
                setCurrentQuizIndex(0);
                setPhase('end_story');
            } else if (phase === 'boss_quiz') {
                setPhase('boss_end_story');
            }
        }
    };

    // ─── ローディング / データなし ─────────────────────────
    if (loading) {
        return <GameLayout><div className="text-center mt-20">Loading Stage {stageId}...</div></GameLayout>;
    }

    if (!storyData && phase === 'start_story') {
        setPhase('quiz');
    }

    // ─── ストーリーフェーズのレンダリング ─────────────────────
    if (phase === 'start_story' && storyData?.startStory) {
        return (
            <GameLayout>
                <div />
                <StoryViewer
                    scenes={storyData.startStory}
                    title={`Stage ${stageId}：${storyData.title}`}
                    onComplete={handleStartStoryComplete}
                    imagePath={`/images/Stage${stageId}_start.jpg`}
                />
            </GameLayout>
        );
    }

    if (phase === 'end_story' && storyData?.endStory) {
        return (
            <GameLayout>
                <div />
                <StoryViewer
                    scenes={storyData.endStory}
                    title={`Stage ${stageId} クリア`}
                    onComplete={handleEndStoryComplete}
                    imagePath={`/images/Stage${stageId}_end.jpg`}
                />
            </GameLayout>
        );
    }

    if (phase === 'boss_start_story' && storyData?.bossStartStory) {
        return (
            <GameLayout>
                <div />
                <StoryViewer
                    scenes={storyData.bossStartStory}
                    title={`Boss Battle ${Math.ceil(stageId / 3)}`}
                    onComplete={handleBossStartStoryComplete}
                    isBoss
                    imagePath={`/images/Stage${stageId}-boss_start.jpg`}
                />
            </GameLayout>
        );
    }

    if (phase === 'boss_end_story' && storyData?.bossEndStory) {
        return (
            <GameLayout>
                <div />
                <StoryViewer
                    scenes={storyData.bossEndStory}
                    title="Boss Defeated!"
                    onComplete={handleBossEndStoryComplete}
                    isBoss
                    imagePath={`/images/Stage${stageId}-boss_end.jpg`}
                />
            </GameLayout>
        );
    }

    // ─── クイズフェーズのレンダリング ─────────────────────────
    if (!currentQuiz) {
        return (
            <GameLayout>
                <div className="text-center mt-20 text-red-500">
                    No data for Stage {stageId}.<br />
                    <button onClick={() => router.push('/stage')} className="mt-4 underline">Back to Stage Select</button>
                </div>
            </GameLayout>
        );
    }

    const isBossQuizPhase = phase === 'boss_quiz';
    const totalQuestions = currentQuizList.length;

    return (
        <GameLayout>
            <div className="flex flex-col h-full max-w-2xl mx-auto">
                {/* ヘッダー */}
                <div className="mb-4 flex justify-between items-end">
                    <div className="flex items-center gap-3">
                        <h2 className={`text-2xl font-bold ${isBossQuizPhase ? 'text-red-400' : 'text-neon-pink'}`}>
                            {isBossQuizPhase ? `👑 BOSS ${Math.ceil(stageId / 3)}` : `STAGE ${stageId}`}
                        </h2>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${currentQuiz.type === 'word' ? 'bg-blue-900 border-blue-400 text-blue-300' :
                            currentQuiz.type === 'phrase' ? 'bg-purple-900 border-purple-400 text-purple-300' :
                                'bg-yellow-900 border-yellow-400 text-yellow-300'
                            }`}>
                            {currentQuiz.type === 'word' ? '📖 単語' : currentQuiz.type === 'phrase' ? '💬 フレーズ' : '📝 文法'}
                        </span>
                    </div>
                    <span className="text-gray-400 text-sm">Q {currentQuizIndex + 1} / {totalQuestions}</span>
                </div>

                {/* 問題 */}
                <DialogueBox
                    speaker={isBossQuizPhase ? 'Boss Challenge' : 'Situation'}
                    text={currentQuiz.question}
                    showNextArrow={false}
                />

                {/* フィードバック */}
                {feedback && (
                    <div className={`p-4 mb-4 rounded-lg border-2 ${isCorrect ? 'bg-green-900 border-green-500' : 'bg-red-900 border-red-500'}`}>
                        <p className="font-bold text-lg mb-2">{isCorrect ? 'MAGALING! (Good Job!)' : 'ARAY! (Ouch!)'}</p>
                        <p>{feedback}</p>
                        <button
                            onClick={nextQuiz}
                            className="mt-4 bg-gray-800 hover:bg-gray-700 text-white py-2 px-6 rounded border border-gray-500"
                        >
                            NEXT &gt;
                        </button>
                    </div>
                )}

                {/* 選択肢 */}
                {!feedback && (
                    <div className="grid gap-2">
                        {currentQuiz.choices.map((choice, index) => (
                            <ChoiceButton
                                key={index}
                                label={choice}
                                onClick={() => handleAnswer(index)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </GameLayout>
    );
}

"use client";

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { useGameState } from '../../../lib/GameStateContext';
import GameLayout from '../../../components/GameLayout';
import DialogueBox from '../../../components/DialogueBox';
import ChoiceButton from '../../../components/ChoiceButton';
import { getQuizzesByStage } from '../../../lib/data_loader';
import { QuizItem } from '../../../types';

export default function PlayStage({ params }: { params: Promise<{ id: string }> }) {
    // Unwrap params using React.use()
    const { id } = use(params);
    const stageId = parseInt(id);

    const router = useRouter();
    const { state, setStage, takeDamage, earnMoney, spendMoney, heal } = useGameState();

    const [quizzes, setQuizzes] = useState<QuizItem[]>([]);
    const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
    const [feedback, setFeedback] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!stageId) return;

        // Load quizzes for this stage
        const stageQuizzes = getQuizzesByStage(stageId);
        setQuizzes(stageQuizzes);
        setLoading(false);
    }, [stageId]);

    const handleAnswer = (choiceIndex: number) => {
        const currentQuiz = quizzes[currentQuizIndex];
        const correct = choiceIndex === currentQuiz.answerIndex;

        setIsCorrect(correct);

        if (correct) {
            setFeedback("Tama! (Correct!) " + currentQuiz.explanation);
            earnMoney(100); // Reward for correct answer
        } else {
            setFeedback("Mali! (Wrong!) " + currentQuiz.explanation);
            takeDamage(20); // Penalty for wrong answer
        }
    };

    const nextQuiz = () => {
        setFeedback(null);
        setIsCorrect(null);

        if (state.hp <= 0) {
            // Game Over Logic could go here or be handled by a useEffect watching HP
            router.push('/');
            return;
        }

        if (currentQuizIndex < quizzes.length - 1) {
            setCurrentQuizIndex(prev => prev + 1);
        } else {
            // Stage Complete
            heal(30); // Restore 30 HP on stage clear
            if (stageId < 15) {
                setStage(stageId + 1);
                router.push('/stage');
            } else {
                router.push('/'); // End of game
            }
        }
    };

    if (loading) {
        return <GameLayout><div className="text-center mt-20">Loading Stage {stageId}...</div></GameLayout>;
    }

    if (quizzes.length === 0) {
        return (
            <GameLayout>
                <div className="text-center mt-20 text-red-500">
                    No data found for Stage {stageId}.
                    <br />
                    <button onClick={() => router.push('/stage')} className="mt-4 underline">Back to Stage Select</button>
                </div>
            </GameLayout>
        );
    }

    const currentQuiz = quizzes[currentQuizIndex];

    return (
        <GameLayout>
            <div className="flex flex-col h-full max-w-2xl mx-auto">
                <div className="mb-4 flex justify-between items-end">
                    <div className="flex items-center gap-3">
                        <h2 className="text-2xl font-bold text-neon-pink">STAGE {stageId}</h2>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${currentQuiz.type === 'word' ? 'bg-blue-900 border-blue-400 text-blue-300' :
                                currentQuiz.type === 'phrase' ? 'bg-purple-900 border-purple-400 text-purple-300' :
                                    'bg-yellow-900 border-yellow-400 text-yellow-300'
                            }`}>
                            {currentQuiz.type === 'word' ? '📖 単語' : currentQuiz.type === 'phrase' ? '💬 フレーズ' : '📝 文法'}
                        </span>
                    </div>
                    <span className="text-gray-400 text-sm">Question {currentQuizIndex + 1} / {quizzes.length}</span>
                </div>

                {/* Narrative / Context Area */}
                <DialogueBox
                    speaker="Situation"
                    text={currentQuiz.question}
                    showNextArrow={false}
                />

                {/* Feedback Overlay or Area */}
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

                {/* Choices */}
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

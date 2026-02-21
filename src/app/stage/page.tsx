"use client";

import Link from "next/link";
import GameLayout from "../../components/GameLayout";
import { useGameState } from "../../lib/GameStateContext";

export default function StageSelect() {
    const { state } = useGameState();
    const totalStages = 20;

    return (
        <GameLayout>
            <div className="flex flex-col items-center space-y-8">
                <h1 className="text-4xl font-bold text-neon-blue mb-8">SELECT STAGE</h1>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                    {Array.from({ length: totalStages }, (_, i) => i + 1).map((stageNum) => (
                        <Link key={stageNum} href={`/play/${stageNum}`} className="block">
                            <button
                                className={`
                  w-full aspect-square rounded-xl text-2xl font-bold border-2 transition-all
                  flex flex-col items-center justify-center gap-2
                  ${stageNum <= state.currentStage
                                        ? 'bg-gray-800 border-neon-blue text-white hover:bg-gray-700 hover:scale-105 shadow-[0_0_10px_rgba(0,243,255,0.3)]'
                                        : 'bg-gray-900 border-gray-700 text-gray-600 cursor-not-allowed opacity-50'
                                    }
                `}
                                disabled={stageNum > state.currentStage}
                            >
                                <span>STAGE</span>
                                <span className="text-4xl">{stageNum}</span>
                            </button>
                        </Link>
                    ))}
                </div>

                <Link href="/">
                    <button className="mt-8 text-gray-400 hover:text-white underline">
                        Back to Title
                    </button>
                </Link>
            </div>
        </GameLayout>
    );
}

"use client";

import React, { ReactNode } from 'react';
import { useGameState } from '../lib/GameStateContext';

interface GameLayoutProps {
    children: ReactNode;
    showStatusBar?: boolean;
}

const GameLayout: React.FC<GameLayoutProps> = ({ children, showStatusBar = true }) => {
    const { state } = useGameState();

    return (
        <div className="min-h-screen bg-gray-900 text-white font-sans flex flex-col">
            {showStatusBar && (
                <header className="bg-gray-800 p-4 border-b border-gray-700 flex justify-between items-center sticky top-0 z-10 shadow-md">
                    <div className="text-xl font-bold tracking-wider text-neon-blue">SANA ALL QUEST</div>
                    <div className="flex gap-6">
                        <div className="flex items-center gap-2">
                            <span className="text-red-500 font-bold">HP:</span>
                            <div className="w-32 h-4 bg-gray-700 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-red-500 transition-all duration-300"
                                    style={{ width: `${(state.hp / state.maxHp) * 100}%` }}
                                ></div>
                            </div>
                            <span className="text-sm">{state.hp}/{state.maxHp}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-yellow-400 font-bold">₱:</span>
                            <span className="text-yellow-400 font-mono text-lg">{state.peso.toLocaleString()}</span>
                        </div>
                    </div>
                </header>
            )}

            <main className="flex-grow p-4 md:p-8 container mx-auto max-w-4xl relative">
                {children}
            </main>
        </div>
    );
};

export default GameLayout;

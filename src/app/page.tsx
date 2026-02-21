"use client";

import Link from "next/link";
import GameLayout from "../components/GameLayout";

export default function Home() {
  return (
    <GameLayout showStatusBar={false}>
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-12">
        <div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-pink animate-pulse">
            SANA ALL QUEST
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-gray-400">
            A Survival Language RPG
          </p>
        </div>

        <div className="space-y-4">
          <Link href="/stage">
            <button className="px-12 py-4 text-2xl font-bold text-black bg-neon-yellow hover:bg-yellow-300 rounded-full shadow-[0_0_20px_rgba(250,255,0,0.5)] transition-transform hover:scale-105 active:scale-95">
              START GAME
            </button>
          </Link>

          <div className="pt-8 text-gray-600 text-sm">
            <p>Use Tagalog to survive the streets.</p>
            <p>Trust no one. Learn or Game Over.</p>
          </div>
        </div>
      </div>
    </GameLayout>
  );
}

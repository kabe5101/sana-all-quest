"use client";

import { useState, useEffect } from 'react';
import { StoryScene } from '../types';

interface StoryViewerProps {
    scenes: StoryScene[];
    title?: string;
    onComplete: () => void;
    isBoss?: boolean;
    imagePath?: string;
}

export default function StoryViewer({ scenes, title, onComplete, isBoss = false, imagePath }: StoryViewerProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(true);
    const [visible, setVisible] = useState(false);
    const [imgError, setImgError] = useState(false);

    useEffect(() => {
        setTimeout(() => setVisible(true), 50);
    }, []);

    useEffect(() => {
        if (currentIndex >= scenes.length) return;
        const fullText = scenes[currentIndex].text;
        setDisplayedText('');
        setIsTyping(true);
        let i = 0;
        const interval = setInterval(() => {
            i++;
            setDisplayedText(fullText.slice(0, i));
            if (i >= fullText.length) {
                clearInterval(interval);
                setIsTyping(false);
            }
        }, 30);
        return () => clearInterval(interval);
    }, [currentIndex, scenes]);

    const handleClick = () => {
        if (isTyping) {
            setDisplayedText(scenes[currentIndex].text);
            setIsTyping(false);
            return;
        }
        if (currentIndex < scenes.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            setVisible(false);
            setTimeout(onComplete, 400);
        }
    };

    const currentScene = scenes[currentIndex];
    const isNarration = currentScene?.speaker === 'ナレーション';
    const isLast = currentIndex === scenes.length - 1;

    const speakerColor = isBoss
        ? 'text-red-400'
        : isNarration
            ? 'text-gray-400 italic'
            : 'text-neon-blue';

    const showImage = imagePath && !imgError;

    return (
        <div
            className={`fixed inset-0 z-50 flex flex-col transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}
            style={{ background: 'rgba(5,5,15,0.95)' }}
            onClick={handleClick}
        >
            {/* ━━━ 上半分：タイトル + 画像 ━━━ */}
            <div className="flex-1 flex flex-col items-center justify-center px-4 pt-10 min-h-0">

                {/* タイトルバッジ */}
                {title && (
                    <div className="mb-3">
                        <span className={`text-xs font-bold tracking-widest px-4 py-1 rounded-full border ${isBoss ? 'border-red-500 text-red-400 bg-red-900/30' : 'border-neon-blue/40 text-neon-blue/70 bg-blue-900/20'}`}>
                            {isBoss ? `👑 ${title}` : `▶ ${title}`}
                        </span>
                    </div>
                )}

                {/* ステージ画像 */}
                {showImage ? (
                    <div className="w-full max-w-2xl rounded-xl overflow-hidden border border-gray-700/50 shadow-lg" style={{ maxHeight: '45vh' }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={imagePath}
                            alt={title ?? 'stage image'}
                            className="w-full h-full object-contain"
                            style={{ maxHeight: '45vh' }}
                            onError={() => setImgError(true)}
                        />
                    </div>
                ) : (
                    /* 画像なし時のスペーサー */
                    <div className="flex-1" />
                )}

                {/* シーンカウンター */}
                <div className="mt-2 text-xs text-gray-600">
                    {currentIndex + 1} / {scenes.length}
                </div>
            </div>

            {/* ━━━ 下半分：ダイアログボックス ━━━ */}
            <div className="w-full max-w-2xl mx-auto px-4 pb-8 flex-shrink-0">
                <div
                    className={`border-2 rounded-xl p-5 shadow-2xl ${isBoss ? 'border-red-700' : 'border-gray-700'}`}
                    style={{ background: 'rgba(10,10,20,0.98)' }}
                >
                    {/* 話者名 */}
                    <div className={`text-sm font-bold mb-2 ${speakerColor}`}>
                        {currentScene?.speaker ?? ''}
                    </div>

                    {/* テキスト本文 */}
                    <div className="text-white text-base leading-relaxed min-h-[3.5rem]">
                        {displayedText}
                        {isTyping && <span className="animate-pulse">▌</span>}
                    </div>

                    {/* 進行ヒント */}
                    <div className="mt-3 flex justify-end">
                        {isLast && !isTyping ? (
                            <span className="text-xs text-gray-400 animate-pulse">タップして続行</span>
                        ) : !isTyping ? (
                            <span className="text-xs text-gray-600 animate-bounce">▼ タップで次へ</span>
                        ) : (
                            <span className="text-xs text-gray-700">タップでスキップ</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

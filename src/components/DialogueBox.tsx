import React from 'react';

interface DialogueBoxProps {
    speaker?: string;
    text: string;
    onNext?: () => void;
    showNextArrow?: boolean;
}

const DialogueBox: React.FC<DialogueBoxProps> = ({ speaker, text, onNext, showNextArrow = true }) => {
    return (
        <div
            className="bg-gray-800 border-2 border-gray-600 rounded-lg p-6 mb-4 shadow-lg cursor-pointer hover:border-gray-500 transition-colors"
            onClick={onNext}
        >
            {speaker && (
                <div className="text-yellow-400 font-bold text-lg mb-2 uppercase tracking-wide">
                    {speaker}
                </div>
            )}
            <div className="text-white text-lg leading-relaxed whitespace-pre-wrap min-h-[4rem]">
                {text}
            </div>
            {showNextArrow && (
                <div className="flex justify-end mt-2 animate-bounce text-gray-400 text-sm">
                    ▼ Click to continue
                </div>
            )}
        </div>
    );
};

export default DialogueBox;

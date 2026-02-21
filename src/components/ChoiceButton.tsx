import React from 'react';

interface ChoiceButtonProps {
    label: string;
    onClick: () => void;
    disabled?: boolean;
}

const ChoiceButton: React.FC<ChoiceButtonProps> = ({ label, onClick, disabled = false }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
        w-full p-4 mb-3 rounded-lg text-lg font-semibold text-left transition-all duration-200
        border-2 
        ${disabled
                    ? 'bg-gray-700 text-gray-500 border-gray-600 cursor-not-allowed'
                    : 'bg-gray-800 text-white border-neon-blue hover:bg-neon-blue hover:text-white hover:border-white shadow-md active:scale-95'
                }
      `}
        >
            {label}
        </button>
    );
};

export default ChoiceButton;

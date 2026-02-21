"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface GameState {
    hp: number;
    maxHp: number;
    peso: number;
    currentStage: number;
}

interface GameStateContextType {
    state: GameState;
    setStage: (stage: number) => void;
    takeDamage: (amount: number) => void;
    heal: (amount: number) => void;
    spendMoney: (amount: number) => boolean;
    earnMoney: (amount: number) => void;
    resetGame: () => void;
}

const defaultState: GameState = {
    hp: 100,
    maxHp: 100,
    peso: 1000, // Initial money
    currentStage: 1,
};

const GameStateContext = createContext<GameStateContextType | undefined>(undefined);

export const GameStateProvider = ({ children }: { children: ReactNode }) => {
    const [state, setState] = useState<GameState>(defaultState);

    const setStage = (stage: number) => {
        setState(prev => ({ ...prev, currentStage: stage }));
    };

    const takeDamage = (amount: number) => {
        setState(prev => ({ ...prev, hp: Math.max(0, prev.hp - amount) }));
    };

    const heal = (amount: number) => {
        setState(prev => ({ ...prev, hp: Math.min(prev.maxHp, prev.hp + amount) }));
    };

    const spendMoney = (amount: number): boolean => {
        if (state.peso >= amount) {
            setState(prev => ({ ...prev, peso: prev.peso - amount }));
            return true;
        }
        return false;
    };

    const earnMoney = (amount: number) => {
        setState(prev => ({ ...prev, peso: prev.peso + amount }));
    };

    const resetGame = () => {
        setState(defaultState);
    };

    return (
        <GameStateContext.Provider value={{ state, setStage, takeDamage, heal, spendMoney, earnMoney, resetGame }}>
            {children}
        </GameStateContext.Provider>
    );
};

export const useGameState = () => {
    const context = useContext(GameStateContext);
    if (context === undefined) {
        throw new Error('useGameState must be used within a GameStateProvider');
    }
    return context;
};

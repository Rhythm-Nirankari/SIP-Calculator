import React from 'react';
import { Slider } from './Slider';
import { InfoTooltip } from './InfoTooltip';

interface CalculatorFormProps {
    mode: 'SIP' | 'Lumpsum';
    setMode: (mode: 'SIP' | 'Lumpsum') => void;
    investment: number;
    setInvestment: (val: number) => void;
    rate: number;
    setRate: (val: number) => void;
    years: number;
    setYears: (val: number) => void;
    stepUp: number;
    setStepUp: (val: number) => void;
}

export const CalculatorForm: React.FC<CalculatorFormProps> = ({
    mode,
    setMode,
    investment,
    setInvestment,
    rate,
    setRate,
    years,
    setYears,
    stepUp,
    setStepUp,
}) => {
    return (
        <div className="glass-card p-8 transform transition-all hover:scale-[1.01] duration-500 h-full flex flex-col">
            <div className="flex-1 flex flex-col justify-evenly">
                {/* Mode Toggle */}
                <div className="py-4">
                    <label className="text-[15px] font-bold text-white/95 uppercase tracking-[0.2em] mb-10 flex items-center">
                        <InfoTooltip text="Choose between SIP (regular monthly savings) or Lumpsum (one-time investment).">
                            Investment Type
                        </InfoTooltip>
                    </label>
                    <div className="flex p-1 rounded-2xl relative overflow-hidden bg-[#111112] border border-[#242425]">
                        <div
                            className={`absolute top-1 bottom-1 w-[48%] bg-[#B2E5F9] rounded-xl transition-all duration-300 ease-in-out shadow-lg shadow-[#B2E5F9]/20 ${mode === 'SIP' ? 'left-1' : 'left-[51%]'
                                }`}
                        />
                        <button
                            onClick={() => setMode('SIP')}
                            className={`relative z-10 flex-1 py-3 text-sm font-bold tracking-wide transition-colors ${mode === 'SIP' ? 'text-[#111112]' : 'text-slate-500 hover:text-white'
                                }`}
                        >
                            SIP
                        </button>
                        <button
                            onClick={() => setMode('Lumpsum')}
                            className={`relative z-10 flex-1 py-3 text-sm font-bold tracking-wide transition-colors ${mode === 'Lumpsum' ? 'text-[#111112]' : 'text-slate-500 hover:text-white'
                                }`}
                        >
                            Lumpsum
                        </button>
                    </div>
                </div>

                {/* Sliders Group */}
                <div className="space-y-6">
                    <div className="py-2">
                        <Slider
                            label={mode === 'SIP' ? 'Monthly Investment' : 'Total Investment'}
                            value={investment}
                            min={mode === 'SIP' ? 500 : 5000}
                            max={mode === 'SIP' ? 100000 : 10000000}
                            step={mode === 'SIP' ? 500 : 5000}
                            onChange={setInvestment}
                            unit="₹"
                        />
                    </div>

                    <div className="py-2">
                        <Slider
                            label="Return Rate (p.a)"
                            value={rate}
                            min={1}
                            max={30}
                            step={0.1}
                            onChange={setRate}
                            unit="%"
                        />
                    </div>

                    <div className="py-4">
                        <Slider
                            label="Time Period"
                            value={years}
                            min={1}
                            max={40}
                            step={1}
                            onChange={setYears}
                            unit="Yr"
                        />
                    </div>

                    {mode === 'SIP' && (
                        <div className="pt-4 relative group">
                            {/* --- TOOLTIP START --- */}
                            <div className="absolute bottom-full left-0 mb-0.5 hidden group-hover:block w-64 z-50">
                                <div className="relative bg-[#B2E5F9]/70 text-white text-xs p-3 rounded-lg shadow-lg backdrop-blur-sm">

                                    {/* Tooltip Content */}
                                    <p className="font-medium text-center leading-relaxed">
                                        Increases your investment amount annually to match income growth.
                                    </p>

                                    {/* The "Tail" (Comment Shape) - Matches the Cyan/70% background */}
                                    <div className="absolute top-full left-2 -mb-0.5 
                          border-8 border-transparent border-t-[#B2E5F9]/70"></div>

                                </div>
                            </div>
                            {/* --- TOOLTIP END --- */}
                            <Slider
                                label="Annual Step-Up"
                                value={stepUp}
                                min={0}
                                max={50}
                                step={1}
                                onChange={setStepUp}
                                unit="%"
                            />
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

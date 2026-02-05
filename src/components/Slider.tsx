import React from 'react';
import { Plus, Minus } from 'lucide-react';

interface SliderProps {
    label: string;
    value: number;
    min: number;
    max: number;
    step?: number;
    onChange: (value: number) => void;
    unit?: string;
}

// Helper function to generate landmark values based on range
const getLandmarks = (min: number, max: number): { value: number; label: string }[] => {
    // For SIP (500-100,000)
    if (max <= 100000) {
        return [
            { value: 5000, label: '5K' },
            { value: 10000, label: '10K' },
            { value: 20000, label: '20K' },
            { value: 30000, label: '30K' },
            { value: 50000, label: '50K' },
            { value: 75000, label: '75K' },
            { value: 100000, label: '1L' },
        ];
    }
    // For Lumpsum (5,000-10,000,000)
    else {
        return [
            { value: 100000, label: '1L' },
            { value: 500000, label: '5L' },
            { value: 1000000, label: '10L' },
            { value: 2500000, label: '25L' },
            { value: 5000000, label: '50L' },
            { value: 7500000, label: '75L' },
            { value: 10000000, label: '1Cr' },
        ];
    }
};

export const Slider: React.FC<SliderProps> = ({
    label,
    value,
    min,
    max,
    step = 1,
    onChange,
    unit = ''
}) => {
    const percentage = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-3">
                <label className="text-[11px] font-bold text-slate-200/70 uppercase tracking-widest">
                    {label}
                </label>
                <div className="flex items-center bg-[#111112] rounded-xl px-3 py-1.5 border border-[#242425] min-w-[140px] transition-colors focus-within:border-[#B2E5F9]/30">
                    <button
                        onClick={() => onChange(Math.max(min, value - step))}
                        className="p-1 rounded-md text-slate-500 hover:text-[#B2E5F9] transition-colors"
                    >
                        <Minus className="w-4 h-4 text-slate-400" />
                    </button>

                    <div className="flex-1 flex items-center justify-center font-bold text-white">
                        {unit === '₹' && <span className="mr-0.5 text-slate-500 text-sm font-medium">₹</span>}
                        <input
                            type="number"
                            value={value}
                            onChange={(e) => {
                                const val = Number(e.target.value);
                                if (!isNaN(val)) onChange(val);
                            }}
                            onBlur={(e) => {
                                const val = Math.max(min, Math.min(max, Number(e.target.value)));
                                onChange(val);
                            }}
                            className="bg-transparent text-center outline-none w-full font-mono text-base"
                        />
                        {unit !== '₹' && <span className="ml-0.5 text-slate-500 text-[10px] font-bold uppercase">{unit}</span>}
                    </div>

                    <button
                        onClick={() => onChange(Math.min(max, value + step))}
                        className="p-1 rounded-md text-slate-500 hover:text-[#B2E5F9] transition-colors"
                    >
                        <Plus className="w-4 h-4 text-slate-400" />
                    </button>
                </div>
            </div>

            {/* Custom Range Input Styling */}
            <div className="relative h-6 flex items-center">
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    className="w-full h-1.5 rounded-full appearance-none cursor-pointer focus:outline-none focus:ring-0 z-20 relative bg-transparent"
                />

                {/* Track Background */}
                <div className="absolute top-2.5 left-0 w-full h-1.5 bg-[#242425] rounded-full z-10 pointer-events-none"></div>

                {/* Filled Part */}
                <div
                    className="absolute top-2.5 left-0 h-1.5 bg-[#B2E5F9] rounded-full z-10 pointer-events-none shadow-[0_0_12px_rgba(178,229,249,0.3)]"
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>

            {/* Quick Select Landmarks */}
            {unit === '₹' && (
                <div className="flex flex-wrap gap-2 mt-3">
                    {getLandmarks(min, max).map((landmark) => (
                        <button
                            key={landmark.value}
                            onClick={() => onChange(landmark.value)}
                            className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${value === landmark.value
                                ? 'bg-[#B2E5F9] text-[#111112] shadow-md shadow-[#B2E5F9]/20'
                                : 'bg-[#1F1F20] text-slate-500 hover:text-white hover:bg-[#242425] border border-[#242425]'
                                }`}
                        >
                            {landmark.label}
                        </button>
                    ))}
                </div>
            )}

            <style>{`
        input[type=range]::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: 18px;
            width: 18px;
            background: #B2E5F9;
            border: 4px solid #111112;
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 0 10px rgba(178, 229, 249, 0.2);
            margin-top: -8.5px;
            position: relative;
            z-index: 30;
            transition: all 0.2s;
        }
        input[type=range]::-webkit-slider-thumb:hover {
            transform: scale(1.1);
            box-shadow: 0 0 15px rgba(178, 229, 249, 0.4);
        }
      `}</style>
        </div>
    );
};

import React from 'react';
import { Target, Car, Home, Plane, GraduationCap, Plus, Minus } from 'lucide-react';
import { InfoTooltip } from './InfoTooltip';

export type GoalType = 'custom' | 'car' | 'house' | 'vacation' | 'education';

export const GOALS: Record<GoalType, { label: string; amount: number; icon: React.ReactNode }> = {
    car: { label: 'Car', amount: 1500000, icon: <Car className="w-5 h-5" /> },
    house: { label: 'House', amount: 7500000, icon: <Home className="w-5 h-5" /> },
    education: { label: 'Degree', amount: 2500000, icon: <GraduationCap className="w-5 h-5" /> },
    vacation: { label: 'Trip', amount: 500000, icon: <Plane className="w-5 h-5" /> },
    custom: { label: 'Custom', amount: 5000000, icon: <Target className="w-5 h-5" /> },
};

interface GoalPlannerProps {
    selectedGoal: GoalType;
    setSelectedGoal: (goal: GoalType) => void;
    targetAmount: number;
    setTargetAmount: (amount: number) => void;
    currentValue: number;
    years: number;
    inflationRate: number;
    setInflationRate: (rate: number) => void;
}

export const GoalPlanner: React.FC<GoalPlannerProps> = ({
    selectedGoal,
    setSelectedGoal,
    targetAmount,
    setTargetAmount,
    currentValue,
    years,
    inflationRate,
    setInflationRate,
}) => {
    const futureTargetAmount = Math.round(targetAmount * Math.pow(1 + inflationRate / 100, years));
    const percentage = Math.min(100, (currentValue / futureTargetAmount) * 100);
    const isGoalReached = currentValue >= futureTargetAmount;

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(val);
    };

    return (
        <div className="glass-card p-6 flex flex-col ">
            <div className="flex items-center justify-between">
                <h3 className="text-[15px] font-bold text-white/95 uppercase tracking-[0.2em] mb-6 flex items-center">
                    <InfoTooltip text="Evaluate if your current investment strategy aligns with your long-term financial milestones.">
                        Goal Planner
                    </InfoTooltip>
                </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 pt-2">
                {/* Left Side: Inputs */}
                <div className="space-y-6">
                    {/* Goal Selector */}
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                        {(Object.keys(GOALS) as GoalType[]).map((goal) => (
                            <button
                                key={goal}
                                onClick={() => setSelectedGoal(goal)}
                                className={`flex flex-col items-center justify-center p-3 rounded-2xl text-xs font-bold transition-all duration-300 ${selectedGoal === goal
                                    ? 'bg-[#B2E5F9] text-[#111112] shadow-lg shadow-[#B2E5F9]/20 scale-105'
                                    : 'text-slate-500 hover:text-white bg-[#111112] border border-[#242425]'
                                    }`}
                                title={GOALS[goal].label}
                            >
                                {GOALS[goal].icon}
                                <span className="mt-2 hidden sm:block uppercase tracking-tighter text-[10px]">{GOALS[goal].label}</span>
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Amount Input */}
                        <div className="relative py-2">
                            <label className="text-[13px] font-bold text-white/80 uppercase tracking-widest mb-4 block">
                                Present Value
                            </label>
                            <div className="flex items-center bg-[#111112] rounded-2xl border border-[#242425] p-2 w-full transition-colors focus-within:border-[#B2E5F9]/30">
                                <button
                                    onClick={() => setTargetAmount(Math.max(0, targetAmount - 10000))}
                                    className="p-2 hover:bg-white/5 rounded-xl text-slate-500 hover:text-[#B2E5F9] transition-colors"
                                >
                                    <Minus className="w-5 h-5" />
                                </button>
                                <div className="flex-1 flex items-center justify-center font-bold text-white">
                                    <span className="text-xl font-light text-slate-600 mr-2">₹</span>
                                    <input
                                        type="number"
                                        value={targetAmount === 0 ? '' : targetAmount}
                                        onChange={(e) => {
                                            setSelectedGoal('custom');
                                            const val = Number(e.target.value);
                                            setTargetAmount(isNaN(val) ? 0 : val);
                                        }}
                                        onBlur={(e) => {
                                            const val = Math.max(0, Number(e.target.value));
                                            setTargetAmount(val);
                                        }}
                                        className="bg-transparent text-center outline-none w-full text-2xl font-mono"
                                    />
                                </div>
                                <button
                                    onClick={() => setTargetAmount(targetAmount + 10000)}
                                    className="p-2 hover:bg-white/5 rounded-xl text-slate-500 hover:text-[#B2E5F9] transition-colors"
                                >
                                    <Plus className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Inflation Input */}
                        <div className="relative py-2">
                            <div className="flex justify-between items-center mb-4">
                                <label className="text-[13px] font-bold text-white/80 uppercase tracking-widest block">
                                    <InfoTooltip text="Expected annual inflation rate. This adjusts your goal's future value to account for rising costs over time.">
                                        Est. Inflation
                                    </InfoTooltip>
                                </label>
                                <div className="flex items-center gap-3 bg-[#111112] rounded-lg py-1 px-3 border border-[#242425]">
                                    <button
                                        onClick={() => setInflationRate(Math.max(0, inflationRate - 0.5))}
                                        className="p-1 hover:bg-white/5 rounded text-slate-500 hover:text-[#B2E5F9]"
                                    >
                                        <Minus className="w-3 h-3" />
                                    </button>
                                    <span className="text-[#B2E5F9] font-bold text-sm min-w-[40px] text-center">{inflationRate}%</span>
                                    <button
                                        onClick={() => setInflationRate(Math.min(15, inflationRate + 0.5))}
                                        className="p-1 hover:bg-white/5 rounded text-slate-500 hover:text-[#B2E5F9]"
                                    >
                                        <Plus className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                            <div className="relative h-6 flex items-center">
                                <input
                                    type="range"
                                    min="0"
                                    max="15"
                                    step="0.5"
                                    value={inflationRate}
                                    onChange={(e) => setInflationRate(Number(e.target.value))}
                                    className="w-full h-1.5 rounded-full appearance-none cursor-pointer focus:outline-none focus:ring-0 z-20 relative bg-transparent"
                                />
                                <div className="absolute top-2.5 left-0 w-full h-1.5 bg-[#242425] rounded-full z-10 pointer-events-none"></div>
                                <div
                                    className="absolute top-2.5 left-0 h-1.5 bg-[#B2E5F9] rounded-full z-10 pointer-events-none shadow-[0_0_8px_rgba(178,229,249,0.3)]"
                                    style={{ width: `${(inflationRate / 15) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Analysis */}
                <div className="bg-gradient-to-br from-[#B2E5F9]/10 to-[#B2E5F9]/5 rounded-2xl p-6 mr-[5px] mb-[5px]">
                    {/* Horizon Section */}
                    <div className="text-right mb-4">
                        <p className="text-[13px] uppercase tracking-widest text-white/70 font-bold">Horizon</p>
                        <p className="text-xl font-bold text-white">{years} Years</p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-[13px] font-bold text-white/80 uppercase tracking-widest mb-1">Target Value</p>
                                <p className="text-4xl font-extrabold text-[#B2E5F9] tracking-tighter drop-shadow-[0_0_12px_rgba(178,229,249,0.2)]">{formatCurrency(futureTargetAmount)}</p>
                            </div>
                        </div>

                        {/* Progress Meter */}
                        <div>
                            <div className="flex justify-between items-end mb-4">
                                <span className="text-[13px] font-bold text-white/80 uppercase tracking-widest">Calculated Coverage</span>
                                <span className={`text-5xl font-black ${isGoalReached ? 'text-[#B2E5F9]' : 'text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400'}`}>
                                    {percentage.toFixed(0)}%
                                </span>
                            </div>

                            <div className="h-2 w-full bg-[#242425] rounded-full overflow-hidden relative">
                                <div
                                    className={`h-full rounded-full transition-all duration-1000 ease-out relative ${isGoalReached ? 'bg-[#B2E5F9]' : 'bg-white'}`}
                                    style={{ width: `${percentage}%` }}
                                >
                                    <div className="absolute right-0 top-0 bottom-0 w-8 bg-white/20 blur-md"></div>
                                </div>
                            </div>

                            <div className={`mt-6 text-sm flex items-center justify-center gap-2 font-medium ${isGoalReached ? 'text-[#B2E5F9]' : 'text-slate-500'}`}>
                                {isGoalReached
                                    ? " Congratulations! Your investment covers this goal adjusted for inflation."
                                    : <><span className="text-white/60 uppercase tracking-widest text-[11px] font-bold">Projected Shortfall:</span> <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 text-2xl inline-block ml-2">{formatCurrency(futureTargetAmount - currentValue)}</span></>}
                            </div>
                        </div>
                    </div>

                    {/* Bottom Info */}
                    <div className="flex items-center gap-3 text-[10px] text-slate-600 uppercase tracking-widest font-bold border-t border-[#242425] pt-6 mt-6">
                        <span className="text-[#B2E5F9] text-base">* </span>
                        <span>Adjusted for {inflationRate}% expected annual inflation over {years} years.</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

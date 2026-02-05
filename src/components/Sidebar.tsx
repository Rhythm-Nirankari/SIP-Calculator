import React from 'react';
import { X, Info } from 'lucide-react';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[1000] transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={onClose}
            />

            {/* Sidebar Panel */}
            <div className={`fixed top-0 right-0 h-screen w-full sm:w-[500px] bg-[#111112] border-l border-[#242425] z-[1001] transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}>
                {/* Header */}
                <div className="p-8 border-b border-[#242425] flex items-center justify-between bg-[#111112]/90 backdrop-blur-xl sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-2xl bg-[#B2E5F9]/10 border border-[#B2E5F9]/20">
                            <Info className="w-6 h-6 text-[#B2E5F9]" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white tracking-tight">Investment Basics</h2>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-xl hover:bg-white/5 transition-colors group"
                    >
                        <X className="w-6 h-6 text-white/40 group-hover:text-white transition-colors" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-8 space-y-12 overflow-y-auto h-[calc(100vh-116px)] custom-scrollbar pb-20">

                    {/* 1. What is SIP? */}
                    <article className="space-y-4">
                        <h3 className="text-lg font-bold text-[#B2E5F9] tracking-tight text-center sm:text-left">What is SIP?</h3>
                        <div className="text-white/70 leading-relaxed space-y-4 text-sm sm:text-base">
                            <p>
                                A SIP (Systematic Investment Plan) means investing a fixed amount every month instead of putting in a large amount all at once.
                            </p>
                            <p className="bg-white/5 border border-white/10 p-5 rounded-3xl italic">
                                "Think of it like saving a little from your salary every month. Each contribution may feel small, but together they build something meaningful over time."
                            </p>
                            <p>
                                For example, investing ₹5,000 every month is often easier than investing ₹6 lakhs at once. SIP makes investing affordable, consistent, and stress-free.
                            </p>
                        </div>
                    </article>

                    {/* 2. The Power of Compounding */}
                    <article className="space-y-4">
                        <h3 className="text-lg font-bold text-[#818CF8] tracking-tight text-center sm:text-left">The Power of Compounding</h3>
                        <div className="text-white/70 leading-relaxed space-y-4 text-sm sm:text-base">
                            <p>
                                Compounding simply means earning returns on your returns.
                            </p>
                            <div className="bg-[#818CF8]/5 border border-[#818CF8]/20 p-6 rounded-[2rem] space-y-4 relative overflow-hidden group">
                                <p className="font-bold text-[#818CF8] flex items-center gap-2">
                                    <span className="text-lg">🌱</span> The Tree Analogy
                                </p>
                                <p className="text-sm italic text-white/60">
                                    In the first few years, a tree's growth feels small. But later, it grows faster and starts producing fruits. Those fruits then create more seeds, which grow into more trees.
                                </p>
                                <p className="text-xs font-bold uppercase tracking-widest text-[#818CF8]/70 text-right pt-2 border-t border-[#818CF8]/10 mt-2">
                                    Money works the same way.
                                </p>
                            </div>
                            <p>
                                The longer you stay invested, the stronger compounding becomes. Most wealth is created in the later years, not the early ones.
                            </p>
                        </div>
                    </article>

                    {/* 3. Why Returns Accelerate Later */}
                    <article className="space-y-4">
                        <h3 className="text-lg font-bold text-white tracking-tight text-center sm:text-left">Why Returns Accelerate Later</h3>
                        <div className="text-white/70 leading-relaxed space-y-4 text-sm sm:text-base">
                            <p>
                                Many investors feel disappointed early on because growth looks small. This is because your portfolio is mostly just your own money.
                            </p>
                            <div className="grid grid-cols-1 gap-2">
                                {[
                                    { step: "1", label: "Early Years", desc: "Build the foundation" },
                                    { step: "2", label: "Middle Years", desc: "Build momentum" },
                                    { step: "3", label: "Later Years", desc: "Create real wealth" }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 transition-colors hover:bg-white/10">
                                        <div className="w-8 h-8 rounded-full bg-[#B2E5F9]/10 border border-[#B2E5F9]/20 flex items-center justify-center text-[10px] font-black text-[#B2E5F9]">
                                            {item.step}
                                        </div>
                                        <div>
                                            <p className="text-xs font-black uppercase tracking-widest text-white/90">{item.label}</p>
                                            <p className="text-xs font-medium text-white/40">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <p className="text-center text-[#B2E5F9] font-bold text-sm italic py-2">
                                "Most people give up too early and miss the snowball phase."
                            </p>
                        </div>
                    </article>

                    {/* 4. SIP vs Lumpsum */}
                    <article className="space-y-4">
                        <h3 className="text-lg font-bold text-white tracking-tight text-center sm:text-left">SIP vs Lumpsum</h3>
                        <div className="text-white/70 leading-relaxed space-y-4 text-sm sm:text-base">
                            <p>
                                <strong>SIP</strong> = Regular small investments. <strong>Lumpsum</strong> = One large investment.
                            </p>
                            <div className="relative group p-6 rounded-3xl bg-white/5 border border-white/10 overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-[#B2E5F9]/10 blur-3xl -z-10 transition-all group-hover:bg-[#B2E5F9]/20" />
                                <p className="text-sm leading-relaxed border-l-2 border-[#B2E5F9] pl-4 italic text-white/60">
                                    "SIP is like paying rent every month. Lumpsum is like buying a house in one payment."
                                </p>
                            </div>
                            <p>
                                SIP is usually easier for most people as it doesn't require market timing or large upfront capital.
                            </p>
                        </div>
                    </article>

                    {/* 5. Beginner Mistakes */}
                    <article className="space-y-4">
                        <h3 className="text-lg font-bold text-red-400 tracking-tight text-center sm:text-left">Beginner Mistakes to Avoid</h3>
                        <div className="space-y-2">
                            {[
                                "Stopping SIP when markets fall",
                                "Expecting quick profits (Thinking short-term)",
                                "Not increasing SIP as income grows",
                                "Checking investments every day"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 p-4 bg-red-500/5 rounded-2xl border border-red-500/10 text-sm font-medium text-white/70 hover:bg-red-500/10 transition-colors">
                                    <span className="text-red-500 text-xs">✕</span> {item}
                                </div>
                            ))}
                        </div>
                        <div className="pt-6 space-y-4">
                            <p className="text-xs font-black uppercase tracking-widest text-[#10B981] opacity-70">The Smarter Path:</p>
                            <ul className="space-y-3 pl-1">
                                {[
                                    "Stay invested during market ups and downs",
                                    "Think long-term (10+ years)",
                                    "Gradually increase SIP every year (Step-up)",
                                    "Review once a year, not every day"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm font-bold text-white/90">
                                        <div className="w-5 h-5 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center">
                                            <span className="text-[#10B981] text-[10px]">✓</span>
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </article>

                    {/* 6. Who Should Use SIP? */}
                    <article className="space-y-4">
                        <h3 className="text-lg font-bold text-white tracking-tight text-center sm:text-left">Who Should Use SIP?</h3>
                        <p className="text-white/60 text-sm italic border-b border-white/5 pb-4">SIP is essentially for survival-to-wealth transition. It's built for:</p>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                "Students starting early",
                                "Working professionals",
                                "Families for the future",
                                "Long-term dreamers"
                            ].map((item, i) => (
                                <div key={i} className="px-4 py-3 bg-white/5 rounded-2xl border border-white/5 text-[10px] font-black text-center uppercase tracking-widest text-white/40 hover:text-[#B2E5F9] hover:border-[#B2E5F9]/20 transition-all">
                                    {item}
                                </div>
                            ))}
                        </div>
                        <p className="text-xs font-bold text-white/30 text-center pt-4 uppercase tracking-[0.2em]">Consistency Matters More Than Capital</p>
                    </article>

                    {/* 7. Formula Explanation */}
                    <article className="space-y-4">
                        <h3 className="text-lg font-bold text-white tracking-tight text-center sm:text-left">How We Calculate</h3>
                        <div className="text-sm text-white/60 leading-relaxed space-y-4">
                            <p>
                                <strong>For SIP:</strong> We use the standard future value of an annuity formula, where each monthly investment grows based on the annual return.
                            </p>
                            <p>
                                <strong>For Goal Planning:</strong> We adjust your "current goal cost" for annual inflation to show you the <em>actual</em> money you'll need in the future.
                            </p>
                            <div className="flex flex-wrap justify-center gap-2 pt-2">
                                {["Invested Principal", "Wealth Gained", "Maturity Value"].map((tag, i) => (
                                    <span key={i} className="px-3 py-1 bg-[#B2E5F9]/5 border border-[#B2E5F9]/10 rounded-full text-[9px] font-black uppercase tracking-wider text-[#B2E5F9]">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </article>

                    {/* Pro Tip Footer */}
                    <div className="p-8 rounded-[40px] bg-gradient-to-br from-[#818CF8]/20 to-transparent border border-[#818CF8]/20 relative overflow-hidden mt-12 group">
                        <div className="relative z-10 space-y-4">
                            <div className="flex items-center gap-2 text-[#818CF8] group-hover:scale-105 transition-transform origin-left">
                                <span className="text-xs font-black uppercase tracking-[0.3em]">Pro Tip</span>
                            </div>
                            <h4 className="text-xl font-bold text-white leading-tight">Starting early matters more than investing big.</h4>
                            <p className="text-sm text-white/60 leading-relaxed">
                                Even ₹1,000/month for 30 years can grow significantly.
                                <span className="block mt-4 font-bold text-[#818CF8] text-base group-hover:text-white transition-colors">Time is your strongest advantage.</span>
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

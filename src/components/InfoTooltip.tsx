import React from 'react';

interface InfoTooltipProps {
    text: string;
    children: React.ReactNode;
    offsetClass?: string;
    placement?: 'top' | 'left';
}

export const InfoTooltip: React.FC<InfoTooltipProps> = ({ text, children, offsetClass = '', placement = 'top' }) => {
    const isLeft = placement === 'left';

    const containerClass = isLeft
        ? `absolute right-full top-1/2 mr-3 p-0 bg-[#B2E5F9]/70 backdrop-blur-sm border border-[#B2E5F9] rounded-xl w-[240px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-[100] transform -translate-y-1/2 translate-x-2 group-hover:translate-x-0 ${offsetClass}`
        : `absolute left-0 bottom-full mb-3 p-0 bg-[#B2E5F9]/70 backdrop-blur-sm border border-[#B2E5F9] rounded-xl w-[240px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-[100] transform translate-y-2 group-hover:translate-y-0 ${offsetClass}`;

    return (
        <div className="group relative inline-block cursor-help">
            <span className="transition-colors group-hover:text-[#B2E5F9]">
                {children}
            </span>

            {/* Tooltip Box */}
            <div className={containerClass}>
                <div className="px-4 py-3">
                    <p className="text-[12px] font-medium text-white leading-relaxed text-left whitespace-normal normal-case tracking-normal">
                        {text}
                    </p>
                </div>
                {/* Arrow */}
                {isLeft ? (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 border-8 border-transparent border-r-[#B2E5F9]/70"></div>
                ) : (
                    <div className="absolute top-full left-4 border-8 border-transparent border-t-[#B2E5F9]/70"></div>
                )}
            </div>
        </div>
    );
};

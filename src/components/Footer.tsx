import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="mt-10 border-t border-[#242425] pt-6 text-center">
            <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 text-sm text-white/70">
                <p className="mb-1">© 2026 SIP Calculator. All rights reserved.</p>
                <p className="text-xs text-white/50">Made with care — for educational purposes only; not financial advice.</p>
            </div>
        </footer>
    );
};

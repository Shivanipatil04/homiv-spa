import React from 'react';

export const LotusDivider = ({ className = "py-4", isDark = false }) => (
  <div className={`flex items-center justify-center gap-4 ${className}`}>
    <div className={`h-[1px] w-12 md:w-28 ${isDark ? 'bg-[#C9A24B]/60' : 'bg-[#7A1428]/30'}`} />
    <svg className={`w-5 h-5 ${isDark ? 'text-[#D4AF6A]' : 'text-[#7A1428]'} animate-pulse`} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C12 2 10.2 6.5 7.5 8.5C4.8 10.5 2 11.5 2 11.5C2 11.5 5 13 7.5 15C10 17 10.8 21.5 12 21.5C13.2 21.5 14 17 16.5 15C19 13 22 11.5 22 11.5C22 11.5 19.2 10.5 16.5 8.5C13.8 6.5 12 2 12 2Z" opacity="0.85" />
      <path d="M12 5.5C12 5.5 10.8 8.8 8.8 10.2C6.8 11.6 4.5 12 4.5 12C4.5 12 6.5 13.2 8.2 14.5C9.9 15.8 10.8 18.5 12 18.5C13.2 18.5 14.1 15.8 15.8 14.5C17.5 13.2 19.5 12 19.5 12C19.5 12 17.2 11.6 15.2 10.2C13.2 8.8 12 5.5 12 5.5Z" fill={isDark ? "#F3E5AB" : "#C9A24B"} />
    </svg>
    <div className={`h-[1px] w-12 md:w-28 ${isDark ? 'bg-[#C9A24B]/60' : 'bg-[#7A1428]/30'}`} />
  </div>
);

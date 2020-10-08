import React from 'react';
import { IconRefresh } from './icons/IconRefresh';

export const FullscreenLoading: React.FC = () => (
  <div className="h-screen flex flex-col items-center justify-center">
    <IconRefresh className="w-12 h-12 animate-spin-reverse" />
    <p className="mt-3 text-xl">Loading...</p>
  </div>
);

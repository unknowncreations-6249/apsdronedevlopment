/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { InventoryPage } from './pages/InventoryPage';
import { ClassificationPage } from './pages/ClassificationPage';
import { SafetyQuizPage } from './pages/SafetyQuizPage';
import type { FleetFilter, PageId } from './data/droneData';

const THEME_STORAGE_KEY = 'aps-mhow-drone-theme';

function getInitialDarkTheme(): boolean {
  try {
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'dark') return true;
    if (saved === 'light') return false;
  } catch {
    // Fallback to crisp light tactical slate-blue/white/amber default
  }
  return false;
}

export default function App() {
  const [activePage, setActivePage] = useState<PageId>('home');
  const [fleetFilter, setFleetFilter] = useState<FleetFilter>('all');
  const [isDark, setIsDark] = useState<boolean>(() => getInitialDarkTheme());

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, isDark ? 'dark' : 'light');
    } catch {
      // Ignore storage restrictions
    }
  }, [isDark]);

  const handleNavigate = (page: PageId, nextFleetFilter?: FleetFilter) => {
    if (nextFleetFilter) {
      setFleetFilter(nextFleetFilter);
    }
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F2FAE6] dark:bg-[#0B1713] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Navbar
        activePage={activePage}
        onNavigate={(page) => handleNavigate(page)}
        isDark={isDark}
        onToggleTheme={() => setIsDark((prev) => !prev)}
      />

      <main className="flex-1 pt-24 pb-8 px-4 sm:px-6">
        <div className="max-w-[1200px] mx-auto">
          {activePage === 'home' && <HomePage onNavigate={handleNavigate} />}
          {activePage === 'inventory' && (
            <InventoryPage
              activeFilter={fleetFilter}
              onFilterChange={setFleetFilter}
            />
          )}
          {activePage === 'classification' && <ClassificationPage />}
          {activePage === 'safety' && <SafetyQuizPage />}
        </div>
      </main>

      <Footer onNavigate={(page) => handleNavigate(page)} />
    </div>
  );
}

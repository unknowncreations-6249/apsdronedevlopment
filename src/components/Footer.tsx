import type { PageId } from '../data/droneData';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const handleLink = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-lime-200/80 dark:border-emerald-950 bg-[#F9FDF2] dark:bg-[#0D1C17] mt-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="font-display text-base font-bold text-[#0F2537] dark:text-white">
              Army Public School Mhow — Drone Club
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Aerial Robotics, UAV Aerodynamics & STEM Innovation Lab · Mhow Cantt, Madhya Pradesh
            </p>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-600 dark:text-slate-400">
            <button
              type="button"
              onClick={() => handleLink('home')}
              className="hover:text-[#0F2537] dark:hover:text-amber-400 transition-colors cursor-pointer"
            >
              Overview
            </button>
            <button
              type="button"
              onClick={() => handleLink('inventory')}
              className="hover:text-[#0F2537] dark:hover:text-amber-400 transition-colors cursor-pointer"
            >
              Fleet Inventory
            </button>
            <button
              type="button"
              onClick={() => handleLink('classification')}
              className="hover:text-[#0F2537] dark:hover:text-amber-400 transition-colors cursor-pointer"
            >
              Classification
            </button>
            <button
              type="button"
              onClick={() => handleLink('safety')}
              className="hover:text-[#0F2537] dark:hover:text-amber-400 transition-colors cursor-pointer"
            >
              Safety & Quiz
            </button>
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600 dark:text-slate-400">
          <p className="font-medium text-[#0F2537] dark:text-slate-200">
            &copy; {new Date().getFullYear()} SWARUP_UNKNOWN CREATIONS. All rights reserved.
          </p>
          <p>Maintained for the APS Mhow Drone Club · All campus flights under faculty &amp; DGCA guidelines.</p>
        </div>
      </div>
    </footer>
  );
}

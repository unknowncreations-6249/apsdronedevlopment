import { ArrowRight, Compass, Cpu, ShieldCheck, Wind } from 'lucide-react';
import {
  FLEET_SUMMARY_STATS,
  HERO_IMAGE,
  type FleetFilter,
  type PageId,
} from '../data/droneData';
import { ResilientImage } from '../components/ResilientImage';

interface HomePageProps {
  onNavigate: (page: PageId, fleetFilter?: FleetFilter) => void;
}

const MISSION_PILLARS = [
  {
    index: '01',
    title: 'Aerial Robotics & Fabrication',
    icon: Cpu,
    description:
      'Students build quadcopters from raw carbon-fiber frames, solder ESCs, configure 32-bit flight controllers, and troubleshoot real telemetry hardware in our school UAV workshop.',
    highlight: '2 active student lab build kits in assembly',
  },
  {
    index: '02',
    title: 'STEM & Autonomous Navigation',
    icon: Compass,
    description:
      'Connecting physics, mathematics, and embedded programming to real-world missions—covering GNSS waypoint mapping, ultrasonic sensing, and precision Namo agricultural flight.',
    highlight: 'Hands-on exposure across 8 operational Namo drones',
  },
  {
    index: '03',
    title: 'UAV Aerodynamics & Airspace Discipline',
    icon: Wind,
    description:
      'Grounding every young pilot in lift-to-weight ratios, rotor torque balancing, LiPo battery safety, and strict DGCA India regulatory compliance before stepping onto the flight line.',
    highlight: 'Zero-incident pre-flight protocol & DGCA curriculum',
  },
];

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-[#0B1C2D]">
        <div className="relative min-h-[460px] lg:min-h-[520px] flex items-end">
          <ResilientImage
            src={HERO_IMAGE}
            alt="Multi-rotor UAV hovering above the open green campus grounds at golden hour"
            fallbackTitle="Army Public School Mhow — UAV Flight Operations"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          {/* Measured high-contrast scrim ensuring WCAG AA legibility */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#081523]/95 via-[#0B1D30]/75 to-[#0B1D30]/35"
          />

          <div className="relative z-10 w-full p-6 sm:p-10 lg:p-14 max-w-3xl">
            <p className="text-xs sm:text-sm font-mono font-medium tracking-wider text-amber-400 mb-3">
              Mhow Cantt, Madhya Pradesh · STEM & Aerial Robotics
            </p>
            <h1 className="font-display text-3xl sm:text-5xl lg:text-[54px] font-bold tracking-tight text-white leading-[1.08] [text-wrap:balance]">
              ARMY PUBLIC SCHOOL MHOW
            </h1>
            <p className="mt-3 text-lg sm:text-xl font-medium text-slate-200 max-w-2xl">
              Official Drone Club & UAV Innovation Portal
            </p>
            <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
              Advancing student mastery in unmanned aerial systems—from hands-on micro quadcopter engineering and DGCA classification to precision Namo Drone field operations.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onNavigate('inventory', 'all')}
                className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 text-sm font-semibold rounded-md bg-amber-500 text-slate-950 hover:bg-amber-400 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
              >
                <span>Explore Fleet Inventory</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('classification')}
                className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 text-sm font-semibold rounded-md border border-white/30 bg-white/10 text-white hover:bg-white/20 backdrop-blur-xs transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>UAV Classification Guide</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Full-Width 4-Column Fleet Summary Stat Strip */}
      <section aria-labelledby="fleet-summary-heading">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
          <div>
            <h2
              id="fleet-summary-heading"
              className="font-display text-2xl sm:text-3xl font-bold text-[#0F2537] dark:text-white tracking-tight"
            >
              School Fleet Overview
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Current operational readiness across our 12-unit UAV inventory. Select any category to inspect airframe specifications.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('inventory', 'all')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer self-start sm:self-auto"
          >
            <span>Open full fleet ledger</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FLEET_SUMMARY_STATS.map((stat, idx) => (
            <button
              key={stat.id}
              type="button"
              onClick={() => onNavigate('inventory', stat.filterTarget)}
              className={`group text-left p-6 rounded-lg border transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                idx === 0
                  ? 'bg-[#0F2537] dark:bg-[#13293F] border-[#0F2537] dark:border-slate-700 text-white'
                  : 'bg-white dark:bg-[#101F30] border-slate-200 dark:border-slate-800 hover:border-amber-500/70 dark:hover:border-amber-500/60'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`text-xs font-semibold tracking-wide ${
                    idx === 0 ? 'text-amber-400' : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {stat.label}
                </span>
                <ArrowRight
                  className={`w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5 ${
                    idx === 0
                      ? 'text-slate-300 group-hover:text-amber-400'
                      : 'text-slate-400 group-hover:text-amber-600 dark:group-hover:text-amber-400'
                  }`}
                  aria-hidden="true"
                />
              </div>

              <div className="mt-4 flex items-baseline gap-2">
                <span
                  className={`font-mono text-4xl font-bold tabular-nums tracking-tight ${
                    idx === 0 ? 'text-white' : 'text-[#0F2537] dark:text-white'
                  }`}
                >
                  {stat.value}
                </span>
                <span
                  className={`text-xs font-mono ${
                    idx === 0 ? 'text-slate-300' : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {stat.unit}
                </span>
              </div>

              <p
                className={`mt-3 text-xs leading-relaxed ${
                  idx === 0 ? 'text-slate-300' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                {stat.note}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* Club Mission & Technical Curriculum */}
      <section aria-labelledby="mission-heading" className="pt-4 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-2xl mb-10">
          <h2
            id="mission-heading"
            className="font-display text-2xl sm:text-3xl font-bold text-[#0F2537] dark:text-white tracking-tight [text-wrap:balance]"
          >
            Club Mission in Aerial Robotics & STEM Education
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            The APS Mhow Drone Club bridges classroom physics and disciplined aviation practice. Cadets progress from understanding multi-rotor aerodynamics and DGCA regulations to assembling, calibrating, and flying live unmanned platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MISSION_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.index}
                className="p-6 rounded-lg bg-white dark:bg-[#101F30] border border-slate-200 dark:border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 mb-4">
                    <span>{pillar.index}. Focus Area</span>
                    <Icon className="w-4 h-4 text-amber-600 dark:text-amber-400" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#0F2537] dark:text-white">
                    {pillar.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <p className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs font-medium text-amber-700 dark:text-amber-400">
                  {pillar.highlight}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Quick Navigation Strip to Portal Modules */}
      <section
        aria-label="Portal modules quick access"
        className="rounded-lg bg-slate-100/80 dark:bg-[#101F30] border border-slate-200 dark:border-slate-800 p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
      >
        <div className="max-w-xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 dark:text-amber-400 mb-1.5">
            <ShieldCheck className="w-4 h-4" aria-hidden="true" />
            <span>Pre-Flight Certification & Club Readiness</span>
          </div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0F2537] dark:text-white">
            Prepare for Your Next Lab Build or Campus Flight Demo
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Review the 10-point pre-flight safety checklist, verify DGCA airspace categories using the interactive Category Finder, or test your knowledge with our 5-question club quiz.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onNavigate('classification')}
            className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2.5 text-sm font-semibold rounded-md bg-white dark:bg-[#172B40] border border-slate-300 dark:border-slate-700 text-[#0F2537] dark:text-white hover:border-amber-500 dark:hover:border-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Open Category Finder</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate('safety')}
            className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 text-sm font-semibold rounded-md bg-[#0F2537] dark:bg-amber-500 text-white dark:text-slate-950 hover:bg-[#183752] dark:hover:bg-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Safety & Club Quiz</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </section>
    </div>
  );
}

import { useEffect, useState } from 'react';
import {
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  SlidersHorizontal,
  Wrench,
  Zap,
} from 'lucide-react';
import {
  ASSEMBLY_STAGES,
  SCHOOL_FLEET,
  type FleetFilter,
  type FleetItem,
} from '../data/droneData';
import { ResilientImage } from '../components/ResilientImage';

interface InventoryPageProps {
  activeFilter: FleetFilter;
  onFilterChange: (filter: FleetFilter) => void;
}

const FILTER_OPTIONS: { id: FleetFilter; label: string; count: number }[] = [
  { id: 'all', label: 'All', count: 12 },
  { id: 'operational', label: 'Operational', count: 8 },
  { id: 'micro', label: 'Micro Drones', count: 2 },
  { id: 'kits', label: 'Unassembled Kits', count: 2 },
];

type KitId = 'kit-alpha' | 'kit-beta';

interface KitProgressState {
  'kit-alpha': Record<string, boolean>;
  'kit-beta': Record<string, boolean>;
}

const DEFAULT_KIT_PROGRESS: KitProgressState = {
  'kit-alpha': {
    frame: true,
    'motors-escs': true,
    'flight-controller': false,
    propellers: false,
    calibration: false,
  },
  'kit-beta': {
    frame: true,
    'motors-escs': false,
    'flight-controller': false,
    propellers: false,
    calibration: false,
  },
};

const STORAGE_KEY = 'aps-mhow-kit-progress-v1';

function loadKitProgress(): KitProgressState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_KIT_PROGRESS;
    const parsed = JSON.parse(raw) as KitProgressState;
    if (parsed && parsed['kit-alpha'] && parsed['kit-beta']) {
      return parsed;
    }
    return DEFAULT_KIT_PROGRESS;
  } catch {
    return DEFAULT_KIT_PROGRESS;
  }
}

export function InventoryPage({
  activeFilter,
  onFilterChange,
}: InventoryPageProps) {
  const [expandedSpecs, setExpandedSpecs] = useState<Record<string, boolean>>({
    'namo-drones': true,
    'micro-drones': false,
    'unassembled-kits': false,
  });

  const [selectedKit, setSelectedKit] = useState<KitId>('kit-alpha');
  const [kitProgress, setKitProgress] = useState<KitProgressState>(() =>
    loadKitProgress()
  );

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(kitProgress));
    } catch {
      // Ignore storage quota errors in restricted sandboxes
    }
  }, [kitProgress]);

  const filteredFleet =
    activeFilter === 'all'
      ? SCHOOL_FLEET
      : SCHOOL_FLEET.filter((item) => item.filterKey === activeFilter);

  const visibleUnits = filteredFleet.reduce((sum, item) => sum + item.quantity, 0);

  const toggleSpecs = (id: string) => {
    setExpandedSpecs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleStage = (kit: KitId, stageId: string) => {
    setKitProgress((prev) => ({
      ...prev,
      [kit]: {
        ...prev[kit],
        [stageId]: !prev[kit][stageId],
      },
    }));
  };

  const resetKit = (kit: KitId) => {
    setKitProgress((prev) => ({
      ...prev,
      [kit]: {
        frame: false,
        'motors-escs': false,
        'flight-controller': false,
        propellers: false,
        calibration: false,
      },
    }));
  };

  const renderStatus = (item: FleetItem) => {
    if (item.statusTone === 'operational') {
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>{item.statusLabel}</span>
        </span>
      );
    }
    if (item.statusTone === 'testing') {
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-700 dark:text-sky-400">
          <Zap className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>{item.statusLabel}</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 dark:text-amber-400">
        <Wrench className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
        <span>{item.statusLabel}</span>
      </span>
    );
  };

  const activeKitSteps = kitProgress[selectedKit];
  const completedCount = ASSEMBLY_STAGES.filter(
    (stage) => activeKitSteps[stage.id]
  ).length;
  const completionPct = Math.round(
    (completedCount / ASSEMBLY_STAGES.length) * 100
  );

  return (
    <div className="space-y-10">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-2xl">
          <p className="text-xs font-mono font-medium text-amber-700 dark:text-amber-400 mb-2">
            APS Mhow Hangar & Lab Ledger · 12 Total UAV Units
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#0F2537] dark:text-white tracking-tight [text-wrap:balance]">
            School Drone Inventory
          </h1>
          <p className="mt-2.5 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Inspect every active platform and engineering kit housed at the Army Public School Mhow Drone Club. Expand technical specification sheets or log assembly progress for active student bench builds.
          </p>
        </div>

        {/* Interactive Filter Bar */}
        <div
          role="group"
          aria-label="Filter drone inventory"
          className="flex flex-wrap items-center gap-1 p-1 rounded-lg bg-slate-100 dark:bg-[#101F30] border border-slate-200 dark:border-slate-800 self-start lg:self-end"
        >
          {FILTER_OPTIONS.map((opt) => {
            const isSelected = activeFilter === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => onFilterChange(opt.id)}
                aria-pressed={isSelected}
                className={`inline-flex items-center gap-2 min-h-[40px] px-3.5 py-2 text-xs font-semibold rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                  isSelected
                    ? 'bg-[#0F2537] text-white dark:bg-amber-500 dark:text-slate-950'
                    : 'text-slate-600 dark:text-slate-300 hover:text-[#0F2537] dark:hover:text-white'
                }`}
              >
                <span>{opt.label}</span>
                <span
                  className={`font-mono tabular-nums ${
                    isSelected
                      ? 'text-amber-300 dark:text-slate-900'
                      : 'text-slate-400 dark:text-slate-500'
                  }`}
                >
                  {opt.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results readout */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span className="inline-flex items-center gap-2">
          <SlidersHorizontal className="w-3.5 h-3.5" aria-hidden="true" />
          <span>
            Showing{' '}
            <strong className="font-mono tabular-nums text-slate-900 dark:text-slate-100">
              {visibleUnits}
            </strong>{' '}
            of{' '}
            <strong className="font-mono tabular-nums text-slate-900 dark:text-slate-100">
              12
            </strong>{' '}
            school units ({filteredFleet.length} fleet{' '}
            {filteredFleet.length === 1 ? 'class' : 'classes'})
          </span>
        </span>
        {activeFilter !== 'all' && (
          <button
            type="button"
            onClick={() => onFilterChange('all')}
            className="font-semibold text-amber-700 dark:text-amber-400 hover:underline cursor-pointer"
          >
            Show all units
          </button>
        )}
      </div>

      {/* Fleet Cards */}
      <div className="space-y-8">
        {filteredFleet.map((item) => {
          const isSpecsOpen = Boolean(expandedSpecs[item.id]);

          return (
            <article
              key={item.id}
              className="rounded-xl bg-white dark:bg-[#101F30] border border-slate-200 dark:border-slate-800 overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                {/* Media Column */}
                <div className="lg:col-span-5 relative bg-slate-100 dark:bg-[#0B1724] min-h-[260px]">
                  <ResilientImage
                    src={item.imageUrl}
                    alt={item.imageAlt}
                    fallbackTitle={item.name}
                    className="w-full h-full object-cover aspect-[4/3] lg:aspect-auto lg:h-full"
                  />
                </div>

                {/* Details Column */}
                <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    {/* Clean unboxed metadata row */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
                      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                        <span className="font-mono font-semibold text-[#0F2537] dark:text-amber-400 tabular-nums">
                          {item.quantity}x Units
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{item.dgcaCategory}</span>
                      </div>
                      {renderStatus(item)}
                    </div>

                    <h2 className="mt-4 font-display text-2xl sm:text-3xl font-bold text-[#0F2537] dark:text-white tracking-tight">
                      {item.quantity}x {item.name}
                    </h2>
                    <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-1">
                      {item.airframeType}
                    </p>

                    <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                      {item.summary}
                    </p>

                    {/* Primary Roles */}
                    <div className="mt-5">
                      <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2.5">
                        Operational & Educational Roles
                      </h3>
                      <ul className="space-y-2">
                        {item.roles.map((role) => (
                          <li
                            key={role}
                            className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-200"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-2 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"
                            />
                            <span>{role}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Specs Toggle Button */}
                  <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => toggleSpecs(item.id)}
                      aria-expanded={isSpecsOpen}
                      className="inline-flex items-center gap-2 min-h-[42px] px-4 py-2 text-xs font-semibold rounded-md border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#15283D] text-[#0F2537] dark:text-white hover:border-amber-500 dark:hover:border-amber-400 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                    >
                      <span>
                        {isSpecsOpen
                          ? 'Hide Technical Specifications'
                          : 'View Technical Specifications'}
                      </span>
                      {isSpecsOpen ? (
                        <ChevronUp className="w-4 h-4" aria-hidden="true" />
                      ) : (
                        <ChevronDown className="w-4 h-4" aria-hidden="true" />
                      )}
                    </button>

                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400 tabular-nums">
                      {item.specs.length} Technical Parameters
                    </span>
                  </div>
                </div>
              </div>

              {/* Expandable Technical Specifications Panel */}
              {isSpecsOpen && (
                <div className="border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-[#0C1927] px-6 sm:px-8 py-6">
                  <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-4">
                    Technical Specification Sheet — {item.name}
                  </h3>
                  <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4">
                    {item.specs.map((spec) => (
                      <div
                        key={spec.label}
                        className="pb-3 border-b border-slate-200/80 dark:border-slate-800"
                      >
                        <dt className="text-xs text-slate-500 dark:text-slate-400">
                          {spec.label}
                        </dt>
                        <dd className="mt-1 text-sm font-mono font-medium text-[#0F2537] dark:text-slate-100 tabular-nums">
                          {spec.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              {/* Interactive Lab Assembly Tracker for Unassembled Kits */}
              {item.hasAssemblyTracker && (
                <div className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0E1C2B] px-6 sm:px-8 py-7">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                      <h3 className="font-display text-lg font-bold text-[#0F2537] dark:text-white">
                        Student Lab Assembly Checklist & Progress Tracker
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                        Check off each completed fabrication milestone for the two lab build kits. Progress saves automatically in this browser.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <div
                        role="tablist"
                        aria-label="Select drone build kit"
                        className="inline-flex p-1 rounded-md bg-slate-100 dark:bg-[#132538] border border-slate-200 dark:border-slate-700"
                      >
                        <button
                          type="button"
                          role="tab"
                          aria-selected={selectedKit === 'kit-alpha'}
                          onClick={() => setSelectedKit('kit-alpha')}
                          className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors whitespace-nowrap cursor-pointer ${
                            selectedKit === 'kit-alpha'
                              ? 'bg-[#0F2537] text-white dark:bg-amber-500 dark:text-slate-950'
                              : 'text-slate-600 dark:text-slate-300 hover:text-[#0F2537] dark:hover:text-white'
                          }`}
                        >
                          Kit Alpha (Bench 01)
                        </button>
                        <button
                          type="button"
                          role="tab"
                          aria-selected={selectedKit === 'kit-beta'}
                          onClick={() => setSelectedKit('kit-beta')}
                          className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors whitespace-nowrap cursor-pointer ${
                            selectedKit === 'kit-beta'
                              ? 'bg-[#0F2537] text-white dark:bg-amber-500 dark:text-slate-950'
                              : 'text-slate-600 dark:text-slate-300 hover:text-[#0F2537] dark:hover:text-white'
                          }`}
                        >
                          Kit Beta (Bench 02)
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => resetKit(selectedKit)}
                        className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-md border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-[#0F2537] dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Reset</span>
                      </button>
                    </div>
                  </div>

                  {/* Progress Summary Bar */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="font-medium text-slate-700 dark:text-slate-200">
                        {selectedKit === 'kit-alpha'
                          ? 'Kit Alpha Build Readiness'
                          : 'Kit Beta Build Readiness'}
                        {' · '}
                        <span
                          className={
                            completionPct === 100
                              ? 'text-emerald-700 dark:text-emerald-400 font-semibold'
                              : 'text-amber-700 dark:text-amber-400 font-semibold'
                          }
                        >
                          {completionPct === 100
                            ? 'Ready for Faculty Pre-Flight Sign-Off'
                            : 'Bench Assembly In Progress'}
                        </span>
                      </span>
                      <span className="font-mono font-semibold tabular-nums text-[#0F2537] dark:text-white">
                        {completedCount}/{ASSEMBLY_STAGES.length} Stages ({completionPct}%)
                      </span>
                    </div>
                    <div
                      className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden"
                      role="progressbar"
                      aria-valuenow={completionPct}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        className={`h-full transition-all duration-300 ${
                          completionPct === 100
                            ? 'bg-emerald-600 dark:bg-emerald-400'
                            : 'bg-amber-500'
                        }`}
                        style={{ width: `${completionPct}%` }}
                      />
                    </div>
                  </div>

                  {/* 5 Interactive Stages */}
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                    {ASSEMBLY_STAGES.map((stage) => {
                      const isDone = Boolean(activeKitSteps[stage.id]);
                      return (
                        <button
                          key={stage.id}
                          type="button"
                          onClick={() => toggleStage(selectedKit, stage.id)}
                          aria-pressed={isDone}
                          className={`text-left p-4 rounded-lg border transition-colors duration-150 cursor-pointer flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                            isDone
                              ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800'
                              : 'bg-slate-50 dark:bg-[#132538] border-slate-200 dark:border-slate-700 hover:border-amber-500/70'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-2.5">
                              <span className="font-mono text-xs text-slate-500 dark:text-slate-400 tabular-nums">
                                Stage {stage.step}
                              </span>
                              <span
                                className={`w-5 h-5 rounded flex items-center justify-center border ${
                                  isDone
                                    ? 'bg-emerald-600 border-emerald-600 text-white'
                                    : 'bg-white dark:bg-[#0B1724] border-slate-300 dark:border-slate-600'
                                }`}
                              >
                                {isDone && (
                                  <Check className="w-3.5 h-3.5" aria-hidden="true" />
                                )}
                              </span>
                            </div>
                            <p className="font-display text-sm font-bold text-[#0F2537] dark:text-white">
                              {stage.title}
                            </p>
                            <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                              {stage.detail}
                            </p>
                          </div>

                          <p
                            className={`mt-3 pt-2 border-t text-[11px] font-semibold ${
                              isDone
                                ? 'border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-400'
                                : 'border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400'
                            }`}
                          >
                            {isDone ? 'Verified Complete' : 'Mark Complete'}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}

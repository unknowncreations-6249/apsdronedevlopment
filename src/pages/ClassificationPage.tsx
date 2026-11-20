import { useMemo, useState } from 'react';
import { Compass, Gauge, Layers, Scale, Target } from 'lucide-react';
import {
  AIRFRAME_TYPES,
  APPLICATION_DOMAINS,
  DGCA_WEIGHT_CLASSES,
  SPEED_RANGE_TIERS,
  VLOS_VS_BVLOS,
} from '../data/droneData';
import { AirframeSchematic } from '../components/AirframeSchematic';

type ClassificationTab = 'weight' | 'rotors' | 'speed' | 'application';

const TABS: { id: ClassificationTab; label: string }[] = [
  { id: 'weight', label: '1. By Weight (DGCA)' },
  { id: 'rotors', label: '2. Rotors & Airframe' },
  { id: 'speed', label: '3. Speed & Range' },
  { id: 'application', label: '4. By Application' },
];

type FinderAirframeKey = '2' | '3' | '4' | '6' | '8' | 'fixed' | 'vtol';

const FINDER_AIRFRAME_OPTIONS: { key: FinderAirframeKey; label: string; id: string }[] = [
  { key: '2', label: '2 Rotors (Bicopter)', id: 'bicopter' },
  { key: '3', label: '3 Rotors (Tricopter)', id: 'tricopter' },
  { key: '4', label: '4 Rotors (Quadcopter)', id: 'quadcopter' },
  { key: '6', label: '6 Rotors (Hexacopter)', id: 'hexacopter' },
  { key: '8', label: '8 Rotors (Octocopter)', id: 'octocopter' },
  { key: 'fixed', label: 'Fixed-Wing', id: 'fixed-wing' },
  { key: 'vtol', label: 'Hybrid VTOL', id: 'hybrid-vtol' },
];

export function ClassificationPage() {
  const [activeTab, setActiveTab] = useState<ClassificationTab>('weight');
  const [selectedAirframeId, setSelectedAirframeId] = useState<string>('quadcopter');

  // Interactive Drone Category Finder state
  const [weightUnit, setWeightUnit] = useState<'g' | 'kg'>('g');
  const [weightValue, setWeightValue] = useState<number>(380);
  const [finderAirframe, setFinderAirframe] = useState<FinderAirframeKey>('4');

  const weightInGrams = useMemo(() => {
    const safeVal = Number.isFinite(weightValue) && weightValue >= 0 ? weightValue : 0;
    return weightUnit === 'kg' ? safeVal * 1000 : safeVal;
  }, [weightValue, weightUnit]);

  const finderWeightClass = useMemo(() => {
    if (weightInGrams <= 250) return DGCA_WEIGHT_CLASSES[0];
    if (weightInGrams <= 2000) return DGCA_WEIGHT_CLASSES[1];
    if (weightInGrams <= 25000) return DGCA_WEIGHT_CLASSES[2];
    if (weightInGrams <= 150000) return DGCA_WEIGHT_CLASSES[3];
    return DGCA_WEIGHT_CLASSES[4];
  }, [weightInGrams]);

  const finderAirframeObj = useMemo(() => {
    const matchOpt = FINDER_AIRFRAME_OPTIONS.find((o) => o.key === finderAirframe);
    return (
      AIRFRAME_TYPES.find((a) => a.id === matchOpt?.id) ?? AIRFRAME_TYPES[2]
    );
  }, [finderAirframe]);

  const schoolFleetComparison = useMemo(() => {
    if (finderWeightClass.id === 'micro' && finderAirframe === '4') {
      return 'Exact match to APS Mhow’s 2x Assembled Micro Drones (~380 g) & 2x Unassembled 450mm Kits (~1.15 kg).';
    }
    if (finderWeightClass.id === 'small' && (finderAirframe === '6' || finderAirframe === '4')) {
      return 'Matches APS Mhow’s 8x Operational Namo Drones (Small Category agricultural/mapping fleet).';
    }
    if (finderWeightClass.id === 'micro') {
      return 'Same DGCA weight tier as APS Mhow’s Micro Drones & Lab Kits (Micro: 250 g – 2 kg).';
    }
    if (finderWeightClass.id === 'small') {
      return 'Same DGCA weight tier as APS Mhow’s Namo Drones (Small: 2 kg – 25 kg).';
    }
    return 'Outside the current APS Mhow school fleet weight envelope (Club operates Micro and Small UAVs).';
  }, [finderWeightClass.id, finderAirframe]);

  const handleUnitSwitch = (nextUnit: 'g' | 'kg') => {
    if (nextUnit === weightUnit) return;
    if (nextUnit === 'kg') {
      setWeightValue(Number((weightValue / 1000).toFixed(2)));
    } else {
      setWeightValue(Math.round(weightValue * 1000));
    }
    setWeightUnit(nextUnit);
  };

  const applyPreset = (grams: number, airframe: FinderAirframeKey) => {
    if (grams >= 2000) {
      setWeightUnit('kg');
      setWeightValue(Number((grams / 1000).toFixed(1)));
    } else {
      setWeightUnit('g');
      setWeightValue(grams);
    }
    setFinderAirframe(airframe);
  };

  const selectedAirframe =
    AIRFRAME_TYPES.find((a) => a.id === selectedAirframeId) ?? AIRFRAME_TYPES[2];

  return (
    <div className="space-y-12">
      {/* Page Header */}
      <div className="pb-8 border-b border-slate-200 dark:border-slate-800">
        <p className="text-xs font-mono font-medium text-amber-700 dark:text-amber-400 mb-2">
          DGCA India Rules & Aerospace Taxonomy · Interactive Reference
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#0F2537] dark:text-white tracking-tight [text-wrap:balance]">
          Classification of Drones (UAVs)
        </h1>
        <p className="mt-2.5 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          Unmanned Aerial Vehicles are categorized across four engineering and regulatory dimensions: All-Up Weight under DGCA India standards, rotor and airframe geometry, cruise speed and visual line-of-sight range, and mission application.
        </p>
      </div>

      {/* 4-Tab Interactive Guide */}
      <section aria-label="Drone classification categories" className="space-y-6">
        <div
          role="tablist"
          aria-label="Classification dimensions"
          className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-lg bg-slate-100 dark:bg-[#101F30] border border-slate-200 dark:border-slate-800"
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.id)}
                className={`min-h-[42px] px-4 py-2 text-xs sm:text-sm font-semibold rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                  isActive
                    ? 'bg-[#0F2537] text-white dark:bg-amber-500 dark:text-slate-950'
                    : 'text-slate-600 dark:text-slate-300 hover:text-[#0F2537] dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* TAB 1: BY WEIGHT (DGCA INDIA) */}
        {activeTab === 'weight' && (
          <div className="space-y-6">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h2 className="font-display text-2xl font-bold text-[#0F2537] dark:text-white flex items-center gap-2">
                  <Scale className="w-5 h-5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
                  <span>By Weight — DGCA India & Standard Categories</span>
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-3xl">
                  The Directorate General of Civil Aviation (DGCA) classifies unmanned aircraft by Maximum All-Up Weight (including battery and payload). Notice where our school’s Micro Drones and Namo Drones fall below.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101F30]">
              <table className="w-full text-left border-collapse min-w-[720px]">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0D1A28] text-xs font-semibold text-slate-600 dark:text-slate-300">
                    <th className="py-3.5 px-5">Category</th>
                    <th className="py-3.5 px-5">Weight Limit (AUW)</th>
                    <th className="py-3.5 px-5">UIN & Licensing (DGCA)</th>
                    <th className="py-3.5 px-5">Typical Mission & APS Mhow Mapping</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-sm">
                  {DGCA_WEIGHT_CLASSES.map((wc) => (
                    <tr
                      key={wc.id}
                      className={
                        wc.schoolFleetMatch
                          ? 'bg-amber-50/55 dark:bg-amber-500/8'
                          : 'hover:bg-slate-50/70 dark:hover:bg-slate-800/30'
                      }
                    >
                      <td className="py-4 px-5 align-top">
                        <span className="font-display font-bold text-[#0F2537] dark:text-white">
                          {wc.name}
                        </span>
                      </td>
                      <td className="py-4 px-5 align-top font-mono font-medium tabular-nums text-[#0F2537] dark:text-amber-300 whitespace-nowrap">
                        {wc.rangeLabel}
                      </td>
                      <td className="py-4 px-5 align-top text-slate-600 dark:text-slate-300">
                        <p className="font-medium text-slate-800 dark:text-slate-100 text-xs">
                          {wc.uinRequired}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          {wc.pilotCert}
                        </p>
                      </td>
                      <td className="py-4 px-5 align-top text-slate-600 dark:text-slate-300">
                        <p className="text-xs sm:text-sm leading-relaxed">{wc.typicalUse}</p>
                        {wc.schoolFleetMatch && (
                          <p className="mt-2 text-xs font-semibold text-amber-800 dark:text-amber-300">
                            ★ {wc.schoolFleetMatch}
                          </p>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: BY ROTORS & AIRFRAME TYPE */}
        {activeTab === 'rotors' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-2xl font-bold text-[#0F2537] dark:text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
                <span>By Number of Rotors & Airframe Type</span>
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-3xl">
                Select any rotor or wing architecture below to inspect its top-down thrust geometry and compare stability, lift capacity, and battery efficiency.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Selector List */}
              <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
                {AIRFRAME_TYPES.map((af) => {
                  const active = af.id === selectedAirframe.id;
                  return (
                    <button
                      key={af.id}
                      type="button"
                      onClick={() => setSelectedAirframeId(af.id)}
                      className={`text-left px-4 py-3.5 rounded-lg border transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                        active
                          ? 'bg-[#0F2537] dark:bg-[#173049] border-[#0F2537] dark:border-amber-500/70 text-white'
                          : 'bg-white dark:bg-[#101F30] border-slate-200 dark:border-slate-800 hover:border-amber-500/60 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-display font-bold text-sm">
                          {af.name}
                        </span>
                        <span
                          className={`font-mono text-xs ${
                            active
                              ? 'text-amber-300'
                              : 'text-slate-500 dark:text-slate-400'
                          }`}
                        >
                          {af.rotorsLabel}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Engineering Detail Card */}
              <div className="lg:col-span-7 p-6 sm:p-7 rounded-xl bg-white dark:bg-[#101F30] border border-slate-200 dark:border-slate-800 space-y-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-[#0F2537] dark:text-white">
                      {selectedAirframe.name}
                    </h3>
                    <p className="text-xs font-mono text-amber-700 dark:text-amber-400 mt-0.5">
                      {selectedAirframe.rotorsLabel}
                    </p>
                  </div>
                </div>

                <AirframeSchematic typeId={selectedAirframe.id} />

                {/* Quantitative Comparison Bars */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  {[
                    { label: 'Flight Stability', value: selectedAirframe.stability },
                    { label: 'Lift Capacity', value: selectedAirframe.liftCapacity },
                    { label: 'Battery Efficiency', value: selectedAirframe.efficiency },
                  ].map((metric) => (
                    <div
                      key={metric.label}
                      className="p-3.5 rounded-lg bg-slate-50 dark:bg-[#0D1A28] border border-slate-200/80 dark:border-slate-800"
                    >
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="text-slate-600 dark:text-slate-400 font-medium">
                          {metric.label}
                        </span>
                        <span className="font-mono font-semibold tabular-nums text-[#0F2537] dark:text-white">
                          {metric.value}/100
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                        <div
                          className="h-full bg-amber-500 transition-all duration-200"
                          style={{ width: `${metric.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-sm">
                  <div>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      Aerodynamic Behavior
                    </span>
                    <p className="mt-1 text-slate-700 dark:text-slate-200 leading-relaxed">
                      {selectedAirframe.aerodynamicsNote}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                        Fault Redundancy
                      </span>
                      <p className="mt-1 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                        {selectedAirframe.redundancy}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                        Primary Mission Fit
                      </span>
                      <p className="mt-1 text-xs text-amber-800 dark:text-amber-300 font-medium leading-relaxed">
                        {selectedAirframe.bestFor}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: BY SPEED & RANGE (PLUS VLOS VS BVLOS) */}
        {activeTab === 'speed' && (
          <div className="space-y-8">
            <div>
              <h2 className="font-display text-2xl font-bold text-[#0F2537] dark:text-white flex items-center gap-2">
                <Gauge className="w-5 h-5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
                <span>By Speed Envelope & Operational Range</span>
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-3xl">
                Propulsion tuning determines whether a UAV prioritizes gentle classroom stability, steady survey cruise, or extreme thrust-to-weight agility.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {SPEED_RANGE_TIERS.map((tier, idx) => (
                <div
                  key={tier.id}
                  className="p-6 rounded-lg bg-white dark:bg-[#101F30] border border-slate-200 dark:border-slate-800 flex flex-col justify-between"
                >
                  <div>
                    <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
                      0{idx + 1}. Speed Class
                    </p>
                    <h3 className="mt-1.5 font-display text-lg font-bold text-[#0F2537] dark:text-white">
                      {tier.tier}
                    </h3>

                    <div className="mt-4 py-3 border-y border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-3">
                      <div>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                          Cruise / Top Speed
                        </span>
                        <span className="font-mono text-sm font-semibold tabular-nums text-amber-700 dark:text-amber-400">
                          {tier.speedRange}
                        </span>
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                          Typical Range
                        </span>
                        <span className="font-mono text-sm font-semibold tabular-nums text-[#0F2537] dark:text-slate-100">
                          {tier.typicalRange}
                        </span>
                      </div>
                    </div>

                    <p className="mt-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {tier.flightProfile}
                    </p>
                  </div>

                  <p className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
                    <strong className="text-slate-800 dark:text-slate-200">Examples:</strong>{' '}
                    {tier.examples}
                  </p>
                </div>
              ))}
            </div>

            {/* VLOS vs BVLOS Matrix */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
              <h3 className="font-display text-xl font-bold text-[#0F2537] dark:text-white mb-4">
                Visual Line of Sight (VLOS) vs. Beyond Visual Line of Sight (BVLOS)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {VLOS_VS_BVLOS.map((item) => (
                  <div
                    key={item.mode}
                    className="p-6 rounded-lg bg-white dark:bg-[#101F30] border border-slate-200 dark:border-slate-800 space-y-4"
                  >
                    <div className="flex items-baseline justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                      <span className="font-display text-xl font-bold text-[#0F2537] dark:text-white">
                        {item.mode} — {item.fullName}
                      </span>
                    </div>
                    <dl className="space-y-3 text-sm">
                      <div>
                        <dt className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                          Regulatory Status
                        </dt>
                        <dd className="mt-0.5 text-slate-700 dark:text-slate-200">
                          {item.legalBaseline}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                          Typical Distance Envelope
                        </dt>
                        <dd className="mt-0.5 font-mono text-xs text-amber-700 dark:text-amber-400 tabular-nums">
                          {item.typicalDistance}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                          Command & Navigation Tech
                        </dt>
                        <dd className="mt-0.5 text-slate-600 dark:text-slate-300">
                          {item.navigationTech}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                          Safety Controls
                        </dt>
                        <dd className="mt-0.5 text-slate-600 dark:text-slate-300">
                          {item.safetyRequirements}
                        </dd>
                      </div>
                    </dl>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: BY APPLICATION */}
        {activeTab === 'application' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-2xl font-bold text-[#0F2537] dark:text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
                <span>By Mission Application</span>
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-3xl">
                Modern UAVs are specialized flying sensor and payload platforms tailored for agriculture, national defense, geospatial surveying, and emergency response.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {APPLICATION_DOMAINS.map((domain, idx) => (
                <div
                  key={domain.id}
                  className="p-6 rounded-lg bg-white dark:bg-[#101F30] border border-slate-200 dark:border-slate-800 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 mb-2">
                      <span>0{idx + 1}. Operational Domain</span>
                      <span className="tabular-nums">{domain.altitudeBand}</span>
                    </div>
                    <h3 className="font-display text-xl font-bold text-[#0F2537] dark:text-white">
                      {domain.title}
                    </h3>
                    <p className="mt-2.5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {domain.description}
                    </p>

                    <dl className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2.5 text-xs">
                      <div>
                        <dt className="text-slate-500 dark:text-slate-400 font-semibold">
                          Preferred Platform
                        </dt>
                        <dd className="text-slate-800 dark:text-slate-200 mt-0.5">
                          {domain.typicalPlatform}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-slate-500 dark:text-slate-400 font-semibold">
                          Core Payload Suite
                        </dt>
                        <dd className="text-slate-800 dark:text-slate-200 mt-0.5">
                          {domain.primaryPayload}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <p className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-medium text-amber-700 dark:text-amber-400">
                    Field Benchmark: {domain.impactMetric}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* INTERACTIVE DRONE CATEGORY FINDER MINI-TOOL */}
      <section
        aria-labelledby="category-finder-heading"
        className="rounded-xl bg-white dark:bg-[#101F30] border border-slate-200 dark:border-slate-800 overflow-hidden"
      >
        <div className="px-6 sm:px-8 py-6 bg-[#0F2537] dark:bg-[#0B1724] border-b border-slate-800 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-1">
              <Compass className="w-4 h-4" aria-hidden="true" />
              <span>Interactive Engineering Utility</span>
            </div>
            <h2
              id="category-finder-heading"
              className="font-display text-2xl font-bold tracking-tight"
            >
              Drone Category Finder
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Enter a UAV’s all-up takeoff weight and rotor configuration to determine its official DGCA India category and aerodynamic class.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => applyPreset(380, '4')}
              className="px-3 py-2 text-xs font-semibold rounded-md bg-white/10 hover:bg-white/20 text-white transition-colors whitespace-nowrap cursor-pointer"
            >
              Test: School Micro (380 g)
            </button>
            <button
              type="button"
              onClick={() => applyPreset(22000, '6')}
              className="px-3 py-2 text-xs font-semibold rounded-md bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors whitespace-nowrap cursor-pointer"
            >
              Test: Namo Drone (22 kg)
            </button>
          </div>
        </div>

        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Input Controls */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="uav-weight-input"
                  className="text-xs font-semibold text-slate-700 dark:text-slate-200"
                >
                  All-Up Takeoff Weight ({weightUnit})
                </label>
                <div className="inline-flex rounded-md border border-slate-200 dark:border-slate-700 overflow-hidden text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => handleUnitSwitch('g')}
                    className={`px-2.5 py-1 cursor-pointer transition-colors ${
                      weightUnit === 'g'
                        ? 'bg-[#0F2537] text-white dark:bg-amber-500 dark:text-slate-950'
                        : 'bg-white dark:bg-[#0D1A28] text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    Grams (g)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUnitSwitch('kg')}
                    className={`px-2.5 py-1 cursor-pointer transition-colors ${
                      weightUnit === 'kg'
                        ? 'bg-[#0F2537] text-white dark:bg-amber-500 dark:text-slate-950'
                        : 'bg-white dark:bg-[#0D1A28] text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    Kilograms (kg)
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  id="uav-weight-input"
                  type="number"
                  min={0}
                  max={weightUnit === 'kg' ? 500 : 200000}
                  step={weightUnit === 'kg' ? 0.1 : 10}
                  value={weightValue}
                  onChange={(e) => {
                    const parsed = parseFloat(e.target.value);
                    setWeightValue(Number.isNaN(parsed) ? 0 : Math.max(0, parsed));
                  }}
                  className="w-full min-h-[44px] px-3.5 py-2 font-mono text-base font-semibold tabular-nums rounded-md border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#0D1A28] text-[#0F2537] dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <span className="font-mono text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap tabular-nums">
                  = {(weightInGrams / 1000).toFixed(2)} kg
                </span>
              </div>

              <div className="mt-3">
                <input
                  aria-label="Adjust UAV weight slider"
                  type="range"
                  min={weightUnit === 'kg' ? 0.1 : 50}
                  max={weightUnit === 'kg' ? 180 : 30000}
                  step={weightUnit === 'kg' ? 0.5 : 50}
                  value={Math.min(weightValue, weightUnit === 'kg' ? 180 : 30000)}
                  onChange={(e) => setWeightValue(parseFloat(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400 tabular-nums mt-1">
                  <span>{weightUnit === 'kg' ? '0.1 kg' : '50 g'}</span>
                  <span>{weightUnit === 'kg' ? '25 kg' : '2,000 g'}</span>
                  <span>{weightUnit === 'kg' ? '180 kg' : '30,000 g'}</span>
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="uav-airframe-select"
                className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-2"
              >
                Rotor Count / Airframe Configuration
              </label>
              <select
                id="uav-airframe-select"
                value={finderAirframe}
                onChange={(e) => setFinderAirframe(e.target.value as FinderAirframeKey)}
                className="w-full min-h-[44px] px-3.5 py-2 text-sm font-medium rounded-md border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#0D1A28] text-[#0F2537] dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
              >
                {FINDER_AIRFRAME_OPTIONS.map((opt) => (
                  <option key={opt.key} value={opt.key}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Live Classification Output */}
          <div className="lg:col-span-7 p-6 rounded-lg bg-slate-50 dark:bg-[#0D1A28] border border-slate-200 dark:border-slate-800 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
              <div>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Official DGCA Weight Class
                </span>
                <p className="mt-1 font-display text-2xl font-bold text-[#0F2537] dark:text-amber-400">
                  {finderWeightClass.name} UAV
                </p>
                <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-0.5 tabular-nums">
                  Band: {finderWeightClass.rangeLabel}
                </p>
              </div>
              <div>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Airframe Architecture
                </span>
                <p className="mt-1 font-display text-2xl font-bold text-[#0F2537] dark:text-white">
                  {finderAirframeObj.name}
                </p>
                <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                  {finderAirframeObj.rotorsLabel}
                </p>
              </div>
            </div>

            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <dt className="font-semibold text-slate-500 dark:text-slate-400">
                  DigitalSky UIN Requirement
                </dt>
                <dd className="mt-1 text-slate-800 dark:text-slate-200 leading-relaxed">
                  {finderWeightClass.uinRequired}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-500 dark:text-slate-400">
                  Pilot Certification Rule
                </dt>
                <dd className="mt-1 text-slate-800 dark:text-slate-200 leading-relaxed">
                  {finderWeightClass.pilotCert}
                </dd>
              </div>
              <div className="sm:col-span-2 pt-2 border-t border-slate-200/80 dark:border-slate-800">
                <dt className="font-semibold text-slate-500 dark:text-slate-400">
                  APS Mhow Fleet Comparison
                </dt>
                <dd className="mt-1 text-sm font-medium text-amber-800 dark:text-amber-300">
                  {schoolFleetComparison}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </div>
  );
}

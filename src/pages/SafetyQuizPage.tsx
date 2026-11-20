import { useState } from 'react';
import {
  AlertTriangle,
  BatteryCharging,
  Check,
  CheckCircle2,
  MapPinOff,
  RotateCcw,
  ShieldAlert,
  Wind,
  XCircle,
} from 'lucide-react';
import {
  CLUB_QUIZ_QUESTIONS,
  PREFLIGHT_CHECKLIST,
} from '../data/droneData';

const SAFETY_GUIDELINES = [
  {
    id: 'airspace',
    title: 'DGCA Airspace & No-Fly Zones',
    icon: MapPinOff,
    summary: 'DigitalSky classifies Indian airspace into Green, Yellow, and Red zones.',
    points: [
      'Green Zone: Permitted up to 400 ft (120 m) AGL for registered UAVs with UIN.',
      'Yellow Zone: Controlled airspace near airports—requires prior ATC permission.',
      'Red Zone (No-Fly): Military cantonments, defense installations, and international borders—strictly prohibited without Central Govt clearance. Mhow operations stay strictly inside cleared school premises.',
    ],
  },
  {
    id: 'lipo',
    title: 'LiPo Battery Handling & Storage',
    icon: BatteryCharging,
    summary: 'High-discharge Lithium Polymer packs demand disciplined voltage & thermal care.',
    points: [
      'Never discharge a LiPo below 3.5 V per cell under load; land immediately at 25% reserve.',
      'Store batteries between club sessions at 3.80–3.85 V/cell inside fireproof LiPo safe bags.',
      'Quarantine any pack showing swelling (puffing), torn insulation, or cell voltage imbalance > 0.1 V.',
    ],
  },
  {
    id: 'weather',
    title: 'Weather & Campus Demo Limits',
    icon: Wind,
    summary: 'Abort outdoor launches whenever wind or visibility crosses airframe limits.',
    points: [
      'Maximum sustained wind: < 15 km/h for Micro Drones and < 25 km/h for Namo Hexacopters.',
      'Zero flight during rain, drizzle, fog, dust storms, or lightning within 10 km.',
      'Fly exclusively in clear daylight VLOS with a faculty supervisor and dedicated visual spotter.',
    ],
  },
];

export function SafetyQuizPage() {
  // Interactive Pre-Flight Checklist state
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  // Interactive 5-Question Quiz state
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const resetChecklist = () => setCheckedItems({});

  const checkedCount = PREFLIGHT_CHECKLIST.filter((i) => checkedItems[i.id]).length;
  const checklistPct = Math.round((checkedCount / PREFLIGHT_CHECKLIST.length) * 100);
  const isFlightCleared = checkedCount === PREFLIGHT_CHECKLIST.length;

  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === CLUB_QUIZ_QUESTIONS.length;

  const score = CLUB_QUIZ_QUESTIONS.reduce((acc, q) => {
    return acc + (answers[q.id] === q.correctIndex ? 1 : 0);
  }, 0);

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    if (quizSubmitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmitQuiz = () => {
    if (!allAnswered) return;
    setQuizSubmitted(true);
  };

  const handleRetakeQuiz = () => {
    setAnswers({});
    setQuizSubmitted(false);
  };

  const getScoreFeedback = (s: number) => {
    if (s === 5) return 'Flight-Ready Distinction — Full command of DGCA rules and APS Mhow fleet specs.';
    if (s === 4) return 'Qualified Cadet — Strong understanding; review the missed item before field ops.';
    if (s === 3) return 'Developing Pilot — Revisit the Classification & Fleet pages to sharpen fundamentals.';
    return 'Ground School Review Needed — Study the DGCA weight tiers, safety protocols, and fleet sheet, then retry.';
  };

  return (
    <div className="space-y-14">
      {/* Page Header */}
      <div className="pb-8 border-b border-slate-200 dark:border-slate-800">
        <p className="text-xs font-mono font-medium text-amber-700 dark:text-amber-400 mb-2">
          Flight Line Discipline & Knowledge Check · APS Mhow Drone Club
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#0F2537] dark:text-white tracking-tight [text-wrap:balance]">
          Flight Safety & Club Quiz
        </h1>
        <p className="mt-2.5 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          Every school demonstration and lab test flight follows a mandatory pre-flight verification protocol aligned with DGCA India regulations. Complete the checklist below and validate your readiness with the 5-question club assessment.
        </p>
      </div>

      {/* SECTION 1: DGCA SAFETY GUIDELINES */}
      <section aria-labelledby="dgca-guidelines-heading" className="space-y-6">
        <h2
          id="dgca-guidelines-heading"
          className="font-display text-2xl font-bold text-[#0F2537] dark:text-white"
        >
          DGCA Safety Guidelines for Campus Demonstrations
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {SAFETY_GUIDELINES.map((guide) => {
            const Icon = guide.icon;
            return (
              <div
                key={guide.id}
                className="p-6 rounded-lg bg-white dark:bg-[#101F30] border border-slate-200 dark:border-slate-800 flex flex-col"
              >
                <div className="flex items-center gap-2.5 mb-3">
                  <Icon className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" aria-hidden="true" />
                  <h3 className="font-display text-lg font-bold text-[#0F2537] dark:text-white">
                    {guide.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                  {guide.summary}
                </p>
                <ul className="space-y-2.5 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {guide.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2">
                      <span
                        aria-hidden="true"
                        className="mt-2 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"
                      />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 2: INTERACTIVE PRE-FLIGHT CHECKLIST */}
      <section
        aria-labelledby="preflight-heading"
        className="rounded-xl bg-white dark:bg-[#101F30] border border-slate-200 dark:border-slate-800 overflow-hidden"
      >
        <div className="p-6 sm:p-8 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2
              id="preflight-heading"
              className="font-display text-2xl font-bold text-[#0F2537] dark:text-white"
            >
              Interactive Pre-Flight Inspection Checklist
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Verify all 10 mechanical, LiPo battery, avionics, and airspace items prior to arming motors.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="text-right">
              <p className="font-mono text-lg font-bold tabular-nums text-[#0F2537] dark:text-white">
                {checkedCount} / {PREFLIGHT_CHECKLIST.length} Verified
              </p>
              <p
                className={`text-xs font-semibold inline-flex items-center gap-1 ${
                  isFlightCleared
                    ? 'text-emerald-700 dark:text-emerald-400'
                    : 'text-amber-700 dark:text-amber-400'
                }`}
              >
                {isFlightCleared ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Cleared for Faculty Sign-Off</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Pre-Flight Hold ({checklistPct}%)</span>
                  </>
                )}
              </p>
            </div>

            {checkedCount > 0 && (
              <button
                type="button"
                onClick={resetChecklist}
                className="inline-flex items-center gap-1.5 min-h-[40px] px-3 py-2 text-xs font-semibold rounded-md border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden mb-6">
            <div
              className={`h-full transition-all duration-200 ${
                isFlightCleared ? 'bg-emerald-600 dark:bg-emerald-400' : 'bg-amber-500'
              }`}
              style={{ width: `${checklistPct}%` }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {PREFLIGHT_CHECKLIST.map((item, idx) => {
              const checked = Boolean(checkedItems[item.id]);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleCheck(item.id)}
                  aria-pressed={checked}
                  className={`text-left p-4 rounded-lg border transition-colors duration-150 flex items-start gap-3.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                    checked
                      ? 'bg-emerald-50/70 dark:bg-emerald-950/25 border-emerald-300 dark:border-emerald-800'
                      : 'bg-slate-50/70 dark:bg-[#0D1A28] border-slate-200 dark:border-slate-800 hover:border-amber-500/60'
                  }`}
                >
                  <span
                    className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center border shrink-0 ${
                      checked
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'bg-white dark:bg-[#101F30] border-slate-300 dark:border-slate-600'
                    }`}
                  >
                    {checked && <Check className="w-3.5 h-3.5" aria-hidden="true" />}
                  </span>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-2 text-[11px] font-mono text-slate-500 dark:text-slate-400">
                      <span className="tabular-nums">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{item.category}</span>
                    </div>
                    <p
                      className={`mt-0.5 text-sm font-semibold ${
                        checked
                          ? 'text-emerald-900 dark:text-emerald-200 line-through decoration-emerald-500/60'
                          : 'text-[#0F2537] dark:text-white'
                      }`}
                    >
                      {item.title}
                    </p>
                    <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3: 5-QUESTION INTERACTIVE CLUB QUIZ */}
      <section
        aria-labelledby="club-quiz-heading"
        className="rounded-xl bg-white dark:bg-[#101F30] border border-slate-200 dark:border-slate-800 overflow-hidden"
      >
        <div className="px-6 sm:px-8 py-6 bg-[#0F2537] dark:bg-[#0B1724] text-white border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-1">
              <ShieldAlert className="w-4 h-4" aria-hidden="true" />
              <span>5-Question Cadet Assessment · Instant Scoring</span>
            </div>
            <h2
              id="club-quiz-heading"
              className="font-display text-2xl font-bold tracking-tight"
            >
              APS Mhow Drone Club Knowledge Quiz
            </h2>
          </div>

          <div className="font-mono text-sm tabular-nums text-slate-200 shrink-0">
            {quizSubmitted ? (
              <span className="text-amber-400 font-bold text-base">
                Score: {score} / {CLUB_QUIZ_QUESTIONS.length} ({Math.round((score / CLUB_QUIZ_QUESTIONS.length) * 100)}%)
              </span>
            ) : (
              <span>
                Answered: {answeredCount} / {CLUB_QUIZ_QUESTIONS.length}
              </span>
            )}
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          {/* Score Result Banner when Submitted */}
          {quizSubmitted && (
            <div className="p-6 rounded-lg bg-slate-50 dark:bg-[#0D1A28] border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <p className="text-xs font-mono font-semibold text-amber-700 dark:text-amber-400">
                  Assessment Complete
                </p>
                <p className="mt-1 font-display text-2xl font-bold text-[#0F2537] dark:text-white tabular-nums">
                  You scored {score} out of {CLUB_QUIZ_QUESTIONS.length}
                </p>
                <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-300">
                  {getScoreFeedback(score)}
                </p>
              </div>
              <button
                type="button"
                onClick={handleRetakeQuiz}
                className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 text-sm font-semibold rounded-md bg-[#0F2537] dark:bg-amber-500 text-white dark:text-slate-950 hover:bg-[#193A56] dark:hover:bg-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" aria-hidden="true" />
                <span>Retake Quiz</span>
              </button>
            </div>
          )}

          {/* Questions List */}
          <div className="space-y-7">
            {CLUB_QUIZ_QUESTIONS.map((q, qIdx) => {
              const userChoice = answers[q.id];
              const isCorrect = quizSubmitted && userChoice === q.correctIndex;

              return (
                <fieldset
                  key={q.id}
                  className="pb-7 border-b border-slate-200 dark:border-slate-800 last:border-b-0 last:pb-0"
                >
                  <legend className="w-full">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 mb-2">
                      <span>
                        Question {qIdx + 1} of {CLUB_QUIZ_QUESTIONS.length} · {q.topic}
                      </span>
                      {quizSubmitted && (
                        <span
                          className={`inline-flex items-center gap-1 font-sans font-semibold ${
                            isCorrect
                              ? 'text-emerald-700 dark:text-emerald-400'
                              : 'text-rose-700 dark:text-rose-400'
                          }`}
                        >
                          {isCorrect ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                              <span>Correct</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3.5 h-3.5" aria-hidden="true" />
                              <span>Incorrect</span>
                            </>
                          )}
                        </span>
                      )}
                    </div>
                    <p className="font-display text-base sm:text-lg font-bold text-[#0F2537] dark:text-white leading-snug">
                      {q.question}
                    </p>
                  </legend>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {q.options.map((option, optIdx) => {
                      const isSelected = userChoice === optIdx;
                      const isRightOption = optIdx === q.correctIndex;

                      let styleClass =
                        'bg-slate-50 dark:bg-[#0D1A28] border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:border-amber-500/70';

                      if (!quizSubmitted && isSelected) {
                        styleClass =
                          'bg-[#0F2537] dark:bg-amber-500/15 border-[#0F2537] dark:border-amber-400 text-white dark:text-amber-200';
                      } else if (quizSubmitted && isRightOption) {
                        styleClass =
                          'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-950 dark:text-emerald-200';
                      } else if (quizSubmitted && isSelected && !isRightOption) {
                        styleClass =
                          'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-950 dark:text-rose-200';
                      }

                      const letter = String.fromCharCode(65 + optIdx);

                      return (
                        <button
                          key={option}
                          type="button"
                          disabled={quizSubmitted}
                          onClick={() => handleSelectOption(q.id, optIdx)}
                          aria-pressed={isSelected}
                          className={`text-left p-4 rounded-lg border transition-colors duration-150 flex items-start gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                            quizSubmitted ? 'cursor-default' : 'cursor-pointer'
                          } ${styleClass}`}
                        >
                          <span className="font-mono text-xs font-bold mt-0.5 shrink-0 opacity-80">
                            {letter}.
                          </span>
                          <span className="text-sm leading-relaxed">{option}</span>
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted && (
                    <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-[#0D1A28] border border-slate-200/80 dark:border-slate-800 rounded-md px-4 py-3">
                      <strong className="text-[#0F2537] dark:text-white">Explanation:</strong>{' '}
                      {q.explanation}
                    </p>
                  )}
                </fieldset>
              );
            })}
          </div>

          {/* Submit Action Bar */}
          {!quizSubmitted && (
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {allAnswered
                  ? 'All 5 questions answered. Submit to calculate your score and view explanations.'
                  : `Select an answer for all ${CLUB_QUIZ_QUESTIONS.length} questions to submit (${CLUB_QUIZ_QUESTIONS.length - answeredCount} remaining).`}
              </p>
              <button
                type="button"
                disabled={!allAnswered}
                onClick={handleSubmitQuiz}
                className={`inline-flex items-center justify-center min-h-[44px] px-6 py-2.5 text-sm font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                  allAnswered
                    ? 'bg-amber-500 text-slate-950 hover:bg-amber-400 cursor-pointer'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-500 cursor-not-allowed'
                }`}
              >
                Submit Quiz & View Score
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

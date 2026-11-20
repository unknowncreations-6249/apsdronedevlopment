interface AirframeSchematicProps {
  typeId: string;
}

export function AirframeSchematic({ typeId }: AirframeSchematicProps) {
  const rotorDisc = (cx: number, cy: number, r = 20, cw = true) => (
    <g key={`${cx}-${cy}`}>
      <circle
        cx={cx}
        cy={cy}
        r={r}
        className="fill-amber-500/12 stroke-amber-600 dark:stroke-amber-400"
        strokeWidth="1.5"
        strokeDasharray="4 3"
      />
      <circle
        cx={cx}
        cy={cy}
        r={4}
        className="fill-[#0F2537] dark:fill-slate-100"
      />
      <text
        x={cx}
        y={cy + r + 11}
        textAnchor="middle"
        className="fill-slate-500 dark:fill-slate-400 font-mono"
        fontSize="8"
      >
        {cw ? 'CW' : 'CCW'}
      </text>
    </g>
  );

  const renderAirframe = () => {
    switch (typeId) {
      case 'bicopter':
        return (
          <g>
            <line x1="55" y1="90" x2="185" y2="90" className="stroke-[#0F2537] dark:stroke-slate-300" strokeWidth="4" strokeLinecap="round" />
            <rect x="104" y="68" width="32" height="44" rx="5" className="fill-[#0F2537] dark:fill-slate-200" />
            {rotorDisc(55, 90, 26, true)}
            {rotorDisc(185, 90, 26, false)}
          </g>
        );
      case 'tricopter':
        return (
          <g>
            <line x1="120" y1="92" x2="62" y2="48" className="stroke-[#0F2537] dark:stroke-slate-300" strokeWidth="4" strokeLinecap="round" />
            <line x1="120" y1="92" x2="178" y2="48" className="stroke-[#0F2537] dark:stroke-slate-300" strokeWidth="4" strokeLinecap="round" />
            <line x1="120" y1="92" x2="120" y2="146" className="stroke-[#0F2537] dark:stroke-slate-300" strokeWidth="4" strokeLinecap="round" />
            <polygon points="120,76 134,104 106,104" className="fill-[#0F2537] dark:fill-slate-200" />
            {rotorDisc(62, 48, 22, true)}
            {rotorDisc(178, 48, 22, false)}
            {rotorDisc(120, 146, 22, true)}
          </g>
        );
      case 'quadcopter':
        return (
          <g>
            <line x1="65" y1="45" x2="175" y2="135" className="stroke-[#0F2537] dark:stroke-slate-300" strokeWidth="4" strokeLinecap="round" />
            <line x1="175" y1="45" x2="65" y2="135" className="stroke-[#0F2537] dark:stroke-slate-300" strokeWidth="4" strokeLinecap="round" />
            <rect x="105" y="75" width="30" height="30" rx="5" className="fill-[#0F2537] dark:fill-slate-200" />
            {rotorDisc(65, 45, 22, true)}
            {rotorDisc(175, 45, 22, false)}
            {rotorDisc(65, 135, 22, false)}
            {rotorDisc(175, 135, 22, true)}
          </g>
        );
      case 'hexacopter': {
        const pts = Array.from({ length: 6 }, (_, i) => {
          const angle = (i * 60 - 90) * (Math.PI / 180);
          return {
            x: 120 + Math.cos(angle) * 60,
            y: 90 + Math.sin(angle) * 56,
            cw: i % 2 === 0,
          };
        });
        return (
          <g>
            {pts.map((p, idx) => (
              <line
                key={idx}
                x1="120"
                y1="90"
                x2={p.x}
                y2={p.y}
                className="stroke-[#0F2537] dark:stroke-slate-300"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            ))}
            <circle cx="120" cy="90" r="16" className="fill-[#0F2537] dark:fill-slate-200" />
            {pts.map((p) => rotorDisc(p.x, p.y, 17, p.cw))}
          </g>
        );
      }
      case 'octocopter': {
        const pts = Array.from({ length: 8 }, (_, i) => {
          const angle = (i * 45 - 67.5) * (Math.PI / 180);
          return {
            x: 120 + Math.cos(angle) * 62,
            y: 90 + Math.sin(angle) * 58,
            cw: i % 2 === 0,
          };
        });
        return (
          <g>
            {pts.map((p, idx) => (
              <line
                key={idx}
                x1="120"
                y1="90"
                x2={p.x}
                y2={p.y}
                className="stroke-[#0F2537] dark:stroke-slate-300"
                strokeWidth="3"
                strokeLinecap="round"
              />
            ))}
            <circle cx="120" cy="90" r="17" className="fill-[#0F2537] dark:fill-slate-200" />
            {pts.map((p) => rotorDisc(p.x, p.y, 14, p.cw))}
          </g>
        );
      }
      case 'fixed-wing':
        return (
          <g>
            {/* Wings */}
            <polygon
              points="120,66 212,96 206,108 120,96 34,108 28,96"
              className="fill-[#0F2537]/15 dark:fill-slate-200/15 stroke-[#0F2537] dark:stroke-slate-200"
              strokeWidth="2"
            />
            {/* Tailplane */}
            <polygon
              points="120,136 154,148 152,154 120,147 88,154 86,148"
              className="fill-[#0F2537]/15 dark:fill-slate-200/15 stroke-[#0F2537] dark:stroke-slate-200"
              strokeWidth="1.8"
            />
            {/* Fuselage */}
            <path
              d="M120 32 C128 48 128 118 124 156 L116 156 C112 118 112 48 120 32 Z"
              className="fill-[#0F2537] dark:fill-slate-200"
            />
            {/* Forward tractor prop */}
            <line x1="100" y1="30" x2="140" y2="30" className="stroke-amber-600 dark:stroke-amber-400" strokeWidth="3" strokeLinecap="round" />
            <circle cx="120" cy="30" r="3" className="fill-amber-600 dark:fill-amber-400" />
          </g>
        );
      case 'hybrid-vtol':
      default:
        return (
          <g>
            {/* Fixed wing */}
            <polygon
              points="120,66 212,92 208,104 120,94 32,104 28,92"
              className="fill-[#0F2537]/15 dark:fill-slate-200/15 stroke-[#0F2537] dark:stroke-slate-200"
              strokeWidth="2"
            />
            {/* Twin VTOL booms */}
            <line x1="74" y1="52" x2="74" y2="132" className="stroke-[#0F2537] dark:stroke-slate-300" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="166" y1="52" x2="166" y2="132" className="stroke-[#0F2537] dark:stroke-slate-300" strokeWidth="3.5" strokeLinecap="round" />
            {/* Tail bridge */}
            <line x1="74" y1="142" x2="166" y2="142" className="stroke-[#0F2537] dark:stroke-slate-300" strokeWidth="3" strokeLinecap="round" />
            {/* Fuselage */}
            <path
              d="M120 38 C127 52 127 110 123 142 L117 142 C113 110 113 52 120 38 Z"
              className="fill-[#0F2537] dark:fill-slate-200"
            />
            {/* 4 lift rotors */}
            {rotorDisc(74, 52, 16, true)}
            {rotorDisc(166, 52, 16, false)}
            {rotorDisc(74, 132, 16, false)}
            {rotorDisc(166, 132, 16, true)}
          </g>
        );
    }
  };

  return (
    <div className="relative w-full h-52 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0D1B2A] flex items-center justify-center overflow-hidden">
      <svg
        viewBox="0 0 240 180"
        className="w-full h-full max-w-[280px]"
        role="img"
        aria-label={`Top-down schematic diagram of a ${typeId} airframe`}
      >
        {/* Subtle aerospace calibration grid */}
        <defs>
          <pattern id={`grid-${typeId}`} width="20" height="20" patternUnits="userSpaceOnUse">
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              className="stroke-slate-200/80 dark:stroke-slate-800/80"
              strokeWidth="0.6"
            />
          </pattern>
        </defs>
        <rect width="240" height="180" fill={`url(#grid-${typeId})`} />
        {/* Heading nose arrow */}
        <text
          x="120"
          y="16"
          textAnchor="middle"
          className="fill-slate-400 dark:fill-slate-500 font-mono"
          fontSize="8"
        >
          FWD ▲
        </text>
        {renderAirframe()}
      </svg>
    </div>
  );
}

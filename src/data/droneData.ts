export type PageId = 'home' | 'inventory' | 'classification' | 'safety';

export type FleetFilter = 'all' | 'operational' | 'micro' | 'kits';

export interface FleetSpec {
  label: string;
  value: string;
}

export interface AssemblyStage {
  id: string;
  step: string;
  title: string;
  detail: string;
}

export interface FleetItem {
  id: string;
  filterKey: Exclude<FleetFilter, 'all'>;
  name: string;
  quantity: number;
  statusLabel: string;
  statusTone: 'operational' | 'testing' | 'assembly';
  dgcaCategory: string;
  airframeType: string;
  summary: string;
  imageUrl: string;
  imageAlt: string;
  roles: string[];
  specs: FleetSpec[];
  hasAssemblyTracker?: boolean;
}

export const HERO_IMAGE = '/src/assets/images/hero_uav_flight_1795188949094.jpg';

export const FLEET_SUMMARY_STATS = [
  {
    id: 'total',
    label: 'Total School Fleet',
    value: '12',
    unit: 'UAV Units',
    note: 'Across 3 operational tiers',
    filterTarget: 'all' as FleetFilter,
  },
  {
    id: 'namo',
    label: 'Namo Drones',
    value: '08',
    unit: 'Active Units',
    note: 'Agricultural & precision mapping',
    filterTarget: 'operational' as FleetFilter,
  },
  {
    id: 'micro',
    label: 'Assembled Micro',
    value: '02',
    unit: 'Flight-Ready',
    note: 'Indoor aerodynamics & sensor tests',
    filterTarget: 'micro' as FleetFilter,
  },
  {
    id: 'kits',
    label: 'Unassembled Kits',
    value: '02',
    unit: 'Lab Builds',
    note: 'Active student engineering bench',
    filterTarget: 'kits' as FleetFilter,
  },
];

export const ASSEMBLY_STAGES: AssemblyStage[] = [
  {
    id: 'frame',
    step: '01',
    title: 'Frame',
    detail: 'Carbon-fiber center plates, 4 arms, vibration dampers, and landing skids torqued with M3 hardware.',
  },
  {
    id: 'motors-escs',
    step: '02',
    title: 'Motors & ESCs',
    detail: 'Mount 4 brushless motors (CW/CCW pairs), solder 30A ESCs to power distribution pads, verify spin direction.',
  },
  {
    id: 'flight-controller',
    step: '03',
    title: 'Flight Controller',
    detail: 'Install FC stack aligned to forward heading arrow, wire RC receiver, telemetry module, and battery voltage lead.',
  },
  {
    id: 'propellers',
    step: '04',
    title: 'Propellers',
    detail: 'Balance and install matched CW/CCW propellers strictly after bench testing motors without blades.',
  },
  {
    id: 'calibration',
    step: '05',
    title: 'Calibration',
    detail: 'Complete accelerometer, compass, ESC throttle range, failsafe RTH, and PID hover tuning in ground station.',
  },
];

export const SCHOOL_FLEET: FleetItem[] = [
  {
    id: 'namo-drones',
    filterKey: 'operational',
    name: 'Namo Drones',
    quantity: 8,
    statusLabel: 'Active · Operational',
    statusTone: 'operational',
    dgcaCategory: 'Small Category (2 kg – 25 kg)',
    airframeType: 'Agricultural / Multi-Rotor Hexacopter',
    summary:
      'Heavy-duty field platforms deployed for agricultural spraying demonstrations, autonomous waypoint mapping, structured pilot training, and precision payload handling on campus grounds.',
    imageUrl: '/src/assets/images/fleet_namo_drone_1795188939151.jpg',
    imageAlt: 'APS Mhow Namo Drone agricultural hexacopter resting on a hangar floor',
    roles: [
      'Agricultural spray pattern & precision dispersal demonstrations',
      'Autonomous GPS waypoint planning and terrain mapping exercises',
      'Supervised outdoor flight training and payload balance drills',
    ],
    specs: [
      { label: 'Fleet Quantity', value: '08 Units (APS-NM-01 to 08)' },
      { label: 'DGCA Weight Class', value: 'Small (18.5 kg – 24.5 kg MTOW)' },
      { label: 'Airframe Configuration', value: 'Foldable Carbon-Fiber Hexacopter' },
      { label: 'Payload Capacity', value: 'Up to 10 L Modular Tank / Gimbal' },
      { label: 'Flight Endurance', value: '18 – 22 min (Loaded) / 30 min (Dry)' },
      { label: 'Navigation & Safety', value: 'Dual GNSS, Radar Altimeter, Auto-RTH' },
      { label: 'Power System', value: '6S / 12S Smart LiPo Aviation Pack' },
      { label: 'Operating Mode', value: 'Outdoor VLOS · Campus Ground' },
    ],
  },
  {
    id: 'micro-drones',
    filterKey: 'micro',
    name: 'Assembled Micro Drones',
    quantity: 2,
    statusLabel: 'Flight-Ready · Indoor & Testing',
    statusTone: 'testing',
    dgcaCategory: 'Micro Category (250 g – 2 kg)',
    airframeType: 'Guarded Micro Quadcopter (4 Rotors)',
    summary:
      'Agile, propeller-guarded quadcopters engineered for indoor auditorium flight drills, ultrasonic and optical-flow sensor experimentation, and foundational beginner pilot training.',
    imageUrl: '/src/assets/images/fleet_micro_drone_1795188939292.jpg',
    imageAlt: 'Compact assembled micro quadcopter with propeller guards and ultrasonic sensor on an electronics bench',
    roles: [
      'Safe indoor hover, pitch/roll orientation, and obstacle-course flight training',
      'Microcontroller telemetry, IMU stabilization, and ultrasonic rangefinder testing',
      'First-solo simulator-to-real-airframe transition for new club cadets',
    ],
    specs: [
      { label: 'Fleet Quantity', value: '02 Units (APS-MC-01 & 02)' },
      { label: 'DGCA Weight Class', value: 'Micro (~380 g All-Up Weight)' },
      { label: 'Airframe Configuration', value: 'Ducted / Guarded X-Quadcopter' },
      { label: 'Onboard Sensors', value: '6-Axis IMU, Barometer, Ultrasonic Sonar' },
      { label: 'Flight Endurance', value: '12 – 15 min per 3S LiPo Pack' },
      { label: 'Controller Firmware', value: 'Open-Source Flight Stack (PID Tunable)' },
      { label: 'Cruising Speed', value: '15 – 28 km/h (Indoor Angle Mode)' },
      { label: 'Operating Mode', value: 'Indoor Lab / Calm Outdoor VLOS' },
    ],
  },
  {
    id: 'unassembled-kits',
    filterKey: 'kits',
    name: 'Unassembled Drone Kits',
    quantity: 2,
    statusLabel: 'Under Assembly · Lab Build',
    statusTone: 'assembly',
    dgcaCategory: 'Micro Category (Target ~1.15 kg AUW)',
    airframeType: 'Modular 450mm DIY Quadcopter Kit',
    summary:
      'Hands-on aerospace laboratory kits assigned to student engineering teams for complete ground-up mechanical fabrication, ESC soldering, flight-controller flashing, and hover calibration.',
    imageUrl: '/src/assets/images/fleet_unassembled_kit_1795188902073.jpg',
    imageAlt: 'Flat-lay view of unassembled quadcopter kit parts including carbon arms, motors, ESCs, flight controller, and propellers',
    roles: [
      'End-to-end airframe structural assembly and thrust-to-weight calculation',
      'Power distribution wiring, ESC protocol binding, and sensor bus diagnostics',
      'Pre-maiden bench validation and ground control station calibration',
    ],
    specs: [
      { label: 'Fleet Quantity', value: '02 Build Kits (Kit Alpha & Kit Beta)' },
      { label: 'Target Weight Class', value: 'Micro (~1,150 g Completed AUW)' },
      { label: 'Wheelbase', value: '450 mm Carbon-Composite X-Frame' },
      { label: 'Propulsion', value: '4x 920KV Brushless Motors + 30A ESCs' },
      { label: 'Propellers', value: '10 × 4.5 inch Matched CW/CCW Pairs' },
      { label: 'Flight Controller', value: 'STM32 32-Bit FC with GPS/Compass Port' },
      { label: 'Battery Spec', value: '4S 14.8V 3300 mAh 35C LiPo' },
      { label: 'Lab Objective', value: 'Complete 5-Stage Assembly & Maiden Hover' },
    ],
    hasAssemblyTracker: true,
  },
];

export interface WeightClassItem {
  id: string;
  name: string;
  rangeLabel: string;
  minGrams: number;
  maxGrams: number | null;
  uinRequired: string;
  pilotCert: string;
  typicalUse: string;
  schoolFleetMatch?: string;
}

export const DGCA_WEIGHT_CLASSES: WeightClassItem[] = [
  {
    id: 'nano',
    name: 'Nano',
    rangeLabel: '≤ 250 g',
    minGrams: 0,
    maxGrams: 250,
    uinRequired: 'Exempt for non-commercial micro-indoor/green zone hobby use',
    pilotCert: 'Not required (standard safety rules apply)',
    typicalUse: 'Palm-sized indoor trainers, classroom STEM demonstrators, micro-camera toys.',
  },
  {
    id: 'micro',
    name: 'Micro',
    rangeLabel: '> 250 g to 2 kg',
    minGrams: 251,
    maxGrams: 2000,
    uinRequired: 'Required (DigitalSky UIN)',
    pilotCert: 'Exempt for non-commercial; RPC required for commercial',
    typicalUse: 'Indoor/outdoor STEM quadcopters, DIY lab builds, light aerial photography.',
    schoolFleetMatch: 'APS Mhow: 2x Assembled Micro Drones & 2x Unassembled Kits',
  },
  {
    id: 'small',
    name: 'Small',
    rangeLabel: '> 2 kg to 25 kg',
    minGrams: 2001,
    maxGrams: 25000,
    uinRequired: 'Mandatory (DigitalSky UIN + Type Certificate)',
    pilotCert: 'DGCA Remote Pilot Certificate (RPC) Mandatory',
    typicalUse: 'Agricultural spraying (Namo Drones), photogrammetry mapping, industrial inspection.',
    schoolFleetMatch: 'APS Mhow: 8x Namo Drones (Agricultural & Mapping Fleet)',
  },
  {
    id: 'medium',
    name: 'Medium',
    rangeLabel: '> 25 kg to 150 kg',
    minGrams: 25001,
    maxGrams: 150000,
    uinRequired: 'Mandatory + Airworthiness Clearance',
    pilotCert: 'Specialized RPC + Airspace Flight Plan',
    typicalUse: 'Heavy logistics cargo delivery, long-endurance border surveillance, tactical relay.',
  },
  {
    id: 'large',
    name: 'Large',
    rangeLabel: '> 150 kg',
    minGrams: 150001,
    maxGrams: null,
    uinRequired: 'Full Civil/Defense Aviation Certification',
    pilotCert: 'Licensed Unmanned Aircraft Crew / Military Control',
    typicalUse: 'MALE/HALE strategic defense UAVs, unmanned helicopters, autonomous air mobility.',
  },
];

export interface AirframeTypeItem {
  id: string;
  name: string;
  rotorsLabel: string;
  rotorCount: number | 'fixed' | 'vtol';
  stability: number; // 0-100
  liftCapacity: number; // 0-100
  efficiency: number; // 0-100
  redundancy: string;
  aerodynamicsNote: string;
  bestFor: string;
}

export const AIRFRAME_TYPES: AirframeTypeItem[] = [
  {
    id: 'bicopter',
    name: 'Bicopter',
    rotorsLabel: '2 Rotors + Tilt Servos',
    rotorCount: 2,
    stability: 48,
    liftCapacity: 35,
    efficiency: 72,
    redundancy: 'None — requires active servo vectoring for pitch & yaw',
    aerodynamicsNote:
      'Two counter-rotating propellers mounted on tilting nacelles achieve pitch and yaw through thrust vectoring rather than differential speed alone.',
    bestFor: 'Experimental aerodynamics labs and long-hover lightweight research frames.',
  },
  {
    id: 'tricopter',
    name: 'Tricopter',
    rotorsLabel: '3 Rotors (Y-Frame)',
    rotorCount: 3,
    stability: 64,
    liftCapacity: 48,
    efficiency: 68,
    redundancy: 'None — tail rotor uses a yaw tilt servo to counter torque',
    aerodynamicsNote:
      'Three arms in a Y layout leave a wide unobstructed forward camera view; a rear servo tilts the tail motor to balance residual yaw torque.',
    bestFor: 'Compact foldable FPV rigs and agile kinematic flight demonstrations.',
  },
  {
    id: 'quadcopter',
    name: 'Quadcopter',
    rotorsLabel: '4 Rotors (X / + Frame)',
    rotorCount: 4,
    stability: 82,
    liftCapacity: 62,
    efficiency: 65,
    redundancy: 'Low — loss of one motor ends controlled hover',
    aerodynamicsNote:
      'Two clockwise and two counter-clockwise rotors naturally cancel net torque. Simple, symmetric, and the gold standard for education and agile flight.',
    bestFor: 'APS Mhow Micro Drones, DIY lab kits, indoor training, and versatile photography.',
  },
  {
    id: 'hexacopter',
    name: 'Hexacopter',
    rotorsLabel: '6 Rotors',
    rotorCount: 6,
    stability: 92,
    liftCapacity: 86,
    efficiency: 58,
    redundancy: 'High — can sustain controlled emergency landing with 1 motor out',
    aerodynamicsNote:
      'Six evenly spaced motors deliver high disc area, smoother wind rejection, and motor-out fault tolerance crucial for heavy liquid or sensor payloads.',
    bestFor: 'APS Mhow Namo Drones, agricultural spraying, and precision LiDAR mapping.',
  },
  {
    id: 'octocopter',
    name: 'Octocopter',
    rotorsLabel: '8 Rotors (Flat / Coaxial X8)',
    rotorCount: 8,
    stability: 96,
    liftCapacity: 98,
    efficiency: 48,
    redundancy: 'Very High — tolerates up to 1–2 propulsion faults safely',
    aerodynamicsNote:
      'Maximum multi-rotor thrust margin and wind stability at the expense of higher current draw and larger battery requirements.',
    bestFor: 'Cinema cameras, heavy industrial delivery, and critical defense payloads.',
  },
  {
    id: 'fixed-wing',
    name: 'Fixed-Wing',
    rotorsLabel: 'Aeroplane Wing + Pusher/Tractor',
    rotorCount: 'fixed',
    stability: 78,
    liftCapacity: 70,
    efficiency: 96,
    redundancy: 'Glides safely without power; requires runway or launcher',
    aerodynamicsNote:
      'Generates lift aerodynamically via forward airflow over rigid wings instead of continuous rotor thrust, enabling 60–180+ minute endurance.',
    bestFor: 'Large-area topographic corridor mapping, border patrol, and atmospheric surveys.',
  },
  {
    id: 'hybrid-vtol',
    name: 'Hybrid VTOL',
    rotorsLabel: 'Vertical Lift Rotors + Fixed Wing',
    rotorCount: 'vtol',
    stability: 90,
    liftCapacity: 82,
    efficiency: 90,
    redundancy: 'High — vertical takeoff in tight spaces + efficient winged cruise',
    aerodynamicsNote:
      'Takes off and lands vertically like a quadcopter, then transitions to forward winged flight—combining zero-runway versatility with long range.',
    bestFor: 'Defense reconnaissance, coastal monitoring, and multi-kilometer medical/supply drops.',
  },
];

export interface SpeedTierItem {
  id: string;
  tier: string;
  speedRange: string;
  typicalRange: string;
  flightProfile: string;
  examples: string;
}

export const SPEED_RANGE_TIERS: SpeedTierItem[] = [
  {
    id: 'low-speed',
    tier: 'Low-Speed Indoor & Training UAVs',
    speedRange: '10 – 30 km/h',
    typicalRange: '50 m – 300 m (Indoor / Field)',
    flightProfile: 'High-damping angle/stabilize mode, propeller guards, optical flow or sonar hold for safe cadet handling.',
    examples: 'APS Mhow Micro Drones, STEM classroom trainers, indoor inspection cinewhoops.',
  },
  {
    id: 'medium-speed',
    tier: 'Medium-Speed Surveillance & Mapping UAVs',
    speedRange: '30 – 75 km/h',
    typicalRange: '1 km – 15 km (Data Link Dependent)',
    flightProfile: 'GPS-locked loiter, autonomous grid waypoints, wind-resistant cruise for crisp orthomosaic imagery or spraying.',
    examples: 'APS Mhow Namo Drones, photogrammetry hexacopters, tactical surveillance VTOLs.',
  },
  {
    id: 'high-speed',
    tier: 'High-Speed FPV & Racing Drones',
    speedRange: '90 – 180+ km/h',
    typicalRange: '0.5 km – 5 km (Low-Latency Digital/Analog FPV)',
    flightProfile: 'Manual Acro mode with 6:1 to 10:1 thrust-to-weight ratios, rapid pitch authority, and minimal drag frames.',
    examples: '5-inch carbon FPV racing quads, high-speed chase drones, kinetic interception research.',
  },
];

export interface SightModeItem {
  mode: string;
  fullName: string;
  legalBaseline: string;
  navigationTech: string;
  typicalDistance: string;
  safetyRequirements: string;
}

export const VLOS_VS_BVLOS: SightModeItem[] = [
  {
    mode: 'VLOS',
    fullName: 'Visual Line of Sight',
    legalBaseline: 'Standard permitted mode for school demos, training, and Green Zone flights in India.',
    navigationTech: 'Direct unaided eye contact by pilot/spotter backed by 2.4 GHz RC telemetry.',
    typicalDistance: 'Up to 400 m – 500 m horizontal; max 120 m (400 ft) AGL in Green Zones.',
    safetyRequirements: 'Visual observer for obstacle clearance, return-to-home failsafe, clear daylight weather.',
  },
  {
    mode: 'BVLOS',
    fullName: 'Beyond Visual Line of Sight',
    legalBaseline: 'Requires explicit DGCA authorization, UTM integration, and certified operational corridors.',
    navigationTech: '4G/5G cellular or SATCOM C2 links, Detect-and-Avoid (DAA) radar/ADS-B, redundant GNSS.',
    typicalDistance: '5 km to 100+ km autonomous corridor missions.',
    safetyRequirements: 'Certified BVLOS airframe, automated geofencing, emergency parachute/termination, ATC coordination.',
  },
];

export interface ApplicationDomain {
  id: string;
  title: string;
  typicalPlatform: string;
  primaryPayload: string;
  altitudeBand: string;
  description: string;
  impactMetric: string;
}

export const APPLICATION_DOMAINS: ApplicationDomain[] = [
  {
    id: 'agri-namo',
    title: 'Agricultural & Namo Drones',
    typicalPlatform: 'Small-class Hexacopter / Quadcopter (10–25 kg)',
    primaryPayload: '10 L atomizing spray nozzles, flow meters, multispectral NDVI cameras',
    altitudeBand: '2 m – 15 m AGL (Crop Canopy)',
    description:
      'Automates precision nano-urea and crop-nutrient application while assessing plant health indices—drastically reducing water consumption and chemical exposure.',
    impactMetric: 'Covers ~1 acre in 7–10 minutes with up to 90% less water use.',
  },
  {
    id: 'defense',
    title: 'Defense & Surveillance',
    typicalPlatform: 'Hybrid VTOL, Tactical Fixed-Wing & Quiet Quadcopters',
    primaryPayload: 'EO/IR thermal gimbals, encrypted digital datalinks, target tracking optics',
    altitudeBand: '100 m – 3,000 m AGL',
    description:
      'Delivers real-time perimeter reconnaissance, convoy overwatch, and high-altitude intelligence in mountainous or denied terrain without risking aircrew.',
    impactMetric: 'Persistent 1–8+ hour day/night ISR coverage.',
  },
  {
    id: 'mapping-lidar',
    title: 'Aerial Mapping & LiDAR',
    typicalPlatform: 'RTK Multi-Rotor & Fixed-Wing Survey UAVs',
    primaryPayload: 'RTK-GNSS photogrammetry cameras and laser LiDAR point-cloud scanners',
    altitudeBand: '40 m – 120 m AGL',
    description:
      'Generates centimeter-accurate 3D elevation models, campus infrastructure twins, volumetric stockpile audits, and drainage maps for civil engineering.',
    impactMetric: '2 – 5 cm horizontal survey accuracy with RTK positioning.',
  },
  {
    id: 'search-rescue',
    title: 'Search & Rescue (SAR)',
    typicalPlatform: 'Weather-Sealed Quadcopter / Hexacopter',
    primaryPayload: 'Radiometric thermal camera, high-lumen spotlight, loudspeaker, drop hook',
    altitudeBand: '30 m – 120 m AGL',
    description:
      'Rapidly scans flood zones, dense forests, and disaster rubble using heat signatures to locate survivors and drop emergency medical kits or comms relays.',
    impactMetric: 'Deploys in under 3 minutes across inaccessible terrain.',
  },
];

export interface ChecklistItem {
  id: string;
  category: 'Airframe' | 'Battery & LiPo' | 'Avionics' | 'Airspace & Weather';
  title: string;
  detail: string;
}

export const PREFLIGHT_CHECKLIST: ChecklistItem[] = [
  {
    id: 'pf-1',
    category: 'Airspace & Weather',
    title: 'Verify DigitalSky Airspace Zone & Campus Clearance',
    detail: 'Confirm the flight area is cleared (note Mhow cantonment/defense restrictions) and obtain faculty instructor sign-off.',
  },
  {
    id: 'pf-2',
    category: 'Airspace & Weather',
    title: 'Check Wind Speed, Visibility & Precipitation',
    detail: 'Ensure sustained wind is below airframe limit (< 15 km/h for Micro, < 25 km/h for Namo) with zero rain or lightning.',
  },
  {
    id: 'pf-3',
    category: 'Airspace & Weather',
    title: 'Establish Spectator Safety Perimeter',
    detail: 'Clear a minimum 15 m launch/landing buffer zone for outdoor Namo demos and designate a dedicated visual spotter.',
  },
  {
    id: 'pf-4',
    category: 'Airframe',
    title: 'Inspect Carbon Arms, Motor Mounts & Fasteners',
    detail: 'Check for hairline cracks, loose M3/M4 bolts, folding arm locking clips, and secure landing gear.',
  },
  {
    id: 'pf-5',
    category: 'Airframe',
    title: 'Verify Propeller Integrity & Rotation Match',
    detail: 'Inspect blades for chips or stress whitening; confirm CW/CCW props are tightened on their matching motor shafts.',
  },
  {
    id: 'pf-6',
    category: 'Battery & LiPo',
    title: 'Physical LiPo Inspection & Cell Balance Check',
    detail: 'Reject any swollen, punctured, or hot pack. Confirm all cells read 4.18–4.20 V balanced and straps are snug.',
  },
  {
    id: 'pf-7',
    category: 'Battery & LiPo',
    title: 'Verify Transmitter & Ground Station Charge',
    detail: 'Ensure RC transmitter battery is above 70% and backup LiPo fireproof safe bag is positioned at the flight line.',
  },
  {
    id: 'pf-8',
    category: 'Avionics',
    title: 'Power-Up Order & Telemetry Link Verification',
    detail: 'Power RC transmitter ON first (throttle at minimum), then connect UAV battery; confirm clean telemetry & failsafe.',
  },
  {
    id: 'pf-9',
    category: 'Avionics',
    title: 'Confirm GNSS Satellite Lock & Home Point',
    detail: 'For outdoor GPS flights, wait for minimum 10+ satellites, low HDOP, and audible/visual Home Point lock before arming.',
  },
  {
    id: 'pf-10',
    category: 'Avionics',
    title: 'Hover Control Check at 1.5 m AGL',
    detail: 'Perform a 10-second low hover test verifying pitch, roll, yaw response, and smooth motor acoustics before proceeding.',
  },
];

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  topic: string;
}

export const CLUB_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    topic: 'APS Mhow Fleet',
    question:
      'What is the exact composition of the 12-unit UAV fleet at the Army Public School Mhow Drone Club?',
    options: [
      '6 Namo Drones, 4 Assembled Micro Drones, and 2 Unassembled Kits',
      '8 Namo Drones, 2 Assembled Micro Drones, and 2 Unassembled Kits',
      '8 Micro Drones, 2 Namo Drones, and 2 Fixed-Wing Gliders',
      '10 Namo Drones and 2 Assembled Micro Drones',
    ],
    correctIndex: 1,
    explanation:
      'APS Mhow maintains 12 total units: 8 operational Namo Drones, 2 flight-ready Assembled Micro Drones, and 2 Unassembled Drone Kits for hands-on lab assembly.',
  },
  {
    id: 2,
    topic: 'DGCA India Classification',
    question:
      'Under DGCA India Drone Rules, which weight category covers UAVs weighing greater than 2 kg and up to 25 kg—including the school’s Namo Drones?',
    options: ['Nano Category', 'Micro Category', 'Small Category', 'Medium Category'],
    correctIndex: 2,
    explanation:
      'DGCA defines Small drones as > 2 kg up to 25 kg (where Namo agricultural drones fall), whereas Micro is > 250 g up to 2 kg.',
  },
  {
    id: 3,
    topic: 'Airframe & Aerodynamics',
    question:
      'Why are Hexacopters (6 rotors) preferred over Quadcopters (4 rotors) for heavier payload missions like agricultural spraying?',
    options: [
      'They eliminate the need for a flight controller or IMU',
      'They offer higher lift capacity and motor-out redundancy for safer emergency landing',
      'They always achieve longer flight times than Fixed-Wing aircraft',
      'They do not require counter-rotating propellers to balance yaw torque',
    ],
    correctIndex: 1,
    explanation:
      'Six rotors increase total lift margin and provide redundancy—allowing a hexacopter to maintain controlled descent if a single motor or ESC fails.',
  },
  {
    id: 4,
    topic: 'Flight Operations',
    question:
      'What is the primary operational difference between VLOS and BVLOS drone flights?',
    options: [
      'VLOS uses fixed-wing drones while BVLOS only uses quadcopters',
      'VLOS keeps the UAV within direct unaided sight of the pilot, whereas BVLOS flies beyond visual range using remote telemetry and special approvals',
      'VLOS is restricted exclusively to indoor gymnasiums',
      'BVLOS requires no DGCA authorization in Green Zones',
    ],
    correctIndex: 1,
    explanation:
      'Visual Line of Sight (VLOS) requires direct visual contact by the pilot or observer; Beyond Visual Line of Sight (BVLOS) extends past visual range and needs strict DGCA approval and Detect-and-Avoid systems.',
  },
  {
    id: 5,
    topic: 'LiPo Battery & Pre-Flight Safety',
    question:
      'What is the recommended storage voltage per cell for LiPo drone batteries when stored in the APS Mhow lab between club sessions?',
    options: [
      '4.20 V per cell (100% fully charged)',
      '3.80 V – 3.85 V per cell (Storage Charge)',
      '2.80 V per cell (Fully drained)',
      '5.00 V per cell (Over-voltage standby)',
    ],
    correctIndex: 1,
    explanation:
      'Storing LiPo packs at 3.80–3.85 V per cell inside fireproof bags prevents chemical degradation, swelling (puffing), and thermal runaway.',
  },
];

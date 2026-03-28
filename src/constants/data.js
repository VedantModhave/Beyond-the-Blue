/** All copy, crew data, Mars zones, telemetry targets, and nav sections. */

export const NAV_SECTIONS = [
  { id: 'hero', label: 'T-Minus Zero' },
  { id: 'launch', label: 'Ignition' },
  { id: 'transit', label: 'The Void' },
  { id: 'landing', label: 'Red Horizon' },
  { id: 'conclusion', label: 'A New World' },
];

export const CREW = [
  {
    name: 'Commander Elena Vasquez',
    role: 'Mission Commander',
    nationality: 'Mexico',
    flag: '🇲🇽',
    stat: '3 prior space missions, 412 days in orbit',
    detail: 'Leads all mission-critical decisions. Former jet pilot with nerves of titanium.',
  },
  {
    name: 'Dr. Amir Patel',
    role: 'Flight Surgeon & Biologist',
    nationality: 'India',
    flag: '🇮🇳',
    stat: 'Published 47 papers on zero-G medicine',
    detail: 'Keeps the crew alive and studies how Martian soil might support microbes.',
  },
  {
    name: 'Lt. Yuki Tanaka',
    role: 'Pilot & Systems Engineer',
    nationality: 'Japan',
    flag: '🇯🇵',
    stat: 'Youngest astronaut selected at age 29',
    detail: 'Flies the ship and can fix literally anything with duct tape and math.',
  },
  {
    name: 'Dr. Kwame Asante',
    role: 'Geologist & Mining Specialist',
    nationality: 'Ghana',
    flag: '🇬🇭',
    stat: 'Discovered 3 new mineral formations on Earth',
    detail: 'Will analyze Martian rock samples and scout for subsurface water ice.',
  },
];

export const MARS_ZONES = [
  {
    id: 'olympus',
    name: 'Olympus Mons',
    coords: { x: 25, y: 35 },
    icon: '🌋',
    elevation: '21,900 m (tallest volcano in the solar system)',
    fact: 'Olympus Mons is roughly the size of France. Its caldera could swallow a city, and its slopes are so gradual you wouldn\'t know you were climbing it.',
  },
  {
    id: 'valles',
    name: 'Valles Marineris',
    coords: { x: 55, y: 55 },
    icon: '🏜️',
    elevation: '-7,000 m (deepest canyon system)',
    fact: 'Stretching 4,000 km, this canyon system dwarfs the Grand Canyon 10 times over. Ancient water may have carved its earliest channels.',
  },
  {
    id: 'ares-landing',
    name: 'Ares Landing Site',
    coords: { x: 72, y: 42 },
    icon: '⊕',
    elevation: '-2,500 m (Isidis Planitia basin)',
    fact: 'Selected for its flat terrain, proximity to ancient riverbeds, and subsurface ice deposits detected by orbital radar. You are here.',
  },
];

export const DEBRIEF_FACTS = [
  {
    title: 'Distance Traveled',
    content: 'You covered 225 million kilometers through the vacuum of space — equivalent to circling Earth 5,600 times. The trajectory used a Hohmann transfer orbit, the most fuel-efficient path between two planets.',
  },
  {
    title: 'Mission Duration',
    content: 'The one-way transit lasted approximately 7 months. Including surface operations, the full mission timeline spans 26 months due to orbital alignment windows for the return journey.',
  },
  {
    title: 'Fuel Consumed',
    content: 'The ARES-1 spacecraft burned through 950,000 kg of liquid methane & oxygen propellant — produced using Sabatier reactions that could eventually use Martian CO₂ and water ice.',
  },
  {
    title: 'Radiation Exposure',
    content: 'Crew members absorbed roughly 300 millisieverts during transit — the equivalent of 1,500 chest X-rays. The ship\'s polyethylene shielding and water walls reduced the dose by 40%.',
  },
  {
    title: 'What\'s Next?',
    content: 'With the habitat established, the ARES-2 mission will bring 8 more crew and begin construction of the first permanent greenhouse on Mars, using regolith bricks and 3D-printed structures.',
  },
];

export const TELEMETRY_TARGETS = {
  altitude: 408,
  velocity: 28000,
  gForceMax: 3.2,
  fuel: 100,
};

export const TRANSIT_STOPS = [
  {
    id: 'earth-recede',
    month: null,
    title: 'Earth Receding',
    text: 'Our blue marble shrinks behind us. No turning back now.',
  },
  {
    id: 'month-1',
    month: 1,
    title: 'First Systems Check',
    text: '"All systems nominal. The silence out here is deafening — and beautiful." — Commander Vasquez, Mission Log Day 32',
  },
  {
    id: 'asteroid-belt',
    month: null,
    title: 'Crossing the Belt',
    text: 'Despite Hollywood\'s imagination, the asteroid belt is mostly empty space. We navigate with quiet confidence.',
  },
  {
    id: 'month-4',
    month: 4,
    title: 'Halfway Point',
    text: '"Looked back today. The Sun is just another star. Somewhere out there, 8 billion people are having breakfast." — Dr. Patel, Personal Log',
  },
  {
    id: 'mars-approach',
    month: null,
    title: 'Mars Approaching',
    text: 'A rust-colored jewel grows in our viewport. Seven months of void have led to this moment.',
  },
];

export const LAUNCH_NARRATIVE = [
  'T-minus 10… main engines ignite.',
  'The pad shakes. 7.5 million pounds of thrust.',
  'We clear the tower. The sky darkens.',
  'Max-Q. The ship groans under aerodynamic pressure.',
  'MECO. Main engine cutoff. Weightlessness.',
];

import { Dragon, DragonStats } from '../types/dragons';

const DRAGON_NAMES = [
  'Shadowflame',
  'Stormwing',
  'Frostbite',
  'Infernus',
  'Thunderclaw',
  'Voidscale',
  'Celestial',
  'Netherfang'
];

const generateStats = (basePower: number): DragonStats => {
  const variation = 0.2; // 20% variation
  const baseValue = basePower * (1 + (Math.random() * variation * 2 - variation));

  return {
    strength: Math.round(baseValue * (0.8 + Math.random() * 0.4)),
    defense: Math.round(baseValue * (0.8 + Math.random() * 0.4)),
    power: Math.round(baseValue * (0.8 + Math.random() * 0.4)),
    healingPower: Math.round(baseValue * (0.8 + Math.random() * 0.4)),
    skills: Math.round(baseValue * (0.8 + Math.random() * 0.4)),
    speed: Math.round(baseValue * (0.8 + Math.random() * 0.4)),
    intelligence: Math.round(baseValue * (0.8 + Math.random() * 0.4)),
    range: Math.round(baseValue * (0.8 + Math.random() * 0.4))
  };
};

export const generateOpponentDragon = (playerPower: number): Dragon => {
  const name = DRAGON_NAMES[Math.floor(Math.random() * DRAGON_NAMES.length)];
  const stats = generateStats(playerPower);

  return {
    id: `opponent-${Date.now()}`,
    name: `${name} the Challenger`,
    bio: 'A formidable opponent seeking to test their strength in battle.',
    power: 'Unknown Power',
    secretPower: 'Mystery Technique',
    stats,
    imageUrl: `https://source.unsplash.com/featured/?dragon&${Date.now()}`
  };
};
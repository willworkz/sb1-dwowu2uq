import { Dragon } from '../types/dragons';
import { NUMBER_GAME_CONFIG } from '../config/numberGameConfig';
import { generateId } from './generators';

const DRAGON_PREFIXES = [
  'Ancient', 'Mystic', 'Celestial', 'Shadow', 'Storm', 'Crystal', 
  'Infernal', 'Frost', 'Void', 'Solar', 'Lunar', 'Astral'
];

const DRAGON_SUFFIXES = [
  'Drake', 'Wyrm', 'Serpent', 'Guardian', 'Warden', 'Keeper',
  'Lord', 'King', 'Emperor', 'Sovereign', 'Champion', 'Defender'
];

const generateDragonName = (): string => {
  const prefix = DRAGON_PREFIXES[Math.floor(Math.random() * DRAGON_PREFIXES.length)];
  const suffix = DRAGON_SUFFIXES[Math.floor(Math.random() * DRAGON_SUFFIXES.length)];
  return `${prefix} ${suffix}`;
};

const generateDragonStats = (level: number) => {
  const baseValue = level * 1000;
  const variation = 0.2; // 20% variation

  const generateStat = () => {
    return Math.round(baseValue * (1 + (Math.random() * variation * 2 - variation)));
  };

  return {
    strength: generateStat(),
    defense: generateStat(),
    power: generateStat(),
    healingPower: generateStat(),
    skills: generateStat(),
    speed: generateStat(),
    intelligence: generateStat(),
    range: generateStat()
  };
};

const generateDragonBio = (name: string): string => {
  const bios = [
    `A legendary ${name} born from ancient magic, possessing immense power and wisdom.`,
    `The mighty ${name} emerged from the depths of time, carrying the legacy of the elder dragons.`,
    `Forged in the crucible of creation, ${name} commands respect from all who witness its majesty.`,
    `${name} stands as a testament to the raw power of dragonkind, feared and revered in equal measure.`
  ];
  
  return bios[Math.floor(Math.random() * bios.length)];
};

const generateSecretPower = (level: number): string => {
  const powers = [
    'Time Manipulation',
    'Reality Warping',
    'Elemental Mastery',
    'Mind Control',
    'Dimensional Travel',
    'Soul Absorption',
    'Cosmic Energy Control',
    'Ancient Magic Mastery'
  ];

  const power = powers[Math.floor(Math.random() * powers.length)];
  const multiplier = level * 2;
  
  return `${power} — Can amplify dragon abilities by ${multiplier}x for a short duration.`;
};

export const generateDragon = (level: number): Dragon => {
  const name = generateDragonName();
  const stats = generateDragonStats(level);
  
  // Determine rarity based on level
  const rarityRoll = Math.random();
  const rarity = NUMBER_GAME_CONFIG.rewards.dragonTypes.find(
    type => rarityRoll <= type.chance
  ) || NUMBER_GAME_CONFIG.rewards.dragonTypes[0];

  // Apply rarity multiplier to stats
  Object.keys(stats).forEach(key => {
    stats[key as keyof typeof stats] *= rarity.multiplier;
  });

  return {
    id: generateId(),
    name,
    bio: generateDragonBio(name),
    power: rarity.name,
    secretPower: generateSecretPower(level),
    stats,
    imageUrl: `https://source.unsplash.com/featured/?dragon,fantasy&${Date.now()}`
  };
};
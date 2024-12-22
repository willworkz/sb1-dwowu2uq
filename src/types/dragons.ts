export interface DragonStats {
  strength: number;
  defense: number;
  power: number;
  healingPower: number;
  skills: number;
  speed: number;
  intelligence: number;
  range: number;
}

export interface Dragon {
  id: string;
  name: string;
  bio: string;
  power: string;
  secretPower: string;
  stats: DragonStats;
  imageUrl: string;
}

export const INITIAL_DRAGONS: Dragon[] = [
  {
    id: 'aurorion',
    name: 'Aurorion, the Celestial Flame Dragon',
    bio: 'Born from the sun\'s core, Aurorion\'s fiery wings light up the skies. Its body shimmers with molten scales, casting an aura of intense heat wherever it flies.',
    power: 'Solar Flame',
    secretPower: 'Solar Eclipse—Can summon a destructive solar burst that incinerates everything within a 100-mile radius.',
    stats: {
      strength: 9500,
      defense: 9200,
      power: 9800,
      healingPower: 7500,
      skills: 9000,
      speed: 8500,
      intelligence: 8800,
      range: 9500
    },
    imageUrl: 'https://source.unsplash.com/featured/?dragon,fire'
  },
  {
    id: 'zephyros',
    name: 'Zephyros, the Tempest Dragon',
    bio: 'A dragon of storms, Zephyros commands the winds with a flap of its wings. It controls powerful thunderstorms and whirlwinds, making it a master of aerial combat.',
    power: 'Storm Convergence',
    secretPower: 'Skyfall—Can create a massive storm cloud that rains down lightning bolts, paralyzing enemies and blocking sight for miles.',
    stats: {
      strength: 8200,
      defense: 8800,
      power: 9000,
      healingPower: 6000,
      skills: 9500,
      speed: 10000,
      intelligence: 8700,
      range: 8900
    },
    imageUrl: 'https://source.unsplash.com/featured/?dragon,storm'
  },
  {
    id: 'grymokk',
    name: 'Grymokk, the Earthshaker Dragon',
    bio: 'A gargantuan creature born from the deepest caverns of the earth, Grymokk has the power to cause earthquakes and landslides with its mighty roar.',
    power: 'Seismic Tremor',
    secretPower: 'Earthquake Fury—Can cause massive tectonic shifts that shake the ground, making structures collapse and enemies fall into chasms.',
    stats: {
      strength: 10000,
      defense: 9800,
      power: 9500,
      healingPower: 5500,
      skills: 8500,
      speed: 6000,
      intelligence: 7500,
      range: 7000
    },
    imageUrl: 'https://source.unsplash.com/featured/?dragon,mountain'
  },
  {
    id: 'virelis',
    name: 'Virelis, the Shadowfire Dragon',
    bio: 'A mysterious dragon with obsidian black scales and flickering crimson eyes, Virelis manipulates both shadows and fire to strike from the darkness with deadly precision.',
    power: 'Shadowflame',
    secretPower: 'Dark Inferno—Can create a vortex of flame and shadow that consumes everything in its path, blinding enemies and causing extreme pain.',
    stats: {
      strength: 8700,
      defense: 8400,
      power: 9800,
      healingPower: 6900,
      skills: 9200,
      speed: 8700,
      intelligence: 9300,
      range: 8500
    },
    imageUrl: 'https://source.unsplash.com/featured/?dragon,dark'
  }
];
export const avatars = [
  'android-mask',
  'battle-mech',
  'circuitry',
  'cyber-eye',
  'cyborg-face',
  'factory-arm',
  'mars-curiousity',
  'mars-pathfinder',
  'mecha-head',
  'mecha-mask',
  'mechanical-arm',
  'megabot',
  'metal-hand',
  'metal-scales',
  'mini-submarine',
  'missle-mech',
  'mono-wheel-robot',
  'robot-antennas',
  'robot-golem',
  'robot-helmet',
  'robot-leg',
  'spider-bot',
  'techno-heart',
  'tracked-robot',
  'trap-mask',
  'vintage-robot',
  'walking-scout',
  'walking-turret'];

export function avatarsByUrl() {
  return avatars.map(avatar => avatarByName(avatar));
}

export function avatarByCyclingIndex(index: number): string {
  const maxIndex = avatars.length - 1;
  if (index > maxIndex) {
    index = index - maxIndex;
    return avatarByCyclingIndex(index);
  }
  return avatarByName(avatars[index]);
}

export function avatarByName(name: string): string {
  if (avatars.indexOf(name) === -1) {
    throw new Error('avatar not found: ' + name);
  }
  return `client/avatars/${name}.svg`;
}
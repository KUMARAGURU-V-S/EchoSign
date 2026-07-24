import { AnimationConverter } from './src/engine/AnimationConverter';
import { H } from './src/engine/SignKitAnimations/Alphabets/H';

const clip = AnimationConverter.convert('H', H);
console.log(clip.tracks.map(t => t.name));
console.log(clip.duration);

import * as THREE from 'three';
import * as words from './SignKitAnimations/words';
import * as alphabets from './SignKitAnimations/alphabets';
import { defaultPose } from './SignKitAnimations/defaultPose';

export class AnimationController {
  private avatar: THREE.Object3D | null = null;
  public animations: any[][] = [];
  public speed: number = 0.1;
  public pauseTime: number = 800;
  
  public pending: boolean = false;
  private flag: boolean = false;
  
  public onTextAdded?: (text: string) => void;
  public onFinish?: () => void;

  public characters: string[] = [];

  public init(root: THREE.Object3D) {
    this.avatar = root;
    this.animations = [];
    this.characters = [];
    this.pending = false;
    this.flag = false;
    
    // Set default pose
    defaultPose({ 
      avatar: this.avatar, 
      animations: this.animations, 
      characters: this.characters,
      pending: this.pending,
      animate: () => {} // no-op since useFrame handles updates
    });
  }

  public update(delta: number) {
    if (!this.avatar || this.animations.length === 0) {
      if (this.pending) {
        this.pending = false;
        if (this.onFinish) this.onFinish();
      }
      return;
    }
    
    if (this.animations[0].length) {
      if (!this.flag) {
        if (this.animations[0][0] === 'add-text') {
          if (this.onTextAdded) {
            this.onTextAdded(this.animations[0][1]);
          }
          this.animations.shift();
        } else {
          for (let i = 0; i < this.animations[0].length;) {
            let [boneName, action, axis, limit, sign] = this.animations[0][i];
            const bone = this.avatar.getObjectByName(boneName);
            
            if (!bone) {
              // If bone not found, skip this animation step
              this.animations[0].splice(i, 1);
              continue;
            }

            if (sign === "+" && bone[action as keyof THREE.Object3D] && (bone[action as keyof THREE.Object3D] as any)[axis] < limit) {
              (bone[action as keyof THREE.Object3D] as any)[axis] += this.speed;
              (bone[action as keyof THREE.Object3D] as any)[axis] = Math.min((bone[action as keyof THREE.Object3D] as any)[axis], limit);
              i++;
            } else if (sign === "-" && bone[action as keyof THREE.Object3D] && (bone[action as keyof THREE.Object3D] as any)[axis] > limit) {
              (bone[action as keyof THREE.Object3D] as any)[axis] -= this.speed;
              (bone[action as keyof THREE.Object3D] as any)[axis] = Math.max((bone[action as keyof THREE.Object3D] as any)[axis], limit);
              i++;
            } else {
              this.animations[0].splice(i, 1);
            }
          }
        }
      }
    } else {
      this.flag = true;
      setTimeout(() => {
        this.flag = false;
      }, this.pauseTime);
      this.animations.shift();
    }
  }

  public get isAnimating(): boolean {
    return this.animations.length > 0;
  }

  public clearQueue() {
    this.animations = [];
    this.pending = false;
    this.flag = false;
  }

  /** Play a single alphabet letter sign (for Learn page) */
  public playLetter(char: string) {
    const ch = char.toUpperCase();
    const ref = {
      animations: this.animations,
      avatar: this.avatar,
      characters: this.characters,
      pending: this.pending,
      animate: () => {},
    };
    if ((alphabets as any)[ch]) {
      (alphabets as any)[ch](ref);
      if (!this.pending) this.pending = true;
    }
  }

  /** Play a single word sign (for Learn page) */
  public playWord(word: string) {
    const w = word.toUpperCase();
    const ref = {
      animations: this.animations,
      avatar: this.avatar,
      characters: this.characters,
      pending: this.pending,
      animate: () => {},
    };
    if ((words as any)[w]) {
      (words as any)[w](ref);
      if (!this.pending) this.pending = true;
    }
  }

  public playSequence(glosses: string[]) {
    console.log('[AnimationController] Queueing sequence:', glosses);
    
    // We pass `this` so the animation arrays are pushed to `this.animations`
    const ref = { 
      animations: this.animations, 
      avatar: this.avatar,
      characters: this.characters,
      pending: this.pending,
      animate: () => {} 
    };
    
    for (let word of glosses) {
      word = word.toUpperCase();
      if ((words as any)[word]) {
        this.animations.push(['add-text', word + ' ']);
        (words as any)[word](ref);
      } else {
        for (const [index, ch] of word.split('').entries()) {
          if (index === word.length - 1) {
            this.animations.push(['add-text', ch + ' ']);
          } else {
            this.animations.push(['add-text', ch]);
          }
          if ((alphabets as any)[ch]) {
            (alphabets as any)[ch](ref);
          }
        }
      }
    }
    
    if (!this.pending) {
      this.pending = true;
    }
  }
}

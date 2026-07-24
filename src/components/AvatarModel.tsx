import { useEffect, useState, useRef } from 'react';
import type * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib';
import { AnimationController } from '../engine/AnimationController';
import { useFrame } from '@react-three/fiber';

interface AvatarModelProps {
  source: string;
  onLoaded?: (controller: AnimationController) => void;
  onError?: (message: string) => void;
}

export default function AvatarModel({ source, onLoaded, onError }: AvatarModelProps) {
  const [scene, setScene] = useState<THREE.Object3D | null>(null);
  const controllerRef = useRef<AnimationController | null>(null);

  const onLoadedRef = useRef(onLoaded);
  const onErrorRef = useRef(onError);

  useEffect(() => {
    onLoadedRef.current = onLoaded;
    onErrorRef.current = onError;
  }, [onLoaded, onError]);

  useEffect(() => {
    let cancelled = false;
    setScene(null);
    controllerRef.current = null;

    const loader = new GLTFLoader();
    loader.load(
      source,
      (gltf) => {
        if (cancelled) return;
        const root = gltf.scene ?? gltf.scenes?.[0];
        if (!root) {
          onErrorRef.current?.('Avatar file loaded but contained no scene.');
          return;
        }
        
        // Initialize AnimationController
        const animController = new AnimationController();
        animController.init(root);
        controllerRef.current = animController;
        
        setScene(root);
        onLoadedRef.current?.(animController);
      },
      undefined,
      (err) => {
        if (cancelled) return;
        onErrorRef.current?.(`Failed to load avatar: ${err.message}`);
      }
    );

    return () => {
      cancelled = true;
    };
  }, [source]);

  useFrame((_, delta) => {
    if (controllerRef.current) {
      controllerRef.current.update(delta);
    }
  });

  if (!scene) return null;
  return <primitive object={scene} />;
}

import { useEffect, useState } from 'react';
import type * as THREE from 'three';
import { loadAsync } from 'expo-three';

interface AvatarModelProps {
  source: string;
  onLoaded?: () => void;
  onError?: (message: string) => void;
}

export default function AvatarModel({ source, onLoaded, onError }: AvatarModelProps) {
  const [scene, setScene] = useState<THREE.Object3D | null>(null);

  useEffect(() => {
    let cancelled = false;
    setScene(null);

    loadAsync(source)
      .then((gltf: { scene?: THREE.Object3D; scenes?: THREE.Object3D[] }) => {
        if (cancelled) return;
        const root = gltf.scene ?? gltf.scenes?.[0];
        if (!root) {
          onError?.('Avatar file loaded but contained no scene.');
          return;
        }
        setScene(root);
        onLoaded?.();
      })
      .catch((err: Error) => {
        if (cancelled) return;
        onError?.(`Failed to load avatar: ${err.message}`);
      });

    return () => {
      cancelled = true;
    };
  }, [source, onLoaded, onError]);

  if (!scene) return null;
  return <primitive object={scene} />;
}

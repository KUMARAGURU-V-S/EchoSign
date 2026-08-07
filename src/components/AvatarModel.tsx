import { useEffect, useState, useRef } from 'react';
import type * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib';
import * as FileSystem from 'expo-file-system/legacy';
import { Asset } from 'expo-asset';
import { decode } from 'base64-arraybuffer';
import { AnimationController } from '../engine/AnimationController';
import { useFrame } from '@react-three/fiber';
import { Platform } from 'react-native';
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

    async function loadModel() {
      try {
        console.log(`[AvatarModel] Starting load for source:`, source);
        let gltf: any;

        if (Platform.OS === 'web') {
          // On web, use GLTFLoader directly
          const loader = new GLTFLoader();
          gltf = await new Promise((resolve, reject) => {
            loader.load(source as string, resolve, undefined, reject);
          });
        } else {
          // On native, resolve the asset and read it as base64
          let uri = source as string;
          if (typeof source === 'number') {
            const asset = Asset.fromModule(source);
            await asset.downloadAsync();
            uri = asset.localUri || asset.uri;
          }

          const base64 = await FileSystem.readAsStringAsync(uri, {
            encoding: FileSystem.EncodingType.Base64,
          });
          const arrayBuffer = decode(base64);

          const loader = new GLTFLoader();
          gltf = await new Promise((resolve, reject) => {
            loader.parse(arrayBuffer, '', resolve, reject);
          });
        }
        
        console.log(`[AvatarModel] Load completed. Result:`, Object.keys(gltf || {}));
        if (cancelled) return;
        const root = gltf.scene ?? gltf.scenes?.[0] ?? gltf;
        if (!root) {
          console.warn(`[AvatarModel] No root scene found`);
          onErrorRef.current?.('Avatar file loaded but contained no scene.');
          return;
        }
        
        console.log(`[AvatarModel] Model loaded successfully. Children count:`, root.children?.length);
        
        // Initialize AnimationController
        const animController = new AnimationController();
        animController.init(root);
        controllerRef.current = animController;
        
        setScene(root);
        onLoadedRef.current?.(animController);
      } catch (err: any) {
        console.error(`[AvatarModel] Error loading model:`, err);
        if (cancelled) return;
        onErrorRef.current?.(`Failed to load avatar: ${err.message}`);
      }
    }

    loadModel();

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

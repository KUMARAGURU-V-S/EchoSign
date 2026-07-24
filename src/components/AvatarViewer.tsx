import { useRef, useState } from 'react';
import { View, StyleSheet, PanResponder, ActivityIndicator, Text } from 'react-native';
import { Canvas, useFrame } from '@react-three/fiber';
import type { Group } from 'three';
import AvatarModel from './AvatarModel';
import { AnimationController } from '../engine/AnimationController';

interface AvatarViewerProps {
  avatarUrl?: string;
  onControllerReady?: (controller: AnimationController) => void;
}

/** Reads a rotation ref every frame so drag-to-orbit doesn't trigger React re-renders. */
function OrbitRig({ rotationRef, children }: { rotationRef: React.MutableRefObject<number>; children: React.ReactNode }) {
  const group = useRef<Group>(null);
  useFrame(() => {
    if (group.current) {
      group.current.rotation.y = rotationRef.current;
    }
  });
  return <group ref={group}>{children}</group>;
}

export default function AvatarViewer({ avatarUrl, onControllerReady }: AvatarViewerProps) {
  const rotationRef = useRef(0);
  const dragStartRotation = useRef(0);
  const [loading, setLoading] = useState(!!avatarUrl);
  const [error, setError] = useState<string | null>(null);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        dragStartRotation.current = rotationRef.current;
      },
      onPanResponderMove: (_evt, gesture) => {
        rotationRef.current = dragStartRotation.current + gesture.dx * 0.01;
      },
    })
  ).current;

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <Canvas
        camera={{ position: [0, 1.4, 2.2], fov: 45 }}
        onCreated={(state) => {
          state.gl.setClearColor('#1b1e24');
          state.camera.lookAt(0, 1.2, 0); // Look at the chest/head area
        }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[2, 4, 2]} intensity={1.2} />
        <directionalLight position={[-2, 1, -2]} intensity={0.4} />
        {avatarUrl ? (
          <OrbitRig rotationRef={rotationRef}>
            <AvatarModel
              source={avatarUrl}
              onLoaded={(controller) => {
                setLoading(false);
                onControllerReady?.(controller);
              }}
              onError={(message) => {
                setLoading(false);
                setError(message);
              }}
            />
          </OrbitRig>
        ) : null}
      </Canvas>

      {!avatarUrl && (
        <View style={styles.overlay} pointerEvents="none">
          <Text style={styles.overlayText}>
            No avatar configured. Set DEFAULT_AVATAR_URL in src/config/avatar.ts — see README.
          </Text>
        </View>
      )}
      {loading && avatarUrl && (
        <View style={styles.overlay} pointerEvents="none">
          <ActivityIndicator color="#fff" />
        </View>
      )}
      {error && (
        <View style={styles.overlay} pointerEvents="none">
          <Text style={styles.overlayText}>{error}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  overlayText: {
    color: '#e4e6eb',
    fontSize: 14,
    textAlign: 'center',
  },
});

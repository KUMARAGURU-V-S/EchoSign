# EchoSign

Real-time speech → Indian Sign Language (ISL), performed by an animated 3D avatar
(hand/arm gestures + facial expression). React Native (Expo) + `@react-three/fiber`.

This is an early-stage build. See `docs/` and the project plan for the full architecture
and roadmap. **Current milestone: Milestone 1 — render a static 3D avatar.** No speech
recognition or sign animation yet; those come in later milestones.

## Setup

```bash
npm install
```

### 1. Configure an avatar

This app renders a [Ready Player Me](https://readyplayer.me) avatar. RPM avatars are free,
rigged with finger bones and ARKit-style facial blendshapes — exactly what later milestones
need to animate hand-shapes and expressions.

1. Go to https://readyplayer.me, create a **Full Body** avatar (not half-body — hands and
   legs are required).
2. Copy the `.glb` URL it gives you. Append `?morphTargets=ARKit,Oculus%20Visemes` to the
   URL so facial blendshapes are included in the export.
3. Paste the URL into `src/config/avatar.ts`:
   ```ts
   export const DEFAULT_AVATAR_URL = 'https://models.readyplayer.me/<your-avatar-id>.glb?morphTargets=ARKit,Oculus%20Visemes';
   ```

Without this, the app runs but shows a "No avatar configured" message instead of a 3D model.

### 2. Run (dev client required)

`@react-three/fiber` + `expo-gl` need native modules that **Expo Go does not include**, so
this app must run through a custom dev client build:

```bash
npx expo prebuild        # generates ios/ and android/ native projects
npx expo run:android     # or: npx expo run:ios (macOS only)
```

After the first native build, subsequent iteration can use `npx expo start --dev-client`.

## Project structure

```
app/                   # expo-router screens
src/components/        # AvatarViewer (R3F canvas + orbit drag), AvatarModel (GLTF loader)
src/config/avatar.ts   # avatar URL configuration
```

`src/engine/` (speech recognition, gloss mapping, sign dictionary, pose animation) lands in
later milestones — see the project plan for the full pipeline design.

## Notes on this milestone

- The avatar loads via `expo-three`'s `loadAsync`, which wraps three.js's `GLTFLoader` and
  resolves both remote URLs and bundled assets — chosen over `@react-three/drei`'s `useGLTF`
  because its Suspense-based loading assumes DOM `fetch` semantics that don't always transfer
  cleanly to React Native.
- Drag left/right on the avatar to orbit it (a hand-rolled `PanResponder`, not a full
  `OrbitControls` port, since that component isn't reliably RN-compatible).
- `metro.config.js` registers `.glb`/`.gltf`/`.bin` as asset extensions — required for bundling
  a local avatar file, though the default setup expects a remote URL.

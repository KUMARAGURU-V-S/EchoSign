// ISL: NAME
// Right H-hand (index + middle extended together horizontally),
// taps down on left H-hand twice — spelling/identifying gesture.

export const NAME = (ref) => {

    let animations = []

    // LEFT arm at waist-chest level, palm down
    animations.push(["mixamorigLeftArm", "rotation", "x", -Math.PI / 8, "-"]);
    animations.push(["mixamorigLeftArm", "rotation", "z", -Math.PI / 3, "-"]);
    animations.push(["mixamorigLeftForeArm", "rotation", "x", Math.PI / 5, "+"]);
    // LEFT H-hand: index + middle extended, rest curled
    animations.push(["mixamorigLeftHandRing1", "rotation", "z", -Math.PI / 2, "-"]);
    animations.push(["mixamorigLeftHandRing2", "rotation", "z", -Math.PI / 2, "-"]);
    animations.push(["mixamorigLeftHandPinky1", "rotation", "z", -Math.PI / 2, "-"]);
    animations.push(["mixamorigLeftHandPinky2", "rotation", "z", -Math.PI / 2, "-"]);

    // RIGHT arm mirrored, above left
    animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI / 6, "-"]);
    animations.push(["mixamorigRightArm", "rotation", "z", Math.PI / 3, "+"]);
    animations.push(["mixamorigRightForeArm", "rotation", "x", Math.PI / 5, "+"]);
    // RIGHT H-hand
    animations.push(["mixamorigRightHandRing1", "rotation", "z", Math.PI / 2, "+"]);
    animations.push(["mixamorigRightHandRing2", "rotation", "z", Math.PI / 2, "+"]);
    animations.push(["mixamorigRightHandPinky1", "rotation", "z", Math.PI / 2, "+"]);
    animations.push(["mixamorigRightHandPinky2", "rotation", "z", Math.PI / 2, "+"]);

    ref.animations.push(animations);

    // Tap 1 — right taps down on left
    animations = []
    animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI / 4, "-"]);
    ref.animations.push(animations);

    // Lift
    animations = []
    animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI / 6, "+"]);
    ref.animations.push(animations);

    // Tap 2
    animations = []
    animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI / 4, "-"]);
    ref.animations.push(animations);

    // Return to default
    animations = []
    animations.push(["mixamorigLeftArm", "rotation", "x", 0, "+"]);
    animations.push(["mixamorigLeftArm", "rotation", "z", -Math.PI / 3, "+"]);
    animations.push(["mixamorigLeftForeArm", "rotation", "x", 0, "-"]);
    animations.push(["mixamorigLeftHandRing1", "rotation", "z", 0, "+"]);
    animations.push(["mixamorigLeftHandRing2", "rotation", "z", 0, "+"]);
    animations.push(["mixamorigLeftHandPinky1", "rotation", "z", 0, "+"]);
    animations.push(["mixamorigLeftHandPinky2", "rotation", "z", 0, "+"]);
    animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);
    animations.push(["mixamorigRightArm", "rotation", "z", Math.PI / 3, "-"]);
    animations.push(["mixamorigRightForeArm", "rotation", "x", 0, "-"]);
    animations.push(["mixamorigRightHandRing1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandRing2", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandPinky1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandPinky2", "rotation", "z", 0, "-"]);
    ref.animations.push(animations);

    if (ref.pending === false) {
        ref.pending = true;
        ref.animate();
    }
}

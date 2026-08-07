// ISL: HELP
// Right fist (A-handshape) placed on top of left flat open palm,
// then both hands lifted upward together — the left "helping" the right rise.
// Ref: ISLRTC / lifeprint.com — HELP sign (near-universal across ISL and ASL).

export const HELP = (ref) => {

    let animations = []

    // Position LEFT arm — open palm facing up at waist level
    animations.push(["mixamorigLeftArm", "rotation", "x", -Math.PI / 8, "-"]);
    animations.push(["mixamorigLeftArm", "rotation", "z", -Math.PI / 3, "-"]);
    animations.push(["mixamorigLeftForeArm", "rotation", "x", Math.PI / 4, "+"]);

    // LEFT hand flat open — palm up
    animations.push(["mixamorigLeftHand", "rotation", "x", -Math.PI / 5, "-"]);

    // Position RIGHT arm — fist shape resting above left hand
    animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI / 8, "-"]);
    animations.push(["mixamorigRightArm", "rotation", "z", Math.PI / 3, "+"]);
    animations.push(["mixamorigRightForeArm", "rotation", "x", Math.PI / 4, "+"]);

    // RIGHT hand fist — curl all fingers
    animations.push(["mixamorigRightHandIndex1", "rotation", "z", Math.PI / 2, "+"]);
    animations.push(["mixamorigRightHandIndex2", "rotation", "z", Math.PI / 2, "+"]);
    animations.push(["mixamorigRightHandMiddle1", "rotation", "z", Math.PI / 2, "+"]);
    animations.push(["mixamorigRightHandMiddle2", "rotation", "z", Math.PI / 2, "+"]);
    animations.push(["mixamorigRightHandRing1", "rotation", "z", Math.PI / 2, "+"]);
    animations.push(["mixamorigRightHandRing2", "rotation", "z", Math.PI / 2, "+"]);
    animations.push(["mixamorigRightHandPinky1", "rotation", "z", Math.PI / 2, "+"]);
    animations.push(["mixamorigRightHandPinky2", "rotation", "z", Math.PI / 2, "+"]);

    ref.animations.push(animations);

    // Lift both arms upward together
    animations = []
    animations.push(["mixamorigLeftArm", "rotation", "x", -Math.PI / 3.5, "-"]);
    animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI / 3.5, "-"]);
    ref.animations.push(animations);

    // Return to default
    animations = []
    animations.push(["mixamorigLeftArm", "rotation", "x", 0, "+"]);
    animations.push(["mixamorigLeftArm", "rotation", "z", -Math.PI / 3, "+"]);
    animations.push(["mixamorigLeftForeArm", "rotation", "x", 0, "-"]);
    animations.push(["mixamorigLeftHand", "rotation", "x", 0, "+"]);

    animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);
    animations.push(["mixamorigRightArm", "rotation", "z", Math.PI / 3, "-"]);
    animations.push(["mixamorigRightForeArm", "rotation", "x", 0, "-"]);
    animations.push(["mixamorigRightHandIndex1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandIndex2", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandMiddle1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandMiddle2", "rotation", "z", 0, "-"]);
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

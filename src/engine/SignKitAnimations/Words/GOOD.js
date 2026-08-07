// ISL: GOOD
// Open right hand (B-handshape) starts at chin, then moves forward and slightly down.
// The gesture represents something positive coming from the mouth/face outward.

export const GOOD = (ref) => {

    let animations = []

    // Raise right arm to face/chin level
    animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI / 4, "-"]);
    animations.push(["mixamorigRightArm", "rotation", "z", Math.PI / 5, "+"]);
    animations.push(["mixamorigRightForeArm", "rotation", "x", Math.PI / 3, "+"]);

    // Open flat hand — B shape
    animations.push(["mixamorigRightHandIndex1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandMiddle1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandRing1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandPinky1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHand", "rotation", "y", -Math.PI / 8, "-"]);

    ref.animations.push(animations);

    // Move hand forward (away from face) and slightly down
    animations = []
    animations.push(["mixamorigRightForeArm", "rotation", "x", Math.PI / 6, "-"]);
    animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI / 6, "+"]);
    ref.animations.push(animations);

    // Return to default
    animations = []
    animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);
    animations.push(["mixamorigRightArm", "rotation", "z", Math.PI / 3, "-"]);
    animations.push(["mixamorigRightForeArm", "rotation", "x", 0, "-"]);
    animations.push(["mixamorigRightHand", "rotation", "y", 0, "+"]);
    ref.animations.push(animations);

    if (ref.pending === false) {
        ref.pending = true;
        ref.animate();
    }
}

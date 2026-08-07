// ISL: FATHER
// Right open hand (5-handshape), thumb touches the forehead — paternal (upper face) side.
// Ref: ISLRTC family signs — forehead area = paternal.

export const FATHER = (ref) => {

    let animations = []

    // Raise right arm high to forehead level
    animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI / 2, "-"]);
    animations.push(["mixamorigRightArm", "rotation", "z", Math.PI / 5, "+"]);
    animations.push(["mixamorigRightForeArm", "rotation", "x", Math.PI / 5, "+"]);

    // Open 5-hand — all fingers spread
    animations.push(["mixamorigRightHandIndex1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandMiddle1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandRing1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandPinky1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandThumb1", "rotation", "x", 0, "-"]);

    // Tilt hand so thumb points toward forehead
    animations.push(["mixamorigRightHand", "rotation", "y", Math.PI / 4, "+"]);

    ref.animations.push(animations);

    // Tap forehead — move arm slightly in
    animations = []
    animations.push(["mixamorigRightForeArm", "rotation", "x", Math.PI / 3.5, "+"]);
    ref.animations.push(animations);

    // Pull back
    animations = []
    animations.push(["mixamorigRightForeArm", "rotation", "x", Math.PI / 5, "-"]);
    ref.animations.push(animations);

    // Tap again
    animations = []
    animations.push(["mixamorigRightForeArm", "rotation", "x", Math.PI / 3.5, "+"]);
    ref.animations.push(animations);

    // Return to default
    animations = []
    animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);
    animations.push(["mixamorigRightArm", "rotation", "z", Math.PI / 3, "-"]);
    animations.push(["mixamorigRightForeArm", "rotation", "x", 0, "-"]);
    animations.push(["mixamorigRightHand", "rotation", "y", 0, "-"]);
    ref.animations.push(animations);

    if (ref.pending === false) {
        ref.pending = true;
        ref.animate();
    }
}

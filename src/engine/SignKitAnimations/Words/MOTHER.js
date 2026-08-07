// ISL: MOTHER
// Right open hand (5-handshape), thumb touches the chin — maternal (lower face) side.
// Ref: ISLRTC family signs — chin area = maternal.

export const MOTHER = (ref) => {

    let animations = []

    // Raise right arm to face/chin level
    animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI / 4, "-"]);
    animations.push(["mixamorigRightArm", "rotation", "z", Math.PI / 4, "+"]);
    animations.push(["mixamorigRightForeArm", "rotation", "x", Math.PI / 4, "+"]);

    // Open 5-hand — all fingers spread
    animations.push(["mixamorigRightHandIndex1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandMiddle1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandRing1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandPinky1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandThumb1", "rotation", "x", 0, "-"]);

    // Tilt hand so thumb points toward chin
    animations.push(["mixamorigRightHand", "rotation", "y", Math.PI / 4, "+"]);

    ref.animations.push(animations);

    // Tap thumb to chin (move arm slightly in)
    animations = []
    animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI / 3, "-"]);
    ref.animations.push(animations);

    // Pull back slightly
    animations = []
    animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI / 4, "+"]);
    ref.animations.push(animations);

    // Tap again
    animations = []
    animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI / 3, "-"]);
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

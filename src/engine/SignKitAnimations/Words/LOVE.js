// ISL: LOVE
// Both arms crossed at chest with fists closed — self-hug gesture.

export const LOVE = (ref) => {

    let animations = []

    // LEFT arm — cross to right side of chest
    animations.push(["mixamorigLeftArm", "rotation", "x", -Math.PI / 6, "-"]);
    animations.push(["mixamorigLeftArm", "rotation", "z", -Math.PI / 8, "-"]);
    animations.push(["mixamorigLeftForeArm", "rotation", "x", Math.PI / 4, "+"]);
    animations.push(["mixamorigLeftForeArm", "rotation", "z", Math.PI / 5, "+"]);
    animations.push(["mixamorigLeftHandIndex1", "rotation", "z", -Math.PI / 2, "-"]);
    animations.push(["mixamorigLeftHandIndex2", "rotation", "z", -Math.PI / 2, "-"]);
    animations.push(["mixamorigLeftHandMiddle1", "rotation", "z", -Math.PI / 2, "-"]);
    animations.push(["mixamorigLeftHandRing1", "rotation", "z", -Math.PI / 2, "-"]);
    animations.push(["mixamorigLeftHandPinky1", "rotation", "z", -Math.PI / 2, "-"]);

    // RIGHT arm — cross to left side of chest
    animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI / 6, "-"]);
    animations.push(["mixamorigRightArm", "rotation", "z", Math.PI / 8, "+"]);
    animations.push(["mixamorigRightForeArm", "rotation", "x", Math.PI / 4, "+"]);
    animations.push(["mixamorigRightForeArm", "rotation", "z", -Math.PI / 5, "-"]);
    animations.push(["mixamorigRightHandIndex1", "rotation", "z", Math.PI / 2, "+"]);
    animations.push(["mixamorigRightHandIndex2", "rotation", "z", Math.PI / 2, "+"]);
    animations.push(["mixamorigRightHandMiddle1", "rotation", "z", Math.PI / 2, "+"]);
    animations.push(["mixamorigRightHandRing1", "rotation", "z", Math.PI / 2, "+"]);
    animations.push(["mixamorigRightHandPinky1", "rotation", "z", Math.PI / 2, "+"]);

    ref.animations.push(animations);

    // Return to default
    animations = []
    animations.push(["mixamorigLeftArm", "rotation", "x", 0, "+"]);
    animations.push(["mixamorigLeftArm", "rotation", "z", -Math.PI / 3, "+"]);
    animations.push(["mixamorigLeftForeArm", "rotation", "x", 0, "-"]);
    animations.push(["mixamorigLeftForeArm", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigLeftHandIndex1", "rotation", "z", 0, "+"]);
    animations.push(["mixamorigLeftHandIndex2", "rotation", "z", 0, "+"]);
    animations.push(["mixamorigLeftHandMiddle1", "rotation", "z", 0, "+"]);
    animations.push(["mixamorigLeftHandRing1", "rotation", "z", 0, "+"]);
    animations.push(["mixamorigLeftHandPinky1", "rotation", "z", 0, "+"]);
    animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);
    animations.push(["mixamorigRightArm", "rotation", "z", Math.PI / 3, "-"]);
    animations.push(["mixamorigRightForeArm", "rotation", "x", 0, "-"]);
    animations.push(["mixamorigRightForeArm", "rotation", "z", 0, "+"]);
    animations.push(["mixamorigRightHandIndex1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandIndex2", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandMiddle1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandRing1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandPinky1", "rotation", "z", 0, "-"]);
    ref.animations.push(animations);

    if (ref.pending === false) {
        ref.pending = true;
        ref.animate();
    }
}

// ISL: FRIEND
// Right index finger hooks over left index finger (both pointing out),
// then they swap — right comes below, left hooks over right.
// Represents interconnected/bonded relationship.

export const FRIEND = (ref) => {

    let animations = []

    // LEFT arm — index pointing right, at chest level
    animations.push(["mixamorigLeftArm", "rotation", "x", -Math.PI / 10, "-"]);
    animations.push(["mixamorigLeftArm", "rotation", "z", -Math.PI / 4, "-"]);
    animations.push(["mixamorigLeftForeArm", "rotation", "x", Math.PI / 5, "+"]);
    animations.push(["mixamorigLeftForeArm", "rotation", "z", Math.PI / 4, "+"]);
    // Curl other fingers — only index extends
    animations.push(["mixamorigLeftHandMiddle1", "rotation", "z", -Math.PI / 2, "-"]);
    animations.push(["mixamorigLeftHandRing1", "rotation", "z", -Math.PI / 2, "-"]);
    animations.push(["mixamorigLeftHandPinky1", "rotation", "z", -Math.PI / 2, "-"]);

    // RIGHT arm — index pointing left, mirrored
    animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI / 8, "-"]);
    animations.push(["mixamorigRightArm", "rotation", "z", Math.PI / 4, "+"]);
    animations.push(["mixamorigRightForeArm", "rotation", "x", Math.PI / 5, "+"]);
    animations.push(["mixamorigRightForeArm", "rotation", "z", -Math.PI / 4, "-"]);
    animations.push(["mixamorigRightHandMiddle1", "rotation", "z", Math.PI / 2, "+"]);
    animations.push(["mixamorigRightHandRing1", "rotation", "z", Math.PI / 2, "+"]);
    animations.push(["mixamorigRightHandPinky1", "rotation", "z", Math.PI / 2, "+"]);

    ref.animations.push(animations);

    // Hook — right index hooks over left index (raise right slightly)
    animations = []
    animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI / 5, "-"]);
    ref.animations.push(animations);

    // Swap — right comes down, left hooks over (bring right down, left up)
    animations = []
    animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI / 12, "+"]);
    animations.push(["mixamorigLeftArm", "rotation", "x", -Math.PI / 5, "-"]);
    ref.animations.push(animations);

    // Return to default
    animations = []
    animations.push(["mixamorigLeftArm", "rotation", "x", 0, "+"]);
    animations.push(["mixamorigLeftArm", "rotation", "z", -Math.PI / 3, "+"]);
    animations.push(["mixamorigLeftForeArm", "rotation", "x", 0, "-"]);
    animations.push(["mixamorigLeftForeArm", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigLeftHandMiddle1", "rotation", "z", 0, "+"]);
    animations.push(["mixamorigLeftHandRing1", "rotation", "z", 0, "+"]);
    animations.push(["mixamorigLeftHandPinky1", "rotation", "z", 0, "+"]);
    animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);
    animations.push(["mixamorigRightArm", "rotation", "z", Math.PI / 3, "-"]);
    animations.push(["mixamorigRightForeArm", "rotation", "x", 0, "-"]);
    animations.push(["mixamorigRightForeArm", "rotation", "z", 0, "+"]);
    animations.push(["mixamorigRightHandMiddle1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandRing1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandPinky1", "rotation", "z", 0, "-"]);
    ref.animations.push(animations);

    if (ref.pending === false) {
        ref.pending = true;
        ref.animate();
    }
}

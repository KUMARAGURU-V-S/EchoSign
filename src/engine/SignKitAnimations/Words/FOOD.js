// ISL: FOOD
// Right hand with all fingertips pinched together (flat-O / "eating" handshape),
// brought toward the mouth twice — mimicking the act of putting food in mouth.
// Ref: ISLRTC / lifeprint.com — universal eating gesture for food/eat.

export const FOOD = (ref) => {

    let animations = []

    // Raise arm toward mouth/chin level
    animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI / 4, "-"]);
    animations.push(["mixamorigRightArm", "rotation", "z", Math.PI / 5, "+"]);
    animations.push(["mixamorigRightForeArm", "rotation", "x", Math.PI / 4, "+"]);

    // Flatten O / pinch shape — curl all fingers partially
    animations.push(["mixamorigRightHandIndex1", "rotation", "z", Math.PI / 3.5, "+"]);
    animations.push(["mixamorigRightHandIndex2", "rotation", "z", Math.PI / 3.5, "+"]);
    animations.push(["mixamorigRightHandMiddle1", "rotation", "z", Math.PI / 3.5, "+"]);
    animations.push(["mixamorigRightHandMiddle2", "rotation", "z", Math.PI / 3.5, "+"]);
    animations.push(["mixamorigRightHandRing1", "rotation", "z", Math.PI / 3.5, "+"]);
    animations.push(["mixamorigRightHandRing2", "rotation", "z", Math.PI / 3.5, "+"]);
    animations.push(["mixamorigRightHandPinky1", "rotation", "z", Math.PI / 3, "+"]);
    animations.push(["mixamorigRightHandPinky2", "rotation", "z", Math.PI / 3, "+"]);
    animations.push(["mixamorigRightHandThumb1", "rotation", "x", Math.PI / 4, "+"]);
    animations.push(["mixamorigRightHandThumb2", "rotation", "y", -Math.PI / 5, "-"]);

    // Tilt hand toward face
    animations.push(["mixamorigRightHand", "rotation", "x", Math.PI / 4, "+"]);

    ref.animations.push(animations);

    // Move toward mouth
    animations = []
    animations.push(["mixamorigRightForeArm", "rotation", "x", Math.PI / 3, "+"]);
    ref.animations.push(animations);

    // Pull back
    animations = []
    animations.push(["mixamorigRightForeArm", "rotation", "x", Math.PI / 4, "-"]);
    ref.animations.push(animations);

    // Move toward mouth again (second tap)
    animations = []
    animations.push(["mixamorigRightForeArm", "rotation", "x", Math.PI / 3, "+"]);
    ref.animations.push(animations);

    // Return to default
    animations = []
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
    animations.push(["mixamorigRightHandThumb1", "rotation", "x", 0, "-"]);
    animations.push(["mixamorigRightHandThumb2", "rotation", "y", 0, "+"]);
    animations.push(["mixamorigRightHand", "rotation", "x", 0, "-"]);
    ref.animations.push(animations);

    if (ref.pending === false) {
        ref.pending = true;
        ref.animate();
    }
}

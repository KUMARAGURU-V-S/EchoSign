// ISL: WATER
// Right hand with index, middle, and ring fingers extended (W-shape),
// touched to the chin area twice — representing drinking/water.
// Ref: ISLRTC / indiansignlanguage.org — chin tap for water concept.

export const WATER = (ref) => {

    let animations = []

    // Raise right arm up to chin/face level
    animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI / 4, "-"]);
    animations.push(["mixamorigRightArm", "rotation", "z", Math.PI / 4, "+"]);
    animations.push(["mixamorigRightForeArm", "rotation", "x", Math.PI / 5, "+"]);

    // W-shape: curl pinky and thumb, extend index + middle + ring
    animations.push(["mixamorigRightHandPinky1", "rotation", "z", Math.PI / 2, "+"]);
    animations.push(["mixamorigRightHandPinky2", "rotation", "z", Math.PI / 2, "+"]);
    animations.push(["mixamorigRightHandPinky3", "rotation", "z", Math.PI / 2, "+"]);
    animations.push(["mixamorigRightHandThumb2", "rotation", "y", -Math.PI / 3, "-"]);

    // Point fingers toward face
    animations.push(["mixamorigRightHand", "rotation", "x", Math.PI / 5, "+"]);

    ref.animations.push(animations);

    // First tap — bring hand slightly forward (toward chin)
    animations = []
    animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI / 3, "-"]);
    ref.animations.push(animations);

    // Tap back
    animations = []
    animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI / 4, "+"]);
    ref.animations.push(animations);

    // Second tap
    animations = []
    animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI / 3, "-"]);
    ref.animations.push(animations);

    // Return to default
    animations = []
    animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);
    animations.push(["mixamorigRightArm", "rotation", "z", Math.PI / 3, "-"]);
    animations.push(["mixamorigRightForeArm", "rotation", "x", 0, "-"]);
    animations.push(["mixamorigRightHandPinky1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandPinky2", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandPinky3", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandThumb2", "rotation", "y", 0, "+"]);
    animations.push(["mixamorigRightHand", "rotation", "x", 0, "-"]);
    ref.animations.push(animations);

    if (ref.pending === false) {
        ref.pending = true;
        ref.animate();
    }
}

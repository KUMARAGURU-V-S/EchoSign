// ISL: PLEASE
// Right flat hand (B-handshape) placed on chest, moves in a circular clockwise motion.
// Ref: ISLRTC / indiansignlanguage.org — please/thank you circular chest rub.

export const PLEASE = (ref) => {

    let animations = []

    // Position right hand flat on chest
    animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI / 8, "-"]);
    animations.push(["mixamorigRightArm", "rotation", "z", Math.PI / 6, "+"]);
    animations.push(["mixamorigRightForeArm", "rotation", "x", Math.PI / 3, "+"]);
    animations.push(["mixamorigRightForeArm", "rotation", "z", -Math.PI / 8, "-"]);

    // Flat open hand on chest
    animations.push(["mixamorigRightHandIndex1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandMiddle1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandRing1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandPinky1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHand", "rotation", "x", Math.PI / 8, "+"]);

    ref.animations.push(animations);

    // Circular motion step 1 — arm moves up slightly
    animations = []
    animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI / 5, "-"]);
    animations.push(["mixamorigRightForeArm", "rotation", "z", Math.PI / 8, "+"]);
    ref.animations.push(animations);

    // Step 2 — arm moves right
    animations = []
    animations.push(["mixamorigRightArm", "rotation", "z", Math.PI / 4, "+"]);
    animations.push(["mixamorigRightForeArm", "rotation", "x", Math.PI / 4, "-"]);
    ref.animations.push(animations);

    // Step 3 — arm comes back down
    animations = []
    animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI / 8, "+"]);
    animations.push(["mixamorigRightForeArm", "rotation", "z", -Math.PI / 8, "-"]);
    ref.animations.push(animations);

    // Return to default
    animations = []
    animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);
    animations.push(["mixamorigRightArm", "rotation", "z", Math.PI / 3, "-"]);
    animations.push(["mixamorigRightForeArm", "rotation", "x", 0, "-"]);
    animations.push(["mixamorigRightForeArm", "rotation", "z", 0, "+"]);
    animations.push(["mixamorigRightHand", "rotation", "x", 0, "-"]);
    ref.animations.push(animations);

    if (ref.pending === false) {
        ref.pending = true;
        ref.animate();
    }
}

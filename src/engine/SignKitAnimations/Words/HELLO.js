// ISL: HELLO
// Right flat hand raised to forehead (like a salute), then swept outward away from head.
// Ref: ISLRTC greeting signs — flat B-hand near forehead moving away.

export const HELLO = (ref) => {

    let animations = []

    // Raise right arm up toward forehead level
    animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI / 3, "-"]);
    animations.push(["mixamorigRightArm", "rotation", "z", Math.PI / 5, "+"]);

    // Bend forearm so hand reaches forehead region
    animations.push(["mixamorigRightForeArm", "rotation", "z", Math.PI / 6, "+"]);

    // Open flat hand — extend all fingers
    animations.push(["mixamorigRightHandIndex1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandMiddle1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandRing1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandPinky1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandThumb1", "rotation", "x", 0, "-"]);

    // Tilt hand so palm faces out
    animations.push(["mixamorigRightHand", "rotation", "y", -Math.PI / 6, "-"]);

    ref.animations.push(animations);

    // Sweep arm outward (wave motion) — rotate arm away from head
    animations = []
    animations.push(["mixamorigRightArm", "rotation", "z", Math.PI / 2.5, "+"]);
    animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI / 6, "+"]);
    ref.animations.push(animations);

    // Return to default
    animations = []
    animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);
    animations.push(["mixamorigRightArm", "rotation", "z", Math.PI / 3, "-"]);
    animations.push(["mixamorigRightForeArm", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHand", "rotation", "y", 0, "+"]);
    ref.animations.push(animations);

    if (ref.pending === false) {
        ref.pending = true;
        ref.animate();
    }
}

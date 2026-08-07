// ISL: SCHOOL
// Right open hand (flat B) claps down onto left open palm twice —
// representing the action of a teacher clapping for attention / school environment.

export const SCHOOL = (ref) => {

    let animations = []

    // LEFT arm out — flat open palm facing up
    animations.push(["mixamorigLeftArm", "rotation", "x", -Math.PI / 10, "-"]);
    animations.push(["mixamorigLeftArm", "rotation", "z", -Math.PI / 2.8, "-"]);
    animations.push(["mixamorigLeftForeArm", "rotation", "x", Math.PI / 5, "+"]);
    animations.push(["mixamorigLeftHand", "rotation", "x", -Math.PI / 6, "-"]);

    // RIGHT arm raised above left palm
    animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI / 5, "-"]);
    animations.push(["mixamorigRightArm", "rotation", "z", Math.PI / 3, "+"]);
    animations.push(["mixamorigRightForeArm", "rotation", "x", Math.PI / 5, "+"]);
    animations.push(["mixamorigRightHand", "rotation", "x", -Math.PI / 6, "-"]);

    ref.animations.push(animations);

    // Clap 1 — right hand down onto left
    animations = []
    animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI / 3.5, "-"]);
    ref.animations.push(animations);

    // Lift up
    animations = []
    animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI / 5, "+"]);
    ref.animations.push(animations);

    // Clap 2
    animations = []
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
    animations.push(["mixamorigRightHand", "rotation", "x", 0, "+"]);
    ref.animations.push(animations);

    if (ref.pending === false) {
        ref.pending = true;
        ref.animate();
    }
}

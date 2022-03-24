import test from "ava";
import * as MathEx from "../src/math.js";

test("clamp - no change", (t) => {
	let expected = 5;
	let clamped = MathEx.clamp(expected, 0, 10);
	t.is(clamped, expected, "No change should have been made");
});

test("clamp - clamped down", (t) => {
	let expected = 5;
	let clamped = MathEx.clamp(10, 0, 5);
	t.is(clamped, expected, "Should have been clamped down");
});

test("clamp - clamped up", (t) => {
	let expected = 5;
	let clamped = MathEx.clamp(0, 5, 10);
	t.is(clamped, expected, "Should have been clamped up");
});

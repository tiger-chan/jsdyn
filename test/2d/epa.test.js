import test from "ava";

import vec2 from "../../src/vec2.js";
import aabb from "../../src/2d/aabb.js";
import epa from "../../src/2d/epa.js";
import gjk from "../../src/2d/gjk.js";

const approxEqual = test.macro((t, /** @type {number} */i, /** @type {number} */e, /** @type {number} */epsilon = 0.00001) => {
	const r = Math.abs(e - i);
	if (r < epsilon) {
		t.pass();
		return;
	}
	t.is(e, i);
});

const approxEqualArray = test.macro((t, /** @type {number[]} */i, /** @type {number[]} */e, /** @type {number} */epsilon = 0.00001) => {
	t.is(i.length, e.length);
	for (let idx = 0; idx < i.length; ++idx) {
		const r = Math.abs(e[idx] - i[idx]);
		if (r < epsilon) {
			continue;
		}
		t.is(e[idx], i[idx]);
	}
	t.pass();
});

test("solve(box, box)", (t) => {
	{
		const box1 = aabb.create([0, 0], [1, 1]);
		const box2 = aabb.create([0.5, 0.5], [1, 1]);

		const shape1 = { verticies: aabb.vertices(box1) };
		const shape2 = { verticies: aabb.vertices(box2) };
		let cs1 = { center: box1.center, support: gjk.bindSupportPolygon(shape1), shape: shape1 };
		let cs2 = { center: box2.center, support: gjk.bindSupportPolygon(shape2), shape: shape2 };
		const gjkState = gjk.create(cs1, cs2);
		const testResult = gjk.test(gjkState);

		const state = epa.createState(gjkState);

		const result = epa.solve(state);
		t.true(vec2.equals([0, 1], result.normal));
		t.true(Math.abs(1.5 - result.depth) < 0.000001);
	}
});

test("solve(circle, circle)", (t) => {
	{
		/** @type {Physics.Circle<Physics.vec2>} */
		const c1 = { center: [0, 0], radius: 1 };
		/** @type {Physics.Circle<Physics.vec2>} */
		const c2 = { center: [1, 0], radius: 1 };

		let cs1 = { center: c1.center, support: gjk.bindSupportCircle(c1), shape: c1 };
		let cs2 = { center: c2.center, support: gjk.bindSupportCircle(c2), shape: c2 };

		const gjkState = gjk.create(cs1, cs2);
		const testResult = gjk.test(gjkState);

		const state = epa.createState(gjkState);

		const result = epa.solve(state);
		approxEqualArray.exec(t, [1, 0], result.normal);
		approxEqual.exec(t, Math.abs(result.depth), 1);
	}
});

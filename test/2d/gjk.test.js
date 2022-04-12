import test from "ava";

import gjk from "../../src/2d/gjk.js";
import aabb from "../../src/2d/aabb.js";

test("gjk.test(box, box)", (t) => {
	{
		const box1 = aabb.create([0, 0], [1, 1]);
		const box2 = aabb.create([0.5, 0.5], [1, 1]);
		let cs1 = { center: box1.center, support: gjk.bindSupportPolygon({ verticies: aabb.vertices(box1) }) };
		let cs2 = { center: box2.center, support: gjk.bindSupportPolygon({ verticies: aabb.vertices(box2) }) };
		const state = gjk.create(cs1, cs2);
		t.true(gjk.test(state));
	}

	{
		const box1 = aabb.create([0, 0], [1, 1]);
		const box2 = aabb.create([0, 2.01], [1, 1]);
		let cs1 = { center: box1.center, support: gjk.bindSupportPolygon({ verticies: aabb.vertices(box1) }) };
		let cs2 = { center: box2.center, support: gjk.bindSupportPolygon({ verticies: aabb.vertices(box2) }) };
		const state = gjk.create(cs1, cs2);
		t.false(gjk.test(state));
	}

	{
		const box1 = aabb.create([0, 0], [1, 1]);
		const box2 = aabb.create([5, 5], [5, 5]);
		let cs1 = { center: box1.center, support: gjk.bindSupportPolygon({ verticies: aabb.vertices(box1) }) };
		let cs2 = { center: box2.center, support: gjk.bindSupportPolygon({ verticies: aabb.vertices(box2) }) };
		const state = gjk.create(cs1, cs2);
		t.true(gjk.test(state));
	}

	{
		const box1 = aabb.create([0, 0], [1, 1]);
		const box2 = aabb.create([5, 5], [1, 1]);
		let cs1 = { center: box1.center, support: gjk.bindSupportPolygon({ verticies: aabb.vertices(box1) }) };
		let cs2 = { center: box2.center, support: gjk.bindSupportPolygon({ verticies: aabb.vertices(box2) }) };
		const state = gjk.create(cs1, cs2);
		t.false(gjk.test(state));
	}
});

test("gjk.test(circle, circle)", (t) => {
	{
		/** @type {Physics.Circle<Physics.vec2>} */
		const c1 = { center: [0, 0], radius: 1 };
		/** @type {Physics.Circle<Physics.vec2>} */
		const c2 = { center: [1, 0], radius: 1 };
		let cs1 = { center: c1.center, support: gjk.bindSupportCircle(c1) };
		let cs2 = { center: c2.center, support: gjk.bindSupportCircle(c2) };
		const state = gjk.create(cs1, cs2);
		t.true(gjk.test(state));
	}

	{
		/** @type {Physics.Circle<Physics.vec2>} */
		const c1 = { center: [0, 0], radius: 1 };
		/** @type {Physics.Circle<Physics.vec2>} */
		const c2 = { center: [2.01, 0], radius: 1 };
		let cs1 = { center: c1.center, support: gjk.bindSupportCircle(c1) };
		let cs2 = { center: c2.center, support: gjk.bindSupportCircle(c2) };
		const state = gjk.create(cs1, cs2);
		t.false(gjk.test(state));
	}

	{
		/** @type {Physics.Circle<Physics.vec2>} */
		const c1 = { center: [0, 0], radius: 1 };
		/** @type {Physics.Circle<Physics.vec2>} */
		const c2 = { center: [2, 0], radius: 1.1 };
		let cs1 = { center: c1.center, support: gjk.bindSupportCircle(c1) };
		let cs2 = { center: c2.center, support: gjk.bindSupportCircle(c2) };
		const state = gjk.create(cs1, cs2);
		t.true(gjk.test(state));
	}
});

test("gjk.test(box, circle)", (t) => {
	{
		/** @type {Physics.Circle<Physics.vec2>} */
		const c1 = { center: [0, 0], radius: 1 };
		const box1 = aabb.create([0.0, 0.0], [1, 1]);
		let cs1 = { center: c1.center, support: gjk.bindSupportCircle(c1) };
		let cs2 = { center: box1.center, support: gjk.bindSupportPolygon({ verticies: aabb.vertices(box1) }) };
		const state = gjk.create(cs1, cs2);
		t.true(gjk.test(state));
	}

	{
		/** @type {Physics.Circle<Physics.vec2>} */
		const c1 = { center: [2.01, 0], radius: 1 };
		const box1 = aabb.create([0.0, 0.0], [1, 1]);
		let cs1 = { center: c1.center, support: gjk.bindSupportCircle(c1) };
		let cs2 = { center: box1.center, support: gjk.bindSupportPolygon({ verticies: aabb.vertices(box1) }) };
		const state = gjk.create(cs1, cs2);
		t.false(gjk.test(state));
	}

	{
		/** @type {Physics.Circle<Physics.vec2>} */
		const c1 = { center: [2.01, 0], radius: 1.01 };
		const box1 = aabb.create([0.0, 0.0], [1, 1]);
		let cs1 = { center: c1.center, support: gjk.bindSupportCircle(c1) };
		let cs2 = { center: box1.center, support: gjk.bindSupportPolygon({ verticies: aabb.vertices(box1) }) };
		const state = gjk.create(cs1, cs2);
		t.true(gjk.test(state));
	}

	{
		/** @type {Physics.Circle<Physics.vec2>} */
		const c1 = { center: [2.0, 2.0], radius: Math.sqrt(2.0) };
		const box1 = aabb.create([0.0, 0.0], [1, 1]);
		let cs1 = { center: c1.center, support: gjk.bindSupportCircle(c1) };
		let cs2 = { center: box1.center, support: gjk.bindSupportPolygon({ verticies: aabb.vertices(box1) }) };
		const state = gjk.create(cs1, cs2);
		t.true(gjk.test(state));
	}

	{
		/** @type {Physics.Circle<Physics.vec2>} */
		const c1 = { center: [2, 2.01], radius: Math.sqrt(2.0) };
		const box1 = aabb.create([0.0, 0.0], [1, 1]);
		let cs1 = { center: c1.center, support: gjk.bindSupportCircle(c1) };
		let cs2 = { center: box1.center, support: gjk.bindSupportPolygon({ verticies: aabb.vertices(box1) }) };
		const state = gjk.create(cs1, cs2);
		t.false(gjk.test(state));
	}
});
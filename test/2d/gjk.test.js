import test from "ava";

import gjk from "../../src/2d/gjk.js";
import aabb from "../../src/2d/aabb.js";
import vec2 from "../../src/vec2.js";

const approxEqual = test.macro((t, /** @type {number} */i, /** @type {number} */e, /** @type {number} */epsilon = 0.00001) => {
	const r = Math.abs(e - i);
	if (r  < epsilon) {
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

test("gjk.distance(box, box)", (t) => {
	{
		const box1 = aabb.create([0, 0], [1, 1]);
		const box2 = aabb.create([0.5, 0.5], [1, 1]);
		let cs1 = { center: box1.center, support: gjk.bindSupportPolygon({ verticies: aabb.vertices(box1) }) };
		let cs2 = { center: box2.center, support: gjk.bindSupportPolygon({ verticies: aabb.vertices(box2) }) };
		const state = gjk.createDistnaceState(cs1, cs2);
		const result = gjk.createDistanceResult();
		t.false(gjk.distance(state, result));
	}

	{
		const box1 = aabb.create([0, 0], [1, 1]);
		const box2 = aabb.create([0, 2.01], [1, 1]);
		let cs1 = { center: box1.center, support: gjk.bindSupportPolygon({ verticies: aabb.vertices(box1) }) };
		let cs2 = { center: box2.center, support: gjk.bindSupportPolygon({ verticies: aabb.vertices(box2) }) };
		const state = gjk.createDistnaceState(cs1, cs2);
		const result = gjk.createDistanceResult();
		const distanceFound = gjk.distance(state, result);
		t.true(distanceFound);
		approxEqual.exec(t, result.distance, 0.01);
		t.deepEqual(result.normal, [0, 1]);
	}

	{
		const box1 = aabb.create([0, 0], [1, 1]);
		const box2 = aabb.create([5, 5], [5, 5]);
		let cs1 = { center: box1.center, support: gjk.bindSupportPolygon({ verticies: aabb.vertices(box1) }) };
		let cs2 = { center: box2.center, support: gjk.bindSupportPolygon({ verticies: aabb.vertices(box2) }) };
		const state = gjk.createDistnaceState(cs1, cs2);
		const result = gjk.createDistanceResult();
		t.false(gjk.distance(state, result));
	}

	{
		const box1 = aabb.create([0, 0], [1, 1]);
		const box2 = aabb.create([5, 5], [1, 1]);
		let cs1 = { center: box1.center, support: gjk.bindSupportPolygon({ verticies: aabb.vertices(box1) }) };
		let cs2 = { center: box2.center, support: gjk.bindSupportPolygon({ verticies: aabb.vertices(box2) }) };
		const state = gjk.createDistnaceState(cs1, cs2);
		const result = gjk.createDistanceResult();
		const distanceFound = gjk.distance(state, result);
		t.true(distanceFound);
		approxEqual.exec(t, result.distance, /* Math.sqrt(18)*/ 4.242640687119286);
		t.deepEqual(result.normal, [0.7071067811865475, 0.7071067811865475]);
	}
});

test("gjk.distance(polygon, polygon)", (t) => {
	function center(poly) {
		let v = vec2.create();
		for (let i = 0; i < poly.length; ++i) {
			vec2.add(v, poly[i], v);
		}
		return vec2.scale(v, 1 / poly.length);
	}

	{
		let poly1 = [
			vec2.create(4, 11),
			vec2.create(4, 5),
			vec2.create(9, 9),
		];
		let poly2 = [
			vec2.create(8, 6),
			vec2.create(15, 6),
			vec2.create(10, 2),
			vec2.create(13, 1),
		];
		
		let cs1 = { center: center(poly1), support: gjk.bindSupportPolygon({ verticies: poly1 }) };
		let cs2 = { center: center(poly2), support: gjk.bindSupportPolygon({ verticies: poly2 }) };
		const state = gjk.createDistnaceState(cs1, cs2);
		const result = gjk.createDistanceResult();
		const distanceFound = gjk.distance(state, result);
		t.true(distanceFound);
		approxEqual.exec(t, result.distance, 1.71791);
		approxEqualArray.exec(t, result.pointA, [6.92682, 7.341463]);
		approxEqualArray.exec(t, result.pointB, [8, 6]);
	}
});
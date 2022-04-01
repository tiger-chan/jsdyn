import test from "ava";
import Ray from "../../src/2d/ray.js";
import aabb from "../../src/2d/aabb.js";
import vec2 from "../../src/vec2.js";

test("create([0, 0], [1, 1])", (t) => {
	let box = aabb.create([0, 0], [1, 1]);

	t.deepEqual(box.center, [0, 0]);
	t.deepEqual(box.extents, [1, 1]);
});

test("height(A)", (t) => {
	let box = aabb.create([0, 0], [1, 1]);
	t.is(aabb.height(box), 2);
});

test("intersectPoint(A, p)", (t) => {
	let box = aabb.create([0, 0], [1, 1]);
	let p1 = vec2.create(0.0, 0.75);
	let result = aabb.intersectPoint(box, p1);
	t.not(result, null);
	t.deepEqual(result.pos, [0, 1]);
	t.deepEqual(result.delta, [0, 0.25]);
	t.deepEqual(result.normal, [0, 1]);
});

test("intersectRay(A, R)", (t) => {
	{
		let box = aabb.create([1, 1], [1, 1]);
		let ray = Ray.create([-0.5, 1], [1, 0], 10);
		let result = aabb.intersectRay(box, ray);

		t.not(result, null);
		t.deepEqual(result.pos, [0, 1]);
		t.deepEqual(result.delta, [0.5, 0]);
		t.deepEqual(result.normal, [-1, 0]);
	}

	{
		let box = aabb.create([1, 1], [1, 1]);
		let ray = Ray.create([2.5, 1], [-1, 0], 10);
		let result = aabb.intersectRay(box, ray);

		t.not(result, null);
		t.deepEqual(result.pos, [2, 1]);
		t.deepEqual(result.delta, [-0.5, 0]);
		t.deepEqual(result.normal, [1, 0]);
	}

	{
		let box = aabb.create([1, 1], [1, 1]);
		let ray = Ray.create([1, -0.5], [0, 1], 10);
		let result = aabb.intersectRay(box, ray);

		t.not(result, null);
		t.deepEqual(result.pos, [1, 0]);
		t.deepEqual(result.delta, [0, 0.5]);
		t.deepEqual(result.normal, [0, -1]);
	}

	{
		let box = aabb.create([1, 1], [1, 1]);
		let ray = Ray.create([1, 2.5], [0, -1], 10);
		let result = aabb.intersectRay(box, ray);

		t.not(result, null);
		t.deepEqual(result.pos, [1, 2]);
		t.deepEqual(result.delta, [0, -0.5]);
		t.deepEqual(result.normal, [0, 1]);
	}
	
	{
		let box = aabb.create([1, 1], [1, 1]);
		let ray = Ray.create([-0.5, -0.5], [0, 1], 10);
		let result = aabb.intersectRay(box, ray);

		t.is(result, null);
	}
});

test("max(A)", (t) => {
	let box = aabb.create([0, 0], [1, 1]);
	t.deepEqual(aabb.max(box), [1, 1]);
});

test("overlapsPoint(A, p)", (t) => {
	{
		const box = aabb.create([0, 0], [1, 1]);
		const p = vec2.create(0.75, 0.5);
		const result = aabb.overlapsPoint(box, p);
		t.true(result);
	}
	
	{
		const box = aabb.create([0, 0], [1, 1]);
		const p = vec2.create(1.1, 0.5);
		const result = aabb.overlapsPoint(box, p);
		t.false(result);
	}

});

test("overlapsRay(A, R)", (t) => {
	{
		const box = aabb.create([1, 1], [1, 1]);
		const ray = Ray.create([-0.5, 1], [1, 0], 10);
		const result = aabb.overlapsRay(box, ray);
		t.true(result);
	}

	{
		const box = aabb.create([1, 1], [1, 1]);
		const ray = Ray.create([-0.5, 3], [1, 0], 10);
		const result = aabb.overlapsRay(box, ray);
		t.false(result);
	}
});

test("size(A)", (t) => {
	let box = aabb.create([0, 0], [1, 1]);
	t.deepEqual(aabb.size(box), [2, 2]);
});

test("vertices(A)", (t) => {
	const box = aabb.create([0, 0], [1, 1]);
	const verts = aabb.vertices(box);
	const tl = [-1, -1];
	const tr = [1, -1];
	const bl = [-1, 1];
	const br = [1, 1];
	t.deepEqual(verts[0], tl);
	t.deepEqual(verts[1], tr);
	t.deepEqual(verts[2], bl);
	t.deepEqual(verts[3], br);
});

test("width(A)", (t) => {
	let box = aabb.create([0, 0], [1, 1]);
	t.is(aabb.width(box), 2);
});

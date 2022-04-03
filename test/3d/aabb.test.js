import test from "ava";
import Ray from "../../src/3d/ray.js";
import aabb from "../../src/3d/aabb.js";
import vec3 from "../../src/vec3.js";

test("create([0, 0, 0], [1, 2, 3])", (t) => {
	let box = aabb.create([0, 0, 0], [1, 2, 3]);

	t.deepEqual(box.center, [0, 0, 0]);
	t.deepEqual(box.extents, [1, 2, 3]);
});

test("depth(A)", (t) => {
	let box = aabb.create([0, 0, 0], [1, 1, 1]);
	t.is(aabb.depth(box), 2);
});

test("height(A)", (t) => {
	let box = aabb.create([0, 0, 0], [1, 1, 1]);
	t.is(aabb.height(box), 2);
});

test("intersectPoint(A, p)", (t) => {
	let box = aabb.create([0, 0, 0], [1, 1, 1]);
	let p1 = vec3.create(0.0, 0.0, 0.75);
	let result = aabb.intersectPoint(box, p1);

	t.not(result, null);
	t.deepEqual(result.pos, [0, 0, 1]);
	t.deepEqual(result.delta, [0, 0, 0.25]);
	t.deepEqual(result.normal, [0, 0, 1]);
});

test("intersectRay(A, R)", (t) => {
	{
		let box = aabb.create([1, 1, 1], [1, 1, 1]);
		let ray = Ray.create([-0.5, 1, 1], [1, 0, 0], 10);
		let result = aabb.intersectRay(box, ray);

		t.not(result, null);
		t.deepEqual(result.pos, [0, 1, 1]);
		t.deepEqual(result.delta, [0.5, 0, 0]);
		t.deepEqual(result.normal, [-1, 0, 0]);
	}

	{
		let box = aabb.create([1, 1, 1], [1, 1, 1]);
		let ray = Ray.create([2.5, 1, 1], [-1, 0, 0], 10);
		let result = aabb.intersectRay(box, ray);

		t.not(result, null);
		t.deepEqual(result.pos, [2, 1, 1]);
		t.deepEqual(result.delta, [-0.5, 0, 0]);
		t.deepEqual(result.normal, [1, 0, 0]);
	}

	{
		let box = aabb.create([1, 1, 1], [1, 1, 1]);
		let ray = Ray.create([1, -0.5, 1], [0, 1, 0], 10);
		let result = aabb.intersectRay(box, ray);

		t.not(result, null);
		t.deepEqual(result.pos, [1, 0, 1]);
		t.deepEqual(result.delta, [0, 0.5, 0]);
		t.deepEqual(result.normal, [0, -1, 0]);
	}

	{
		let box = aabb.create([1, 1, 1], [1, 1, 1]);
		let ray = Ray.create([1, 2.5, 1], [0, -1, 0], 10);
		let result = aabb.intersectRay(box, ray);

		t.not(result, null);
		t.deepEqual(result.pos, [1, 2, 1]);
		t.deepEqual(result.delta, [0, -0.5, 0]);
		t.deepEqual(result.normal, [0, 1, 0]);
	}

	{
		let box = aabb.create([1, 1, 1], [1, 1, 1]);
		let ray = Ray.create([-0.5, -0.5, -0.5], [0, 1, 0], 10);
		let result = aabb.intersectRay(box, ray);

		t.is(result, null);
	}
});

test("max(A)", (t) => {
	let box = aabb.create([0, 0, 0], [1, 1, 1]);
	t.deepEqual(aabb.max(box), [1, 1, 1]);
});

test("overlapsPoint(A, p)", (t) => {
	{
		const box = aabb.create([0, 0, 0], [1, 1, 1]);
		const p = vec3.create(0.75, 0.5, 0.5);
		const result = aabb.overlapsPoint(box, p);
		t.true(result);
	}

	{
		const box = aabb.create([0, 0, 0], [1, 1, 1]);
		const p = vec3.create(1.1, 0.5, 0.5);
		const result = aabb.overlapsPoint(box, p);
		t.false(result);
	}

});

test("overlapsRay(A, R)", (t) => {
	{
		const box = aabb.create([1, 1, 1], [1, 1, 1]);
		const ray = Ray.create([-0.5, 1, 1], [1, 0, 0], 10);
		const result = aabb.overlapsRay(box, ray);
		t.true(result);
	}

	{
		const box = aabb.create([1, 1, 1], [1, 1, 1]);
		const ray = Ray.create([-0.5, 3, -0.5], [1, 0, 0], 10);
		const result = aabb.overlapsRay(box, ray);
		t.false(result);
	}
});

test("size(A)", (t) => {
	let box = aabb.create([0, 0, 0], [1, 1, 1]);
	t.deepEqual(aabb.size(box), [2, 2, 2]);
});

test("vertices(A)", (t) => {
	const box = aabb.create([0, 0, 0], [1, 1, 1]);
	const verts = aabb.vertices(box);

	const tlf = [-1, -1, -1];
	const trf = [1, -1, -1];
	const tlb = [-1, -1, 1];
	const trb = [1, -1, 1];
	const blf = [-1, 1, -1];
	const brf = [1, 1, -1];
	const blb = [-1, 1, 1];
	const brb = [1, 1, 1];

	// Top verts
	t.deepEqual(verts[0], tlf);
	t.deepEqual(verts[1], trf);
	t.deepEqual(verts[2], tlb);
	t.deepEqual(verts[3], trb);

	// Botom verts
	t.deepEqual(verts[4], blf);
	t.deepEqual(verts[5], brf);
	t.deepEqual(verts[6], blb);
	t.deepEqual(verts[7], brb);

});

test("width(A)", (t) => {
	let box = aabb.create([0, 0, 0], [1, 1, 1]);
	t.is(aabb.width(box), 2);
});

import test from "ava";
import vec2 from "../src/vec2.js";

function roundFixed(x, fixed = 2) {
	let decimalPlaces = Math.pow(10, fixed);
	return Math.round((x + Number.EPSILON) * decimalPlaces) / decimalPlaces;
}

test("add([1, 0], [0, 1])", (t) => {
	let vec = vec2.add([1, 0], [0, 1]);
	t.deepEqual(vec, [1, 1]);
});

test("angle([1, 0], [0, 1])", (t) => {
	let angle = vec2.angle([1, 0], [0, 1]);
	t.is(Math.PI * 0.5, angle, "Vec2.x should be 90 degrees");
});

test("ceil([1, 0], [0, 1])", (t) => {
	let vec = vec2.ceil([0.6, 0.2]);
	t.deepEqual(vec, [1, 1]);
});

test("clone([1, 2])", (t) => {
	let vec = vec2.clone([1, 2]);
	t.is(2, vec.length, "Vec2 should be a length of 2");
	t.deepEqual(vec, [1, 2]);
});

test("copy([1, 0])", (t) => {
	let vec = vec2.copy([1, 2]);
	t.deepEqual(vec, [1, 2]);
});

test("create()", (t) => {
	let vec = vec2.create();
	t.is(2, vec.length, "Vec2 should be a length of 2");
	t.deepEqual(vec, [0, 0]);
});

test("create(1,2)", (t) => {
	let vec = vec2.create(1, 2);
	t.is(2, vec.length, "Vec2 should be a length of 2");
	t.deepEqual(vec, [1, 2]);
});

test("cross([1,0], [0,1])", (t) => {
	let vec = vec2.cross([1, 0], [0, 1]);
	t.is(3, vec.length, "Vec2 should be a length of 3");
	t.deepEqual([0, 0, 1], vec, "Should be equal");
});

test("distance([1,1], [0,1])", (t) => {
	let distance = vec2.distance([1, 1], [0, 1]);
	t.is(1, distance, "Should be length of 1");
});

test("divide([1,1], [2,2])", (t) => {
	let vec = vec2.divide([1, 1], [2, 2]);
	t.deepEqual([0.5, 0.5], vec);
});

test("dot([1,1], [-+2,-+2])", (t) => {
	let dot = vec2.dot([1, 1], [2, 2]);
	t.is(4, dot);

	dot = vec2.dot([1, 1], [-2, -2]);
	t.is(-4, dot);
});

test("equals([1,1], [-+1,-+1])", (t) => {
	t.true(vec2.equals([1, 1], [1, 1.001], 0.01));

	t.false(vec2.equals([1, 1], [-1, 1]));

	t.false(vec2.equals([1, 1], [1, -1]));

	t.false(vec2.equals([1, 1], [-1, -1]));
});

test("exactEquals([1,1], [-+1,-+1])", (t) => {
	t.true(vec2.exactEquals([1, 1], [1, 1]));

	t.false(vec2.exactEquals([1, 1], [-1, 1]));

	t.false(vec2.exactEquals([1, 1], [1, -1]));

	t.false(vec2.exactEquals([1, 1], [-1, -1]));
});

test("floor([1, 0], [0, 1])", (t) => {
	let vec = vec2.floor([1.6, 1.2]);
	t.deepEqual([1, 1], vec);
});

test("from(ArrayLike)", (t) => {
	let vec = vec2.from(new Float32Array([1, 2]));
	t.deepEqual([1, 2], vec);
});

test("inverse([1, 2])", (t) => {
	let vec = vec2.inverse([1, 2]);
	t.deepEqual([1, .5], vec);
});

test("length([1, 1])", (t) => {
	let len = vec2.length([1, 0]);
	t.deepEqual(1, len);

	len = vec2.length([0, 1]);
	t.deepEqual(1, len);

	len = vec2.length([1, 1]);
	t.deepEqual(Math.sqrt(2), len);
});

test("lerp([1, 1], [2, 3], x)", (t) => {
	const A = vec2.create(1, 1);
	const B = vec2.create(2, 3);

	let out = vec2.lerp(A, B, 0.0);
	t.deepEqual([1, 1], out);

	out = vec2.lerp(A, B, 1.0);
	t.deepEqual([2, 3], out);

	out = vec2.lerp(A, B, 0.5);
	t.deepEqual([1.5, 2], out);
});

test("max([1, 1], [2, 3])", (t) => {
	const A = vec2.create(1, 1);
	const B = vec2.create(2, 3);

	let out = vec2.max(A, B);
	t.deepEqual(B, out);

	out = vec2.max(B, A);
	t.deepEqual(B, out);
});

test("min([1, 1], [2, 3])", (t) => {
	const A = vec2.create(1, 1);
	const B = vec2.create(2, 3);

	let out = vec2.min(A, B);
	t.deepEqual(out, A);

	out = vec2.min(B, A);
	t.deepEqual(out, A);

	out = vec2.min([0, 1], [1, 0]);
	t.deepEqual(out, [0, 0]);
});

test("multiply(A, B)", (t) => {
	const A = vec2.create(1, 1);
	const B = vec2.create(2, 3);
	const C = vec2.create(4, 9);

	let out = vec2.multiply(A, B);
	t.deepEqual(out, B);

	out = vec2.multiply(B, B);
	t.deepEqual(out, C);
});

test("negate(A)", (t) => {
	const A = vec2.create(1, 1);

	let out = vec2.negate(A);
	t.deepEqual(out, [-1, -1]);
});

test("normalize(A)", (t) => {
	const A = vec2.create(1, 1);

	let rad = Math.PI * 45 / 180;
	const B = vec2.create(roundFixed(Math.cos(rad), 5), roundFixed(Math.sin(rad), 5));

	let out = vec2.normalize(A);
	vec2.set(out, roundFixed(out[0], 5), roundFixed(out[1], 5));
	t.deepEqual(out, B);
});

test("rotate(A, x)", (t) => {
	const A = vec2.create(1, 0);

	let out = vec2.rotate(A, vec2.zero, Math.PI);
	vec2.set(out, roundFixed(out[0], 5), roundFixed(out[1], 5));
	t.deepEqual(out, [-1, 0]);
});

test("round(A)", (t) => {
	const A = vec2.create(1.49, 1.5);

	let out = vec2.round(A);
	t.deepEqual(out, [1, 2]);
});

test("squaredLength([1, 1])", (t) => {
	let len = vec2.squaredLength([1, 0]);
	t.deepEqual(1, len);

	len = vec2.squaredLength([0, 1]);
	t.deepEqual(1, len);

	len = vec2.squaredLength([1, 1]);
	t.deepEqual(2, len);
});

test("subtract([1, 0], [0, 1])", (t) => {
	let vec = vec2.subtract([1, 0], [0, 1]);
	t.is(1, vec[0], "Vec2.x should be 1");
	t.is(-1, vec[1], "Vec2.y should be -1");
});

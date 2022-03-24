import test from "ava";
import vec3 from "../src/vec3.js";

function roundFixed(x, fixed = 2) {
	let decimalPlaces = Math.pow(10, fixed);
	return Math.round((x + Number.EPSILON) * decimalPlaces) / decimalPlaces;
}

test("add([1, 0], [0, 1])", (t) => {
	let vec = vec3.add([1, 0, 1], [0, 1, 1]);
	t.deepEqual(vec, [1, 1, 2]);
});

test("angle([1, 0], [0, 1])", (t) => {
	let angle = vec3.angle([1, 0, 0], [0, 1, 0]);
	t.is(Math.PI * 0.5, angle);
});

test("ceil([1, 0], [0, 1])", (t) => {
	let vec = vec3.ceil([0.6, 0.2, 0.49]);
	t.deepEqual(vec, [1, 1, 1]);
});

test("clone([1, 2])", (t) => {
	let vec = vec3.clone([1, 2, 3]);
	t.is(3, vec.length);
	t.deepEqual(vec, [1, 2, 3]);
});

test("copy([1, 0])", (t) => {
	let vec = vec3.copy([1, 2, 3]);
	t.deepEqual(vec, [1, 2, 3]);
});

test("create()", (t) => {
	let vec = vec3.create();
	t.is(3, vec.length);
	t.deepEqual(vec, vec3.zero);
});

test("create(1,2)", (t) => {
	let vec = vec3.create(1, 2, 3);
	t.is(3, vec.length);
	t.deepEqual(vec, [1, 2, 3]);
});

test("cross([1,0,0], [0,1,0])", (t) => {
	let vec = vec3.cross([1, 0, 0], [0, 1, 0]);
	t.is(3, vec.length);
	t.deepEqual([0, 0, 1], vec);
});

test("distance([1,1], [0,1])", (t) => {
	let distance = vec3.distance([1, 1, 0], [0, 1, 0]);
	t.is(1, distance);
});

test("divide([1,1,1], [2,2,2])", (t) => {
	let vec = vec3.divide([1, 1, 1], [2, 2, 2]);
	t.deepEqual(vec, [0.5, 0.5, 0.5]);
});

test("dot([1,1], [-+2,-+2])", (t) => {
	let dot = vec3.dot([1, 1, 1], [2, 2, 2]);
	t.is(6, dot);

	dot = vec3.dot([1, 1, 1], [-2, -2, -2]);
	t.is(-6, dot);
});

test("equals([1,1], [-+1,-+1])", (t) => {
	t.true(vec3.equals([1, 1, 1.009], [1, 1.001, 1], 0.01));

	t.false(vec3.equals([1, 1, 1], [-1, 1, 1]));

	t.false(vec3.equals([1, 1, 1], [1, -1, 1]));

	t.false(vec3.equals([1, 1, 1], [-1, -1, -1]));
});

test("exactEquals([1,1], [-+1,-+1])", (t) => {
	t.true(vec3.exactEquals([1, 1, 1], [1, 1, 1]));

	t.false(vec3.exactEquals([1, 1, 1], [-1, 1, 1]));

	t.false(vec3.exactEquals([1, 1, 1], [1, -1, 1]));

	t.false(vec3.exactEquals([1, 1, 1], [-1, -1, -1]));
});

test("floor([1, 0], [0, 1])", (t) => {
	let vec = vec3.floor([1.6, 1.2, 1.99]);
	t.deepEqual(vec, [1, 1, 1]);
});

test("from(ArrayLike)", (t) => {
	let vec = vec3.from(new Float32Array([1, 2, 3]));
	t.deepEqual(vec, [1, 2, 3]);
});

test("inverse([1, 2])", (t) => {
	let vec = vec3.inverse([1, 2, 4]);
	t.deepEqual([1, .5, 0.25], vec);
});

test("length([1, 1, 0])", (t) => {
	let len = vec3.length([1, 0, 0]);
	t.deepEqual(1, len);

	len = vec3.length([0, 0, 1]);
	t.deepEqual(1, len);

	len = vec3.length([1, 1, 1]);
	t.deepEqual(Math.sqrt(3), len);
});

test("lerp([1, 1, 1], [2, 3, 4], x)", (t) => {
	const A = vec3.create(1, 1, 1);
	const B = vec3.create(2, 3, 4);

	let out = vec3.lerp(A, B, 0.0);
	t.deepEqual(out, A);

	out = vec3.lerp(A, B, 1.0);
	t.deepEqual(out, B);

	out = vec3.lerp(A, B, 0.5);
	t.deepEqual(out, [1.5, 2, 2.5]);
});

test("max([1, 1], [2, 3])", (t) => {
	const A = vec3.create(1, 1, 1);
	const B = vec3.create(2, 3, 4);

	let out = vec3.max(A, B);
	t.deepEqual(B, out);

	out = vec3.max(B, A);
	t.deepEqual(B, out);
});

test("min([1, 1], [2, 3])", (t) => {
	const A = vec3.create(1, 1, 1);
	const B = vec3.create(2, 3, 4);

	let out = vec3.min(A, B);
	t.deepEqual(out, A);

	out = vec3.min(B, A);
	t.deepEqual(out, A);

	out = vec3.min([0, 1, 2], [1, 0, 3]);
	t.deepEqual(out, [0, 0, 2]);
});

test("multiply(A, B)", (t) => {
	const A = vec3.create(1, 1, 1);
	const B = vec3.create(2, 3, 4);
	const C = vec3.create(4, 9, 16);

	let out = vec3.multiply(A, B);
	t.deepEqual(out, B);

	out = vec3.multiply(B, B);
	t.deepEqual(out, C);
});

test("negate(A)", (t) => {
	const A = vec3.create(1, 1, 1);

	let out = vec3.negate(A);
	t.deepEqual(out, [-1, -1, -1]);
});

test("normalize(A)", (t) => {
	const A = vec3.create(1, 1, 1);
	let normalized = 1 / Math.sqrt(3);
	const B = vec3.create(roundFixed(normalized, 5), roundFixed(normalized, 5), roundFixed(normalized, 5));

	let out = vec3.normalize(A);
	vec3.set(out, roundFixed(out[0], 5), roundFixed(out[1], 5), roundFixed(out[2], 5));
	t.deepEqual(out, B);
});

test("rotateX(A, x)", (t) => {
	const A = vec3.create(1, 1, 0);

	let out = vec3.rotateX(A, vec3.zero, Math.PI);
	vec3.set(out, roundFixed(out[0], 5), roundFixed(out[1], 5), roundFixed(out[2], 5));
	t.deepEqual(out, [1, -1, 0]);
});

test("rotateY(A, x)", (t) => {
	const A = vec3.create(1, 1, 0);

	let out = vec3.rotateY(A, vec3.zero, Math.PI);
	vec3.set(out, roundFixed(out[0], 5), roundFixed(out[1], 5), roundFixed(out[2], 5));
	t.deepEqual(out, [-1, 1, 0]);
});

test("rotateZ(A, x)", (t) => {
	const A = vec3.create(1, 0, 1);

	let out = vec3.rotateZ(A, vec3.zero, Math.PI);
	vec3.set(out, roundFixed(out[0], 5), roundFixed(out[1], 5), roundFixed(out[2], 5));
	t.deepEqual(out, [-1, 0, 1]);
});

test("round(A)", (t) => {
	const A = vec3.create(1.49, 1.5, 3.01);

	let out = vec3.round(A);
	t.deepEqual(out, [1, 2, 3]);
});

test("squaredLength([1, 1])", (t) => {
	let len = vec3.squaredLength([0, 0, 1]);
	t.deepEqual(1, len);

	len = vec3.squaredLength([0, 0, 1]);
	t.deepEqual(1, len);

	len = vec3.squaredLength([1, 1, 1]);
	t.deepEqual(3, len);
});

test("subtract([1, 0], [0, 1])", (t) => {
	let vec = vec3.subtract([1, 0, -1], [0, 1, -1]);
	t.deepEqual(vec, [1, -1, 0]);
});

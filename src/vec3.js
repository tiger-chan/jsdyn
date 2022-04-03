import MathEx from "./math.js";

const X = 0;
const Y = 1;
const Z = 2;

// Vector Size
const W = 3;

/**
 * Return the absolute value of the vector in dst
 * @param {Physics.constVec3} A
 * @param {Physics.vec3} dst
 * @returns {Physics.vec3}
 */
export function abs(A, dst = create()) {
	dst[X] = Math.abs(A[X]);
	dst[Y] = Math.abs(A[Y]);
	dst[Z] = Math.abs(A[Z]);
	return dst;
}

/**
 * Create new vec3
 * @returns {Physics.vec3}
 */
export function create(x = 0, y = 0, z = 0) {
	let a = new Array(W);
	a[X] = x;
	a[Y] = y;
	a[Z] = z;
	return /** @type {Physics.vec3} */ (a);
}

/**
 * Clone provided vec3
 * @param {Physics.constVec3} A
 * @returns {Physics.vec3}
 */
export function clone(A) {
	return create(A[X], A[Y], A[Z]);
}

/**
 * Create vec3 from a array like
 * @param {ArrayLike} A
 * @returns {Physics.vec3}
 */
export function from(A) {
	if (A.length == 2) {
		return create(A[X], A[Y]);
	}
	else if (A.length == 3) {
		return create(A[X], A[Y], A[Z]);
	}
	return create();
}

/**
 * Copy `A` to `dst`
 * @param {ArrayLike} A
 * @param {Physics.vec3} [dst]
 * @returns {Physics.vec3}
 */
export function copy(A, dst = create()) {
	dst[X] = A[X];
	dst[Y] = A[Y];
	dst[Z] = A.length == 3 ? A[Z] : 0;
	return dst;
}

/**
 * Set the `x`, `y`, and `z` components of `dst`
 * @param {Physics.vec3} dst
 * @param {number} x
 * @param {number} y
 * @param {number} z
 */
export function set(dst, x, y, z) {
	dst[X] = x;
	dst[Y] = y;
	dst[Z] = z;
}

/**
 * Adds the respective components of `B` to `A` and returns them in `dst`
 * @param {Physics.constVec3} A
 * @param {Physics.constVec3} B
 * @param {Physics.vec3} dst
 * @returns {Physics.vec3}
 */
export function add(A, B, dst = create()) {
	dst[X] = A[X] + B[X];
	dst[Y] = A[Y] + B[Y];
	dst[Z] = A[Z] + B[Z];
	return dst;
}

/**
 * Subtracts the respective components of `B` from `A` and returns them in `dst`
 * @param {Physics.constVec3} A
 * @param {Physics.constVec3} B
 * @param {Physics.vec3} dst
 * @returns {Physics.vec3}
 */
export function subtract(A, B, dst = create()) {
	dst[X] = A[X] - B[X];
	dst[Y] = A[Y] - B[Y];
	dst[Z] = A[Z] - B[Z];
	return dst;
}

/**
 * Multiplies the respective components of `B` and `A` and returns them in `dst`
 * @param {Physics.constVec3} A
 * @param {Physics.constVec3} B
 * @param {Physics.vec3} dst
 * @returns {Physics.vec3}
 */
export function multiply(A, B, dst = create()) {
	dst[X] = A[X] * B[X];
	dst[Y] = A[Y] * B[Y];
	dst[Z] = A[Z] * B[Z];
	return dst;
}

/**
 * Divides the respective components of `B` and `A` and returns them in `dst`
 * @param {Physics.constVec3} A
 * @param {Physics.constVec3} B
 * @param {Physics.vec3} dst
 * @returns {Physics.vec3}
 */
export function divide(A, B, dst = create()) {
	dst[X] = A[X] / B[X];
	dst[Y] = A[Y] / B[Y];
	dst[Z] = A[Z] / B[Z];
	return dst;
}

/**
 * Returns the `ceil` of each component of `A` in `dst`
 * @param {Physics.constVec3} A
 * @param {Physics.vec3} dst
 * @returns {Physics.vec3}
 */
export function ceil(A, dst = create()) {
	dst[X] = Math.ceil(A[X]);
	dst[Y] = Math.ceil(A[Y]);
	dst[Z] = Math.ceil(A[Z]);
	return dst;
}

/**
 * Returns the `floor` of each component of `A` in `dst`
 * @param {Physics.constVec3} A
 * @param {Physics.vec3} dst
 * @returns {Physics.vec3}
 */
export function floor(A, dst = create()) {
	dst[X] = Math.floor(A[X]);
	dst[Y] = Math.floor(A[Y]);
	dst[Z] = Math.floor(A[Z]);
	return dst;
}

/**
 * Returns the min of each element in `A` and `B` returned in `dst`
 * @param {Physics.constVec3} A
 * @param {Physics.constVec3} B
 * @param {Physics.vec3} dst
 * @returns {Physics.vec3}
 */
export function min(A, B, dst = create()) {
	dst[X] = MathEx.min(A[X], B[X]);
	dst[Y] = MathEx.min(A[Y], B[Y]);
	dst[Z] = MathEx.min(A[Z], B[Z]);
	return dst;
}

/**
 * Returns the max of each element in `A` and `B` returned in `dst`
 * @param {Physics.constVec3} A
 * @param {Physics.constVec3} B
 * @param {Physics.vec3} dst
 * @returns {Physics.vec3}
 */
export function max(A, B, dst = create()) {
	dst[X] = MathEx.max(A[X], B[X]);
	dst[Y] = MathEx.max(A[Y], B[Y]);
	dst[Z] = MathEx.max(A[Z], B[Z]);
	return dst;
}

/**
 * Returns the `round` of each component of `A` in `dst`
 * @param {Physics.constVec3} A
 * @param {Physics.vec3} dst
 * @returns {Physics.vec3}
 */
export function round(A, dst = create()) {
	dst[X] = Math.round(A[X]);
	dst[Y] = Math.round(A[Y]);
	dst[Z] = Math.round(A[Z]);
	return dst;
}

/**
 * Returns `A` scaled by `s` in `dst`
 * @param {Physics.constVec3} A
 * @param {number} s
 * @param {Physics.vec3} dst
 * @returns {Physics.vec3}
 */
export function scale(A, s, dst = create()) {
	dst[X] = A[X] * s;
	dst[Y] = A[Y] * s;
	dst[Z] = A[Z] * s;
	return dst;
}

/**
 * Returns `A` + `sB` in `dst`
 * @param {Physics.constVec3} A
 * @param {Physics.constVec3} B
 * @param {number} s
 * @param {Physics.vec3} dst
 * @returns {Physics.vec3}
 */
export function scaleAndAdd(A, B, s, dst = create()) {
	dst[X] = A[X] + B[X] * s;
	dst[Y] = A[Y] + B[Y] * s;
	dst[Z] = A[Z] + B[Z] * s;
	return dst;
}

/**
 * Returns the distnace between `A` and `B`
 * @param {Physics.constVec3} A
 * @param {Physics.constVec3} B
 * @returns {number}
 */
export function distance(A, B) {
	return Math.sqrt(squaredDistance(A, B));
}

/**
 * Returns the square distnace between `A` and `B`
 * @param {Physics.constVec3} A
 * @param {Physics.constVec3} B
 * @returns {number}
 */
export function squaredDistance(A, B) {
	let dx = B[X] - A[X];
	let dy = B[Y] - A[Y];
	let dz = B[Z] - A[Z];
	return dx * dx + dy * dy + dz * dz;
}

/**
 * Returns the magnitude of `A`
 * @param {Physics.constVec3} A
 * @returns {number}
 */
export function length(A) {
	return Math.hypot(...A);
}

/**
 * Returns the square magnitude of `A`
 * @param {Physics.constVec3} A
 * @returns {number}
 */
export function squaredLength(A) {
	let [x, y, z] = A;
	return x * x + y * y + z * z;
}

/**
 * Returns the `trunc` of each component of `A` in `dst`
 * @param {Physics.constVec3} A
 * @param {Physics.vec3} dst
 * @returns {Physics.vec3}
 */
export function trunc(A, dst = create()) {
	dst[X] = Math.trunc(A[X]);
	dst[Y] = Math.trunc(A[Y]);
	dst[Z] = Math.trunc(A[Z]);
	return dst;
}

/**
 * Returns the negative of `A` in `dst`
 * @param {Physics.constVec3} A
 * @param {Physics.vec3} dst
 * @returns {Physics.vec3}
 */
export function negate(A, dst = create()) {
	dst[X] = -A[X];
	dst[Y] = -A[Y];
	dst[Z] = -A[Z];
	return dst;
}

/**
 * Returns the inverse of `A` in `dst`
 * @param {Physics.constVec3} A
 * @param {Physics.vec3} dst
 * @returns {Physics.vec3}
 */
export function inverse(A, dst = create()) {
	dst[X] = 1.0 / A[X];
	dst[Y] = 1.0 / A[Y];
	dst[Z] = 1.0 / A[Z];
	return dst;
}

/**
 * Returns `A` normalized in `dst`
 * @param {Physics.constVec3} A
 * @param {Physics.vec3} dst
 * @returns {Physics.vec3}
 */
export function normalize(A, dst = create()) {
	let len = squaredLength(A);
	if (len !== 0) {
		len = 1.0 / Math.sqrt(len);
	}
	dst[X] = A[X] * len;
	dst[Y] = A[Y] * len;
	dst[Z] = A[Z] * len;
	return dst;
}

/**
 * Returns `A` dot `B`
 * @param {Physics.constVec3} A
 * @param {Physics.constVec3} B
 * @returns {number}
 */
export function dot(A, B) {
	let r = 0;
	for (let i = 0; i < W; ++i) {
		r += A[i] * B[i];
	}
	return r;
}

/**
 * Returns `A` x `B` in `dst`
 * @param {Physics.constVec3} A
 * @param {Physics.constVec3} B
 * @param {Physics.vec3} dst
 * @returns {Physics.vec3}
 */
export function cross(A, B, dst = create()) {
	dst[X] = A[Y] * B[Z] - A[Z] * B[Y];
	dst[Y] = A[Z] * B[X] - A[X] * B[Z];
	dst[Z] = A[X] * B[Y] - A[Y] * B[X];
	return dst;
}

/**
 * Lerp between `A` to `B` where `t` is between [0, 1] returns result in `dst`
 * @param {Physics.constVec3} A
 * @param {Physics.constVec3} B
 * @param {number} t
 * @param {Physics.vec3} dst
 * @returns {Physics.vec3}
 */
export function lerp(A, B, t, dst = create()) {
	let x = A[X];
	let y = A[Y];
	let z = A[Z];
	dst[X] = x + (B[X] - x) * t;
	dst[Y] = y + (B[Y] - y) * t;
	dst[Z] = z + (B[Z] - z) * t;
	return dst;
}

/**
 * Returns a random vector with `s` scale in `dst`
 * @param {number} s
 * @param {Physics.vec3} dst
 * @return {Physics.vec3}
 */
export function random(s, dst = create()) {
	// TODO: come up with a more interesting random?
	dst[X] = Math.random() * s;
	dst[Y] = Math.random() * s;
	dst[Z] = Math.random() * s;
	return dst;
}

/**
 * Rotates `A` with origin `O` by `rad` along the X axis returned in `dst`
 * @param {Physics.constVec3} A
 * @param {Physics.constVec3} O
 * @param {number} rad
 * @param {Physics.vec3} dst
 * @return {Physics.vec3}
 */
export function rotateX(A, O, rad, dst = create()) {
	let s = Math.sin(rad);
	let c = Math.cos(rad);
	let dy = A[Y] - O[Y];
	let dz = A[Z] - O[Z];
	dst[X] = A[X];
	dst[Y] = O[Y] + dy * c - dz * s;
	dst[Z] = O[Z] + -dy * s + dz * c;
	return dst;
}

/**
 * Rotates `A` with origin `O` by `rad` along the Y axis returned in `dst`
 * @param {Physics.constVec3} A
 * @param {Physics.constVec3} O
 * @param {number} rad
 * @param {Physics.vec3} dst
 * @return {Physics.vec3}
 */
export function rotateY(A, O, rad, dst = create()) {
	let s = Math.sin(rad);
	let c = Math.cos(rad);
	let dx = A[X] - O[X];
	let dz = A[Z] - O[Z];
	dst[X] = O[X] + dx * c + dz * s;
	dst[Y] = A[Y];
	dst[Z] = O[Z] - dx * s + dz * c;
	return dst;
}

/**
 * Rotates `A` with origin `O` by `rad` along the Z axis returned in `dst`
 * @param {Physics.constVec3} A
 * @param {Physics.constVec3} O
 * @param {number} rad
 * @param {Physics.vec3} dst
 * @return {Physics.vec3}
 */
export function rotateZ(A, O, rad, dst = create()) {
	let s = Math.sin(rad);
	let c = Math.cos(rad);
	let dx = A[X] - O[X];
	let dy = A[Y] - O[Y];
	dst[X] = O[X] + dx * c - dy * s;
	dst[Y] = O[Y] + dx * s - dy * c;
	dst[Z] = A[Z];
	return dst;
}

/**
 * Returns angle between `A` and `B` in radians
 * @param {Physics.constVec3} A
 * @param {Physics.constVec3} B
 * @returns {number}
 */
export function angle(A, B) {
	let d = dot(A, B);
	let a = length(A);
	let b = length(B);
	return Math.acos(d / a * b);
}

/**
 * Zero Vector
 * @type {Physics.constVec3}
 */
export const zero = create();

/**
 * Returns the string representation of `A`
 * @param {Physics.constVec3} A
 * ```js
 * "(x, y, z)"
 * ```
 */
export function toString(A) {
	return `(${A[X]}, ${A[Y]}, ${A[Z]})`;
}

/**
 * Strict equality test of `A` === `B`
 * @param {Physics.constVec3} A
 * @param {Physics.constVec3} B
 * @returns {boolean}
 */
export function exactEquals(A, B) {
	return A[X] === B[X] && A[Y] === B[Y] && A[Z] === B[Z];
}

/**
 * Compare approximate equality of `A` and `B` given margin of error `epsilon`
 * @param {Physics.vec3} A
 * @param {Physics.vec3} B
 * @param {number} epsilon
 * @returns {boolean}
 */
export function equals(A, B, epsilon = 0.0001) {
	let dx = Math.abs(B[X] - A[X]);
	let dy = Math.abs(B[Y] - A[Y]);
	let dz = Math.abs(B[Z] - A[Z]);
	return dx < epsilon && dy < epsilon && dz < epsilon;
}

export default {
	abs
	, add
	, angle
	, ceil
	, clone
	, copy
	, create
	, cross
	, distance
	, divide
	, dot
	, equals
	, exactEquals
	, floor
	, from
	, inverse
	, length
	, lerp
	, max
	, min
	, multiply
	, negate
	, normalize
	, random
	, rotateX
	, rotateY
	, rotateZ
	, round
	, scale
	, scaleAndAdd
	, set
	, squaredDistance
	, squaredLength
	, subtract
	, toString
	, trunc
	, zero: zero
};

import vec3 from "./vec3.js";
import MathEx from "./math.js";

const X = 0;
const Y = 1;
const Z = 2;
// Vector Size
const W = 2;

const EPSILON = 0.0001;

/**
 * Return the absolute value of the vector in dst
 * @param {Physics.constVec2} A
 * @param {Physics.vec2} dst
 * @returns {Physics.vec2}
 */
export function abs(A, dst = create()) {
	dst[X] = Math.abs(A[X]);
	dst[Y] = Math.abs(A[Y]);
	return dst;
}

/**
 * Create new vec2
 * @returns {Physics.vec2}
 */
export function create(x = 0, y = 0) {
	let a = new Array(W);
	a[X] = x;
	a[Y] = y;
	return /** @type {Physics.vec2} */ (a);
}

/**
 * Clone provided vec2
 * @param {Physics.constVec2} A
 * @returns {Physics.vec2}
 */
export function clone(A) {
	return create(A[X], A[Y]);
}

/**
 * Create vec2 from a array like
 * @param {ArrayLike} A
 * @returns {Physics.vec2}
 */
export function from(A) {
	if (A.length == 2) {
		return create(A[X], A[Y]);
	}
	else if (A.length == 3) {
		return create(A[X], A[Y]);
	}
	return create();
}

/**
 * Copy `A` to `dst`
 * @param {ArrayLike} A
 * @param {Physics.vec2} [dst]
 * @returns {Physics.vec2}
 */
export function copy(A, dst = create()) {
	dst[X] = A[X];
	dst[Y] = A[Y];
	return dst;
}

/**
 * Set the `x`, `y` components of `dst`
 * @param {Physics.vec2} dst
 * @param {number} x
 * @param {number} y
 */
export function set(dst, x, y) {
	dst[X] = x;
	dst[Y] = y;
}

/**
 * Adds the respective components of `B` to `A` and returns them in `dst`
 * @param {Physics.constVec2} A
 * @param {Physics.constVec2} B
 * @param {Physics.vec2} dst
 * @returns {Physics.vec2}
 */
export function add(A, B, dst = create()) {
	dst[X] = A[X] + B[X];
	dst[Y] = A[Y] + B[Y];
	return dst;
}

/**
 * Subtracts the respective components of `B` from `A` and returns them in `dst`
 * @param {Physics.constVec2} A
 * @param {Physics.constVec2} B
 * @param {Physics.vec2} dst
 * @returns {Physics.vec2}
 */
export function subtract(A, B, dst = create()) {
	dst[X] = A[X] - B[X];
	dst[Y] = A[Y] - B[Y];
	return dst;
}

/**
 * Multiplies the respective components of `B` and `A` and returns them in `dst`
 * @param {Physics.constVec2} A
 * @param {Physics.constVec2} B
 * @param {Physics.vec2} dst
 * @returns {Physics.vec2}
 */
export function multiply(A, B, dst = create()) {
	dst[X] = A[X] * B[X];
	dst[Y] = A[Y] * B[Y];
	return dst;
}

/**
 * Divides the respective components of `B` and `A` and returns them in `dst`
 * @param {Physics.constVec2} A
 * @param {Physics.constVec2} B
 * @param {Physics.vec2} dst
 * @returns {Physics.vec2}
 */
export function divide(A, B, dst = create()) {
	dst[X] = A[X] / B[X];
	dst[Y] = A[Y] / B[Y];
	return dst;
}

/**
 * Returns the `ceil` of each component of `A` in `dst`
 * @param {Physics.constVec2} A
 * @param {Physics.vec2} dst
 * @returns {Physics.vec2}
 */
export function ceil(A, dst = create()) {
	dst[X] = Math.ceil(A[X]);
	dst[Y] = Math.ceil(A[Y]);
	return dst;
}

/**
 * Returns the `floor` of each component of `A` in `dst`
 * @param {Physics.constVec2} A
 * @param {Physics.vec2} dst
 * @returns {Physics.vec2}
 */
export function floor(A, dst = create()) {
	dst[X] = Math.floor(A[X]);
	dst[Y] = Math.floor(A[Y]);
	return dst;
}

/**
 * Returns the min of each element in `A` and `B` returned in `dst`
 * @param {Physics.constVec2} A
 * @param {Physics.constVec2} B
 * @param {Physics.vec2} dst
 * @returns {Physics.vec2}
 */
export function min(A, B, dst = create()) {
	dst[X] = Math.min(A[X], B[X]);
	dst[Y] = Math.min(A[Y], B[Y]);
	return dst;
}

/**
 * Returns the max of each element in `A` and `B` returned in `dst`
 * @param {Physics.constVec2} A
 * @param {Physics.constVec2} B
 * @param {Physics.vec2} dst
 * @returns {Physics.vec2}
 */
export function max(A, B, dst = create()) {
	dst[X] = Math.max(A[X], B[X]);
	dst[Y] = Math.max(A[Y], B[Y]);
	return dst;
}

/**
 * Returns the `round` of each component of `A` in `dst`
 * @param {Physics.constVec2} A
 * @param {Physics.vec2} dst
 * @returns {Physics.vec2}
 */
export function round(A, dst = create()) {
	dst[X] = Math.round(A[X]);
	dst[Y] = Math.round(A[Y]);
	return dst;
}

/**
 * Returns `A` scaled by `s` in `dst`
 * @param {Physics.constVec2} A
 * @param {number} s
 * @param {Physics.vec2} dst
 * @returns {Physics.vec2}
 */
export function scale(A, s, dst = create()) {
	dst[X] = A[X] * s;
	dst[Y] = A[Y] * s;
	return dst;
}

/**
 * Returns `A` + `sB` in `dst`
 * @param {Physics.constVec2} A
 * @param {Physics.constVec2} B
 * @param {number} s
 * @param {Physics.vec2} dst
 * @returns {Physics.vec2}
 */
export function scaleAndAdd(A, B, s, dst = create()) {
	dst[X] = A[X] + B[X] * s;
	dst[Y] = A[Y] + B[Y] * s;
	return dst;
}

/**
 * @param {Physics.constVec2} A
 * @param {Physics.constVec2} B
 * @param {Physics.constVec2} C
 * @param {Physics.vec3} dst
 * @returns {Physics.vec3}
 */
export function tripleProduct(A, B, C, dst = vec3.create()) {
	let a = vec3.from(A);
	let b = vec3.from(B);
	let c = vec3.from(C);
	return vec3.tripleProduct(a, b, c, dst);
}

/**
 * Returns the `trunc` of each component of `A` in `dst`
 * @param {Physics.constVec2} A
 * @param {Physics.vec2} dst
 * @returns {Physics.vec2}
 */
export function trunc(A, dst = create()) {
	dst[X] = Math.trunc(A[X]);
	dst[Y] = Math.trunc(A[Y]);
	return dst;
}

/**
 * Returns the distnace between `A` and `B`
 * @param {Physics.constVec2} A
 * @param {Physics.constVec2} B
 * @returns {number}
 */
export function distance(A, B) {
	return Math.sqrt(squaredDistance(A, B));
}

/**
 * Returns the square distnace between `A` and `B`
 * @param {Physics.constVec2} A
 * @param {Physics.constVec2} B
 * @returns {number}
 */
export function squaredDistance(A, B) {
	let dx = B[X] - A[X];
	let dy = B[Y] - A[Y];
	return dx * dx + dy * dy;
}


/**
 * Returns the magnitude of `A`
 * @param {Physics.constVec2} A
 * @returns {number}
 */
export function magnitude(A) {
	return Math.hypot(...A);
}

/**
 * Returns the square magnitude of `A`
 * @param {Physics.constVec2} A
 * @returns {number}
 */
export function magnitudeSquared(A) {
	let [x, y] = A;
	return x * x + y * y;
}

/**
 * Returns the magnitude of `A`
 * @param {Physics.constVec2} A
 * @returns {number}
 */
export function length(A) {
	return Math.hypot(...A);
}

/**
 * Returns the square magnitude of `A`
 * @param {Physics.constVec2} A
 * @returns {number}
 */
export function lengthSquared(A) {
	let [x, y] = A;
	return x * x + y * y;
}

/**
 * Returns the negative of `A` in `dst`
 * @param {Physics.constVec2} A
 * @param {Physics.vec2} dst
 * @returns {Physics.vec2}
 */
export function negate(A, dst = create()) {
	dst[X] = -A[X];
	dst[Y] = -A[Y];
	return dst;
}

/**
 * Returns the inverse of `A` in `dst`
 * @param {Physics.constVec2} A
 * @param {Physics.vec2} dst
 * @returns {Physics.vec2}
 */
export function inverse(A, dst = create()) {
	dst[X] = 1.0 / A[X];
	dst[Y] = 1.0 / A[Y];
	return dst;
}

/**
 * Returns `A` normalized in `dst`
 * @param {Physics.constVec2} A
 * @param {Physics.vec2} dst
 * @returns {number}
 */
export function normalize(A, dst = create()) {
	let len = magnitudeSquared(A);
	if (len > Number.EPSILON) {
		len = 1.0 / Math.sqrt(len);
	}
	dst[X] = A[X] * len;
	dst[Y] = A[Y] * len;
	return len;
}

/**
 * Returns `A` normalized in stored in `dst`
 * @param {Physics.constVec2} A
 * @param {Physics.vec2} dst
 * @returns {Physics.vec2}
 */
export function normalized(A, dst = create()) {
	return normalize(A, dst), dst;
}

/**
 * Returns `A` dot `B`
 * @param {Physics.constVec2} A
 * @param {Physics.constVec2} B
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
 * @param {Physics.constVec2} A
 * @param {Physics.constVec2} B
 * @returns {number}
 */
export function cross(A, B) {
	return A[X] * B[Y] - A[Y] * B[X];
}

/**
 * Lerp between `A` to `B` where `t` is between [0, 1] returns result in `dst`
 * @param {Physics.constVec2} A
 * @param {Physics.constVec2} B
 * @param {number} t
 * @param {Physics.vec2} dst
 * @returns {Physics.vec2}
 */
export function lerp(A, B, t, dst = create()) {
	let x = A[X];
	let y = A[Y];
	dst[X] = x + (B[X] - x) * t;
	dst[Y] = y + (B[Y] - y) * t;
	return dst;
}

/**
 * Returns a random vector with `s` scale in `dst`
 * @param {number} s
 * @param {Physics.vec2} dst
 * @return {Physics.vec2}
 */
export function random(s, dst = create()) {
	// TODO: come up with a more interesting random?
	dst[X] = Math.random() * s;
	dst[Y] = Math.random() * s;
	return dst;
}

/**
 * Rotates `A` with origin `O` by `rad` returned in `dst`
 * @param {Physics.constVec2} A
 * @param {Physics.constVec2} O
 * @param {number} rad
 * @param {Physics.vec2} dst
 * @return {Physics.vec2}
 */
export function rotate(A, O, rad, dst = create()) {
	let s = Math.sin(rad);
	let c = Math.cos(rad);
	let dx = A[X] - O[X];
	let dy = A[Y] - O[Y];
	dst[X] = O[X] + dx * c - dy * s;
	dst[Y] = O[Y] + dx * s - dy * c;
	return dst;
}

/**
 * Returns angle between `A` and `B` in radians
 * @param {Physics.constVec2} A
 * @param {Physics.constVec2} B
 * @returns {number}
 */
export function angle(A, B) {
	let [x1, y1] = A;
	let [x2, y2] = B;
	let n = x1 * x2 + y1 * y2;
	let d = length(A) * length(B);
	return Math.acos(MathEx.clamp(n / d, -1, 1));
}

/**
 * Zero Vector
 * @type {Physics.constVec2}
 */
export const zero = create();

/**
 * Returns the string representation of `A`
 * @param {Physics.constVec2} A
 * ```js
 * "(x, y)"
 * ```
 */
export function toString(A) {
	return `(${A[X]}, ${A[Y]})`;
}

/**
 * Strict equality test of `A` === `B`
 * @param {Physics.constVec2} A
 * @param {Physics.constVec2} B
 * @returns {boolean}
 */
export function exactEquals(A, B) {
	return A[X] === B[X] && A[Y] === B[Y];
}

/**
 * Compare approximate equality of `A` and `B` given margin of error `epsilon`
 * @param {Physics.vec2} A
 * @param {Physics.vec2} B
 * @param {number} epsilon
 * @returns {boolean}
 */
export function equals(A, B, epsilon = EPSILON) {
	let dx = Math.abs(B[X] - A[X]);
	let dy = Math.abs(B[Y] - A[Y]);
	return dx < epsilon && dy < epsilon;
}

/**
 * Check if this vector is a zero vector (approximately)
 * @param {Physics.constVec2} A
 * @param {number} epsilon
 * @returns {boolean}
 */
export function isZero(A, epsilon = EPSILON) {
	return Math.abs(A[X]) < epsilon && Math.abs(A[Y]) < epsilon;
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
	, isZero
	, length
	, lengthSquared
	, lerp
	, max
	, min
	, multiply
	, magnitude
	, magnitudeSquared
	, negate
	, normalize
	, normalized
	, random
	, rotate
	, round
	, scale
	, scaleAndAdd
	, set
	, squaredDistance
	, subtract
	, tripleProduct
	, trunc
	, toString
	, zero: zero
};

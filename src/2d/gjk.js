import math from "../math.js";
import vec2 from "../vec2.js";
import vec3 from "../vec3.js";

const EPSILON = 0.0001;
const MAX_ITERATIONS = 100;

/**
 * Find the support of a circle
 * @param {Physics.Circle<Physics.vec2>} shape
 * @param {Physics.vec2} dir
 * @param {Physics.vec2} dst
 * @returns {Physics.vec2}
 */
export function supportCircle(shape, dir, dst = vec2.create()) {
	return vec2.add(shape.center, vec2.scale(vec2.normalized(dir, dst), shape.radius, dst), dst);
}

/**
 * Create Support function bound to the shape
 * @param {Physics.Circle<Physics.vec2>} shape
 * @returns {Physics.gjk2.Support}
 */
export function bindSupportCircle(shape) {
	/** @this {Physics.Circle<Physics.vec2>} */
	function support(dir, dst = vec2.create()) {
		return supportCircle(this, dir, dst);
	}
	return support.bind(shape);
}

/**
 * Find the support of a circle
 * @param {Physics.Polygon<Physics.vec2>} shape
 * @param {Physics.vec2} dir
 * @param {Physics.vec2} dst
 * @returns {Physics.vec2}
 */
export function supportPolygon(shape, dir, dst = vec2.create()) {
	let cur = 0;
	for (let i = 0, max = Number.NEGATIVE_INFINITY; i < shape.verticies.length; ++i) {
		let dot = vec2.dot(shape.verticies[i], dir);
		if (max < dot) {
			max = dot;
			cur = i;
		}
	}
	vec2.copy(shape.verticies[cur], dst);
	return dst;
}

/**
 * Create Support function bound to the shape
 * @param {Physics.Polygon<Physics.vec2>} shape
 * @returns {Physics.gjk2.Support}
 */
export function bindSupportPolygon(shape) {
	/** @this {Physics.Polygon<Physics.vec2>} */
	function support(dir, dst = vec2.create()) {
		return supportPolygon(this, dir, dst);
	}
	return support.bind(shape);
}

/**
 * Determine if a point lies within the triangle
 * 
 * https://math.stackexchange.com/a/51328/515228
 * 
 * @param {Physics.constVec2} a Triangle point 1
 * @param {Physics.constVec2} b Triangle point 2
 * @param {Physics.constVec2} c Triangle point 3
 * @returns {boolean}
 */
function isOriginInTriangle(a, b, c) {
	// Form a triangle a -> b -> c -> a
	// Obtain the perpendicular angles for each edge
	let ab = vec2.cross(a, b);
	let bc = vec2.cross(b, c);
	let ca = vec2.cross(c, a);

	// bc * ca is implicitly tested because if they weren't the same sign
	// then the first two boolean tests would have had different signs
	return ab * bc > 0 && ca * ab > 0;
}

/**
 * @param {Physics.vec2} a
 * @param {Physics.vec2} b
 * @param {Physics.vec2} dst
 * @returns {Physics.vec2}
 */
function closestPointToOrigin(a, b, dst = vec2.create()) {
	let ab = vec2.subtract(b, a);
	let ao = vec2.negate(a);
	let abd = vec2.dot(ao, ab);
	let abs = vec2.magnitudeSquared(ab);

	if (abs <= EPSILON) {
		return vec2.copy(a, dst);
	}

	let t = abd / abs;
	t = math.clamp(t, 0, 1);
	return vec2.scaleAndAdd(a, ab, t, dst);
}

/**
 *
 * @param {Physics.ConvexShape<Physics.vec2>} s1
 * @param {Physics.ConvexShape<Physics.vec2>} s2
 * @param {Physics.vec2} dir
 * @param {Physics.gjk2.SupportPoint} supportPoint
 */
function distanceSupport(s1, s2, dir, supportPoint) {
	const sup1 = s1.support(dir, supportPoint.spA);
	const sup2 = s2.support(vec2.negate(dir), supportPoint.spB);
	return vec2.subtract(sup1, sup2, supportPoint.p);
}

/**
 * Find the closest points on the original shapes
 * @param {Physics.gjk2.SupportPoint} a
 * @param {Physics.gjk2.SupportPoint} b
 * @param {Physics.gjk2.DistanceResult} result
 */
function closestPoints(a, b, result) {
	const l = vec2.subtract(b.p, a.p);

	if (vec2.isZero(l)) {
		vec2.copy(a.spA, result.pointA);
		vec2.copy(a.spB, result.pointB);
	}
	else {
		const lMag = vec2.magnitudeSquared(l);
		const lambda2 = -(vec2.dot(l, a.p) / lMag);
		if (lambda2 > 1) {
			// Past the end of point B.
			// this means support point's of B are the closest points
			vec2.copy(b.spA, result.pointA);
			vec2.copy(b.spB, result.pointB);
		}
		else if (lambda2 < 0) {
			// Past the end of point A.
			// this means support point's of A are the closest points
			vec2.copy(a.spA, result.pointA);
			vec2.copy(a.spB, result.pointB);
		}
		else {
			// Lies between the points A and B
			// Take the quantity of each that is being provided
			// and determine where the closest on each shape lies.
			const dummy = vec2.create();
			// s_1 + lambda(s_2 - s_1) == (1 - lambda)s_1 + lambda(s_2)
			vec2.scaleAndAdd(a.spA, vec2.subtract(b.spA, a.spA, dummy), lambda2, result.pointA);
			vec2.scaleAndAdd(a.spB, vec2.subtract(b.spB, a.spB, dummy), lambda2, result.pointB);
		}
	}

	vec2.subtract(result.pointB, result.pointA, l/* Don't need l anymore so we can use it as a temp storage */);
	result.distance = vec2.magnitude(l);
	vec2.scale(l, result.distance != 0 ? 1 / result.distance : 0, result.normal);
}

/**
 * @returns {Physics.gjk2.DistanceResult}
 */
export function createDistanceResult() {
	return {
		distance: 0,
		normal: vec2.create(),
		pointA: vec2.create(),
		pointB: vec2.create(),
	};
}

/**
 * @param {Physics.ConvexShape<Physics.vec2>} s1
 * @param {Physics.ConvexShape<Physics.vec2>} s2
 * @returns {Physics.gjk2.DistanceState}
 */
export function createDistnaceState(s1, s2) {
	return {
		dir: vec2.create(),
		shapeA: s1,
		shapeB: s2,
		tolerance: EPSILON
	};
}

/**
 * @param {Physics.gjk2.SupportPoint} a
 * @param {Physics.gjk2.SupportPoint} dst
 */
function copySupportPoint(a, dst) {
	vec2.copy(a.p, dst.p);
	vec2.copy(a.spA, dst.spA);
	vec2.copy(a.spB, dst.spB);
}

/**
 * @param {Physics.Circle<Physics.vec2> | Physics.Polygon<Physics.vec2>} shape
 * @returns {boolean}
 */
function isCircle(shape) {
	return Object.prototype.hasOwnProperty.call(shape, "radius");
}

/**
 * @param {Physics.Circle<Physics.vec2>} c1
 * @param {Physics.Circle<Physics.vec2>} c2
 * @returns {boolean}
 */
function circleTest(c1, c2) {
	const dir = vec2.subtract(c2.center, c1.center);
	const radii = c1.radius + c2.radius;
	const sqrDist = vec2.magnitudeSquared(dir);

	return (sqrDist < radii * radii);
}

/**
 * @param {Physics.Circle<Physics.vec2>} c1
 * @param {Physics.Circle<Physics.vec2>} c2
 * @param {Physics.gjk2.DistanceResult} dst
 * @returns {boolean}
 */
function circleDistance(c1, c2, dst) {
	const dir = vec2.subtract(c2.center, c1.center);
	const radii = c1.radius + c2.radius;
	const sqrDist = vec2.magnitudeSquared(dir);

	if (sqrDist >= radii * radii) {
		// there is a gap between the circles
		dst.distance = vec2.magnitude(dir);
		const scale = dst.distance == 0 ? 0 : 1 / dst.distance;
		dst.distance -= radii;
		vec2.scale(dir, scale, dst.normal);

		vec2.scaleAndAdd(c1.center, dst.normal, c1.radius, dst.pointA);
		vec2.scaleAndAdd(c2.center, vec2.negate(dst.normal), c2.radius, dst.pointB);
		return true;
	}
	return false;
}

/**
 * @param {Physics.gjk2.DistanceState} state
 * @param {Physics.gjk2.DistanceResult} dst
 * @param {number} maxIterations
 * @returns {boolean}
 */
export function distance(state, dst, maxIterations = MAX_ITERATIONS) {
	// based on description given in https://dyn4j.org/2010/04/gjk-distance-closest-points/

	if (isCircle(state.shapeA.shape) && isCircle(state.shapeB.shape)) {
		const c1 = /** @type {Physics.Circle<Physics.vec2>} */(state.shapeA.shape);
		const c2 = /** @type {Physics.Circle<Physics.vec2>} */(state.shapeB.shape);
		return circleDistance(c1, c2, dst);
	}

	function createSupport() {
		/** @type {Physics.gjk2.SupportPoint} */
		const a = {
			p: vec2.create(),
			spA: vec2.create(),
			spB: vec2.create(),
		};
		return a;
	}

	// Pre allocate all of the values we are going to be using
	/** @type {Physics.gjk2.SupportPoint} */
	let a = createSupport();
	/** @type {Physics.gjk2.SupportPoint} */
	let b = createSupport();
	/** @type {Physics.gjk2.SupportPoint} */
	let c = createSupport();
	/** @type {Physics.vec2} */
	let p1 = vec2.create();
	/** @type {Physics.vec2} */
	let p2 = vec2.create();

	vec2.subtract(state.shapeB.center, state.shapeA.center, state.dir);

	distanceSupport(state.shapeA, state.shapeB, state.dir, a);
	distanceSupport(state.shapeA, state.shapeB, vec2.negate(state.dir), b);
	closestPointToOrigin(a.p, b.p, state.dir);

	for (let i = 0; i < maxIterations; ++i) {
		vec2.negate(state.dir, state.dir);

		if (vec2.isZero(state.dir)) {
			return false;
		}

		distanceSupport(state.shapeA, state.shapeB, state.dir, c);

		// Check if the origin is contained
		if (isOriginInTriangle(a.p, b.p, c.p)) {
			return false;
		}

		let dc = vec2.dot(c.p, state.dir);
		let da = vec2.dot(a.p, state.dir);

		if (dc - da < state.tolerance) {
			// We effectively haven't moved any closer to origin.
			// Assume we are as close as we can be to origin
			closestPoints(a, b, dst);
			return true;
		}

		// We are still inching our way closer to origin
		// So grab the next closest points on the simplex to origin
		// We also know that c is closer than points a and b
		//  so we only need to choose between them.
		closestPointToOrigin(a.p, c.p, p1);
		closestPointToOrigin(c.p, b.p, p2);

		let p1m = vec2.magnitudeSquared(p1);
		let p2m = vec2.magnitudeSquared(p2);

		// Check distance to origin
		// One of the points might be close enough already
		if (p1m < state.tolerance) {
			closestPoints(a, c, dst);
			return true;
		}
		else if (p2m < state.tolerance) {
			closestPoints(c, b, dst);
			return true;
		}

		if (p1m < p2m) {
			// Replace `b` since `a` is closer
			copySupportPoint(c, b);
			vec2.copy(p1, state.dir);
		}
		else {
			// Replace `a` since `b` is closer
			copySupportPoint(c, a);
			vec2.copy(p2, state.dir);
		}
	}

	// We finished iterating due to max iteration
	// So we'll just use the last `a`/`b` in the iteration
	closestPoints(a, b, dst);
	return true;
}

/**
 * @enum {Physics.gjk2.Result}
 */
export const Result = {
	working: /** @type {Physics.gjk2.Result.working} */ (0),
	intersection: /** @type {Physics.gjk2.Result.intersection} */(1),
	noIntersection:  /** @type {Physics.gjk2.Result.noIntersection} */(2)
};

/**
 * 
 * @param {Physics.gjk2.State} state
 * @returns {boolean}
 */
function addSupport(state) {
	const vert = support(state.shapeA, state.shapeB, state.dir);
	switch (state.simplex.length) {
		case 3:
			return false;
		default: {
			state.simplex = [...state.simplex, vert];
			break;
		}
	}

	return vec2.dot(state.dir, vert) >= 0;
}

/**
 *
 * @param {Physics.ConvexShape<Physics.vec2>} s1
 * @param {Physics.ConvexShape<Physics.vec2>} s2
 * @param {Physics.vec2} dir
 * @param {Physics.vec2} dst
 */
export function support(s1, s2, dir, dst = vec2.create()) {
	const sup1 = s1.support(dir);
	const sup2 = s2.support(vec2.negate(dir));
	return vec2.subtract(sup1, sup2, dst);
}

/**
 * 
 * @param {Physics.gjk2.State} state
 * @returns {Physics.gjk2.Result}
 */
export function step(state) {
	switch (state.simplex.length) {
		case 0: {
			if (isCircle(state.shapeA.shape) && isCircle(state.shapeB.shape)) {
				const c1 = /** @type {Physics.Circle<Physics.vec2>} */(state.shapeA.shape);
				const c2 = /** @type {Physics.Circle<Physics.vec2>} */(state.shapeB.shape);
				return circleTest(c1, c2) ? Result.intersection : Result.noIntersection;
			}

			vec2.subtract(state.shapeB.center, state.shapeA.center, state.dir);
			break;
		}
		case 1: {
			vec2.negate(state.dir, state.dir);
			break;
		}
		case 2: {

			// Line from A to B
			const ba = vec2.subtract(state.simplex[1], state.simplex[0]);
			// Line from B to origin
			const bo = vec2.negate(state.simplex[0]);

			const dir = vec2.tripleProduct(ba, bo, ba);

			if (vec3.magnitudeSquared(dir) <= Number.EPSILON) {
				// Degenerate case where line is on the origin
				vec3.copy(vec2.rotate(ba, vec2.zero, Math.PI / 2), dir);
			}

			vec2.copy(dir, state.dir);
			break;
		}
		case 3: {
			const [c, b, a] = state.simplex;
			const ao = vec2.scale(a, -1);
			const ab = vec2.subtract(b, a);
			const ac = vec2.subtract(c, a);

			const abPerp = vec2.from(vec2.tripleProduct(ac, ab, ab));
			const acPerp = vec2.from(vec2.tripleProduct(ab, ac, ac));

			if (vec2.dot(abPerp, ao) > 0) {
				state.simplex.splice(1, 1);
				vec2.copy(abPerp, state.dir);
			}
			else if (vec2.dot(acPerp, ao) > 0) {
				state.simplex.splice(2, 1);
				vec2.copy(acPerp, state.dir);
			}
			else {
				return Result.intersection;
			}
		}
	}

	return addSupport(state) ? Result.working : Result.noIntersection;
}

/**
 * 
 * @param {Physics.ConvexShape<Physics.vec2>} s1 
 * @param {Physics.ConvexShape<Physics.vec2>} s2 
 * @returns {Physics.gjk2.State}
 */
export function create(s1, s2) {
	return {
		shapeA: s1,
		shapeB: s2,
		simplex: [],
		dir: vec2.create()
	};
}

/**
 * 
 * @param {Physics.ConvexShape<Physics.vec2> | Physics.gjk2.State} s1 
 * @param {Physics.ConvexShape<Physics.vec2>} s2 
 * @returns {boolean}
 */
export function test(s1, s2 = null) {
	/** @type {Physics.gjk2.State} */
	let state = null;
	if (s2 == null) {
		state = /** @type {Physics.gjk2.State} */ (s1);
	} else {
		state = create(/** @type {Physics.ConvexShape<Physics.vec2>} */(s1), s2);
	}

	let result = step(state);
	while (result == Result.working) {
		result = step(state);
	}

	return result === Result.intersection;
}

export default {
	bindSupportCircle
	, bindSupportPolygon
	, create
	, createDistanceResult
	, createDistnaceState
	, distance
	, Result
	, step
	, support
	, supportCircle
	, supportPolygon
	, test
};

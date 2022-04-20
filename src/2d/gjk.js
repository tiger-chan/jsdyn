import vec2 from "../vec2.js";
import vec3 from "../vec3.js";

/**
 * Find the support of a circle
 * @param {Physics.Circle<Physics.vec2>} shape
 * @param {Physics.vec2} dir
 * @param {Physics.vec2} dst
 * @returns {Physics.vec2}
 */
export function supportCircle(shape, dir, dst = vec2.create()) {
	return vec2.add(shape.center, vec2.scale(vec2.normalize(dir, dst), shape.radius, dst), dst);
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
	const vert = support(state.shape1, state.shape2, state.dir);
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
			vec2.subtract(state.shape2.center, state.shape1.center, state.dir);
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

			if (vec3.squaredLength(dir) <= Number.EPSILON) {
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
		shape1: s1,
		shape2: s2,
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
	bindSupportCircle,
	bindSupportPolygon,
	create,
	Result,
	step,
	support,
	supportCircle,
	supportPolygon,
	test,
};

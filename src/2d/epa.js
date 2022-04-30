import vec2 from "../vec2.js";
import gjk2 from "./gjk.js";
import PriorityQueue from "../priority_queue.js";

const MAX_ITERATION = 100;
const EPSILON = 0.0001;
const ROT_90 = Math.PI / 2;

/**
 * @param {Physics.constVec2} p1
 * @param {Physics.constVec2} p2
 * @param {Physics.constVec2} normal
 * @param {number} distance
 * @returns {Physics.epa.Edge}
 */
function createEdge(p1 = vec2.create(), p2 = vec2.create(), normal = vec2.create(), distance = 0) {
	return {
		distance: distance,
		normal: vec2.clone(normal),
		p1: vec2.clone(p1),
		p2: vec2.clone(p2),
	};
}

/**
 * @param {Physics.constVec2} p1
 * @param {Physics.constVec2} p2
 * @param {Physics.epa.Winding} winding
 * @returns {Physics.epa.Edge}
 */
function buildEdge(p1 = vec2.create(), p2 = vec2.create(), winding = 0) {
	let norm = vec2.subtract(p2, p1);
	switch (winding) {
		case 0: {
			norm = vec2.rotate(norm, vec2.zero, ROT_90);
			break;
		}
		case 1: {
			norm = vec2.rotate(norm, vec2.zero, -ROT_90);
			break;
		}
	}
	norm = vec2.normalized(norm);

	return createEdge(p1, p2, norm, Math.abs(vec2.dot(p1, norm)));
}

/**
 * @returns {Physics.epa.Result}
 */
function create(depth = 0, normal = vec2.create()) {
	return {
		depth: depth,
		normal: normal
	};
}

/**
 * 
 * @param {Physics.epa.State} state 
 * @param {Physics.epa.Edge} dst
 * @returns {Physics.epa.Edge}
 */
function findNearestEdge(state, dst = createEdge()) {
	let edge = state.polytope.peek();
	vec2.copy(edge.p1, dst.p1);
	vec2.copy(edge.p2, dst.p2);
	vec2.copy(edge.normal, dst.normal);
	dst.distance = edge.distance;

	return dst;
}

/**
 * Add point to polytop
 * 
 * This will breakup the edge we just found to be the closest
 * creating two new edges
 * 
 * `a` -> `b` transforms to `a` -> `p` -> `b`
 * @param {Physics.epa.State} state
 * @param {Physics.vec2} point
 */
function expandPolytope(state, point) {
	const edge = state.polytope.pop();
	const e1 = buildEdge(edge.p1, point, state.winding);
	const e2 = buildEdge(point, edge.p2, state.winding);
	state.polytope.push(e1, e2);
}

/**
 * @param {Physics.gjk2.State} state
 * @returns {Physics.epa.Winding}
 */
function determineWinding(state) {
	for (let i = 0; i < state.simplex.length; ++i) {
		let j = i + 1 == state.simplex.length ? 0 : i + 1;
		let a = state.simplex[i];
		let b = state.simplex[j];
		let cross = vec2.cross(a, b);
		if (cross > 0) {
			return /** @type {Physics.epa.Winding.ccw} */(1);
		} else if (cross < 0) {
			return /** @type {Physics.epa.Winding.cw} */(0);
		}
	}

	return /** @type {Physics.epa.Winding.ccw} */(1);
}

/**
 *
 * @param {Physics.gjk2.State} state
 * @returns {Physics.epa.State}
 */
export function createState(state) {
	const winding = determineWinding(state);
	const queue = new PriorityQueue((a, b) => a.distance < b.distance);
	for (let i = 0; i < state.simplex.length; ++i) {
		let j = i + 1 == state.simplex.length ? 0 : i + 1;
		let a = state.simplex[i];
		let b = state.simplex[j];
		queue.push(buildEdge(a, b, winding));
	}

	/** @type {Physics.epa.State} */
	return {
		dir: vec2.create(),
		polytope: queue,
		shapeA: state.shapeA,
		shapeB: state.shapeB,
		winding: winding
	};
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
 * @param {Physics.epa.Result} dst
 * @returns {Physics.epa.Result}
 */
function circleSolve(c1, c2, dst) {
	const dir = vec2.subtract(c2.center, c1.center);
	const radii = c1.radius + c2.radius;
	const sqrDist = vec2.magnitudeSquared(dir);

	if (sqrDist <= radii * radii) {
		dst.depth = radii - vec2.normalize(dir, dst.normal);
	}
	return dst;
}

/**
 * 
 * @param {Physics.epa.State} state
 * @param {Physics.epa.Result} dst
 * @param {number} maxiterations
 * @param {number} epsilon
 * @returns {Physics.epa.Result}
 */
export function solve(state, dst = create(), maxiterations = MAX_ITERATION, epsilon = EPSILON) {
	if (isCircle(state.shapeA.shape) && isCircle(state.shapeB.shape)) {
		const c1 = /** @type {Physics.Circle<Physics.vec2>} */(state.shapeA.shape);
		const c2 = /** @type {Physics.Circle<Physics.vec2>} */(state.shapeB.shape);
		return circleSolve(c1, c2, dst);
	}

	let point = vec2.create();
	let edge = createEdge();
	for (let i = 0; i < maxiterations; ++i) {
		let edge = findNearestEdge(state);
		gjk2.support(state.shapeA, state.shapeB, edge.normal, point);
		const projection = vec2.dot(point, edge.normal);
		const dist = projection - edge.distance;
		if (dist < epsilon) {
			// break here since the point isn't far enough
			// in the direction of the edge normal
			// This is because we cannot expand the polytope any futher
			dst.depth = projection;
			vec2.copy(edge.normal, dst.normal);
			return dst;
		}

		expandPolytope(state, point);
	}

	// This should only occur after max iterations.
	// So just set it to the closest edge
	dst.depth = vec2.dot(point, edge.normal);
	vec2.copy(edge.normal, dst.normal);

	return dst;
}

export default {
	createState
	, solve
};
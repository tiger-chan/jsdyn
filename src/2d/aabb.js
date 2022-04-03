import vec2 from "../vec2.js";
import math from "../math.js";

/**
 * @implements {Physics.AABB<Physics.vec2>}
 */
export class AABB {
	/** @type {Physics.vec2} */
	center;
	/** @type {Physics.vec2} */
	extents;
}

/**
 * Create new AABB with center and extents
 * @param {Physics.vec2} center 
 * @param {Physics.vec2} extents 
 * @returns {Physics.AABB}
 */
export function create(center, extents) {
	let aabb = new AABB();
	aabb.center = vec2.copy(center);
	aabb.extents = vec2.copy(extents);
	return aabb;
}

/**
 * Retreive the minimum value of the AABB
 * @param {Physics.AABB} aabb
 * @param {Physics.vec2} dst
 * @returns {Physics.vec2}
 */
export function min(aabb, dst = vec2.create()) {
	return vec2.subtract(aabb.center, aabb.extents, dst);
}

/**
 * Retreive the maximum values of the AABB
 * @param {Physics.AABB} aabb
 * @param {Physics.vec2} dst
 * @returns {Physics.vec2}
 */
export function max(aabb, dst = vec2.create()) {
	return vec2.add(aabb.center, aabb.extents, dst);
}

/**
 * Retreive the calculated width of the AABB
 * @param {Physics.AABB} aabb
 * @returns {number}
 */
export function width(aabb) {
	return aabb.extents[0] + aabb.extents[0];
}

/**
 * Retreive the calculated height of the AABB
 * @param {Physics.AABB} aabb
 * @returns {number}
 */
export function height(aabb) {
	return aabb.extents[1] + aabb.extents[1];
}

/**
 * Retreive the calculated size of the AABB
 * @param {Physics.AABB} aabb
 * @param {Physics.vec2} dst
 * @returns {Physics.vec2}
 */
export function size(aabb, dst = vec2.create()) {
	vec2.set(dst, width(aabb), height(aabb));
	return dst;
}

/**
 * Return the list of vertices of the AABB
 * @param {Physics.AABB} aabb
 * @param {Physics.vec2[]} dst
 * @returns {Physics.vec2[]}
 */
export function vertices(aabb, dst = []) {
	dst.length = 4;
	// Top left
	dst[0] = min(aabb);
	// Bottom right
	dst[3] = max(aabb);
	// Top right
	dst[1] = vec2.create(dst[3][0], dst[0][1]);
	// Bottom Left
	dst[2] = vec2.create(dst[0][0], dst[3][1]);
	return dst;
}

/**
 * 
 * @param {Physics.AABB2D.AABB} aabb
 * @param {Physics.vec2} point
 * @param {Physics.vec2} dst
 * @returns {Physics.vec2}
 */
function intersectionNormal(aabb, point, dst = vec2.create()) {
	// https://blog.johnnovak.net/2016/10/22/the-nim-ray-tracer-project-part-4-calculating-box-normals/
	let p = vec2.subtract(point, aabb.center);
	let d = vec2.scale(vec2.subtract(min(aabb), max(aabb)), 0.5);

	let scaled = vec2.scale(vec2.divide(p, vec2.abs(d, d), dst), 1.000001, dst);
	scaled = vec2.trunc(scaled, dst);
	vec2.normalize(scaled, dst);
	return dst;
}

/**
 * Test if line Ray intersects the AABB
 * @param {Physics.AABB2D.AABB} aabb
 * @param {Physics.AABB2D.Ray} r
 * @returns  {[number, number]} HitResult with information about the intersection otherwise null
 */
function getIntersectionRay(aabb, r) {
	// https://tavianator.com/2011/ray_box.html
	let aMin = min(aabb);
	let aMax = max(aabb);


	let t1 = (aMin[0] - r.origin[0]) * r.invDir[0];
	let t2 = (aMax[0] - r.origin[0]) * r.invDir[0];

	let tmin = math.min(t1, t2);
	let tmax = math.max(t1, t2);

	for (let i = 1; i < 2; ++i) {
		t1 = (aMin[i] - r.origin[i]) * r.invDir[i];
		t2 = (aMax[i] - r.origin[i]) * r.invDir[i];

		tmin = math.max(tmin, math.min(math.min(t1, t2), tmax));
		tmax = math.min(tmax, math.max(math.max(t1, t2), tmin));
	}

	return [tmin, tmax];
}

/**
 * Test if point is within the AABB
 * @param {Physics.AABB2D.AABB} aabb
 * @param {Physics.AABB2D.vector} p
 * @returns  {Physics.AABB2D.HitResult | null} HitResult with information about the intersection otherwise null
 */
export function intersectPoint(aabb, p) {
	if (overlapsPoint(aabb, p)) {
		let dir = vec2.normalize(vec2.subtract(p, aabb.center));

		let iP = vec2.add(aabb.center, vec2.multiply(aabb.extents, dir));

		/** @type {Physics.AABB2D.HitResult} */
		return {
			pos: iP,
			delta: vec2.subtract(iP, p),
			normal: intersectionNormal(aabb, iP)
		};
	}

	return null;
}

/**
 * Test if line Ray intersects the AABB
 * @param {Physics.AABB2D.AABB} aabb
 * @param {Physics.AABB2D.Ray} r
 * @returns  {Physics.AABB2D.HitResult | null} HitResult with information about the intersection otherwise null
 */
export function intersectRay(aabb, r) {
	let [tmin, tmax] = getIntersectionRay(aabb, r);

	if (tmax > Math.max(tmin, 0.0)) {
		let t = tmin < 0 ? tmax : tmin;
		let delta = vec2.scale(r.dir, t);
		// Intersection point
		let iP = vec2.add(r.origin, delta);

		/** @type {Physics.AABB2D.HitResult} */
		return {
			pos: iP,
			delta: delta,
			normal: intersectionNormal(aabb, iP)
		};
	}

	return null;
}

/**
 * Test if point is within the AABB
 * @param {Physics.AABB2D.AABB} aabb
 * @param {Physics.AABB2D.vector} p
 * @returns {boolean} `true` if AABB contains the point, otherwise `false`
 */
export function overlapsPoint(aabb, p) {
	let [x1, y1] = min(aabb);
	let [x2, y2] = max(aabb);
	let [x, y] = p;

	return (x1 <= x && x <= x2)
		&& (y1 <= y && y <= y2);
}

/**
 * Test if point is within the AABB
 * @param {Physics.AABB2D.AABB} aabb
 * @param {Physics.AABB2D.Ray} r ray
 * @returns {boolean} `true` if AABB intersects the Ray, otherwise `false`
 */
export function overlapsRay(aabb, r) {
	const [tmin, tmax] = getIntersectionRay(aabb, r);

	return tmax > Math.max(tmin, 0.0);
}

export default {
	AABB,
	create,
	min,
	max,
	width,
	height,
	size,
	vertices,
	intersectPoint,
	intersectRay,
	overlapsPoint,
	overlapsRay,
};

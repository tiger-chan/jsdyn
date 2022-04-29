import vec3 from "../vec3.js";
import math from "../math.js";

/**
 * @implements {Physics.AABB<Physics.vec3>}
 */
export class AxisAlignedBoundingBox {
	/** @type {Physics.vec3} */
	center;
	/** @type {Physics.vec3} */
	extents;
}

export const AABB = AxisAlignedBoundingBox;

/**
 * @param {Physics.vec3} center 
 * @param {Physics.vec3} extents 
 * @returns {Physics.AABB<Physics.vec3>}
 */
export function create(center, extents) {
	let aabb = new AABB();
	aabb.center = vec3.copy(center);
	aabb.extents = vec3.copy(extents);
	return aabb;
}

/**
 * @param {Physics.AABB<Physics.vec3>} aabb
 * @returns {number}
 */
export function depth(aabb) {
	return aabb.extents[2] + aabb.extents[2];
}

/**
 * @param {Physics.AABB<Physics.vec3>} aabb
 * @param {Physics.vec3} dst
 * @returns {Physics.vec3}
 */
export function min(aabb, dst = vec3.create()) {
	return vec3.subtract(aabb.center, aabb.extents, dst);
}

/**
 * @param {Physics.AABB<Physics.vec3>} aabb
 * @param {Physics.vec3} dst
 * @returns {Physics.vec3}
 */
export function max(aabb, dst = vec3.create()) {
	return vec3.add(aabb.center, aabb.extents, dst);
}

/**
 * @param {Physics.AABB<Physics.vec3>} aabb
 * @returns {number}
 */
export function width(aabb) {
	return aabb.extents[0] + aabb.extents[0];
}

/**
 * @param {Physics.AABB<Physics.vec3>} aabb
 * @returns {number}
 */
export function height(aabb) {
	return aabb.extents[1] + aabb.extents[1];
}

/**
 * @param {Physics.AABB<Physics.vec3>} aabb
 * @param {Physics.vec3} dst
 * @returns {Physics.vec3}
 */
export function size(aabb, dst = vec3.create()) {
	vec3.set(dst, width(aabb), height(aabb), depth(aabb));
	return dst;
}

/**
 * @param {Physics.AABB<Physics.vec3>} aabb
 * @param {Physics.vec3[]} dst
 * @returns {Physics.vec3[]}
 */
export function vertices(aabb, dst = []) {
	dst.length = 8;

	// Left top front
	let ltf = dst[0] = min(aabb);
	// right bottom back
	let rbb = dst[7] = max(aabb);

	// right top front
	dst[1] = vec3.create(rbb[0], ltf[1], ltf[2]);
	// left top back
	dst[2] = vec3.create(ltf[0], ltf[1], rbb[2]);
	// right top back
	dst[3] = vec3.create(rbb[0], ltf[1], rbb[2]);

	// left bottom front
	dst[4] = vec3.create(ltf[0], rbb[1], ltf[2]);
	// right bottom front
	dst[5] = vec3.create(rbb[0], rbb[1], ltf[2]);
	// right bottom back
	dst[6] = vec3.create(ltf[0], rbb[1], rbb[2]);

	return dst;
}

/**
 * 
 * @param {Physics.AABB<Physics.vec3>} aabb
 * @param {Physics.vec3} point
 * @param {Physics.vec3} dst
 * @returns {Physics.vec3}
 */
function intersectionNormal(aabb, point, dst = vec3.create()) {
	// https://blog.johnnovak.net/2016/10/22/the-nim-ray-tracer-project-part-4-calculating-box-normals/
	let p = vec3.subtract(point, aabb.center);
	let d = vec3.scale(vec3.subtract(min(aabb), max(aabb)), 0.5);

	let scaled = vec3.scale(vec3.divide(p, vec3.abs(d, d), dst), 1.000001, dst);
	scaled = vec3.trunc(scaled, dst);
	return vec3.normalized(scaled, dst);
}

/**
 * @param {Physics.AABB<Physics.vec3>} aabb
 * @param {Physics.Ray<Physics.vec3>} r
 * @returns  {[number, number]} [tmin, tmax]
 */
function getIntersectionRay(aabb, r) {
	// https://tavianator.com/2011/ray_box.html
	let aMin = min(aabb);
	let aMax = max(aabb);


	let t1 = (aMin[0] - r.origin[0]) * r.invDir[0];
	let t2 = (aMax[0] - r.origin[0]) * r.invDir[0];

	let tmin = math.min(t1, t2);
	let tmax = math.max(t1, t2);

	for (let i = 1; i < 3; ++i) {
		t1 = (aMin[i] - r.origin[i]) * r.invDir[i];
		t2 = (aMax[i] - r.origin[i]) * r.invDir[i];

		tmin = math.max(tmin, math.min(math.min(t1, t2), tmax));
		tmax = math.min(tmax, math.max(math.max(t1, t2), tmin));
	}

	return [tmin, tmax];
}

/**
 * @param {Physics.AABB<Physics.vec3>} aabb
 * @param {Physics.vec3} p
 * @returns  {Physics.HitResult<Physics.vec3> | null}
 */
export function intersectPoint(aabb, p) {
	if (overlapsPoint(aabb, p)) {
		let dir = vec3.normalized(vec3.subtract(p, aabb.center));

		let iP = vec3.add(aabb.center, vec3.multiply(aabb.extents, dir));

		/** @type {Physics.HitResult<Physics.vec3>} */
		return {
			pos: iP,
			delta: vec3.subtract(iP, p),
			normal: intersectionNormal(aabb, iP)
		};
	}

	return null;
}

/**
 * @param {Physics.AABB<Physics.vec3>} aabb
 * @param {Physics.Ray<Physics.vec3>} r
 * @returns  {Physics.HitResult<Physics.vec3> | null}
 */
export function intersectRay(aabb, r) {
	let [tmin, tmax] = getIntersectionRay(aabb, r);

	if (tmax > Math.max(tmin, 0.0)) {
		let t = tmin < 0 ? tmax : tmin;
		let delta = vec3.scale(r.dir, t);
		// Intersection point
		let iP = vec3.add(r.origin, delta);

		/** @type {Physics.HitResult<Physics.vec3>} */
		return {
			pos: iP,
			delta: delta,
			normal: intersectionNormal(aabb, iP)
		};
	}

	return null;
}

/**
 * @param {Physics.AABB<Physics.vec3>} aabb
 * @param {Physics.vec3} p
 * @returns {boolean}
 */
export function overlapsPoint(aabb, p) {
	let [x1, y1, z1] = min(aabb);
	let [x2, y2, z2] = max(aabb);
	let [x, y, z] = p;

	return (x1 <= x && x <= x2)
		&& (y1 <= y && y <= y2)
		&& (z1 <= z && z <= z2);
}

/**
 * @param {Physics.AABB<Physics.vec3>} aabb
 * @param {Physics.Ray<Physics.vec3>} r ray
 * @returns {boolean}
 */
export function overlapsRay(aabb, r) {
	const [tmin, tmax] = getIntersectionRay(aabb, r);

	return tmax > Math.max(tmin, 0.0);
}

export default {
	AABB
	, AxisAlignedBoundingBox
	, create
	, depth
	, min
	, max
	, width
	, height
	, size
	, vertices
	, intersectPoint
	, intersectRay
	, overlapsPoint
	, overlapsRay
};

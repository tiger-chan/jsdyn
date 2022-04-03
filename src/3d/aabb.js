import vec3 from "../vec3.js";
import math from "../math.js";

/**
 * @implements {Physics.AABB3D.AABB}
 */
class AABB {
	/** @type {Physics.vec3} */
	center;
	/** @type {Physics.vec3} */
	extents;
}

/**
 * Create new AABB with center and extents
 * @param {Physics.vec3} center 
 * @param {Physics.vec3} extents 
 * @returns {Physics.AABB}
 */
export function create(center, extents) {
	let aabb = new AABB();
	aabb.center = vec3.copy(center);
	aabb.extents = vec3.copy(extents);
	return aabb;
}

/**
 * Retreive the calculated depth of the AABB
 * @param {Physics.AABB} aabb
 * @returns {number}
 */
export function depth(aabb) {
	return aabb.extents[2] + aabb.extents[2];
}

/**
 * Retreive the minimum value of the AABB
 * @param {Physics.AABB} aabb
 * @param {Physics.vec3} dst
 * @returns {Physics.vec3}
 */
export function min(aabb, dst = vec3.create()) {
	return vec3.subtract(aabb.center, aabb.extents, dst);
}

/**
 * Retreive the maximum values of the AABB
 * @param {Physics.AABB} aabb
 * @param {Physics.vec3} dst
 * @returns {Physics.vec3}
 */
export function max(aabb, dst = vec3.create()) {
	return vec3.add(aabb.center, aabb.extents, dst);
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
 * @param {Physics.vec3} dst
 * @returns {Physics.vec3}
 */
export function size(aabb, dst = vec3.create()) {
	vec3.set(dst, width(aabb), height(aabb), depth(aabb));
	return dst;
}

/**
 * Return the list of vertices of the AABB
 * @param {Physics.AABB} aabb
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
 * @param {Physics.AABB3D.AABB} aabb
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
	vec3.normalize(scaled, dst);
	return dst;
}

/**
 * Test if line Ray intersects the AABB
 * @param {Physics.AABB3D.AABB} aabb
 * @param {Physics.AABB3D.Ray} r
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

	for (let i = 1; i < 3; ++i) {
		t1 = (aMin[i] - r.origin[i]) * r.invDir[i];
		t2 = (aMax[i] - r.origin[i]) * r.invDir[i];

		tmin = math.max(tmin, math.min(math.min(t1, t2), tmax));
		tmax = math.min(tmax, math.max(math.max(t1, t2), tmin));
	}

	return [tmin, tmax];
}

/**
 * Test if point is within the AABB
 * @param {Physics.AABB3D.AABB} aabb
 * @param {Physics.AABB3D.vector} p
 * @returns  {Physics.AABB3D.HitResult | null} HitResult with information about the intersection otherwise null
 */
export function intersectPoint(aabb, p) {
	if (overlapsPoint(aabb, p)) {
		let dir = vec3.normalize(vec3.subtract(p, aabb.center));

		let iP = vec3.add(aabb.center, vec3.multiply(aabb.extents, dir));

		/** @type {Physics.AABB3D.HitResult} */
		return {
			pos: iP,
			delta: vec3.subtract(iP, p),
			normal: intersectionNormal(aabb, iP)
		};
	}

	return null;
}

/**
 * Test if line Ray intersects the AABB
 * @param {Physics.AABB3D.AABB} aabb
 * @param {Physics.AABB3D.Ray} r
 * @returns  {Physics.AABB3D.HitResult | null} HitResult with information about the intersection otherwise null
 */
export function intersectRay(aabb, r) {
	let [tmin, tmax] = getIntersectionRay(aabb, r);

	if (tmax > Math.max(tmin, 0.0)) {
		let t = tmin < 0 ? tmax : tmin;
		let delta = vec3.scale(r.dir, t);
		// Intersection point
		let iP = vec3.add(r.origin, delta);

		/** @type {Physics.AABB3D.HitResult} */
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
 * @param {Physics.AABB3D.AABB} aabb
 * @param {Physics.AABB3D.vector} p
 * @returns {boolean} `true` if AABB contains the point, otherwise `false`
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
 * Test if point is within the AABB
 * @param {Physics.AABB3D.AABB} aabb
 * @param {Physics.AABB3D.Ray} r ray
 * @returns {boolean} `true` if AABB intersects the Ray, otherwise `false`
 */
export function overlapsRay(aabb, r) {
	const [tmin, tmax] = getIntersectionRay(aabb, r);

	return tmax > Math.max(tmin, 0.0);
}

export default {
	AABB,
	depth,
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

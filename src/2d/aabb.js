import * as vec2 from "../vec2";

/**
 * @implements {Physics.AABB}
 */
class AABB {
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
	let aabb = new AABB;
	vec2.copy(center, aabb.center);
	vec2.copy(extents, aabb.extents);
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
	let dir = vec2.normalize(vec2.subtract(point, aabb.center));
	let scaled = vec2.scale(vec2.divide(dir, aabb.extents, dst), 1.000001, dst);
	scaled = vec2.floor(scaled, dst);
	vec2.normalize(scaled, dst);
	return dst;
}

/**
 * Test if point is within the AABB
 * @param {Physics.AABB2D.AABB} aabb
 * @param {Physics.AABB2D.vector} p
 * @returns  {Physics.AABB2D.HitResult | null} HitResult with information about the intersection otherwise null
 */
export function intersectPoint(aabb, p) {
	let [x1, y1] = min(aabb);
	let [x2, y2] = max(aabb);
	let [x, y] = p;

	let intersects = (x1 <= x && x <= x2)
		&& (y1 <= y && y <= y2);

	if (intersects) {
		let dir = vec2.normalize(vec2.subtract(p, aabb.center));

		let iP = vec2.add(aabb.center, vec2.multiply(aabb.extents, dir));

		/** @type {Physics.AABB2D.HitResult} */
		return {
			pos: iP,
			delta: iP,
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
	let [minX, minY] = min(aabb);
	let [maxX, maxY] = max(aabb);
	let [rx, ry] = r.origin;

	let tx1 = (minX - rx) * r.invDir[0];
	let tx2 = (maxX - rx) * r.invDir[0];

	let tmin = Math.min(tx1, tx2);
	let tmax = Math.max(tx1, tx2);

	let ty1 = (minY - ry) * r.invDir[1];
	let ty2 = (maxY - ry) * r.invDir[1];

	tmin = Math.max(tmin, Math.min(ty1, ty2));
	tmax = Math.min(tmax, Math.min(ty1, ty2));

	if (tmax >= tmin) {
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
 * @param {Physics.AABB2D.Ray} r segment
 * @returns {boolean} `true` if AABB intersects the Ray, otherwise `false`
 */
export function overlapsSegment(aabb, r) {
	// https://tavianator.com/2011/ray_box.html
	let [minX, minY] = min(aabb);
	let [maxX, maxY] = max(aabb);
	let [rx, ry] = r.origin;

	let tx1 = (minX - rx) * r.invDir[0];
	let tx2 = (maxX - rx) * r.invDir[0];

	let tmin = Math.min(tx1, tx2);
	let tmax = Math.max(tx1, tx2);

	let ty1 = (minY - ry) * r.invDir[1];
	let ty2 = (maxY - ry) * r.invDir[1];

	tmin = Math.max(tmin, Math.min(ty1, ty2));
	tmax = Math.min(tmax, Math.min(ty1, ty2));

	return tmax >= tmin;
}

/**
 * 
 * @param {Physics.AABB} lhs
 * @param {Physics.AABB} rhs
 * @returns {Physics.AABB}
 */
export function minkowskiDiff(lhs, rhs) {
	let lMin = min(lhs);
	let rMax = min(rhs);

	let topLeft = vec2.subtract(lMin, rMax);
	let sz = vec2.add(size(lhs), size(rhs));

	let extents = vec2.scale(sz, 0.5);
	let aabb = {
		center: vec2.add(topLeft, extents),
		extents: extents
	};

	return aabb;
}

export function nearestBoundPoint(aabb, p) {
	let minVec = min(aabb);
	let maxVec = max(aabb);
	let minDist = Math.abs(p[0] - minVec[0]);

	let extentPoint = vec2.create(minVec[0], p[1]);

	// Check if it's closer to the right edge
	{
		let dist = Math.abs(maxVec[0] - p[0]);
		if (dist < minDist) {
			minDist = dist;
			extentPoint = vec2.create(maxVec[0], p[1]);
		}
	}

	// Check if it's closer to the lower edge (assuming +y is down on screen)
	{
		let dist = Math.abs(maxVec[1] - p[1]);
		if (dist < minDist) {
			minDist = dist;
			extentPoint = vec2.create(p[0], maxVec[1]);
		}
	}

	// Check if it's closer to the upper edge (assuming +y is down on screen)
	{
		let dist = Math.abs(minVec[1] - p[1]);
		if (dist < minDist) {
			minDist = dist;
			extentPoint = vec2.create(p[0], minVec[1]);
		}
	}

	return extentPoint;
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
	overlapsSegment,
	minkowskiDiff,
	nearestBoundPoint,
};

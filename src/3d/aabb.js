import * as vec3 from "../vec3";

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
	let aabb = new AABB;
	vec3.copy(center, aabb.center);
	vec3.copy(extents, aabb.extents);
	return aabb;
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
 * Retreive the calculated height of the AABB
 * @param {Physics.AABB} aabb
 * @returns {number}
 */
export function depth(aabb) {
	return aabb.extents[2] + aabb.extents[2];
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
	let dir = vec3.normalize(vec3.subtract(point, aabb.center));
	let scaled = vec3.scale(vec3.divide(dir, aabb.extents, dst), 1.000001, dst);
	scaled = vec3.floor(scaled, dst);
	vec3.normalize(scaled, dst);
	return dst;
}

/**
 * Test if point is within the AABB
 * @param {Physics.AABB3D.AABB} aabb
 * @param {Physics.AABB3D.vector} p
 * @returns  {Physics.AABB3D.HitResult | null} HitResult with information about the intersection otherwise null
 */
export function intersectPoint(aabb, p) {
	let [x1, y1, z1] = min(aabb);
	let [x2, y2, z2] = max(aabb);
	let [x, y, z] = p;

	let intersects = (x1 <= x && x <= x2)
		&& (y1 <= y && y <= y2)
		&& (z1 <= z && z <= z2);

	if (intersects) {
		let dir = vec3.normalize(vec3.subtract(p, aabb.center));

		let iP = vec3.add(aabb.center, vec3.multiply(aabb.extents, dir));

		/** @type {Physics.AABB3D.HitResult} */
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
 * @param {Physics.AABB3D.AABB} aabb
 * @param {Physics.AABB3D.Ray} r
 * @returns  {Physics.AABB3D.HitResult | null} HitResult with information about the intersection otherwise null
 */
export function intersectRay(aabb, r) {
	// https://tavianator.com/2011/ray_box.html
	let [minX, minY, minZ] = min(aabb);
	let [maxX, maxY, maxZ] = max(aabb);
	let [rx, ry, rz] = r.origin;

	let tx1 = (minX - rx) * r.invDir[0];
	let tx2 = (maxX - rx) * r.invDir[0];

	let tmin = Math.min(tx1, tx2);
	let tmax = Math.max(tx1, tx2);

	let ty1 = (minY - ry) * r.invDir[1];
	let ty2 = (maxY - ry) * r.invDir[1];

	tmin = Math.max(tmin, Math.min(ty1, ty2));
	tmax = Math.min(tmax, Math.min(ty1, ty2));

	let tz1 = (minZ - rz) * r.invDir[2];
	let tz2 = (maxZ - rz) * r.invDir[2];

	tmin = Math.max(tmin, Math.min(tz1, tz2));
	tmax = Math.min(tmax, Math.min(tz1, tz2));

	if (tmax >= tmin) {
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
 * @param {Physics.AABB3D.Ray} r segment
 * @returns {boolean} `true` if AABB intersects the Ray, otherwise `false`
 */
export function overlapsSegment(aabb, r) {
	// https://tavianator.com/2011/ray_box.html
	let [minX, minY, minZ] = min(aabb);
	let [maxX, maxY, maxZ] = max(aabb);
	let [rx, ry, rz] = r.origin;

	let tx1 = (minX - rx) * r.invDir[0];
	let tx2 = (maxX - rx) * r.invDir[0];

	let tmin = Math.min(tx1, tx2);
	let tmax = Math.max(tx1, tx2);

	let ty1 = (minY - ry) * r.invDir[1];
	let ty2 = (maxY - ry) * r.invDir[1];

	tmin = Math.max(tmin, Math.min(ty1, ty2));
	tmax = Math.min(tmax, Math.min(ty1, ty2));

	let tz1 = (minZ - rz) * r.invDir[2];
	let tz2 = (maxZ - rz) * r.invDir[2];

	tmin = Math.max(tmin, Math.min(tz1, tz2));
	tmax = Math.min(tmax, Math.min(tz1, tz2));

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

	let topLeft = vec3.subtract(lMin, rMax);
	let sz = vec3.add(size(lhs), size(rhs));

	let extents = vec3.scale(sz, 0.5);
	let aabb = {
		center: vec3.add(topLeft, extents),
		extents: extents
	};

	return aabb;
}

export function nearestBoundPoint(aabb, p) {
	let minVec = min(aabb);
	let maxVec = max(aabb);
	let minDist = Math.abs(p[0] - minVec[0]);

	let extentPoint = vec3.create(minVec[0], p[1]);

	// Check if it's closer to the right edge
	{
		let dist = Math.abs(maxVec[0] - p[0]);
		if (dist < minDist) {
			minDist = dist;
			extentPoint = vec3.create(maxVec[0], p[1]);
		}
	}

	// Check if it's closer to the lower edge (assuming +y is down on screen)
	{
		let dist = Math.abs(maxVec[1] - p[1]);
		if (dist < minDist) {
			minDist = dist;
			extentPoint = vec3.create(p[0], maxVec[1]);
		}
	}

	// Check if it's closer to the upper edge (assuming +y is down on screen)
	{
		let dist = Math.abs(minVec[1] - p[1]);
		if (dist < minDist) {
			minDist = dist;
			extentPoint = vec3.create(p[0], minVec[1]);
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

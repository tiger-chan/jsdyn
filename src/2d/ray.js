import vec2 from "../vec2.js";

/**
 * @implements {Physics.Ray<Physics.vec2>}
 */
export class Ray {
	/** @type {Physics.vec2} */
	origin;
	/** @type {Physics.vec2} */
	dir;
	/** @type {Physics.vec2} */
	invDir;
	/** @type {number} */
	distance;
}

/**
 * @param {Physics.Ray2D.vector} origin
 * @param {Physics.Ray2D.vector} dir
 * @param {number} maxDistance
 * @returns {Physics.Ray2D.Ray}
 */
export function create(origin, dir, maxDistance = Number.MAX_SAFE_INTEGER) {
	let ray = new Ray();
	ray.origin = vec2.clone(origin);
	ray.dir = vec2.scale(dir, maxDistance);
	ray.invDir = vec2.inverse(ray.dir);
	ray.distance = Math.abs(maxDistance || Number.MAX_SAFE_INTEGER);
	return ray;
}

export default {
	create,
	Ray
};
import vec2 from "../vec2.js";

/**
 * @implements {JsDyn.Ray<JsDyn.vec2>}
 */
export class Ray {
	/** @type {JsDyn.vec2} */
	origin;
	/** @type {JsDyn.vec2} */
	dir;
	/** @type {JsDyn.vec2} */
	invDir;
	/** @type {number} */
	distance;
}

/**
 * @param {JsDyn.ray2.vector} origin
 * @param {JsDyn.ray2.vector} dir
 * @param {number} maxDistance
 * @returns {JsDyn.ray2.Ray}
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
	create
	, Ray
};
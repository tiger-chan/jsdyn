import vec2 from "../vec3.js";

/**
 * @implements {JsDyn.Ray<JsDyn.vec3>}
 */
export class Ray {
	/** @type {JsDyn.vec3} */
	origin;
	/** @type {JsDyn.vec3} */
	dir;
	/** @type {JsDyn.vec3} */
	invDir;
	/** @type {number} */
	distance;
}

/**
 * @param {JsDyn.ray3.vector} origin
 * @param {JsDyn.ray3.vector} dir
 * @param {number} maxDistance
 * @returns {JsDyn.ray3.Ray}
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
import vec2 from "../vec3.js";

/**
 * @implements {Physics.Ray<Physics.vec3>}
 */
export class Ray {
	/** @type {Physics.vec3} */
	origin;
	/** @type {Physics.vec3} */
	dir;
	/** @type {Physics.vec3} */
	invDir;
	/** @type {number} */
	distance;
}

/**
 * @param {Physics.Ray3D.vector} origin
 * @param {Physics.Ray3D.vector} dir
 * @param {number} maxDistance
 * @returns {Physics.Ray3D.Ray}
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
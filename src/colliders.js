/// <reference path="../types/index.d.ts" />

import * as vec2 from "./vec2";
import * as M from "./math";

/**
 * @implements {Physics.HitResult}
 */
export class HitResult {
	constructor() {
		this.pos = vec2.create();
		this.normal = vec2.create();
		this.pos = vec2.create();
	}

	pos;
	normal;
	delta;
}

export function intersectPoint(aabb, point) {
	const dx = point[0] - aabb.center[0];
	const px = aabb.half[0] - M.abs(dx);
	// If the point is larger than the half width it can't be overlapping
	if (px <= 0) {
		return null;
	}

	const dy = point[1] - aabb.center[1];
	const py = aabb.half[1] - M.abs(dy);
	// If the point is larger than the half height it can't be overlapping
	if (py <= 0) {
		return null;
	}

	const hit = new HitResult;
	// determine which point is closer to the edge of the collider
	if (px < py) {
		const sign = M.sign(dx);
		hit.delta[0] = px * sign;
		hit.normal[0] = sign;
		// Add cx + hx * (+1 or -1) depending on the side it collided with
		hit.pos[0] = aabb.center[0] + aabb.half[0] * sign;
		hit.pos[1] = point[1];
	}
	else {
		const sign = M.sign(dy);
		hit.delta[1] = py * sign;
		hit.normal[1] = sign;
		// Add cy + hy * (+1 or -1) depending on the side it collided with
		hit.pos[0] = point[0];
		hit.pos[1] = aabb.center[1] + aabb.half[1] * sign;
	}

	return hit;
};

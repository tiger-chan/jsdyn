import * as vec2 from "../vec2";
//import * as AABB from "./aabb";
//import * as MathEx from "./math";

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

/**
 * @implements {Physics.SweepHitResult}
 */
export class SweepHitResult extends HitResult {
	constructor() {
		super();
		this.time = 0.0;
	}
	time;
}

export function intersectPoint(aabb, point) {
	const dx = point[0] - aabb.center[0];
	const px = aabb.half[0] - Math.abs(dx);
	// If the point is larger than the half width it can't be overlapping
	if (px <= 0) {
		return null;
	}

	const dy = point[1] - aabb.center[1];
	const py = aabb.half[1] - Math.abs(dy);
	// If the point is larger than the half height it can't be overlapping
	if (py <= 0) {
		return null;
	}

	const hit = new HitResult();
	// determine which point is closer to the edge of the collider
	if (px < py) {
		const sign = Math.sign(dx);
		hit.delta[0] = px * sign;
		hit.normal[0] = sign;
		// Add cx + hx * (+1 or -1) depending on the side it collided with
		hit.pos[0] = aabb.center[0] + aabb.half[0] * sign;
		hit.pos[1] = point[1];
	}
	else {
		const sign = Math.sign(dy);
		hit.delta[1] = py * sign;
		hit.normal[1] = sign;
		// Add cy + hy * (+1 or -1) depending on the side it collided with
		hit.pos[0] = point[0];
		hit.pos[1] = aabb.center[1] + aabb.half[1] * sign;
	}

	return hit;
}

export function intersectSegment(aabb, start, delta, padding = vec2.create()) {
	// TODO: COMMENT THIS
	const [ix, iy] = [1 / delta[0], 1 / delta[1]];
	const [sx, sy] = [Math.sign(delta[0]), Math.sign(delta[1])];

	const [hx, hy] = [sx * (aabb.half[0] + padding[0]), sy * (aabb.half[1] + padding[1])];
	const [nx, ny] = [(aabb.center[0] - hx - start[0]) * ix, (aabb.center[1] - hy - start[1]) * iy];
	const [fx, fy] = [(aabb.center[0] + hx - start[0]) * ix, (aabb.center[1] + hy - start[1]) * iy];

	if (nx > fy || ny < fx) {
		return null;
	}

	const n = nx > ny ? nx : ny;
	const f = fx < fy ? fx : fy;

	if (n >= 1.0 || f <= 0.0) {
		return null;
	}


}

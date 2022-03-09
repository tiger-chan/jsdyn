export = Physics;
export as namespace Physics;
export default Physics;
declare namespace Physics {
	export function abs(n: number): number;
	export function sign(n: number): number;
	export function min(a: number, b: number): number;
	export function max(a: number, b: number): number;
	export function clamp(n: number, min: number, max: number): number;

	export type vec2 = [number, number] | Float32Array;

	export interface AABB {
		/**
		 * Center point of bounding box
		 */
		center: vec2;
		/**
		 * half width & height of bounding box
		 */
		half: vec2;
	};

	export class HitResult {
		/**
		 * The point of contact between the two objects
		 * 
		 * Note: an estimation in some sweep tests
		 */
		pos: vec2;

		/**
		 * the surface normal for the point of contact
		 */
		normal: vec2;

		/**
		 * The overlap between the objects.  Can be added to the moving object's position
		 * to move it back just before the collision.
		 */
		delta: vec2;
	}

	export class SweepHitResult extends HitResult {
		/**
		 * `[0.0, 1.0]` indicating where allong the segment or sweep the intersection occured.
		 *
		 * The `t` is the value for the line equation `L(t) = A + t(B - A)`
		 */
		time: number;
	}

	export class SweepResult {
		/**
		 * `null` if there was no collision, Information on collision otherwise.
		 */
		hit: SweepHitResult | null;
		/**
		 * Final point on the path that could be reached without collision
		 */
		pos: vec2;
	}

	export function intersectPoint(aabb: AABB, point: vec2): Hit | null;
}

export = Physics;
export as namespace Physics;
export default Physics;
declare namespace Physics {
	export type vec2 = [number, number];
	export type constVec2 = readonly [number, number];
	export type vec3 = [number, number, number];
	export type constVec3 = readonly [number, number, number];

	export module MathEx {
		// Clamp `n` between `min` and `max`
		export function clamp(n: number, min: number, max: number): number;
		/**
		 * Numeric expressions to be evaluated.
		 * 
		 * @param x
		 * @param y
		 * @returns Returns the smaller of a set of supplied numeric expressions.
		 */
		export function max(x: number, y: number): number;
		/**
		 * Numeric expressions to be evaluated.
		 * 
		 * @param x
		 * @param y
		 * @returns Returns the larger of a set of supplied numeric expressions.
		 */
		export function min(x: number, y: number): number;
	}

	export module vec2 {
		/**
		 * Return the absolute value of the vector in dst
		 * @param A
		 * @param dst
		 */
		export function abs(A: constVec2, dst?: vec2): vec2;

		/**
		 * Create new vec2
		 */
		export function create(x?: number, y?: number): vec2;

		/**
		 * Clone provided vec2
		 */
		export function clone(A: constVec2): vec2;

		/**
		 * Create vec2 from a array like
		 */
		export function from(A: ArrayLike): vec2;

		/**
		 * Copy `A` to `dst`
		 */
		export function copy(A: constVec2, dst?: vec2): vec2;

		/**
		 * Set the `x`, `y` components of `dst`
		 */
		export function set(dst: vec2, x: number, y: number): vec2;

		/**
		 * Adds the respective components of `B` to `A` and returns them in `dst`
		 */
		export function add(A: constVec2, B: constVec2, dst?: vec2): vec2;

		/**
		 * Subtracts the respective components of `B` from `A` and returns them in `dst`
		 */
		export function subtract(A: constVec2, B: constVec2, dst?: vec2): vec2;

		/**
		 * Multiplies the respective components of `B` and `A` and returns them in `dst`
		 */
		export function multiply(A: constVec2, B: constVec2, dst?: vec2): vec2;

		/**
		 * Divides the respective components of `B` and `A` and returns them in `dst`
		 */
		export function divide(A: constVec2, B: constVec2, dst?: vec2): vec2;

		/**
		 * Returns the `ceil` of each component of `A` in `dst`
		 */
		export function ceil(A: constVec2, dst?: vec2): vec2;

		/**
		 * Returns the `floor` of each component of `A` in `dst`
		 */
		export function floor(A: constVec2, dst?: vec2): vec2;

		/**
		 * Returns the min of each element in `A` and `B` returned in `dst`
		 */
		export function min(A: constVec2, B: constVec2, dst?: vec2): vec2;

		/**
		 * Returns the max of each element in `A` and `B` returned in `dst`
		 */
		export function max(A: constVec2, B: constVec2, dst?: vec2): vec2;

		/**
		 * Returns the `round` of each component of `A` in `dst`
		 */
		export function round(A: constVec2, dst?: vec2): vec2;

		/**
		 * Returns `A` scaled by `s` in `dst`
		 */
		export function scale(A: constVec2, s: number, dst?: vec2): vec2;

		/**
		 * Returns `A` + `sB` in `dst`
		 */
		export function scaleAndAdd(A: constVec2, B: constVec2, s: number, dst?: vec2): vec2;

		/**
		 * Returns the distnace between `A` and `B`
		 */
		export function distance(A: constVec2, B: constVec2): number;

		/**
		 * Returns the square distnace between `A` and `B`
		 */
		export function squaredDistance(A: constVec2, B: constVec2): number;

		/**
		 * Returns the magnitude of `A`
		 */
		export function length(A: constVec2): number;

		/**
		 * Returns the square magnitude of `A`
		 */
		export function squaredLength(A: constVec2): number;

		/**
		 * Returns the `trunc` of each component of `A` in `dst`
		 * @param A
		 * @param dst
		 */
		export function trunc(A: constVec2, dst?: vec2): vec2;

		/**
		 * Returns the negative of `A` in `dst`
		 */
		export function negate(A: constVec2, dst?: vec2): vec2;

		/**
		 * Returns the inverse of `A` in `dst`
		 */
		export function inverse(A: constVec2, dst?: vec2): vec2;

		/**
		 * Returns `A` normalized in `dst`
		 */
		export function normalize(A: constVec2, dst?: vec2): vec2;

		/**
		 * Returns `A` dot `B`
		 */
		export function dot(A: constVec2, B: constVec2): number;

		/**
		 * Returns `A` x `B` in `dst`
		 */
		export function cross(A: constVec2, B: constVec2, dst?: vec3): vec3;

		/**
		 * Lerp between `A` to `B` where `t` is between [0, 1] returns result in `dst`
		 */
		export function lerp(A: constVec2, B: constVec2, t: number, dst?: vec2): vec2;

		/**
		 * Returns a random vector with `s` scale in `dst`
		 */
		export function random(s: number, dst?: vec2): vec2;

		/**
		 * Rotates `A` with origin `O` by `rad` returned in `dst`
		 */
		export function rotate(A: constVec2, O: constVec2, rad: number, dst?: vec2): vec2;

		/**
		 * Returns angle between `A` and `B` in radians
		 */
		export function angle(A: constVec2, B: constVec2): number;

		/**
		 * Zero Vector
		 */
		export const zero: constVec2;

		/**
		 * Returns the string representation of `A`
		 * 
		 * ```js
		 * "(x, y)"
		 * ```
		 */
		export function toString(A: constVec2): string;

		/**
		 * Strict equality test of `A` === `B`
		 */
		export function exactEquals(A: constVec2, B: constVec2): boolean;

		/**
		 * Compare approximate equality of `A` and `B` given margin of error `epsilon`
		 */
		export function equals(A: constVec2, B: constVec2, epsilon?: number): boolean;
	}

	export module vec3 {
		/**
		 * Return the absolute value of the vector in dst
		 * @param A
		 * @param dst
		 */
		export function abs(A: constVec3, dst?: vec3): vec3;

		/**
		 * Create new vec3
		 */
		export function create(x?: number, y?: number, z?: number): vec3;

		/**
		 * Clone provided vec3
		 */
		export function clone(A: constVec3): vec3;

		/**
		 * Create vec3 from a array like
		 */
		export function from(A: ArrayLike): vec3;

		/**
		 * Copy `A` to `dst`
		 */
		export function copy(A: constVec3, dst?: vec3): vec3;

		/**
		 * Set the `x`, `y`, `z` components of `dst`
		 */
		export function set(dst: vec3, x: number, y: number, z: number): vec3;

		/**
		 * Adds the respective components of `B` to `A` and returns them in `dst`
		 */
		export function add(A: constVec3, B: constVec3, dst?: vec3): vec3;

		/**
		 * Subtracts the respective components of `B` from `A` and returns them in `dst`
		 */
		export function subtract(A: constVec3, B: constVec3, dst?: vec3): vec3;

		/**
		 * Multiplies the respective components of `B` and `A` and returns them in `dst`
		 */
		export function multiply(A: constVec3, B: constVec3, dst?: vec3): vec3;

		/**
		 * Divides the respective components of `B` and `A` and returns them in `dst`
		 */
		export function divide(A: constVec3, B: constVec3, dst?: vec3): vec3;

		/**
		 * Returns the `ceil` of each component of `A` in `dst`
		 */
		export function ceil(A: constVec3, dst?: vec3): vec3;

		/**
		 * Returns the `floor` of each component of `A` in `dst`
		 */
		export function floor(A: constVec3, dst?: vec3): vec3;

		/**
		 * Returns the min of each element in `A` and `B` returned in `dst`
		 */
		export function min(A: constVec3, B: constVec3, dst?: vec3): vec3;

		/**
		 * Returns the max of each element in `A` and `B` returned in `dst`
		 */
		export function max(A: constVec3, B: constVec3, dst?: vec3): vec3;

		/**
		 * Returns the `round` of each component of `A` in `dst`
		 */
		export function round(A: constVec3, dst?: vec3): vec3;

		/**
		 * Returns `A` scaled by `s` in `dst`
		 */
		export function scale(A: constVec3, s: number, dst?: vec3): vec3;

		/**
		 * Returns `A` + `sB` in `dst`
		 */
		export function scaleAndAdd(A: constVec3, B: constVec3, s: number, dst?: vec3): vec3;

		/**
		 * Returns the distnace between `A` and `B`
		 */
		export function distance(A: constVec3, B: constVec3): number;

		/**
		 * Returns the square distnace between `A` and `B`
		 */
		export function squaredDistance(A: constVec3, B: constVec3): number;

		/**
		 * Returns the `trunc` of each component of `A` in `dst`
		 * @param A
		 * @param dst
		 */
		export function trunc(A: constVec3, dst?: vec3): vec3;

		/**
		 * Returns the magnitude of `A`
		 */
		export function length(A: constVec3): number;

		/**
		 * Returns the square magnitude of `A`
		 */
		export function squaredLength(A: constVec3): number;

		/**
		 * Returns the negative of `A` in `dst`
		 */
		export function negate(A: constVec3, dst?: vec3): vec3;

		/**
		 * Returns the inverse of `A` in `dst`
		 */
		export function inverse(A: constVec3, dst?: vec3): vec3;

		/**
		 * Returns `A` normalized in `dst`
		 */
		export function normalize(A: constVec3, dst?: vec3): vec3;

		/**
		 * Returns `A` dot `B`
		 */
		export function dot(A: constVec3, B: constVec3): number;

		/**
		 * Returns `A` x `B` in `dst`
		 */
		export function cross(A: constVec3, B: constVec3, dst?: vec3): vec3;

		/**
		 * Lerp between `A` to `B` where `t` is between [0, 1] returns result in `dst`
		 */
		export function lerp(A: constVec3, B: constVec3, t: number, dst?: vec3): vec3;

		/**
		 * Returns a random vector with `s` scale in `dst`
		 */
		export function random(s: number, dst?: vec3): vec3;

		/**
		 * Rotates `A` with origin `O` by `rad` returned in `dst`
		 */
		export function rotateX(A: constVec3, O: constVec3, rad: number, dst?: vec3): vec3;

		/**
		 * Rotates `A` with origin `O` by `rad` returned in `dst`
		 */
		export function rotateY(A: constVec3, O: constVec3, rad: number, dst?: vec3): vec3;

		/**
		 * Rotates `A` with origin `O` by `rad` returned in `dst`
		 */
		export function rotateZ(A: constVec3, O: constVec3, rad: number, dst?: vec3): vec3;

		/**
		 * Returns angle between `A` and `B` in radians
		 */
		export function angle(A: constVec3, B: constVec3): number;

		/**
		 * Zero Vector
		 */
		export const zero: constVec3;

		/**
		 * Returns the string representation of `A`
		 * 
		 * ```js
		 * "(x, y)"
		 * ```
		 */
		export function toString(A: constVec3): string;

		/**
		 * Strict equality test of `A` === `B`
		 */
		export function exactEquals(A: constVec3, B: constVec3): boolean;

		/**
		 * Compare approximate equality of `A` and `B` given margin of error `epsilon`
		 */
		export function equals(A: constVec3, B: constVec3, epsilon?: number): boolean;
	}

	export interface AABB<Vector> {
		/**
		 * Center point of bounding box
		 */
		center: Vector;
		/**
		 * half width & height of bounding box
		 */
		extents: Vector;
	};

	export interface Ray<Vector> {
		origin: Vector;
		dir: Vector;
		/**
		 * Value is a a precomputed value of the inverse of the direction components
		 * 
		 * i.e. (1/x, 1/y, 1/z)
		 */
		invDir: Vector;
		distance: number;
	}

	export module Ray2D {
		type vector = vec2;
		type Ray = Physics.Ray<vector>;

		export function create(origin: vector, dir: vector, maxDistance?: number): Ray;
	}

	export module Ray3D {
		type vector = vec3;
		type Ray = Physics.Ray<vector>;

		export function create(origin: vector, dir: vector, maxDistance?: number): Ray;
	}

	export interface HitResult<Vector> {
		/**
		 * The point of contact between the two objects
		 * 
		 * Note: an estimation in some sweep tests
		 */
		pos: Vector;

		/**
		 * the surface normal for the point of contact
		 */
		normal: Vector;

		/**
		 * The overlap between the objects.  Can be added to the moving object's position
		 * to move it back just before the collision.
		 */
		delta: readonly Vector;
	}

	export module AABB2D {
		type vector = vec2;
		type AABB = Physics.AABB<vector>;
		type Ray = Physics.Ray<vector>;
		type HitResult = Physics.HitResult<vector>;
		/**
		 * Create new AABB with center and extents
		 */
		export function create(center: vector, extents: vector): AABB;
		/**
		 * Retreive the minimum value of the AABB
		 */
		export function min(aabb: AABB, dst?: vector): vector;
		/**
		 * Retreive the maximum value of the AABB
		 */
		export function max(aabb: AABB, dst?: vector): vector;
		/**
		 * Retreive the calculated width of the AABB
		 */
		export function width(aabb: AABB): number;
		/**
		 * Retreive the calculated height of the AABB
		 */
		export function height(aabb: AABB): number;
		/**
		 * Retreive the calculated size of the AABB
		 */
		export function size(aabb: AABB, dst?: vector): vector;

		/**
		 * Return the list of vertices of the AABB
		 */
		export function vertices(aabb: AABB, dst?: vector[]): vector[];

		/**
		 * Test if point is within the AABB
		 * @param aabb
		 * @param p
		 * @returns HitResult with information about the intersection otherwise null
		 */
		export function intersectPoint(aabb: AABB, p: vector): HitResult | null;

		/**
		 * Test if line Ray intersects the AABB
		 * @param aabb
		 * @param s Ray
		 * @returns HitResult with information about the intersection otherwise null
		 */
		export function intersectRay(aabb: AABB, s: Ray): HitResult | null;

		/**
		 * Test if point is within the AABB
		 * @param aabb
		 * @param p
		 * @returns `true` if AABB contains the point, otherwise `false`
		 */
		export function overlapsPoint(aabb: AABB, p: vector): boolean;

		/**
		 * Test if line Ray intersects the AABB
		 * @param aabb
		 * @param s Ray
		 * @returns `true` if AABB contains the point, otherwise `false`
		 */
		export function overlapsRay(aabb: AABB, s: Ray): boolean;
	}

	export module AABB3D {
		type vector = vec3;
		type AABB = Physics.AABB<vector>;
		type Ray = Physics.Ray<vector>;
		type HitResult = Physics.HitResult<vector>;
		/**
		 * Create new AABB with center and extents
		 */
		export function create(center: vector, extents: vector): AABB;
		/**
		 * Retreive the minimum value of the AABB
		 */
		export function min(aabb: AABB, dst?: vector): vector;
		/**
		 * Retreive the maximum value of the AABB
		 */
		export function max(aabb: AABB, dst?: vector): vector;
		/**
		 * Retreive the calculated depth of the AABB
		 */
		export function depth(aabb: AABB): number;
		/**
		 * Retreive the calculated width of the AABB
		 */
		export function width(aabb: AABB): number;
		/**
		 * Retreive the calculated height of the AABB
		 */
		export function height(aabb: AABB): number;
		/**
		 * Retreive the calculated size of the AABB
		 */
		export function size(aabb: AABB, dst?: vector): vector;

		/**
		 * Return the list of vertices of the AABB
		 */
		export function vertices(aabb: AABB, dst?: vector[]): vector[];

		/**
		 * Test if point is within the AABB
		 * @param aabb
		 * @param p
		 * @returns HitResult with information about the intersection otherwise null
		 */
		export function intersectPoint(aabb: AABB, p: vector): HitResult | null;

		/**
		 * Test if line Ray intersects the AABB
		 * @param aabb
		 * @param s Ray
		 * @returns HitResult with information about the intersection otherwise null
		 */
		export function intersectRay(aabb: AABB, s: Ray): HitResult | null;

		/**
		 * Test if point is within the AABB
		 * @param aabb
		 * @param p
		 * @returns `true` if AABB contains the point, otherwise `false`
		 */
		export function overlapsPoint(aabb: AABB, p: vector): boolean;

		/**
		 * Test if line Ray intersects the AABB
		 * @param aabb
		 * @param s Ray
		 * @returns `true` if AABB contains the point, otherwise `false`
		 */
		export function overlapsRay(aabb: AABB, s: Ray): boolean;
	}

	type Simplex = any;
	type ConvexShape = any;
	export module Simplex {
		export function minkowskiSum(s1: ConvexShape, s2: ConvexShape): Simplex;
		export function minkowskiDiff(s1: ConvexShape, s2: ConvexShape): Simplex;
	}

	export module gjk {
		/**
		 * Returns test if the two shapes are colliding
		 * @param s1 
		 * @param s2 
		 */
		export function calculate(s1: ConvexShape, s2: ConvexShape): boolean;
	}

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
		delta: constVec2;
	}

	export class SweepHitResult extends HitResult {
		/**
		 * `[0.0, 1.0]` indicating where allong the Ray or sweep the intersection occured.
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
}

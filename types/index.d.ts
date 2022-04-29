export = Physics;
export as namespace Physics;
export default Physics;

type Tuple<T, N extends number> = N extends N ? number extends N ? T[] : _TupleOf<T, N, []> : never;
type _TupleOf<T, N extends number, R extends unknown[]> = R['length'] extends N ? R : _TupleOf<T, N, [T, ...R]>;

class PriorityQueue<T> {
	constructor(comparitor?: (a: T, b: T) => boolean);
	size(): number;
	isEmpty(): boolean;
	peek(): T;
	push(...values: T[]): void;
	pop(): T;
	replace(value: T): T;
}

declare namespace Physics {
	export type vec2 = [number, number];
	export type constVec2 = readonly [number, number];
	export type vec3 = [number, number, number];
	export type constVec3 = readonly [number, number, number];

	export module math {
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
		export function magnitude(A: constVec2): number;

		/**
		 * Returns the square magnitude of `A`
		 */
		export function magnitudeSquared(A: constVec2): number;

		/**
		 * Returns the magnitude of `A`
		 */
		export function length(A: constVec2): number;

		/**
		 * Returns the square magnitude of `A`
		 */
		export function lengthSquared(A: constVec2): number;

		/**
		 * the cross product of one vector with the cross product of the other two
		 * @param A
		 * @param B
		 * @param C
		 * @param dst
		 * @returns A x (B x C)
		 */
		export function tripleProduct(A: constVec2, B: constVec2, C: constVec2, dst?: vec3): vec3;

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
		 * Returns the normalization factor used, and `A` normalized in stored in `dst`
		 */
		export function normalize(A: constVec2, dst?: vec2): number;

		/**
		 * Returns `A` normalized in stored in `dst`
		 */
		export function normalized(A: constVec2, dst?: vec2): vec2;

		/**
		 * Returns `A` dot `B`
		 */
		export function dot(A: constVec2, B: constVec2): number;

		/**
		 * Returns `A` x `B`
		 * 
		 * Note: because the 2d cross product doesn't strictly
		 * exist and will always return 0 for x and y, we are only returning the z value
		 */
		export function cross(A: constVec2, B: constVec2): number;

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

		/**
		 * Check if this vector is a zero vector (approximately)
		 */
		export function isZero(A: constVec2, epsilon?: number): boolean;
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
		 * the cross product of one vector with the cross product of the other two
		 * @param A
		 * @param B
		 * @param C
		 * @param dst
		 * @returns A x (B x C)
		 */
		export function tripleProduct(A: constVec3, B: constVec3, C: constVec3, dst?: vec3): vec3;

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
		export function lengthSquared(A: constVec3): number;

		/**
		 * Returns the magnitude of `A`
		 */
		export function magnitude(A: constVec3): number;

		/**
		 * Returns the square magnitude of `A`
		 */
		export function magnitudeSquared(A: constVec3): number;

		/**
		 * Returns the negative of `A` in `dst`
		 */
		export function negate(A: constVec3, dst?: vec3): vec3;

		/**
		 * Returns the inverse of `A` in `dst`
		 */
		export function inverse(A: constVec3, dst?: vec3): vec3;

		/**
		 * Returns the normalization factor used, and `A` normalized in stored in `dst`
		 */
		export function normalize(A: constVec3, dst?: vec3): number;

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

	export interface AxisAlignedBoundingBox<Vector> {
		/**
		 * Center point of bounding box
		 */
		center: Vector;
		/**
		 * half width & height of bounding box
		 */
		extents: Vector;
	};

	export type AABB<Vector> = AxisAlignedBoundingBox<Vector>;

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

	export module aabb2 {
		type vector = vec2;
		export type AxisAlignedBoundingBox = Physics.AxisAlignedBoundingBox<vector>;
		export type AABB = Physics.AABB<vector>;
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

	export module aabb3 {
		type vector = vec3;
		export type AxisAlignedBoundingBox = Physics.AxisAlignedBoundingBox<vector>;
		export type AABB = Physics.AABB<vector>;
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

	export module ray2 {
		type vector = vec2;
		export type Ray = Physics.Ray<vector>;

		export function create(origin: vector, dir: vector, maxDistance?: number): Ray;
	}

	export module ray3 {
		type vector = vec3;
		export type Ray = Physics.Ray<vector>;

		export function create(origin: vector, dir: vector, maxDistance?: number): Ray;
	}

	export interface Circle<Vector> {
		center: Vector;
		radius: number;
	}

	export interface Polygon<Vector> {
		verticies: Vector[];
	}

	export interface ConvexShape<Vector> {
		center: Vector;
		support(dir: readonly Vector, dst?: Vector): Vector;
		shape: Circle<Vector> | Polygon<Vector>;
	}

	export module gjk2 {
		type Support = (dir: vec2, dst?: vec2) => vec2;
		type Polygon = Physics.Polygon<vec2>;
		export function supportCircle(shape: Physics.Circle<vec2>, dir: vec2, dst?: vec2): vec2;
		export function supportPolygon(shape: Physics.Polygon<vec2>, dir: vec2, dst?: vec2): vec2;

		export function bindSupportCircle(shape: Physics.Circle<vec2>): Support;
		export function bindSupportPolygon(shape: Physics.Polygon<vec2>): Support;

		export interface DistanceState {
			shapeA: ConvexShape<vec2>;
			shapeB: ConvexShape<vec2>;
			dir: vec2;
			tolerance: number;
		}

		export interface DistanceResult {
			distance: number;
			normal: vec2;
			pointA: vec2;
			pointB: vec2;
		}

		export interface SupportPoint {
			p: vec2;
			spA: vec2;
			spB: vec2;
		}

		export function createDistanceResult(): DistanceResult;

		export function createDistnaceState(s1: ConvexShape<vec2>, s2: ConvexShape<vec2>): DistanceState;

		export function distance(state: DistanceState, dst: DistanceResult, maxIterations?: number): boolean;

		export enum Result {
			working = 0,
			intersection = 1,
			noIntersection = 2
		}

		type Simplex = Tuple<vec2, 0> | Tuple<vec2, 1> | Tuple<vec2, 2> | Tuple<vec2, 3>;


		export interface State {
			shapeA: ConvexShape<vec2>;
			shapeB: ConvexShape<vec2>;
			simplex: Simplex;
			dir: vec2;
		}

		export function support(s1: ConvexShape<vec2>, s2: ConvexShape<vec2>, dir: vec2, dst?: vec2): vec2;

		/**
		 * Attempts the next step of the GJK request
		 * @param state
		 * @returns The result of the step taken; will return `Result.NoInteraction` if it was determined impossible
		 */
		export function step(state: State): Result;

		/**
		 * Returns test if the two shapes are colliding
		 * @param s1
		 * @param s2
		 */
		export function test(s1: ConvexShape<vec2>, s2: ConvexShape<vec2>): boolean;
		/**
		 * Returns test if the two shapes are colliding
		 * @param state
		 */
		export function test(state: State): boolean;
	}

	export module epa {
		export enum Winding {
			cw = 0,
			ccw = 1,
		}

		type Polytope = PriorityQueue<Edge>;

		export interface State {
			dir: vec2;
			polytope: Polytope;
			shapeA: ConvexShape<vec2>;
			shapeB: ConvexShape<vec2>;
			winding: Winding;
		}

		export interface Edge {
			/**
			 * distance calculated from the perpendicular edge to the origin
			 */
			distance: number;
			/**
			 * The edge's normal
			 */
			normal: vec2;
			/**
			 * The start point of the edge
			 */
			p1: vec2;
			/**
			 * The end point of the edge
			 */
			p2: vec2;
		}

		/**
		 * Penetration result
		 */
		export interface Result {
			normal: vec2;
			depth: number;
		}

		export function createState(state: gjk2.State): State;

		export function solve(state: State, dst?: Result, maxiterations?: number, epsilon?: number): Result;
	}

	export module gjk3 {
		type Simplex3 = Tuple<vec3, 4>
		/**
		 * Returns test if the two shapes are colliding
		 * @param s1
		 * @param s2
		 */
		export function calculate(s1: ConvexShape<vec3>, s2: ConvexShape<vec3>): boolean;
	}
}

/**
 * 
 * @param {number} n 
 * @param {number} minimum 
 * @param {number} maximum 
 * @returns {number}
 */
export function clamp(n, minimum, maximum) {
	return Math.max(Math.min(n, maximum), minimum);
}

/**
 * Numeric expressions to be evaluated.
 *
 * @param {number} x
 * @param {number} y
 * @returns {number} Returns the larger of a set of supplied numeric expressions.
 */
export function max(x, y) {
	return x > y ? x : y;
}

/**
 * Numeric expressions to be evaluated.
 *
 * @param {number} x
 * @param {number} y
 * @returns {number} Returns the smaller of a set of supplied numeric expressions.
 */
export function min(x, y) {
	return x < y ? x : y;
}

export default {
	clamp,
	max,
	min,
};

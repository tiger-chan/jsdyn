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

export default {
	clamp
};

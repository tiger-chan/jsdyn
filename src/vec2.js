/**
 * @returns {[number, number]}
 */
export function create() {
	return [0, 0];
}

export function multiply(vec, scalar) {
	return [vec[0] * scalar, vec[1] * scalar];
}

export function clone(vec) {
	return [vec[0], vec[1]];
}

export function normalized(vec) {
	const [x, y] = vec;
	const sqrLen = x * x + y * y;
	if (sqrLen  > 0) {
		const invLen = 1 / Math.sqrt(sqrLen);
		return multiply(vec, invLen);
	}
	return [0, 0];
}

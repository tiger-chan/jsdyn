export function abs(n) {
	return n < 0 ? -n : n;
}

export function sign(n) {
	return n < 0 ? -1 : 1;
}

export function min(l, r) {
	return l < r ? l : r;
}

export function max(l, r) {
	return l > r ? l : r;
}

export function clamp(n, minimum, maximum) {
	return max(min(n, maximum), minimum);
}
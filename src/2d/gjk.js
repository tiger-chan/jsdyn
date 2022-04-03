import vec2 from "../vec2";
import vec3 from "../vec3";

function simplexLine(simplex, dir) {
	let [B, A] = simplex;
	let AB = vec2.normalized(vec2.subtract(B, A));
	let AO = vec2.normalized(vec2.subtract(vec2.zero, A));
	let APerp = vec2.from(vec2.tripleProduct(AB, AO, AB));
	vec2.update(APerp, dir);
	return false;
}

function simplexTri(/** @type {[number, number][]} */ simplex, dir) {
	let [C, B, A] = simplex;
	let AO = vec2.normalized(vec2.subtract(vec2.zero, A));
	let AB = vec2.normalized(vec2.subtract(AO, B));
	let AC = vec2.normalized(vec2.subtract(C, A));
	let ABPerp = vec2.from(vec2.tripleProduct(AC, AB, AB));
	let ACPerp = vec2.from(vec2.tripleProduct(AB, AC, AC));

	if (vec2.dot(ABPerp, AO) > 0) {
		// Region AB
		simplex.shift();
		vec2.update(ABPerp, dir);
		return false;
	}
	else if (vec2.dot(ACPerp, AO) > 0) {
		simplex.splice(1, 1);
		vec2.update(ACPerp, dir);
		return false;
	}

	return true;
}

function handleSimplex(simplex, dir) {
	if (simplex.length == 2) {
		return simplexLine(simplex, dir);
	} 
	return simplexTri(simplex, dir);
}

/**
 * @param {Physics.vec2[]} s
 * @param {Physics.vec2} dir
 */
function furthestPoint(s, dir) {
	let cur = 0;
	for (let i = 0, max = 0; i < s.length; ++i) {
		let dot = vec2.dot(s[i], dir);
		if (max < dot) {
			max = dot;
			cur = i;
		}
	}

	return s[cur];
}

function findSupport(s1, s2, dir) {
	return vec2.normalized(vec2.subtract(furthestPoint(s1, dir), furthestPoint(s2, vec2.scale(dir, -1))));
}

export function gjk(s1, s2) {
	let dir = vec2.normalized(vec2.subtract(s1.center, s2.center));
	let simplex = [findSupport(s1, s2, dir)];
	dir = vec2.normalized(vec2.subtract(vec2.zero, simplex[0]));

	for (;;) {
		let A = findSupport(s1, s2, dir);
		if (vec2.dot(A, dir) < 0) {
			return false;
		}

		simplex.push(A);

		if (handleSimplex(simplex, dir)) {
			return true;
		}
	}
}

export default {
	gjk
}

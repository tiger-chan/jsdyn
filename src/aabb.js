import * as vec2 from "./vec2";

export function min(aabb) {
	return vec2.subtract(aabb.center, aabb.extents);
}

export function max(aabb) {
	return vec2.add(aabb.center, aabb.extents);
}

export function width(aabb) {
	return aabb.extents[0] + aabb.extents[0];
}

export function height(aabb) {
	return aabb.extents[1] + aabb.extents[1];
}

export function size(aabb) {
	return vec2.create(width(aabb), height(aabb));
}

export function minkowskiDiff(lhs, rhs) {
	let lMin = min(lhs);
	let rMax = min(rhs);

	let topLeft = vec2.subtract(lMin, rMax);
	let sz = vec2.add(size(lhs), size(rhs));

	let extents = vec2.scale(sz, 0.5);
	let aabb = {
		center: vec2.add(topLeft, extents),
		extents: extents
	};

	return aabb;
}

export function nearestBoundPoint(aabb, p) {
	let minVec = min(aabb);
	let maxVec = max(aabb);
	let minDist = Math.abs(p[0] - minVec[0]);

	let extentPoint = vec2.create(minVec[0], p[1]);

	// Check if it's closer to the right edge
	{
		let dist = Math.abs(maxVec[0] - p[0]);
		if (dist < minDist) {
			minDist = dist;
			extentPoint = vec2.create(maxVec[0], p[1]);
		}
	}

	// Check if it's closer to the lower edge (assuming +y is down on screen)
	{
		let dist = Math.abs(maxVec[1] - p[1]);
		if (dist < minDist) {
			minDist = dist;
			extentPoint = vec2.create(p[0], maxVec[1]);
		}
	}

	// Check if it's closer to the upper edge (assuming +y is down on screen)
	{
		let dist = Math.abs(minVec[1] - p[1]);
		if (dist < minDist) {
			minDist = dist;
			extentPoint = vec2.create(p[0], minVec[1]);
		}
	}
	
	return extentPoint;
}

export default {
	min: min,
	max: max,
	width: width,
	size: size,
	minkowskiDiff: minkowskiDiff,
	nearestBoundPoint: nearestBoundPoint,
};

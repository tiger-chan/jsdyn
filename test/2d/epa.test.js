import test from "ava";

import aabb from "../../src/2d/aabb.js";
import epa from "../../src/2d/epa.js";
import gjk from "../../src/2d/gjk.js";

test("epa.solve", (t) => {
	{
		const box1 = aabb.create([0, 0], [1, 1]);
		const box2 = aabb.create([0.5, 0.5], [1, 1]);
		let cs1 = { center: box1.center, support: gjk.bindSupportPolygon({ verticies: aabb.vertices(box1) }) };
		let cs2 = { center: box2.center, support: gjk.bindSupportPolygon({ verticies: aabb.vertices(box2) }) };
		const gjkState = gjk.create(cs1, cs2);
		const testResult = gjk.test(gjkState);

		const state = epa.createState(gjkState);

		const result = epa.solve(state);
		t.log(result);
		t.fail();
	}
});

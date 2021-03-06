// From https://stackoverflow.com/a/42919752/3261668

const TOP = 0;
function get_parent(i) { return ((i + 1) >>> 1) - 1; }
function left(i) { return (i << 1) + 1; }
function right(i) { return (i + 1) << 1; }

/**
 * @template T
 * @implements {PriorityQueue<T>}
 */
export class PriorityQueue {
	constructor(comparator = (a, b) => a > b) {
		this._heap = [];
		this._comparator = comparator;
	}
	size() {
		return this._heap.length;
	}
	isEmpty() {
		return this.size() == 0;
	}
	peek() {
		return this._heap[TOP];
	}
	push(...values) {
		values.forEach(value => {
			this._heap.push(value);
			this._siftUp();
		});
		return this.size();
	}
	pop() {
		const poppedValue = this.peek();
		const bottom = this.size() - 1;
		if (bottom > TOP) {
			this._swap(TOP, bottom);
		}
		this._heap.pop();
		this._siftDown();
		return poppedValue;
	}
	replace(value) {
		const replacedValue = this.peek();
		this._heap[TOP] = value;
		this._siftDown();
		return replacedValue;
	}
	_greater(i, j) {
		return this._comparator(this._heap[i], this._heap[j]);
	}
	_swap(i, j) {
		[this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]];
	}
	_siftUp() {
		let node = this.size() - 1;
		while (node > TOP && this._greater(node, get_parent(node))) {
			this._swap(node, get_parent(node));
			node = get_parent(node);
		}
	}
	_siftDown() {
		let node = TOP;
		while (
			(left(node) < this.size() && this._greater(left(node), node)) ||
			(right(node) < this.size() && this._greater(right(node), node))
		) {
			let maxChild = (right(node) < this.size() && this._greater(right(node), left(node))) ? right(node) : left(node);
			this._swap(node, maxChild);
			node = maxChild;
		}
	}
}

export default PriorityQueue;

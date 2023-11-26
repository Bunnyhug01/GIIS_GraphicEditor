Array.prototype.extremumBy = function(pluck, extremum) {
	return this.reduce(function(best, next) {
		var pair = [ pluck(next), next ];
		if (!best) {
			return pair;
		} else if (extremum.apply(null, [ best[0], pair[0] ]) == best[0]) {
			return best;
		} else {
			return pair;
		}
	},null)[1];
}

	
export function minBy(array, fn) { 
	return array.extremumBy(fn, Math.min); 
};


export function maxBy(array, fn) { 
	return array.extremumBy(fn, Math.max); 
};

export function count(array, fn) {
	var count = 0
	for(const e of array)
		if(fn(e))
			count += 1
	return count
};

export function all(array, fn) {
	for (const e of array) {
		if (!fn(e)) return false
	}

	return true
}

export function any(array, fn) {
	for (const e of array) {
		if (fn(e)) return true
	}

	return false
}

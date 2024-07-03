export function stringSort(a: string, b: string): number {
    const A = a.trim().toLocaleLowerCase();
    const B = b.trim().toLocaleLowerCase();
    
    if(A < B) return -1;
    if(A > B) return 1;

    return 0;
}

export function dateSort(a: Date | string, b: Date | string): number {
    const A = new Date(a);
    const B = new Date(b);

    if (A < B) return -1;
    if (A > B) return 1;

    return 0;
}

export function trimToLower(str: string | null){
	return str?.trim().toLocaleLowerCase();
}

/**
 * Calculates and parses string of elapsed time from millisecond value
 * @param delta Time in milliseconds
 * @returns string
 */
export function parseElapsed(delta: number): string {
	let seconds = Math.floor(delta / 1000);

	const weeks = Math.floor(seconds / 604800);
	seconds -= weeks*604800;
	const days = Math.floor(seconds / 86400);
	seconds -= days*86400;
	const hours = Math.floor(seconds / 3600);
	seconds -= hours*3600;
	const minutes = Math.floor(seconds / 60);
	seconds -= minutes*60;
	
	let result: string = "";
  
	if (weeks > 0) {
		result += `${weeks} week${weeks > 1 ? "s" : ""}`;
	}

	if (days > 0) {
		if (result !== "") result += ", ";
		result += `${days} day${days > 1 ? "s" : ""}`;
	}

	if (hours > 0) {
		if (result !== "") result += ", ";
		result += `${hours} hour${hours > 1 ? "s" : ""}`;
	}

	if (minutes > 0) {
		if (result !== "") result += ", ";
		result += `${minutes} minute${minutes > 1 ? "s" : ""}`;
	}

	if (result === "") {
		result = "less than a minute";
	}
	
	return result;
}

Object.defineProperty(String.prototype, 'capitalize', {
	value: function() {
		return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
	},
	enumerable: false
});
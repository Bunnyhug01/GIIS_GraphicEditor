export function range(start:number, end:number): number[] {
    if(start === end) return [start];
    return [start, ...range(start + 1, end)];
}


export function rangeStep(start: number, end: number, step: number): number[] {
    const result = [];
    for (let t = start; t <= end; t += step) {
        result.push(t);
    }
    return result;
}
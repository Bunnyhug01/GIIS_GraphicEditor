export function range(start:number, end:number): number[] {
    const result = [];
    for (let t = start; t <= end; t ++) {
        result.push(t);
    }
    return result;
}


export function rangeStep(start: number, end: number, step: number): number[] {
    const result = [];
    for (let t = start; t <= end; t += step) {
        result.push(t);
    }
    return result;
}
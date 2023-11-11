import Point from "../Point";

export class MinimalConvexHullSolver {
    
    solve(points: Point[]): Point[] {
        throw new Error("Method not implemented.")
    }
}

export function rotate(a: Point, b: Point, c: Point) { return (b.x-a.x)*(c.y-b.y)-(b.y-a.y)*(c.x-b.x) }
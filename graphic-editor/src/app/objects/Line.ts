import { sqrt } from "mathjs"
import { maxBy, minBy } from "../utils/arrays"
import Point from "./Point"


export class Line {
    
    point1: Point
    point2: Point

    constructor(point1: Point, point2: Point) {
        this.point1 = point1
        this.point2 = point2
    }

    public get a() : number {
        return this.point2.y - this.point1.y
    }

    public get b() : number {
        return this.point1.x - this.point2.x
    }

    public get c() : number {
        return -this.point1.x * this.a - this.point1.y * this.b
    }

    public get normal() : vec2 {
        return normalize(vec2(this.a, this.b))
    }

    public get center(): Point {
        return new Point((this.point2.x + this.point1.x) / 2, (this.point2.y + this.point1.y) / 2)
    }

    public get points() : Point[] {
        return [this.point1, this.point2]
    }

    public get perpendicular() : Line {
        return new Line(this.center, new Point(this.center.x + this.normal.x, this.center.y + this.normal.y))
    }
    
}

export interface vec2 {
    x: number
    y: number
}

function vec2(x: number, y: number): vec2 {
    return { x: x, y: y }
} 

function normalize(v: vec2): vec2 {
    const length = sqrt(v.x * v.x + v.y * v.y) as number
    if(length < 0.01)
        return v
    return { x: v.x / length, y: v.y / length}
}

export function crossProduction(a: Line, b: Line) {
    const ax = a.point2.x - a.point1.x
    const ay = a.point2.y - a.point1.y
    const bx = b.point2.x - b.point1.x
    const by = b.point2.y - b.point1.y
    return ax * by - ay * bx
}

export function cross(line1: Line, line2: Line): Point | null {
	const det = line1.a * line2.b - line2.a * line1.b
	if(det == 0) return null

	const x = Math.floor(-(line2.b * line1.c - line1.b * line2.c) / det)
	const y = Math.floor((line2.a * line1.c - line1.a * line2.c) / det)

	for(const line of [line1, line2]) {
		const maxX = maxBy(line.points, (it:Point) => it.x).x
		const maxY = maxBy(line.points, (it:Point) => it.y).y
		const minX = minBy(line.points, (it:Point) => it.x).x
		const minY = minBy(line.points, (it:Point) => it.y).y

		if(x > maxX)
			return null
		if(y > maxY)
			return null
		if(x < minX)
			return null
		if(y < minY)
			return null
	}
	return new Point(x, y)
}

export function toLines(points: Point[]): Line[] {
    let i:number = 0
    
    if (points.length < 3) return []

    let a = points[i]
    const first = a

    const result = []
    while (i < points.length - 1) {
        i++
        const b = points[i]
        result.push(new Line(a, b))
        a = b 
    }

    result.push(new Line(a, first))
    return result
}

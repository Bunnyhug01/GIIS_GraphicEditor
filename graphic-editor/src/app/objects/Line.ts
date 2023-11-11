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
        return this.point2.x - this.point1.x
    }

    public get c() : number {
        return -this.point1.x * this.a - this.point1.y * this.b
    }

    public get points() : Point[] {
        return [this.point1, this.point2]
    }
    
}

export function cross(line1: Line, line2: Line): Point | null {
	const det = line1.a * line2.b - line2.a * line1.b
	if(det == 0) return null

	const x = -(line2.b * line1.c - line1.b * line2.c) / det
	const y = (line2.a * line1.c - line1.a * line2.c) / det

	for(const line of [line1, line2]) {
		const maxX = maxBy(line.points, (it:Point) => it.x)
		const maxY = maxBy(line.points, (it:Point) => it.y)
		const minX = minBy(line.points, (it:Point) => it.x)
		const minY = maxBy(line.points, (it:Point) => it.y)

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
import DrawObject from "@/app/objects/DrawObject";
import Point from "@/app/objects/Point";
import TwoPointDrawer from "../algorithms/drawer/TwoPointDrawer";
import BresenhamLineDrawer from "../algorithms/drawer/lines/BresenhamLineDrawer";
import { Line, cross, crossProduction, toLines } from "@/app/objects/Line";
import PixelDrawer from "../algorithms/drawer/PixelDrawer";
import { MinimalConvexHullSolver } from "@/app/objects/solver/MinimalConvexHullSolver";
import PolygonDrawObject from "./PolygonDrawObject";
import { count } from "../utils/arrays";

export default class BasePolygonDrawObject extends PolygonDrawObject {

    points: Point[]

    constructor(points: Point[], drawer: TwoPointDrawer) {
        super(drawer)
        this.points = points
    }

	isInside(point: Point): Boolean {
        const points = this.getPoints()
		if(points.length < 3)
			return false

        const line = new Line(new Point(point.x, point.y), new Point(1000, point.y))

        const pointsCount = this.getLines().map((it) => cross(it, line)).filter((it) => it !== null) 
        
        for (const p of points) {
            const index = pointsCount.indexOf(p)

            if (index !== -1)
                pointsCount.splice(index, 1)
        }

		return pointsCount.length % 2 == 1
	}

    getLines(): Line[] {
        return toLines(this.getPoints())
    }

    getPoints(): Point[] {
        return toClock(this.points)
    }
}

function toClock(points: Point[]): Point[] {
	if(points.length < 3)
		return points
    const lines = toLines(points)
	const a = lines[0]
	const b = lines[1]
    if(crossProduction(a, b) > 0)
		return points
	return points.toReversed()
}
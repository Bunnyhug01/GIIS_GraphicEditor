import DrawObject from "@/app/objects/DrawObject";
import Point from "@/app/objects/Point";
import TwoPointDrawer from "./TwoPointDrawer";
import { Line, toLines } from "@/app/objects/Line";
import PixelDrawer from "./PixelDrawer";
import { MinimalConvexHullSolver, rotate } from "@/app/objects/solver/MinimalConvexHullSolver";
import { all } from "@/app/utils/arrays";

export default class PolygonDrawObject extends DrawObject {

    points: Point[]
    solver: MinimalConvexHullSolver
    drawer: TwoPointDrawer

    constructor(points: Point[], solver: MinimalConvexHullSolver, drawer: TwoPointDrawer) {
        super()
        this.points = points
        this.solver = solver
        this.drawer = drawer
    }

    getLines(): Line[] {
        return toLines(this.solver.solve(this.points))
    }

    getPoints(): Point[] {
        return this.points
    }

    draw(drawer: PixelDrawer): void {
        for (const line of this.getLines()) {
            this.drawer.draw(drawer, line.point1, line.point2)
        }
    }

    inside(point: Point) {
        return all(this.getLines(), (line: Line) => { return (rotate(line.point1, line.point2, point) > 0) })
    }
}
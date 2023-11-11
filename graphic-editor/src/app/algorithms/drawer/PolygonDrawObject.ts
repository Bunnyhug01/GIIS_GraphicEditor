import DrawObject from "@/app/objects/DrawObject";
import Point from "@/app/objects/Point";
import TwoPointDrawer from "./TwoPointDrawer";
import BresenhamLineDrawer from "./lines/BresenhamLineDrawer";
import { Line, toLines } from "@/app/objects/Line";
import PixelDrawer from "./PixelDrawer";
import { MinimalConvexHullSolver } from "@/app/objects/solver/MinimalConvexHullSolver";

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
}
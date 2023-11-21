import DrawObject from "@/app/objects/DrawObject";
import Point from "@/app/objects/Point";
import PolygonDrawObject from "./PolygonDrawObject";
import TwoPointDrawer from "../algorithms/drawer/TwoPointDrawer";
import { Line, toLines } from "./Line";
import { MinimalConvexHullSolver, rotate } from "./solver/MinimalConvexHullSolver";
import { all } from "mathjs";

export default class MCHPolygonDrawObject extends PolygonDrawObject {

    points: Point[]
    solver: MinimalConvexHullSolver

    constructor(points: Point[], solver: MinimalConvexHullSolver, drawer: TwoPointDrawer) {
        super(drawer)
        this.points = points
        this.solver = solver
    }

    isHull(): Boolean {
        return true
    }

    getLines(): Line[] {
        return toLines(this.solver.solve(this.points))
    }

    getPoints(): Point[] {
        return this.points
    }

    isInside(point: Point) {
        return all(this.getLines(), (line: Line) => { return (rotate(line.point1, line.point2, point) > 0) })
    }
}
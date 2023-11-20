import DrawObject from "@/app/objects/DrawObject";
import Point from "@/app/objects/Point";
import TwoPointDrawer from "../algorithms/drawer/TwoPointDrawer";
import BresenhamLineDrawer from "../algorithms/drawer/lines/BresenhamLineDrawer";
import { Line, toLines } from "@/app/objects/Line";
import PixelDrawer from "../algorithms/drawer/PixelDrawer";
import { MinimalConvexHullSolver } from "@/app/objects/solver/MinimalConvexHullSolver";
import PolygonDrawObject from "./PolygonDrawObject";

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
}
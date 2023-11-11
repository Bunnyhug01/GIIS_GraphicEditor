import PolygonDrawObject from "../algorithms/drawer/PolygonDrawObject";
import BresenhamLineDrawer from "../algorithms/drawer/lines/BresenhamLineDrawer";
import DrawObject from "../objects/DrawObject";
import Point from "../objects/Point";
import { MinimalConvexHullSolver } from "../objects/solver/MinimalConvexHullSolver";
import MultiPointGenerator from "./MultiPointGenerator";


export default class PolygonGenerator extends MultiPointGenerator {

    solver: MinimalConvexHullSolver

    constructor(solver: MinimalConvexHullSolver) {
        super()
        this.solver = solver
    }

    newObject(points: Point[]): DrawObject {
        return new PolygonDrawObject(points, this.solver, new BresenhamLineDrawer())
    }
}
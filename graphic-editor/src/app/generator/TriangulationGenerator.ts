import Triangulator from "../algorithms/triangulation/Triangulator";
import DrawObject from "../objects/DrawObject";
import Point from "../objects/Point";
import TriangulationDrawObject from "../objects/TriangulationDrawObject";
import MultiPointGenerator from "./MultiPointGenerator";

export default class TriangulationGenerator extends MultiPointGenerator {

    triangulator: Triangulator

    constructor(triangulator: Triangulator) {
        super()
        this.triangulator = triangulator
    }

    newObject(points: Point[]): DrawObject {
        return new TriangulationDrawObject(points, this.triangulator)
    }

}
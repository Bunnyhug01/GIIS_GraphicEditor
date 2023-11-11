import TwoPointDrawer from "../algorithms/drawer/TwoPointDrawer";
import DrawObject from "../objects/DrawObject";
import LineDrawObject from "../objects/LineDrawObject";
import Point from "../objects/Point";
import MultiCountPointGenerator from "./MultiCountPointGenerator";

export default class LineGenerator extends MultiCountPointGenerator {

    drawer: TwoPointDrawer

    constructor(drawer: TwoPointDrawer) {
        super(2)
        this.drawer = drawer
    }

    newObject(points: Point[]): DrawObject {
        return new LineDrawObject(points[0], points[1], this.drawer)
    }
}
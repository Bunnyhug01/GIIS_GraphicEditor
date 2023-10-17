import TwoPointDrawer from "../algorithms/drawer/TwoPointDrawer"
import DrawObject from "../objects/DrawObject"
import Point from "../objects/Point"
import TwoPointsDrawObject from "../objects/TwoPointsDrawObject"
import MultiCountPointGenerator from "./MultiCountPointGenerator"

export default class TwoPointGenerator extends MultiCountPointGenerator {

    drawer: TwoPointDrawer

    constructor(drawer: TwoPointDrawer) {
        super(2)
        this.drawer = drawer
    }

    newObject(points: Point[]): DrawObject {
        return new TwoPointsDrawObject(points[0], points[1], this.drawer)
    }
}
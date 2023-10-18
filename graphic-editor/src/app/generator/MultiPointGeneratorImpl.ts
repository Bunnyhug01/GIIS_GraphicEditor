import MultiPointDrawer from "../algorithms/drawer/MultiPointDrawer";
import DrawObject from "../objects/DrawObject";
import MultiPointDrawObject from "../objects/MultiPointDrawObject";
import Point from "../objects/Point";
import MultiPointGenerator from "./MultiPointGenerator";


export default class MultiPointGeneratorImpl extends MultiPointGenerator {

    drawer: MultiPointDrawer

    constructor(drawer: MultiPointDrawer) {
        super()
        this.drawer = drawer
    }

    newObject(points: Point[]): DrawObject {
        return new MultiPointDrawObject(points, this.drawer)
    }
}
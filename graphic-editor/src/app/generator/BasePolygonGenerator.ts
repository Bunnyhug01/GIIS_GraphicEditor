import MCHPolygonDrawObject from "../objects/MCHPolygonDrawObject";
import BresenhamLineDrawer from "../algorithms/drawer/lines/BresenhamLineDrawer";
import DrawObject from "../objects/DrawObject";
import Point from "../objects/Point";
import MultiPointGenerator from "./MultiPointGenerator";
import BasePolygonDrawObject from "../objects/BasePolygonDrawObject";


export default class BasePolygonGenerator extends MultiPointGenerator {

    constructor() {
        super()
    }

    newObject(points: Point[]): DrawObject {
        return new BasePolygonDrawObject(points, new BresenhamLineDrawer())
    }
}
import TwoPointDrawer from "../algorithms/drawer/TwoPointDrawer";
import { Line } from "./Line";
import Point from "./Point";
import TwoPointsDrawObject from "./TwoPointsDrawObject";

export default class LineDrawObject extends TwoPointsDrawObject {
    
    constructor(point1: Point, point2: Point, drawer: TwoPointDrawer) {
        super(point1, point2, drawer)
    }

    getLines(): Line[] {
        return [new Line(this.point1, this.point2)]
    }

}
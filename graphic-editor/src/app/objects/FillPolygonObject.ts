import FillDrawer from "../algorithms/drawer/FillDrawer";
import PixelDrawer from "../algorithms/drawer/PixelDrawer";
import DrawObject from "./DrawObject";
import Point from "./Point";
import PolygonDrawObject from "./PolygonDrawObject";

export default class FillPolygonObject extends DrawObject {
    
    polygon: PolygonDrawObject
    filler: FillDrawer

    constructor(polygon: PolygonDrawObject, filler: FillDrawer) {
        super()

        this.polygon = polygon
        this.filler = filler
    }

    draw(drawer: PixelDrawer): void {
        this.filler.draw(drawer, this.polygon)
    }

    getPoints(): Point[] {
        return this.polygon.getPoints()
    }
}
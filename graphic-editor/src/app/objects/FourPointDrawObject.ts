import FourPointDrawer from "../algorithms/drawer/FourPointDrawer"
import PixelDrawer from "../algorithms/drawer/PixelDrawer"
import makeIterator from "../utils/iterator"
import DrawObject from "./DrawObject"
import Point from "./Point"


export default class FourPointDrawObject extends DrawObject {
    
    point1: Point
    point2: Point
    point3: Point
    point4: Point

    lines: FourPointDrawer
    
    constructor(point1: Point, point2: Point, point3: Point, point4: Point, lines: FourPointDrawer) {
        super()
        this.point1 = point1
        this.point2 = point2
        this.point3 = point3
        this.point4 = point4

        this.lines = lines
    }

    draw(drawer: PixelDrawer): void {
        this.lines.draw(drawer, this.point1, this.point2, this.point3, this.point4)
    }

    iterator() {
        return makeIterator([this.point1, this.point2, this.point3, this.point4])
    }
}

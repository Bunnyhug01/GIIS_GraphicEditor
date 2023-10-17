import MultiPointDrawer from "../algorithms/drawer/MultiPointDrawer"
import PixelDrawer from "../algorithms/drawer/PixelDrawer"
import makeIterator from "../utils/arrays"
import DrawObject from "./DrawObject"
import Point from "./Point"

export default class MultiPointDrawObject extends DrawObject {

    points: Point[]
    drawer: MultiPointDrawer

    constructor(points: Point[], drawer: MultiPointDrawer) {
        super()
        this.points = points
        this.drawer = drawer
    }

    draw(drawer: PixelDrawer): void {
        this.drawer.draw(drawer, this.points)
    }

    iterator() {
        return makeIterator(this.points)
    }
}
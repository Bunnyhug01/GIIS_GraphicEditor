import DebugPixelDrawer from "../algorithms/drawer/DebugPixelDrawer";
import PixelDrawer from "../algorithms/drawer/PixelDrawer";
import DrawObject from "./DrawObject";
import Point from "./Point";

export default class DebugDrawObject extends DrawObject {
    
    private _points:number = 0
    origin:DrawObject;

    constructor(origin: DrawObject) {
        super()
        this.origin = origin
    }

    addPoint() {
        this._points++
    }

    removePoint() {
        this._points--
    }

    draw(drawer: PixelDrawer) {
        let count = this.origin.countPixel()
        if (count < this._points)
            this._points = count
        if (0 > this._points)
            this._points = 0
        let g = new DebugPixelDrawer(drawer, this._points)
        this.origin.draw(g)
    }

    getPoints(): Point[] {
        return this.origin.getPoints()
    }
}
import Point from "@/app/objects/Point";
import MultiPointDrawer from "../MultiPointDrawer";
import PixelDrawer from "../PixelDrawer";
import FourPointDrawer from "../FourPointDrawer";


export default class SpliteToFour extends MultiPointDrawer {

    origin: FourPointDrawer

    constructor(origin: FourPointDrawer) {
        super()
        this.origin = origin
    }

    draw(drawer: PixelDrawer, points: Point[]): void {
        for(let i = 0; i < points.length - 3; i++) {
            this.origin.draw(drawer, points[i+0], points[i+1], points[i+2], points[i+3])
        }
    }

}
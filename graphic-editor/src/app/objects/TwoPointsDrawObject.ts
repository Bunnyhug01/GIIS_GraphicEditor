import PixelDrawer from "../algorithms/drawer/PixelDrawer";
import TwoPointDrawer from "../algorithms/drawer/TwoPointDrawer";
import makeIterator from "../utils/iterator";
import DrawObject from "./DrawObject";
import Point from "./Point";

export default class TwoPointsDrawObject extends DrawObject {
    point1:Point;
    point2:Point;

    drawer:TwoPointDrawer;

    constructor(point1:Point, point2:Point, drawer: TwoPointDrawer){
        super()
        this.point1 = point1;
        this.point2 = point2;
        this.drawer = drawer;
    }

    draw(drawer: PixelDrawer): void {
        console.log(drawer, this.point1 , this.point2,  'Pixel', this.drawer)
        this.drawer.draw(drawer, this.point1, this.point2);
    }

    iterator() {
        return makeIterator([this.point1, this.point2])
    }
}
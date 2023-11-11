import PixelDrawer from "../algorithms/drawer/PixelDrawer";
import TwoPointDrawer from "../algorithms/drawer/TwoPointDrawer";
import DrawObject from "./DrawObject";
import Point from "./Point";

export default class TwoPointsDrawObject extends DrawObject {
    public point1:Point;
    public point2:Point;

    drawer:TwoPointDrawer;

    constructor(point1:Point, point2:Point, drawer: TwoPointDrawer){
        super()
        this.drawer = drawer;
        this.point1 = point1;
        this.point2 = point2;
    }

    draw(drawer: PixelDrawer): void {
        this.drawer.draw(drawer, this.point1, this.point2);
    }

    getPoints(): Point[] {
        return [this.point1, this.point2]
    }
}
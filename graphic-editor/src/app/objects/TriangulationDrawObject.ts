import PixelDrawer from "../algorithms/drawer/PixelDrawer";
import TwoPointDrawer from "../algorithms/drawer/TwoPointDrawer";
import BresenhamLineDrawer from "../algorithms/drawer/lines/BresenhamLineDrawer";
import Triangulator from "../algorithms/triangulation/Triangulator";
import DrawObject from "./DrawObject";
import Point from "./Point";

export default class TriangulationDrawObject extends DrawObject {

    points: Point[]
    triangulator: Triangulator
    lineDrawer: TwoPointDrawer

    constructor(points: Point[], triangulator: Triangulator, lineDrawer: TwoPointDrawer = new BresenhamLineDrawer()) {
        super()
        this.points = points
        this.triangulator = triangulator
        this.lineDrawer = lineDrawer
    }

    draw(drawer: PixelDrawer): void {
        for (const it of this.triangulator.solve(this.points)) {
            this.lineDrawer.draw(drawer, it.point1, it.point2)
        }
    }    

}
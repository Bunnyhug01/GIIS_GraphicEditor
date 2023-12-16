import PixelDrawer from "../algorithms/drawer/PixelDrawer";
import TwoPointDrawer from "../algorithms/drawer/TwoPointDrawer";
import BresenhamLineDrawer from "../algorithms/drawer/lines/BresenhamLineDrawer";
import Triangulator from "../algorithms/triangulation/Triangulator";
import DrawObject from "./DrawObject";
import { Line } from "./Line";
import Point from "./Point";

export default class TriangulationDrawObject extends DrawObject {

    points: Point[]
    triangulator: Triangulator
    lineDrawer: TwoPointDrawer
    lines: Line[] | null = null

    constructor(points: Point[], triangulator: Triangulator, lineDrawer: TwoPointDrawer = new BresenhamLineDrawer()) {
        super()
        this.points = points
        this.triangulator = triangulator
        this.lineDrawer = lineDrawer
    }

    draw(drawer: PixelDrawer): void {
        let lines = this.triangulator.solve(this.points)

        if (lines === null) {
            lines = this.lines
        } else {
            this.lines = lines
        }

        if (lines) 
            for (const it of lines) {
                this.lineDrawer.draw(drawer, it.point1, it.point2)
            }
    }    

}
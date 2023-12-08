import PixelDrawer from "../algorithms/drawer/PixelDrawer";
import DrawObject from "./DrawObject";
import Point from "./Point";
import VoronoiDiagram from "./voronoi/VoronoiDiagram";

export default class VoronoiDrawObject extends DrawObject {

    diagram: VoronoiDiagram
    points: Point[]

    constructor(diagram: VoronoiDiagram, points: Point[]) {
        super()
        this.diagram = diagram
        this.points = points
    }

    getPoints(): Point[] {
        return this.points
    }

    draw(drawer: PixelDrawer): void {
        this.diagram.draw(drawer, this.points)
    }
    
}
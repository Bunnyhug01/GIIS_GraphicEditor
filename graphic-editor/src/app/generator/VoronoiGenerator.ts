import DrawObject from "../objects/DrawObject";
import Point from "../objects/Point";
import VoronoiDrawObject from "../objects/VoronoiDrawObject";
import VoronoiDiagram from "../objects/voronoi/VoronoiDiagram";
import MultiPointGenerator from "./MultiPointGenerator";

export default class VoronoiGenerator extends MultiPointGenerator {
    diagram: VoronoiDiagram

    constructor(diagram: VoronoiDiagram) {
        super()
        this.diagram = diagram
    }

    newObject(points: Point[]): DrawObject {
        return new VoronoiDrawObject(this.diagram, points)
    }
}
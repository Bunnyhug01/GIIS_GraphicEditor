import PixelDrawer from "@/app/algorithms/drawer/PixelDrawer"
import Point from "../Point"
import VoronoiDiagram from "./VoronoiDiagram"
import { minIndexBy } from "@/app/utils/arrays"

export default class FillVoronoiDiagram extends VoronoiDiagram {
    
    colors: string[] = []

    getColor(c: number) {
        
        if (!this.colors[c]) {
            this.colors[c] = '#' + Math.floor(Math.random()*16777215).toString(16);
        }
        
        return this.colors[c]
    }

    draw(drawer: PixelDrawer, points: Point[]): void {
        for (let x = 0; x < drawer.getWidth(); x++) {
            for (let y = 0; y < drawer.getHeight(); y++) {
                const p = new Point(x, y)
                const c = minIndexBy(points, (it: Point) => distanceSqr(p, it))
                const color = this.getColor(c)
                drawer.drawColorPixel(x, y, color)
            }
        }   
    }
}

function distanceSqr(point1: Point, point2: Point): number {
    const dx = point1.x - point2.x
    const dy = point1.y - point2.y

    return dx*dx + dy*dy
}
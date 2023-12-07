import { Line, cross } from "@/app/objects/Line";
import Point from "@/app/objects/Point";
import PolygonDrawObject from "@/app/objects/PolygonDrawObject";
import FillDrawer from "../FillDrawer";
import PixelDrawer from "../PixelDrawer";
import { maxBy, minBy } from "@/app/utils/arrays";
import { range } from "@/app/utils/range";

export default class RasterReamerActiveEdgeFiller extends FillDrawer {
    
    draw(drawer: PixelDrawer, polygon: PolygonDrawObject): void {
        
        interface Info {
            x: number;
            dx: number;
        }

		const points = polygon.getPoints()
        const maxX = maxBy(points, (it:Point) => it.x).x
        const minX = minBy(points, (it:Point) => it.x).x
        const maxY = maxBy(points, (it:Point) => it.y).y
        const minY = minBy(points, (it:Point) => it.y).y
        const map: Map<Line, Map<number, Info>> = new Map();

        const lines = polygon.getLines()
        for (const line of lines) {
            const m: Map<number, Info> = new Map();
            map.set(line, m);

            const crossPoints: Point[] = [];
            for (let y = minY; y <= maxY; y++) {
                const yline: Line = new Line(new Point(minX,y), new Point (maxX, y));
                const c = cross(line, yline);
                if (c !== null) {
                    crossPoints.push(c);
                }
            }
            for (let i = 0; i < crossPoints.length - 2; i++) {
                const p = crossPoints[i];
                const n = crossPoints[i + 1];
                m.set(p.y, { x: p.x, dx: n.x - p.x });
            }
           
        }
        
        for (const x of range(minX, maxX)) {
            const line = new Line(new Point(x, minY), new Point(x, maxY))
            const points = Array.from(new Set(lines.map((it: Line) => cross(it, line)).filter((x) => x !== null).map((it) => it!.y))).toSorted()

            for (const i of range(0, points.length / 2)) {
                const a = points[2 * i + 0]
                const b = points[2 * i + 1]

                for (const y of range(a, b)) {
                    drawer.drawPixel(x, y)
                }
            }
        }
    }

}
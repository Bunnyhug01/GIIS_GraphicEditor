import Point from "@/app/objects/Point";
import FillDrawer from "../FillDrawer";
import PixelDrawer from "../PixelDrawer";
import { maxBy, minBy } from "@/app/utils/arrays";
import { Line, cross, toLines } from "@/app/objects/Line";
import { range } from "@/app/utils/range";
import PolygonDrawObject from "@/app/objects/PolygonDrawObject";

export default class RasterReamerFiller extends FillDrawer {
    draw(drawer: PixelDrawer, polygon: PolygonDrawObject): void {
        const points = polygon.getPoints()
        const maxX = maxBy(points, (it:Point) => it.x).x
        const minX = minBy(points, (it:Point) => it.x).x
        const maxY = maxBy(points, (it:Point) => it.y).y
        const minY = minBy(points, (it:Point) => it.y).y

        const lines = toLines(points)

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
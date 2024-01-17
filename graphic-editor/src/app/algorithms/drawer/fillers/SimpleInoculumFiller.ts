import PolygonDrawObject from "@/app/objects/PolygonDrawObject";
import FillDrawer from "../FillDrawer";
import PixelDrawer from "../PixelDrawer";
import Point from "@/app/objects/Point";
import isPointsEqual from "@/app/utils/isPointsEqual";

export default class SimpleInoculumFiller extends FillDrawer {

    draw(drawer: PixelDrawer, polygon: PolygonDrawObject): void {
        const painted: Point[] = []
        const stack: Point[] = []

        for (const p of polygon.getPoints()) {
            stack.push(p)
        }


        while (stack.length !== 0) {
            const point = stack.pop()!
            painted.push(point)

            drawer.drawPixel(point.x, point.y)

            const nextPoints = [
                new Point(point.x, point.y + 1),
                new Point(point.x, point.y - 1),
                new Point(point.x + 1, point.y),
                new Point(point.x - 1, point.y)
            ].filter((it) => polygon.isInside(it)).filter((it) => !isPointsEqual(it, painted))

            for (const p of nextPoints) {
                stack.push(p)
            }
        }
    }
}
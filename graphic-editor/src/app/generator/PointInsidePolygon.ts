import PixelDrawer from "../algorithms/drawer/PixelDrawer";
import PolygonDrawObject from "../algorithms/drawer/PolygonDrawObject";
import DrawObject from "../objects/DrawObject";
import Point from "../objects/Point";
import { any } from "../utils/arrays";
import { GeneratorContext, ObjectGenerator } from "./ObjectGenerator";

export default class PointInsidePolygon extends ObjectGenerator {
    
    obj: ColorPoint | null = null

    move(ctx: GeneratorContext, x: number, y: number): void {
        if (this.obj === null) {
            this.obj = new ColorPoint(new Point(x, y), 'red')
        } else {
            this.obj.point.x = x
            this.obj.point.y = y
            
            if (any(ctx.getObjects(), (obj: DrawObject) => obj instanceof PolygonDrawObject ? obj.inside(this.obj!.point) : false )) {
                this.obj.color = 'green'
            }
            else {
                this.obj.color = 'red'
            }

            ctx.add(this.obj)
            ctx.repaint()
            ctx.remove(this.obj)
        }
    }

}

class ColorPoint extends DrawObject {
    point: Point
    color: string
    
    constructor(point: Point, color: string) {
        super()
        this.point = point
        this.color = color
    }

    draw(drawer: PixelDrawer): void {
        drawer.drawColorPixel(this.point.x, this.point.y, this.color)
    }

    getPoints(): Point[] {
        return []
    }
}
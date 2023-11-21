import PixelDrawer from "../algorithms/drawer/PixelDrawer";
import DrawObject from "../objects/DrawObject";
import Point from "../objects/Point";
import PolygonDrawObject from "../objects/PolygonDrawObject";
import { any } from "../utils/arrays";
import { GeneratorContext, ObjectGenerator } from "./ObjectGenerator";

export default class PointInsidePolygon extends ObjectGenerator {
    
    obj: ColorPoint | null = null

    end(ctx: GeneratorContext): void {
        this.obj = null
        ctx.repaint()
    }

    move(ctx: GeneratorContext, x: number, y: number): void {
        if (this.obj === null) {
            this.obj = new ColorPoint(new Point(x, y), 'red')
        } else {
            this.obj.point.x = x
            this.obj.point.y = y
            
            this.obj.color = 'black'
            for(const e of ctx.getObjects()) {
                if(e instanceof PolygonDrawObject) {
                    const obj = e as PolygonDrawObject
                    if(obj.isInside(this.obj!!.point)) {
                        if(obj.isHull())
                            this.obj.color = 'yellow'
                        else
                            this.obj.color = 'green'

                        break
                    }
                }
            }
            if(this.obj.color === 'black')
                this.obj.color = 'red'

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
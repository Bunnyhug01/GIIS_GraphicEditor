import FillDrawer from "../algorithms/drawer/FillDrawer";
import DebugDrawObject from "../objects/DebugDrawObject";
import DrawObject from "../objects/DrawObject";
import FillPolygonObject from "../objects/FillPolygonObject";
import Point from "../objects/Point";
import PolygonDrawObject from "../objects/PolygonDrawObject";
import { GeneratorContext, ObjectGenerator } from "./ObjectGenerator";

export default class FillPolygonGenerator extends ObjectGenerator {
    
    obj: DrawObject | null = null
    filler: FillDrawer

    constructor(filler: FillDrawer) {
        super()

        this.filler = filler
    }

    getPolygon(mouse: Point, ctx: GeneratorContext): PolygonDrawObject | null {
        
        for (const p of ctx.getObjects()) {
            if (p instanceof PolygonDrawObject && p.isInside(mouse)) {
                return p
            }
        }
        return null
    }

    begin(ctx: GeneratorContext, x: number, y: number) {
        this.move(ctx, x, y)
    }

    end(ctx: GeneratorContext) {
        this.obj = null
    }

    move(ctx: GeneratorContext, x: number, y: number): void {
        const polygon = this.getPolygon(new Point(x, y), ctx)
        let obj = this.obj

        if (obj !== null) {
            ctx.remove(obj)
        }
        
        if (polygon !== null) {
            obj = new FillPolygonObject(polygon, this.filler)
            
            ctx.add(obj)
            this.obj = obj
        }

        ctx.repaint()
    }

    click(ctx: GeneratorContext, x: number, y: number): void {
        const obj = this.obj

        if (obj !== null) {
            if (ctx.isDebug()) {
                ctx.remove(obj)
                const debug = new DebugDrawObject(obj)
                ctx.add(debug)
            }

            this.obj = null
        }

    }
}
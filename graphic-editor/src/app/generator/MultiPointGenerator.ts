import DrawObject from "../objects/DrawObject";
import Point from "../objects/Point";
import { ObjectGenerator, GeneratorContext } from "./ObjectGenerator";

export default class MultiPointGenerator extends ObjectGenerator {
    
    private _points: Point[] = [];
    private _mouse: Point | null = null;

    newObject(points: Point[]): DrawObject {throw new Error()}

    end(ctx: GeneratorContext) {
        this._points = [];
        this._mouse = null;
    }

    move(ctx: GeneratorContext, x: number, y: number): void {
		let mouse = this._mouse;
		if (mouse === null)
			return
        mouse.x = x;
        mouse.y = y;
		ctx.repaint()
    }

    click(ctx: GeneratorContext, x: number, y: number): void {
        if (this._points.length === 0) {
            let point = new Point(x, y);
            this._points.push(point);

            let obj = this.newObject(this._points);
            ctx.add(obj);
            ctx.repaint()
        }
        let point = new Point(x, y);
        this._points.push(point);
        this._mouse = point;
		ctx.repaint()
    }
}
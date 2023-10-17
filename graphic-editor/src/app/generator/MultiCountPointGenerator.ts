import DebugDrawObject from "../objects/DebugDrawObject";
import DrawObject from "../objects/DrawObject";
import Point from "../objects/Point";
import { ObjectGenerator, GeneratorContext } from "./ObjectGenerator";

export default class MultiCountPointGenerator extends ObjectGenerator {

    private _points: Point[] = [];
	private _mouse: Point | null = null;
	private _obj: DrawObject | null = null;

	count: number;

	constructor(count: number) {
		super();
		this.count = count;
	}

	newObject(points: Point[]): DrawObject { throw new Error() }

	move(ctx: GeneratorContext, x: number, y: number) {
		let mouse = this._mouse;

		if (mouse === null) {
			return
		}

		mouse.x = x;
		mouse.y = y;
	}

	click(ctx: GeneratorContext, x: number, y: number) {
		if(this._points.length === this.count) {
			if(ctx.isDebug()) {
				let line = this._obj!!;
				ctx.remove(line);
				line = new DebugDrawObject(line);
				ctx.add(line);
			}
			this._points = [];
			this._obj = null;
			this._mouse = null;
			return
		}
		let point = new Point(x, y);
		this._points.push(point);
		if(this._points.length == (this.count - 1)) {
			let mouse = new Point(x, y);
			this._mouse = mouse;
			this._points.push(mouse);
			let obj = this.newObject(this._points);
			this._obj = obj;
			ctx.add(obj);
		}
	}
}
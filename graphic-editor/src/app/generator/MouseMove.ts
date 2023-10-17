import Point from "../objects/Point";
import { GeneratorContext, ObjectGenerator } from "./ObjectGenerator";

export default class MouseMove extends ObjectGenerator {
    private _mouse: Point | null = null
	private _lastX = 0
	private _lastY = 0

	move(ctx: GeneratorContext, x: number, y: number) {
		let mouse = this._mouse

        if (mouse === null) {
            return
        }

		mouse.x += x - this._lastX
		mouse.y += y - this._lastY
		this._lastX = x
		this._lastY = y
	}

	// press(ctx: GeneratorContext, x: number, y: number) {
	// 	mouse = ctx.flatMap { it }.minBy { it.distance(x, y) }
	// 	lastX = x
	// 	lastY = y
	// }

	// override fun release(ctx: ObjectGenerator.Context, x: Int, y: Int) {
	// 	mouse = null
	// }
}
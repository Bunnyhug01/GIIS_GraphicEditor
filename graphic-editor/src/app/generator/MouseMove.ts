import { sqrt } from "mathjs";
import Point from "../objects/Point";
import { GeneratorContext, ObjectGenerator } from "./ObjectGenerator";

import { minBy } from "../utils/arrays";

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

		ctx.repaint()
	}

	press(ctx: GeneratorContext, x: number, y: number) {
		this._mouse = minBy(ctx.getObjects().flatMap(x => x.getPoints()), (p: Point) => distance(p, x, y))
		this._lastX = x
		this._lastY = y
	}

	release(ctx: GeneratorContext, x: number, y: number) {
		this._mouse = null
	}
}

function distance(p: Point, x: number, y: number): number {
	const dx = p.x - x
	const dy = p.y - y
	return sqrt(dx * dx + dy * dy) as number
}


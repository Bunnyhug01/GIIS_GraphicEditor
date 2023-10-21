import Point from "@/app/objects/Point";
import PixelDrawer from "../PixelDrawer";
import TwoPointDrawer from "../TwoPointDrawer";


export default class ParabolaDrawer extends TwoPointDrawer {
	draw(drawer: PixelDrawer, point1: Point, point2: Point): void {
		drawParabola(drawer, point1.x, point1.y, point2.y, Math.abs(point2.x - point1.x))
	}
}


function drawParabola(drawer: PixelDrawer, x0: number, y0: number, y1: number, p: number) {

	let x:number = 0;
	let y:number = 0
	let Sd:number = (x + 1) * (x + 1) - 2 * p * (y + 1);
	let Sv:number = (x + 1) * (x + 1) - 2 * p * y;
	let Sh:number = x * x - 2 * p * (y + 1);

	while(y0 - y > y1) {
		drawer.drawPixel(x0 - x, y0 - y);
		drawer.drawPixel(x0 + x, y0 - y);

		if(Math.abs(Sh) <= Math.abs(Sv)) {
			if(Math.abs(Sd) < Math.abs(Sh)) x++;
			y++;
		} else {
			if(Math.abs(Sv) > Math.abs(Sd)) y++;
			x++;
		}

		Sd = (x + 1) * (x + 1) - 2 * p * (y + 1);
		Sv = (x + 1) * (x + 1) - 2 * p * y;
		Sh = x * x - 2 * p * (y + 1);
	}

}
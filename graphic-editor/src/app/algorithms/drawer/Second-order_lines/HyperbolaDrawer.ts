import Point from "@/app/objects/Point";
import PixelDrawer from "../PixelDrawer";
import TwoPointDrawer from "../TwoPointDrawer";


export default class HyperbolaDrawer extends TwoPointDrawer {

	draw(drawer: PixelDrawer, point1: Point, point2: Point): void {
		let a:number = Math.abs(point2.x - point1.x)
		let b:number = Math.abs(point2.y - point1.y)
		drawHyperbola(drawer, point2.x, point2.y, a, b)
	}
}


function drawPixel(drawer: PixelDrawer, xc:number, yc:number, x:number, y:number) {

    drawer.drawPixel(xc - x, yc - y);
    drawer.drawPixel(xc - x, yc + y);
    drawer.drawPixel(xc + x, yc - y);
    drawer.drawPixel(xc + x, yc + y);

}


function drawHyperbola(drawer: PixelDrawer, x2: number, y2: number, a: number, b: number, bound: number = 1000) {
    
	let x: number = a;
	let y: number = 0;

    let a_sqrt: number = a * a;
	let b_sqrt: number = b * b;

    let tworx2: number = 2 * a_sqrt;
	let twory2: number = 2 * b_sqrt;

    let x_slop: number = 2 * twory2 * (x + 1);
	let y_slop: number = 2 * tworx2;

    let mida: number = x_slop / 2;
	let midb: number = y_slop / 2;

	let d: number = tworx2 - b_sqrt * (1 + 2 * a) + midb;

	while((d < x_slop) && (y <= bound)) {

		drawPixel(drawer, x2, y2, x, y);

		if(d >= 0) {
			d -= x_slop;
			x++;
			x_slop += 2 * tworx2;
		}
		d += tworx2 + y_slop;
		y++;
		y_slop += 2 * tworx2;
	}

	d -= (x_slop + y_slop) / 2 + (a_sqrt + b_sqrt) - midb - mida;
	
    if(a === 0 || b === 0) {
        return [[]];
    }
	if(a > b) {
		while(y <= bound) {

			drawPixel(drawer, x2, y2, x, y);
            
			if(d <= 0) {
				d += y_slop;
				y++;
				y += 2 * tworx2;
			}
			d -= twory2 - x_slop;
			x++;
			x_slop += 2 * twory2;
		}
    }

}
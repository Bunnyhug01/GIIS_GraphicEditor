export default function drawHyperbolaSecond(ctx: CanvasRenderingContext2D, coords: number[], secondCoords: number[], stroke = 'black', pixelSize:number = 1, bound: number = 1000) {
    
    if (stroke) {
        ctx.fillStyle = stroke;
    }

    let coordinates:number[][] = [];

    const x1:number = Math.floor(coords[0] / pixelSize);
    const y1:number = Math.floor(coords[1] / pixelSize);

    const x2:number = Math.floor(secondCoords[0] / pixelSize);
    const y2:number = Math.floor(secondCoords[1] / pixelSize);

    const a:number = Math.abs(x2 - x1);
    const b:number = Math.abs(y2 - y1);

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
		coordinates.push(...drawPixel(ctx, x2, y2, x, y, pixelSize));
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
			coordinates.push(...drawPixel(ctx, x2, y2, x, y, pixelSize));
            
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

    return coordinates;
}

function drawPixel(ctx: CanvasRenderingContext2D, xc:number, yc:number, x:number, y:number, pixelSize:number=1):number[][] {
    const coordinates:number[][] = [];

    const xCord = Math.floor(xc - x) * pixelSize;
    const yCord = Math.floor(yc - y) * pixelSize;

    const xCord2 = Math.floor(xc + x) * pixelSize;
    const yCord2 = Math.floor(yc + y) * pixelSize;

    ctx.fillRect(xCord, yCord, pixelSize, pixelSize);
    ctx.fillRect(xCord, yCord2, pixelSize, pixelSize);
    ctx.fillRect(xCord2, yCord, pixelSize, pixelSize);
    ctx.fillRect(xCord2, yCord2, pixelSize, pixelSize);

    coordinates.push([xCord, yCord], [xCord, yCord2], [xCord2, yCord], [xCord2,yCord2]);

    return coordinates;
}
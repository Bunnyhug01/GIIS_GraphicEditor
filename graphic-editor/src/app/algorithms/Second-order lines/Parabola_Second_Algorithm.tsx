export default function drawParabolaSecond(ctx: CanvasRenderingContext2D, startPoints: number[], endPoints: number[], stroke = 'black', pixelSize:number = 1): number[][] {
    if (stroke) {
        ctx.fillStyle = stroke;
    }
    
    const coordinates:number[][] = [];

    const p:number = 2;

    const x0:number = Math.floor(startPoints[0]) / pixelSize;
    const y0:number = Math.floor(startPoints[1]) / pixelSize;

    const xEnd:number = Math.floor(endPoints[0]) / pixelSize;
    const yEnd:number = Math.floor(endPoints[1]) / pixelSize;

	let x:number = 0;
	let y:number = 0
	let Sd:number = (x + 1) * (x + 1) - 2 * p * (y + 1);
	let Sv:number = (x + 1) * (x + 1) - 2 * p * y;
	let Sh:number = x * x - 2 * p * (y + 1);

	while(y0 - y > yEnd) {
        const xCord = Math.floor(x0 - x) * pixelSize;
        const xCord2 = Math.floor(x0 + x) * pixelSize;
        const yCord = Math.floor(y0 - y) * pixelSize;

		ctx.fillRect(xCord, yCord, pixelSize, pixelSize);
		ctx.fillRect(xCord2, yCord, pixelSize, pixelSize);

        coordinates.push([xCord, yCord], [xCord2, yCord]);

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
    return coordinates;
}
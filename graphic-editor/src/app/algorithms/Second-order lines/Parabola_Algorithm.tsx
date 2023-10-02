export default function drawParabola(ctx: CanvasRenderingContext2D, center: number[], arc: number[], stroke = 'black', pixelSize:number = 1): number[][] {
    
    if (stroke) {
        ctx.fillStyle = stroke;
    }

    let coordinates:number[][] = [];

    const xCenter:number = Math.floor(center[0] / pixelSize);
    const yCenter:number = Math.floor(center[1] / pixelSize);

    const aArc:number = Math.floor(arc[0] / pixelSize);
    const bArc:number = Math.floor(arc[1] / pixelSize);

    const a:number = Math.abs(aArc - xCenter);
    const b:number = Math.abs(bArc - yCenter);

    let _x:number = 0;
    let _y:number = b;

    const a_sqr:number = a * a;
    const b_sqr:number = b * b;
    
    let delta:number = 4 * b_sqr * ((_x + 1) * (_x + 1)) + a_sqr * ((2 * _y - 1) * (2 * _y - 1)) - 4 * a_sqr * b_sqr;

    while(a_sqr * (2 * _y - 1) > 2 * b_sqr * (_x + 1)) {
        coordinates.push(...pixel4(ctx, xCenter, yCenter, _x, _y, pixelSize));
        if (delta < 0) {
            _x++;
            delta += 4 * b_sqr * (2 * _x + 3);
        } else {
            _x++;
            delta = delta - 8 * a_sqr * (_y - 1) + 4 * b_sqr * (2 * _x + 3);
			_y--;
        }
    }
    delta = b_sqr * ((2 * _x + 1) * (2 * _x + 1)) + 4 * a_sqr * ((_y + 1) * (_y + 1)) - 4 * a_sqr * b_sqr;

    while(_y + 1 != 0)
	{   
		coordinates.push(...pixel4(ctx, xCenter, yCenter, _x, _y, pixelSize));
		if(delta < 0)
		{
			_y--;
			delta += 4 * a_sqr * (2 * _y + 3);
		} else
		{
			_y--;
			delta = delta - 8 * b_sqr * (_x + 1) + 4 * a_sqr * (2 * _y + 3);
			_x++;
		}
	}

    return coordinates;
}

function pixel4 (ctx: CanvasRenderingContext2D, x:number, y:number, _x:number, _y:number, pixelSize:number = 1): number[][] {
    const coordinates:number[][] = [];
    
    const xCord = Math.floor(x + _x) * pixelSize;
    const yCord = Math.floor(y + _y) * pixelSize;

    const xCord2 = Math.floor(x - _x) * pixelSize;

    ctx.fillRect(xCord, yCord, pixelSize, pixelSize);
	ctx.fillRect(xCord2, yCord, pixelSize, pixelSize);

    coordinates.push([xCord, yCord], [xCord2, yCord]);

    return coordinates;
}
export default function drawCircle(ctx: CanvasRenderingContext2D, center: number[], arc: number[], stroke = 'black', pixelSize:number = 1): number[][] {
    
    if (stroke) {
        ctx.fillStyle = stroke;
    }

    const coordinates:number[][] = [];

    const xCenter:number = Math.floor(center[0] / pixelSize);
    const yCenter:number = Math.floor(center[1] / pixelSize);
    
    const xArc:number = Math.floor(arc[0] / pixelSize);
    const yArc:number = Math.floor(arc[1] / pixelSize);

    const dx:number = xArc - xCenter;
    const dy:number = yArc - yCenter;
    const R:number = Math.floor(Math.sqrt(dx * dx + dy));

    let x:number = 0;
    let y:number = R;

    let delta:number = 1 - 2 * R;
    let error:number = 0;
    while (y >= x) {
        const x1:number = Math.floor(xCenter + x) * pixelSize;
        const y1:number = Math.floor(yCenter + y) * pixelSize;

        const x2:number = Math.floor(xCenter - x) * pixelSize;
        const y2:number = Math.floor(yCenter - y) * pixelSize;

        const x3:number = Math.floor(xCenter + y) * pixelSize;
        const y3:number = Math.floor(yCenter + x) * pixelSize;

        const x4:number = Math.floor(xCenter - y) * pixelSize;
        const y4:number = Math.floor(yCenter - x) * pixelSize;

        ctx.fillRect(x1, y1, pixelSize, pixelSize);
        ctx.fillRect(x1, y2, pixelSize, pixelSize);
        ctx.fillRect(x2, y1, pixelSize, pixelSize);
        ctx.fillRect(x2, y2, pixelSize, pixelSize);
        ctx.fillRect(x3, y3, pixelSize, pixelSize);
        ctx.fillRect(x3, y4, pixelSize, pixelSize);
        ctx.fillRect(x4, y3, pixelSize, pixelSize);
        ctx.fillRect(x4, y4, pixelSize, pixelSize);

        coordinates.push([x1, y1], [x1, y2], [x2, y1], [x2, y2], [x3, y3], [x3, y4], [x4, y3], [x4, y4])

        error = 2 * (delta + y) - 1;
        if ((delta < 0) && (error <= 0)) {
            delta += 2 * ++x + 1;
            continue;
        }
        if ((delta > 0) && (error > 0)) {
            delta -= 2 * --y + 1;
            continue;
        }
        delta += 2 * (++x - --y);
    }

    return coordinates;
}
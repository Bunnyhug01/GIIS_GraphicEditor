export default function debugGrid(ctx: CanvasRenderingContext2D, width:number, height:number, pixelSize:number) {
    for (let i = 0; i < width; i += pixelSize) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i, height);

        ctx.moveTo(0, i);
        ctx.lineTo(width, i);
    }
    ctx.strokeStyle = "#f0f0f0";
    ctx.stroke();
}
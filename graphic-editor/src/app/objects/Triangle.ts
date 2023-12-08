// import { Line } from "./Line";
// import Point from "./Point";

// export default class Triangle {
//     constructor(public a: Point, public b: Point, public c: Point) {}

//     get center(): Point {
//         const abPerpendicular = new Line(this.a, this.b).perpendicular;
//         const acPerpendicular = new Line(this.a, this.c).perpendicular;
//         const crossProduct = abPerpendicular.start.x * acPerpendicular.end.y - abPerpendicular.start.y * acPerpendicular.end.x;
//         if (crossProduct !== 0) {
//             const x = (abPerpendicular.start.y * acPerpendicular.end.x - abPerpendicular.start.x * acPerpendicular.end.y) / crossProduct;
//             const y = (abPerpendicular.start.x * acPerpendicular.end.y - abPerpendicular.start.y * acPerpendicular.end.x) / crossProduct;
//             return new Point(x, y);
//         } else {
//             const x = (this.a.x + this.b.x + this.c.x) / 3;
//             const y = (this.a.y + this.b.y + this.c.y) / 3;
//             return new Point(x, y);
//         }
//     }

//     get radius(): number {
//         const dx = this.center.x - this.a.x;
//         const dy = this.center.y - this.a.y;
//         return Math.floor(Math.sqrt(dx * dx + dy * dy) + 0.5);
//     }
// }

// function distanceSqr(a: Point, b: Point): number {
//     const dx = a.x - b.x;
//     const dy = a.y - b.y;
//     return dx * dx + dy * dy;
// }

// function distance(a: Point, b: Point): number {
//     return Math.floor(Math.sqrt(distanceSqr(a, b) + 0.0) + 0.5);
// }

import { matrix, multiply } from "mathjs";
import FourPointDrawer from "../FourPointDrawer";
import Point from "@/app/objects/Point";
import PixelDrawer from "../PixelDrawer";
import { rangeStep } from "../../../utils/range";

const MATRIX = matrix([
    [-1.0, 3.0, -3.0, 1.0],
    [3.0, -6.0, 3.0, 0.0],
    [-3.0, 3.0, 0.0, 0.0],
    [1.0, 0.0, 0.0, 0.0],
]);

export default class BezieDrawer extends FourPointDrawer {

    draw(drawer: PixelDrawer, point1: Point, point2: Point, point3: Point, point4: Point): void {
        let matrixData = matrix([
            [point1.x, point1.y],
            [point2.x, point2.y],
            [point3.x, point3.y],
            [point4.x, point4.y]
        ])

        matrixData = multiply(MATRIX, matrixData)
        for (let t of rangeStep(0, 1, 0.0001)) {
            let tMatrix = matrix([
                [t ** 3, t ** 2, t, 1],
            ])
            
            tMatrix = multiply(tMatrix, matrixData)
            drawer.drawPixel(tMatrix.get([0, 0]), tMatrix.get([0, 1]))
        }
    }

}
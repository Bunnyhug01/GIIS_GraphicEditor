import Point from "../objects/Point";

export default function isPointsEqual(point1: Point, painted: Point[]) {
    
    for (const point2 of painted) {
        if (point1.x === point2.x && point1.y === point2.y) {
            return true
        }
    }
    
    return false 
}
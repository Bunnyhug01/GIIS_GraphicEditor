import { Line } from "../objects/Line";

export default function isLinesEqual(line1: Line, painted: Line[]) {
    
    for (const line2 of painted) {
        if (line1.point1.x === line2.point1.x && line1.point1.y === line2.point1.y) {
            if (line1.point2.x === line2.point2.x && line1.point2.y === line2.point2.y) {
                return true
            }
        }
    }
    
    return false 
}
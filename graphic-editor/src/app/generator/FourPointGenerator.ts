import FourPointDrawer from '../algorithms/drawer/FourPointDrawer'
import DrawObject from '../objects/DrawObject'
import FourPointDrawObject from '../objects/FourPointDrawObject'
import Point from '../objects/Point'
import MultiCountPointGenerator from './MultiCountPointGenerator'

export default class FourPointGenerator extends MultiCountPointGenerator {
    
    drawer: FourPointDrawer
    
    constructor(drawer: FourPointDrawer) {
        super(4)
        this.drawer = drawer
    }

    newObject(points: Point[]): DrawObject {
        return new FourPointDrawObject(points[0], points[1], points[2], points[3], this.drawer)
    }
}
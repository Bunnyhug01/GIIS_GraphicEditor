import Point from "@/app/objects/Point";
import PixelDrawer from "../PixelDrawer";
import TwoPointDrawer from "../TwoPointDrawer";


export default class EllipseDrawer extends TwoPointDrawer {
    
    draw(drawer: PixelDrawer, point1: Point, point2: Point): void {
        const a = Math.abs(point2.x - point1.x)
        const b = Math.abs(point2.y - point1.y)

        drawEllipse(drawer, point1.x, point2.y, a, b)
    }

}


function pixel4(drawer: PixelDrawer, x:number, y:number, _x:number, _y:number) {
    drawer.drawPixel(x + _x, y + _y)
    drawer.drawPixel(x + _x, y - _y)
    drawer.drawPixel(x - _x, y - _y)
    drawer.drawPixel(x - _x, y + _y)
}


function drawEllipse(drawer: PixelDrawer, x: number, y: number, a: number, b: number) {
    let _x:number = 0 // Компонента x
    let _y:number = b // Компонента y

    const a_sqr:number = a * a // a^2, a - большая полуось
    const b_sqr:number = b * b // b^2, b - малая полуось
    
    let delta:number =
        4 * b_sqr * ((_x + 1) * (_x + 1)) + a_sqr * ((2 * _y - 1) * (2 * _y - 1)) - 4 * a_sqr * b_sqr // Функция координат точки (x+1, y-1/2)

    while(a_sqr * (2 * _y - 1) > 2 * b_sqr * (_x + 1)) // Первая часть дуги
    {
        pixel4(drawer, x, y, _x, _y)
        if(delta < 0) // Переход по горизонтали
        {
            _x++
            delta += 4 * b_sqr * (2 * _x + 3)
        } else  // Переход по диагонали
        {
            _x++
            delta = delta - 8 * a_sqr * (_y - 1) + 4 * b_sqr * (2 * _x + 3)
            _y--
        }
    }
    delta =
        b_sqr * ((2 * _x + 1) * (2 * _x + 1)) + 4 * a_sqr * ((_y + 1) * (_y + 1)) - 4 * a_sqr * b_sqr // Функция координат точки (x+1/2, y-1)
    
        while(_y + 1 != 0) // Вторая часть дуги, если не выполняется условие первого цикла, значит выполняется a^2(2y - 1) <= 2b^2(x + 1)
    {
        pixel4(drawer, x, y, _x, _y)
        if(delta < 0) // Переход по вертикали
        {
            _y--
            delta += 4 * a_sqr * (2 * _y + 3)
        } else  // Переход по диагонали
        {
            _y--
            delta = delta - 8 * b_sqr * (_x + 1) + 4 * a_sqr * (2 * _y + 3)
            _x++
        }
    }

}
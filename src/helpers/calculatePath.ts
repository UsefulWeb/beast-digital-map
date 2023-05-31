import {ILocationLinkItem, IMapLocationItem} from "../util/interfaces";
import Color from "color";
import {half, scale, vw} from "../util/common";

export type IPoint = [number, number];
export const getLocationCenter = (item: IMapLocationItem): IPoint => {
    const {top, left, size} = item;
    return [
        left + half(size),
        top + half(size)
    ];
}
const getCenter = (p0: IPoint, p1: IPoint): IPoint => {
    return [
        half(p0[0] + p1[0]),
        half(p0[1] + p1[1]),
    ];
}
const BASE_CURVINESS = 16;
const NEGATIVE_CURVINESS = [-40, -24, -20, -18, -17];
const POSITIVE_CURVINESS = [20, 18];
const getCurviness = (visitIndex: number) => {
    const isOdd = visitIndex % 2 !== 0;
    const sign = isOdd ? 1 : -1;
    const index = Math.floor(visitIndex / 2);

    const source = isOdd ? POSITIVE_CURVINESS : NEGATIVE_CURVINESS;

    return source[index] || BASE_CURVINESS * sign;
}
export const getControlPoint = (source: ILocationLinkItem, target: ILocationLinkItem, visitIndex: number): IPoint => {
    const from = source.location;
    const to = target.location;

    const fromCenter = getLocationCenter(from);
    const toCenter = getLocationCenter(to);
    const center = getCenter(fromCenter, toCenter);

    if (visitIndex === 0) {
        return center;
    }

    const sign = getCurviness(visitIndex - 1);
    const k = sign * visitIndex;
    const dX = Math.abs(fromCenter[0] - toCenter[0]);
    const dY = Math.abs(fromCenter[1] - toCenter[1]);

    if (dX > dY) {
        return [
            center[0],
            center[1] + k,
        ];
    }

    return [
        center[0] + k,
        center[1],
    ];
}
export const getStroke = (index: number, total: number, visitIndex: number) => {
    const orange = Color('#ff780a');
    const red = Color('#ff2626');
    const end = Color('#006778');
    const white = Color('#fff');

    if (index === total - 1) {
        return end;
    }
    if (visitIndex === 0) {
        return red;
    }
    if (visitIndex === 1) {
        return white;
    }
    return orange;
}

const getDX = (from: IPoint, to: IPoint) => to[0] - from[0];
const getDY = (from: IPoint, to: IPoint) => to[1] - from[1];
const getLeft = (points: IPoint[]) => Math.min(...points.map(p => p[0]));
const getTop = (points: IPoint[]) => Math.min(...points.map(p => p[1]));
const getBottom = (points: IPoint[]) => Math.max(...points.map(p => p[1]));
const getRight = (points: IPoint[]) => Math.max(...points.map(p => p[0]));

export interface RectOptions {
    points: IPoint[];
    padding: number
}

export const getBoundingRect = (options: RectOptions) => {
    const {points, padding} = options;

    const min: IPoint = [getLeft(points), getTop(points)];
    const max: IPoint = [getRight(points), getBottom(points)];

    const dX = getDX(min, max);
    const dY = getDY(min, max);
    const width = dX + padding;
    const height = dY + padding;
    const start: IPoint = [0, 0];
    const end: IPoint = [dX, dY];

    const translatedPoints: IPoint[] = points
        .map(p =>
            [getDX(p, max), getDY(p, max)]
        );

    return {
        from: [min[0] - padding / 2, min[1] - padding / 2],
        start,
        end,
        width,
        height,
        points: translatedPoints
    };
}

export interface CreatePathOptions {
    strokeWidth: number;
    ratio: number;
    visitIndex: number;
    source: ILocationLinkItem;
    target: ILocationLinkItem;
}

const getSkew = (from: IPoint, to: IPoint) => {
    const dX = getDX(from, to);
    const dY = getDY(from, to);

    if (dX === 0) {
        return - Math.PI / 2;
    }

    const tg = dY / dX;
    const rad = Math.atan(tg);

    if (dX < 0) {
        return rad - Math.PI;
    }

    return rad;
}

const rad2deg = (rad: number) => rad * 180 / Math.PI;


export enum PathRenderItemType {
    LINE_TO = 'lineTo',
    MOVE_TO = 'moveTo',
    QUADRATIC_CURVE_TO = 'quadraticCurveTo',
    ARC = 'arc',
    BEGIN_PATH = 'beginPath',
    CLOSE_PATH = 'closePath',
    FILL = 'fill',
    STROKE = 'stroke',
}

export interface PathRenderItem {
    type: PathRenderItemType;
    points?: IPoint[];
    arcOptions?: {
        radius: number;
        startAngle: number;
        endAngle: number;
    }
}

const createPathRenderItem = (type: PathRenderItemType, points?: IPoint[]) => ({
    type,
    points,
});

const arc = (point: IPoint, radius: number, startAngle: number, endAngle: number): PathRenderItem => ({
    type: PathRenderItemType.ARC,
    points: [point],
    arcOptions: {
        radius,
        startAngle,
        endAngle
    }
});

const beginPath = () => createPathRenderItem(PathRenderItemType.BEGIN_PATH);
const closePath = () => createPathRenderItem(PathRenderItemType.CLOSE_PATH);
const fill = () => createPathRenderItem(PathRenderItemType.FILL);
const stroke = () => createPathRenderItem(PathRenderItemType.STROKE);

const moveTo = (point: IPoint): PathRenderItem =>
    createPathRenderItem(PathRenderItemType.MOVE_TO, [point]);

const lineTo = (point: IPoint): PathRenderItem =>
    createPathRenderItem(PathRenderItemType.LINE_TO, [point]);

const quadraticCurveTo = (control: IPoint, to: IPoint): PathRenderItem =>
    createPathRenderItem(PathRenderItemType.QUADRATIC_CURVE_TO, [control, to])

const add = (offset: IPoint) => (point: IPoint) => [point[0] + offset[0], point[1] + offset[1]] as IPoint;
const subtract = (base: IPoint) => (point: IPoint) => [point[0] - base[0], point[1] - base[1]] as IPoint;

export const createPath = (options: CreatePathOptions) => {
    const {
        ratio,
        source,
        target,
        strokeWidth,
        visitIndex
    } = options;

    const k = (x: number) => scale(x, ratio);
    const scalePoint = (p: IPoint) => p.map(k) as IPoint;
    const makeMainLine = (points: IPoint[]) => {
        const [from, to, control] = points;
        return [
            moveTo(from),
            quadraticCurveTo(control, to)
        ]
    }

    const fromPoint = getLocationCenter(source.location);
    const toPoint = getLocationCenter(target.location);
    const controlPoint = getControlPoint(source, target, visitIndex);

    const points = [fromPoint, toPoint, controlPoint].map(scalePoint);
    const [from, to] = points;
    const R = Math.ceil(strokeWidth / 2);

    const skewRad = getSkew(from, to);
    const halfPI = half(Math.PI);
    // const skewDeg = rad2deg(skewRad);
    const dY = R * Math.sin(skewRad % halfPI);
    const dX = R * Math.cos(skewRad % halfPI);

    console.log({
        skewRad,
        dX,
        dY,
        R
    });

    // const topLineOffset: IPoint = [dX, dY + R];
    const topLineOffset: IPoint = [0 , -R];
    const bottomLineOffset: IPoint = [0, R];
    // const bottomLineOffset: IPoint = [-dX, -dY - R];

    const topPoints = points.map(add(topLineOffset));
    const bottomPoints = points.map(add(bottomLineOffset));

    const path = [
        beginPath(),
        arc(from, R, 0, 2 * Math.PI),
        closePath(),
        fill(),

        beginPath(),
        // ...makeMainLine(topPoints),
        moveTo(topPoints[0]),
        lineTo(bottomPoints[0]),
        lineTo(bottomPoints[1]),
        lineTo(topPoints[1]),
        // stroke(),
        // ...makeMainLine(bottomPoints),
        // moveTo(topPoints[0]),
        // lineTo(bottomPoints[0]),
        closePath(),
        fill(),

        beginPath(),
        arc(to, R, 0, 2 * Math.PI),
        closePath(),
        fill(),
    ];

    return path
}
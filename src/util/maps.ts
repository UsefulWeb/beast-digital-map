import smallMapImage from "../../public/images/maps/drenched-lands.png";
import largeMapImage from "../../public/images/maps/northern-expanse.png";

import smallMapData from "../../public/data/map/drenched-lands.json?url";
import largeMapData from "../../public/data/map/northern-expanse.json?url";
import {MapType} from "./interfaces";


export interface IMapInfo {
    image: string;
    data: string;
}

export type IMapCollection = {
    [index: string]: IMapInfo
}

export const maps: IMapCollection = {
    [MapType.DRENCHED_LANDS]: {
        image: smallMapImage,
        data: smallMapData,
    },
    [MapType.NORTHERN_EXPANSE]: {
        image: largeMapImage,
        data: largeMapData
    }
}
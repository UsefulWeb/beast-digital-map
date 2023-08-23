import smallMapImage from "../../public/images/maps/drenched-lands.png";
import smallHDMapImage from "../../public/images/maps/small_hd.jpg";
import largeMapImage from "../../public/images/maps/large.png";
import largeHDMapImage from "../../public/images/maps/large_hd.jpg";

// import smallMapData from "../../public/data/map_small.json?url";
import smallMapData from "../../public/data/map/drenched-lands.json?url";
import smallHDMapData from "../../public/data/map_small_hd.json?url";
import largeMapData from "../../public/data/map_large.json?url";
import largeHDMapData from "../../public/data/map_large_hd.json?url";
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
    },
    [MapType.SMALL_HD]: {
        image: smallHDMapImage,
        data: smallHDMapData,
    },
    [MapType.LARGE_HD]: {
        image: largeHDMapImage,
        data: largeHDMapData,
    }
}
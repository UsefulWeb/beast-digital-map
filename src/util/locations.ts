import cavesImg from "../../src/images/locations/caves.png?url";
import forestImg from "../../src/images/locations/forest.png?url";
import mixedImg from "../../src/images/locations/mixed.png?url";
import settlementImg from "../../src/images/locations/settlement.png?url";
import swampImg from "../../src/images/locations/swamp.png?url";

import {MapLocationType} from "./interfaces";

export interface MapLocationListItem {
    url: string;
    size: number
}

export const USER_LOCATION_TYPES = [
    MapLocationType.SWAMP,
    MapLocationType.CAVES,
    MapLocationType.FOREST,
    MapLocationType.SETTLEMENT
];

export const MapLocationImageList = {
    [MapLocationType.CAVES]: {
        url: cavesImg,
        size: 66
    },
    [MapLocationType.FOREST]: {
        url: forestImg,
        size: 66
    },
    [MapLocationType.MIXED]: {
        url: mixedImg,
        size: 69
    },
    [MapLocationType.SETTLEMENT]: {
        url: settlementImg,
        size: 127
    },
    [MapLocationType.SWAMP]: {
        url: swampImg,
        size: 66
    }
}
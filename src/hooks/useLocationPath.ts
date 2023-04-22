import {ILocationPath, MapLocationItem} from "../util/interfaces";
import {visitLocation} from "../components/helpers/locationPath";
import {useState} from "react";


export const useLocationPath = () => {
    const [locationPath, setLocationPath] = useState<MapLocationItem[]>([]);

    const onLocationVisit = (item: MapLocationItem) =>
        setLocationPath(
            visitLocation(locationPath, item)
        );

    return [locationPath, onLocationVisit];
};
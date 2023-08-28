import S from './MapSelector.module.scss';
import {MapType} from "../../../util/interfaces";
import {Button} from "../..";

export const mapTypes = [
    {
        type: MapType.DRENCHED_LANDS,
        title: <>the <br/>Drenched Lands</>
    },
    {
        type: MapType.NORTHERN_EXPANSE,
        title: <>the Northern<br/>Expanse</>
    }
];

export interface MapSelectorProps {
    onSelect?: (type: MapType) => void
}

export const MapSelector = (props: MapSelectorProps) => {
    const {
        onSelect = f => f,
    } = props;
    return (
          <div className={S.container}>
              {mapTypes.map(
                  (item, key: number) =>
                      <Button key={key} type={'fixed'} onClick={() => onSelect(item.type)}>{item.title}</Button>
              )}
          </div>
    );
}
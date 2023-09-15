import {MapSelector} from "../../organisms/MapSelector/MapSelector";
import {useNavigate} from "react-router-dom";
import S from "./Home.module.scss";

import logo from "../../../../public/images/logo_small.png";

export const Home = () => {
    const navigate = useNavigate();
    const onMapSelect = (type: string) => {
        navigate(`/map/${type}`);
    };
    return <>
        <div className={S.container}>
            <div className={S.image__container}>
                <img className={S.logo} src={logo} alt="Beast logo"/>
            </div>
            <MapSelector onSelect={onMapSelect}/>
            <div className={S.credits}>
                Made by <a target={'_blank'} href={'https://github.com/neizerth'} className={S.author}>@neizerth</a>.
                <br/>
                Background and logo are made by <a target={'_blank'} href={'https://studiomidhall.com/'} className={S.author}>Studio Midhall</a>.
            </div>
        </div>
    </>;
}
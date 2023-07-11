import { useState, useEffect } from "react";
import NavbarInteractive from '../../homepage/components/navbar-interactive'
import Link from "antd/es/typography/Link";
import Avt from "../../intro/images/avt.png"
import { sendRequest } from '../../../helpers/requestHelper';
import update5 from './img/update5.png';
import { useHistory } from 'react-router-dom';

const Foods = () => {
    const history = useHistory();
    const params = new URLSearchParams(location.search);
    const isStaff = params.get('staff');
    const [resIdParam, setResIdParan] = useState([]);
    const [menuInfo, setMenuInfo] = useState([]);
    const [paging, setPaging] = useState([1,2,3,4,5,6,7,8])
    let admin;
    if(isStaff !== 1){
        admin = true;
    }else{
        admin = false;
    }
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const resIdParamloc = params.get('res_id');
        setResIdParan(resIdParamloc);
        window.scrollTo(0, 0);
      }, []);
    useEffect(() => {
        fetchmenu();
     }, [resIdParam]);

    const fetchmenu = async () => {
        var url = `${ process.env.REACT_APP_SERVER }/api/v1/restaurant/`
        url +=`${resIdParam}/food`;
        console.log(url);
        const resp = await sendRequest({
            url: url,  //final link
            method: "GET",
          })
        setMenuInfo(resp.data['content'])
        let numOfPage = Math.round(menuInfo.length/10);
        let pages = [];
        for (let index = 1; index <= numOfPage; index++) {
            pages.push(index)
        }
        setPaging(pages)
      };
    const [slices, setSlices] = useState(0)

    return (
        <div className="wrapper">
            <NavbarInteractive />
            <div className="food-main">
            <div className="salutation">
				<strong> こんにちは、</strong>
				<div className="user-info">
					<Link className="img-container" to={`/profile`}>
						<img src={Avt} alt="" />
					</Link>
					<div className="user-coin d-flex mt-6"><img src="/library/dx/images/bnn-coin.png" alt="" className="coin-icon" /><strong>1000</strong></div>
				</div>
			</div>
            <div className="title-menu">
                <img src={update5} alt="" />
                <div>メニュー</div>
            </div>
            <div className="header">
                <div className="item item-header">順番</div>
                <div className="item item-header">フード名</div>
                <div className="item item-header">価値</div>
                <div className="item item-header">詳細</div>
            </div>
            <div className="content">
                {menuInfo.slice(slices, slices+10).map((item, index) => <div className="item item-content">
                    <div className="content-item">{index + 1+slices}</div>
                    <div className="content-item">{item.name}</div>
                    <div className="content-item">{item.price}</div>
                    <div className="content-item"><i class="fa fa-eye"> </i></div>
                </div>)}
            </div>
            <div className="pagging">
                <div className={"content-item"}></div>
                <div className="content-pagging">
                    <i onClick={() => setSlices(slices - 10 < 0 ? 0 : slices - 10)} class="fa fa-long-arrow-left" ></i>
                    {paging.map(item => <div onClick={() => {setSlices(item * 10 - 10)}} className={(slices+10) / 10 === item && "background-paging"}>{item}</div>)}
                    <i onClick={() => setSlices(slices + 10 > 70 ? 70 : slices + 10)} class="fa fa-long-arrow-right" ></i>
                </div>
            </div>
            </div>

        </div>
    )
}
export default Foods
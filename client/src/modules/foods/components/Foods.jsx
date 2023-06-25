import { useState, useEffect } from "react";
import NavbarInteractive from '../../homepage/components/navbar-interactive'
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
        var url = 'http://localhost:8000/api/v1/restaurant/'
        url +=`${resIdParam}/food`;
        console.log(url);
        const resp = await sendRequest({
            url: url,  //final link
            method: "GET",
          })
        setMenuInfo(resp.data['content'])
      };
    const [slices, setSlices] = useState(0)

    return (
        <div className="wrapper">
            <NavbarInteractive />
            <div className="food-main">
            <div className="title-menu">
                <img src={update5} alt="" />
                <div>Menu</div>
            </div>
            <div className="header">
                <div className="item item-header">順番</div>
                <div className="item item-header">フード名</div>
                <div className="item item-header">価値</div>
                <div className={admin ? 'item item-header' : 'hidden-data item item-header'}>アップデート</div>
                <div className={admin ? 'item item-header' : 'hidden-data item item-header'}>消す</div>
                <div className="item item-header">詳細</div>
            </div>
            <div className="content">
                {menuInfo.slice(slices, slices+10).map(item => <div className="item item-content">
                    <div className="content-item">{item.foodId}</div>
                    <div className="content-item">{item.name}</div>
                    <div className="content-item">{item.price}</div>
                    <div className={admin ? "content-item" : "hidden-data content-item"}><i class="fa fa-pencil"> </i></div>
                    <div className={admin ? "content-item" : "hidden-data content-item"}><i class="fa fa-trash"> </i></div>
                    <div className="content-item"><i class="fa fa-eye"> </i></div>
                </div>)}
            </div>
            <div className="pagging">
                <div className={!admin ? "content-item" : "add-food"}>料理を追加する</div>
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
import { useState } from "react";
import { columns, data, dataSource } from "./data";
import NavbarInteractive from "./navbar-interactive"
import { Space, Table, Tag } from 'antd';

const Foods = () => {

    const admin = false

    const newData = [];

    for (let i = 0; i < 80; i++) {
        const newDataObj = {
            data1: (i + 1).toString(),
            data2: data[i % 3].data2 + ' ' + i.toString(),
            data3: data[i % 3].data3,
        };
        newData.push(newDataObj);
    }
    const [slices, setSlices] = useState(0)

    return (
        <div className="wrapper">
            <NavbarInteractive />
            <div>

            <div className="header">
                <div className="item item-header">順番</div>
                <div className="item item-header">フード名</div>
                <div className="item item-header">価値</div>
                <div className={admin ? 'item item-header' : 'hidden-data item item-header'}>アップデート</div>
                <div className={admin ? 'item item-header' : 'hidden-data item item-header'}>消す</div>
                <div className="item item-header">詳細</div>
            </div>
            <div className="content">
                {newData.slice(slices, slices+10).map(item => <div className="item item-content">
                    <div className="content-item">{item.data1}</div>
                    <div className="content-item">{item.data2}</div>
                    <div className="content-item">{item.data3}</div>
                    <div className={admin ? "content-item" : "hidden-data content-item"}><i class="fa fa-pencil"> </i></div>
                    <div className={admin ? "content-item" : "hidden-data content-item"}><i class="fa fa-trash"> </i></div>
                    <div className="content-item"><i class="fa fa-eye"> </i></div>
                </div>)}
            </div>
            <div className="pagging">
                <div className="content-pagging">
                    <i onClick={() => setSlices(slices - 10 < 0 ? 0 : slices - 10)} class="fa fa-long-arrow-left" ></i>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                    <div>5</div>
                    <div>6</div>
                    <i onClick={() => setSlices(slices + 10 > 70 ? 70 : slices + 10)} class="fa fa-long-arrow-right" ></i>
                </div>
            </div>
            </div>

        </div>
    )
}
export default Foods
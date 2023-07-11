import React,{ useEffect, useState } from 'react'
import NavbarInteractive from '../foods/components/navbar-interactive';
import { sendRequest } from '../../helpers/requestHelper';
import Qr from './img/qr.png';
import Avt from './img/avt.png';
import crypto from './img/crypto.png'
import lock from './img/Lock.png'
import sao from './img/sao.png'


export const Profile = () => {
    
const [profile, setProfile] = useState({});

useEffect(() => {
    fetchProfile()
  }, []);

  const fetchProfile = async () => {
    var url = `${ process.env.REACT_APP_SERVER }/api/v1/user/3`
    const resp = await sendRequest({
        url: url,  //final link
        method: "GET",
      })
      setProfile(resp.data['content'])
  };
    return (
        <div className='profile-wrapper'>
            <NavbarInteractive />
            <div className='content'>
                <div className='image-profile'>
                    <div className='avt'><img src={profile.avatarLink ?? Avt} alt="" /></div>
                    <div className='text-left'>
                    <div className='title-1'>{profile.username}</div>
                    <div className='title-2'><img style={{maxWidth: "24px", marginRight: "10px"}} src={crypto} />{profile.point}</div>
                    <div className='title-3'><img style={{maxWidth: "20px", marginRight: "10px", paddingBlock: '5px'}} src={lock} />
                    <strong>情報変更</strong>
                    </div>
                    <div className='title-3'><img style={{maxWidth: "20px", marginRight: "10px", paddingBlock: '5px'}} src={lock} />
                    <strong>パスワード変更</strong>
                    </div>
                    </div>
                </div>
                <div className='content-right'>
                    <div className='title'>ユーザの情報</div>
                    <div className='head'>
                        <div className='text-right-1'>
                            <div className='title-1'>名前 <img src={sao} style={{maxWidth: "16px", maxHeight: "16px", marginTop: "4px", marginLeft: "4px"}} /></div>
                            <div className='title-2'>{profile.username}</div>

                            <div className='title-1'>Eメール  <img src={sao} style={{maxWidth: "16px", maxHeight: "16px", marginTop: "4px", marginLeft: "4px"}} /></div>
                            <div className='title-2 email'>{profile.email}</div>
                        </div>
                        <div className='qr'>
                            <img src={Qr} alt="" />
                        </div>
                    </div>
                    <div className='right-bot'>
                        <div className='title-bottom'>
                            <div className='title-1'>電話番号  <img src={sao} style={{maxWidth: "16px", maxHeight: "16px", marginBottom: "10px", marginLeft: "4px"}} /></div>
                            <div className='title-2'>{profile.phone}</div>
                        </div>
                        <div className='title-bottom'>
                            <div className='title-1'>性別  <img src={sao} style={{maxWidth: "16px", maxHeight: "16px", marginBottom: "10px", marginLeft: "4px"}} /></div>
                            <div className='title-2'>{profile.sex}</div>
                        </div>
                    </div>
                    <div className='end-right'>
                        <div className='title-1'>場所</div>
                        <div className='title-2'>{profile.address}</div>
                    </div>
                    <button className='submit'>編集</button>
                </div>
            </div>
        </div>
    )
}

import React from 'react'
import NavbarInteractive from '../foods/components/navbar-interactive';
import Qr from './img/qr.png';
import Avt from './img/avt.png';

export const Profile = () => {
    return (
        <div className='profile-wrapper'>
            <NavbarInteractive />
            <div className='content'>
                <div className='image-profile'>
                    <div className='avt'><img src={Avt} alt="" /></div>
                    <div className='text-left'>
                    <div className='title-1'>佐藤和真</div>
                    <div className='title-2'>1000</div>
                    <div className='title-3'>情報変更</div>
                    <div className='title-3'>パスワード変更</div>
                    </div>
                </div>
                <div className='content-right'>
                    <div className='title'>ユーザの情報</div>
                    <div className='head'>
                        <div className='text-right-1'>
                            <div className='title-1'>名前 </div>
                            <div className='title-2'>佐藤和真</div>

                            <div className='title-1'>Eメール</div>
                            <div className='title-2 email'>satokazuma@gmail.com</div>
                        </div>
                        <div className='qr'>
                            <img src={Qr} alt="" />
                        </div>
                    </div>
                    <div className='right-bot'>
                        <div className='title-bottom'>
                            <div className='title-1'>電話番号</div>
                            <div className='title-2'>0123456789</div>
                        </div>
                        <div className='title-bottom'>
                            <div className='title-1'>性別</div>
                            <div className='title-2'>Male</div>
                        </div>
                    </div>
                    <div className='end-right'>
                        <div className='title-1'>場所</div>
                        <div className='title-2'>ベトナム、ハノイ市、ハイバーチュン地区、<br />
                            Bach Khoa区、Dai Co Viet通り1番地</div>
                    </div>
                    <button className='submit'>編集</button>
                </div>
            </div>
        </div>
    )
}

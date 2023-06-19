import React from 'react';
import { connect } from 'react-redux';
import { withTranslate, IntlActions } from 'react-redux-multilingual';

const Footer = ({ translate }) => {
    return (
        // <React.Fragment>
        //     <section id="dx-footer" className="dx-container">

        //         <div className="row">
        //             <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
        //                 <h4 className="text-center text-bold">{translate('intro.footer.about_us.title')}</h4>
        //                 <p>{translate('intro.footer.about_us.content')}</p>
        //             </div>
        //             <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
        //                 <h4 className="text-center text-bold">{translate('intro.footer.care.title')}</h4>
        //                 <ul className="dx-footer care">
        //                     <li className="dx-footer care item p-center-h">
        //                         <i className="fa fa-square"></i>
        //                         {translate('intro.footer.care.content.company')}<a href="https://vnist.vn/" style={{ marginLeft: 2 }}> VNIST </a>
        //                     </li>
        //                     <li className="dx-footer care item p-center-h">
        //                         <i className="fa fa-square"></i>
        //                         {translate('intro.footer.care.content.research')}
        //                     </li>
        //                 </ul>
        //             </div>
        //             <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
        //                 <h4 className="text-center text-bold">{translate('intro.footer.media.title')}</h4>
        //                 <span className="p-center media">
        //                     <img className="dx-content1 image" src='/library/dx/images/facebook.png' />
        //                     <img className="dx-content1 image" src='/library/dx/images/youtube.png' />
        //                     <img className="dx-content1 image" src='/library/dx/images/twitter.png' />
        //                     <img className="dx-content1 image" src='/library/dx/images/pinterest.png' />
        //                     <img className="dx-content1 image" src='/library/dx/images/google-plus.png' />
        //                 </span>
        //             </div>
        //         </div>

        //     </section>

        //     <footer className="dx-footer dx-container">
        //         <div className="copyright">{translate('intro.footer.copyright')}</div>
        //     </footer>
        // </React.Fragment>
        <React.Fragment>
            <section id="dx-footer" className="bnn-container">
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4" >
                        <div className="row text-center">
                            <img src="https://i.postimg.cc/0QVqgsx9/tabeyou-logo.png" alt="" />
                        </div>
                        <div className="row">
                            <h4 className="text-center text-bold">TABEYOU</h4>
                        </div>
                        <div className="bnn-social-logo-list">
                            <div className="bnn-social-logo">
                                <img className="bnn-social-icon" src='/library/dx/images/bnn-facebook.png' />
                            </div>
                            <div className="bnn-social-logo">
                                <img className="bnn-social-icon" src='/library/dx/images/bnn-instagram.png' />
                            </div>
                            <div className="bnn-social-logo">
                                <img className="bnn-social-icon" src='/library/dx/images/bnn-twitter.png' />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-1 col-lg-1">
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2">
                        <h4 className="bnn-info-title">コンタクト</h4>
                        <ul className="bnn-footer-info-list">
                            <li><a href="#">インスタグラム</a></li>
                            <li><a href="#">フェイスブック</a></li>
                            <li><a href="#">ツイッター</a></li>
                            <li><a href="#">ユーチューブ</a></li>
                            <li><a href="#">グーグル</a></li>
                        </ul>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2">
                        <h4 className="bnn-info-title">リンク</h4>
                        <ul className="bnn-footer-info-list">
                            <li><a href="#">ホームページ</a></li>
                            <li><a href="#">飲み物</a></li>
                            <li><a href="#">コンタクト</a></li>
                        </ul>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2">
                        <h4 className="bnn-info-title">会社</h4>
                        <ul className="bnn-footer-info-list">
                            <li><a href="#">ご利用条件</a></li>
                            <li><a href="#">プライバシーポリシー</a></li>
                            <li><a href="#">クッキーポリシー</a></li>
                        </ul>
                    </div>
                    {/* <div className="col-md-1 col-lg-1">
                    </div> */}
                </div>
                
            </section>

            <footer className="bnn-footer">
                <div className="copyright">著作権 © 2023 。 全著作権所有。</div>
            </footer>
        </React.Fragment>
    )
}

export default connect()(withTranslate(Footer));
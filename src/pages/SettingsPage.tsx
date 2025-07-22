import React from "react";
import "./SettingsPage.css";

const SettingsPage: React.FC = () => {
    return (
        <div className ="page-container">
            <img src="/page/f089e58c-fd4d-464a-9542-297548b10125/images/f11d553937110455b763db26fc3e78d3301ce0f1.png" className ="background-pattern" alt="" />
                <header id="section-header" className ="settings-header">
                    <a href="#" className ="back-button">
                        <img src="/page/f089e58c-fd4d-464a-9542-297548b10125/images/1077_25412.svg" alt="Back" />
                    </a>
                    <h1 className ="header-title">設定</h1>
                </header>
                <section id="section-profile" className ="profile-content">
                    <div className ="user-info">
                        {/* merged image */}
                        <div className ="avatar">
                            <img className ="avatar-background" src="/page/f089e58c-fd4d-464a-9542-297548b10125/images/I1077_25415_74_9107.svg" alt="" />
                            <img className ="avatar-icon" src="/page/f089e58c-fd4d-464a-9542-297548b10125/images/I1077_25415_74_9255.svg" alt="User Avatar" />
                        </div>
                        <p className ="username">Cherry</p>
                    </div>

                    <nav className ="settings-menu">
                        <ul>
                            <li>
                                <a href="#" className ="menu-item">
                                    <div className ="menu-icon-container">
                                        <img src="/page/f089e58c-fd4d-464a-9542-297548b10125/images/I1077_25434_44_4406.svg" alt="" />
                                    </div>
                                    <span className ="menu-text">編輯資料</span>
                                    <img className ="menu-arrow" src="/page/f089e58c-fd4d-464a-9542-297548b10125/images/1077_25433.svg" alt="Go" />
                                </a>
                            </li>
                            <li>
                                <a href="#" className ="menu-item">
                                    <div className ="menu-icon-container">
                                        <img src="/page/f089e58c-fd4d-464a-9542-297548b10125/images/I1077_25428_44_8733.svg" alt="" />
                                    </div>
                                    <span className ="menu-text">使用說明</span>
                                    <img className ="menu-arrow" src="/page/f089e58c-fd4d-464a-9542-297548b10125/images/1077_25430.svg" alt="Go" />
                                </a>
                            </li>
                            <li>
                                <a href="#" className ="menu-item">
                                    <div className ="menu-icon-container">
                                        <img src="/page/f089e58c-fd4d-464a-9542-297548b10125/images/I1077_25426_44_9480.svg" alt="" />
                                    </div>
                                    <span className ="menu-text">問題反應</span>
                                    <img className ="menu-arrow" src="/page/f089e58c-fd4d-464a-9542-297548b10125/images/1077_25424.svg" alt="Go" />
                                </a>
                            </li>
                        </ul>
                    </nav>
                </section>
        </div>
    );
};

export default SettingsPage;
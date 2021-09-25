import React, { useState, useEffect } from 'react'
import { useLocation, withRouter} from 'react-router-dom'
import './main.scss'
import Icon from '../../components/Common/Icon/Icon'

const BottomBar = withRouter(props => {
    let location = useLocation();
    let [isHistoryBar, setHistoryBar] = useState(location.pathname === '/history')

    useEffect(() => {
        setHistoryBar(location.pathname === '/history')
    }, [location]);
    return (
        <footer>
            <div className={"icon__wrapper " + (isHistoryBar && "is-current")}>
                <Icon type="history" onClick={() => props.history.push('/history')} />
                <span>记录</span>
            </div>
            <div className="add-button__wrapper">
                <div className="add-button">
                    <div>+</div>
                </div>
                <span>提交</span>
            </div>
            <div className={"icon__wrapper " + (!isHistoryBar && "is-current")}>
                <Icon type="user" onClick={() => props.history.push('/profile')}/>
                <span>我的</span>
            </div>
        </footer>
    );
});

function MainLayout(props) {


    return (
        <div className="main-layout">
            <main>
            {props.children}
            </main>
            <BottomBar />
        </div>
    );
}

export default MainLayout;
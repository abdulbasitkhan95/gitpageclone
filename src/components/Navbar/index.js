import {useState} from "react";

function Navbar(props) {
    const [tabState, setTabState] = useState('repo')

    const onClick = (name) => {
        props.navClick(name)
        setTabState(name)
    }
    return(
        <>
            <div className="tab">
                <a onClick = {()=>{onClick('repo')}} className={tabState === "repo" ? "active" : ""} href="#">Repositories</a>
                <a onClick = {()=>{onClick('dev')}} className={tabState === "dev" ? "active" : ""} href="#">Developers</a>
            </div>
        </>
    )
}

export default Navbar
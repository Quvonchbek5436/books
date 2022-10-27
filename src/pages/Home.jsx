import React, {memo} from 'react'
import MiniDrawer from "../components/drower/drower";
import Main from "../components/main/main";

const Home=({})=> {
    return (
        <>
            <MiniDrawer>
                <Main/>
            </MiniDrawer>
        </>
    )
}

export default memo(Home)

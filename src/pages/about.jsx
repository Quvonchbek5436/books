import React, {memo, useEffect} from 'react';
import MiniDrawer from "../components/drower/drower";
import axios from "axios";

const About = () => {
        useEffect(() => {
            let isMounted = true;
            const getData = async () => {
                try {
                    const res = await axios.get('http://devtest.lavina.tech/test/https://quvonchbek5436-books.netlify.app', {
                        headers: {
                            'Tg': 't.me/m_siddikov',
                        }
                    })
                    console.log(res)

                } catch (e) {
                    console.log(e)
                }
            }
            getData()
            return () => {
                isMounted = false;
            }
        }, [localStorage.getItem('key')])
    return (
        <MiniDrawer>

        </MiniDrawer>
    );
};

export default memo(About);
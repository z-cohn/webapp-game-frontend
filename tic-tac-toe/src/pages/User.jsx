import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from '../hooks/useAuth';

const User = () => {
    const [userInfo, setUserInfo] = useState();
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUserInfo = async () => {
            try {
                const response = await axiosPrivate.get('/user', { controller: controller.signal });
                // console.log("response: " + JSON.stringify(response.data));
                isMounted && setUserInfo(response?.data);
                // console.log(JSON.stringify(userInfo));
            } catch (err) {
                console.error(err);
            }
        }

        getUserInfo();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, []);

    return (
        <article>
            <h2>User Info</h2>
            <ul>
                <li>Username: {JSON.stringify(userInfo.username)}</li>
                <li>Email: {JSON.stringify(userInfo.email)}</li>
                <li>Wins: {JSON.stringify(userInfo.wins)}</li>
                <li>Losses: {JSON.stringify(userInfo.losses)}</li>
            </ul>
        </article>
    )
}




export default User
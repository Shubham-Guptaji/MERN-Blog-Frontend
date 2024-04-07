import { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { updateToken } from "../Redux/authSlice";
const ACCESS_TOKEN_EXPIRES_TIME = 1000 * 60 * 10; // 10 min

const AuthToken = ({children}) => {
    const accessToken = useSelector((state) => state?.auth?.token?.accessToken) || null;
    const refreshToken = useSelector((state) => state?.auth?.token?.refreshToken) || null;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isFirstMounted, setIsFirstMounted] = useState(true);

    async function updateTokenfn() {
        const res = await dispatch(updateToken());
        if(!res?.payload?.success){
            navigate('/sign-in');
            window.location.reload();
        }
        if (isFirstMounted) setIsFirstMounted(false);
    }
    useEffect(() => {
        if(refreshToken) {
            if(isFirstMounted) updateTokenfn();
            const intervalId = setInterval(()=>{updateTokenfn()}, ACCESS_TOKEN_EXPIRES_TIME);
            return () => clearInterval(intervalId);
        }
        return undefined;
    }, [accessToken]);

    return (
        <>
        {children}
        </>
    )
}

export default AuthToken;

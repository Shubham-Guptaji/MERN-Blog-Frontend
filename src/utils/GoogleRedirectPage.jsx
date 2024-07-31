import { useLocation } from "react-router-dom";
import Layout from "../Layout/Layout";
import { useState } from "react";
import axiosInstance from "../Helper/axiosInstance";

const REDIRECT_PAGE = () => {
    const location = useLocation();
    const code = new URLSearchParams(location.search).get('code');
    const [isCalled, setIsCalled] = useState(false);
    console.log(code);
    if(code && !isCalled) {
        const googleAuth = async (code) => await axiosInstance.get(`/user/google/callback?code=${code}`);
        googleAuth(code).then((response) => {
            console.log('res', response);
        })
        setIsCalled(true);
    }
    return (
        <Layout>
            <div>
            You will be redirected soon
        </div>
        </Layout>
    )
}
export default REDIRECT_PAGE;
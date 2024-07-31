import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../Helper/axiosInstance";
                              

const GoogleAuthBtn = (props) => {
    const googleAuth = (code) => axiosInstance.get(`/user/google/callback?code=${code}`);
	const navigate = useNavigate()
	const responseGoogle = async (authResult) => {
		try {
			if (authResult["code"]) {
				console.log(authResult, authResult.code);
				const result = await googleAuth(authResult.code);
                console.log('code', authResult.code, )
				// props.setUser(result.data.data.user);
				// alert("successfuly logged in");
				// navigate(`/api/auth/google?code=${authResult.code}`)
			} else {
				console.log(authResult);
				throw new Error(authResult);
			}
		} catch (e) {
			console.log(e);
		}
	};

	const googleLogin = useGoogleLogin({
		onSuccess: responseGoogle,
		onError: responseGoogle,
		flow: "auth-code",
	});

	return (
		<button
			style={{
				padding: "10px 20px",
			}}
            type="button"
			onClick={googleLogin}
		>
			Sign in with Google
		</button>
	);
};

export default GoogleAuthBtn;
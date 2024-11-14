import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin } from "../../features/actions/authActions";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const authState = useSelector((state) => state);

    const { user, isError, isSuccess, isLoading, message } = authState.auth;

    const onSubmit = (data) => {
        dispatch(adminLogin(data));
    };

    useEffect(() => {
        if (isSuccess) {
            navigate("/dashboard");
        }
    }, [isSuccess, navigate]);

    return (
        <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
            <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
                <h3 className="text-center title">Login</h3>
                <p className="text-center">Login to your account to continue.</p>
                <div className="error text-center">
                    {isError && message === "Rejected" ? "You are not an Admin" : ""}
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            className="form-control"
                            {...register("email")}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-control"
                            {...register("password")}
                        />
                    </div>
                    <div className="mb-3 text-end">
                        <Link to="/forgot-password" className="">
                            Forgot Password?
                        </Link>
                    </div>
                    <button
                        className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
                        style={{ background: "#ffd333" }}
                        type="submit"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;

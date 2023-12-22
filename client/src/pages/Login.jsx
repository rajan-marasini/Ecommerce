import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import UserContext from "../context/UserContext";

const Login = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const { data } = await axios.post("/api/v1/user/login", {
                email,
                password,
            });
            if (data.success) {
                toast.success(data.message);
                navigate("/");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error.message);
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    if (user?.name) {
        return <Navigate to={"/"} />;
    }

    return (
        <div className="max-w-lg mx-auto w-full mt-16 h-full">
            <form className="w-full flex flex-col gap-8">
                <Input
                    label={"Email"}
                    type={"email"}
                    value={email}
                    setValue={setEmail}
                />
                <Input
                    label={"Password"}
                    type={"password"}
                    value={password}
                    setValue={setPassword}
                />
                <Button
                    label={"Login"}
                    onClick={(e) => handleSubmit(e)}
                    disabled={isLoading}
                />

                <div>
                    <p className="text-sm text-slate-400">
                        Don't have an account?{" "}
                        <Link to={"/register"} className="text-blue-500">
                            Register here
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;

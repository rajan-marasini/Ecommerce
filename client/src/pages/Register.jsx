import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";

const Register = () => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const { data } = await axios.post("/api/v1/user/register", {
                name,
                email,
                password,
            });

            if (data.success) {
                toast.success(data.message);
                navigate("/login");
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

    return (
        <div className="max-w-lg mx-auto w-full mt-16 h-full">
            <form className="w-full flex flex-col gap-8">
                <Input
                    label={"Full Name"}
                    type={"text"}
                    value={name}
                    setValue={setName}
                />
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
                    label={"Create a Account"}
                    disabled={isLoading}
                    onClick={(e) => handleSubmit(e)}
                />

                <div>
                    <p className="text-sm text-slate-400 text-center">
                        Already have an account?{" "}
                        <Link to={"/login"} className="text-blue-500">
                            Login
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Register;

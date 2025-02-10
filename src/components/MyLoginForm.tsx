"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const MyLoginForm = () => {
    // typscript interface 
    interface FormData {
        email: string;
        password: string;
    }
    // errors typescript interface 
    interface Errors {
        email?: string;
        password?: string;
        rememberMe?: string;
    }
    // useState Data
    const [formData, setFormData] = useState<FormData>({ email: "", password: "" });
    const [rememberMe, setRememberMe] = useState(false);
    const [errors, setErrors] = useState<Errors>({});
    const router = useRouter();

    // handle change function
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // validate function
    const validate = (): Errors => {
        // new error object 
        const newErrors: Errors = {};
        // if email is empty
        if (!formData.email) newErrors.email = "Email is required";
        // if email is not valid or password empty
        if (!formData.password) newErrors.password = "Password is required";
        // if password length is less than 6
        else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
        // if checkbox is not checked
        if (!rememberMe) newErrors.rememberMe = "Agree it for sign in";
        return newErrors;
    };
    // handlesubmit function
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        // prevent default
        e.preventDefault();
        const validationErrors = validate();
        // if validation errors
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({});
            // sweet alert
            Swal.fire({
                title: "Success",
                text: "Login successful!",
                icon: "success",
                confirmButtonText: "OK",
            }).then(() => {
                // set local storage 
                localStorage.setItem("formData", JSON.stringify(formData));
                localStorage.setItem("isAuthenticated", "true");
                // reset form data
                setFormData({ email: "", password: "" });
                // push to dashboard page 
                router.push("/dashboard-page");
            });
        }
    };

    return (
        <div className="min-h-screen flex 2xl:justify-center lg:justify-end justify-center pr-[27px] max-sm:px-[35px] xl:pl-[237px] pl-10 pt-[30px]">
            <div className="justify-end gap-[120px] flex">
                <div className="container ml-auto">
                    {/* logo */}
                    <a href="http://localhost:3000/">
                        <img className="pt-[19.37px]" src="../assets/images/png/logo.png" alt="logo" width={163} height={31} />
                    </a>
                    <h1 className="font-semibold text-3xl leading-[58.5px] text-black md:pt-[138px] pt-[90px]">Welcome Back</h1>
                    <p className="text-sm leading-[30px] text-gray">Welcome back! Please enter your details.</p>
                    {/* form */}
                    <form className="pt-[31px] max-w-[456px]" onSubmit={handleSubmit}>
                        <div className="mb-[18px]">
                            <label className="text-black text-base font-medium">Email</label>
                            <input
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`placeholder:text-gray w-full mt-[6px] text-black border-light-gray rounded-lg border p-4 ${errors.email ? "border-red-500" : ""}`}
                                placeholder="Email"
                            />
                            {/* if email not field */}
                            {errors.email && (
                                <p className="text-red-500 text-sm absolute">{errors.email}</p>
                            )}
                        </div>
                        <div className="mt-[6px] mb-5">
                            <label className="text-black text-base font-medium">Password</label>
                            <input
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                className={`placeholder:text-gray w-full text-black border-light-gray rounded-lg border p-4 ${errors.password ? "border-red-500" : ""}`}
                                placeholder="Password"
                            />
                            {/* is password not field  */}
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1 absolute">{errors.password}</p>
                            )}
                        </div>
                        <div className="md:flex md:items-center md:justify-between">
                            <label className="flex items-center text-base max-md:mb-[14px]">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="mr-2 text-base"
                                /> Remember for 30 days
                            </label>
                            <a href="#" className="text-base text-blue hover:underline">
                                Forgot password?
                            </a>
                        </div>
                        {/* if checkbox not field */}
                        {errors.rememberMe && (
                            <p className="text-red-500 text-sm mt-1">{errors.rememberMe}</p>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-black text-white p-3 mt-6 rounded-lg hover:bg-gray-800"
                        >
                            Sign In
                        </button>
                        <button
                            type="button"
                            className="w-full flex items-center justify-center p-3 mt-[6px] gap-[10px] border rounded-lg hover:bg-gray-100"
                        >
                            <img src="../assets/images/svg/google.svg" alt="google" /> Sign in with Google
                        </button>
                        <p className="mt-4 md:text-center text-sm">
                            Don’t have an account?{" "}
                            <a href="#" className="text-blue hover:underline">
                                Sign up
                            </a>
                        </p>
                    </form>
                </div>
                <div className="max-w-[759px] max-lg:hidden w-full h-[899px] bg-darkBlue rounded-[20px] flex justify-center items-center">
                    <img className="pointer-events-none max-2xl:w-10/12" src="./assets/images/png/form-image.png" alt="form-image" width={759} height={899} />
                </div>
            </div>
        </div>
    );
};

export default MyLoginForm;
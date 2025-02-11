"use client";
import React, { useEffect, useState } from "react";
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

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };

            if (name === "email") {
                const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]{2,}$/i;
                if (value && emailRegex.test(value)) {
                    delete newErrors.email;
                }
            }

            if (name === "password" && value.length >= 6) {
                delete newErrors.password;
            }

            return newErrors;
        });
    };

    // validate function
    const validate = (): Errors => {
        const newErrors: Errors = {};

        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]{2,}$/i;

        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Enter a valid email address";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if (!rememberMe) {
            newErrors.rememberMe = "Agree it for sign in";
        }

        return newErrors;
    };
    useEffect(() => {
        const isAuthenticated = localStorage.getItem("isAuthenticated");
        if (isAuthenticated === "true") {
            router.push("/dashboard-page");
        }
    })
    // handlesubmit function
    const handleSubmit = (e : any) => {
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
        <div className="min-h-screen flex 2xl:justify-center lg:justify-end justify-center pr-[27px] pb-10 max-sm:px-[35px] xl:pl-[237px] pl-10 pt-[30px]">
            <div className="justify-end gap-[120px] flex">
                <div className="container ml-auto">
                    {/* logo */}
                    <a href="#">
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
                                className={`placeholder:text-gray w-full mt-[6px] text-gray border-lightGray rounded-lg border p-4 ${errors.email ? "border-red-500" : ""}`}
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
                                className={`placeholder:text-gray w-full text-gray border-lightGray rounded-lg border p-4 ${errors.password ? "border-red-500" : ""}`}
                                placeholder="........."
                            />
                            {/* is password not field  */}
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1 absolute">{errors.password}</p>
                            )}
                        </div>
                        <div className="lg:flex md:items-center md:justify-between">
                            <label className="flex items-center text-base max-md:mb-[14px] font-inter">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="mr-2 text-base"
                                /> Remember for 30 days
                            </label>
                            <a href="#" className="text-base text-blue hover:text-red-600 transition-all duration-700">
                                Forgot password?
                            </a>
                        </div>
                        {/* if checkbox not field */}
                        {errors.rememberMe && (
                            <p className="text-red-500 text-sm mt-1">{errors.rememberMe}</p>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-black text-white p-3 mt-6 rounded-lg hover:bg-slate-500 transition-all duration-700"
                        >
                            Sign In
                        </button>
                        <button
                            type="button"
                            className="w-full flex items-center justify-center p-3 mt-[6px] gap-[10px] border border-lightGray rounded-lg hover:bg-slate-600 hover:text-white transition-all duration-700"
                        >
                            <img src="../assets/images/svg/google.svg" alt="google" /> Sign in with Google
                        </button>
                        <p className="mt-4 md:text-center text-sm font-inter">
                            Don’t have an account?{" "}
                            <a href="#" className="text-blue hover:text-red-600 transition-all duration-700">
                                Sign up
                            </a>
                        </p>
                    </form>
                </div>
                <div className="max-w-[759px] max-lg:hidden w-full h-[899px] bg-darkBlue xl:px-[90px] rounded-[20px] flex justify-center items-center">
                    <img className="pointer-events-none max-2xl:w-10/12" src="./assets/images/png/form-image.png" alt="form-image" width={759} height={899} />
                </div>
            </div>
        </div>
    );
};

export default MyLoginForm;
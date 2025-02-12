"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const MyLoginForm = () => {
    const myState = {
        email: "",
        password: "",
        customCheckBox: false,
    };

    const [formValue, setFormValue] = useState(myState);
    const [errors, setErrors] = useState(false);
    const router = useRouter();

    const emailRegax = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    useEffect(() => {
        const isAuthenticated = localStorage.getItem("isAuthenticated");
        if (isAuthenticated === "true") {
            router.push("/dashboard-page");
        }
    }, []); // ✅ Fixed: Empty dependency array, so it runs only once

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setErrors(true);

        if (
            formValue.email.length > 0 &&
            emailRegax.test(formValue.email) &&
            formValue.password.length >= 6 &&
            formValue.customCheckBox
        ) {
            setErrors(false);
            Swal.fire({
                title: "Success",
                text: "Login successful!",
                icon: "success",
                confirmButtonText: "OK",
            }).then(() => {
                localStorage.setItem("isAuthenticated", "true");
                router.push("/dashboard-page");
            });
        }
    };

    return (
        <div className="min-h-screen flex 2xl:justify-center lg:justify-end justify-center pr-[27px] pb-10 max-sm:px-[35px] xl:pl-[237px] pl-10 pt-[30px]">
            <div className="justify-end gap-[120px] flex">
                <div className="container ml-auto">
                    {/* Logo */}
                    <a href="#">
                        <img className="pt-[19.37px]" src="../assets/images/png/logo.png" alt="logo" width={163} height={31} />
                    </a>
                    <h1 className="font-semibold text-3xl leading-[58.5px] text-black md:pt-[138px] pt-[90px]">Welcome Back</h1>
                    <p className="text-sm leading-[30px] text-gray">Welcome back! Please enter your details.</p>

                    {/* Form */}
                    <form className="pt-[31px] max-w-[456px]" onSubmit={handleSubmit}>
                        <div className="mb-[18px]">
                            <label className="text-black text-base font-medium">Email</label>
                            <input
                                name="email"
                                type="email"
                                value={formValue.email}
                                onChange={(e) =>
                                    setFormValue({ ...formValue, email: e.target.value })
                                }
                                className="placeholder:text-gray w-full mt-[6px] text-gray border-lightGray rounded-lg border p-4"
                                placeholder="Email"
                            />
                            <p className="text-red-500">
                                {errors && formValue.email.length === 0
                                    ? "Required"
                                    : !emailRegax.test(formValue.email) &&
                                        formValue.email.length > 0
                                        ? "Email is invalid"
                                        : ""}
                            </p>
                        </div>
                        <div className="mt-[6px] mb-5">
                            <label className="text-black text-base font-medium">Password</label>
                            <input
                                name="password"
                                type="password"
                                value={formValue.password}
                                onChange={(e) =>
                                    setFormValue({ ...formValue, password: e.target.value })
                                }
                                className="placeholder:text-gray w-full mt-[6px] text-gray border-lightGray rounded-lg border p-4"
                                placeholder="••••••••"
                            />
                            <p className="text-red-500">
                                {errors && formValue.password.length === 0
                                    ? "Password is required"
                                    : formValue.password.length < 6 &&
                                        formValue.password.length > 0
                                        ? "Password must be at least 6 characters"
                                        : ""}
                            </p>
                        </div>
                        <div className="lg:flex md:items-center md:justify-between">
                            <label className="flex items-center text-base max-md:mb-[14px] font-inter">
                                <input
                                    type="checkbox"
                                    checked={formValue.customCheckBox}
                                    onChange={(e) =>
                                        setFormValue({
                                            ...formValue,
                                            customCheckBox: e.target.checked,
                                        })
                                    }
                                    className="mr-2 text-base"
                                /> Remember for 30 days
                            </label>
                            <a href="#" className="text-base text-blue hover:text-red-600 transition-all duration-700">
                                Forgot password?
                            </a>
                        </div>
                        <p className="text-red-500">
                            {errors && formValue.customCheckBox === false
                                ? "Required"
                                : ""}
                        </p>

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
                        <p className="mt-4 md:text-center text-base font-inter">
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

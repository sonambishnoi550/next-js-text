"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const MyForm = () => {
    interface FormData {
        email: string;
        password: string;
    }

    interface Errors {
        email?: string;
        password?: string;
        rememberMe?: string;
    }

    const [formData, setFormData] = useState<FormData>({ email: "", password: "" });
    const [rememberMe, setRememberMe] = useState(false);
    const [errors, setErrors] = useState<Errors>({});
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = (): Errors => {
        const newErrors: Errors = {};
        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.password) newErrors.password = "Password is required";
        else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
        if (!rememberMe) newErrors.rememberMe = "Agree it for sign in";
        return newErrors;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({});
            Swal.fire({
                title: "Success",
                text: "Login successful!",
                icon: "success",
                confirmButtonText: "OK",
            }).then(() => {
                router.push(`/dashboard?email=${formData.email}`);
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="items-center justify-end gap-[120px] flex">
                <div className="container max-w-[1335px] ml-auto">
                    <img src="../assets/images/png/logo.png" alt="logo" width={163} height={31} />
                    <h1 className="font-semibold text-3xl leading-[58.5px] text-black pt-[138px]">Welcome Back</h1>
                    <p className="text-sm leading-[30px] text-gray">Welcome back! Please enter your details.</p>
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
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1 absolute">{errors.password}</p>
                            )}
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center text-base">
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
                        <p className="mt-4 text-center text-sm">
                            Don’t have an account?{" "}
                            <a href="#" className="text-blue hover:underline">
                                Sign up
                            </a>
                        </p>
                    </form>
                </div>
                <div className="my-9 mr-7 w-full">
                    <img src="./assets/images/png/form-image.png" alt="form-image" width={759} height={899} />
                </div>
            </div>
        </div>
    );
};

export default MyForm;
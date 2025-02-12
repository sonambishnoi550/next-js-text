"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { InlineWidget } from "react-calendly";
import { error } from "console";

const Dashboard = () => {
    const Question = [{
        list: {
            data: [
                {
                    title: "What is the capital of India?",
                    options: ["New Delhi", "Mumbai", "Kolkata", "Chennai"],
                }
            ]
        }
    }];

    const router = useRouter();
    const searchParams = useSearchParams();
    const questionParam = searchParams.get("question");
    const [activeQuestion, setActiveQuestion] = useState<number | null>(questionParam ? Number(questionParam) : null);
    const [images, setImages] = useState<string[]>([]);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const isAuthenticated = localStorage.getItem("formValue");
        if (!isAuthenticated) {
            router.push("/");
        }
    }, []);

    useEffect(() => {
        return () => {
            images.forEach((imageUrl) => URL.revokeObjectURL(imageUrl));
        };
    }, [images]);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const allowedTypes = ["image/png", "image/jpeg", "image/webp"];
            const uploadedFiles = Array.from(event.target.files);
            const validImages = uploadedFiles.filter(file => allowedTypes.includes(file.type));
            const invalidFiles = uploadedFiles.filter(file => !allowedTypes.includes(file.type));

            if (invalidFiles.length > 0) {
                setError("only PNG,WEBP,JPEG files are allowed");

            }
            else {
                setError("");
            }
            const uploadedImages = validImages.map((file) =>
                URL.createObjectURL(file)
            );
            setImages((prevImages) => [...prevImages, ...uploadedImages]);
        }
    };

    const handleQuestionClick = (index: number) => {
        setActiveQuestion(index);
        router.push(`?question=${index}`);
    };

    return (
        <div className="px-4 text-center">
            <div className="flex max-md:flex-col items-center justify-center gap-10 my-6">
                <button
                    onClick={() => {
                        localStorage.removeItem("isAuthenticated");
                        router.push("/");
                    }}
                    className="border border-black rounded-lg px-4 py-2"
                >
                    Log Out
                </button>
                {["Question 1", "Question 2", "Question 3"].map((label, index) => (
                    <button
                        key={index}
                        className={`px-7 py-3 rounded-xl font-medium text-white ${activeQuestion === index + 1
                            ? "bg-green-800"
                            : "bg-red-700 hover:bg-red-600"}
                        `}
                        onClick={() => handleQuestionClick(index + 1)}
                    >
                        {label}
                    </button>
                ))}
            </div>
            {activeQuestion === 1 && (
                <div>
                    <p>{Question[0].list.data[0].title} {Question[0].list.data[0].options[0]}</p>
                </div>
            )}
            {activeQuestion === 2 && (
                <div>
                    <InlineWidget
                        url="https://calendly.com/bishnoisonam079"
                        styles={{ height: "600px" }}
                    />
                </div>
            )}
            {activeQuestion === 3 && (
                <div>
                    <input type="file" multiple onChange={handleImageUpload} />
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                    <div className="flex flex-wrap mt-4 gap-4">
                        {images.map((imageUrl, index) => (
                            <div key={index} className="relative w-[200px] h-[200px]">
                                <img
                                    src={imageUrl}
                                    alt={`upload-${index}`}
                                    className="object-cover w-full h-full rounded-lg shadow-lg"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;

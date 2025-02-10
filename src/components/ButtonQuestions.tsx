"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { InlineWidget } from "react-calendly";

const ButtonQuestions = () => {
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
    const searchParams = useSearchParams();
    const email = searchParams.get("email");

    const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        return () => {
            images.forEach((imageUrl) => URL.revokeObjectURL(imageUrl));
        };
    }, [images]);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const uploadedImages = Array.from(event.target.files).map((file) =>
                URL.createObjectURL(file)
            );
            setImages((prevImages) => [...prevImages, ...uploadedImages]);
        }
    };

    return (
        <>
            <div className="flex items-center justify-center gap-10 my-6">
                {email && <p className="text-lg font-semibold">Email: {email}</p>}
                {["Question 1", "Question 2", "Question 3"].map((label, index) => (
                    <button
                        key={index}
                        className={`px-7 py-3 rounded-xl font-medium text-white ${activeQuestion === index + 1
                            ? "bg-green-800"
                            : "bg-red-700 hover:bg-red-600"
                            }`}
                        onClick={() => setActiveQuestion(index + 1)}
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
        </>
    );
};

export default ButtonQuestions;
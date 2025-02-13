import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../constants";
import { useState } from "react";
import { Heart } from "lucide-react";
import { toast } from "sonner";

export default function QuizCard() {
    const { data, isLoading, error } = useQuery({
        queryKey: ["quiz"],
        queryFn: async () => {
            const resp = await axios.get(`${BASE_URL}/questions`);
            return resp.data;
        },
    });
    const [name, setName] = useState<string>("");
    const [gender, setGender] = useState<string>("");
    const [isNameAndGenderSubmitted, setIsNameAndGenderSubmitted] = useState<boolean>(false);
    const [answers, setAnswers] = useState<any[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);

    const mutate = useMutation({
        mutationFn: async (answer: any) => {

            const resp = await axios.post(`${BASE_URL}/answer`, {
                name: name,
                gender: gender,
                answers: answer,
            });
            return resp.data;
        },
        onSuccess: () => {
            toast.success("Quiz submitted successfully");
            localStorage.setItem("quiz", "done");
        },
        onError: () => {
            toast.error("Error submitting quiz");
        },
    });


    if (isLoading) return <div className="w-[500px] h-fit py-10 rounded-lg bg-white shadow-lg flex flex-col gap-4 justify-center items-center">Loading...</div>;
    if (error) return <div className="w-[500px] h-fit py-10 rounded-lg bg-white shadow-lg flex flex-col gap-4 justify-center items-center">Error: {error.message}</div>;
    let question: any;
    let options: any;
    if (currentQuestion < data.data.length) {
        question = data.data[currentQuestion];
        options = [question.option1, question.option2, question.option3, question.option4];
    }
    const handleAnswerClick = (answer: string) => {
        const updatedAnswers = [...answers, { answer, questionId: question.id }];
        setAnswers(updatedAnswers);

        if (currentQuestion === data.data.length - 1) {
            setCurrentQuestion((prev) => prev + 1);
            if (localStorage.getItem("quiz") === "done") {
                toast.error("Not happening nigga 🖕🖕🖕!!");
                return;
            } else {
                mutate.mutate(updatedAnswers); // Pass the latest answers state
            }
        } else {
            setCurrentQuestion((prev) => prev + 1);
        }
    };

    if (name === "" || gender === "" || !isNameAndGenderSubmitted) {
        return (
            <div className="w-[500px] h-fit py-10 rounded-lg bg-white shadow-lg flex flex-col gap-4 justify-center items-center">
                <p className="text-2xl font-semibold text-center w-5/6 text-pink-800">Please enter your name and gender</p>
                <input type="text" placeholder="Name" className="w-[90%] p-2 rounded-md bg-pink-100 text-pink-800" onChange={(e) => setName(e.target.value)} />
                <select className="w-[90%] p-2 rounded-md bg-pink-100  text-pink-800" onChange={(e) => setGender(e.target.value)}>
                    <option value="">Select Gender</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                </select>
                <button className="w-[90%] p-2 rounded-md bg-pink-100 hover:bg-pink-300 hover:text-white transition-all duration-300 cursor-pointer text-pink-800" onClick={() => {
                    setName(name);
                    setGender(gender);
                    setIsNameAndGenderSubmitted(true)
                }}>Submit</button>
            </div>
        );
    }
    if (currentQuestion === data.data.length) {
        return (
            <div className="w-[500px] h-fit py-10 rounded-lg bg-white shadow-lg flex flex-col gap-4 justify-center items-center">
                <p className="text-2xl font-semibold text-center w-5/6 text-pink-800">Quiz submitted successfully</p>
            </div>
        );
    }
    return (
        <div className="w-[500px] h-fit py-10 rounded-lg bg-white shadow-lg flex flex-col gap-4 justify-center items-center">
            <p className="text-2xl font-semibold text-start w-5/6 text-pink-800">
                Question {currentQuestion + 1}/{data.data.length}
            </p>
            <p className="text-lg text-start w-5/6 text-pink-800">{question.title}</p>
            <div className="flex flex-col gap-2 w-full items-center">
                {options.map((option: any, index: any) => (
                    <p
                        key={index}
                        onClick={() => handleAnswerClick(option)}
                        className="text-lg flex items-center text-pink-800 w-[90%] text-start cursor-pointer bg-pink-100 hover:bg-pink-300 hover:text-white transition-all duration-300 rounded-md p-2"
                    >
                        <Heart className="mr-2 text-pink-400" size={20} />
                        {option}
                    </p>
                ))}
            </div>
        </div>
    );
}

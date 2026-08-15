import { createContext, useContext, useState } from "react";

const InterviewContext = createContext(null);

export function InterviewProvider({ children }) {

    const [candidate, setCandidate] = useState(null);

    const [questions, setQuestions] = useState([]);

    const [currentQuestion, setCurrentQuestion] = useState(0);

    const [answers, setAnswers] = useState([]);

    const [score, setScore] = useState(0);

    const [interviewStarted, setInterviewStarted] = useState(false);

    const [interviewFinished, setInterviewFinished] = useState(false);

    function nextQuestion() {

        setCurrentQuestion((prev) => prev + 1);

    }

    function previousQuestion() {

        setCurrentQuestion((prev) =>
            Math.max(prev - 1, 0)
        );

    }

    function saveAnswer(answer) {

        setAnswers((prev) => [

            ...prev,

            answer,

        ]);

    }

    function resetInterview() {

        setCandidate(null);

        setQuestions([]);

        setCurrentQuestion(0);

        setAnswers([]);

        setScore(0);

        setInterviewStarted(false);

        setInterviewFinished(false);

    }

    return (

        <InterviewContext.Provider
            value={{

                candidate,
                setCandidate,

                questions,
                setQuestions,

                currentQuestion,
                setCurrentQuestion,

                answers,
                saveAnswer,

                score,
                setScore,

                interviewStarted,
                setInterviewStarted,

                interviewFinished,
                setInterviewFinished,

                nextQuestion,
                previousQuestion,

                resetInterview,

            }}
        >

            {children}

        </InterviewContext.Provider>

    );

}

export function useInterview() {

    return useContext(InterviewContext);

}
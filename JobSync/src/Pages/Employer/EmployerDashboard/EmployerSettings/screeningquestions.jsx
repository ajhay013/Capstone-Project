import React, { useState } from "react";

export default function ScreeningQuestions() {
    const [screeningQuestions, setScreeningQuestions] = useState([
        {
            id: 1,
            jobFunction: "",
            idealAnswer: "",
            mustHave: false,
        },
    ]);

    const checkboxStyle = {
        width: "20px",
        height: "20px",
        border: "2px solid #ccc",
        borderRadius: "4px",
        cursor: "pointer",
        transition: "background-color 0.3s",
        backgroundColor: "transparent",
    };

    const checkboxCheckedStyle = {
        ...checkboxStyle,
        backgroundColor: "green",
        borderColor: "green",
    };

    const addScreeningQuestion = () => {
        setScreeningQuestions([
            ...screeningQuestions,
            {
                id: screeningQuestions.length + 1,
                jobFunction: "",
                idealAnswer: "",
                mustHave: false,
            },
        ]);
    };

    const handleScreeningChange = (id, field, value) => {
        setScreeningQuestions((prevQuestions) =>
            prevQuestions.map((question) =>
                question.id === id ? { ...question, [field]: value } : question
            )
        );
    };

    return (
        <div>
            <h2 style={{ textAlign: "left" }}>Screening Questions</h2>
            <p style={{ textAlign: "left", marginBottom: "30px", fontSize: "14px", color: "#555" }}>
                We recommend adding 3 or more questions. Applicants must answer each question.
            </p>

            {screeningQuestions.map((question) => (
                <div
                    key={question.id}
                    style={{
                        marginBottom: "40px",
                        border: "1px solid #ddd",
                        padding: "25px",
                        borderRadius: "8px",
                        backgroundColor: "#f5f5f5",
                    }}
                >
                    <label
                        style={{
                            display: "block",
                            marginBottom: "20px",
                            textAlign: "left",
                            fontWeight: "bold",
                        }}
                    >
                        How many years of (Job Function) experience do you currently have? (Question {question.id})
                    </label>
                    <div style={{ display: "flex", gap: "20px", alignItems: "center", flexWrap: "wrap" }}>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: "block", marginBottom: "5px", marginLeft: "-300px" }}>
                                Job Function
                            </label>
                            <input
                                type="text"
                                placeholder="Job Function"
                                value={question.jobFunction}
                                onChange={(e) =>
                                    handleScreeningChange(question.id, "jobFunction", e.target.value)
                                }
                                style={{
                                    padding: "8px",
                                    border: "1px solid #ccc",
                                    borderRadius: "4px",
                                    backgroundColor: "#fff",
                                    minWidth: "250px",
                                    height: "40px",
                                    marginLeft: "-140px",
                                }}
                            />
                        </div>

                        <div style={{ flex: 1 }}>
                            <label style={{ display: "block", marginBottom: "5px", textAlign: "left" }}>
                                Ideal Answer (min)
                            </label>
                            <input
                                type="number"
                                placeholder="Ideal Answer (min)"
                                value={question.idealAnswer}
                                onChange={(e) =>
                                    handleScreeningChange(question.id, "idealAnswer", e.target.value)
                                }
                                style={{
                                    width: "200px",
                                    padding: "8px",
                                    border: "1px solid #ccc",
                                    borderRadius: "4px",
                                    backgroundColor: "#fff",
                                    height: "40px",
                                    marginLeft: "-270px",
                                }}
                            />
                        </div>

                        <div style={{ display: "inline-flex", alignItems: "center", marginLeft: "-150px" }}>
                            <input
                                type="checkbox"
                                id={`mustHave-${question.id}`}
                                checked={question.mustHave}
                                onChange={(e) =>
                                    handleScreeningChange(question.id, "mustHave", e.target.checked)
                                }
                                style={question.mustHave ? checkboxCheckedStyle : checkboxStyle}
                            />
                            <label htmlFor={`mustHave-${question.id}`} style={{ marginLeft: "5px", whiteSpace: "nowrap" }}>
                                Must-have Qualification
                            </label>
                        </div>
                    </div>
                </div>
            ))}

            <button
                onClick={addScreeningQuestion}
                style={{
                    padding: "10px 20px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginBottom: "40px",
                }}
            >
                + Add Screening Question
            </button>
        </div>
    );
}

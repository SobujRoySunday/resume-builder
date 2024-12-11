"use client";

import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { generateResumePDF } from "@/utils/pdfGenerator"; // Make sure this utility exists
import { ResumeData } from "@/lib/resumeData"; // Assuming this contains the `ResumeData` type
import { RxCross2 } from "react-icons/rx";
import { FaDownload } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";

export default function ResumeBuilder() {
    const { register, control, handleSubmit } = useForm<ResumeData>({
        defaultValues: {
            experience: [{ jobTitle: "", company: "", startDate: "", endDate: "", description: "" }],
            education: [{ degree: "", institution: "", startDate: "", endDate: "", description: "" }],
            skills: [{ name: "", level: "" }],
            projects: [],
            languages: [],
            certifications: [],
            hobbies: [],
        },
    });

    const { fields: experienceFields, append: appendExperience, remove: removeExperience } = useFieldArray({
        control,
        name: "experience",
    });

    const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({
        control,
        name: "education",
    });

    const { fields: skillFields, append: appendSkill, remove: removeSkill } = useFieldArray({
        control,
        name: "skills",
    });

    const [resumeData, setResumeData] = useState<ResumeData | null>(null); // Store resume data for preview and PDF download

    const onSubmit = (data: ResumeData) => {
        setResumeData(data); // Save form data to state for preview and PDF
    };

    const downloadPDF = async () => {
        if (resumeData) {
            const pdfBytes = await generateResumePDF(resumeData);
            const blob = new Blob([pdfBytes], { type: "application/pdf" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "resume.pdf";
            link.click();
        }
    };

    return (
        <div className="w-2/3 mx-auto p-8 flex flex-col items-center gap-4">
            <h1 className="text-5xl">Create Your Resume</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-sm flex flex-col justify-center w-full">
                {/* Full Name */}
                <div className="space-y-2">
                    <label className="block text-xs text-gray-500">Full Name</label>
                    <input {...register("name")} className="w-full p-2 border rounded" />
                </div>

                {/* Email */}
                <div className="space-y-2">
                    <label className="block text-xs text-gray-500">Email</label>
                    <input {...register("email")} className="w-full p-2 border rounded" />
                </div>

                {/* Experience */}
                <div className="space-y-2">
                    <label className="block text-xs text-gray-500">Experience</label>
                    {experienceFields.map((item, index) => (
                        <div key={item.id} className="flex flex-row gap-2">
                            <input
                                {...register(`experience.${index}.jobTitle` as const)}
                                className="w-full p-2 border rounded"
                                placeholder="Job Title"
                            />
                            <input
                                {...register(`experience.${index}.company` as const)}
                                className="w-full p-2 border rounded"
                                placeholder="Company"
                            />
                            <input
                                {...register(`experience.${index}.startDate` as const)}
                                className="w-full p-2 border rounded"
                                placeholder="Start Date"
                            />
                            <input
                                {...register(`experience.${index}.endDate` as const)}
                                className="w-full p-2 border rounded"
                                placeholder="End Date (or 'Present')"
                            />
                            <button
                                type="button"
                                onClick={() => removeExperience(index)}
                                className="p-2"
                            >
                                <RxCross2 className="font-bold text-xl" />
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => appendExperience({ jobTitle: "", company: "", startDate: "", endDate: "", description: "" })}
                        className="bg-foreground text-background px-4 py-2 rounded hover:bg-gray-800 transition"
                    >
                        Add Experience
                    </button>
                </div>

                {/* Education */}
                <div className="space-y-2">
                    <label className="block text-xs text-gray-500">Education</label>
                    {educationFields.map((item, index) => (
                        <div key={item.id} className="flex flex-row gap-2">
                            <input
                                {...register(`education.${index}.degree` as const)}
                                className="w-full p-2 border rounded"
                                placeholder="Degree"
                            />
                            <input
                                {...register(`education.${index}.institution` as const)}
                                className="w-full p-2 border rounded"
                                placeholder="Institution"
                            />
                            <input
                                {...register(`education.${index}.startDate` as const)}
                                className="w-full p-2 border rounded"
                                placeholder="Start Date"
                            />
                            <input
                                {...register(`education.${index}.endDate` as const)}
                                className="w-full p-2 border rounded"
                                placeholder="End Date"
                            />
                            <button
                                type="button"
                                onClick={() => removeEducation(index)}
                                className="p-2"
                            >
                                <RxCross2 className="font-bold text-xl" />
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => appendEducation({ degree: "", institution: "", startDate: "", endDate: "", description: "" })}
                        className="bg-foreground text-background px-4 py-2 rounded hover:bg-gray-800 transition"
                    >
                        Add Education
                    </button>
                </div>

                {/* Skills */}
                <div className="space-y-2">
                    <label className="block text-xs text-gray-500">Skills</label>
                    {skillFields.map((item, index) => (
                        <div key={item.id} className="flex flex-row gap-2">
                            <input
                                {...register(`skills.${index}.name` as const)}
                                className="w-full p-2 border rounded"
                                placeholder="Skill"
                            />
                            <input
                                {...register(`skills.${index}.level` as const)}
                                className="w-full p-2 border rounded"
                                placeholder="Skill level 1-5"
                            />
                            <button
                                type="button"
                                onClick={() => removeSkill(index)}
                                className="p-2"
                            >
                                <RxCross2 className="font-bold text-xl" />
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => appendSkill({ name: "", level: "" })}
                        className="bg-foreground text-background px-4 py-2 rounded hover:bg-gray-800 transition"
                    >
                        Add Skill
                    </button>
                </div>

                <button type="submit" className="bg-foreground text-background px-4 py-2 rounded hover:bg-gray-800 transition flex justify-center items-center">
                    <FaEye className="mr-2" />
                    Preview
                </button>
            </form>

            {resumeData && (
                <div className="mt-6 p-4 border rounded-md w-full">
                    <h2 className="font-bold text-xl">Preview</h2>
                    <div>
                        <p><strong>Name:</strong> {resumeData.name}</p>
                        <p><strong>Email:</strong> {resumeData.email}</p>

                        <div>
                            <strong>Experience:</strong>
                            <ul>
                                {resumeData.experience.map((exp, index) => (
                                    <li key={index}>
                                        <p><strong>Job Title:</strong> {exp.jobTitle}</p>
                                        <p><strong>Company:</strong> {exp.company}</p>
                                        <p><strong>Duration:</strong> {exp.startDate} - {exp.endDate}</p>
                                        <p><strong>Description:</strong> {exp.description}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <strong>Education:</strong>
                            <ul>
                                {resumeData.education.map((edu, index) => (
                                    <li key={index}>
                                        <p><strong>Degree:</strong> {edu.degree}</p>
                                        <p><strong>Institution:</strong> {edu.institution}</p>
                                        <p><strong>Duration:</strong> {edu.startDate} - {edu.endDate}</p>
                                        <p><strong>Description:</strong> {edu.description}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <strong>Skills:</strong>
                            <ul>
                                {resumeData.skills.map((skill, index) => (
                                    <li key={index}>{skill.name} : {skill.level}</li>
                                ))}
                            </ul>
                        </div>

                        {resumeData.projects && resumeData.projects.length > 0 && (
                            <div>
                                <strong>Projects:</strong>
                                <ul>
                                    {resumeData.projects.map((project, index) => (
                                        <li key={index}>
                                            <p><strong>Title:</strong> {project.title}</p>
                                            <p><strong>Description:</strong> {project.description}</p>
                                            {project.url && <p><strong>URL:</strong> <a href={project.url} target="_blank" rel="noopener noreferrer">{project.url}</a></p>}
                                            <p><strong>Technologies:</strong> {project.technologies.join(", ")}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {resumeData.languages && resumeData.languages.length > 0 && (
                            <div>
                                <strong>Languages:</strong>
                                <ul>
                                    {resumeData.languages.map((language, index) => (
                                        <li key={index}>{language}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {resumeData.certifications && resumeData.certifications.length > 0 && (
                            <div>
                                <strong>Certifications:</strong>
                                <ul>
                                    {resumeData.certifications.map((cert, index) => (
                                        <li key={index}>{cert}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {resumeData.hobbies && resumeData.hobbies.length > 0 && (
                            <div>
                                <strong>Hobbies:</strong>
                                <ul>
                                    {resumeData.hobbies.map((hobby, index) => (
                                        <li key={index}>{hobby}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <button onClick={downloadPDF} className="mt-4 bg-foreground text-background px-4 py-2 rounded hover:bg-gray-800 transition w-full flex justify-center items-center">
                        <FaDownload className="mr-2" />
                        Download as PDF
                    </button>
                </div>
            )}
        </div>
    );
}

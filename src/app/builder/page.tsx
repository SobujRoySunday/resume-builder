"use client";

import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { generateResumePDF } from "@/utils/pdfGenerator";
import { ResumeData } from "@/lib/resumeData";
import { RxCross2 } from "react-icons/rx";
import { FaEye } from "react-icons/fa6";
import PdfEmbedder from "./PdfViewer";

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
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [resumeData, setResumeData] = useState<ResumeData | null>(null);

    const onSubmit = async (data: ResumeData) => {
        setResumeData(data);
    };

    const previewPDF = async () => {
        if (resumeData) {
            const pdfBytes = await generateResumePDF(resumeData);
            const blob = new Blob([pdfBytes], { type: "application/pdf" });
            const url = URL.createObjectURL(blob);
            setPdfUrl(url);
        }
    }

    useEffect(() => {
        previewPDF();
    }, [resumeData])

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

            {pdfUrl && <PdfEmbedder pdfUrl={pdfUrl} />}
        </div>
    );
}

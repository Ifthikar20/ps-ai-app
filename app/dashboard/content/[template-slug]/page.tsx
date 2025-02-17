"use client";

import React, { useState, useEffect } from "react";
import FormSection from "../_components/FormSection";
import OutputSection from "../_components/OutputSection";
import { TEMPLATE } from "../../_components/TemplateListSection";
import templates from "@/app/(data)/Templates";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { chatSession } from "@/utils/AImodel";
// import { useUser } from "@clerk/nextjs";

export const runtime = 'edge';

interface PROPS {
    params: Promise<{ "template-slug": string }>; // ✅ `params` is a Promise
}

function CreateContent({ params }: PROPS) {
    const [resolvedParams, setResolvedParams] = useState<{ "template-slug": string } | null>(null);
    const [selectedTemplate, setSelectedTemplate] = useState<TEMPLATE | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const [aiOutput, setAiOutput] = useState<string>('');
    // const { user } = useUser();

    // ✅ Unwrap `params` using `React.use()`
    const unwrappedParams = React.use(params);

    useEffect(() => {
        if (unwrappedParams && unwrappedParams["template-slug"]) {
            const foundTemplate = templates.find((item) => item.slug === unwrappedParams["template-slug"]);
            setResolvedParams(unwrappedParams);
            setSelectedTemplate(foundTemplate);
        }
    }, [unwrappedParams]);

    const GenerateAIGame = async (formData: Record<string, string>) => {
        setLoading(true);

        try {
            if (!selectedTemplate) {
                console.error("❌ Error: No template selected.");
                return;
            }

            const selectedPrompt = selectedTemplate.aiPrompt;
            const finalAIPrompt = JSON.stringify(formData) + ", " + selectedPrompt;

            console.log("📝 Sending request to Gemini API:", finalAIPrompt);
            const result = await chatSession.sendMessage(finalAIPrompt);
            const responseText = await result.response.text();

            setAiOutput(responseText);

            if (selectedTemplate.slug) {
                await saveInDB(formData, selectedTemplate.slug, responseText);
            } else {
                console.error("❌ Error: Template slug is missing.");
            }

            console.log("✅ Response from Gemini API:", responseText);
        } catch (error) {
            console.error("❌ Error calling Gemini API:", error);
        } finally {
            setLoading(false);
        }
    };

    const saveInDB = async (formData: Record<string, string>, slug: string, aiResp: string | null) => {
        try {
            const formattedDate = new Date().toISOString();
            // const createdBy = user?.primaryEmailAddress?.emailAddress ?? "unknown";
            const createdBy = "dummyemail@example.com"; // Replace Clerk's user email with a dummy email

            console.log("📤 Sending API Request to /api/insert with:", {
                formData: JSON.stringify(formData),
                templateSlug: slug,
                aiResponse: aiResp,
                createdBy,
                createdAt: formattedDate,
            });
    
            const response = await fetch("/api/insert", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    formData: JSON.stringify(formData),
                    templateSlug: slug,
                    aiResponse: aiResp,
                    createdBy,
                    createdAt: formattedDate,
                }),
            });
    
            const data = await response.json();
            console.log("✅ API Response:", data);
    
            if (!response.ok) throw new Error(`❌ API Error: ${data || "Unknown error"}`);
    
        } catch (error) {
            console.error("❌ Error inserting data:", error);
        }
    };
    

    if (!resolvedParams) {
        return <div className="p-5 text-gray-500">Loading...</div>;
    }

    if (!selectedTemplate) {
        return <div className="p-5 text-red-500">Template not found.</div>;
    }

    return (
        <div className="p-5">
            <Link href={"/dashboard"}>
                <Button>
                    <ArrowLeft /> Back
                </Button>
            </Link>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 p-5">
                <FormSection
                    selectedTemplate={selectedTemplate}
                    userFormInput={GenerateAIGame}
                    loading={loading}
                />
                <div className="col-span-2">
                    <OutputSection aiOutput={aiOutput} />
                </div>
            </div>
        </div>
    );
}

export default CreateContent;

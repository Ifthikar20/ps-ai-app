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
// import { Logging } from "@google-cloud/logging"; // ❌ Removed Node.js module

export const runtime = "edge";

interface PROPS {
    params: Promise<{ "template-slug": string }>;
}

// ❌ Removed Google Cloud Logging as it is not supported in client components
// const logging = new Logging();
// const log = logging.log("gemini-api-requests");

// const logRequest = async (prompt: string, response: string | null, error: string | null) => {
//     const metadata = { resource: { type: "global" } };
//     const entry = log.entry(metadata, {
//         timestamp: new Date().toISOString(),
//         request: { prompt },
//         response: response ? { text: response } : null,
//         error: error ? { message: error } : null,
//     });

//     await log.write(entry);
// };

function CreateContent({ params }: PROPS) {
    const [resolvedParams, setResolvedParams] = useState<{ "template-slug": string } | null>(null);
    const [selectedTemplate, setSelectedTemplate] = useState<TEMPLATE | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);

    // ✅ Resolve params since it's a Promise
    useEffect(() => {
        params.then((p) => {
            setResolvedParams(p);
            const foundTemplate = templates.find((item) => item.slug === p["template-slug"]);
            setSelectedTemplate(foundTemplate);
        }).catch((err) => {
            console.error("Error resolving params:", err);
        });
    }, [params]);

    const GenerateAIGame = async (formData: Record<string, string>) => {
        setLoading(true);

        try {
            const selectedPrompt = selectedTemplate?.aiPrompt;
            const finalAIPrompt = JSON.stringify(formData) + ", " + selectedPrompt;

            console.log("📝 Sending request to Gemini API:", finalAIPrompt);
            const result = await chatSession.sendMessage(finalAIPrompt);
            const responseText = await result.response.text();

            console.log("✅ Response from Gemini API:", responseText);

            // ❌ Removed logging call
            // await logRequest(finalAIPrompt, responseText, null);

            setLoading(false);
        } catch (error) {
            console.error("❌ Error calling Gemini API:", error);
        
            // 🔹 Convert error to a string safely
            const errorMessage = error instanceof Error ? error.message : String(error);
        
            // ✅ Use errorMessage in the console
            console.error("❌ AI API Error Message:", errorMessage);
        
            setLoading(false);
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
                    userFormInput={GenerateAIGame} // ✅ Fix: Passing function directly
                    loading={loading} 
                />
                <div className="col-span-2">
                    <OutputSection />
                </div>
            </div>
        </div>
    );
}

export default CreateContent;

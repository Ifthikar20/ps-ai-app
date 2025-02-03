import React from "react";
import FormSection from "../_components/FormSection";
import OutputSection from "../_components/OutputSection";
import { TEMPLATE } from "../../_components/TemplateListSection";
import templates from "@/app/(data)/Templates";

interface PROPS {
  params: Promise<{ "template-slug": string }>; // ✅ params is now a Promise
}

function CreateContent({ params }: PROPS) {
  // ✅ Use React.use() to unwrap params
  const resolvedParams = React.use(params);
  
  // ✅ Now safely access the unwrapped value
  const selectedTemplate: TEMPLATE | undefined = templates.find(
    (item) => item.slug === resolvedParams["template-slug"]
  );

  if (!selectedTemplate) {
    return <div className="p-5 text-red-500">Template not found.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 p-5">
      <FormSection selectedTemplate={selectedTemplate} />
      <div className="col-span-2">
        <OutputSection />
      </div>
    </div>
  );
}

export default CreateContent;

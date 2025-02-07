"use client";

import React, { useState } from "react";
import { TEMPLATE, FORM } from "../../_components/TemplateListSection"; // ✅ Import FORM from the original source
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react"; // ✅ Fixed import

interface PROPS {
  selectedTemplate?: TEMPLATE;
  userFormInput: (data: Record<string, string>) => void; // ✅ Proper function type
  loading: boolean;
}

function FormSection({ selectedTemplate, userFormInput, loading }: PROPS) {
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    userFormInput(formData);
  };

  return (
    <div className="p-5 shadow-md border rounded-lg bg-">
      {selectedTemplate?.icon && (
        <Image src={selectedTemplate.icon} alt={selectedTemplate.name || "Template Icon"} width={70} height={70} />
      )}

      <h2 className="font-bold text-2xl mb-2 text-primary">{selectedTemplate?.name}</h2>
      <p className="text-gray-500 text-sm">{selectedTemplate?.desc}</p>

      <form className="mt-6" onSubmit={onSubmit}>
        {selectedTemplate?.form?.map((item: FORM) => ( // ✅ Correct typing now
          <div key={item.name} className="my-2 flex flex-col gap-2 mb-7">
            <label className="font-bold">{item.label}</label>

            {item.field === "input" ? (
              <Input name={item.name} required={item?.required} onChange={handleInputChange} />
            ) : item.field === "textarea" ? (
              <Textarea name={item.name} required={item?.required} onChange={handleInputChange} />
            ) : null}
          </div>
        ))}

        <Button className="w-full py-5 flex items-center justify-center" type="submit" disabled={loading}>
          {loading && <Loader2 className="animate-spin mr-2" />} {/* ✅ Fixed class name */}
          Create Game
        </Button>
      </form>
    </div>
  );
}

export default FormSection;

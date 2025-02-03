import templates from '@/app/(data)/Templates';
import React, { useEffect, useState } from 'react';
import TemplateCard from './TemplateCard';

export interface TEMPLATE {
  name: string;
  desc: string;
  icon: string;
  category: string;
  slug: string;
  aiPrompt: string;
  form?: FORM[];
}

export interface FORM {
  label: string;
  field: string;
  name: string;
  required?: boolean;
}

interface TemplateListSectionProps {
  userSearchInput?: string;
}

const TemplateListSection: React.FC<TemplateListSectionProps> = ({ userSearchInput }) => {
  const [templateList, setTemplateList] = useState<TEMPLATE[]>(templates);

  useEffect(() => {
    console.log(userSearchInput);
    if (userSearchInput) {
      const filterData = templates.filter((item) =>
        item.name.toLowerCase().includes(userSearchInput.toLowerCase())
      );
      setTemplateList(filterData);
    } else {
      setTemplateList(templates);
    }
  }, [userSearchInput]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-10">
      {templateList.map((item) => (
        <TemplateCard key={item.slug} {...item} />
      ))}
    </div>
  );
};

export default TemplateListSection;

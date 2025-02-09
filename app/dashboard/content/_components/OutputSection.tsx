import React from "react";

interface OutputSectionProps {
  aiOutput: string;
}

const OutputSection: React.FC<OutputSectionProps> = ({ aiOutput }) => {
  return (
    <div className="p-4 border rounded-md bg-gray-100">
      <h2 className="text-lg font-semibold">AI Output</h2>
      {aiOutput ? (
        <p className="mt-2 text-gray-800">{aiOutput}</p>
      ) : (
        <p className="mt-2 text-gray-500">No output yet. Generate AI content.</p>
      )}
    </div>
  );
};

export default OutputSection;

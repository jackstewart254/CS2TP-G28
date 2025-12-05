"use client";

interface TextWidgetProps {
  title: string;
  text: string;
}

export const TextWidget = ({ title, text }: TextWidgetProps) => {
  return (
    <div className="w-full h-full select-none">
      <div className="font-bold text-lg mb-2">{title}</div>
      <pre className="whitespace-pre text-sm">{text}</pre>
    </div>
  );
};

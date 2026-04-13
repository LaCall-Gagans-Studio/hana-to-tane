import React from 'react';
import Link from 'next/link';

export const CtaComponent = ({ fields }: { fields: any }) => {
  const getStyleClasses = (style: string) => {
    switch (style) {
      case 'secondary':
        return 'bg-lime text-text';
      case 'blue':
        return 'bg-blue text-text';
      case 'primary':
      default:
        return 'bg-pink text-text';
    }
  };

  return (
    <div className="my-10 flex justify-center not-prose">
      <Link 
        href={fields.url || '#'} 
        className={`px-8 py-4 rounded-full font-black border-3 border-border shadow-hard hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all ${getStyleClasses(fields.style)}`}
      >
        {fields.label}
      </Link>
    </div>
  );
};

export const AccordionComponent = ({ fields }: { fields: any }) => {
  return (
    <div className="my-8 flex flex-col gap-4 not-prose">
      {fields.items?.map((item: any, id: number) => (
        <details key={id} className="group bg-white border-3 border-border rounded-2xl shadow-hard overflow-hidden marker:content-['']">
          <summary className="flex justify-between items-center font-black p-5 cursor-pointer hover:bg-gray-50 list-none [&::-webkit-details-marker]:hidden">
            <span className="text-lg">{item.title}</span>
            <span className="text-2xl text-blue group-open:-scale-y-100 transition-transform duration-300">
              ▼
            </span>
          </summary>
          <div className="p-5 pt-0 border-t-3 border-border border-dashed mt-2">
            <p className="mt-4 text-gray-700 whitespace-pre-wrap leading-relaxed">
              {item.content}
            </p>
          </div>
        </details>
      ))}
    </div>
  );
};

export const CustomTableComponent = ({ fields }: { fields: any }) => {
  return (
    <div className="my-8 overflow-x-auto not-prose rounded-xl border-3 border-border shadow-hard">
      <table className="min-w-full border-collapse bg-white text-left">
        <tbody>
          {fields.rows?.map((row: any, rIndex: number) => (
            <tr key={rIndex} className={rIndex !== fields.rows.length - 1 ? 'border-b-3 border-border' : ''}>
              {row.columns?.map((col: any, cIndex: number) => {
                const Tag = col.isHeader ? 'th' : 'td';
                return (
                  <Tag 
                    key={cIndex} 
                    className={`p-4 ${cIndex !== row.columns.length - 1 ? 'border-r-3 border-border' : ''} ${col.isHeader ? 'bg-yellow font-black' : 'text-gray-700'}`}
                  >
                    {col.text}
                  </Tag>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

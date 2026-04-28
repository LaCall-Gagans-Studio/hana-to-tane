import React from 'react';
import Link from 'next/link';
import { RichText } from '@payloadcms/richtext-lexical/react';

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
            <div className="mt-4 text-gray-700 whitespace-pre-wrap leading-relaxed">
              <RichText data={item.content} />
            </div>
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

export const FlexibleColumnsComponent = ({ fields }: { fields: any }) => {
  const colCount = fields.columns?.length || 2;
  const gridClasses: Record<number, string> = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };
  const currentGridClass = gridClasses[colCount] || 'grid-cols-1 md:grid-cols-2';

  return (
    <div className={`my-8 grid ${currentGridClass} gap-8`}>
      {fields.columns?.map((col: any, index: number) => (
        <div key={index} className="flex flex-col gap-4">
          <RichText data={col.content} />
        </div>
      ))}
    </div>
  );
};

export const VideoEmbedComponent = ({ fields }: { fields: any }) => {
  const getEmbedUrl = (url: string) => {
    try {
      const parsedUrl = new URL(url);
      if (parsedUrl.hostname.includes('youtube.com') || parsedUrl.hostname.includes('youtu.be')) {
        const videoId = parsedUrl.hostname.includes('youtu.be') ? parsedUrl.pathname.slice(1) : parsedUrl.searchParams.get('v');
        return `https://www.youtube.com/embed/${videoId}`;
      } else if (parsedUrl.hostname.includes('vimeo.com')) {
        const videoId = parsedUrl.pathname.split('/').pop();
        return `https://player.vimeo.com/video/${videoId}`;
      }
    } catch (e) {
      return url;
    }
    return url;
  };

  return (
    <div className="my-8 relative w-full pb-[56.25%] h-0 rounded-2xl overflow-hidden border-3 border-border shadow-hard">
      <iframe
        src={getEmbedUrl(fields.url)}
        className="absolute top-0 left-0 w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export const CalloutComponent = ({ fields }: { fields: any }) => {
  const bgColors: { [key: string]: string } = {
    info: 'bg-blue/10 border-blue',
    warning: 'bg-yellow/20 border-yellow',
    success: 'bg-lime/20 border-lime',
  };

  return (
    <div className={`my-8 p-6 rounded-2xl border-l-8 border-y-3 border-r-3 shadow-hard flex gap-4 not-prose ${bgColors[fields.type || 'info']}`}>
      <div className="text-3xl shrink-0">{fields.icon || '💡'}</div>
      <div className="text-gray-800 leading-relaxed w-full">
        <RichText data={fields.content} />
      </div>
    </div>
  );
};

export const QuoteComponent = ({ fields }: { fields: any }) => {
  return (
    <figure className="my-10 p-8 bg-gray-50 rounded-2xl border-l-8 border-pink border-y-3 border-r-3 border-y-border border-r-border shadow-hard relative">
      <div className="absolute top-4 left-4 text-5xl text-pink/20 font-serif leading-none">&quot;</div>
      <blockquote className="relative z-10 text-xl font-bold text-gray-700 italic leading-relaxed mb-4 whitespace-pre-wrap">
        {fields.text}
      </blockquote>
      {(fields.source || fields.url) && (
        <figcaption className="text-right text-sm text-gray-500 mt-4 pt-4 border-t-2 border-dashed border-gray-200">
          — {fields.url ? (
            <a href={fields.url} target="_blank" rel="noopener noreferrer" className="text-blue hover:underline">
              {fields.source || fields.url}
            </a>
          ) : (
            <span>{fields.source}</span>
          )}
        </figcaption>
      )}
    </figure>
  );
};


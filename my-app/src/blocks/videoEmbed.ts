import { Block } from 'payload';

export const VideoEmbed: Block = {
  slug: 'videoEmbed',
  labels: {
    singular: '動画埋め込み',
    plural: '動画埋め込み',
  },
  fields: [
    {
      name: 'url',
      type: 'text',
      label: '動画URL (YouTube または Vimeo)',
      required: true,
    },
  ],
};

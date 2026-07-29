import { Block } from 'payload';

export const VideoEmbed: Block = {
  slug: 'videoEmbed',
  labels: {
    singular: '動画埋め込み',
    plural: '動画埋め込み',
  },
  admin: {
    group: 'メディア',
    components: {
      Block: '@/components/admin/blocks/VideoEmbedPreview#VideoEmbedBlockComponent',
      Label: '@/components/admin/blocks/VideoEmbedPreview#VideoEmbedBlockLabel',
    },
    images: {
      icon: { url: '/admin/block-icons/video.svg', alt: '動画埋め込み' },
      thumbnail: { url: '/admin/block-icons/video-thumb.svg', alt: '動画埋め込み' },
    },
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

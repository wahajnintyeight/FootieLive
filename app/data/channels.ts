export type Channel = {
  id: string;
  name: string;
  thumbnail: string;
  streamUrl: string;
};

export const channels: Channel[] = [
  {
    id: '1',
    name: 'Premier League Live',
    thumbnail:
      'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop',
    streamUrl: 'https://www.youtube.com/embed/aqz-KE-bpKQ',
  },
  {
    id: '2',
    name: 'Champions League',
    thumbnail:
      'https://images.unsplash.com/photo-1521412644187-c49fa049e84d?w=800&auto=format&fit=crop',
    streamUrl: 'https://www.youtube.com/embed/5qap5aO4i9A',
  },
  {
    id: '3',
    name: 'International Highlights',
    thumbnail:
      'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?w=800&auto=format&fit=crop',
    streamUrl: 'https://www.youtube.com/embed/jfKfPfyJRdk',
  },
];

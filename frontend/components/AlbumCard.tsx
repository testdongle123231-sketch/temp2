'use client';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { Album } from '@/types';
import { formatDate } from '@/utils/helpers';
import { useRouter } from 'next/navigation';
import { use } from 'react';

interface AlbumCardProps {
  album: Album;
}

export const AlbumCard = ({ album }: AlbumCardProps) => {
  const navigate = useRouter();
  const coverUrl = (album as any).coverUrl || 'https://images.pexels.com/photos/1616403/pexels-photo-1616403.jpeg?auto=compress&cs=tinysrgb&w=800';
  const artistName = (album as any).artistName || 'Unknown';
  const releaseDate = (album as any).releaseDate || new Date().toISOString();

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate.push(`/app/album/${album.id}`)}
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow cursor-pointer group"
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={coverUrl}
          alt={album.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-orange-500 text-white rounded-full p-4 shadow-xl hover:bg-orange-600 transition-colors"
          >
            <Play size={24} fill="white" />
          </motion.button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white truncate">{album.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{artistName}</p>
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">{formatDate(releaseDate)}</p>
      </div>
    </motion.div>
  );
};

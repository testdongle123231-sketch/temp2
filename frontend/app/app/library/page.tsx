'use client';
import { motion } from 'framer-motion';
import { Library as LibraryIcon, PlusCircle } from 'lucide-react';
import { usePlaylistStore } from '@/store/playlistStore';
import { PlaylistCard } from '@/components/PlaylistCard';
import { useToastStore } from '@/store/toastStore';
import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';

export default function Library() {
  const { playlists, createPlaylist } = usePlaylistStore();
  const { addToast } = useToastStore();
  const { user } = useAuthStore();
  const [backendPlaylists, setBackendPlaylists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylists = async () => {
      if (!user) return;
      try {
        const res = await api.get('/playlists/my-playlists').catch(() => ({ data: { data: [] } }));
        setBackendPlaylists(res.data.data || []);
      } catch (error) {
        console.error('Failed to fetch playlists:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaylists();
  }, [user]);

  const handleCreatePlaylist = async () => {
    try {
      createPlaylist('New Playlist', 'My awesome playlist');
      addToast('Playlist created successfully', 'success');
    } catch (error) {
      addToast('Failed to create playlist', 'error');
    }
  };

  const displayPlaylists = backendPlaylists.length > 0 ? backendPlaylists : playlists;

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <LibraryIcon size={32} className="text-orange-500" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Your Library</h1>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCreatePlaylist}
            className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-full font-semibold shadow-lg hover:bg-orange-600 transition-colors"
          >
            <PlusCircle size={20} />
            Create Playlist
          </motion.button>
        </div>

        {displayPlaylists.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {displayPlaylists.map((playlist) => (
              <PlaylistCard key={playlist.id} playlist={playlist} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <LibraryIcon size={64} className="mx-auto text-gray-300 dark:text-gray-700 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              No playlists yet
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Create your first playlist to start organizing your music
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCreatePlaylist}
              className="px-6 py-3 bg-orange-500 text-white rounded-full font-semibold shadow-lg hover:bg-orange-600 transition-colors"
            >
              Create Your First Playlist
            </motion.button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

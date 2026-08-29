import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

/**
 * useOnlineCount
 * Tracks how many unique browser tabs / users are currently viewing the site
 * using Supabase Realtime Presence.
 */
const useOnlineCount = () => {
  const [onlineCount, setOnlineCount] = useState(1);

  useEffect(() => {
    // Generate a unique ID for this browser session
    const userId = Math.random().toString(36).substring(2, 10);

    const channel = supabase.channel('online-visitors', {
      config: {
        presence: {
          key: userId,
        },
      },
    });

    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        setOnlineCount(Object.keys(state).length);
      })
      .on('presence', { event: 'join' }, () => {
        const state = channel.presenceState();
        setOnlineCount(Object.keys(state).length);
      })
      .on('presence', { event: 'leave' }, () => {
        const state = channel.presenceState();
        setOnlineCount(Object.keys(state).length);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({ online_at: new Date().toISOString() });
        }
      });

    return () => {
      channel.untrack();
      supabase.removeChannel(channel);
    };
  }, []);

  return onlineCount;
};

export default useOnlineCount;

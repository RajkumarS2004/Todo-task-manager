import { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from '../hooks/useAuth';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user) {
      const token = localStorage.getItem('token');
      
      // Get the WebSocket URL, fallback to API URL without /api, or default
      let wsUrl = import.meta.env.VITE_WS_URL;
      if (!wsUrl) {
        const apiUrl = import.meta.env.VITE_API_URL;
        if (apiUrl) {
          // Remove /api from the end if present
          wsUrl = apiUrl.replace(/\/api$/, '');
        } else {
          wsUrl = 'http://localhost:5000';
        }
      }
      
      console.log('Connecting to WebSocket:', wsUrl);
      
      const newSocket = io(wsUrl, {
        auth: { token },
        transports: ['websocket', 'polling'],
        timeout: 20000,
        forceNew: true
      });

      newSocket.on('connect', () => {
        console.log('Connected to server');
        setConnected(true);
      });

      newSocket.on('disconnect', () => {
        console.log('Disconnected from server');
        setConnected(false);
      });

      newSocket.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
        setConnected(false);
        
        // If it's an authentication error, try to reconnect without token
        if (error.message === 'Authentication error') {
          console.log('Authentication failed, trying without token...');
          const fallbackSocket = io(wsUrl, {
            transports: ['websocket', 'polling'],
            timeout: 20000,
            forceNew: true
          });
          
          fallbackSocket.on('connect', () => {
            console.log('Connected without authentication');
            setConnected(true);
            setSocket(fallbackSocket);
          });
          
          fallbackSocket.on('connect_error', (fallbackError) => {
            console.error('Fallback connection also failed:', fallbackError);
          });
        }
      });

      setSocket(newSocket);

      return () => {
        newSocket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
        setConnected(false);
      }
    }
  }, [isAuthenticated, user]);

  const emit = (event, data) => {
    if (socket && connected) {
      socket.emit(event, data);
    }
  };

  const on = (event, callback) => {
    if (socket) {
      socket.on(event, callback);
    }
  };

  const off = (event) => {
    if (socket) {
      socket.off(event);
    }
  };

  const value = {
    socket,
    connected,
    emit,
    on,
    off
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext }; 
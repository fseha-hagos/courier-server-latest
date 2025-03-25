import axios from "axios";

export const initializeKeepAlive = () => {
    const KEEP_ALIVE_INTERVAL = 5 * 60 * 1000; // 5 minutes
    setInterval(() => {
        // Make a health check request
        axios.get(`${process.env.RENDER_SERVICE_URL || 'https://courier-server.onrender.com'}/api/health`)
            .catch(() => {
                // Ignore errors, we just want to keep the service alive
            });
    }, KEEP_ALIVE_INTERVAL);
}; 
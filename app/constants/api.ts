// It's crucial that this IP address is the local IP of the machine running your backend server.
// On macOS/Linux, you can find this by running `ifconfig | grep "inet " | grep -v 127.0.0.1` in your terminal.
// On Windows, you can find this by running `ipconfig` in the Command Prompt.
const LOCAL_IP = '192.168.110.164'; // <-- ⚠️ This should be your computer's local IP

export const API_URL = `http://${LOCAL_IP}:3001`;
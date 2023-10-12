import { useState, useEffect } from 'react';
import axios from 'axios';

function IpAddress() {
  const [ipAddress, setIPAddress] = useState(null);

  useEffect(() => {
    // Fetch the IP address from the ipify API
    axios.get('https://api.ipify.org?format=json')
      .then((response) => {
        const { ip } = response.data;
        setIPAddress(ip);
      })
      .catch((error) => {
        console.error('Error fetching IP address:', error);
      });
  }, []);

  return ipAddress;
}

export default IpAddress;

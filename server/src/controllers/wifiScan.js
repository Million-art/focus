const wifi = require('node-wifi');

const wifiScan = {
    getAvailableWifi: async (req, res) => {
        try {
            // Initialize wifi module
            wifi.init({
                iface: null
            });

            // Scan for available networks
            const networks = await wifi.scan();

            // Extract SSID and MAC addresses from scanned networks
            const ssidAndMacAddresses = networks.map(network => ({
                ssid: network.ssid,
                macAddress: network.mac
            }));

            // Send SSID and MAC addresses to the frontend
            res.json({ networks: ssidAndMacAddresses });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to scan networks' });
        }
    }
};

module.exports = wifiScan;

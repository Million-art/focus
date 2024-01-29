const report = require('../model/Report'); //


const reportController = {
    getAllReport: async (req, res) => {
        try {
          const allReports = await reportController.getAllReport();
          res.status(200).json(allReports);
        } catch (error) {
          console.error('Error fetching reports:', error);
          res.status(500).json({ error: 'Error fetching reports' });
        }
      },
    
      addReport: async (req, res) => {
        try {
          const { report } = req.body;
    
          // Validate input data
          if (!report) {
            return res.status(400).json({ error: 'Invalid input data' });
          }
    
          const insertReport = await reportController.addReport(report);
          res.status(201).json(report);
        } catch (error) {
          console.error('Error sending report:', error);
          res.status(500).json({ error: 'Error sending report' });
        }
      },

      deleteReport: async (req, res) => {
        try {
          const { report } = req.body;
    
          // Validate input data
          if (!report) {
            return res.status(400).json({ error: 'Invalid input data' });
          }
    
          const deleteReport = await reportController.deleteReport(report);
          res.status(201).json(report);
        } catch (error) {
          console.error('Error sending report:', error);
          res.status(500).json({ error: 'Error sending report' });
        }
      },
}
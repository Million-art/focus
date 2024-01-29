const Router = require('../model/Router');

const routerController = {
  getAllRouters: async (req, res) => {
    try {
      const allRouters = await Router.getAllRouters();
      const routersWithoutSSIDAndMAC = allRouters.map(router => ({
        id: router.id,
        ssid: router.ssid,
      }));
      res.status(200).json(routersWithoutSSIDAndMAC);
    } catch (error) {
      console.error('Error fetching routers:', error);
      res.status(500).json({ error: 'Error fetching routers' });
    }
  },

  addRouter: async (req, res) => {
    try {
      const { router } = req.body;
      
      const existingRouter = await Router.getRouterBySSID(router.macAddress);
       if (existingRouter) {
        return res.status(400).json({ error: 'Router already exists in the database' });
      }
  
      const insertedRouter = await Router.addRouter(router);
      res.status(201).json({ id: insertedRouter.insertId });
    } catch (error) {
      console.error('Error adding router:', error);
      res.status(500).json({ error: 'Error adding router' });
    }
  },
  
  deleteRouter: async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: 'Invalid  id' });
      }

      await Router.deleteRouter(id);
      res.status(200).json({ message: 'Router deleted successfully' });
    } catch (error) {
      console.error('Error deleting router:', error);
      res.status(500).json({ error: 'Error deleting router' });
    }
  },
};

module.exports = routerController;

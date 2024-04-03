const Role = require('../models/roles');

// Controller functions
const roleController = {
  getAllroles: async (req, res) => {
    try {
      const roles = await Role.find();
      res.json(roles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

//   getCategoryById: async (req, res) => {
//     try {
//       const category = await Category.findById(req.params.id);
//       if (!category) {
//         return res.status(404).json({ message: 'Category not found' });
//       }
//       res.json(category);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   },

  createRole: async (req, res) => {
    try {
      const { name, description } = req.body;
      const role = new Role({ name, description });
      await role.save();
      res.status(201).json({ message: 'Role created successfully', category });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

 
  deleteRole: async (req, res) => {
    try {
      const deletedRole = await Category.findByIdAndDelete(req.params.id);
      if (!deletedRole) {
        return res.status(404).json({ message: 'Role not found' });
      }
      res.json({ message: 'Role deleted successfully', deletedRole });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = roleController;

const pool = require('../database/connect')

const getResources = async (req, res) => {
  try {
    const result = await pool.query('SELECT resource_url FROM games WHERE resource_url IS NOT NULL');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch resources' });
  }
};

module.exports = {
  getResources,
};

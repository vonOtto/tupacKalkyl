// api/offerter.js
const offerter = [
    { id: 1, namn: 'Jobb 1', pris: 1000 },
    { id: 2, namn: 'Jobb 2', pris: 2000 }
  ];
  
  module.exports = (req, res) => {
    if (req.method === 'GET') {
      res.status(200).json(offerter);
    } else {
      res.status(405).send('Method Not Allowed');
    }
  };
  
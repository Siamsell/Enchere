const app = require('./app');
const http = require('http');
const {connectDB} = require('./controllers/db_controller');
const  path = require('path');
console.log(path.join(__dirname, '../.env'));

require('dotenv').config();


async function init() {
   await connectDB();
   await removeExpiredAbonnements();

  setInterval(removeExpiredAbonnements, 12 * 60 * 60 * 1000);

}

async function removeExpiredAbonnements() {
  try {
    const deleted = await Abonnement.destroy({
      where: {
        date_fin: {
          [Op.lt]: new Date()
        }
      }
    });

    console.log(`[${new Date().toISOString()}] Removed ${deleted} expired abonnement(s).`);
  } catch (error) {
    console.error('Error removing expired abonnements:', error);
  }
}

init();

const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

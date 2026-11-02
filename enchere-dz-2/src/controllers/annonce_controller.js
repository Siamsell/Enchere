const Annonce = require('../models/Annonce');
const Media = require('../models/Media');
const User = require("../models/User")
const { Op, Sequelize } = require('sequelize');
const fs = require('fs');
const Abonnement = require('../models/Abonnement');

exports.statistique = async(req,res)=>{
  try {
    const countUser = await User.count();
    const countAnnonce = await Annonce.count();
    const countAbonnement = await Abonnement.count();
    res.json(
      {countUser,
      countAnnonce,
      countAbonnement}
      );
  } catch (error) {
    res.status(500)
  }
}


exports.addAnnonce = async (req, res) => {
  console.log("request create now");
  
  let requestAborted = false;

  req.on('close', () => {
    if (!res.writableEnded) {
      requestAborted = true;
      console.warn('❌ Upload request was aborted by the client.');
      cleanupTempFiles(req.files); // Delete partial uploads
    }
  });

  try {
    if (requestAborted) return;

    console.log(req.body);
    

    const annonce = await Annonce.create(req.body);

    if (req.files && req.files.length > 0) {
      const medias = req.files.map(file => ({
        id_annonce: annonce.id,
        path: file.filename,
        image: file.mimetype.startsWith('image/')
      }));

      await Media.bulkCreate(medias);
    }
    console.log("anoonce created");
    

    res.status(201).json({ message: 'Annonce created', annonce });
  } catch (err) {
     cleanupTempFiles(req.files);
    console.error(err);
    res.status(500).json({ error: 'Failed to create annonce.' });
  }
};

function cleanupTempFiles(files) {
  if (!files || !files.length) return;

  for (const file of files) {
    fs.unlink(file.path, (err) => {
      if (err) console.error('Failed to delete temp file:', file.filename);
      else console.log('🧹 Deleted temp file:', file.filename);
    });
  }
}




exports.getAnnonces = async (req, res) => {
  try {
    const limit = 10;
    const lastItemDate = req.body.lastItemDate || null;

    const where = lastItemDate ? {
      date_debut: { 
        [Op.lt]: lastItemDate 
        },
      status: "accepte"

    } : {
      status: "accepte"
    };

    const results = await Annonce.findAll({
      where,
      
      order: [['date_debut', 'DESC']], 
      limit,
      include:[
        {
          model:Media,
          as:"medias",
          order: [
          ['image', 'DESC']  
          ]
        }
      ]
    });

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.getAdmineAnnonces = async (req,res)=>{
  try {
    console.log("get admin annonces");
    
    const annonce = await Annonce.findAll({
      include:[
        {
          model:User,
          as:"user"
        },{
          model:Media,
          as:"medias",
          order: [
          ['image', 'DESC']  
          ]
        }
      ]
    });
    res.json(annonce)
  } catch (error) {
    console.log(error);
    
    res.status(500).send(error);
  }
}

exports.getMyAnnonces = async (req,res)=>{
  try {
    const annnonce = await Annonce.findAll({where:{user_id:req.params.id},include:[
     
    {
      model:Media,
      as:"medias",
      order: [
    ['image', 'DESC']  
  ]
    },
  ]});
    res.json(annnonce)
  } catch (error) {
    res.send(500)
  }
}


exports.getAnnonceDetails = async (req,res) => {
  try {
    const id = req.params.id;
    await Annonce.increment('vues', { where: { id } });
    const annnonce = await Annonce.findByPk(id,{include:[
      {
      model:User,
      as:"user"
    },
    {
      model:Media,
      as:"medias",
      order: [
    ['image', 'DESC']  
  ]
    },
  ]});
  res.json(annnonce)
  } catch (error) {
    res.status(500)
  }
};


exports.searchAnnonces = async (req, res) => {
  const query = req.query.q?.trim();
const l = req.query.limit ? parseInt(req.query.limit) : null;
  if (!query || query.length < 2) return res.json([]);
  
  const words = query.split(/\s+/);
  const safeQuery = query.replace(/['"]/g, ''); // Remove quotes instead of escaping
  
  // Build conditions for individual words matching titre OR description
  const wordConditions = words.map(word => {
    const safeWord = word.replace(/['"]/g, ''); // Remove quotes instead of escaping
    return {
      [Op.or]: [
        Sequelize.where(
          Sequelize.fn('LOWER', Sequelize.col('titre')), 
          'LIKE', 
          `%${safeWord.toLowerCase()}%`
        ),
        Sequelize.where(
          Sequelize.fn('LOWER', Sequelize.col('description')), 
          'LIKE', 
          `%${safeWord.toLowerCase()}%`
        )
      ]
    };
  });

  try {
    const results = await Annonce.findAll({

      where: {
        [Op.or]: [
          // Full query matches
          Sequelize.where(
            Sequelize.fn('LOWER', Sequelize.col('titre')), 
            'LIKE', 
            `%${safeQuery.toLowerCase()}%`
          ),
          Sequelize.where(
            Sequelize.fn('LOWER', Sequelize.col('description')), 
            'LIKE', 
            `%${safeQuery.toLowerCase()}%`
          ),
          // Individual word matches
          { [Op.and]: wordConditions }
        ],
        status: "accepte"
      },
      order: [
        [Sequelize.literal(`
          CASE
            WHEN LOWER(titre) LIKE '%${safeQuery.toLowerCase()}%' THEN 0
            WHEN LOWER(description) LIKE '%${safeQuery.toLowerCase()}%' THEN 1
            ELSE 2
          END
        `), 'ASC'],
        ['titre', 'ASC']
      ],
      limit: l,
      include:[
{
  model: Media,
  as: 'medias',
  limit: 1,
  separate: true,
  order: [
    ['image', 'DESC']  
  ]
}
        
      ]
    });
    
    res.json(results);
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ error: 'Search failed', details: err.message });
  }
};


exports.deleteAnnonce = async (req, res) => {
  try {
    const id = req.params.id;
    const annonce = await Annonce.destroy({ where: { id } });
    
    if (!annonce) {
      console.error(`Annonce with ID ${id} not found.`);
      return res.status(404).json({ error: 'Annonce not found' });
    }

    console.log(`Annonce with ID ${id} deleted successfully.`);


    // Delete associated media files
    const medias = await Media.findAll({ where: { id_annonce: id } });
    for (const media of medias) {
      const filePath = path.join(__dirname, '..', '..', 'uploads', media.path);
      fs.unlink(filePath, (err) => {
        if (err) console.error('Failed to delete media file:', filePath);
      });
    }
    console.log(`Annonce with ID ${id} deleted media successfully.`);

    

    res.json({ message: 'Annonce deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete annonce' });
  }
}

exports.getAdminAnnonces = async (req, res) => {
  try {
    const limit = 10;
    const lastItemDate = req.body.lastItemDate || null;

    const where = lastItemDate ? {
      date_debut: { [Op.lt]: lastItemDate }
    } : {};

    const results = await Annonce.findAll({
      where,
      order: [['date_debut', 'DESC']], 
      limit,
      include:[
        {
          model:Media,
          as:"medias",
          order: [
          ['image', 'DESC']  
          ]
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'fullname', 'email','phone']
        }
      ]
    });

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.updateAnnonce = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("update id = "+req.params.id,req.body);
    
    const [updated] = await Annonce.update(req.body, { where: { id } });

    if (!updated) {
      return res.status(404).json({ error: 'Annonce not found' });
    }

   

    res.json({ message: 'Annonce updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update annonce' });
  }
}
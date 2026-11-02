const { Op, Sequelize, where } = require('sequelize');
const Abonnement = require("../models/Abonnement");
const User = require('../models/User');

exports.createAbonnnement = async (req,res)=>{
    try {

       if(req.body.duree){
        if(req.body.duree == "1"){
            req.body.price = 5000;
        }else if(req.body.duree == "6"){
            req.body.price = 25000;
        }else if(req.body.duree == "12"){
            req.body.price = 45000;
        }
       }

       console.log(req.body);
       
       
        const abonnement = await Abonnement.create(req.body);
        res.json(abonnement);
    } catch (error) {
        console.error(error);
        return res.status(500)
    }
}

exports.deleteAbonnnement = async (req,res)=>{
    try {
        const abonnement = await Abonnement.destroy({where:{
            id:req.params.id
        }});
        res.json(abonnement);
    } catch (error) {
        return res.status(500)
    }
}

exports.updateAbonnement = async (req,res)=>{
    try {

        const abonnement = await Abonnement.findOne({where:{
            id:req.params.id
        }});

        

        req.body.date_debut = new Date();
        req.body.date_fin = new Date(new Date().setMonth(new Date().getMonth() + parseInt(abonnement.duree)));
        req.body.status = req.body.status || "attente";



        await Abonnement.update(req.body,{where:{
            id:req.params.id
        }});
        res.json({message:"updated successfully"});
    } catch (error) {
                return res.status(500)

    }
}

exports.userAbonnment = async (req,res)=>{
    try {
        const userAbonnment = await Abonnement.findOne({where:{user_id:req.params.user_id}});
        res.json(userAbonnment);
    } catch (error) {
        return res.status(500)

    }
}

exports.getAllAbonnment = async (req,res)=>{
    try {
        
        const userAbonnment = await Abonnement.findAll({
            include:[
                {
                    model:User,
                    as:"user",
                }
            ]
        });
        res.json(userAbonnment);
    } catch (error) {
        console.log(error);
        
        return res.status(500)

    }
}

exports.activeAbonnement = async (req,res)=>{
    try {
        const abonnement = await Abonnement.findOne({
            where: {
                user_id: req.params.user_id,
                status: "succes",
                date_fin: {
      [Op.gte]: new Date()
    }
            }
        });
        res.json(abonnement);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
}
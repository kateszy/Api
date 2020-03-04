const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const authenticate = require('../middleware/authenticate');

const Brand = require('../models/brand');
const Product = require('../models/product');
const Category = require('../models/category');




router.get('/', (req, res, next) => {

    Brand.find({})
    .select('_id name price productPic slug')
    .exec()
    .then(brands => {
        res.status(200).json({
            message: brands
        });
    })
    .catch(er => {
        res.status(500).json({
            error: er
        });
    })

});

router.post('/create', authenticate, (req, res, next) => {

    const brand = new Brand({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        slug: req.body.slug,
        createdAt: new Date(),
        createdBy: req.body.createdBy
    });

    brand.save()
    .then(brand => {
        res.status(201).json({
            message: brand
        });
    })
    .catch(er => {
        res.status(500).json({
            error: er
        })
    });

});

router.get('/:brandSlug', (req, res, next) => {

    const slug = req.params.brandSlug;
    Brand.findOne({slug: slug})
    .select('_id')
    .exec()
    .then(brand => {
        if(brand){
                Product.find({brand: brand._id})
                .select('_id name price productPic brand slug')
                .exec()
                .then(products => {
                    res.status(200).json({
                        message: products
                    })
                })
                .catch(error => {
                    return res.status(404).json({
                        message: error
                    })
                })
        }else{
            return res.status(404).json({
                message: 'Not Found'
            })
        }
    })
    .catch(er => {
        res.status(500).json({
            error: er
        });
    });
});

router.get('/:categorySlug/:brandSlug', (req, res, next) => {


    const catslug = req.params.categorySlug;
    Category.findOne({slug: catslug})
    .select('_id')
    .exec()
    .then(category => {
        if(category){
                Product.find({category: category._id})
                .select('_id name price productPic category slug')
                .exec()
                .then(brand => {
                    if(brand){
                            Product.find({brand: brand._id})
                            .select('_id name price productPic brand slug')
                            .exec()
                            .then(products => {
                                res.status(200).json({
                                    message: products
                                })
                            })
                            .catch(error => {
                                return res.status(404).json({
                                    message: error
                                })
                            })
                    }else{
                        return res.status(404).json({
                            message: 'Not Found'
                        })
                    }
                })
                .catch(error => {
                    return res.status(404).json({
                        message: error
                    })
                })
        }else{
            return res.status(404).json({
                message: 'Not Found'
            })
        }
    })
    .catch(er => {
        res.status(500).json({
            error: er
        });
    });
});


module.exports = router;
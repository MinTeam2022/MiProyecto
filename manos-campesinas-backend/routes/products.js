const express = require('express')
const router = express.Router()

const { Product } = require('../models')

router.get('/', (req, res) => {
    Product.findAll().then(products => {
        res.status(200).json(products);
    }).catch(error => {
        res.status(503).send()
    })

})

//Obtener un usuario por id
router.get('/:id', (req, res) => {
    const id = req.params.id;
    Product.findOne({
        where: {
            id: id
        }
    }).then(product => {
        if (!product) {
            res.status(404).json({ message: "Not found" })
        }
        res.status(200).json(product)
    }).catch(error => {
        res.status(503).json(error)
    })
})


router.post('/', (req, res) => {
    const body = req.body;
    Product.create(body).then(createdProduct => {
        res.status(201).json(createdProduct);
    }).catch(error => {
        res.status(503).json(error)
    })
})

router.put("/:id", (req, res) => {
    const id = req.params.id;
    const body = req.body;
    Product.update(body, {
        where: {
            id
        }
    }).then(success => {
        if (success) {
            res.status(200).send()
        } else {
            res.status(503).json(error)
        }

    }).catch(error => {
        res.status(503).json(error)
    })
})


router.delete("/:id", (req, res) => {
    const id = req.params.id;
    Product.destroy({
        where: {
            id: id
        }
    }).then(success => {
        if (success) {
            res.status(200).json({ message: "Deletion succesful" })
        } else {
            res.status(404).json({ message: "Not found" })
        }

    }).catch(error => {
        res.status(503).json(error)
    })
})

module.exports = router
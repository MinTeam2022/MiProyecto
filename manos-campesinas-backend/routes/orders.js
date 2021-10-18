const express = require('express')
const router = express.Router()

const { Op } = require('sequelize');

const { Order, User } = require('../models')

router.get('/', async (req, res) => {
    const { clientId = null } = req.query
    findAllQuery = {
        attributes: { exclude: ['clienteId', 'vendedorId'] },
        include: [
            {
                attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'username'] },
                model: User,
                as: 'cliente',

            },
            {
                attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
                model: User,
                as: 'vendedor'
            }
        ]
    }
    if (clientId) {
        findAllQuery.include[0] = {
            where: {
                documentId: {
                    [Op.like]: `%${clientId}%`
                }
            },
            ...findAllQuery.include[0]
        }
    }
    console.log(findAllQuery)

    try {
        let orders = await Order.findAll(findAllQuery)
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).send(error)
    }

})

//Obtener un usuario por id
router.get('/:id', (req, res) => {
    const id = req.params.id;
    Order.findOne({
        where: {
            id: id
        }
    }).then(order => {
        if (!order) {
            res.status(404).json({ message: "order not found" })
        }
        res.status(200).json(order)
    }).catch(error => {
        res.status(503).json(error)
    })
})


router.post('/', async (req, res) => {
    const { order, products } = req.body;
    try {
        const newOrder = await Order.create(order)
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(503).json(error)
    }

})

router.put("/:id", (req, res) => {
    const { id } = req.params;
    res.send("Not implemented")
})


router.delete("/:id", (req, res) => {
    const id = req.params.id;
    res.send("Not implemented")

})

module.exports = router
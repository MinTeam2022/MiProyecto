const express = require('express')
const router = express.Router()

const { Op } = require('sequelize');

const { Order, User, Product, OrderProducts } = require('../models')

router.get('/', async (req, res) => {
    const { clientId = null } = req.query
    findAllQuery = {
        attributes: { exclude: ['clienteId', 'vendedorId'] },
        include: [
            {
                attributes: { exclude: ['createdAt', 'updatedAt', 'username'] },
                model: User,
                as: 'cliente',

            },
            {
                attributes: { exclude: ['createdAt', 'updatedAt'] },
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
        },
        include: 'Products'
    }).then(async (order) => {
        if (!order) {
            res.status(404).json({ message: "order not found" })
        }
        console.log(await order.getProducts())
        res.status(200).json(order)
    }).catch(error => {
        res.status(503).json(error)
    })
})


router.post('/', async (req, res, next) => {
    try {
        const { order, products } = req.body
        const { clientName, clientDocumentId, vendedorId } = order
        if (!clientDocumentId) {
            res.status(400).json({ message: "Faltan parametros" })
        }
        const [client, _] = await User.findOrCreate({
            where: { documentId: clientDocumentId, role: "cliente" },
            defaults: {
                name: clientName
            }
        })
        const newOrder = await Order.create({
            clienteId: client.id,
            vendedorId,
        })
        await Promise.all(products.map(async (p) => {
            try {
                const op = await Product.findOne({ where: { id: p.id } })
                if (op) {
                    await newOrder.addProduct(op, { through: { quantity: p.quantity } })
                }
            } catch (error) {
                next(error)
            }
        }))
        const productsInOrder = await newOrder.getProducts()
        newOrder.total = productsInOrder.reduce((acc, current) => acc + current.price * current.OrderProducts.quantity, 0)
        newOrder.save({ fields: ['total'] })
        res.status(201).json({ message: "La orden ha sido creada" })
    } catch (error) {
        next(error)
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
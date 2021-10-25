const express = require('express')
const router = express.Router()
const isAdminOrVendedor = require('../middlewares/isAdminOrVendedor')
const authentication = require('../middlewares/authentication')

const { User } = require('../models')

router.get('/',
    // authentication,
    // isAdminOrVendedor,
    (req, res) => {
        User.findAll().then(users => {
            res.status(200).json(users);
        }).catch(error => {
            res.status(503).send()
        })

    })

//Obtener un usuario por id
router.get('/:id', (req, res) => {
    const id = req.params.id;
    User.findOne({
        where: {
            id: id
        }
    }).then(user => {
        if (!user) {
            res.status(404).json({ message: "User not found" })
        }
        res.status(200).json(user)
    }).catch(error => {
        res.status(503).json(error)
    })
})


router.post('/', (req, res) => {
    const body = req.body;
    if (body.role == "cliente") {
        body.status = "activo"
    }
    User.create(body).then(createdUser => {
        res.status(201).json(createdUser);
    }).catch(error => {
        res.status(503).json(error)
    })
})

router.put("/:id", (req, res) => {
    const id = req.params.id;
    const body = req.body;
    User.update(body, {
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
    User.destroy({
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
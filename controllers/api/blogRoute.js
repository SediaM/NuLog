const router = require("express").Router();
const { Blog } = require("../../models/");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, (req, res) => {
    const body = req.body;
    console.log(req.session.userId);
    Blog.create({ ...body, userId: req.session.userId })
        .then(newBlog => {
            res.json(newBlog);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.put("/:id", withAuth, (req, res) => {
    console.log(req.body, req.params.id)
    Blog.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(affectedRows => {
            if (affectedRows > 0) {
                res.status(200).end();
            } else {
                res.status(404).end();
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.delete("/:id", withAuth, (req, res) => {
    console.log(req.body, req.params.id)
    Blog.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(affectedRows => {
            if (affectedRows > 0) {
                res.status(200).end();
            } else {
                res.status(404).end();
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = router;
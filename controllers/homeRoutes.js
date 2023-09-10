const router = require("express").Router();
const { Blog, Comment, User } = require("../models");

// get all posts for homepage
router.get("/", (req, res) => {
    Blog.findAll({
        include: [User],
    })
        .then((blogData) => {
            const blogs = blogData.map((blog) => blog.get({ plain: true }));

            res.render("all-blog-posts", { blogs });
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

// get single post
router.get("/post/:id", (req, res) => {
    Blog.findByPk(req.params.id, {
        include: [
            User,
            {
                model: Comment,
                include: [User],
            },
        ],
    })
        .then((blogData) => {
            if (blogData) {
                const blogs = blogData.get({ plain: true });

                res.render("single-blog-post", { blogs });
            } else {
                res.status(404).end();
            }
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

router.get("/login", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect("/");
        return;
    }

    res.render("login");
});

router.get("/signup", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect("/");
        return;
    }

    res.render("signup");
});

module.exports = router;

const express = require("express")

const db = require("../db/db")

const router = express.Router()

// put routes here
router.get("/", (req, res) => {
	db.getPosts()
		.then((posts) => {
			res.json(posts)
		})
		.catch((err) => {
			res.json(err)
		})
})

router.post("/", (req, res) => {
	db.addPost(req.body).then((newId) => {
		res.json(newId)
	})
})

router.put("/:id", (req, res) => {
	const id = Number(req.params.id)

	const updatedPost = {
		...req.body,
		date_created: new Date(Date.now())
	}

	console.log(updatedPost)

	db.editPost(id, updatedPost).then(() => {
		db.getPost(id).then((user) => {
			res.json(user)
		})
	})
})

module.exports = router

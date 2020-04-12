const config = require("../../knexfile").development
const db = require("knex")(config)

function getPosts() {
	return db("posts")
		.select(
			"id",
			"title",
			"date_created as dateCreated",
			"comment_count as commentCount",
			"paragraphs"
		)
		.then((posts) => {
			posts.map((post) => {
				post.paragraphs = JSON.parse(post.paragraphs)
				return post
			})
			console.log(posts)
			return posts
		})
}

function getPost(id) {
	return db("posts").where("id", id).select()
}

function addPost(newPost) {
	newPost.paragraphs = JSON.stringify(newPost.paragraphs)
	return db("posts").insert(newPost)
}

function editPost(id, editedPost) {
	editedPost.paragraphs ? JSON.stringify(editedPost.paragraphs) : null
	return db("posts").update(editedPost).where("id", id)
}

module.exports = {
	getPosts,
	getPost,
	addPost,
	editPost
}

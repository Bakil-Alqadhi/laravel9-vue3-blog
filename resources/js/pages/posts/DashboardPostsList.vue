<template>
<div class="categories-list">
    <h1>Posts List</h1>
    <!-- Delete message -->
    <div class="success-msg" v-if="deleteSuccess">
        <i class="fa fa-check"></i>
        Post deleted successfully
    </div>
    <!-- success message -->
    <div class="success-msg" v-if="editSuccess">
        <i class="fa fa-check"></i>
        Post Updated successfully
    </div>
    <div class="item" v-for="(post, index ) in posts" :key="post.id">
        <span> {{ index + 1 }}</span>
        <p>{{ post.title }}</p>
        <div>
            <router-link :to="{ name: 'EditPosts', params:{ slug: post.slug} }" href="" class="edit-link">Edit</router-link>
        </div>
        <input type="button" @click="destroy(post.slug)" value="Delete" class="delete-btn"/>
    </div>
    <div class="index-categories">
        <router-link :to="{ name: 'CreatePosts' }">Create post<span>&#8594;</span></router-link>
    </div>
</div>
</template>

<script>
export default {
    emits: ["updateSidebar"],
    props: ['editSuccess', 'deleteSuccess'],
    data() {
        return {
            posts: [],
        }
    },
    methods: {
        destroy(slug) {
            axios
            .delete(`/api/posts/${slug}`)
                .then(() => {
                    this.fetchPosts()
                    this.$emit('showDeleteSuccess')
                })
                .catch((error) => {
                    if (error.response.status === 403) {
                        this.$router.push({
                            name: 'DashboardPostsList'
                        });
                    }
                });
        },
        fetchPosts(){
            axios.get('/api/dashboard-posts')
            .then((response) => {
                this.posts = response.data.data
                console.log(this.posts)
            })
            .catch((error) => console.log(error))
        }
    },
    mounted() {
        this.fetchPosts();
    }

}
</script>

<style scoped>
.categories-list {
    min-height: 100vh;
    background: #fff;
}

.categories-list h1 {
    font-weight: 300;
    padding: 50px 0 30px 0;
    text-align: center;
}

.categories-list .item {
    display: flex;
    justify-content: right;
    align-items: center;
    max-width: 300px;
    margin: 0 auto !important;
}

.categories-list .item p {
    font-size: 16px;
}

.categories-list .item p,
.categories-list .item div,
.categories-list .item {
    margin: 15px 8px;
}

.categories ul li {
    list-style: none;
    background-color: #494949;
    margin: 20px 5px;
    border-radius: 15px;
}

.categories ul {
    display: flex;
    justify-content: center;
}

.categories a {
    color: white;
    padding: 10px 20px;
    display: inline-block;
}

.create-categories a,
.index-categories a {
    all: revert;
    margin: 20px 0;
    display: inline-block;
    text-decoration: none;
}

.create-categories a span,
.index-categories a span {
    font-size: 22px;
}

.index-categories {
    text-align: center;
}
</style>

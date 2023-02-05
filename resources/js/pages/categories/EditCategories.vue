<template>
<div id="create-categories">
    <div id="contact-us">
        <h1>Edit Category!</h1>
        <div class="contact-form">
            <form @submit.prevent="update">
                <label for="name"><span>Name</span></label>
                <input type="text" id="name" v-model="fields.name" />
                <span v-if="errors.name" class="error"> {{ errors.name[0] }}</span>
                <input type="submit" value="Submit" />
            </form>
        </div>
        <div class="create-categories">
            <RouterLink :to="{ name: 'CategoriesList', params: {
                            theMessage: 'nothing'
                        } }">Categories list <span>&#8594;</span></RouterLink>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: ['id'],
    data() {
        return {
            fields: {},
            errors: {},
            success: false
        }
    },
    methods: {
        update() {
            axios
                .put("/api/categories/"+this.id , this.fields)
                .then(() => {
                    console.log(this.fields)
                    this.fields = {};
                    this.errors = {};
                    this.$emit("showEditSuccess")
                    this.$router.push({
                        name: 'CategoriesList'
                    })
                })
                .catch((error) => {
                    this.errors = error.response.data.errors;
                })
        },
    },
    mounted() {
        axios
            .get("/api/categories/" + this.id)
            .then(response => this.fields = response.data)
            .catch((error) => {
                this.errors = error.response.data.errors;
            })
    }
}
</script>

<style scoped>
#create-categories {
    background-color: #f3f4f6;
    height: 90vh;
    padding: 50px;
}
</style>

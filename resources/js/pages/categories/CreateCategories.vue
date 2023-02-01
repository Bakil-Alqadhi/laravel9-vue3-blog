<template>
<div id="create-categories">
    <div id="contact-us">
        <div class="contact-form">
            <form @submit.prevent="submit">
                <label for="name"><span>Name</span></label>
                <input type="text" id="name" v-model="fields.name" />
                <span v-if="errors.name" class="error"> {{ errors.name[0] }}</span>
                <input type="submit" value="Submit" />
            </form>
        </div>
        <div class="create-categories">
            <RouterLink :to="{ name: 'CategoriesList' , params: {
                            theMessage: 'nothing'
                        }}">Categories list <span>&#8594;</span></RouterLink>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            fields: {},
            errors: {},
        }
    },
    methods: {
        submit() {
            axios
                .post("/api/categories/create", this.fields)
                .then(() => {
                    console.log(this.fields)
                    this.fields = {};
                    this.errors = {};
                    this.$router.push({
                        name: 'CategoriesList',
                        params: {
                            theMessage: 'Category created successfully'
                        }
                    })
                })
                .catch((error) => {
                    this.errors = error.response.data.errors;
                })
        }

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

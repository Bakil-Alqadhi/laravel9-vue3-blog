<template>
    <div id="wrapper">
        <!-- sidebar -->
        <div class="sidebar" :class="{ showOverlay : overlayVisibility }">
        <span class="closeButton" @click="hideOverlay">&times;</span>
        <p class="brand-title"><a href="">Bakil's Blog</a></p>

        <div class="side-links">
            <ul>
            <li><router-link @click="hideOverlay" :to="{ name: 'Home' }">Home</router-link></li>
            <li><router-link @click="hideOverlay" :to="{ name: 'Blog' }">Blog</router-link></li>
            <li><router-link @click="hideOverlay" :to="{ name: 'About' }">About</router-link></li>
            <li><router-link @click="hideOverlay" :to="{ name: 'Contact' }">Contact</router-link></li>
            <li v-if="!loggedIn"><router-link @click="hideOverlay" :to="{ name: 'Register' }">Register</router-link></li>
            <li v-if="!loggedIn"><router-link @click="hideOverlay" :to="{ name: 'Login' }">Login</router-link></li>
            <li v-if="loggedIn"><router-link @click="hideOverlay"  :to="{ name: 'Dashboard' }">Dashboard</router-link></li>

            </ul>
        </div>

        <!-- sidebar footer -->
        <footer class="sidebar-footer">
            <div>
            <a href=""><i class="fab fa-facebook-f"></i></a>
            <a href=""><i class="fab fa-instagram"></i></a>
            <a href=""><i class="fab fa-twitter"></i></a>
            </div>

            <small>&copy; 2022 Bakil's Blog</small>
        </footer>
        </div>
        <!-- Menu Button -->
        <div class="menuButton" @click="showOverlay">
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        </div>
        <!-- main -->
        <main class="container">
        <!-- render components depending on the page visited -->

        <router-view @updateSidebar="update_sidebar" :key="$route.path"></router-view>
        </main>

        <!-- Main footer -->
        <footer class="main-footer">
        <div>
            <a href=""><i class="fab fa-facebook-f"></i></a>
            <a href=""><i class="fab fa-instagram"></i></a>
            <a href=""><i class="fab fa-twitter"></i></a>
        </div>
        <small>&copy; 2022 Bakil's Blog</small>
        </footer>
    </div>
</template>

<script>
export default {
    data(){
        return {
            overlayVisibility: false,
            loggedIn: false
        }
    },
    methods: {
        showOverlay(){
            this.overlayVisibility = true
        },
        hideOverlay(){
            this.overlayVisibility = false
        },
        update_sidebar(){
            this.loggedIn = !this.loggedIn
        }
    },
    mounted() {
            if(localStorage.getItem('authenticated')){
                this.loggedIn = true
            } else {
                this.loggedIn = false
                this.$emit('updateSideBar')
            }
        }
}
</script>

<style scoped>
.showOverlay {
    width: 100%;
    z-index: 1;
}
</style>

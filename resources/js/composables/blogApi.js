import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
axios.defaults.baseURL = "/api/";

export default function useBlogs() {
    const user = ref({});
    const router = useRouter();
    const errors = ref({});

    const registration = (data) => {
        axios
            .post("register", data)
            .then(router.push({ name: "Dashboard" }))
            .catch((error) => {
                errors.value = error.response.data.errors;
            });
    };
    const getUser = () => {
        axios
            .get("user")
            .then((response) => (user.value = response.data))
            .catch((error) => console.log(error.response.data.errors));
    };

    const logout = () => {
        axios
            .post("logout")
            .then(() => {
                router.push({ name: "Home" });
                localStorage.removeItem("authenticated");
            })
            .catch((error) => console.log(error.response.data.errors));
    };
    // const login = (data) => {
    //     axios
    //         .post("login", data)
    //         .then(() => {
    //             router.push({ name: "Dashboard" });
    //             localStorage.setItem("authenticated", "true");
    //             defineEmits(["updateSideBar"]);
    //         })
    //         .catch((error) => (errors.value = error.response.data.errors));
    // };

    return {
        registration,
        errors,
        getUser,
        user,
        logout,
        //login,
    };
}

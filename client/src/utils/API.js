import axios from "axios";
export default {
    signup: function (input) {
        return axios.post("/api/signup/", input);
    },
    authenticate: function (input) {
        return axios.post("/api/authenticate/", input);
    },
    getUser: function () {
        return axios.get("/api/me", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
    },
    createRecipe: function (recipe) {
        return axios.post("/api/recipes", recipe);
    },
    deleteRecipe: function (id) {
        return axios.delete("/api/recipes/" + id);
    },
    getUserRecipes: function (id) {
        return axios.get("/api/recipes/" + id);
    },
    getAllRecipes: function () {
        return axios.get("/api/recipes");
    }
};
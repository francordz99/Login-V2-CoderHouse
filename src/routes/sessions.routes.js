const express = require('express');
const router = express.Router();
const { usersModel } = require('../../dao/models/usersModel.js');

router.post("/register", async (req, res) => {
    try {
        const { nombre, apellido, edad, email, contrasena } = req.body;
        const newUser = new usersModel({
            nombre,
            apellido,
            edad,
            email,
            contrasena,
            rol: "usuario"
        });
        await newUser.save();

        res.render("login", { message: "Usuario Registrado Correctamente" });
    } catch (error) {
        res.render("register", { error: "No pudiste registrarte correctamente" });
    }
});

router.post("/login", async (req, res) => {
    try {
        const loginForm = req.body;
        const user = await usersModel.findOne({ email: loginForm.email });
        if (!user) {
            return res.render("login", { error: "Este usuario no esta registrado" });
        }
        if (user.contrasena !== loginForm.contrasena) {
            return res.render("login", { error: "Credenciales invalidas" });
        }
        req.session.email = user.email;
        res.redirect("/");
    } catch (error) {
        res.render("login", { error: "No pudiste iniciar sesion correctamente" });
    }
});

router.get("/logout", async (req, res) => {
    try {
        req.session.destroy(err => {
            if (err) return res.render("profile", { error: "No se pudo cerrar la sesion" });
            res.redirect("/");
        });
    } catch (error) {
        res.render("profile", { error: "No se pudo cerrar la sesion" });
    }
});

module.exports = {
    sessionsRouter: router
};

import { Router } from "express";
import mongoose from "mongoose";
import CartDBService from "../services/CartDBService.js";

/*
 * Manejo de las rutas de la API de carritos
 * */
const CartService = new CartDBService();
const router = Router();
// Pide todos los carritos a la base de datos
router.get("/", async (req, res) => {
  try {
    let carts = await CartService.getCarts();
    res.status(200).send({
      status: "success",
      payload: carts,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: "error",
      message: error.message,
      payload: [],
    });
  }
  res.send("carrito");
});

// Pide un carrito por id a la base de datos
router.get("/:cid", async (req, res) => {
  try {
    let cid = req.params.cid;
    if (mongoose.Types.ObjectId.isValid(cid)) {
      let cart = await CartService.getCartById(cid);
      res.status(200).send({
        status: "success",
        payload: cart,
      });
    } else {
      throw new Error("Id invalido");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: "error",
      message: error.message,
      payload: [],
    });
  }
});

// Crea un carrito en la base de datos
router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    let response = await CartService.addCart(req.body);
    res.send({
      status: "success",
      payload: response,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: "error",
      message: error.message,
      payload: [],
    });
  }
});

// Agrega un producto al carrito
router.post("/:cid/products/:pid", async (req, res) => {
  try {
    let cid = req.params.cid;
    let pid = req.params.pid;
    if (
      mongoose.Types.ObjectId.isValid(pid) &&
      mongoose.Types.ObjectId.isValid(cid)
    ) {
      console.log(req.body);
      let response = await CartService.addProductToCart(cid, pid, req.body);
      res.status(200).send({
        status: "success",
        payload: response,
      });
    } else {
      throw new Error("Id invalido");
    }
  } catch (error) {
    console.log(error);
  }
});

// Elimina un producto del carrito
router.delete("/:cid/products/:pid", async (req, res) => {
  try {
    let cid = req.params.cid;
    let pid = req.params.pid;
    if (mongoose.Types.ObjectId.isValid(cid)) {
      let response = await CartService.deleteProductFromCart(cid, pid);
      res.status(200).send({
        status: "success",
        payload: response,
      });
    } else {
      throw new Error("Id invalido");
    }
  } catch (error) {
    console.log(error);
  }
});

// Actualiza un carrito por id de la base de datos
router.put("/:cid", async (req, res) => {
  try {
    let cid = req.params.cid;
    if (mongoose.Types.ObjectId.isValid(cid)) {
      let response = await CartService.updateCart(cid, req.body);
      res.status(200).send({
        status: "success",
        payload: response,
      });
    } else {
      throw new Error("Id invalido");
    }
  } catch (error) {
    console.log(error);
  }
});
// Actualiza un producto del carrito por id de la base de datos
router.put("/:cid/products/:pid", async (req, res) => {
  try {
    let cid = req.params.cid;
    let pid = req.params.pid;
    if (mongoose.Types.ObjectId.isValid(cid)) {
      let response = await CartService.updateProductFromCart(
        cid,
        pid,
        req.body,
      );
      res.status(200).send({
        status: "success",
        payload: response,
      });
    } else {
      throw new Error("Id invalido");
    }
  } catch (error) {
    console.log(error);
  }
});

// Elimina un carrito por id de la base de datos
router.delete("/:cid", async (req, res) => {
  try {
    let cid = req.params.cid;
    if (mongoose.Types.ObjectId.isValid(cid)) {
      let response = await CartService.emptyCart(cid);
      res.status(200).send({
        status: "success",
        payload: response,
      });
    } else {
      throw new Error("Id invalido");
    }
  } catch (error) {
    console.log(error);
  }
});
export default router;

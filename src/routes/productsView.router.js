import { Router } from "express";
import jwt from "jsonwebtoken";

/*
 * Manejo de las rutas de la API de views de productos
 */

import ProductDBService from "../services/ProductDBService.js";
import { auth } from "../util/authUtil.js";
const router = Router();

// Pide todos los productos a la base de datos
router.get("/", auth, async (req, res) => {
  try {
    const productDBService = new ProductDBService();
    const response = await productDBService.getAllProducts();
    let products;
    if (response.length === 0) {
      products = [];
    } else {
      products = response.map((product) => {
        return {
          ...product._doc,
          prevLink: product._doc.prevLink
            ? product._doc.prevLink.replace(
                "http://localhost:8080/api",
                "http://localhost:8080",
              )
            : product._doc.prevLink,
          nextLink: product._doc.nextLink
            ? product._doc.nextLink.replace(
                "http://localhost:8080/api",
                "http://localhost:8080",
              )
            : product._doc.nextLink,
        };
      });
    }
    console.log(products);
    res.render("products", {
      user: req.user,
      rol: req.user.role === "admin",
      products: products,
      title: "Productos",
      style: "styles.css",
    });
  } catch (error) {
    console.log(error);
  }
});

export default router;

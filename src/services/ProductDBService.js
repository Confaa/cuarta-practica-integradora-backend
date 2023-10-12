import { productModel } from "../models/product.model.js";
/*
 * Manejo de la base de datos de productos
 * */
class ProductDBService {
  async addProduct(
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    category,
  ) {
    const product = {
      title: title,
      description: description,
      price: price,
      thumbnail: thumbnail,
      code: code,
      stock: stock,
      status: true,
      category: category,
    };
    console.log(product);
    try {
      let result = await productModel.find({ code: product.code });
      console.log(result);
      if (result.length > 0) {
        throw new Error("El producto ya existe");
      }
      return await productModel.create(product);
    } catch (error) {
      throw new Error("Error al crear el producto");
    }
  }
  // Pide todos los productos a la base de datos
  async getAllProducts() {
    try {
      const products = await productModel.find();
      return products;
    } catch (error) {
      throw new Error("Error al obtener los productos");
    }
  }
  // Pide un producto por id a la base de datos
  async getProductById(id) {
    try {
      let product = await productModel.findById({ _id: id });
      return product;
    } catch (error) {
      throw new Error("Error al obtener el producto");
    }
  }
  // Elimina un producto por id de la base de datos
  async deleteProductById(id) {
    try {
      let result = await productModel.deleteOne({ _id: id });
      return result;
    } catch (error) {
      throw new Error("Error al eliminar el producto");
    }
  }
  // Actualiza un producto por id de la base de datos
  async updateProductById(id, product) {
    try {
      let resp = await productModel.find({ _id: id });
      if (resp.length === 0) {
        throw new Error("El producto no existe");
      } else {
        return await productModel.updateOne(
          { _id: id },
          {
            $set: {
              title: product.title,
              description: product.description,
              price: product.price,
              thumbnail: product.thumbnail,
              code: product.code,
              stock: product.stock,
              category: product.category,
            },
          },
        );
      }
    } catch (error) {
      throw new Error("Error al actualizar el producto");
    }
  }
  // Pide los productos con filtros a la base de datos
  async getProductsWithParams(limit, page, filter, sort) {
    try {
      if (!sort) {
        return await productModel.paginate(filter, {
          limit: limit,
          page: page,
        });
      } else {
        if (sort !== "asc" && sort !== "desc") {
          throw new Error("El parametro sort debe ser asc o desc");
        }
        return await productModel.paginate(filter, {
          limit: limit,
          page: page,
          sort: { price: sort },
        });
      }
    } catch (error) {
      throw new Error("Error al obtener los productos");
    }
  }
}
export default ProductDBService;

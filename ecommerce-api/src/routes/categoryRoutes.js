import express from "express";
import { body, param, query } from "express-validator";
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  searchCategories,
} from "../controllers/categoryController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import isAdmin from "../middlewares/isAdminMiddleware.js";
import validate from "../middlewares/validation.js";

const router = express.Router();

// Buscar categorías con filtros
router.get(
  "/categories/search",
  [
    query("parentCategory")
      .optional()
      .isMongoId().withMessage("formato invalido para el id de categoria"),
  ],
  validate,
  searchCategories
);

// Obtener todas las categorías
router.get("/categories", getCategories);

// Obtener una categoría por ID
router.get(
  "/categories/:id",
  [param("id").isMongoId().withMessage("ID de categoría inválido")],
  validate,
  getCategoryById
);

// Crear nueva categoría
router.post(
  "/categories",
  authMiddleware,
  isAdmin,
  [
    body("name")
      .notEmpty().withMessage("El nombre es obligatorio")
      .isString().withMessage("El nombre debe ser un texto"),
    body("description")
      .notEmpty().withMessage("La descripción es obligatoria")
      .isString().withMessage("La descripción debe ser un texto"),
    body("imageURL")
      .optional()
      .isURL().withMessage("La URL de la imagen no es válida"),
    body("parentCategory")
      .optional()
      .isMongoId().withMessage("El ID de la categoría padre no es válido"),
  ],
  validate,
  createCategory
);

// Actualizar categoría
router.put(
  "/categories/:id",
  authMiddleware,
  isAdmin,
  [
    param("id").isMongoId().withMessage("ID de categoría inválido"),
    body("name").optional().isString().withMessage("El nombre debe ser un texto"),
    body("description")
      .optional()
      .isString().withMessage("La descripción debe ser un texto"),
    body("imageURL")
      .optional()
      .isURL().withMessage("La URL de la imagen no es válida"),
    body("parentCategory")
      .optional()
      .isMongoId().withMessage("El ID de la categoría padre no es válido"),
  ],
  validate,
  updateCategory
);

// Eliminar categoría
router.delete(
  "/categories/:id",
  authMiddleware,
  isAdmin,
  [param("id").isMongoId().withMessage("ID de categoría inválido")],
  validate,
  deleteCategory
);

export default router;
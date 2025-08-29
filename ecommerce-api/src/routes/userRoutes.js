import express from "express";
import { body, param, query } from "express-validator";
import validate from "../middlewares/validation.js";
import {
  getUserProfile,
  getAllUsers,
  getUserById,
  updateUserProfile,
  changePassword,
  updateUser,
  deactivateUser,
  toggleUserStatus,
  deleteUser,
  searchUsers,
} from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js"; // Middleware de autenticación
import isAdmin from "../middlewares/isAdminMiddleware.js"; // Middleware de admin

const router = express.Router();

// Validaciones comunes para el perfil del usuario
const profileValidators = [
  body("displayName")
    .optional()
    .isLength({ min: 2, max: 50 }).withMessage("Display name must be between 2 and 50 characters")
    .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/).withMessage("Display name must contain only letters, numbers and spaces")
    .trim(),

  body("email")
    .optional()
    .isEmail().withMessage("Valid email is required")
    .normalizeEmail(),

  body("phone")
    .optional()
    .isLength({ min: 10, max: 10 }).withMessage("Phone must be exactly 10 digits")
    .isNumeric().withMessage("Phone must contain only numbers"),

  body("avatar")
    .optional()
    .isURL().withMessage("Avatar must be a valid URL"),
];

// Cambiar contraseña
const changePasswordValidators = [
  body("currentPassword")
    .notEmpty()
    .withMessage("Current password is required"),

  body("newPassword")
    .isLength({ min: 6 })
    .withMessage("New password must be at least 6 characters long")
    .matches(/\d/)
    .withMessage("New password must contain at least one number")
    .matches(/[a-zA-Z]/)
    .withMessage("New password must contain at least one letter"),

  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.newPassword) {
      throw new Error("Password confirmation does not match new password");
    }
    return true;
  }),
];

// Validar ID en params
const userIdParamValidator = [
  param("userId")
    .isMongoId()
    .withMessage("User ID must be a valid MongoDB ObjectId"),
];

// Query para búsqueda
const searchUsersValidators = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100"),

  query("role")
    .optional()
    .isIn(["admin", "customer", "guest"])
    .withMessage("Role must be admin, customer, or guest"),

  query("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean value"),
];

// Rutas de usuario
// Perfil del usuario autenticado
router.get("/profile", authMiddleware, getUserProfile);

// Buscar usuarios
router.get("/search", searchUsersValidators, validate, searchUsers);

// Obtener todos los usuarios (admin)
router.get("/", searchUsersValidators, validate, authMiddleware, isAdmin, getAllUsers);

// Obtener usuario por ID (admin)
router.get("/:userId", userIdParamValidator, validate, authMiddleware, isAdmin, getUserById);

// Actualizar perfil del usuario autenticado
router.put("/profile", profileValidators, validate, authMiddleware, updateUserProfile);

// Cambiar contraseña
router.put("/change-password", changePasswordValidators, validate, authMiddleware, changePassword);

// Actualizar usuario completo (admin)
router.put(
  "/:userId",
  [
    ...userIdParamValidator,
    ...profileValidators,
    body("role")
      .optional()
      .isIn(["admin", "customer", "guest"])
      .withMessage("Role must be admin, customer, or guest"),
    body("isActive")
      .optional()
      .isBoolean()
      .withMessage("isActive must be a boolean value"),
  ],
  validate,
  authMiddleware,
  isAdmin,
  updateUser
);

// Desactivar cuenta propia
router.patch("/deactivate", authMiddleware, deactivateUser);

// Activar/Desactivar usuario (admin)
router.patch("/:userId/toggle-status", userIdParamValidator, validate, authMiddleware, isAdmin, toggleUserStatus);

// Eliminar usuario (admin)
router.delete("/:userId", userIdParamValidator, validate, authMiddleware, isAdmin, deleteUser);

export default router;
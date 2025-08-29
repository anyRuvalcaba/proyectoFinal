import express from 'express';
import { body, param, query } from "express-validator";
import {
  getNotifications,
  getNotificationById,
  getNotificationByUser,
  createNotification,
  updateNotification,
  deleteNotification,
  markAsRead,
  markAllAsReadByUser,
  getUnreadNotificationsByUser,
} from '../controllers/notificationController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import isAdmin from '../middlewares/isAdminMiddleware.js';
import validate from '../middlewares/validation.js';

const router = express.Router();

// Obtener todas las notificaciones (admin)
router.get("/notifications", authMiddleware, isAdmin, getNotifications);

// Obtener notificaciones no leídas por usuario
router.get(
  "/notifications/unread/:userId",
  authMiddleware,
  [param("userId").isMongoId().withMessage("ID de usuario inválido")],
  validate,
  getUnreadNotificationsByUser
);

// Obtener notificaciones por usuario
router.get(
  "/notifications/user/:userId",
  authMiddleware,
  [param("userId").isMongoId().withMessage("ID de usuario inválido")],
  validate,
  getNotificationByUser
);

// Obtener notificación por ID
router.get(
  "/notifications/:id",
  authMiddleware,
  [param("id").isMongoId().withMessage("ID de notificación inválido")],
  validate,
  getNotificationById
);

// Crear nueva notificación
router.post(
  "/notifications",
  authMiddleware,
  [
    body("user")
      .notEmpty().withMessage("El usuario es obligatorio")
      .isMongoId().withMessage("ID de usuario inválido"),
    body("message")
      .notEmpty().withMessage("El mensaje es obligatorio")
      .isString().withMessage("El mensaje debe ser texto"),
  ],
  validate,
  createNotification
);

// Marcar una notificación como leída
router.patch(
  "/notifications/:id/mark-read",
  authMiddleware,
  [param("id").isMongoId().withMessage("ID de notificación inválido")],
  validate,
  markAsRead
);

// Marcar todas las notificaciones de un usuario como leídas
router.patch(
  "/notifications/user/:userId/mark-all-read",
  authMiddleware,
  [param("userId").isMongoId().withMessage("ID de usuario inválido")],
  validate,
  markAllAsReadByUser
);

// Actualizar notificación
router.put(
  "/notifications/:id",
  authMiddleware,
  isAdmin,
  [
    param("id").isMongoId().withMessage("ID de notificación inválido"),
    body("message").optional().isString().withMessage("El mensaje debe ser texto"),
    body("isRead").optional().isBoolean().withMessage("isRead debe ser booleano"),
  ],
  validate,
  updateNotification
);

// Eliminar notificación
router.delete(
  "/notifications/:id",
  authMiddleware,
  [param("id").isMongoId().withMessage("ID de notificación inválido")],
  validate,
  deleteNotification
);

export default router;
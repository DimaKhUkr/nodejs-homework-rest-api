const express = require("express");

const {
  getAll,
  getById,
  add,
  updateById,
  updateStatusContact,
  deleteById,
} = require("../../controllers/contacts");

const { validateData, isValidId, unauthorized } = require("../../middlewares");

const { addSchema, updateStatusSchema } = require("../../schemas/contacts");

const router = express.Router();

router.get("/", unauthorized, getAll);

router.get("/:contactId", unauthorized, isValidId, getById);

router.post("/", unauthorized, validateData(addSchema), add);

router.put(
  "/:contactId",
  unauthorized,
  isValidId,
  validateData(addSchema),
  updateById
);

router.patch(
  "/:contactId/favorite",
  unauthorized,
  isValidId,
  validateData(updateStatusSchema),
  updateStatusContact
);

router.delete("/:contactId", unauthorized, isValidId, deleteById);

module.exports = router;

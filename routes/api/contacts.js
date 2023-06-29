const express = require("express");

const {
  getAll,
  getById,
  add,
  updateById,
  updateStatusContact,
  deleteById,
} = require("../../controllers/contacts");

const { validateData, isValidId } = require("../../middlewares");

const {
  schemas: { addSchema, updateStatusSchema },
} = require("../../models/contacts");

const router = express.Router();

router.get("/", getAll);

router.get("/:contactId", isValidId, getById);

router.post("/", validateData(addSchema), add);

router.put("/:contactId", isValidId, validateData(addSchema), updateById);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateData(updateStatusSchema),
  updateStatusContact
);

router.delete("/:contactId", isValidId, deleteById);

module.exports = router;

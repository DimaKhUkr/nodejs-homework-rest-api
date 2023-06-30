const { Contact } = require("../models/contacts.js");

const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;

  const parameters = favorite ? { owner, favorite } : { owner };

  const result = await Contact.find(parameters, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "name email subscription");

  res.json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const { email, phone } = req.body;

  const contactEmail = await Contact.findOne({ email });
  const contactPhone = await Contact.findOne({ phone });

  if (contactEmail) {
    throw HttpError(409, "This email already exists in the contacts");
  } else if (contactPhone) {
    throw HttpError(409, "This phone already exists in the contacts");
  }

  const result = await Contact.create({ ...req.body, owner });
  const response = result.toObject();
  delete response.createdAt;
  delete response.updatedAt;

  res.status(201).json(response);
};

const updateById = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json({
    message: "contact deleted",
  });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
  deleteById: ctrlWrapper(deleteById),
};

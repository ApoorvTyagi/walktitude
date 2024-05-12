const joi = require('joi');

const postSwipeRightSchema = joi.object({
  headers: joi
    .object()
    .keys({
      "x-user-details": joi.object().keys({
        userId: joi.string().trim().length(24).required().label("userId"),
      }),
    }),
  body: joi.object().keys({
    inviteeId: joi.string().trim().length(24).required().label("inviteeId"),
  }),
});

module.exports = {
  postSwipeRightSchema,
};
const InvariantError = require('../../exceptions/InvariantError');
const { PostCollaborationPayloadSchema } = require('./schema');

const CollaborationsValidator = {
  validatePostCollaborationsPayload: (payload) => {
    const validationResult = PostCollaborationPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  }
};

module.exports = CollaborationsValidator;
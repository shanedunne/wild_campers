import Boom from "@hapi/boom";

export function validationError(request, h, error) {
    console.error(error);
    return Boom.badRequest(error.message, error.details);

  }
  
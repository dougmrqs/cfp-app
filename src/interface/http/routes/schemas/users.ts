export const create = {
  body: {
    type: 'object',
    required: ['email', 'username', 'birthDate'],
    properties: {
      email: {
        type: 'string',
        format: 'email'
      },
      username: {
        type: 'string',
        minLength: 3
      },
      birthDate: { type: 'string' }
    }
  }
}

export const createResponse = {
  201: {
    type: 'object',
    properties: {
      id: { type: 'string' },
      email: { type: 'string' },
      username: { type: 'string' },
      birthDate: { type: 'string' }
    }
  },
  400: {
    type: 'object',
    properties: {
      error: {
        type: 'object',
        properties: {
          code: { value: 'BAD_REQUEST' },
          message: { type: 'string' }
        }
      }
    }
  }
}


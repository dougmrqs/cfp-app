export function serializeError(error: Error) {
  return {
    error: {
      code: 'BadRequest',
     message: serializeMessage(error.message)
    }
  }
}

function serializeMessage(message: string) {
  return message.replace('body/', '').replace(/must match pattern.*$/, 'must be valid')
}

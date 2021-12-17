import { v4 } from 'uuid'

/**
 * Converts error in an object which is to be sent as payload by server
 * @param err error to be transformed
 * @returns object with error message
 */
export function getErrObj(err: Error) {
  return { error: err.message }
}

/**
 * Generates v4 uuid
 * @returns a v4 uuid
 */
export function getID() {
  return v4()
}

/**
 * Validates string to be in email format
 * @param email string to be checked
 * @returns true if string is valid otherwise false
 */
export function validateEmail(email: string) {
  // Lets hope this works
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

/**
 * Validates string to be in phone number format
 * @param phno string to be checked
 * @returns true if string is valid otherwise false
 */
export function validatePhone(phno: string) {
  const re = /^\+{0,2}([\-\. ])?(\(?\d{0,3}\))?([\-\. ])?\(?\d{0,3}\)?([\-\. ])?\d{3}([\-\. ])?\d{4}/
  return re.test(String(phno).toLowerCase())
}
import { v4 } from 'uuid'

export function getErrObj(err: Error) {
  return { error: err.message }
}

export function getID() {
  return v4()
}

export function validateEmail(email: string) {
  // Lets hope this works
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function validatePhone(phno: string) {
  const re = /^\+{0,2}([\-\. ])?(\(?\d{0,3}\))?([\-\. ])?\(?\d{0,3}\)?([\-\. ])?\d{3}([\-\. ])?\d{4}/
  return re.test(String(phno).toLowerCase())
}
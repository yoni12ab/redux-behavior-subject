/**
 * change only the reference of the object
 * @param obj
 */
export function shallowCopy(obj: any): any {
  if (obj.constructor == Object) {
    return (<any>Object).assign({}, obj);
  } else if (obj.constructor == Array) {
    return [...(<any>obj)];
  }
  return obj;
}

/**
 * parsing the stack and get the caller name
 * very heavy on cpu use it only in debug mode
 */
export function callerNameByException(): string {
  try {
    throw new Error();
  } catch (e) {
    try {
      return e.stack.split("at ")[3].split(" ")[0];
    } catch (e) {
      return "";
    }
  }
}

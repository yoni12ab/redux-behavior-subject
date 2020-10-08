export function shallowCopy(obj: any) {
  if (obj.constructor == Object) {
    return (<any>Object).assign({}, obj);
  } else if (obj.constructor == Array) {
    return [...(<any>obj)];
  }
  return obj;
}

export function callerNameByException() {
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

import { BehaviorSubject } from "rxjs";
import { createStore } from "redux";
export const store = createStore(
  (state = {}) => state /* preloadedState, */,
  (<any>window).__REDUX_DEVTOOLS_EXTENSION__ && (<any>window).__REDUX_DEVTOOLS_EXTENSION__()
);
export class ReduxBehaviorSubject<T> extends BehaviorSubject<T> {

  public entityName = '';
  private isDebugMode = false;  
  get localState(): any {
    return store.getState();
  }

  constructor(value: T, entityName: string, isDebugMode = false) {
    super(value);
    this.isDebugMode = isDebugMode;
    this.entityName = entityName;
    this.localState[this.entityName] = value;
    store.dispatch({ type: "[${this.entityName}] CREATED" });
  }

  next(value?: T) {
    if(this.isDebugMode){
        const updatedBy = this._callerName() || "unknown";
        
        store.dispatch({ type: `[${this.entityName}] UPDATED ${updatedBy}` });
      }
      this.localState[this.entityName] = value && this._cloneValue(value);
    return super.next(this.localState[this.entityName]);
  }

  logAction(action: string){
    return store.dispatch({ type: `[${this.entityName}] ${action}` });
  }

  

  _cloneValue(obj: T) {
    if (obj.constructor == Object) {
      return (<any>Object).assign({}, obj);
    }
    return obj;
  }

  _callerName() {
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
}

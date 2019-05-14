import { BehaviorSubject } from "rxjs";
import { createStore } from "redux";
import { ReduxBehaviorSubjectOptions } from "./models/redux-behavior-subject.model";
export const store = createStore(
  (state = {}) => state /* preloadedState, */,
  (<any>window).__REDUX_DEVTOOLS_EXTENSION__ && (<any>window).__REDUX_DEVTOOLS_EXTENSION__()
);
export class ReduxBehaviorSubject<T> extends BehaviorSubject<T> {

  private options :ReduxBehaviorSubjectOptions;  
  get localState(): any {
    return store.getState();
  }

  constructor(value: T, options: ReduxBehaviorSubjectOptions) {
    super(value);
    this.options = options;
    this.localState[this.options.entityName] = value;
    this.logAction("CREATED");
  }

  next(value?: T,action?: string) {
    if(this.options.isDevMode){
        const updatedBy = action || this._callerName() || "unknown";
        this.logAction(`UPDATED ${updatedBy}`);
      }
      this.localState[this.options.entityName] = value && this._cloneValue(value);
    return super.next(this.localState[this.options.entityName]);
  }

  logAction(action: string){
    return store.dispatch({ type: `[${this.options.entityName}] ${action}` });
  }

  

  _cloneValue(obj: T) {
    if (obj.constructor == Object) {
      return (<any>Object).assign({}, obj);
    } else if (obj.constructor == Array) {
        return [...(<any>obj)];
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

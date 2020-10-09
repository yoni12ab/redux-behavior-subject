import { BehaviorSubject, Observable } from "rxjs";
import { ReduxBehaviorSubjectOptions } from "./models/redux-behavior-subject.model";
import { reduxExtension } from "./redux-extension";
import { callerNameByException, shallowCopy } from "./utils";
import { RBS_SESSION_TOKEN_ENABLE_DEBUG } from "./consts";

export class ReduxBehaviorSubject<T> {
  private bs$: BehaviorSubject<T>;
  private options: ReduxBehaviorSubjectOptions;

  constructor(value: T, options: ReduxBehaviorSubjectOptions) {
    this.bs$ = new BehaviorSubject<T>(value);
    this.options = { ...this.getDefaultOptions(), ...options };
  }

  public set(value: T, action?: string) {
    const val = value && shallowCopy(value);

    if (this.options.isDevMode) {
      const updatedBy = action || callerNameByException() || "unknown";
      reduxExtension.sendAction(updatedBy, this.options.entityName, val);
    }

    return this.bs$.next(val);
  }

  public get(): Observable<T> {
    return this.bs$.asObservable();
  }

  public getValue(): T {
    return this.bs$.getValue();
  }

  private getDefaultOptions(): ReduxBehaviorSubjectOptions {
    return {
      entityName: Math.random().toString(36),
      isDevMode:
        sessionStorage.getItem(RBS_SESSION_TOKEN_ENABLE_DEBUG) === "true"
    };
  }
}

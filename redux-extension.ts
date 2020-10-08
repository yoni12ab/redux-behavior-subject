class ReduxExtension {
  private get extensionHandle() {
    return (<any>window).__REDUX_DEVTOOLS_EXTENSION__;
  }
  private state: { [key: string]: any } = {};

  public sendAction(action: string, entity: string, value: any) {
    this.state[entity] = value;
    this.extensionHandle.send(action, this.state);
  }
}
export const reduxExtension = new ReduxExtension();

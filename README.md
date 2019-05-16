# redux-behavior-subject

Create simple store with behavior subject and track changes 
with [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en) 

### Demo

https://stackblitz.com/edit/rx-js-store

### Installing

Install the package

```
npm i redux-behavior-subject
```

Create simple service or any class and use it like a regular rxjs BehaviorSubject 
for example angular service with simple store
```
import { Injectable, isDevMode } from '@angular/core';
import {ReduxBehaviorSubject as RBS} from 'redux-behavior-subject';

@Injectable()
export class StoreService {
  readonly _isDevMode = true;//!!localStorage.getItem('isDevMode');

  constructor(){
    console.log('isDevMode', this._isDevMode);
  }
  private store = {
      counter$ : new RBS<number>(0,{ entityName : 'counter',isDevMode: this._isDevMode}),
      toDoList$ : new RBS<Array<any>>([],{ entityName : 'toDoList',isDevMode: this._isDevMode }),
      clock$ : new RBS<object>(null,{ entityName : 'clock',isDevMode: this._isDevMode }),
    };
 
  getStore(){
    return this.store;
  }

}
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* package created to simplify use of redux concept 

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
import { Injectable } from '@angular/core';
import {ReduxBehaviorSubject} from 'redux-behavior-subject';

@Injectable()
export class StoreService {
  private store = {
      counter$ : new ReduxBehaviorSubject<number>(0,'counter'),
      toDoList$ : new ReduxBehaviorSubject<Array<any>>([],'toDoList'),
      clock$ : new ReduxBehaviorSubject<object>(null,'clock'),
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

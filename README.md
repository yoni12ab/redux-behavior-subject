# redux-behavior-subject

Create simple store with behavior subject and track changes by demand
with [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)
for better performance only when you set to debug (set session storage see below ) it will start logging to chrome devtools

### Demo

https://stackblitz.com/edit/redux-behavior-subject-example

### Installing

Install the package

```
npm i redux-behavior-subject
```

Create simple service or any class and use it like a regular rxjs BehaviorSubject
for example angular service with simple store
to start logging to redux chrome extension in console run

```
sessionStorage.setItem('RBS_SESSION_TOKEN_ENABLE_DEBUG', 'true');
```

```
import { Injectable } from '@angular/core';
import {ReduxBehaviorSubject} from 'redux-behavior-subject';
import {User, Item} from './models';
@Injectable()
export class StoreService {

  public users$ = new ReduxBehaviorSubject<User[]>([], { entityName: "Users" });
  public items$ = new ReduxBehaviorSubject<Item[]>([], { entityName: "Items" });
  public counter$ = new ReduxBehaviorSubject<number>(0,{ entityName : "Counter"});

}
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- package created to simplify the use of
  - use the redux chrome extension only when needed
  - sallow clone the data when adding value
  - add action to every data change
  - only in debug mode if not sending action it will try to get it from the call stack

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var redux_1 = require("redux");
exports.store = redux_1.createStore(function (state) {
    if (state === void 0) { state = {}; }
    return state;
} /* preloadedState, */, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
var ReduxBehaviorSubject = /** @class */ (function (_super) {
    __extends(ReduxBehaviorSubject, _super);
    function ReduxBehaviorSubject(value, options) {
        var _this = _super.call(this, value) || this;
        _this.options = options;
        _this.localState[_this.options.entityName] = value;
        _this.logAction("CREATED");
        return _this;
    }
    Object.defineProperty(ReduxBehaviorSubject.prototype, "localState", {
        get: function () {
            return exports.store.getState();
        },
        enumerable: true,
        configurable: true
    });
    ReduxBehaviorSubject.prototype.next = function (value, action) {
        if (this.options.isDevMode) {
            var updatedBy = action || this._callerName() || "unknown";
            this.logAction("UPDATED " + updatedBy);
        }
        this.localState[this.options.entityName] = value && this._cloneValue(value);
        return _super.prototype.next.call(this, this.localState[this.options.entityName]);
    };
    ReduxBehaviorSubject.prototype.logAction = function (action) {
        return exports.store.dispatch({ type: "[" + this.options.entityName + "] " + action });
    };
    ReduxBehaviorSubject.prototype._cloneValue = function (obj) {
        if (obj.constructor == Object) {
            return Object.assign({}, obj);
        }
        else if (obj.constructor == Array) {
            return obj.slice();
        }
        return obj;
    };
    ReduxBehaviorSubject.prototype._callerName = function () {
        try {
            throw new Error();
        }
        catch (e) {
            try {
                return e.stack.split("at ")[3].split(" ")[0];
            }
            catch (e) {
                return "";
            }
        }
    };
    return ReduxBehaviorSubject;
}(rxjs_1.BehaviorSubject));
exports.ReduxBehaviorSubject = ReduxBehaviorSubject;

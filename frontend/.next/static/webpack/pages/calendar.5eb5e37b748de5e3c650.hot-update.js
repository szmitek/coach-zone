self["webpackHotUpdate_N_E"]("pages/calendar",{

/***/ "./components/Calendar.js":
/*!********************************!*\
  !*** ./components/Calendar.js ***!
  \********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ALL_EVENTS_QUERY": function() { return /* binding */ ALL_EVENTS_QUERY; },
/* harmony export */   "default": function() { return /* binding */ CalendarPage; }
/* harmony export */ });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var C_Users_Kamil_Desktop_coach_zone_frontend_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/next/node_modules/@babel/runtime/helpers/esm/toConsumableArray */ "./node_modules/next/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var C_Users_Kamil_Desktop_coach_zone_frontend_node_modules_next_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray */ "./node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var C_Users_Kamil_Desktop_coach_zone_frontend_node_modules_next_node_modules_babel_runtime_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/next/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral */ "./node_modules/next/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_big_calendar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-big-calendar */ "./node_modules/react-big-calendar/dist/react-big-calendar.esm.js");
/* harmony import */ var date_fns_format__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! date-fns/format */ "./node_modules/date-fns/esm/format/index.js");
/* harmony import */ var date_fns_parse__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! date-fns/parse */ "./node_modules/date-fns/esm/parse/index.js");
/* harmony import */ var date_fns_startOfWeek__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! date-fns/startOfWeek */ "./node_modules/date-fns/esm/startOfWeek/index.js");
/* harmony import */ var date_fns_getDay__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! date-fns/getDay */ "./node_modules/date-fns/esm/getDay/index.js");
/* harmony import */ var date_fns_locale_en_US__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! date-fns/locale/en-US */ "./node_modules/date-fns/esm/locale/en-US/index.js");
/* harmony import */ var _Events__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Events */ "./components/Events.js");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! graphql-tag */ "./node_modules/graphql-tag/lib/index.js");
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @apollo/client */ "./node_modules/@apollo/client/index.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../config */ "./config.js");
/* module decorator */ module = __webpack_require__.hmd(module);





var _jsxFileName = "C:\\Users\\Kamil\\Desktop\\coach-zone\\frontend\\components\\Calendar.js",
    _s = $RefreshSig$();

function _templateObject2() {
  var data = (0,C_Users_Kamil_Desktop_coach_zone_frontend_node_modules_next_node_modules_babel_runtime_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_3__.default)(["\n  query ALL_EVENTS_QUERY {\n    allEventsListItems {\n      id\n      title\n      startdate\n      enddate\n      user {\n        id\n      }\n    }\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0,C_Users_Kamil_Desktop_coach_zone_frontend_node_modules_next_node_modules_babel_runtime_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_3__.default)(["\n  mutation CREATE_EVENT_MUTATION (\n    $title: String!\n    $startdate: String\n    $enddate: String\n  ) {\n    createEvent(\n      data: {\n        title: $title\n        startdate: $startdate\n        enddate: $enddate\n      }\n    ) {\n      id\n      title\n      stardate\n      enddate\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}














var CREATE_EVENT_MUTATION = (0,graphql_tag__WEBPACK_IMPORTED_MODULE_8__.default)(_templateObject());
var ALL_EVENTS_QUERY = (0,graphql_tag__WEBPACK_IMPORTED_MODULE_8__.default)(_templateObject2());
var locales = {
  'en-US': date_fns_locale_en_US__WEBPACK_IMPORTED_MODULE_9__.default
};
var localizer = (0,react_big_calendar__WEBPACK_IMPORTED_MODULE_5__.dateFnsLocalizer)({
  format: date_fns_format__WEBPACK_IMPORTED_MODULE_10__.default,
  parse: date_fns_parse__WEBPACK_IMPORTED_MODULE_11__.default,
  startOfWeek: date_fns_startOfWeek__WEBPACK_IMPORTED_MODULE_12__.default,
  getDay: date_fns_getDay__WEBPACK_IMPORTED_MODULE_13__.default,
  locales: locales
});
function CalendarPage() {
  _s();

  var _useQuery = (0,_apollo_client__WEBPACK_IMPORTED_MODULE_14__.useQuery)(ALL_EVENTS_QUERY),
      data = _useQuery.data;

  var _useMutation = (0,_apollo_client__WEBPACK_IMPORTED_MODULE_14__.useMutation)(CREATE_EVENT_MUTATION),
      _useMutation2 = (0,C_Users_Kamil_Desktop_coach_zone_frontend_node_modules_next_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__.default)(_useMutation, 1),
      createEvent = _useMutation2[0];

  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(data),
      myEvents2 = _useState[0],
      setEvents = _useState[1];

  console.log(myEvents2); // Create event

  var handleSelectSlot = (0,react__WEBPACK_IMPORTED_MODULE_4__.useCallback)(function (_ref) {
    var start = _ref.start,
        end = _ref.end;
    var title = window.prompt('New Event name, enter hours if needed');

    if (title) {
      createEvent({
        variables: {
          startdate: start,
          enddate: end,
          title: title
        }
      }); //taka sugestia - to może zadziałać na odświeżaniu zmiennej stanu, zabezpieczam ifem bo u mnie z jakiegoś powodu lista w myEvents już zwraca na starcie undefined, ale może przez to, że jest po prostu pusta

      if (typeof myEvents2 !== 'undefined') {
        setEvents([].concat((0,C_Users_Kamil_Desktop_coach_zone_frontend_node_modules_next_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__.default)(myEvents2.allEventsListItems), [{
          start: start,
          end: end,
          title: title
        }]));
      }
    }
  }, [createEvent]); // Show event 

  var handleSelectEvent = (0,react__WEBPACK_IMPORTED_MODULE_4__.useCallback)(function (event) {
    return window.alert(event.title);
  }, []);
  var page = 1;

  var _useQuery2 = (0,_apollo_client__WEBPACK_IMPORTED_MODULE_14__.useQuery)(ALL_EVENTS_QUERY, {
    variables: {
      skip: page * _config__WEBPACK_IMPORTED_MODULE_7__.perPage - _config__WEBPACK_IMPORTED_MODULE_7__.perPage,
      first: _config__WEBPACK_IMPORTED_MODULE_7__.perPage
    }
  }),
      myEvents = _useQuery2.myEvents,
      error = _useQuery2.error,
      loading = _useQuery2.loading; //console.log(myEvents);


  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_big_calendar__WEBPACK_IMPORTED_MODULE_5__.Calendar, {
      localizer: localizer,
      events: myEvents2,
      startAccessor: "start",
      endAccessor: "end",
      style: {
        height: 500
      },
      allDayAccessor: true,
      views: ['month'],
      onSelectEvent: handleSelectEvent,
      onSelectSlot: handleSelectSlot,
      selectable: true
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 113,
      columnNumber: 7
    }, this)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 112,
    columnNumber: 5
  }, this);
}

_s(CalendarPage, "EjO2fehz/3PzU3eUVYZaBq1O5yQ=", false, function () {
  return [_apollo_client__WEBPACK_IMPORTED_MODULE_14__.useQuery, _apollo_client__WEBPACK_IMPORTED_MODULE_14__.useMutation, _apollo_client__WEBPACK_IMPORTED_MODULE_14__.useQuery];
});

_c = CalendarPage;

var _c;

$RefreshReg$(_c, "CalendarPage");

;
    var _a, _b;
    // Legacy CSS implementations will `eval` browser code in a Node.js context
    // to extract CSS. For backwards compatibility, we need to check we're in a
    // browser context before continuing.
    if (typeof self !== 'undefined' &&
        // AMP / No-JS mode does not inject these helpers:
        '$RefreshHelpers$' in self) {
        var currentExports = module.__proto__.exports;
        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;
        // This cannot happen in MainTemplate because the exports mismatch between
        // templating and execution.
        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
        // A module can be accepted automatically based on its exports, e.g. when
        // it is a Refresh Boundary.
        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
            // Save the previous exports on update so we can compare the boundary
            // signatures.
            module.hot.dispose(function (data) {
                data.prevExports = currentExports;
            });
            // Unconditionally accept an update to this module, we'll check if it's
            // still a Refresh Boundary later.
            module.hot.accept();
            // This field is set when the previous version of this module was a
            // Refresh Boundary, letting us know we need to check for invalidation or
            // enqueue an update.
            if (prevExports !== null) {
                // A boundary can become ineligible if its exports are incompatible
                // with the previous exports.
                //
                // For example, if you add/remove/change exports, we'll want to
                // re-execute the importing modules, and force those components to
                // re-render. Similarly, if you convert a class component to a
                // function, we want to invalidate the boundary.
                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {
                    module.hot.invalidate();
                }
                else {
                    self.$RefreshHelpers$.scheduleUpdate();
                }
            }
        }
        else {
            // Since we just executed the code for the module, it's possible that the
            // new exports made it ineligible for being a boundary.
            // We only care about the case when we were _previously_ a boundary,
            // because we already accepted this update (accidental side effect).
            var isNoLongerABoundary = prevExports !== null;
            if (isNoLongerABoundary) {
                module.hot.invalidate();
            }
        }
    }


/***/ }),

/***/ "./components/Events.js":
/*!******************************!*\
  !*** ./components/Events.js ***!
  \******************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* module decorator */ module = __webpack_require__.hmd(module);
// export default [
//     {
//       id: 0,
//       title: 'Training 19-22',
//       start: new Date(),
//       end: new Date(),
//     },
//   ];
/* harmony default export */ __webpack_exports__["default"] = ([{} // if(loading) return <p>Loading...</p>;
// if (error) return <p>Error: {error.message}</p>;
// return (
//     <div>
//         <ExercisesListStyles>
//             {data.allExercises.map(exercise => (
//                 <Exercise key={exercise.id} exercise={exercise} />
//             ))}
//         </ExercisesListStyles>
//     </div>
// );
]);

;
    var _a, _b;
    // Legacy CSS implementations will `eval` browser code in a Node.js context
    // to extract CSS. For backwards compatibility, we need to check we're in a
    // browser context before continuing.
    if (typeof self !== 'undefined' &&
        // AMP / No-JS mode does not inject these helpers:
        '$RefreshHelpers$' in self) {
        var currentExports = module.__proto__.exports;
        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;
        // This cannot happen in MainTemplate because the exports mismatch between
        // templating and execution.
        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
        // A module can be accepted automatically based on its exports, e.g. when
        // it is a Refresh Boundary.
        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
            // Save the previous exports on update so we can compare the boundary
            // signatures.
            module.hot.dispose(function (data) {
                data.prevExports = currentExports;
            });
            // Unconditionally accept an update to this module, we'll check if it's
            // still a Refresh Boundary later.
            module.hot.accept();
            // This field is set when the previous version of this module was a
            // Refresh Boundary, letting us know we need to check for invalidation or
            // enqueue an update.
            if (prevExports !== null) {
                // A boundary can become ineligible if its exports are incompatible
                // with the previous exports.
                //
                // For example, if you add/remove/change exports, we'll want to
                // re-execute the importing modules, and force those components to
                // re-render. Similarly, if you convert a class component to a
                // function, we want to invalidate the boundary.
                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {
                    module.hot.invalidate();
                }
                else {
                    self.$RefreshHelpers$.scheduleUpdate();
                }
            }
        }
        else {
            // Since we just executed the code for the module, it's possible that the
            // new exports made it ineligible for being a boundary.
            // We only care about the case when we were _previously_ a boundary,
            // because we already accepted this update (accidental side effect).
            var isNoLongerABoundary = prevExports !== null;
            if (isNoLongerABoundary) {
                module.hot.invalidate();
            }
        }
    }


/***/ }),

/***/ "./config.js":
/*!*******************!*\
  !*** ./config.js ***!
  \*******************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "endpoint": function() { return /* binding */ endpoint; },
/* harmony export */   "prodEndpoint": function() { return /* binding */ prodEndpoint; },
/* harmony export */   "perPage": function() { return /* binding */ perPage; }
/* harmony export */ });
/* module decorator */ module = __webpack_require__.hmd(module);
// This is client side config only - don't put anything in here that shouldn't be public!
var endpoint = "http://localhost:3000/api/graphql";
var prodEndpoint = "fill me in when we deploy";
var perPage = 4;

;
    var _a, _b;
    // Legacy CSS implementations will `eval` browser code in a Node.js context
    // to extract CSS. For backwards compatibility, we need to check we're in a
    // browser context before continuing.
    if (typeof self !== 'undefined' &&
        // AMP / No-JS mode does not inject these helpers:
        '$RefreshHelpers$' in self) {
        var currentExports = module.__proto__.exports;
        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;
        // This cannot happen in MainTemplate because the exports mismatch between
        // templating and execution.
        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
        // A module can be accepted automatically based on its exports, e.g. when
        // it is a Refresh Boundary.
        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
            // Save the previous exports on update so we can compare the boundary
            // signatures.
            module.hot.dispose(function (data) {
                data.prevExports = currentExports;
            });
            // Unconditionally accept an update to this module, we'll check if it's
            // still a Refresh Boundary later.
            module.hot.accept();
            // This field is set when the previous version of this module was a
            // Refresh Boundary, letting us know we need to check for invalidation or
            // enqueue an update.
            if (prevExports !== null) {
                // A boundary can become ineligible if its exports are incompatible
                // with the previous exports.
                //
                // For example, if you add/remove/change exports, we'll want to
                // re-execute the importing modules, and force those components to
                // re-render. Similarly, if you convert a class component to a
                // function, we want to invalidate the boundary.
                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {
                    module.hot.invalidate();
                }
                else {
                    self.$RefreshHelpers$.scheduleUpdate();
                }
            }
        }
        else {
            // Since we just executed the code for the module, it's possible that the
            // new exports made it ineligible for being a boundary.
            // We only care about the case when we were _previously_ a boundary,
            // because we already accepted this update (accidental side effect).
            var isNoLongerABoundary = prevExports !== null;
            if (isNoLongerABoundary) {
                module.hot.invalidate();
            }
        }
    }


/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9DYWxlbmRhci5qcyIsIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9FdmVudHMuanMiLCJ3ZWJwYWNrOi8vX05fRS8uL2NvbmZpZy5qcyJdLCJuYW1lcyI6WyJDUkVBVEVfRVZFTlRfTVVUQVRJT04iLCJncWwiLCJBTExfRVZFTlRTX1FVRVJZIiwibG9jYWxlcyIsImVuVVMiLCJsb2NhbGl6ZXIiLCJkYXRlRm5zTG9jYWxpemVyIiwiZm9ybWF0IiwicGFyc2UiLCJzdGFydE9mV2VlayIsImdldERheSIsIkNhbGVuZGFyUGFnZSIsInVzZVF1ZXJ5IiwiZGF0YSIsInVzZU11dGF0aW9uIiwiY3JlYXRlRXZlbnQiLCJ1c2VTdGF0ZSIsIm15RXZlbnRzMiIsInNldEV2ZW50cyIsImNvbnNvbGUiLCJsb2ciLCJoYW5kbGVTZWxlY3RTbG90IiwidXNlQ2FsbGJhY2siLCJzdGFydCIsImVuZCIsInRpdGxlIiwid2luZG93IiwicHJvbXB0IiwidmFyaWFibGVzIiwic3RhcnRkYXRlIiwiZW5kZGF0ZSIsImFsbEV2ZW50c0xpc3RJdGVtcyIsImhhbmRsZVNlbGVjdEV2ZW50IiwiZXZlbnQiLCJhbGVydCIsInBhZ2UiLCJza2lwIiwicGVyUGFnZSIsImZpcnN0IiwibXlFdmVudHMiLCJlcnJvciIsImxvYWRpbmciLCJoZWlnaHQiLCJlbmRwb2ludCIsInByb2RFbmRwb2ludCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQSxJQUFNQSxxQkFBcUIsR0FBR0Msb0RBQUgsbUJBQTNCO0FBcUJPLElBQU1DLGdCQUFnQixHQUFHRCxvREFBSCxvQkFBdEI7QUFnQlAsSUFBTUUsT0FBTyxHQUFHO0FBQ2QsV0FBU0Ms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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqRXhCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQSwrREFBYyxDQUNkLEVBRGMsQ0FHWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBYlksQ0FBZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNWQTtBQUNPLElBQU1nQyxRQUFRLHNDQUFkO0FBQ0EsSUFBTUMsWUFBWSw4QkFBbEI7QUFDQSxJQUFNUCxPQUFPLEdBQUcsQ0FBaEIiLCJmaWxlIjoic3RhdGljL3dlYnBhY2svcGFnZXMvY2FsZW5kYXIuNWViNWUzN2I3NDhkZTVlM2M2NTAuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlQ2FsbGJhY2sgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IENhbGVuZGFyLCBkYXRlRm5zTG9jYWxpemVyIH0gZnJvbSAncmVhY3QtYmlnLWNhbGVuZGFyJztcclxuaW1wb3J0IGZvcm1hdCBmcm9tICdkYXRlLWZucy9mb3JtYXQnO1xyXG5pbXBvcnQgcGFyc2UgZnJvbSAnZGF0ZS1mbnMvcGFyc2UnO1xyXG5pbXBvcnQgc3RhcnRPZldlZWsgZnJvbSAnZGF0ZS1mbnMvc3RhcnRPZldlZWsnO1xyXG5pbXBvcnQgZ2V0RGF5IGZyb20gJ2RhdGUtZm5zL2dldERheSc7XHJcbmltcG9ydCBlblVTIGZyb20gJ2RhdGUtZm5zL2xvY2FsZS9lbi1VUyc7XHJcbmltcG9ydCBldmVudHMgZnJvbSAnLi9FdmVudHMnXHJcbmltcG9ydCBncWwgZnJvbSAnZ3JhcGhxbC10YWcnO1xyXG5pbXBvcnQgeyB1c2VRdWVyeSB9IGZyb20gJ0BhcG9sbG8vY2xpZW50JztcclxuaW1wb3J0IHsgcGVyUGFnZSB9IGZyb20gJy4uL2NvbmZpZyc7XHJcbmltcG9ydCB7dXNlTXV0YXRpb259IGZyb20gJ0BhcG9sbG8vY2xpZW50JztcclxuaW1wb3J0IHsgVW5pcXVlSW5wdXRGaWVsZE5hbWVzUnVsZSB9IGZyb20gJ2dyYXBocWwnO1xyXG7CoFxyXG5jb25zdCBDUkVBVEVfRVZFTlRfTVVUQVRJT04gPSBncWxgXHJcbiAgbXV0YXRpb24gQ1JFQVRFX0VWRU5UX01VVEFUSU9OIChcclxuICAgICR0aXRsZTogU3RyaW5nIVxyXG4gICAgJHN0YXJ0ZGF0ZTogU3RyaW5nXHJcbiAgICAkZW5kZGF0ZTogU3RyaW5nXHJcbiAgKSB7XHJcbiAgICBjcmVhdGVFdmVudChcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIHRpdGxlOiAkdGl0bGVcclxuICAgICAgICBzdGFydGRhdGU6ICRzdGFydGRhdGVcclxuICAgICAgICBlbmRkYXRlOiAkZW5kZGF0ZVxyXG4gICAgICB9XHJcbiAgICApIHtcclxuICAgICAgaWRcclxuICAgICAgdGl0bGVcclxuICAgICAgc3RhcmRhdGVcclxuICAgICAgZW5kZGF0ZVxyXG4gICAgfVxyXG4gIH1cclxuYDtcclxuwqBcclxuZXhwb3J0IGNvbnN0IEFMTF9FVkVOVFNfUVVFUlkgPSBncWxgXHJcbiAgcXVlcnkgQUxMX0VWRU5UU19RVUVSWSB7XHJcbiAgICBhbGxFdmVudHNMaXN0SXRlbXMge1xyXG4gICAgICBpZFxyXG4gICAgICB0aXRsZVxyXG4gICAgICBzdGFydGRhdGVcclxuICAgICAgZW5kZGF0ZVxyXG4gICAgICB1c2VyIHtcclxuICAgICAgICBpZFxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5gXHJcbsKgXHJcbsKgXHJcbsKgXHJcbmNvbnN0IGxvY2FsZXMgPSB7XHJcbiAgJ2VuLVVTJzogZW5VUyxcclxufTtcclxuwqBcclxuY29uc3QgbG9jYWxpemVyID0gZGF0ZUZuc0xvY2FsaXplcih7XHJcbiAgZm9ybWF0LFxyXG4gIHBhcnNlLFxyXG4gIHN0YXJ0T2ZXZWVrLFxyXG4gIGdldERheSxcclxuICBsb2NhbGVzLFxyXG59KTtcclxuwqBcclxuwqBcclxuwqBcclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ2FsZW5kYXJQYWdlKCkge1xyXG4gIGNvbnN0IHsgZGF0YSB9ID0gdXNlUXVlcnkoQUxMX0VWRU5UU19RVUVSWSk7XHJcbiAgY29uc3QgWyBjcmVhdGVFdmVudCBdID0gdXNlTXV0YXRpb24oQ1JFQVRFX0VWRU5UX01VVEFUSU9OKVxyXG4gIFxyXG5cclxuXHJcbiAgY29uc3QgW215RXZlbnRzMiwgc2V0RXZlbnRzXSA9IHVzZVN0YXRlKGRhdGEpXHJcbiAgY29uc29sZS5sb2cobXlFdmVudHMyKTtcclxuwqBcclxuICAvLyBDcmVhdGUgZXZlbnRcclxuICBjb25zdCBoYW5kbGVTZWxlY3RTbG90ID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoeyBzdGFydCwgZW5kIH0pID0+IHtcclxuICAgICAgY29uc3QgdGl0bGUgPSB3aW5kb3cucHJvbXB0KCdOZXcgRXZlbnQgbmFtZSwgZW50ZXIgaG91cnMgaWYgbmVlZGVkJylcclxuICAgICAgaWYgKHRpdGxlKSB7XHJcblxyXG4gICAgICAgIGNyZWF0ZUV2ZW50KHsgdmFyaWFibGVzOiB7IFxyXG4gICAgICAgICAgc3RhcnRkYXRlOiBzdGFydCxcclxuICAgICAgICAgIGVuZGRhdGU6IGVuZCxcclxuICAgICAgICAgIHRpdGxlOiB0aXRsZVxyXG4gICAgICAgIH0gfSlcclxuXHJcbiAgICAgICAgLy90YWthIHN1Z2VzdGlhIC0gdG8gbW/FvGUgemFkemlhxYJhxIcgbmEgb2TFm3dpZcW8YW5pdSB6bWllbm5laiBzdGFudSwgemFiZXpwaWVjemFtIGlmZW0gYm8gdSBtbmllIHogamFraWVnb8WbIHBvd29kdSBsaXN0YSB3IG15RXZlbnRzIGp1xbwgendyYWNhIG5hIHN0YXJjaWUgdW5kZWZpbmVkLCBhbGUgbW/FvGUgcHJ6ZXogdG8sIMW8ZSBqZXN0IHBvIHByb3N0dSBwdXN0YVxyXG4gICAgICAgIGlmKHR5cGVvZiBteUV2ZW50czIgIT09ICd1bmRlZmluZWQnKXtcclxuICAgICAgICAgIHNldEV2ZW50cyhbLi4ubXlFdmVudHMyLmFsbEV2ZW50c0xpc3RJdGVtcywgeyBzdGFydCwgZW5kLCB0aXRsZSB9XSlcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBbY3JlYXRlRXZlbnRdXHJcbiAgKVxyXG4gLy8gU2hvdyBldmVudCBcclxuICBjb25zdCBoYW5kbGVTZWxlY3RFdmVudCA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKGV2ZW50KSA9PiB3aW5kb3cuYWxlcnQoZXZlbnQudGl0bGUpLFxyXG4gICAgW11cclxuICApXHJcbsKgXHJcbiAgY29uc3QgcGFnZSA9IDE7XHJcbiAgY29uc3Qge215RXZlbnRzLCBlcnJvciwgbG9hZGluZyB9ID0gdXNlUXVlcnkoQUxMX0VWRU5UU19RVUVSWSwge1xyXG4gICAgdmFyaWFibGVzOiB7XHJcbiAgICAgICAgc2tpcDogcGFnZSAqIHBlclBhZ2UgLSBwZXJQYWdlLFxyXG4gICAgICAgIGZpcnN0OiBwZXJQYWdlLFxyXG4gICAgfVxyXG4gIH0pO1xyXG4gIC8vY29uc29sZS5sb2cobXlFdmVudHMpO1xyXG7CoFxyXG4gIHJldHVybiAoXHJcbsKgXHJcbiAgICA8ZGl2PlxyXG4gICAgICA8Q2FsZW5kYXJcclxuICAgICAgICBsb2NhbGl6ZXI9e2xvY2FsaXplcn1cclxuICAgICAgICBldmVudHM9e215RXZlbnRzMn1cclxuICAgICAgICBzdGFydEFjY2Vzc29yPVwic3RhcnRcIlxyXG4gICAgICAgIGVuZEFjY2Vzc29yPVwiZW5kXCJcclxuICAgICAgICBzdHlsZT17eyBoZWlnaHQ6IDUwMCB9fVxyXG4gICAgICAgIGFsbERheUFjY2Vzc29yXHJcbiAgICAgICAgdmlld3M9e1snbW9udGgnXX1cclxuICAgICAgICBvblNlbGVjdEV2ZW50PXtoYW5kbGVTZWxlY3RFdmVudH1cclxuICAgICAgICBvblNlbGVjdFNsb3Q9e2hhbmRsZVNlbGVjdFNsb3R9XHJcbiAgICAgICAgc2VsZWN0YWJsZVxyXG4gICAgICAvPlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufSIsIi8vIGV4cG9ydCBkZWZhdWx0IFtcclxuLy8gICAgIHtcclxuLy8gICAgICAgaWQ6IDAsXHJcbi8vICAgICAgIHRpdGxlOiAnVHJhaW5pbmcgMTktMjInLFxyXG4vLyAgICAgICBzdGFydDogbmV3IERhdGUoKSxcclxuLy8gICAgICAgZW5kOiBuZXcgRGF0ZSgpLFxyXG4vLyAgICAgfSxcclxuLy8gICBdO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0W1xyXG57fVxyXG5cclxuICAvLyBpZihsb2FkaW5nKSByZXR1cm4gPHA+TG9hZGluZy4uLjwvcD47XHJcbiAgLy8gaWYgKGVycm9yKSByZXR1cm4gPHA+RXJyb3I6IHtlcnJvci5tZXNzYWdlfTwvcD47XHJcbiAgLy8gcmV0dXJuIChcclxuICAvLyAgICAgPGRpdj5cclxuICAvLyAgICAgICAgIDxFeGVyY2lzZXNMaXN0U3R5bGVzPlxyXG4gIC8vICAgICAgICAgICAgIHtkYXRhLmFsbEV4ZXJjaXNlcy5tYXAoZXhlcmNpc2UgPT4gKFxyXG4gIC8vICAgICAgICAgICAgICAgICA8RXhlcmNpc2Uga2V5PXtleGVyY2lzZS5pZH0gZXhlcmNpc2U9e2V4ZXJjaXNlfSAvPlxyXG4gIC8vICAgICAgICAgICAgICkpfVxyXG4gIC8vICAgICAgICAgPC9FeGVyY2lzZXNMaXN0U3R5bGVzPlxyXG4gIC8vICAgICA8L2Rpdj5cclxuICAvLyApO1xyXG5dIiwiLy8gVGhpcyBpcyBjbGllbnQgc2lkZSBjb25maWcgb25seSAtIGRvbid0IHB1dCBhbnl0aGluZyBpbiBoZXJlIHRoYXQgc2hvdWxkbid0IGJlIHB1YmxpYyFcbmV4cG9ydCBjb25zdCBlbmRwb2ludCA9IGBodHRwOi8vbG9jYWxob3N0OjMwMDAvYXBpL2dyYXBocWxgO1xuZXhwb3J0IGNvbnN0IHByb2RFbmRwb2ludCA9IGBmaWxsIG1lIGluIHdoZW4gd2UgZGVwbG95YDtcbmV4cG9ydCBjb25zdCBwZXJQYWdlID0gNDtcbiJdLCJzb3VyY2VSb290IjoiIn0=
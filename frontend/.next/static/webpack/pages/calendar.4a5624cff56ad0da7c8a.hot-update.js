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
/* harmony import */ var date_fns_format__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! date-fns/format */ "./node_modules/date-fns/esm/format/index.js");
/* harmony import */ var date_fns_parse__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! date-fns/parse */ "./node_modules/date-fns/esm/parse/index.js");
/* harmony import */ var date_fns_startOfWeek__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! date-fns/startOfWeek */ "./node_modules/date-fns/esm/startOfWeek/index.js");
/* harmony import */ var date_fns_getDay__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! date-fns/getDay */ "./node_modules/date-fns/esm/getDay/index.js");
/* harmony import */ var date_fns_locale_en_US__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! date-fns/locale/en-US */ "./node_modules/date-fns/esm/locale/en-US/index.js");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! graphql-tag */ "./node_modules/graphql-tag/lib/index.js");
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @apollo/client */ "./node_modules/@apollo/client/index.js");
/* module decorator */ module = __webpack_require__.hmd(module);





var _jsxFileName = "C:\\Users\\Kamil\\Desktop\\coach-zone\\frontend\\components\\Calendar.js",
    _s = $RefreshSig$();

function _templateObject2() {
  var data = (0,C_Users_Kamil_Desktop_coach_zone_frontend_node_modules_next_node_modules_babel_runtime_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_3__.default)(["\n  query ALL_EVENTS_QUERY {\n    allEventsListItems {\n      id\n      title\n      startdate\n      enddate\n    }\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0,C_Users_Kamil_Desktop_coach_zone_frontend_node_modules_next_node_modules_babel_runtime_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_3__.default)(["\n  mutation CREATE_EVENT_MUTATION (\n    $title: String!\n    $startdate: String\n    $enddate: String\n  ) {\n    createEventsListItem(\n      data: {\n        title: $title\n        startdate: $startdate\n        enddate: $enddate\n      }\n    ) {\n      id\n      title\n      startdate\n      enddate\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}











var CREATE_EVENT_MUTATION = (0,graphql_tag__WEBPACK_IMPORTED_MODULE_6__.default)(_templateObject());
var ALL_EVENTS_QUERY = (0,graphql_tag__WEBPACK_IMPORTED_MODULE_6__.default)(_templateObject2());
var locales = {
  'en-US': date_fns_locale_en_US__WEBPACK_IMPORTED_MODULE_7__.default
};
var localizer = (0,react_big_calendar__WEBPACK_IMPORTED_MODULE_5__.dateFnsLocalizer)({
  format: date_fns_format__WEBPACK_IMPORTED_MODULE_8__.default,
  parse: date_fns_parse__WEBPACK_IMPORTED_MODULE_9__.default,
  startOfWeek: date_fns_startOfWeek__WEBPACK_IMPORTED_MODULE_10__.default,
  getDay: date_fns_getDay__WEBPACK_IMPORTED_MODULE_11__.default,
  locales: locales
});
function CalendarPage() {
  _s();

  var _useQuery = (0,_apollo_client__WEBPACK_IMPORTED_MODULE_12__.useQuery)(ALL_EVENTS_QUERY),
      data = _useQuery.data;

  var _useMutation = (0,_apollo_client__WEBPACK_IMPORTED_MODULE_12__.useMutation)(CREATE_EVENT_MUTATION),
      _useMutation2 = (0,C_Users_Kamil_Desktop_coach_zone_frontend_node_modules_next_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__.default)(_useMutation, 1),
      createEventsListItem = _useMutation2[0];

  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(data),
      myEvents2 = _useState[0],
      setEvents = _useState[1];

  console.log(myEvents2); // Create event

  var handleSelectSlot = (0,react__WEBPACK_IMPORTED_MODULE_4__.useCallback)(function (_ref) {
    var start = _ref.start,
        end = _ref.end;
    var title = window.prompt('New Event name, enter hours if needed');

    if (title) {
      createEventsListItem({
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
  }, [createEventsListItem]); // Show event 

  var handleSelectEvent = (0,react__WEBPACK_IMPORTED_MODULE_4__.useCallback)(function (event) {
    return window.alert(event.title);
  }, []);
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
      lineNumber: 96,
      columnNumber: 7
    }, this)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 95,
    columnNumber: 5
  }, this);
}

_s(CalendarPage, "ayZWSpDL6vTX/9hgWFKgIQY5CU0=", false, function () {
  return [_apollo_client__WEBPACK_IMPORTED_MODULE_12__.useQuery, _apollo_client__WEBPACK_IMPORTED_MODULE_12__.useMutation];
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


/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9DYWxlbmRhci5qcyJdLCJuYW1lcyI6WyJDUkVBVEVfRVZFTlRfTVVUQVRJT04iLCJncWwiLCJBTExfRVZFTlRTX1FVRVJZIiwibG9jYWxlcyIsImVuVVMiLCJsb2NhbGl6ZXIiLCJkYXRlRm5zTG9jYWxpemVyIiwiZm9ybWF0IiwicGFyc2UiLCJzdGFydE9mV2VlayIsImdldERheSIsIkNhbGVuZGFyUGFnZSIsInVzZVF1ZXJ5IiwiZGF0YSIsInVzZU11dGF0aW9uIiwiY3JlYXRlRXZlbnRzTGlzdEl0ZW0iLCJ1c2VTdGF0ZSIsIm15RXZlbnRzMiIsInNldEV2ZW50cyIsImNvbnNvbGUiLCJsb2ciLCJoYW5kbGVTZWxlY3RTbG90IiwidXNlQ2FsbGJhY2siLCJzdGFydCIsImVuZCIsInRpdGxlIiwid2luZG93IiwicHJvbXB0IiwidmFyaWFibGVzIiwic3RhcnRkYXRlIiwiZW5kZGF0ZSIsImFsbEV2ZW50c0xpc3RJdGVtcyIsImhhbmRsZVNlbGVjdEV2ZW50IiwiZXZlbnQiLCJhbGVydCIsImhlaWdodCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsSUFBTUEscUJBQXFCLEdBQUdDLG9EQUFILG1CQUEzQjtBQXFCTyxJQUFNQyxnQkFBZ0IsR0FBR0Qsb0RBQUgsb0JBQXRCO0FBYVAsSUFBTUUsT0FBTyxHQUFHO0FBQ2QsV0FBU0MsMERBQUlBO0FBREMsQ0FBaEI7QUFJQSxJQUFNQyxTQUFTLEdBQUdDLG9FQUFnQixDQUFDO0FBQ2pDQyxRQUFNLEVBQU5BLG9EQURpQztBQUVqQ0MsT0FBSyxFQUFMQSxtREFGaUM7QUFHakNDLGFBQVcsRUFBWEEsMERBSGlDO0FBSWpDQyxRQUFNLEVBQU5BLHFEQUppQztBQUtqQ1AsU0FBTyxFQUFQQTtBQUxpQyxDQUFELENBQWxDO0FBVWUsU0FBU1EsWUFBVCxHQUF3QjtBQUFBOztBQUFBLGtCQUNwQkMseURBQVEsQ0FBQ1YsZ0JBQUQsQ0FEWTtBQUFBLE1BQzdCVyxJQUQ2QixhQUM3QkEsSUFENkI7O0FBQUEscUJBRUpDLDREQUFXLENBQUNkLHFCQUFELENBRlA7QUFBQTtBQUFBLE1BRTdCZSxvQkFGNkI7O0FBQUEsa0JBSU5DLCtDQUFRLENBQUNILElBQUQsQ0FKRjtBQUFBLE1BSTlCSSxTQUo4QjtBQUFBLE1BSW5CQyxTQUptQjs7QUFLckNDLFNBQU8sQ0FBQ0MsR0FBUixDQUFZSCxTQUFaLEVBTHFDLENBT3JDOztBQUNBLE1BQU1JLGdCQUFnQixHQUFHQyxrREFBVyxDQUNsQyxnQkFBb0I7QUFBQSxRQUFqQkMsS0FBaUIsUUFBakJBLEtBQWlCO0FBQUEsUUFBVkMsR0FBVSxRQUFWQSxHQUFVO0FBQ2xCLFFBQU1DLEtBQUssR0FBR0MsTUFBTSxDQUFDQyxNQUFQLENBQWMsdUNBQWQsQ0FBZDs7QUFDQSxRQUFJRixLQUFKLEVBQVc7QUFFVFYsMEJBQW9CLENBQUM7QUFBRWEsaUJBQVMsRUFBRTtBQUNoQ0MsbUJBQVMsRUFBRU4sS0FEcUI7QUFFaENPLGlCQUFPLEVBQUVOLEdBRnVCO0FBR2hDQyxlQUFLLEVBQUVBO0FBSHlCO0FBQWIsT0FBRCxDQUFwQixDQUZTLENBUVA7O0FBQ0YsVUFBRyxPQUFPUixTQUFQLEtBQXFCLFdBQXhCLEVBQW9DO0FBQ2xDQyxpQkFBUyx5S0FBS0QsU0FBUyxDQUFDYyxrQkFBZixJQUFtQztBQUFFUixlQUFLLEVBQUxBLEtBQUY7QUFBU0MsYUFBRyxFQUFIQSxHQUFUO0FBQWNDLGVBQUssRUFBTEE7QUFBZCxTQUFuQyxHQUFUO0FBQ0Q7QUFDRjtBQUNGLEdBaEJpQyxFQWlCbEMsQ0FBQ1Ysb0JBQUQsQ0FqQmtDLENBQXBDLENBUnFDLENBMkJ0Qzs7QUFDQyxNQUFNaUIsaUJBQWlCLEdBQUdWLGtEQUFXLENBQ25DLFVBQUNXLEtBQUQ7QUFBQSxXQUFXUCxNQUFNLENBQUNRLEtBQVAsQ0FBYUQsS0FBSyxDQUFDUixLQUFuQixDQUFYO0FBQUEsR0FEbUMsRUFFbkMsRUFGbUMsQ0FBckM7QUFNQSxzQkFDRTtBQUFBLDJCQUNFLDhEQUFDLHdEQUFEO0FBQ0UsZUFBUyxFQUFFcEIsU0FEYjtBQUVFLFlBQU0sRUFBRVksU0FGVjtBQUdFLG1CQUFhLEVBQUMsT0FIaEI7QUFJRSxpQkFBVyxFQUFDLEtBSmQ7QUFLRSxXQUFLLEVBQUU7QUFBRWtCLGNBQU0sRUFBRTtBQUFWLE9BTFQ7QUFNRSxvQkFBYyxNQU5oQjtBQU9FLFdBQUssRUFBRSxDQUFDLE9BQUQsQ0FQVDtBQVFFLG1CQUFhLEVBQUVILGlCQVJqQjtBQVNFLGtCQUFZLEVBQUVYLGdCQVRoQjtBQVVFLGdCQUFVO0FBVlo7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURGO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFERjtBQWdCRDs7R0FsRHVCVixZO1VBQ0xDLHFELEVBQ2dCRSx3RDs7O0tBRlhILFkiLCJmaWxlIjoic3RhdGljL3dlYnBhY2svcGFnZXMvY2FsZW5kYXIuNGE1NjI0Y2ZmNTZhZDBkYTdjOGEuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlQ2FsbGJhY2sgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IENhbGVuZGFyLCBkYXRlRm5zTG9jYWxpemVyIH0gZnJvbSAncmVhY3QtYmlnLWNhbGVuZGFyJztcclxuaW1wb3J0IGZvcm1hdCBmcm9tICdkYXRlLWZucy9mb3JtYXQnO1xyXG5pbXBvcnQgcGFyc2UgZnJvbSAnZGF0ZS1mbnMvcGFyc2UnO1xyXG5pbXBvcnQgc3RhcnRPZldlZWsgZnJvbSAnZGF0ZS1mbnMvc3RhcnRPZldlZWsnO1xyXG5pbXBvcnQgZ2V0RGF5IGZyb20gJ2RhdGUtZm5zL2dldERheSc7XHJcbmltcG9ydCBlblVTIGZyb20gJ2RhdGUtZm5zL2xvY2FsZS9lbi1VUyc7XHJcbmltcG9ydCBncWwgZnJvbSAnZ3JhcGhxbC10YWcnO1xyXG5pbXBvcnQgeyB1c2VRdWVyeSB9IGZyb20gJ0BhcG9sbG8vY2xpZW50JztcclxuaW1wb3J0IHt1c2VNdXRhdGlvbn0gZnJvbSAnQGFwb2xsby9jbGllbnQnO1xyXG5cclxuY29uc3QgQ1JFQVRFX0VWRU5UX01VVEFUSU9OID0gZ3FsYFxyXG4gIG11dGF0aW9uIENSRUFURV9FVkVOVF9NVVRBVElPTiAoXHJcbiAgICAkdGl0bGU6IFN0cmluZyFcclxuICAgICRzdGFydGRhdGU6IFN0cmluZ1xyXG4gICAgJGVuZGRhdGU6IFN0cmluZ1xyXG4gICkge1xyXG4gICAgY3JlYXRlRXZlbnRzTGlzdEl0ZW0oXHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICB0aXRsZTogJHRpdGxlXHJcbiAgICAgICAgc3RhcnRkYXRlOiAkc3RhcnRkYXRlXHJcbiAgICAgICAgZW5kZGF0ZTogJGVuZGRhdGVcclxuICAgICAgfVxyXG4gICAgKSB7XHJcbiAgICAgIGlkXHJcbiAgICAgIHRpdGxlXHJcbiAgICAgIHN0YXJ0ZGF0ZVxyXG4gICAgICBlbmRkYXRlXHJcbiAgICB9XHJcbiAgfVxyXG5gO1xyXG7CoFxyXG5leHBvcnQgY29uc3QgQUxMX0VWRU5UU19RVUVSWSA9IGdxbGBcclxuICBxdWVyeSBBTExfRVZFTlRTX1FVRVJZIHtcclxuICAgIGFsbEV2ZW50c0xpc3RJdGVtcyB7XHJcbiAgICAgIGlkXHJcbiAgICAgIHRpdGxlXHJcbiAgICAgIHN0YXJ0ZGF0ZVxyXG4gICAgICBlbmRkYXRlXHJcbiAgICB9XHJcbiAgfVxyXG5gXHJcblxyXG5cclxuXHJcbmNvbnN0IGxvY2FsZXMgPSB7XHJcbiAgJ2VuLVVTJzogZW5VUyxcclxufTtcclxuwqBcclxuY29uc3QgbG9jYWxpemVyID0gZGF0ZUZuc0xvY2FsaXplcih7XHJcbiAgZm9ybWF0LFxyXG4gIHBhcnNlLFxyXG4gIHN0YXJ0T2ZXZWVrLFxyXG4gIGdldERheSxcclxuICBsb2NhbGVzLFxyXG59KTtcclxuXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ2FsZW5kYXJQYWdlKCkge1xyXG4gIGNvbnN0IHsgZGF0YSB9ID0gdXNlUXVlcnkoQUxMX0VWRU5UU19RVUVSWSk7XHJcbiAgY29uc3QgWyBjcmVhdGVFdmVudHNMaXN0SXRlbSBdID0gdXNlTXV0YXRpb24oQ1JFQVRFX0VWRU5UX01VVEFUSU9OKVxyXG4gIFxyXG4gIGNvbnN0IFtteUV2ZW50czIsIHNldEV2ZW50c10gPSB1c2VTdGF0ZShkYXRhKVxyXG4gIGNvbnNvbGUubG9nKG15RXZlbnRzMik7XHJcblxyXG4gIC8vIENyZWF0ZSBldmVudFxyXG4gIGNvbnN0IGhhbmRsZVNlbGVjdFNsb3QgPSB1c2VDYWxsYmFjayhcclxuICAgICh7IHN0YXJ0LCBlbmQgfSkgPT4ge1xyXG4gICAgICBjb25zdCB0aXRsZSA9IHdpbmRvdy5wcm9tcHQoJ05ldyBFdmVudCBuYW1lLCBlbnRlciBob3VycyBpZiBuZWVkZWQnKVxyXG4gICAgICBpZiAodGl0bGUpIHtcclxuXHJcbiAgICAgICAgY3JlYXRlRXZlbnRzTGlzdEl0ZW0oeyB2YXJpYWJsZXM6IHsgXHJcbiAgICAgICAgICBzdGFydGRhdGU6IHN0YXJ0LFxyXG4gICAgICAgICAgZW5kZGF0ZTogZW5kLFxyXG4gICAgICAgICAgdGl0bGU6IHRpdGxlXHJcbiAgICAgICAgfSB9KVxyXG5cclxuICAgICAgICAgIC8vdGFrYSBzdWdlc3RpYSAtIHRvIG1vxbxlIHphZHppYcWCYcSHIG5hIG9kxZt3aWXFvGFuaXUgem1pZW5uZWogc3RhbnUsIHphYmV6cGllY3phbSBpZmVtIGJvIHUgbW5pZSB6IGpha2llZ2/FmyBwb3dvZHUgbGlzdGEgdyBteUV2ZW50cyBqdcW8IHp3cmFjYSBuYSBzdGFyY2llIHVuZGVmaW5lZCwgYWxlIG1vxbxlIHByemV6IHRvLCDFvGUgamVzdCBwbyBwcm9zdHUgcHVzdGFcclxuICAgICAgICBpZih0eXBlb2YgbXlFdmVudHMyICE9PSAndW5kZWZpbmVkJyl7XHJcbiAgICAgICAgICBzZXRFdmVudHMoWy4uLm15RXZlbnRzMi5hbGxFdmVudHNMaXN0SXRlbXMsIHsgc3RhcnQsIGVuZCwgdGl0bGUgfV0pXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgW2NyZWF0ZUV2ZW50c0xpc3RJdGVtXVxyXG4gIClcclxuIC8vIFNob3cgZXZlbnQgXHJcbiAgY29uc3QgaGFuZGxlU2VsZWN0RXZlbnQgPSB1c2VDYWxsYmFjayhcclxuICAgIChldmVudCkgPT4gd2luZG93LmFsZXJ0KGV2ZW50LnRpdGxlKSxcclxuICAgIFtdXHJcbiAgKVxyXG5cclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXY+XHJcbiAgICAgIDxDYWxlbmRhclxyXG4gICAgICAgIGxvY2FsaXplcj17bG9jYWxpemVyfVxyXG4gICAgICAgIGV2ZW50cz17bXlFdmVudHMyfVxyXG4gICAgICAgIHN0YXJ0QWNjZXNzb3I9XCJzdGFydFwiXHJcbiAgICAgICAgZW5kQWNjZXNzb3I9XCJlbmRcIlxyXG4gICAgICAgIHN0eWxlPXt7IGhlaWdodDogNTAwIH19XHJcbiAgICAgICAgYWxsRGF5QWNjZXNzb3JcclxuICAgICAgICB2aWV3cz17Wydtb250aCddfVxyXG4gICAgICAgIG9uU2VsZWN0RXZlbnQ9e2hhbmRsZVNlbGVjdEV2ZW50fVxyXG4gICAgICAgIG9uU2VsZWN0U2xvdD17aGFuZGxlU2VsZWN0U2xvdH1cclxuICAgICAgICBzZWxlY3RhYmxlXHJcbiAgICAgIC8+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59Il0sInNvdXJjZVJvb3QiOiIifQ==
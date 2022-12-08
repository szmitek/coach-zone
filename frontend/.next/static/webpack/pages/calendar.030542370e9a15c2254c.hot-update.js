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
      }); //  taka sugestia - to może zadziałać na odświeżaniu zmiennej stanu, 
      // zabezpieczam ifem bo u mnie z jakiegoś powodu lista w myEvents już zwraca na starcie undefined, 
      // ale może przez to, że jest po prostu pusta

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
      lineNumber: 98,
      columnNumber: 7
    }, this)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 97,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9DYWxlbmRhci5qcyJdLCJuYW1lcyI6WyJDUkVBVEVfRVZFTlRfTVVUQVRJT04iLCJncWwiLCJBTExfRVZFTlRTX1FVRVJZIiwibG9jYWxlcyIsImVuVVMiLCJsb2NhbGl6ZXIiLCJkYXRlRm5zTG9jYWxpemVyIiwiZm9ybWF0IiwicGFyc2UiLCJzdGFydE9mV2VlayIsImdldERheSIsIkNhbGVuZGFyUGFnZSIsInVzZVF1ZXJ5IiwiZGF0YSIsInVzZU11dGF0aW9uIiwiY3JlYXRlRXZlbnRzTGlzdEl0ZW0iLCJ1c2VTdGF0ZSIsIm15RXZlbnRzMiIsInNldEV2ZW50cyIsImNvbnNvbGUiLCJsb2ciLCJoYW5kbGVTZWxlY3RTbG90IiwidXNlQ2FsbGJhY2siLCJzdGFydCIsImVuZCIsInRpdGxlIiwid2luZG93IiwicHJvbXB0IiwidmFyaWFibGVzIiwic3RhcnRkYXRlIiwiZW5kZGF0ZSIsImFsbEV2ZW50c0xpc3RJdGVtcyIsImhhbmRsZVNlbGVjdEV2ZW50IiwiZXZlbnQiLCJhbGVydCIsImhlaWdodCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsSUFBTUEscUJBQXFCLEdBQUdDLG9EQUFILG1CQUEzQjtBQXFCTyxJQUFNQyxnQkFBZ0IsR0FBR0Qsb0RBQUgsb0JBQXRCO0FBYVAsSUFBTUUsT0FBTyxHQUFHO0FBQ2QsV0FBU0MsMERBQUlBO0FBREMsQ0FBaEI7QUFJQSxJQUFNQyxTQUFTLEdBQUdDLG9FQUFnQixDQUFDO0FBQ2pDQyxRQUFNLEVBQU5BLG9EQURpQztBQUVqQ0MsT0FBSyxFQUFMQSxtREFGaUM7QUFHakNDLGFBQVcsRUFBWEEsMERBSGlDO0FBSWpDQyxRQUFNLEVBQU5BLHFEQUppQztBQUtqQ1AsU0FBTyxFQUFQQTtBQUxpQyxDQUFELENBQWxDO0FBVWUsU0FBU1EsWUFBVCxHQUF3QjtBQUFBOztBQUFBLGtCQUNwQkMseURBQVEsQ0FBQ1YsZ0JBQUQsQ0FEWTtBQUFBLE1BQzdCVyxJQUQ2QixhQUM3QkEsSUFENkI7O0FBQUEscUJBRUpDLDREQUFXLENBQUNkLHFCQUFELENBRlA7QUFBQTtBQUFBLE1BRTdCZSxvQkFGNkI7O0FBQUEsa0JBSU5DLCtDQUFRLENBQUNILElBQUQsQ0FKRjtBQUFBLE1BSTlCSSxTQUo4QjtBQUFBLE1BSW5CQyxTQUptQjs7QUFLckNDLFNBQU8sQ0FBQ0MsR0FBUixDQUFZSCxTQUFaLEVBTHFDLENBT3JDOztBQUNBLE1BQU1JLGdCQUFnQixHQUFHQyxrREFBVyxDQUNsQyxnQkFBb0I7QUFBQSxRQUFqQkMsS0FBaUIsUUFBakJBLEtBQWlCO0FBQUEsUUFBVkMsR0FBVSxRQUFWQSxHQUFVO0FBQ2xCLFFBQU1DLEtBQUssR0FBR0MsTUFBTSxDQUFDQyxNQUFQLENBQWMsdUNBQWQsQ0FBZDs7QUFDQSxRQUFJRixLQUFKLEVBQVc7QUFFVFYsMEJBQW9CLENBQUM7QUFBRWEsaUJBQVMsRUFBRTtBQUNoQ0MsbUJBQVMsRUFBRU4sS0FEcUI7QUFFaENPLGlCQUFPLEVBQUVOLEdBRnVCO0FBR2hDQyxlQUFLLEVBQUVBO0FBSHlCO0FBQWIsT0FBRCxDQUFwQixDQUZTLENBUVA7QUFDQTtBQUNBOztBQUNGLFVBQUcsT0FBT1IsU0FBUCxLQUFxQixXQUF4QixFQUFvQztBQUNsQ0MsaUJBQVMseUtBQUtELFNBQVMsQ0FBQ2Msa0JBQWYsSUFBbUM7QUFBRVIsZUFBSyxFQUFMQSxLQUFGO0FBQVNDLGFBQUcsRUFBSEEsR0FBVDtBQUFjQyxlQUFLLEVBQUxBO0FBQWQsU0FBbkMsR0FBVDtBQUNEO0FBQ0Y7QUFDRixHQWxCaUMsRUFtQmxDLENBQUNWLG9CQUFELENBbkJrQyxDQUFwQyxDQVJxQyxDQTZCdEM7O0FBQ0MsTUFBTWlCLGlCQUFpQixHQUFHVixrREFBVyxDQUNuQyxVQUFDVyxLQUFEO0FBQUEsV0FBV1AsTUFBTSxDQUFDUSxLQUFQLENBQWFELEtBQUssQ0FBQ1IsS0FBbkIsQ0FBWDtBQUFBLEdBRG1DLEVBRW5DLEVBRm1DLENBQXJDO0FBTUEsc0JBQ0U7QUFBQSwyQkFDRSw4REFBQyx3REFBRDtBQUNFLGVBQVMsRUFBRXBCLFNBRGI7QUFFRSxZQUFNLEVBQUVZLFNBRlY7QUFHRSxtQkFBYSxFQUFDLE9BSGhCO0FBSUUsaUJBQVcsRUFBQyxLQUpkO0FBS0UsV0FBSyxFQUFFO0FBQUVrQixjQUFNLEVBQUU7QUFBVixPQUxUO0FBTUUsb0JBQWMsTUFOaEI7QUFPRSxXQUFLLEVBQUUsQ0FBQyxPQUFELENBUFQ7QUFRRSxtQkFBYSxFQUFFSCxpQkFSakI7QUFTRSxrQkFBWSxFQUFFWCxnQkFUaEI7QUFVRSxnQkFBVTtBQVZaO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFERjtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBREY7QUFnQkQ7O0dBcER1QlYsWTtVQUNMQyxxRCxFQUNnQkUsd0Q7OztLQUZYSCxZIiwiZmlsZSI6InN0YXRpYy93ZWJwYWNrL3BhZ2VzL2NhbGVuZGFyLjAzMDU0MjM3MGU5YTE1YzIyNTRjLmhvdC11cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUNhbGxiYWNrIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBDYWxlbmRhciwgZGF0ZUZuc0xvY2FsaXplciB9IGZyb20gJ3JlYWN0LWJpZy1jYWxlbmRhcic7XHJcbmltcG9ydCBmb3JtYXQgZnJvbSAnZGF0ZS1mbnMvZm9ybWF0JztcclxuaW1wb3J0IHBhcnNlIGZyb20gJ2RhdGUtZm5zL3BhcnNlJztcclxuaW1wb3J0IHN0YXJ0T2ZXZWVrIGZyb20gJ2RhdGUtZm5zL3N0YXJ0T2ZXZWVrJztcclxuaW1wb3J0IGdldERheSBmcm9tICdkYXRlLWZucy9nZXREYXknO1xyXG5pbXBvcnQgZW5VUyBmcm9tICdkYXRlLWZucy9sb2NhbGUvZW4tVVMnO1xyXG5pbXBvcnQgZ3FsIGZyb20gJ2dyYXBocWwtdGFnJztcclxuaW1wb3J0IHsgdXNlUXVlcnkgfSBmcm9tICdAYXBvbGxvL2NsaWVudCc7XHJcbmltcG9ydCB7dXNlTXV0YXRpb259IGZyb20gJ0BhcG9sbG8vY2xpZW50JztcclxuXHJcbmNvbnN0IENSRUFURV9FVkVOVF9NVVRBVElPTiA9IGdxbGBcclxuICBtdXRhdGlvbiBDUkVBVEVfRVZFTlRfTVVUQVRJT04gKFxyXG4gICAgJHRpdGxlOiBTdHJpbmchXHJcbiAgICAkc3RhcnRkYXRlOiBTdHJpbmdcclxuICAgICRlbmRkYXRlOiBTdHJpbmdcclxuICApIHtcclxuICAgIGNyZWF0ZUV2ZW50c0xpc3RJdGVtKFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgdGl0bGU6ICR0aXRsZVxyXG4gICAgICAgIHN0YXJ0ZGF0ZTogJHN0YXJ0ZGF0ZVxyXG4gICAgICAgIGVuZGRhdGU6ICRlbmRkYXRlXHJcbiAgICAgIH1cclxuICAgICkge1xyXG4gICAgICBpZFxyXG4gICAgICB0aXRsZVxyXG4gICAgICBzdGFydGRhdGVcclxuICAgICAgZW5kZGF0ZVxyXG4gICAgfVxyXG4gIH1cclxuYDtcclxuwqBcclxuZXhwb3J0IGNvbnN0IEFMTF9FVkVOVFNfUVVFUlkgPSBncWxgXHJcbiAgcXVlcnkgQUxMX0VWRU5UU19RVUVSWSB7XHJcbiAgICBhbGxFdmVudHNMaXN0SXRlbXMge1xyXG4gICAgICBpZFxyXG4gICAgICB0aXRsZVxyXG4gICAgICBzdGFydGRhdGVcclxuICAgICAgZW5kZGF0ZVxyXG4gICAgfVxyXG4gIH1cclxuYFxyXG5cclxuXHJcblxyXG5jb25zdCBsb2NhbGVzID0ge1xyXG4gICdlbi1VUyc6IGVuVVMsXHJcbn07XHJcbsKgXHJcbmNvbnN0IGxvY2FsaXplciA9IGRhdGVGbnNMb2NhbGl6ZXIoe1xyXG4gIGZvcm1hdCxcclxuICBwYXJzZSxcclxuICBzdGFydE9mV2VlayxcclxuICBnZXREYXksXHJcbiAgbG9jYWxlcyxcclxufSk7XHJcblxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIENhbGVuZGFyUGFnZSgpIHtcclxuICBjb25zdCB7IGRhdGEgfSA9IHVzZVF1ZXJ5KEFMTF9FVkVOVFNfUVVFUlkpO1xyXG4gIGNvbnN0IFsgY3JlYXRlRXZlbnRzTGlzdEl0ZW0gXSA9IHVzZU11dGF0aW9uKENSRUFURV9FVkVOVF9NVVRBVElPTilcclxuICBcclxuICBjb25zdCBbbXlFdmVudHMyLCBzZXRFdmVudHNdID0gdXNlU3RhdGUoZGF0YSlcclxuICBjb25zb2xlLmxvZyhteUV2ZW50czIpO1xyXG5cclxuICAvLyBDcmVhdGUgZXZlbnRcclxuICBjb25zdCBoYW5kbGVTZWxlY3RTbG90ID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoeyBzdGFydCwgZW5kIH0pID0+IHtcclxuICAgICAgY29uc3QgdGl0bGUgPSB3aW5kb3cucHJvbXB0KCdOZXcgRXZlbnQgbmFtZSwgZW50ZXIgaG91cnMgaWYgbmVlZGVkJylcclxuICAgICAgaWYgKHRpdGxlKSB7XHJcblxyXG4gICAgICAgIGNyZWF0ZUV2ZW50c0xpc3RJdGVtKHsgdmFyaWFibGVzOiB7IFxyXG4gICAgICAgICAgc3RhcnRkYXRlOiBzdGFydCxcclxuICAgICAgICAgIGVuZGRhdGU6IGVuZCxcclxuICAgICAgICAgIHRpdGxlOiB0aXRsZVxyXG4gICAgICAgIH0gfSlcclxuXHJcbiAgICAgICAgICAvLyAgdGFrYSBzdWdlc3RpYSAtIHRvIG1vxbxlIHphZHppYcWCYcSHIG5hIG9kxZt3aWXFvGFuaXUgem1pZW5uZWogc3RhbnUsIFxyXG4gICAgICAgICAgLy8gemFiZXpwaWVjemFtIGlmZW0gYm8gdSBtbmllIHogamFraWVnb8WbIHBvd29kdSBsaXN0YSB3IG15RXZlbnRzIGp1xbwgendyYWNhIG5hIHN0YXJjaWUgdW5kZWZpbmVkLCBcclxuICAgICAgICAgIC8vIGFsZSBtb8W8ZSBwcnpleiB0bywgxbxlIGplc3QgcG8gcHJvc3R1IHB1c3RhXHJcbiAgICAgICAgaWYodHlwZW9mIG15RXZlbnRzMiAhPT0gJ3VuZGVmaW5lZCcpe1xyXG4gICAgICAgICAgc2V0RXZlbnRzKFsuLi5teUV2ZW50czIuYWxsRXZlbnRzTGlzdEl0ZW1zLCB7IHN0YXJ0LCBlbmQsIHRpdGxlIH1dKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFtjcmVhdGVFdmVudHNMaXN0SXRlbV1cclxuICApXHJcbiAvLyBTaG93IGV2ZW50IFxyXG4gIGNvbnN0IGhhbmRsZVNlbGVjdEV2ZW50ID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoZXZlbnQpID0+IHdpbmRvdy5hbGVydChldmVudC50aXRsZSksXHJcbiAgICBbXVxyXG4gIClcclxuXHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2PlxyXG4gICAgICA8Q2FsZW5kYXJcclxuICAgICAgICBsb2NhbGl6ZXI9e2xvY2FsaXplcn1cclxuICAgICAgICBldmVudHM9e215RXZlbnRzMn1cclxuICAgICAgICBzdGFydEFjY2Vzc29yPVwic3RhcnRcIlxyXG4gICAgICAgIGVuZEFjY2Vzc29yPVwiZW5kXCJcclxuICAgICAgICBzdHlsZT17eyBoZWlnaHQ6IDUwMCB9fVxyXG4gICAgICAgIGFsbERheUFjY2Vzc29yXHJcbiAgICAgICAgdmlld3M9e1snbW9udGgnXX1cclxuICAgICAgICBvblNlbGVjdEV2ZW50PXtoYW5kbGVTZWxlY3RFdmVudH1cclxuICAgICAgICBvblNlbGVjdFNsb3Q9e2hhbmRsZVNlbGVjdFNsb3R9XHJcbiAgICAgICAgc2VsZWN0YWJsZVxyXG4gICAgICAvPlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufSJdLCJzb3VyY2VSb290IjoiIn0=
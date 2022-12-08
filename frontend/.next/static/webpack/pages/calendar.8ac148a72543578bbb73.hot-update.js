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
      }); //taka sugestia - to może zadziałać na odświeżaniu zmiennej stanu, 
      //zabezpieczam ifem bo u mnie z jakiegoś powodu lista w myEvents już zwraca na starcie undefined, ale może przez to, że jest po prostu pusta

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
      lineNumber: 97,
      columnNumber: 7
    }, this)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 96,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9DYWxlbmRhci5qcyJdLCJuYW1lcyI6WyJDUkVBVEVfRVZFTlRfTVVUQVRJT04iLCJncWwiLCJBTExfRVZFTlRTX1FVRVJZIiwibG9jYWxlcyIsImVuVVMiLCJsb2NhbGl6ZXIiLCJkYXRlRm5zTG9jYWxpemVyIiwiZm9ybWF0IiwicGFyc2UiLCJzdGFydE9mV2VlayIsImdldERheSIsIkNhbGVuZGFyUGFnZSIsInVzZVF1ZXJ5IiwiZGF0YSIsInVzZU11dGF0aW9uIiwiY3JlYXRlRXZlbnRzTGlzdEl0ZW0iLCJ1c2VTdGF0ZSIsIm15RXZlbnRzMiIsInNldEV2ZW50cyIsImNvbnNvbGUiLCJsb2ciLCJoYW5kbGVTZWxlY3RTbG90IiwidXNlQ2FsbGJhY2siLCJzdGFydCIsImVuZCIsInRpdGxlIiwid2luZG93IiwicHJvbXB0IiwidmFyaWFibGVzIiwic3RhcnRkYXRlIiwiZW5kZGF0ZSIsImFsbEV2ZW50c0xpc3RJdGVtcyIsImhhbmRsZVNlbGVjdEV2ZW50IiwiZXZlbnQiLCJhbGVydCIsImhlaWdodCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsSUFBTUEscUJBQXFCLEdBQUdDLG9EQUFILG1CQUEzQjtBQXFCTyxJQUFNQyxnQkFBZ0IsR0FBR0Qsb0RBQUgsb0JBQXRCO0FBYVAsSUFBTUUsT0FBTyxHQUFHO0FBQ2QsV0FBU0MsMERBQUlBO0FBREMsQ0FBaEI7QUFJQSxJQUFNQyxTQUFTLEdBQUdDLG9FQUFnQixDQUFDO0FBQ2pDQyxRQUFNLEVBQU5BLG9EQURpQztBQUVqQ0MsT0FBSyxFQUFMQSxtREFGaUM7QUFHakNDLGFBQVcsRUFBWEEsMERBSGlDO0FBSWpDQyxRQUFNLEVBQU5BLHFEQUppQztBQUtqQ1AsU0FBTyxFQUFQQTtBQUxpQyxDQUFELENBQWxDO0FBVWUsU0FBU1EsWUFBVCxHQUF3QjtBQUFBOztBQUFBLGtCQUNwQkMseURBQVEsQ0FBQ1YsZ0JBQUQsQ0FEWTtBQUFBLE1BQzdCVyxJQUQ2QixhQUM3QkEsSUFENkI7O0FBQUEscUJBRUpDLDREQUFXLENBQUNkLHFCQUFELENBRlA7QUFBQTtBQUFBLE1BRTdCZSxvQkFGNkI7O0FBQUEsa0JBSU5DLCtDQUFRLENBQUNILElBQUQsQ0FKRjtBQUFBLE1BSTlCSSxTQUo4QjtBQUFBLE1BSW5CQyxTQUptQjs7QUFLckNDLFNBQU8sQ0FBQ0MsR0FBUixDQUFZSCxTQUFaLEVBTHFDLENBT3JDOztBQUNBLE1BQU1JLGdCQUFnQixHQUFHQyxrREFBVyxDQUNsQyxnQkFBb0I7QUFBQSxRQUFqQkMsS0FBaUIsUUFBakJBLEtBQWlCO0FBQUEsUUFBVkMsR0FBVSxRQUFWQSxHQUFVO0FBQ2xCLFFBQU1DLEtBQUssR0FBR0MsTUFBTSxDQUFDQyxNQUFQLENBQWMsdUNBQWQsQ0FBZDs7QUFDQSxRQUFJRixLQUFKLEVBQVc7QUFFVFYsMEJBQW9CLENBQUM7QUFBRWEsaUJBQVMsRUFBRTtBQUNoQ0MsbUJBQVMsRUFBRU4sS0FEcUI7QUFFaENPLGlCQUFPLEVBQUVOLEdBRnVCO0FBR2hDQyxlQUFLLEVBQUVBO0FBSHlCO0FBQWIsT0FBRCxDQUFwQixDQUZTLENBUVA7QUFDQTs7QUFDRixVQUFHLE9BQU9SLFNBQVAsS0FBcUIsV0FBeEIsRUFBb0M7QUFDbENDLGlCQUFTLHlLQUFLRCxTQUFTLENBQUNjLGtCQUFmLElBQW1DO0FBQUVSLGVBQUssRUFBTEEsS0FBRjtBQUFTQyxhQUFHLEVBQUhBLEdBQVQ7QUFBY0MsZUFBSyxFQUFMQTtBQUFkLFNBQW5DLEdBQVQ7QUFDRDtBQUNGO0FBQ0YsR0FqQmlDLEVBa0JsQyxDQUFDVixvQkFBRCxDQWxCa0MsQ0FBcEMsQ0FScUMsQ0E0QnRDOztBQUNDLE1BQU1pQixpQkFBaUIsR0FBR1Ysa0RBQVcsQ0FDbkMsVUFBQ1csS0FBRDtBQUFBLFdBQVdQLE1BQU0sQ0FBQ1EsS0FBUCxDQUFhRCxLQUFLLENBQUNSLEtBQW5CLENBQVg7QUFBQSxHQURtQyxFQUVuQyxFQUZtQyxDQUFyQztBQU1BLHNCQUNFO0FBQUEsMkJBQ0UsOERBQUMsd0RBQUQ7QUFDRSxlQUFTLEVBQUVwQixTQURiO0FBRUUsWUFBTSxFQUFFWSxTQUZWO0FBR0UsbUJBQWEsRUFBQyxPQUhoQjtBQUlFLGlCQUFXLEVBQUMsS0FKZDtBQUtFLFdBQUssRUFBRTtBQUFFa0IsY0FBTSxFQUFFO0FBQVYsT0FMVDtBQU1FLG9CQUFjLE1BTmhCO0FBT0UsV0FBSyxFQUFFLENBQUMsT0FBRCxDQVBUO0FBUUUsbUJBQWEsRUFBRUgsaUJBUmpCO0FBU0Usa0JBQVksRUFBRVgsZ0JBVGhCO0FBVUUsZ0JBQVU7QUFWWjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREY7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQURGO0FBZ0JEOztHQW5EdUJWLFk7VUFDTEMscUQsRUFDZ0JFLHdEOzs7S0FGWEgsWSIsImZpbGUiOiJzdGF0aWMvd2VicGFjay9wYWdlcy9jYWxlbmRhci44YWMxNDhhNzI1NDM1NzhiYmI3My5ob3QtdXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VDYWxsYmFjayB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgQ2FsZW5kYXIsIGRhdGVGbnNMb2NhbGl6ZXIgfSBmcm9tICdyZWFjdC1iaWctY2FsZW5kYXInO1xyXG5pbXBvcnQgZm9ybWF0IGZyb20gJ2RhdGUtZm5zL2Zvcm1hdCc7XHJcbmltcG9ydCBwYXJzZSBmcm9tICdkYXRlLWZucy9wYXJzZSc7XHJcbmltcG9ydCBzdGFydE9mV2VlayBmcm9tICdkYXRlLWZucy9zdGFydE9mV2Vlayc7XHJcbmltcG9ydCBnZXREYXkgZnJvbSAnZGF0ZS1mbnMvZ2V0RGF5JztcclxuaW1wb3J0IGVuVVMgZnJvbSAnZGF0ZS1mbnMvbG9jYWxlL2VuLVVTJztcclxuaW1wb3J0IGdxbCBmcm9tICdncmFwaHFsLXRhZyc7XHJcbmltcG9ydCB7IHVzZVF1ZXJ5IH0gZnJvbSAnQGFwb2xsby9jbGllbnQnO1xyXG5pbXBvcnQge3VzZU11dGF0aW9ufSBmcm9tICdAYXBvbGxvL2NsaWVudCc7XHJcblxyXG5jb25zdCBDUkVBVEVfRVZFTlRfTVVUQVRJT04gPSBncWxgXHJcbiAgbXV0YXRpb24gQ1JFQVRFX0VWRU5UX01VVEFUSU9OIChcclxuICAgICR0aXRsZTogU3RyaW5nIVxyXG4gICAgJHN0YXJ0ZGF0ZTogU3RyaW5nXHJcbiAgICAkZW5kZGF0ZTogU3RyaW5nXHJcbiAgKSB7XHJcbiAgICBjcmVhdGVFdmVudHNMaXN0SXRlbShcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIHRpdGxlOiAkdGl0bGVcclxuICAgICAgICBzdGFydGRhdGU6ICRzdGFydGRhdGVcclxuICAgICAgICBlbmRkYXRlOiAkZW5kZGF0ZVxyXG4gICAgICB9XHJcbiAgICApIHtcclxuICAgICAgaWRcclxuICAgICAgdGl0bGVcclxuICAgICAgc3RhcnRkYXRlXHJcbiAgICAgIGVuZGRhdGVcclxuICAgIH1cclxuICB9XHJcbmA7XHJcbsKgXHJcbmV4cG9ydCBjb25zdCBBTExfRVZFTlRTX1FVRVJZID0gZ3FsYFxyXG4gIHF1ZXJ5IEFMTF9FVkVOVFNfUVVFUlkge1xyXG4gICAgYWxsRXZlbnRzTGlzdEl0ZW1zIHtcclxuICAgICAgaWRcclxuICAgICAgdGl0bGVcclxuICAgICAgc3RhcnRkYXRlXHJcbiAgICAgIGVuZGRhdGVcclxuICAgIH1cclxuICB9XHJcbmBcclxuXHJcblxyXG5cclxuY29uc3QgbG9jYWxlcyA9IHtcclxuICAnZW4tVVMnOiBlblVTLFxyXG59O1xyXG7CoFxyXG5jb25zdCBsb2NhbGl6ZXIgPSBkYXRlRm5zTG9jYWxpemVyKHtcclxuICBmb3JtYXQsXHJcbiAgcGFyc2UsXHJcbiAgc3RhcnRPZldlZWssXHJcbiAgZ2V0RGF5LFxyXG4gIGxvY2FsZXMsXHJcbn0pO1xyXG5cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDYWxlbmRhclBhZ2UoKSB7XHJcbiAgY29uc3QgeyBkYXRhIH0gPSB1c2VRdWVyeShBTExfRVZFTlRTX1FVRVJZKTtcclxuICBjb25zdCBbIGNyZWF0ZUV2ZW50c0xpc3RJdGVtIF0gPSB1c2VNdXRhdGlvbihDUkVBVEVfRVZFTlRfTVVUQVRJT04pXHJcbiAgXHJcbiAgY29uc3QgW215RXZlbnRzMiwgc2V0RXZlbnRzXSA9IHVzZVN0YXRlKGRhdGEpXHJcbiAgY29uc29sZS5sb2cobXlFdmVudHMyKTtcclxuXHJcbiAgLy8gQ3JlYXRlIGV2ZW50XHJcbiAgY29uc3QgaGFuZGxlU2VsZWN0U2xvdCA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKHsgc3RhcnQsIGVuZCB9KSA9PiB7XHJcbiAgICAgIGNvbnN0IHRpdGxlID0gd2luZG93LnByb21wdCgnTmV3IEV2ZW50IG5hbWUsIGVudGVyIGhvdXJzIGlmIG5lZWRlZCcpXHJcbiAgICAgIGlmICh0aXRsZSkge1xyXG5cclxuICAgICAgICBjcmVhdGVFdmVudHNMaXN0SXRlbSh7IHZhcmlhYmxlczogeyBcclxuICAgICAgICAgIHN0YXJ0ZGF0ZTogc3RhcnQsXHJcbiAgICAgICAgICBlbmRkYXRlOiBlbmQsXHJcbiAgICAgICAgICB0aXRsZTogdGl0bGVcclxuICAgICAgICB9IH0pXHJcblxyXG4gICAgICAgICAgLy90YWthIHN1Z2VzdGlhIC0gdG8gbW/FvGUgemFkemlhxYJhxIcgbmEgb2TFm3dpZcW8YW5pdSB6bWllbm5laiBzdGFudSwgXHJcbiAgICAgICAgICAvL3phYmV6cGllY3phbSBpZmVtIGJvIHUgbW5pZSB6IGpha2llZ2/FmyBwb3dvZHUgbGlzdGEgdyBteUV2ZW50cyBqdcW8IHp3cmFjYSBuYSBzdGFyY2llIHVuZGVmaW5lZCwgYWxlIG1vxbxlIHByemV6IHRvLCDFvGUgamVzdCBwbyBwcm9zdHUgcHVzdGFcclxuICAgICAgICBpZih0eXBlb2YgbXlFdmVudHMyICE9PSAndW5kZWZpbmVkJyl7XHJcbiAgICAgICAgICBzZXRFdmVudHMoWy4uLm15RXZlbnRzMi5hbGxFdmVudHNMaXN0SXRlbXMsIHsgc3RhcnQsIGVuZCwgdGl0bGUgfV0pXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgW2NyZWF0ZUV2ZW50c0xpc3RJdGVtXVxyXG4gIClcclxuIC8vIFNob3cgZXZlbnQgXHJcbiAgY29uc3QgaGFuZGxlU2VsZWN0RXZlbnQgPSB1c2VDYWxsYmFjayhcclxuICAgIChldmVudCkgPT4gd2luZG93LmFsZXJ0KGV2ZW50LnRpdGxlKSxcclxuICAgIFtdXHJcbiAgKVxyXG5cclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXY+XHJcbiAgICAgIDxDYWxlbmRhclxyXG4gICAgICAgIGxvY2FsaXplcj17bG9jYWxpemVyfVxyXG4gICAgICAgIGV2ZW50cz17bXlFdmVudHMyfVxyXG4gICAgICAgIHN0YXJ0QWNjZXNzb3I9XCJzdGFydFwiXHJcbiAgICAgICAgZW5kQWNjZXNzb3I9XCJlbmRcIlxyXG4gICAgICAgIHN0eWxlPXt7IGhlaWdodDogNTAwIH19XHJcbiAgICAgICAgYWxsRGF5QWNjZXNzb3JcclxuICAgICAgICB2aWV3cz17Wydtb250aCddfVxyXG4gICAgICAgIG9uU2VsZWN0RXZlbnQ9e2hhbmRsZVNlbGVjdEV2ZW50fVxyXG4gICAgICAgIG9uU2VsZWN0U2xvdD17aGFuZGxlU2VsZWN0U2xvdH1cclxuICAgICAgICBzZWxlY3RhYmxlXHJcbiAgICAgIC8+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59Il0sInNvdXJjZVJvb3QiOiIifQ==
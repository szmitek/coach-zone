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
  var data = (0,C_Users_Kamil_Desktop_coach_zone_frontend_node_modules_next_node_modules_babel_runtime_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_3__.default)(["\n  query ALL_EVENTS_QUERY {\n    allEventsListItems {\n      id\n      title\n      startdate\n      enddate\n\n    }\n  }\n"]);

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
      lineNumber: 111,
      columnNumber: 7
    }, this)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 110,
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


/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9DYWxlbmRhci5qcyJdLCJuYW1lcyI6WyJDUkVBVEVfRVZFTlRfTVVUQVRJT04iLCJncWwiLCJBTExfRVZFTlRTX1FVRVJZIiwibG9jYWxlcyIsImVuVVMiLCJsb2NhbGl6ZXIiLCJkYXRlRm5zTG9jYWxpemVyIiwiZm9ybWF0IiwicGFyc2UiLCJzdGFydE9mV2VlayIsImdldERheSIsIkNhbGVuZGFyUGFnZSIsInVzZVF1ZXJ5IiwiZGF0YSIsInVzZU11dGF0aW9uIiwiY3JlYXRlRXZlbnQiLCJ1c2VTdGF0ZSIsIm15RXZlbnRzMiIsInNldEV2ZW50cyIsImNvbnNvbGUiLCJsb2ciLCJoYW5kbGVTZWxlY3RTbG90IiwidXNlQ2FsbGJhY2siLCJzdGFydCIsImVuZCIsInRpdGxlIiwid2luZG93IiwicHJvbXB0IiwidmFyaWFibGVzIiwic3RhcnRkYXRlIiwiZW5kZGF0ZSIsImFsbEV2ZW50c0xpc3RJdGVtcyIsImhhbmRsZVNlbGVjdEV2ZW50IiwiZXZlbnQiLCJhbGVydCIsInBhZ2UiLCJza2lwIiwicGVyUGFnZSIsImZpcnN0IiwibXlFdmVudHMiLCJlcnJvciIsImxvYWRpbmciLCJoZWlnaHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsSUFBTUEscUJBQXFCLEdBQUdDLG9EQUFILG1CQUEzQjtBQXFCTyxJQUFNQyxnQkFBZ0IsR0FBR0Qsb0RBQUgsb0JBQXRCO0FBY1AsSUFBTUUsT0FBTyxHQUFHO0FBQ2QsV0FBU0MsMERBQUlBO0FBREMsQ0FBaEI7QUFJQSxJQUFNQyxTQUFTLEdBQUdDLG9FQUFnQixDQUFDO0FBQ2pDQyxRQUFNLEVBQU5BLHFEQURpQztBQUVqQ0MsT0FBSyxFQUFMQSxvREFGaUM7QUFHakNDLGFBQVcsRUFBWEEsMERBSGlDO0FBSWpDQyxRQUFNLEVBQU5BLHFEQUppQztBQUtqQ1AsU0FBTyxFQUFQQTtBQUxpQyxDQUFELENBQWxDO0FBVWUsU0FBU1EsWUFBVCxHQUF3QjtBQUFBOztBQUFBLGtCQUNwQkMseURBQVEsQ0FBQ1YsZ0JBQUQsQ0FEWTtBQUFBLE1BQzdCVyxJQUQ2QixhQUM3QkEsSUFENkI7O0FBQUEscUJBRWJDLDREQUFXLENBQUNkLHFCQUFELENBRkU7QUFBQTtBQUFBLE1BRTdCZSxXQUY2Qjs7QUFBQSxrQkFNTkMsK0NBQVEsQ0FBQ0gsSUFBRCxDQU5GO0FBQUEsTUFNOUJJLFNBTjhCO0FBQUEsTUFNbkJDLFNBTm1COztBQU9yQ0MsU0FBTyxDQUFDQyxHQUFSLENBQVlILFNBQVosRUFQcUMsQ0FTckM7O0FBQ0EsTUFBTUksZ0JBQWdCLEdBQUdDLGtEQUFXLENBQ2xDLGdCQUFvQjtBQUFBLFFBQWpCQyxLQUFpQixRQUFqQkEsS0FBaUI7QUFBQSxRQUFWQyxHQUFVLFFBQVZBLEdBQVU7QUFDbEIsUUFBTUMsS0FBSyxHQUFHQyxNQUFNLENBQUNDLE1BQVAsQ0FBYyx1Q0FBZCxDQUFkOztBQUNBLFFBQUlGLEtBQUosRUFBVztBQUVUVixpQkFBVyxDQUFDO0FBQUVhLGlCQUFTLEVBQUU7QUFDdkJDLG1CQUFTLEVBQUVOLEtBRFk7QUFFdkJPLGlCQUFPLEVBQUVOLEdBRmM7QUFHdkJDLGVBQUssRUFBRUE7QUFIZ0I7QUFBYixPQUFELENBQVgsQ0FGUyxDQVFUOztBQUNBLFVBQUcsT0FBT1IsU0FBUCxLQUFxQixXQUF4QixFQUFvQztBQUNsQ0MsaUJBQVMseUtBQUtELFNBQVMsQ0FBQ2Msa0JBQWYsSUFBbUM7QUFBRVIsZUFBSyxFQUFMQSxLQUFGO0FBQVNDLGFBQUcsRUFBSEEsR0FBVDtBQUFjQyxlQUFLLEVBQUxBO0FBQWQsU0FBbkMsR0FBVDtBQUNEO0FBQ0Y7QUFDRixHQWhCaUMsRUFpQmxDLENBQUNWLFdBQUQsQ0FqQmtDLENBQXBDLENBVnFDLENBNkJ0Qzs7QUFDQyxNQUFNaUIsaUJBQWlCLEdBQUdWLGtEQUFXLENBQ25DLFVBQUNXLEtBQUQ7QUFBQSxXQUFXUCxNQUFNLENBQUNRLEtBQVAsQ0FBYUQsS0FBSyxDQUFDUixLQUFuQixDQUFYO0FBQUEsR0FEbUMsRUFFbkMsRUFGbUMsQ0FBckM7QUFLQSxNQUFNVSxJQUFJLEdBQUcsQ0FBYjs7QUFuQ3FDLG1CQW9DRHZCLHlEQUFRLENBQUNWLGdCQUFELEVBQW1CO0FBQzdEMEIsYUFBUyxFQUFFO0FBQ1BRLFVBQUksRUFBRUQsSUFBSSxHQUFHRSw0Q0FBUCxHQUFpQkEsNENBRGhCO0FBRVBDLFdBQUssRUFBRUQsNENBQU9BO0FBRlA7QUFEa0QsR0FBbkIsQ0FwQ1A7QUFBQSxNQW9DOUJFLFFBcEM4QixjQW9DOUJBLFFBcEM4QjtBQUFBLE1Bb0NwQkMsS0FwQ29CLGNBb0NwQkEsS0FwQ29CO0FBQUEsTUFvQ2JDLE9BcENhLGNBb0NiQSxPQXBDYSxFQTBDckM7OztBQUVBLHNCQUVFO0FBQUEsMkJBQ0UsOERBQUMsd0RBQUQ7QUFDRSxlQUFTLEVBQUVwQyxTQURiO0FBRUUsWUFBTSxFQUFFWSxTQUZWO0FBR0UsbUJBQWEsRUFBQyxPQUhoQjtBQUlFLGlCQUFXLEVBQUMsS0FKZDtBQUtFLFdBQUssRUFBRTtBQUFFeUIsY0FBTSxFQUFFO0FBQVYsT0FMVDtBQU1FLG9CQUFjLE1BTmhCO0FBT0UsV0FBSyxFQUFFLENBQUMsT0FBRCxDQVBUO0FBUUUsbUJBQWEsRUFBRVYsaUJBUmpCO0FBU0Usa0JBQVksRUFBRVgsZ0JBVGhCO0FBVUUsZ0JBQVU7QUFWWjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREY7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQUZGO0FBaUJEOztHQTdEdUJWLFk7VUFDTEMscUQsRUFDT0Usd0QsRUFrQ1lGLHFEOzs7S0FwQ2RELFkiLCJmaWxlIjoic3RhdGljL3dlYnBhY2svcGFnZXMvY2FsZW5kYXIuYmZhYjk2ZmEwNjY0MjhmODliYjEuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlQ2FsbGJhY2sgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IENhbGVuZGFyLCBkYXRlRm5zTG9jYWxpemVyIH0gZnJvbSAncmVhY3QtYmlnLWNhbGVuZGFyJztcclxuaW1wb3J0IGZvcm1hdCBmcm9tICdkYXRlLWZucy9mb3JtYXQnO1xyXG5pbXBvcnQgcGFyc2UgZnJvbSAnZGF0ZS1mbnMvcGFyc2UnO1xyXG5pbXBvcnQgc3RhcnRPZldlZWsgZnJvbSAnZGF0ZS1mbnMvc3RhcnRPZldlZWsnO1xyXG5pbXBvcnQgZ2V0RGF5IGZyb20gJ2RhdGUtZm5zL2dldERheSc7XHJcbmltcG9ydCBlblVTIGZyb20gJ2RhdGUtZm5zL2xvY2FsZS9lbi1VUyc7XHJcbmltcG9ydCBldmVudHMgZnJvbSAnLi9FdmVudHMnXHJcbmltcG9ydCBncWwgZnJvbSAnZ3JhcGhxbC10YWcnO1xyXG5pbXBvcnQgeyB1c2VRdWVyeSB9IGZyb20gJ0BhcG9sbG8vY2xpZW50JztcclxuaW1wb3J0IHsgcGVyUGFnZSB9IGZyb20gJy4uL2NvbmZpZyc7XHJcbmltcG9ydCB7dXNlTXV0YXRpb259IGZyb20gJ0BhcG9sbG8vY2xpZW50JztcclxuaW1wb3J0IHsgVW5pcXVlSW5wdXRGaWVsZE5hbWVzUnVsZSB9IGZyb20gJ2dyYXBocWwnO1xyXG7CoFxyXG5jb25zdCBDUkVBVEVfRVZFTlRfTVVUQVRJT04gPSBncWxgXHJcbiAgbXV0YXRpb24gQ1JFQVRFX0VWRU5UX01VVEFUSU9OIChcclxuICAgICR0aXRsZTogU3RyaW5nIVxyXG4gICAgJHN0YXJ0ZGF0ZTogU3RyaW5nXHJcbiAgICAkZW5kZGF0ZTogU3RyaW5nXHJcbiAgKSB7XHJcbiAgICBjcmVhdGVFdmVudChcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIHRpdGxlOiAkdGl0bGVcclxuICAgICAgICBzdGFydGRhdGU6ICRzdGFydGRhdGVcclxuICAgICAgICBlbmRkYXRlOiAkZW5kZGF0ZVxyXG4gICAgICB9XHJcbiAgICApIHtcclxuICAgICAgaWRcclxuICAgICAgdGl0bGVcclxuICAgICAgc3RhcmRhdGVcclxuICAgICAgZW5kZGF0ZVxyXG4gICAgfVxyXG4gIH1cclxuYDtcclxuwqBcclxuZXhwb3J0IGNvbnN0IEFMTF9FVkVOVFNfUVVFUlkgPSBncWxgXHJcbiAgcXVlcnkgQUxMX0VWRU5UU19RVUVSWSB7XHJcbiAgICBhbGxFdmVudHNMaXN0SXRlbXMge1xyXG4gICAgICBpZFxyXG4gICAgICB0aXRsZVxyXG4gICAgICBzdGFydGRhdGVcclxuICAgICAgZW5kZGF0ZVxyXG5cclxuICAgIH1cclxuICB9XHJcbmBcclxuwqBcclxuwqBcclxuwqBcclxuY29uc3QgbG9jYWxlcyA9IHtcclxuICAnZW4tVVMnOiBlblVTLFxyXG59O1xyXG7CoFxyXG5jb25zdCBsb2NhbGl6ZXIgPSBkYXRlRm5zTG9jYWxpemVyKHtcclxuICBmb3JtYXQsXHJcbiAgcGFyc2UsXHJcbiAgc3RhcnRPZldlZWssXHJcbiAgZ2V0RGF5LFxyXG4gIGxvY2FsZXMsXHJcbn0pO1xyXG7CoFxyXG7CoFxyXG7CoFxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDYWxlbmRhclBhZ2UoKSB7XHJcbiAgY29uc3QgeyBkYXRhIH0gPSB1c2VRdWVyeShBTExfRVZFTlRTX1FVRVJZKTtcclxuICBjb25zdCBbIGNyZWF0ZUV2ZW50IF0gPSB1c2VNdXRhdGlvbihDUkVBVEVfRVZFTlRfTVVUQVRJT04pXHJcbiAgXHJcblxyXG5cclxuICBjb25zdCBbbXlFdmVudHMyLCBzZXRFdmVudHNdID0gdXNlU3RhdGUoZGF0YSlcclxuICBjb25zb2xlLmxvZyhteUV2ZW50czIpO1xyXG7CoFxyXG4gIC8vIENyZWF0ZSBldmVudFxyXG4gIGNvbnN0IGhhbmRsZVNlbGVjdFNsb3QgPSB1c2VDYWxsYmFjayhcclxuICAgICh7IHN0YXJ0LCBlbmQgfSkgPT4ge1xyXG4gICAgICBjb25zdCB0aXRsZSA9IHdpbmRvdy5wcm9tcHQoJ05ldyBFdmVudCBuYW1lLCBlbnRlciBob3VycyBpZiBuZWVkZWQnKVxyXG4gICAgICBpZiAodGl0bGUpIHtcclxuXHJcbiAgICAgICAgY3JlYXRlRXZlbnQoeyB2YXJpYWJsZXM6IHsgXHJcbiAgICAgICAgICBzdGFydGRhdGU6IHN0YXJ0LFxyXG4gICAgICAgICAgZW5kZGF0ZTogZW5kLFxyXG4gICAgICAgICAgdGl0bGU6IHRpdGxlXHJcbiAgICAgICAgfSB9KVxyXG5cclxuICAgICAgICAvL3Rha2Egc3VnZXN0aWEgLSB0byBtb8W8ZSB6YWR6aWHFgmHEhyBuYSBvZMWbd2llxbxhbml1IHptaWVubmVqIHN0YW51LCB6YWJlenBpZWN6YW0gaWZlbSBibyB1IG1uaWUgeiBqYWtpZWdvxZsgcG93b2R1IGxpc3RhIHcgbXlFdmVudHMganXFvCB6d3JhY2EgbmEgc3RhcmNpZSB1bmRlZmluZWQsIGFsZSBtb8W8ZSBwcnpleiB0bywgxbxlIGplc3QgcG8gcHJvc3R1IHB1c3RhXHJcbiAgICAgICAgaWYodHlwZW9mIG15RXZlbnRzMiAhPT0gJ3VuZGVmaW5lZCcpe1xyXG4gICAgICAgICAgc2V0RXZlbnRzKFsuLi5teUV2ZW50czIuYWxsRXZlbnRzTGlzdEl0ZW1zLCB7IHN0YXJ0LCBlbmQsIHRpdGxlIH1dKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFtjcmVhdGVFdmVudF1cclxuICApXHJcbiAvLyBTaG93IGV2ZW50IFxyXG4gIGNvbnN0IGhhbmRsZVNlbGVjdEV2ZW50ID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoZXZlbnQpID0+IHdpbmRvdy5hbGVydChldmVudC50aXRsZSksXHJcbiAgICBbXVxyXG4gIClcclxuwqBcclxuICBjb25zdCBwYWdlID0gMTtcclxuICBjb25zdCB7bXlFdmVudHMsIGVycm9yLCBsb2FkaW5nIH0gPSB1c2VRdWVyeShBTExfRVZFTlRTX1FVRVJZLCB7XHJcbiAgICB2YXJpYWJsZXM6IHtcclxuICAgICAgICBza2lwOiBwYWdlICogcGVyUGFnZSAtIHBlclBhZ2UsXHJcbiAgICAgICAgZmlyc3Q6IHBlclBhZ2UsXHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgLy9jb25zb2xlLmxvZyhteUV2ZW50cyk7XHJcbsKgXHJcbiAgcmV0dXJuIChcclxuwqBcclxuICAgIDxkaXY+XHJcbiAgICAgIDxDYWxlbmRhclxyXG4gICAgICAgIGxvY2FsaXplcj17bG9jYWxpemVyfVxyXG4gICAgICAgIGV2ZW50cz17bXlFdmVudHMyfVxyXG4gICAgICAgIHN0YXJ0QWNjZXNzb3I9XCJzdGFydFwiXHJcbiAgICAgICAgZW5kQWNjZXNzb3I9XCJlbmRcIlxyXG4gICAgICAgIHN0eWxlPXt7IGhlaWdodDogNTAwIH19XHJcbiAgICAgICAgYWxsRGF5QWNjZXNzb3JcclxuICAgICAgICB2aWV3cz17Wydtb250aCddfVxyXG4gICAgICAgIG9uU2VsZWN0RXZlbnQ9e2hhbmRsZVNlbGVjdEV2ZW50fVxyXG4gICAgICAgIG9uU2VsZWN0U2xvdD17aGFuZGxlU2VsZWN0U2xvdH1cclxuICAgICAgICBzZWxlY3RhYmxlXHJcbiAgICAgIC8+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59Il0sInNvdXJjZVJvb3QiOiIifQ==
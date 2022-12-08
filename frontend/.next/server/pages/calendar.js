(function() {
var exports = {};
exports.id = "pages/calendar";
exports.ids = ["pages/calendar"];
exports.modules = {

/***/ "./components/Calendar.js":
/*!********************************!*\
  !*** ./components/Calendar.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ALL_EVENTS_QUERY": function() { return /* binding */ ALL_EVENTS_QUERY; },
/* harmony export */   "default": function() { return /* binding */ CalendarPage; }
/* harmony export */ });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_big_calendar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-big-calendar */ "react-big-calendar");
/* harmony import */ var react_big_calendar__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_big_calendar__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var date_fns_format__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! date-fns/format */ "./node_modules/date-fns/esm/format/index.js");
/* harmony import */ var date_fns_parse__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! date-fns/parse */ "./node_modules/date-fns/esm/parse/index.js");
/* harmony import */ var date_fns_startOfWeek__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! date-fns/startOfWeek */ "./node_modules/date-fns/esm/startOfWeek/index.js");
/* harmony import */ var date_fns_getDay__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! date-fns/getDay */ "./node_modules/date-fns/esm/getDay/index.js");
/* harmony import */ var date_fns_locale_en_US__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! date-fns/locale/en-US */ "./node_modules/date-fns/esm/locale/en-US/index.js");
/* harmony import */ var _Events__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Events */ "./components/Events.js");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! graphql-tag */ "graphql-tag");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @apollo/client */ "@apollo/client");
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_apollo_client__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../config */ "./config.js");
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! graphql */ "graphql");
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(graphql__WEBPACK_IMPORTED_MODULE_7__);

var _jsxFileName = "C:\\Users\\Kamil\\Desktop\\coach-zone\\frontend\\components\\Calendar.js";













const CREATE_EVENT_MUTATION = (graphql_tag__WEBPACK_IMPORTED_MODULE_4___default())`
  mutation CREATE_EVENT_MUTATION (
    $title: String!
    $startdate: String
    $enddate: String
  ) {
    createEvent(
      data: {
        title: $title
        startdate: $startdate
        enddate: $enddate
      }
    ) {
      id
      title
      stardate
      enddate
    }
  }
`;
const ALL_EVENTS_QUERY = (graphql_tag__WEBPACK_IMPORTED_MODULE_4___default())`
  query ALL_EVENTS_QUERY {
    allEventsListItems {
      id
      title
      startdate
      enddate

    }
  }
`;
const locales = {
  'en-US': date_fns_locale_en_US__WEBPACK_IMPORTED_MODULE_8__.default
};
const localizer = (0,react_big_calendar__WEBPACK_IMPORTED_MODULE_2__.dateFnsLocalizer)({
  format: date_fns_format__WEBPACK_IMPORTED_MODULE_9__.default,
  parse: date_fns_parse__WEBPACK_IMPORTED_MODULE_10__.default,
  startOfWeek: date_fns_startOfWeek__WEBPACK_IMPORTED_MODULE_11__.default,
  getDay: date_fns_getDay__WEBPACK_IMPORTED_MODULE_12__.default,
  locales
});
function CalendarPage() {
  const {
    data
  } = (0,_apollo_client__WEBPACK_IMPORTED_MODULE_5__.useQuery)(ALL_EVENTS_QUERY);
  const [createEvent] = (0,_apollo_client__WEBPACK_IMPORTED_MODULE_5__.useMutation)(CREATE_EVENT_MUTATION);
  const event = data;
  console.log(event);
  const {
    0: myEvents2,
    1: setEvents
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(data);
  console.log(myEvents2); // Create event

  const handleSelectSlot = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(({
    start,
    end
  }) => {
    const title = window.prompt('New Event name, enter hours if needed');

    if (title) {
      createEvent({
        variables: {
          startdate: start,
          enddate: end,
          title: title
        }
      }); //taka sugestia - to może zadziałać na odświeżaniu zmiennej stanu, zabezpieczam ifem bo u mnie z jakiegoś powodu lista w myEvents już zwraca na starcie undefined, ale może przez to, że jest po prostu pusta

      if (typeof myEvents2 !== 'undefined') {
        setEvents([...myEvents2.allEventsListItems, {
          start,
          end,
          title
        }]);
      }
    }
  }, [createEvent]); // Show event 

  const handleSelectEvent = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(event => window.alert(event.title), []);
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_big_calendar__WEBPACK_IMPORTED_MODULE_2__.Calendar, {
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
      lineNumber: 103,
      columnNumber: 7
    }, this)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 102,
    columnNumber: 5
  }, this);
}

/***/ }),

/***/ "./components/Events.js":
/*!******************************!*\
  !*** ./components/Events.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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

/***/ }),

/***/ "./config.js":
/*!*******************!*\
  !*** ./config.js ***!
  \*******************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "endpoint": function() { return /* binding */ endpoint; },
/* harmony export */   "prodEndpoint": function() { return /* binding */ prodEndpoint; },
/* harmony export */   "perPage": function() { return /* binding */ perPage; }
/* harmony export */ });
// This is client side config only - don't put anything in here that shouldn't be public!
const endpoint = `http://localhost:3000/api/graphql`;
const prodEndpoint = `fill me in when we deploy`;
const perPage = 4;

/***/ }),

/***/ "./pages/calendar.js":
/*!***************************!*\
  !*** ./pages/calendar.js ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ calendarPage; }
/* harmony export */ });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Calendar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/Calendar */ "./components/Calendar.js");

var _jsxFileName = "C:\\Users\\Kamil\\Desktop\\coach-zone\\frontend\\pages\\calendar.js";

function calendarPage() {
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Calendar__WEBPACK_IMPORTED_MODULE_1__.default, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 6,
      columnNumber: 13
    }, this)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 5,
    columnNumber: 9
  }, this);
}

/***/ }),

/***/ "@apollo/client":
/*!*********************************!*\
  !*** external "@apollo/client" ***!
  \*********************************/
/***/ (function(module) {

"use strict";
module.exports = require("@apollo/client");;

/***/ }),

/***/ "graphql":
/*!**************************!*\
  !*** external "graphql" ***!
  \**************************/
/***/ (function(module) {

"use strict";
module.exports = require("graphql");;

/***/ }),

/***/ "graphql-tag":
/*!******************************!*\
  !*** external "graphql-tag" ***!
  \******************************/
/***/ (function(module) {

"use strict";
module.exports = require("graphql-tag");;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ (function(module) {

"use strict";
module.exports = require("react");;

/***/ }),

/***/ "react-big-calendar":
/*!*************************************!*\
  !*** external "react-big-calendar" ***!
  \*************************************/
/***/ (function(module) {

"use strict";
module.exports = require("react-big-calendar");;

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ (function(module) {

"use strict";
module.exports = require("react/jsx-dev-runtime");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = __webpack_require__.X(0, ["vendors-node_modules_date-fns_esm_format_index_js-node_modules_date-fns_esm_getDay_index_js-n-cba2d1"], function() { return __webpack_exec__("./pages/calendar.js"); });
module.exports = __webpack_exports__;

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jb2FjaC16b25lLWZyb250ZW5kLy4vY29tcG9uZW50cy9DYWxlbmRhci5qcyIsIndlYnBhY2s6Ly9jb2FjaC16b25lLWZyb250ZW5kLy4vY29tcG9uZW50cy9FdmVudHMuanMiLCJ3ZWJwYWNrOi8vY29hY2gtem9uZS1mcm9udGVuZC8uL2NvbmZpZy5qcyIsIndlYnBhY2s6Ly9jb2FjaC16b25lLWZyb250ZW5kLy4vcGFnZXMvY2FsZW5kYXIuanMiLCJ3ZWJwYWNrOi8vY29hY2gtem9uZS1mcm9udGVuZC9leHRlcm5hbCBcIkBhcG9sbG8vY2xpZW50XCIiLCJ3ZWJwYWNrOi8vY29hY2gtem9uZS1mcm9udGVuZC9leHRlcm5hbCBcImdyYXBocWxcIiIsIndlYnBhY2s6Ly9jb2FjaC16b25lLWZyb250ZW5kL2V4dGVybmFsIFwiZ3JhcGhxbC10YWdcIiIsIndlYnBhY2s6Ly9jb2FjaC16b25lLWZyb250ZW5kL2V4dGVybmFsIFwicmVhY3RcIiIsIndlYnBhY2s6Ly9jb2FjaC16b25lLWZyb250ZW5kL2V4dGVybmFsIFwicmVhY3QtYmlnLWNhbGVuZGFyXCIiLCJ3ZWJwYWNrOi8vY29hY2gtem9uZS1mcm9udGVuZC9leHRlcm5hbCBcInJlYWN0L2pzeC1kZXYtcnVudGltZVwiIl0sIm5hbWVzIjpbIkNSRUFURV9FVkVOVF9NVVRBVElPTiIsImdxbCIsIkFMTF9FVkVOVFNfUVVFUlkiLCJsb2NhbGVzIiwiZW5VUyIsImxvY2FsaXplciIsImRhdGVGbnNMb2NhbGl6ZXIiLCJmb3JtYXQiLCJwYXJzZSIsInN0YXJ0T2ZXZWVrIiwiZ2V0RGF5IiwiQ2FsZW5kYXJQYWdlIiwiZGF0YSIsInVzZVF1ZXJ5IiwiY3JlYXRlRXZlbnQiLCJ1c2VNdXRhdGlvbiIsImV2ZW50IiwiY29uc29sZSIsImxvZyIsIm15RXZlbnRzMiIsInNldEV2ZW50cyIsInVzZVN0YXRlIiwiaGFuZGxlU2VsZWN0U2xvdCIsInVzZUNhbGxiYWNrIiwic3RhcnQiLCJlbmQiLCJ0aXRsZSIsIndpbmRvdyIsInByb21wdCIsInZhcmlhYmxlcyIsInN0YXJ0ZGF0ZSIsImVuZGRhdGUiLCJhbGxFdmVudHNMaXN0SXRlbXMiLCJoYW5kbGVTZWxlY3RFdmVudCIsImFsZXJ0IiwiaGVpZ2h0IiwiZW5kcG9pbnQiLCJwcm9kRW5kcG9pbnQiLCJwZXJQYWdlIiwiY2FsZW5kYXJQYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBLE1BQU1BLHFCQUFxQixHQUFHQyxvREFBSTtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQW5CQTtBQXFCTyxNQUFNQyxnQkFBZ0IsR0FBR0Qsb0RBQUk7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FWTztBQWFQLE1BQU1FLE9BQU8sR0FBRztBQUNkLFdBQVNDLDBEQUFJQTtBQURDLENBQWhCO0FBSUEsTUFBTUMsU0FBUyxHQUFHQyxvRUFBZ0IsQ0FBQztBQUNqQ0MsUUFEaUM7QUFFakNDLE9BRmlDO0FBR2pDQyxhQUhpQztBQUlqQ0MsUUFKaUM7QUFLakNQO0FBTGlDLENBQUQsQ0FBbEM7QUFTZSxTQUFTUSxZQUFULEdBQXdCO0FBQ3JDLFFBQU07QUFBRUM7QUFBRixNQUFXQyx3REFBUSxDQUFDWCxnQkFBRCxDQUF6QjtBQUNBLFFBQU0sQ0FBRVksV0FBRixJQUFrQkMsMkRBQVcsQ0FBQ2YscUJBQUQsQ0FBbkM7QUFFQSxRQUFNZ0IsS0FBSyxHQUFHSixJQUFkO0FBQ0FLLFNBQU8sQ0FBQ0MsR0FBUixDQUFZRixLQUFaO0FBRUEsUUFBTTtBQUFBLE9BQUNHLFNBQUQ7QUFBQSxPQUFZQztBQUFaLE1BQXlCQywrQ0FBUSxDQUFDVCxJQUFELENBQXZDO0FBQ0FLLFNBQU8sQ0FBQ0MsR0FBUixDQUFZQyxTQUFaLEVBUnFDLENBVXJDOztBQUNBLFFBQU1HLGdCQUFnQixHQUFHQyxrREFBVyxDQUNsQyxDQUFDO0FBQUVDLFNBQUY7QUFBU0M7QUFBVCxHQUFELEtBQW9CO0FBQ2xCLFVBQU1DLEtBQUssR0FBR0MsTUFBTSxDQUFDQyxNQUFQLENBQWMsdUNBQWQsQ0FBZDs7QUFDQSxRQUFJRixLQUFKLEVBQVc7QUFFVFosaUJBQVcsQ0FBQztBQUFFZSxpQkFBUyxFQUFFO0FBQ3ZCQyxtQkFBUyxFQUFFTixLQURZO0FBRXZCTyxpQkFBTyxFQUFFTixHQUZjO0FBR3ZCQyxlQUFLLEVBQUVBO0FBSGdCO0FBQWIsT0FBRCxDQUFYLENBRlMsQ0FRVDs7QUFDQSxVQUFHLE9BQU9QLFNBQVAsS0FBcUIsV0FBeEIsRUFBb0M7QUFDbENDLGlCQUFTLENBQUMsQ0FBQyxHQUFHRCxTQUFTLENBQUNhLGtCQUFkLEVBQWtDO0FBQUVSLGVBQUY7QUFBU0MsYUFBVDtBQUFjQztBQUFkLFNBQWxDLENBQUQsQ0FBVDtBQUNEO0FBQ0Y7QUFDRixHQWhCaUMsRUFpQmxDLENBQUNaLFdBQUQsQ0FqQmtDLENBQXBDLENBWHFDLENBOEJ0Qzs7QUFDQyxRQUFNbUIsaUJBQWlCLEdBQUdWLGtEQUFXLENBQ2xDUCxLQUFELElBQVdXLE1BQU0sQ0FBQ08sS0FBUCxDQUFhbEIsS0FBSyxDQUFDVSxLQUFuQixDQUR3QixFQUVuQyxFQUZtQyxDQUFyQztBQU1BLHNCQUVFO0FBQUEsMkJBQ0UsOERBQUMsd0RBQUQ7QUFDRSxlQUFTLEVBQUVyQixTQURiO0FBRUUsWUFBTSxFQUFFYyxTQUZWO0FBR0UsbUJBQWEsRUFBQyxPQUhoQjtBQUlFLGlCQUFXLEVBQUMsS0FKZDtBQUtFLFdBQUssRUFBRTtBQUFFZ0IsY0FBTSxFQUFFO0FBQVYsT0FMVDtBQU1FLG9CQUFjLE1BTmhCO0FBT0UsV0FBSyxFQUFFLENBQUMsT0FBRCxDQVBUO0FBUUUsbUJBQWEsRUFBRUYsaUJBUmpCO0FBU0Usa0JBQVksRUFBRVgsZ0JBVGhCO0FBVUUsZ0JBQVU7QUFWWjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREY7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQUZGO0FBaUJELEM7Ozs7Ozs7Ozs7OztBQ3BIRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0EsK0RBQWMsQ0FDZCxFQURjLENBR1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWJZLENBQWQsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNWQTtBQUNPLE1BQU1jLFFBQVEsR0FBSSxtQ0FBbEI7QUFDQSxNQUFNQyxZQUFZLEdBQUksMkJBQXRCO0FBQ0EsTUFBTUMsT0FBTyxHQUFHLENBQWhCLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSFA7QUFFZSxTQUFTQyxZQUFULEdBQXdCO0FBQ25DLHNCQUNJO0FBQUEsMkJBQ0ksOERBQUMseURBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURKO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFESjtBQUtILEM7Ozs7Ozs7Ozs7O0FDUkQsNEM7Ozs7Ozs7Ozs7O0FDQUEscUM7Ozs7Ozs7Ozs7O0FDQUEseUM7Ozs7Ozs7Ozs7O0FDQUEsbUM7Ozs7Ozs7Ozs7O0FDQUEsZ0Q7Ozs7Ozs7Ozs7O0FDQUEsbUQiLCJmaWxlIjoicGFnZXMvY2FsZW5kYXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUNhbGxiYWNrIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBDYWxlbmRhciwgZGF0ZUZuc0xvY2FsaXplciB9IGZyb20gJ3JlYWN0LWJpZy1jYWxlbmRhcic7XHJcbmltcG9ydCBmb3JtYXQgZnJvbSAnZGF0ZS1mbnMvZm9ybWF0JztcclxuaW1wb3J0IHBhcnNlIGZyb20gJ2RhdGUtZm5zL3BhcnNlJztcclxuaW1wb3J0IHN0YXJ0T2ZXZWVrIGZyb20gJ2RhdGUtZm5zL3N0YXJ0T2ZXZWVrJztcclxuaW1wb3J0IGdldERheSBmcm9tICdkYXRlLWZucy9nZXREYXknO1xyXG5pbXBvcnQgZW5VUyBmcm9tICdkYXRlLWZucy9sb2NhbGUvZW4tVVMnO1xyXG5pbXBvcnQgZXZlbnRzIGZyb20gJy4vRXZlbnRzJ1xyXG5pbXBvcnQgZ3FsIGZyb20gJ2dyYXBocWwtdGFnJztcclxuaW1wb3J0IHsgdXNlUXVlcnkgfSBmcm9tICdAYXBvbGxvL2NsaWVudCc7XHJcbmltcG9ydCB7IHBlclBhZ2UgfSBmcm9tICcuLi9jb25maWcnO1xyXG5pbXBvcnQge3VzZU11dGF0aW9ufSBmcm9tICdAYXBvbGxvL2NsaWVudCc7XHJcbmltcG9ydCB7IFVuaXF1ZUlucHV0RmllbGROYW1lc1J1bGUgfSBmcm9tICdncmFwaHFsJztcclxuXHJcblxyXG5jb25zdCBDUkVBVEVfRVZFTlRfTVVUQVRJT04gPSBncWxgXHJcbiAgbXV0YXRpb24gQ1JFQVRFX0VWRU5UX01VVEFUSU9OIChcclxuICAgICR0aXRsZTogU3RyaW5nIVxyXG4gICAgJHN0YXJ0ZGF0ZTogU3RyaW5nXHJcbiAgICAkZW5kZGF0ZTogU3RyaW5nXHJcbiAgKSB7XHJcbiAgICBjcmVhdGVFdmVudChcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIHRpdGxlOiAkdGl0bGVcclxuICAgICAgICBzdGFydGRhdGU6ICRzdGFydGRhdGVcclxuICAgICAgICBlbmRkYXRlOiAkZW5kZGF0ZVxyXG4gICAgICB9XHJcbiAgICApIHtcclxuICAgICAgaWRcclxuICAgICAgdGl0bGVcclxuICAgICAgc3RhcmRhdGVcclxuICAgICAgZW5kZGF0ZVxyXG4gICAgfVxyXG4gIH1cclxuYDtcclxuXHJcbmV4cG9ydCBjb25zdCBBTExfRVZFTlRTX1FVRVJZID0gZ3FsYFxyXG4gIHF1ZXJ5IEFMTF9FVkVOVFNfUVVFUlkge1xyXG4gICAgYWxsRXZlbnRzTGlzdEl0ZW1zIHtcclxuICAgICAgaWRcclxuICAgICAgdGl0bGVcclxuICAgICAgc3RhcnRkYXRlXHJcbiAgICAgIGVuZGRhdGVcclxuXHJcbiAgICB9XHJcbiAgfVxyXG5gXHJcblxyXG5cclxuY29uc3QgbG9jYWxlcyA9IHtcclxuICAnZW4tVVMnOiBlblVTLFxyXG59O1xyXG5cclxuY29uc3QgbG9jYWxpemVyID0gZGF0ZUZuc0xvY2FsaXplcih7XHJcbiAgZm9ybWF0LFxyXG4gIHBhcnNlLFxyXG4gIHN0YXJ0T2ZXZWVrLFxyXG4gIGdldERheSxcclxuICBsb2NhbGVzLFxyXG59KTtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDYWxlbmRhclBhZ2UoKSB7XHJcbiAgY29uc3QgeyBkYXRhIH0gPSB1c2VRdWVyeShBTExfRVZFTlRTX1FVRVJZKTtcclxuICBjb25zdCBbIGNyZWF0ZUV2ZW50IF0gPSB1c2VNdXRhdGlvbihDUkVBVEVfRVZFTlRfTVVUQVRJT04pXHJcbiAgXHJcbiAgY29uc3QgZXZlbnQgPSBkYXRhIFxyXG4gIGNvbnNvbGUubG9nKGV2ZW50KVxyXG5cclxuICBjb25zdCBbbXlFdmVudHMyLCBzZXRFdmVudHNdID0gdXNlU3RhdGUoZGF0YSlcclxuICBjb25zb2xlLmxvZyhteUV2ZW50czIpO1xyXG5cclxuICAvLyBDcmVhdGUgZXZlbnRcclxuICBjb25zdCBoYW5kbGVTZWxlY3RTbG90ID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoeyBzdGFydCwgZW5kIH0pID0+IHtcclxuICAgICAgY29uc3QgdGl0bGUgPSB3aW5kb3cucHJvbXB0KCdOZXcgRXZlbnQgbmFtZSwgZW50ZXIgaG91cnMgaWYgbmVlZGVkJylcclxuICAgICAgaWYgKHRpdGxlKSB7XHJcblxyXG4gICAgICAgIGNyZWF0ZUV2ZW50KHsgdmFyaWFibGVzOiB7IFxyXG4gICAgICAgICAgc3RhcnRkYXRlOiBzdGFydCxcclxuICAgICAgICAgIGVuZGRhdGU6IGVuZCxcclxuICAgICAgICAgIHRpdGxlOiB0aXRsZVxyXG4gICAgICAgIH0gfSlcclxuXHJcbiAgICAgICAgLy90YWthIHN1Z2VzdGlhIC0gdG8gbW/FvGUgemFkemlhxYJhxIcgbmEgb2TFm3dpZcW8YW5pdSB6bWllbm5laiBzdGFudSwgemFiZXpwaWVjemFtIGlmZW0gYm8gdSBtbmllIHogamFraWVnb8WbIHBvd29kdSBsaXN0YSB3IG15RXZlbnRzIGp1xbwgendyYWNhIG5hIHN0YXJjaWUgdW5kZWZpbmVkLCBhbGUgbW/FvGUgcHJ6ZXogdG8sIMW8ZSBqZXN0IHBvIHByb3N0dSBwdXN0YVxyXG4gICAgICAgIGlmKHR5cGVvZiBteUV2ZW50czIgIT09ICd1bmRlZmluZWQnKXtcclxuICAgICAgICAgIHNldEV2ZW50cyhbLi4ubXlFdmVudHMyLmFsbEV2ZW50c0xpc3RJdGVtcywgeyBzdGFydCwgZW5kLCB0aXRsZSB9XSlcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBbY3JlYXRlRXZlbnRdXHJcbiAgKVxyXG4gLy8gU2hvdyBldmVudCBcclxuICBjb25zdCBoYW5kbGVTZWxlY3RFdmVudCA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKGV2ZW50KSA9PiB3aW5kb3cuYWxlcnQoZXZlbnQudGl0bGUpLFxyXG4gICAgW11cclxuICApXHJcblxyXG5cclxuICByZXR1cm4gKFxyXG5cclxuICAgIDxkaXY+XHJcbiAgICAgIDxDYWxlbmRhclxyXG4gICAgICAgIGxvY2FsaXplcj17bG9jYWxpemVyfVxyXG4gICAgICAgIGV2ZW50cz17bXlFdmVudHMyfVxyXG4gICAgICAgIHN0YXJ0QWNjZXNzb3I9XCJzdGFydFwiXHJcbiAgICAgICAgZW5kQWNjZXNzb3I9XCJlbmRcIlxyXG4gICAgICAgIHN0eWxlPXt7IGhlaWdodDogNTAwIH19XHJcbiAgICAgICAgYWxsRGF5QWNjZXNzb3JcclxuICAgICAgICB2aWV3cz17Wydtb250aCddfVxyXG4gICAgICAgIG9uU2VsZWN0RXZlbnQ9e2hhbmRsZVNlbGVjdEV2ZW50fVxyXG4gICAgICAgIG9uU2VsZWN0U2xvdD17aGFuZGxlU2VsZWN0U2xvdH1cclxuICAgICAgICBzZWxlY3RhYmxlXHJcbiAgICAgIC8+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59IiwiLy8gZXhwb3J0IGRlZmF1bHQgW1xyXG4vLyAgICAge1xyXG4vLyAgICAgICBpZDogMCxcclxuLy8gICAgICAgdGl0bGU6ICdUcmFpbmluZyAxOS0yMicsXHJcbi8vICAgICAgIHN0YXJ0OiBuZXcgRGF0ZSgpLFxyXG4vLyAgICAgICBlbmQ6IG5ldyBEYXRlKCksXHJcbi8vICAgICB9LFxyXG4vLyAgIF07XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHRbXHJcbnt9XHJcblxyXG4gIC8vIGlmKGxvYWRpbmcpIHJldHVybiA8cD5Mb2FkaW5nLi4uPC9wPjtcclxuICAvLyBpZiAoZXJyb3IpIHJldHVybiA8cD5FcnJvcjoge2Vycm9yLm1lc3NhZ2V9PC9wPjtcclxuICAvLyByZXR1cm4gKFxyXG4gIC8vICAgICA8ZGl2PlxyXG4gIC8vICAgICAgICAgPEV4ZXJjaXNlc0xpc3RTdHlsZXM+XHJcbiAgLy8gICAgICAgICAgICAge2RhdGEuYWxsRXhlcmNpc2VzLm1hcChleGVyY2lzZSA9PiAoXHJcbiAgLy8gICAgICAgICAgICAgICAgIDxFeGVyY2lzZSBrZXk9e2V4ZXJjaXNlLmlkfSBleGVyY2lzZT17ZXhlcmNpc2V9IC8+XHJcbiAgLy8gICAgICAgICAgICAgKSl9XHJcbiAgLy8gICAgICAgICA8L0V4ZXJjaXNlc0xpc3RTdHlsZXM+XHJcbiAgLy8gICAgIDwvZGl2PlxyXG4gIC8vICk7XHJcbl0iLCIvLyBUaGlzIGlzIGNsaWVudCBzaWRlIGNvbmZpZyBvbmx5IC0gZG9uJ3QgcHV0IGFueXRoaW5nIGluIGhlcmUgdGhhdCBzaG91bGRuJ3QgYmUgcHVibGljIVxuZXhwb3J0IGNvbnN0IGVuZHBvaW50ID0gYGh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9hcGkvZ3JhcGhxbGA7XG5leHBvcnQgY29uc3QgcHJvZEVuZHBvaW50ID0gYGZpbGwgbWUgaW4gd2hlbiB3ZSBkZXBsb3lgO1xuZXhwb3J0IGNvbnN0IHBlclBhZ2UgPSA0O1xuIiwiaW1wb3J0IENhbGVuZGFyUGFnZSBmcm9tICcuLi9jb21wb25lbnRzL0NhbGVuZGFyJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY2FsZW5kYXJQYWdlKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICA8Q2FsZW5kYXJQYWdlIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICApIFxyXG59IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQGFwb2xsby9jbGllbnRcIik7OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImdyYXBocWxcIik7OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImdyYXBocWwtdGFnXCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTs7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtYmlnLWNhbGVuZGFyXCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC9qc3gtZGV2LXJ1bnRpbWVcIik7OyJdLCJzb3VyY2VSb290IjoiIn0=
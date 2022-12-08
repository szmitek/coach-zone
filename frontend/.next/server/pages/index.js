(function() {
var exports = {};
exports.id = "pages/index";
exports.ids = ["pages/index"];
exports.modules = {

/***/ "./components/AddToTraining.js":
/*!*************************************!*\
  !*** ./components/AddToTraining.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ AddToTraining; }
/* harmony export */ });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @apollo/client */ "@apollo/client");
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_apollo_client__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! graphql-tag */ "graphql-tag");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _User__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./User */ "./components/User.js");

var _jsxFileName = "C:\\Users\\Kamil\\Desktop\\coach-zone\\frontend\\components\\AddToTraining.js";



const ADD_TO_TRAINING_MUTATION = (graphql_tag__WEBPACK_IMPORTED_MODULE_2___default())`
    mutation ADD_TO_TRAINING_MUTATION($id: ID!) {
        addToTraining(exerciseId: $id) {
            id
        }
    }
`;
function AddToTraining({
  id
}) {
  const [addToTraining, {
    loading
  }] = (0,_apollo_client__WEBPACK_IMPORTED_MODULE_1__.useMutation)(ADD_TO_TRAINING_MUTATION, {
    variables: {
      id
    },
    refetchQueries: [{
      query: _User__WEBPACK_IMPORTED_MODULE_3__.CURRENT_USER_QUERY
    }]
  });
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("button", {
    disabled: loading,
    type: "button",
    onClick: addToTraining,
    children: ["Add", loading && 'ing', " to training"]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 19,
    columnNumber: 9
  }, this);
}

/***/ }),

/***/ "./components/DeleteExercise.js":
/*!**************************************!*\
  !*** ./components/DeleteExercise.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ DeleteExercise; }
/* harmony export */ });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @apollo/client */ "@apollo/client");
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_apollo_client__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! graphql-tag */ "graphql-tag");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_2__);

var _jsxFileName = "C:\\Users\\Kamil\\Desktop\\coach-zone\\frontend\\components\\DeleteExercise.js";


const DELETE_EXERCISE_MUTATION = (graphql_tag__WEBPACK_IMPORTED_MODULE_2___default())`
    mutation DELETE_EXERCISE_MUTATION($id: ID!) {
        deleteExercise(id: $id) {
            id
            name
        }
    }
`; // function to reload the exercise object after a mutation is applied 

function update(cache, payload) {
  console.log(payload);
  console.log('running the update function after delete');
  cache.evict(cache.identify(payload.data.deleteExercise));
}

function DeleteExercise({
  id,
  children
}) {
  const [deleteExercise, {
    loading,
    error
  }] = (0,_apollo_client__WEBPACK_IMPORTED_MODULE_1__.useMutation)(DELETE_EXERCISE_MUTATION, {
    variables: {
      id
    },
    update: update
  });
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("button", {
    type: "button",
    disabled: loading,
    onClick: () => {
      if (confirm('Are you sure you want to delete this exercise')) {
        //go ahead and delete the exercise
        console.log('DELETE');
        deleteExercise().catch(err => alert(err.message));
      }
    },
    children: children
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 25,
    columnNumber: 12
  }, this);
}

/***/ }),

/***/ "./components/Exercise.js":
/*!********************************!*\
  !*** ./components/Exercise.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Exercise; }
/* harmony export */ });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _DeleteExercise__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DeleteExercise */ "./components/DeleteExercise.js");
/* harmony import */ var _styles_ItemStyles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./styles/ItemStyles */ "./components/styles/ItemStyles.js");
/* harmony import */ var _styles_Position__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./styles/Position */ "./components/styles/Position.js");
/* harmony import */ var _styles_Title__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./styles/Title */ "./components/styles/Title.js");
/* harmony import */ var _AddToTraining__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./AddToTraining */ "./components/AddToTraining.js");

var _jsxFileName = "C:\\Users\\Kamil\\Desktop\\coach-zone\\frontend\\components\\Exercise.js";






function Exercise({
  exercise
}) {
  var _exercise$photo, _exercise$photo$image;

  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_styles_ItemStyles__WEBPACK_IMPORTED_MODULE_3__.default, {
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("img", {
      src: exercise === null || exercise === void 0 ? void 0 : (_exercise$photo = exercise.photo) === null || _exercise$photo === void 0 ? void 0 : (_exercise$photo$image = _exercise$photo.image) === null || _exercise$photo$image === void 0 ? void 0 : _exercise$photo$image.publicUrlTransformed,
      alt: exercise.name
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 10,
      columnNumber: 17
    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_styles_Title__WEBPACK_IMPORTED_MODULE_5__.default, {
      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
        href: `/exercise/${exercise.id}`,
        children: exercise.name
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 12,
        columnNumber: 21
      }, this)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 11,
      columnNumber: 17
    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_styles_Position__WEBPACK_IMPORTED_MODULE_4__.default, {
      children: exercise.position
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 16,
      columnNumber: 17
    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
      children: exercise.description
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 17,
      columnNumber: 17
    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
      className: "buttonList",
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
        href: {
          pathname: 'update',
          query: {
            id: exercise.id
          }
        },
        children: "Edit \u270F\uFE0F"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 19,
        columnNumber: 21
      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_AddToTraining__WEBPACK_IMPORTED_MODULE_6__.default, {
        id: exercise.id
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 28,
        columnNumber: 21
      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_DeleteExercise__WEBPACK_IMPORTED_MODULE_2__.default, {
        id: exercise.id,
        children: "Delete"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 29,
        columnNumber: 21
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 18,
      columnNumber: 17
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 9,
    columnNumber: 12
  }, this);
}

/***/ }),

/***/ "./components/Exercises.js":
/*!*********************************!*\
  !*** ./components/Exercises.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ALL_EXERCISES_QUERY": function() { return /* binding */ ALL_EXERCISES_QUERY; },
/* harmony export */   "default": function() { return /* binding */ Exercises; }
/* harmony export */ });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @apollo/client */ "@apollo/client");
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_apollo_client__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! graphql-tag */ "graphql-tag");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../config */ "./config.js");
/* harmony import */ var _Exercise__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Exercise */ "./components/Exercise.js");

var _jsxFileName = "C:\\Users\\Kamil\\Desktop\\coach-zone\\frontend\\components\\Exercises.js";





const ALL_EXERCISES_QUERY = (graphql_tag__WEBPACK_IMPORTED_MODULE_2___default())`
    query ALL_EXERCISES_QUERY($skip: Int = 0, $first: Int) {
        allExercises(first: $first, skip: $skip) {
            id
            name
            description
            position
            photo {
                id
                image {
                    publicUrlTransformed
                }
            }
        }
    }
`;
const ExercisesListStyles = styled_components__WEBPACK_IMPORTED_MODULE_3___default().div.withConfig({
  displayName: "Exercises__ExercisesListStyles",
  componentId: "sc-1ytzne0-0"
})(["display:grid;grid-template-columns:1fr 1fr;grid-gap:60px;"]);
function Exercises({
  page
}) {
  const {
    data,
    error,
    loading
  } = (0,_apollo_client__WEBPACK_IMPORTED_MODULE_1__.useQuery)(ALL_EXERCISES_QUERY, {
    variables: {
      skip: page * _config__WEBPACK_IMPORTED_MODULE_4__.perPage - _config__WEBPACK_IMPORTED_MODULE_4__.perPage,
      first: _config__WEBPACK_IMPORTED_MODULE_4__.perPage
    }
  });
  if (loading) return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
    children: "Loading..."
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 38,
    columnNumber: 24
  }, this);
  if (error) return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
    children: ["Error: ", error.message]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 39,
    columnNumber: 23
  }, this);
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(ExercisesListStyles, {
      children: data.allExercises.map(exercise => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Exercise__WEBPACK_IMPORTED_MODULE_5__.default, {
        exercise: exercise
      }, exercise.id, false, {
        fileName: _jsxFileName,
        lineNumber: 44,
        columnNumber: 21
      }, this))
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 42,
      columnNumber: 13
    }, this)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 41,
    columnNumber: 9
  }, this);
}

/***/ }),

/***/ "./components/styles/ItemStyles.js":
/*!*****************************************!*\
  !*** ./components/styles/ItemStyles.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);

const Item = styled_components__WEBPACK_IMPORTED_MODULE_0___default().div.withConfig({
  displayName: "ItemStyles__Item",
  componentId: "sc-1mjy96m-0"
})(["background:white;border:1px solid var(--offWhite);box-shadow:var(--bs);position:relative;display:flex;flex-direction:column;img{width:100%;height:400px;object-fit:cover;}p{line-height:2;font-weight:300;flex-grow:1;padding:0 3rem;font-size:1.5rem;}.buttonList{display:grid;width:100%;border-top:1px solid var(--lightGray);grid-template-columns:repeat(auto-fit,minmax(100px,1fr));grid-gap:1px;background:var(--lightGray);& > *{background:white;border:0;font-size:1rem;padding:1rem;}}"]);
/* harmony default export */ __webpack_exports__["default"] = (Item);

/***/ }),

/***/ "./components/styles/Position.js":
/*!***************************************!*\
  !*** ./components/styles/Position.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);

const Position = styled_components__WEBPACK_IMPORTED_MODULE_0___default().span.withConfig({
  displayName: "Position",
  componentId: "sc-1whqc9z-0"
})(["background:var(--black);transform:rotate(3deg);color:white;font-weight:600;padding:5px;line-height:1;font-size:3rem;display:inline-block;position:absolute;top:-3px;right:-3px;"]);
/* harmony default export */ __webpack_exports__["default"] = (Position);

/***/ }),

/***/ "./components/styles/Title.js":
/*!************************************!*\
  !*** ./components/styles/Title.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);

const Title = styled_components__WEBPACK_IMPORTED_MODULE_0___default().h3.withConfig({
  displayName: "Title",
  componentId: "sc-1fbeo9z-0"
})(["margin:0 1rem;text-align:center;transform:skew(-5deg) rotate(-1deg);margin-top:-3rem;text-shadow:2px 2px 0 rgba(0,0,0,0.1);a{background:var(--black);display:inline;line-height:1.3;font-size:4rem;text-align:center;color:white;padding:0 1rem;}"]);
/* harmony default export */ __webpack_exports__["default"] = (Title);

/***/ }),

/***/ "./pages/exercises/index.js":
/*!**********************************!*\
  !*** ./pages/exercises/index.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ OrderPage; }
/* harmony export */ });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_dist_client_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/client/router */ "./node_modules/next/dist/client/router.js");
/* harmony import */ var _components_Exercises__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/Exercises */ "./components/Exercises.js");
/* harmony import */ var _components_Pagination__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/Pagination */ "./components/Pagination.js");

var _jsxFileName = "C:\\Users\\Kamil\\Desktop\\coach-zone\\frontend\\pages\\exercises\\index.js";



function OrderPage() {
  const {
    query
  } = (0,next_dist_client_router__WEBPACK_IMPORTED_MODULE_1__.useRouter)();
  const page = parseInt(query.page);
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Pagination__WEBPACK_IMPORTED_MODULE_3__.default, {
      page: page || 1
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 10,
      columnNumber: 13
    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Exercises__WEBPACK_IMPORTED_MODULE_2__.default, {
      page: page || 1
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 11,
      columnNumber: 13
    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Pagination__WEBPACK_IMPORTED_MODULE_3__.default, {
      page: page || 1
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 12,
      columnNumber: 13
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 9,
    columnNumber: 9
  }, this);
}

/***/ }),

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* reexport safe */ _exercises__WEBPACK_IMPORTED_MODULE_0__.default; }
/* harmony export */ });
/* harmony import */ var _exercises__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./exercises */ "./pages/exercises/index.js");


/***/ }),

/***/ "@apollo/client":
/*!*********************************!*\
  !*** external "@apollo/client" ***!
  \*********************************/
/***/ (function(module) {

"use strict";
module.exports = require("@apollo/client");;

/***/ }),

/***/ "graphql-tag":
/*!******************************!*\
  !*** external "graphql-tag" ***!
  \******************************/
/***/ (function(module) {

"use strict";
module.exports = require("graphql-tag");;

/***/ }),

/***/ "../next-server/lib/router-context":
/*!**************************************************************!*\
  !*** external "next/dist/next-server/lib/router-context.js" ***!
  \**************************************************************/
/***/ (function(module) {

"use strict";
module.exports = require("next/dist/next-server/lib/router-context.js");;

/***/ }),

/***/ "../next-server/lib/router/utils/get-asset-path-from-route":
/*!**************************************************************************************!*\
  !*** external "next/dist/next-server/lib/router/utils/get-asset-path-from-route.js" ***!
  \**************************************************************************************/
/***/ (function(module) {

"use strict";
module.exports = require("next/dist/next-server/lib/router/utils/get-asset-path-from-route.js");;

/***/ }),

/***/ "next/head":
/*!****************************!*\
  !*** external "next/head" ***!
  \****************************/
/***/ (function(module) {

"use strict";
module.exports = require("next/head");;

/***/ }),

/***/ "prop-types":
/*!*****************************!*\
  !*** external "prop-types" ***!
  \*****************************/
/***/ (function(module) {

"use strict";
module.exports = require("prop-types");;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ (function(module) {

"use strict";
module.exports = require("react");;

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ (function(module) {

"use strict";
module.exports = require("react/jsx-dev-runtime");;

/***/ }),

/***/ "styled-components":
/*!************************************!*\
  !*** external "styled-components" ***!
  \************************************/
/***/ (function(module) {

"use strict";
module.exports = require("styled-components");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = __webpack_require__.X(0, ["vendors-node_modules_next_link_js","components_Pagination_js-components_User_js"], function() { return __webpack_exec__("./pages/index.js"); });
module.exports = __webpack_exports__;

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jb2FjaC16b25lLWZyb250ZW5kLy4vY29tcG9uZW50cy9BZGRUb1RyYWluaW5nLmpzIiwid2VicGFjazovL2NvYWNoLXpvbmUtZnJvbnRlbmQvLi9jb21wb25lbnRzL0RlbGV0ZUV4ZXJjaXNlLmpzIiwid2VicGFjazovL2NvYWNoLXpvbmUtZnJvbnRlbmQvLi9jb21wb25lbnRzL0V4ZXJjaXNlLmpzIiwid2VicGFjazovL2NvYWNoLXpvbmUtZnJvbnRlbmQvLi9jb21wb25lbnRzL0V4ZXJjaXNlcy5qcyIsIndlYnBhY2s6Ly9jb2FjaC16b25lLWZyb250ZW5kLy4vY29tcG9uZW50cy9zdHlsZXMvSXRlbVN0eWxlcy5qcyIsIndlYnBhY2s6Ly9jb2FjaC16b25lLWZyb250ZW5kLy4vY29tcG9uZW50cy9zdHlsZXMvUG9zaXRpb24uanMiLCJ3ZWJwYWNrOi8vY29hY2gtem9uZS1mcm9udGVuZC8uL2NvbXBvbmVudHMvc3R5bGVzL1RpdGxlLmpzIiwid2VicGFjazovL2NvYWNoLXpvbmUtZnJvbnRlbmQvLi9wYWdlcy9leGVyY2lzZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY29hY2gtem9uZS1mcm9udGVuZC9leHRlcm5hbCBcIkBhcG9sbG8vY2xpZW50XCIiLCJ3ZWJwYWNrOi8vY29hY2gtem9uZS1mcm9udGVuZC9leHRlcm5hbCBcImdyYXBocWwtdGFnXCIiLCJ3ZWJwYWNrOi8vY29hY2gtem9uZS1mcm9udGVuZC9leHRlcm5hbCBcIm5leHQvZGlzdC9uZXh0LXNlcnZlci9saWIvcm91dGVyLWNvbnRleHQuanNcIiIsIndlYnBhY2s6Ly9jb2FjaC16b25lLWZyb250ZW5kL2V4dGVybmFsIFwibmV4dC9kaXN0L25leHQtc2VydmVyL2xpYi9yb3V0ZXIvdXRpbHMvZ2V0LWFzc2V0LXBhdGgtZnJvbS1yb3V0ZS5qc1wiIiwid2VicGFjazovL2NvYWNoLXpvbmUtZnJvbnRlbmQvZXh0ZXJuYWwgXCJuZXh0L2hlYWRcIiIsIndlYnBhY2s6Ly9jb2FjaC16b25lLWZyb250ZW5kL2V4dGVybmFsIFwicHJvcC10eXBlc1wiIiwid2VicGFjazovL2NvYWNoLXpvbmUtZnJvbnRlbmQvZXh0ZXJuYWwgXCJyZWFjdFwiIiwid2VicGFjazovL2NvYWNoLXpvbmUtZnJvbnRlbmQvZXh0ZXJuYWwgXCJyZWFjdC9qc3gtZGV2LXJ1bnRpbWVcIiIsIndlYnBhY2s6Ly9jb2FjaC16b25lLWZyb250ZW5kL2V4dGVybmFsIFwic3R5bGVkLWNvbXBvbmVudHNcIiJdLCJuYW1lcyI6WyJBRERfVE9fVFJBSU5JTkdfTVVUQVRJT04iLCJncWwiLCJBZGRUb1RyYWluaW5nIiwiaWQiLCJhZGRUb1RyYWluaW5nIiwibG9hZGluZyIsInVzZU11dGF0aW9uIiwidmFyaWFibGVzIiwicmVmZXRjaFF1ZXJpZXMiLCJxdWVyeSIsIkNVUlJFTlRfVVNFUl9RVUVSWSIsIkRFTEVURV9FWEVSQ0lTRV9NVVRBVElPTiIsInVwZGF0ZSIsImNhY2hlIiwicGF5bG9hZCIsImNvbnNvbGUiLCJsb2ciLCJldmljdCIsImlkZW50aWZ5IiwiZGF0YSIsImRlbGV0ZUV4ZXJjaXNlIiwiRGVsZXRlRXhlcmNpc2UiLCJjaGlsZHJlbiIsImVycm9yIiwiY29uZmlybSIsImNhdGNoIiwiZXJyIiwiYWxlcnQiLCJtZXNzYWdlIiwiRXhlcmNpc2UiLCJleGVyY2lzZSIsInBob3RvIiwiaW1hZ2UiLCJwdWJsaWNVcmxUcmFuc2Zvcm1lZCIsIm5hbWUiLCJwb3NpdGlvbiIsImRlc2NyaXB0aW9uIiwicGF0aG5hbWUiLCJBTExfRVhFUkNJU0VTX1FVRVJZIiwiRXhlcmNpc2VzTGlzdFN0eWxlcyIsInN0eWxlZCIsIkV4ZXJjaXNlcyIsInBhZ2UiLCJ1c2VRdWVyeSIsInNraXAiLCJwZXJQYWdlIiwiZmlyc3QiLCJhbGxFeGVyY2lzZXMiLCJtYXAiLCJJdGVtIiwiUG9zaXRpb24iLCJUaXRsZSIsIk9yZGVyUGFnZSIsInVzZVJvdXRlciIsInBhcnNlSW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7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O0FBQVksVUFBSSxFQUFFQSxJQUFJLElBQUk7QUFBMUI7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQURKLGVBRUksOERBQUMsMERBQUQ7QUFBVyxVQUFJLEVBQUVBLElBQUksSUFBSTtBQUF6QjtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBRkosZUFHSSw4REFBQywyREFBRDtBQUFZLFVBQUksRUFBRUEsSUFBSSxJQUFJO0FBQTFCO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFISjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFESjtBQU9ILEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2RELDRDOzs7Ozs7Ozs7OztBQ0FBLHlDOzs7Ozs7Ozs7OztBQ0FBLHlFOzs7Ozs7Ozs7OztBQ0FBLGlHOzs7Ozs7Ozs7OztBQ0FBLHVDOzs7Ozs7Ozs7OztBQ0FBLHdDOzs7Ozs7Ozs7OztBQ0FBLG1DOzs7Ozs7Ozs7OztBQ0FBLG1EOzs7Ozs7Ozs7OztBQ0FBLCtDIiwiZmlsZSI6InBhZ2VzL2luZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlTXV0YXRpb24gfSBmcm9tICdAYXBvbGxvL2NsaWVudCc7XHJcbmltcG9ydCBncWwgZnJvbSAnZ3JhcGhxbC10YWcnO1xyXG5pbXBvcnQgeyBDVVJSRU5UX1VTRVJfUVVFUlkgfSBmcm9tICcuL1VzZXInO1xyXG5cclxuY29uc3QgQUREX1RPX1RSQUlOSU5HX01VVEFUSU9OID0gZ3FsYFxyXG4gICAgbXV0YXRpb24gQUREX1RPX1RSQUlOSU5HX01VVEFUSU9OKCRpZDogSUQhKSB7XHJcbiAgICAgICAgYWRkVG9UcmFpbmluZyhleGVyY2lzZUlkOiAkaWQpIHtcclxuICAgICAgICAgICAgaWRcclxuICAgICAgICB9XHJcbiAgICB9XHJcbmBcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEFkZFRvVHJhaW5pbmcoeyBpZCB9KSB7XHJcbiAgICBjb25zdCBbYWRkVG9UcmFpbmluZywgeyBsb2FkaW5nIH1dID0gdXNlTXV0YXRpb24oQUREX1RPX1RSQUlOSU5HX01VVEFUSU9OLCB7XHJcbiAgICAgICAgdmFyaWFibGVzOiB7IGlkIH0sXHJcbiAgICAgICAgcmVmZXRjaFF1ZXJpZXM6IFt7IHF1ZXJ5OiBDVVJSRU5UX1VTRVJfUVVFUlkgfV0sXHJcbiAgICB9KTtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGJ1dHRvbiBkaXNhYmxlZD17bG9hZGluZ30gdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9e2FkZFRvVHJhaW5pbmd9PlxyXG4gICAgICAgICAgICBBZGR7IGxvYWRpbmcgJiYgJ2luZycgfSB0byB0cmFpbmluZ1xyXG4gICAgICAgIDwvYnV0dG9uPlxyXG4gICAgKVxyXG59IiwiaW1wb3J0IHsgdXNlTXV0YXRpb24gfSBmcm9tICdAYXBvbGxvL2NsaWVudCc7XHJcbmltcG9ydCBncWwgZnJvbSAnZ3JhcGhxbC10YWcnO1xyXG5cclxuXHJcbmNvbnN0IERFTEVURV9FWEVSQ0lTRV9NVVRBVElPTiA9IGdxbGBcclxuICAgIG11dGF0aW9uIERFTEVURV9FWEVSQ0lTRV9NVVRBVElPTigkaWQ6IElEISkge1xyXG4gICAgICAgIGRlbGV0ZUV4ZXJjaXNlKGlkOiAkaWQpIHtcclxuICAgICAgICAgICAgaWRcclxuICAgICAgICAgICAgbmFtZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuYFxyXG4vLyBmdW5jdGlvbiB0byByZWxvYWQgdGhlIGV4ZXJjaXNlIG9iamVjdCBhZnRlciBhIG11dGF0aW9uIGlzIGFwcGxpZWQgXHJcbmZ1bmN0aW9uIHVwZGF0ZShjYWNoZSwgcGF5bG9hZCkge1xyXG4gICAgY29uc29sZS5sb2cocGF5bG9hZCk7XHJcbiAgICBjb25zb2xlLmxvZygncnVubmluZyB0aGUgdXBkYXRlIGZ1bmN0aW9uIGFmdGVyIGRlbGV0ZScpO1xyXG4gICAgY2FjaGUuZXZpY3QoY2FjaGUuaWRlbnRpZnkocGF5bG9hZC5kYXRhLmRlbGV0ZUV4ZXJjaXNlKSlcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRGVsZXRlRXhlcmNpc2UoeyBpZCwgY2hpbGRyZW4gfSkge1xyXG4gICAgY29uc3QgW2RlbGV0ZUV4ZXJjaXNlLCB7bG9hZGluZywgZXJyb3J9XSA9IHVzZU11dGF0aW9uKERFTEVURV9FWEVSQ0lTRV9NVVRBVElPTiwge1xyXG4gICAgICAgIHZhcmlhYmxlczoge2lkfSxcclxuICAgICAgICB1cGRhdGU6IHVwZGF0ZVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgZGlzYWJsZWQ9e2xvYWRpbmd9IG9uQ2xpY2s9eygpID0+IHtcclxuICAgICAgICBpZiAoY29uZmlybSgnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIGV4ZXJjaXNlJykpe1xyXG4gICAgICAgICAgICAvL2dvIGFoZWFkIGFuZCBkZWxldGUgdGhlIGV4ZXJjaXNlXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdERUxFVEUnKVxyXG4gICAgICAgICAgICBkZWxldGVFeGVyY2lzZSgpLmNhdGNoKGVyciA9PiBhbGVydChlcnIubWVzc2FnZSkpO1xyXG4gICAgICAgIH1cclxuICAgIH19PlxyXG4gICAgICAgICAgICB7Y2hpbGRyZW59XHJcbiAgICAgICAgPC9idXR0b24+XHJcbn0iLCJpbXBvcnQgTGluayBmcm9tICduZXh0L2xpbmsnOyBcclxuaW1wb3J0IERlbGV0ZUV4ZXJjaXNlIGZyb20gJy4vRGVsZXRlRXhlcmNpc2UnO1xyXG5pbXBvcnQgSXRlbVN0eWxlcyBmcm9tICcuL3N0eWxlcy9JdGVtU3R5bGVzJztcclxuaW1wb3J0IFBvc2l0aW9uIGZyb20gJy4vc3R5bGVzL1Bvc2l0aW9uJztcclxuaW1wb3J0IFRpdGxlIGZyb20gJy4vc3R5bGVzL1RpdGxlJ1xyXG5pbXBvcnQgQWRkVG9UcmFpbmluZyBmcm9tICcuL0FkZFRvVHJhaW5pbmcnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRXhlcmNpc2Uoe2V4ZXJjaXNlfSkge1xyXG4gICAgcmV0dXJuIDxJdGVtU3R5bGVzPlxyXG4gICAgICAgICAgICAgICAgPGltZyBzcmM9e2V4ZXJjaXNlPy5waG90bz8uaW1hZ2U/LnB1YmxpY1VybFRyYW5zZm9ybWVkfSBhbHQ9e2V4ZXJjaXNlLm5hbWV9IC8+XHJcbiAgICAgICAgICAgICAgICA8VGl0bGU+XHJcbiAgICAgICAgICAgICAgICAgICAgPExpbmsgaHJlZj17YC9leGVyY2lzZS8ke2V4ZXJjaXNlLmlkfWB9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7ZXhlcmNpc2UubmFtZX1cclxuICAgICAgICAgICAgICAgICAgICA8L0xpbms+XHJcbiAgICAgICAgICAgICAgICA8L1RpdGxlPlxyXG4gICAgICAgICAgICAgICAgPFBvc2l0aW9uPntleGVyY2lzZS5wb3NpdGlvbn08L1Bvc2l0aW9uPlxyXG4gICAgICAgICAgICAgICAgPHA+e2V4ZXJjaXNlLmRlc2NyaXB0aW9ufTwvcD5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnV0dG9uTGlzdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxMaW5rIGhyZWY9e3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aG5hbWU6ICd1cGRhdGUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVyeToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGV4ZXJjaXNlLmlkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgRWRpdCDinI/vuI9cclxuICAgICAgICAgICAgICAgICAgICA8L0xpbms+XHJcbiAgICAgICAgICAgICAgICAgICAgPEFkZFRvVHJhaW5pbmcgaWQ9e2V4ZXJjaXNlLmlkfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxEZWxldGVFeGVyY2lzZSBpZD17ZXhlcmNpc2UuaWR9PkRlbGV0ZTwvRGVsZXRlRXhlcmNpc2U+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9JdGVtU3R5bGVzPjtcclxufSIsImltcG9ydCB7IHVzZVF1ZXJ5IH0gZnJvbSAnQGFwb2xsby9jbGllbnQnO1xyXG5pbXBvcnQgZ3FsIGZyb20gJ2dyYXBocWwtdGFnJztcclxuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XHJcbmltcG9ydCB7IHBlclBhZ2UgfSBmcm9tICcuLi9jb25maWcnO1xyXG5pbXBvcnQgRXhlcmNpc2UgZnJvbSAnLi9FeGVyY2lzZSc7XHJcblxyXG5leHBvcnQgY29uc3QgQUxMX0VYRVJDSVNFU19RVUVSWSA9IGdxbGBcclxuICAgIHF1ZXJ5IEFMTF9FWEVSQ0lTRVNfUVVFUlkoJHNraXA6IEludCA9IDAsICRmaXJzdDogSW50KSB7XHJcbiAgICAgICAgYWxsRXhlcmNpc2VzKGZpcnN0OiAkZmlyc3QsIHNraXA6ICRza2lwKSB7XHJcbiAgICAgICAgICAgIGlkXHJcbiAgICAgICAgICAgIG5hbWVcclxuICAgICAgICAgICAgZGVzY3JpcHRpb25cclxuICAgICAgICAgICAgcG9zaXRpb25cclxuICAgICAgICAgICAgcGhvdG8ge1xyXG4gICAgICAgICAgICAgICAgaWRcclxuICAgICAgICAgICAgICAgIGltYWdlIHtcclxuICAgICAgICAgICAgICAgICAgICBwdWJsaWNVcmxUcmFuc2Zvcm1lZFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5gO1xyXG5cclxuY29uc3QgRXhlcmNpc2VzTGlzdFN0eWxlcyA9IHN0eWxlZC5kaXZgXHJcbiAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyO1xyXG4gICAgZ3JpZC1nYXA6IDYwcHg7XHJcbmA7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRXhlcmNpc2VzKHtwYWdlfSkgeyBcclxuICAgIGNvbnN0IHtkYXRhLCBlcnJvciwgbG9hZGluZyB9ID0gdXNlUXVlcnkoQUxMX0VYRVJDSVNFU19RVUVSWSwge1xyXG4gICAgICAgIHZhcmlhYmxlczoge1xyXG4gICAgICAgICAgICBza2lwOiBwYWdlICogcGVyUGFnZSAtIHBlclBhZ2UsXHJcbiAgICAgICAgICAgIGZpcnN0OiBwZXJQYWdlLFxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgaWYobG9hZGluZykgcmV0dXJuIDxwPkxvYWRpbmcuLi48L3A+O1xyXG4gICAgaWYgKGVycm9yKSByZXR1cm4gPHA+RXJyb3I6IHtlcnJvci5tZXNzYWdlfTwvcD47XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgIDxFeGVyY2lzZXNMaXN0U3R5bGVzPlxyXG4gICAgICAgICAgICAgICAge2RhdGEuYWxsRXhlcmNpc2VzLm1hcChleGVyY2lzZSA9PiAoXHJcbiAgICAgICAgICAgICAgICAgICAgPEV4ZXJjaXNlIGtleT17ZXhlcmNpc2UuaWR9IGV4ZXJjaXNlPXtleGVyY2lzZX0gLz5cclxuICAgICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICA8L0V4ZXJjaXNlc0xpc3RTdHlsZXM+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG59IiwiaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5cbmNvbnN0IEl0ZW0gPSBzdHlsZWQuZGl2YFxuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tb2ZmV2hpdGUpO1xuICBib3gtc2hhZG93OiB2YXIoLS1icyk7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgaW1nIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDQwMHB4O1xuICAgIG9iamVjdC1maXQ6IGNvdmVyO1xuICB9XG4gIHAge1xuICAgIGxpbmUtaGVpZ2h0OiAyO1xuICAgIGZvbnQtd2VpZ2h0OiAzMDA7XG4gICAgZmxleC1ncm93OiAxO1xuICAgIHBhZGRpbmc6IDAgM3JlbTtcbiAgICBmb250LXNpemU6IDEuNXJlbTtcbiAgfVxuICAuYnV0dG9uTGlzdCB7XG4gICAgZGlzcGxheTogZ3JpZDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBib3JkZXItdG9wOiAxcHggc29saWQgdmFyKC0tbGlnaHRHcmF5KTtcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdChhdXRvLWZpdCwgbWlubWF4KDEwMHB4LCAxZnIpKTtcbiAgICBncmlkLWdhcDogMXB4O1xuICAgIGJhY2tncm91bmQ6IHZhcigtLWxpZ2h0R3JheSk7XG4gICAgJiA+ICoge1xuICAgICAgYmFja2dyb3VuZDogd2hpdGU7XG4gICAgICBib3JkZXI6IDA7XG4gICAgICBmb250LXNpemU6IDFyZW07XG4gICAgICBwYWRkaW5nOiAxcmVtO1xuICAgIH1cbiAgfVxuYDtcblxuZXhwb3J0IGRlZmF1bHQgSXRlbTtcbiIsImltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuXG5jb25zdCBQb3NpdGlvbiA9IHN0eWxlZC5zcGFuYFxuICBiYWNrZ3JvdW5kOiB2YXIoLS1ibGFjayk7XG4gIHRyYW5zZm9ybTogcm90YXRlKDNkZWcpO1xuICBjb2xvcjogd2hpdGU7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIHBhZGRpbmc6IDVweDtcbiAgbGluZS1oZWlnaHQ6IDE7XG4gIGZvbnQtc2l6ZTogM3JlbTtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogLTNweDtcbiAgcmlnaHQ6IC0zcHg7XG5gO1xuXG5leHBvcnQgZGVmYXVsdCBQb3NpdGlvbjtcbiIsImltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuXG5jb25zdCBUaXRsZSA9IHN0eWxlZC5oM2BcbiAgbWFyZ2luOiAwIDFyZW07XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgdHJhbnNmb3JtOiBza2V3KC01ZGVnKSByb3RhdGUoLTFkZWcpO1xuICBtYXJnaW4tdG9wOiAtM3JlbTtcbiAgdGV4dC1zaGFkb3c6IDJweCAycHggMCByZ2JhKDAsIDAsIDAsIDAuMSk7XG4gIGEge1xuICAgIGJhY2tncm91bmQ6IHZhcigtLWJsYWNrKTtcbiAgICBkaXNwbGF5OiBpbmxpbmU7XG4gICAgbGluZS1oZWlnaHQ6IDEuMztcbiAgICBmb250LXNpemU6IDRyZW07XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGNvbG9yOiB3aGl0ZTtcbiAgICBwYWRkaW5nOiAwIDFyZW07XG4gIH1cbmA7XG5cbmV4cG9ydCBkZWZhdWx0IFRpdGxlO1xuIiwiaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSAnbmV4dC9kaXN0L2NsaWVudC9yb3V0ZXInXHJcbmltcG9ydCBFeGVyY2lzZXMgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9FeGVyY2lzZXMnXHJcbmltcG9ydCBQYWdpbmF0aW9uIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvUGFnaW5hdGlvbidcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE9yZGVyUGFnZSgpIHtcclxuICAgIGNvbnN0IHtxdWVyeX0gPSB1c2VSb3V0ZXIoKTtcclxuICAgIGNvbnN0IHBhZ2UgPSBwYXJzZUludChxdWVyeS5wYWdlKTtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgPFBhZ2luYXRpb24gcGFnZT17cGFnZSB8fCAxfSAvPlxyXG4gICAgICAgICAgICA8RXhlcmNpc2VzIHBhZ2U9e3BhZ2UgfHwgMX0gLz5cclxuICAgICAgICAgICAgPFBhZ2luYXRpb24gcGFnZT17cGFnZSB8fCAxfSAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgKSBcclxufSIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBhcG9sbG8vY2xpZW50XCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJncmFwaHFsLXRhZ1wiKTs7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC9kaXN0L25leHQtc2VydmVyL2xpYi9yb3V0ZXItY29udGV4dC5qc1wiKTs7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC9kaXN0L25leHQtc2VydmVyL2xpYi9yb3V0ZXIvdXRpbHMvZ2V0LWFzc2V0LXBhdGgtZnJvbS1yb3V0ZS5qc1wiKTs7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC9oZWFkXCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwcm9wLXR5cGVzXCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTs7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QvanN4LWRldi1ydW50aW1lXCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzdHlsZWQtY29tcG9uZW50c1wiKTs7Il0sInNvdXJjZVJvb3QiOiIifQ==
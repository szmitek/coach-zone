(function() {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./components/ErrorMessage.js":
/*!************************************!*\
  !*** ./components/ErrorMessage.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);

var _jsxFileName = "C:\\Users\\Kamil\\Desktop\\coach-zone\\frontend\\components\\ErrorMessage.js";



const ErrorStyles = styled_components__WEBPACK_IMPORTED_MODULE_1___default().div.withConfig({
  displayName: "ErrorMessage__ErrorStyles",
  componentId: "sc-umvom2-0"
})(["padding:2rem;background:white;margin:2rem 0;border:1px solid rgba(0,0,0,0.05);border-left:5px solid red;p{margin:0;font-weight:100;}strong{margin-right:1rem;}"]);

const DisplayError = ({
  error
}) => {
  if (!error || !error.message) return null;

  if (error.networkError && error.networkError.result && error.networkError.result.errors.length) {
    return error.networkError.result.errors.map((error, i) => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(ErrorStyles, {
      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
        "data-test": "graphql-error",
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("strong", {
          children: "Shoot!"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 27,
          columnNumber: 11
        }, undefined), error.message.replace('GraphQL error: ', '')]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 26,
        columnNumber: 9
      }, undefined)
    }, i, false, {
      fileName: _jsxFileName,
      lineNumber: 25,
      columnNumber: 7
    }, undefined));
  }

  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(ErrorStyles, {
    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
      "data-test": "graphql-error",
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("strong", {
        children: "Shoot!"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 36,
        columnNumber: 9
      }, undefined), error.message.replace('GraphQL error: ', '')]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 7
    }, undefined)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 34,
    columnNumber: 5
  }, undefined);
};

DisplayError.defaultProps = {
  error: {}
};
DisplayError.propTypes = {
  error: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().object)
};
/* harmony default export */ __webpack_exports__["default"] = (DisplayError);

/***/ }),

/***/ "./components/Header.js":
/*!******************************!*\
  !*** ./components/Header.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Header; }
/* harmony export */ });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Nav__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Nav */ "./components/Nav.js");
/* harmony import */ var _Training__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Training */ "./components/Training.js");
/* harmony import */ var _Search__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Search */ "./components/Search.js");

var _jsxFileName = "C:\\Users\\Kamil\\Desktop\\coach-zone\\frontend\\components\\Header.js";





const Logo = styled_components__WEBPACK_IMPORTED_MODULE_2___default().h1.withConfig({
  displayName: "Header__Logo",
  componentId: "sc-1y2k9by-0"
})(["font-size:4rem;margin-left:2rem;position:relative;z-index:2;background:black;transform:skew(-20deg);a{color:white;text-decoration:none;text-transform:uppercase;padding:0.5rem 1rem;}"]);
const HeaderStyles = styled_components__WEBPACK_IMPORTED_MODULE_2___default().header.withConfig({
  displayName: "Header__HeaderStyles",
  componentId: "sc-1y2k9by-1"
})([".bar{border-bottom:10px solid var(--black,black);display:grid;grid-template-columns:auto 1fr;justify-content:space-between;align-items:stretch;}.sub-bar{display:grid;grid-template-columns:1fr auto;border-bottom:1px solid var(--black,black);}"]);
function Header() {
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(HeaderStyles, {
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
      className: "bar",
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Logo, {
        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
          href: "/",
          children: "Coach Zone"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 43,
          columnNumber: 11
        }, this)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 42,
        columnNumber: 9
      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Nav__WEBPACK_IMPORTED_MODULE_3__.default, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 45,
        columnNumber: 9
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 41,
      columnNumber: 7
    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
      className: "sub-bar",
      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Search__WEBPACK_IMPORTED_MODULE_5__.default, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 48,
        columnNumber: 9
      }, this)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 47,
      columnNumber: 7
    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Training__WEBPACK_IMPORTED_MODULE_4__.default, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 50,
      columnNumber: 7
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 40,
    columnNumber: 5
  }, this);
}

/***/ }),

/***/ "./components/Nav.js":
/*!***************************!*\
  !*** ./components/Nav.js ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Nav; }
/* harmony export */ });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_NavStyles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styles/NavStyles */ "./components/styles/NavStyles.js");
/* harmony import */ var _User__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./User */ "./components/User.js");
/* harmony import */ var _SignOut__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SignOut */ "./components/SignOut.js");
/* harmony import */ var _lib_trainingState__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../lib/trainingState */ "./lib/trainingState.js");
/* harmony import */ var _TrainingCount__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./TrainingCount */ "./components/TrainingCount.js");
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @apollo/client */ "@apollo/client");
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_apollo_client__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! graphql-tag */ "graphql-tag");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_8__);


var _jsxFileName = "C:\\Users\\Kamil\\Desktop\\coach-zone\\frontend\\components\\Nav.js";








const TEAM_QUERY = (graphql_tag__WEBPACK_IMPORTED_MODULE_8___default())`
    query USER_TEAM_QUERY {
        allTeams {
            id
        }
    }
`;
function Nav() {
  const {
    data,
    error,
    loading
  } = (0,_apollo_client__WEBPACK_IMPORTED_MODULE_7__.useQuery)(TEAM_QUERY);
  const user = (0,_User__WEBPACK_IMPORTED_MODULE_3__.useUser)();
  const {
    openTraining
  } = (0,_lib_trainingState__WEBPACK_IMPORTED_MODULE_5__.useTraining)();
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_styles_NavStyles__WEBPACK_IMPORTED_MODULE_2__.default, {
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
      href: "/exercises",
      children: "Exercises"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 24,
      columnNumber: 13
    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
      href: "/time",
      children: "Time"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 25,
      columnNumber: 13
    }, this), user && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
        href: "/addExercise",
        children: "Add Exercise"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 28,
        columnNumber: 21
      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
        href: "/calendar",
        children: "Calendar"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 29,
        columnNumber: 21
      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
        href: `/team/${data.id}`,
        children: "Team"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 30,
        columnNumber: 21
      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
        href: "/addPlayer",
        children: "Add Player"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 31,
        columnNumber: 21
      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
        href: "/account",
        children: "Account"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 32,
        columnNumber: 21
      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_SignOut__WEBPACK_IMPORTED_MODULE_4__.default, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 33,
        columnNumber: 21
      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("button", {
        type: "button",
        onClick: openTraining,
        children: ["My Training", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_TrainingCount__WEBPACK_IMPORTED_MODULE_6__.default, {
          count: user.training.reduce((tally, trainingItem) => tally + trainingItem.quantity, 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 36,
          columnNumber: 25
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 34,
        columnNumber: 21
      }, this)]
    }, void 0, true), !user && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
        href: "/signin",
        children: "Sign In"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 45,
        columnNumber: 21
      }, this)
    }, void 0, false)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 23,
    columnNumber: 9
  }, this);
}

/***/ }),

/***/ "./components/Page.js":
/*!****************************!*\
  !*** ./components/Page.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Page; }
/* harmony export */ });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Header__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Header */ "./components/Header.js");

var _jsxFileName = "C:\\Users\\Kamil\\Desktop\\coach-zone\\frontend\\components\\Page.js";



const GlobalStyles = (0,styled_components__WEBPACK_IMPORTED_MODULE_2__.createGlobalStyle)(["@font-face{font-family:'radnika_next';src:url('/static/radnikanext-medium-webfont.woff2') format('woff2');font-weight:normal;font-style:normal;}html{--red:#ff0000;--black:#393939;--grey:#3A3A3A;--gray:var(--grey);--lightGrey:#e1e1e1;--lightGray:var(--lightGrey);--offWhite:#ededed;--maxWidth:1000px;--bs:0 12px 24px 0 rgba(0,0,0,0.09);box-sizing:border-box;font-size:62.5%;}*,*:before,*:after{box-sizing:inherit;}body{font-family:'radnika_next',--apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif;padding:0;margin:0;font-size:1.5rem;line-height:2;}a{text-decoration:none;color:var(---black);}a:hover{text-decoration:underline;}button{font-family:'radnika_next',--apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',}"]);
const InnerStyles = styled_components__WEBPACK_IMPORTED_MODULE_2___default().div.withConfig({
  displayName: "Page__InnerStyles",
  componentId: "sc-1koq2sv-0"
})(["max-width:var(--maxWidth);margin:0 auto;padding:2rem;"]);
function Page({
  children
}) {
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(GlobalStyles, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 57,
      columnNumber: 9
    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Header__WEBPACK_IMPORTED_MODULE_3__.default, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 58,
      columnNumber: 9
    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(InnerStyles, {
      children: children
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 59,
      columnNumber: 9
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 56,
    columnNumber: 5
  }, this);
}
Page.propTypes = {
  children: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().any)
};

/***/ }),

/***/ "./components/Pagination.js":
/*!**********************************!*\
  !*** ./components/Pagination.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Pagination; }
/* harmony export */ });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @apollo/client */ "@apollo/client");
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_apollo_client__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! graphql-tag */ "graphql-tag");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/head */ "next/head");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _styles_PaginationStyles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./styles/PaginationStyles */ "./components/styles/PaginationStyles.js");
/* harmony import */ var _ErrorMessage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ErrorMessage */ "./components/ErrorMessage.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../config */ "./config.js");

var _jsxFileName = "C:\\Users\\Kamil\\Desktop\\coach-zone\\frontend\\components\\Pagination.js";







const PAGINATION_QUERY = (graphql_tag__WEBPACK_IMPORTED_MODULE_2___default())`
    query PAGINATION_QUERY {
        _allExercisesMeta {
            count
        }
    }
`;
function Pagination({
  page
}) {
  const {
    data,
    loading,
    error
  } = (0,_apollo_client__WEBPACK_IMPORTED_MODULE_1__.useQuery)(PAGINATION_QUERY);
  if (loading) return 'Loading...';
  if (error) return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_ErrorMessage__WEBPACK_IMPORTED_MODULE_6__.default, {
    error: error
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 20,
    columnNumber: 23
  }, this);
  const {
    count
  } = data._allExercisesMeta;
  const pageCount = Math.ceil(count / _config__WEBPACK_IMPORTED_MODULE_7__.perPage);
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_styles_PaginationStyles__WEBPACK_IMPORTED_MODULE_5__.default, {
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_3___default()), {
      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("title", {
        children: ["Coach Zone - Page ", page, " of ", pageCount]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 26,
        columnNumber: 13
      }, this)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 25,
      columnNumber: 9
    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_4___default()), {
      href: `/exercises/${page - 1}`,
      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("a", {
        "aria-disabled": page <= 1,
        children: "\u2190 Prev"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 29,
        columnNumber: 13
      }, this)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 28,
      columnNumber: 9
    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
      children: ["Page ", page, " of ", pageCount]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 31,
      columnNumber: 9
    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
      children: [count, " Items Total"]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 32,
      columnNumber: 9
    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_4___default()), {
      href: `/exercises/${page + 1}`,
      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("a", {
        "aria-disabled": page >= pageCount,
        children: "Next \u2192"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 34,
        columnNumber: 13
      }, this)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 33,
      columnNumber: 9
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 24,
    columnNumber: 5
  }, this);
}

/***/ }),

/***/ "./components/RemoveFromTraining.js":
/*!******************************************!*\
  !*** ./components/RemoveFromTraining.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ RemoveFromTraining; }
/* harmony export */ });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @apollo/client */ "@apollo/client");
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_apollo_client__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! graphql-tag */ "graphql-tag");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _User__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./User */ "./components/User.js");

var _jsxFileName = "C:\\Users\\Kamil\\Desktop\\coach-zone\\frontend\\components\\RemoveFromTraining.js";




const BigButton = styled_components__WEBPACK_IMPORTED_MODULE_3___default().button.withConfig({
  displayName: "RemoveFromTraining__BigButton",
  componentId: "sc-1cep2t5-0"
})(["font-size:3rem;background:none;border:0;&:hover{color:var(--red);cursor:pointer;}"]);
const REMOVE_FROM_TRAINING_MUTATION = (graphql_tag__WEBPACK_IMPORTED_MODULE_2___default())`
  mutation REMOVE_FROM_TRAINING_MUTATION($id: ID!) {
    deleteTrainingItem(id: $id) {
      id
    }
  }
`;
function RemoveFromTraining({
  id
}) {
  const [removeFromTraining, {
    loading
  }] = (0,_apollo_client__WEBPACK_IMPORTED_MODULE_1__.useMutation)(REMOVE_FROM_TRAINING_MUTATION, {
    variables: {
      id
    },
    refetchQueries: [{
      query: _User__WEBPACK_IMPORTED_MODULE_4__.CURRENT_USER_QUERY
    }]
  });
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(BigButton, {
    onClick: removeFromTraining,
    disabled: loading,
    type: "button",
    title: "Remove this exercise from training",
    children: "\xD7"
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 31,
    columnNumber: 5
  }, this);
}

/***/ }),

/***/ "./components/Search.js":
/*!******************************!*\
  !*** ./components/Search.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Search; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @apollo/client */ "@apollo/client");
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_apollo_client__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var downshift__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! downshift */ "downshift");
/* harmony import */ var downshift__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(downshift__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! graphql-tag */ "graphql-tag");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash.debounce */ "lodash.debounce");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var next_dist_client_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! next/dist/client/router */ "./node_modules/next/dist/client/router.js");
/* harmony import */ var _styles_DropDown__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./styles/DropDown */ "./components/styles/DropDown.js");


var _jsxFileName = "C:\\Users\\Kamil\\Desktop\\coach-zone\\frontend\\components\\Search.js";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







const SEARCH_EXERCISES_QUERY = (graphql_tag__WEBPACK_IMPORTED_MODULE_4___default())`
    query SEARCH_EXERCISES_QUERY($searchTerm: String!) {
        searchTerms: allExercises(
            where: {
                OR: [
                    { name_contains_i: $searchTerm }
                    { description_contains_i: $searchTerm }
                ]
            }
        ) {
            id
            name
            photo {
                image {
                    publicUrlTransformed
                }
            }
        }
    }
`;
function Search() {
  const router = (0,next_dist_client_router__WEBPACK_IMPORTED_MODULE_6__.useRouter)();
  const [findItems, {
    loading,
    data,
    error
  }] = (0,_apollo_client__WEBPACK_IMPORTED_MODULE_2__.useLazyQuery)(SEARCH_EXERCISES_QUERY, {
    fetchPolicy: 'no-cache'
  });
  const items = (data === null || data === void 0 ? void 0 : data.searchTerms) || [];
  const findItemsButChill = lodash_debounce__WEBPACK_IMPORTED_MODULE_5___default()(findItems, 350);
  (0,downshift__WEBPACK_IMPORTED_MODULE_3__.resetIdCounter)();
  const {
    isOpen,
    inputValue,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
    highlightedIndex
  } = (0,downshift__WEBPACK_IMPORTED_MODULE_3__.useCombobox)({
    items,

    onInputValueChange() {
      findItemsButChill({
        variables: {
          searchTerm: inputValue
        }
      });
    },

    onSelectedItemChange({
      selectedItem
    }) {
      router.push({
        pathname: `/exercise/${selectedItem.id}`
      });
    },

    itemToString: item => (item === null || item === void 0 ? void 0 : item.name) || ''
  });
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(_styles_DropDown__WEBPACK_IMPORTED_MODULE_7__.SearchStyles, {
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("div", _objectSpread(_objectSpread({}, getComboboxProps()), {}, {
      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("input", _objectSpread({}, getInputProps({
        type: 'search',
        placeholder: 'Search for an Exercise',
        id: 'search',
        className: loading ? 'loading' : ''
      })), void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 66,
        columnNumber: 17
      }, this)
    }), void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 65,
      columnNumber: 13
    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(_styles_DropDown__WEBPACK_IMPORTED_MODULE_7__.DropDown, _objectSpread(_objectSpread({}, getMenuProps()), {}, {
      children: [isOpen && items.map((item, index) => /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_styles_DropDown__WEBPACK_IMPORTED_MODULE_7__.DropDownItem, _objectSpread(_objectSpread({}, getItemProps({
        item,
        index
      })), {}, {
        key: item.id,
        highlighted: index === highlightedIndex,
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 76,
          columnNumber: 17
        }
      }), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("img", {
        src: item.photo.image.publicUrlTransformed,
        alt: item.name,
        width: "50"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 80,
        columnNumber: 17
      }, this), item.name)), isOpen && !items.length && !loading && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(_styles_DropDown__WEBPACK_IMPORTED_MODULE_7__.DropDownItem, {
        children: ["Sorry, No exercises found for ", inputValue]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 89,
        columnNumber: 17
      }, this)]
    }), void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 74,
      columnNumber: 9
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 64,
    columnNumber: 9
  }, this);
}

/***/ }),

/***/ "./components/SignOut.js":
/*!*******************************!*\
  !*** ./components/SignOut.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ SignOut; }
/* harmony export */ });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! graphql-tag */ "graphql-tag");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _User__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./User */ "./components/User.js");
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @apollo/client */ "@apollo/client");
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_apollo_client__WEBPACK_IMPORTED_MODULE_3__);

var _jsxFileName = "C:\\Users\\Kamil\\Desktop\\coach-zone\\frontend\\components\\SignOut.js";



const SIGN_OUT_MUTATION = (graphql_tag__WEBPACK_IMPORTED_MODULE_1___default())`
    mutation {
        endSession
    }
`;
function SignOut() {
  const [signout] = (0,_apollo_client__WEBPACK_IMPORTED_MODULE_3__.useMutation)(SIGN_OUT_MUTATION, {
    refetchQueries: [{
      query: _User__WEBPACK_IMPORTED_MODULE_2__.CURRENT_USER_QUERY
    }]
  });
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("button", {
    type: "button",
    onClick: signout,
    children: "Sing Out"
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 16,
    columnNumber: 5
  }, this);
}

/***/ }),

/***/ "./components/Training.js":
/*!********************************!*\
  !*** ./components/Training.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Training; }
/* harmony export */ });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _User__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./User */ "./components/User.js");
/* harmony import */ var _styles_TrainingStyles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./styles/TrainingStyles */ "./components/styles/TrainingStyles.js");
/* harmony import */ var _styles_Supreme__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./styles/Supreme */ "./components/styles/Supreme.js");
/* harmony import */ var _lib_trainingState__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../lib/trainingState */ "./lib/trainingState.js");
/* harmony import */ var _styles_CloseButton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./styles/CloseButton */ "./components/styles/CloseButton.js");
/* harmony import */ var _RemoveFromTraining__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./RemoveFromTraining */ "./components/RemoveFromTraining.js");

var _jsxFileName = "C:\\Users\\Kamil\\Desktop\\coach-zone\\frontend\\components\\Training.js";







const TrainingItemStyles = styled_components__WEBPACK_IMPORTED_MODULE_1___default().li.withConfig({
  displayName: "Training__TrainingItemStyles",
  componentId: "sc-10mp41v-0"
})(["padding:1rem 0;border-bottom:1px solid var(--lightGrey);display:grid;grid-template-columns:auto 1fr auto;img{margin-right:1rem;}h3,p{margin:0;},"]);

function TrainingItem({
  trainingItem
}) {
  const {
    exercise
  } = trainingItem;
  if (!exercise) return null; //console.log(exercise);

  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(TrainingItemStyles, {
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("img", {
      width: "100",
      src: exercise.photo.image.publicUrlTransformed,
      alt: exercise.name
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 29,
      columnNumber: 7
    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("h3", {
        children: exercise.name
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 35,
        columnNumber: 9
      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("h2", {
        children: exercise.position
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 36,
        columnNumber: 9
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 34,
      columnNumber: 7
    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_RemoveFromTraining__WEBPACK_IMPORTED_MODULE_7__.default, {
      id: trainingItem.id
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 7
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 28,
    columnNumber: 5
  }, this);
}

function Training() {
  const me = (0,_User__WEBPACK_IMPORTED_MODULE_2__.useUser)();
  const {
    trainingOpen,
    closeTraining
  } = (0,_lib_trainingState__WEBPACK_IMPORTED_MODULE_5__.useTraining)();
  if (!me) return null;
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_styles_TrainingStyles__WEBPACK_IMPORTED_MODULE_3__.default, {
    open: trainingOpen,
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("header", {
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_styles_Supreme__WEBPACK_IMPORTED_MODULE_4__.default, {
        children: [me.name, "'s Training"]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 50,
        columnNumber: 9
      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_styles_CloseButton__WEBPACK_IMPORTED_MODULE_6__.default, {
        onClick: closeTraining,
        children: "\xD7"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 51,
        columnNumber: 9
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 49,
      columnNumber: 7
    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("ul", {
      children: me.training.map(trainingItem => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(TrainingItem, {
        trainingItem: trainingItem
      }, trainingItem.id, false, {
        fileName: _jsxFileName,
        lineNumber: 55,
        columnNumber: 11
      }, this))
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 53,
      columnNumber: 7
    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("footer", {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 58,
      columnNumber: 7
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 48,
    columnNumber: 5
  }, this);
}

/***/ }),

/***/ "./components/TrainingCount.js":
/*!*************************************!*\
  !*** ./components/TrainingCount.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ TrainingCount; }
/* harmony export */ });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_transition_group__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-transition-group */ "react-transition-group");
/* harmony import */ var react_transition_group__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_transition_group__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_2__);

var _jsxFileName = "C:\\Users\\Kamil\\Desktop\\coach-zone\\frontend\\components\\TrainingCount.js";


const Dot = styled_components__WEBPACK_IMPORTED_MODULE_2___default().div.withConfig({
  displayName: "TrainingCount__Dot",
  componentId: "sc-1i5ayfo-0"
})(["background:var(--red);color:white;border-radius:50%;padding:0.5rem;line-height:2rem;min-width:3rem;margin-left:1rem;font-feature-settings:'tnum';font-variant-numeric:tabular-nums;"]);
const AnimationStyles = styled_components__WEBPACK_IMPORTED_MODULE_2___default().span.withConfig({
  displayName: "TrainingCount__AnimationStyles",
  componentId: "sc-1i5ayfo-1"
})(["position:relative;.count{display:block;position:relative;transition:transform 0.4s;backface-visibility:hidden;}.count-enter{transform:scale(4) rotateX(0.5turn);}.count-enter-active{transform:rotateX(0);}.count-exit{top:0;position:absolute;transform:rotateX(0);}.count-exit-active{transform:scale(4) rotateX(0.5turn);}"]);
function TrainingCount({
  count
}) {
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AnimationStyles, {
    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_transition_group__WEBPACK_IMPORTED_MODULE_1__.TransitionGroup, {
      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_transition_group__WEBPACK_IMPORTED_MODULE_1__.CSSTransition, {
        unmountOnExit: true,
        className: "count",
        classNames: "count",
        timeout: {
          enter: 400,
          exit: 400
        },
        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Dot, {
          children: count
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 51,
          columnNumber: 21
        }, this)
      }, count, false, {
        fileName: _jsxFileName,
        lineNumber: 44,
        columnNumber: 17
      }, this)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 43,
      columnNumber: 13
    }, this)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 42,
    columnNumber: 9
  }, this);
}

/***/ }),

/***/ "./components/User.js":
/*!****************************!*\
  !*** ./components/User.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useUser": function() { return /* binding */ useUser; },
/* harmony export */   "CURRENT_USER_QUERY": function() { return /* binding */ CURRENT_USER_QUERY; }
/* harmony export */ });
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @apollo/client */ "@apollo/client");
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_apollo_client__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! graphql-tag */ "graphql-tag");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_1__);


const CURRENT_USER_QUERY = (graphql_tag__WEBPACK_IMPORTED_MODULE_1___default())`
    query {
        authenticatedItem {
            ... on User {
                id
                email
                name
                team {
                    id
                    players {
                        id
                        name
                        number
                        position
                        description
                        weaknesses
                        strengths
                        photo {
                            image {
                                publicUrlTransformed
                            }
                        }
                    }
                }
                training {
                    id
                    quantity
                    exercise {
                        id
                        name
                        description
                        position
                        photo {
                            image {
                                publicUrlTransformed
                            }
                        }
                    }
                }
            }
        }
    }
`;
function useUser() {
  const {
    data
  } = (0,_apollo_client__WEBPACK_IMPORTED_MODULE_0__.useQuery)(CURRENT_USER_QUERY);
  return data === null || data === void 0 ? void 0 : data.authenticatedItem;
}


/***/ }),

/***/ "./components/styles/CloseButton.js":
/*!******************************************!*\
  !*** ./components/styles/CloseButton.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);

const CloseButton = styled_components__WEBPACK_IMPORTED_MODULE_0___default().button.withConfig({
  displayName: "CloseButton",
  componentId: "sc-11598b0-0"
})(["background:black;color:white;font-size:3rem;border:0;position:absolute;z-index:2;right:0;"]);
/* harmony default export */ __webpack_exports__["default"] = (CloseButton);

/***/ }),

/***/ "./components/styles/DropDown.js":
/*!***************************************!*\
  !*** ./components/styles/DropDown.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DropDown": function() { return /* binding */ DropDown; },
/* harmony export */   "DropDownItem": function() { return /* binding */ DropDownItem; },
/* harmony export */   "SearchStyles": function() { return /* binding */ SearchStyles; }
/* harmony export */ });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);

const DropDown = styled_components__WEBPACK_IMPORTED_MODULE_0___default().div.withConfig({
  displayName: "DropDown",
  componentId: "sc-185jcpe-0"
})(["position:absolute;width:100%;z-index:2;border:1px solid var(--lightGray);"]);
const DropDownItem = styled_components__WEBPACK_IMPORTED_MODULE_0___default().div.withConfig({
  displayName: "DropDown__DropDownItem",
  componentId: "sc-185jcpe-1"
})(["border-bottom:1px solid var(--lightGray);background:", ";padding:1rem;transition:all 0.2s;", ";display:flex;align-items:center;border-left:10px solid ", ";img{margin-right:10px;}"], props => props.highlighted ? '#f7f7f7' : 'white', props => props.highlighted ? 'padding-left: 2rem;' : null, props => props.highlighted ? props.theme.lightgrey : 'white');
const glow = (0,styled_components__WEBPACK_IMPORTED_MODULE_0__.keyframes)(["from{box-shadow:0 0 0px yellow;}to{box-shadow:0 0 10px 1px yellow;}"]);
const SearchStyles = styled_components__WEBPACK_IMPORTED_MODULE_0___default().div.withConfig({
  displayName: "DropDown__SearchStyles",
  componentId: "sc-185jcpe-2"
})(["position:relative;input{width:100%;padding:10px;border:0;font-size:2rem;&.loading{animation:", " 0.5s ease-in-out infinite alternate;}}"], glow);


/***/ }),

/***/ "./components/styles/NavStyles.js":
/*!****************************************!*\
  !*** ./components/styles/NavStyles.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);

const NavStyles = styled_components__WEBPACK_IMPORTED_MODULE_0___default().ul.withConfig({
  displayName: "NavStyles",
  componentId: "sc-16md9wn-0"
})(["margin:0;padding:0;display:flex;justify-self:end;font-size:2rem;a,button{padding:1rem 3rem;display:flex;align-items:center;position:relative;text-transform:uppercase;font-weight:900;font-size:1em;background:none;border:0;cursor:pointer;@media (max-width:700px){font-size:10px;padding:0 10px;}&:before{content:'';width:2px;background:var(--lightGray);height:100%;left:0;position:absolute;transform:skew(-20deg);top:0;bottom:0;}&:after{height:2px;background:goldenrod;content:'';width:0;position:absolute;transform:translateX(-50%);transition:width 0.4s;transition-timing-function:cubic-bezier(1,-0.65,0,2.31);left:50%;margin-top:2rem;}&:hover,&:focus{outline:none;text-decoration:none;&:after{width:calc(100% - 60px);}@media (max-width:700px){width:calc(100% - 10px);}}}@media (max-width:1300px){border-top:1px solid var(--lightGray);width:100%;justify-content:center;font-size:1.5rem;}"]);
/* harmony default export */ __webpack_exports__["default"] = (NavStyles);

/***/ }),

/***/ "./components/styles/PaginationStyles.js":
/*!***********************************************!*\
  !*** ./components/styles/PaginationStyles.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);

const PaginationStyles = styled_components__WEBPACK_IMPORTED_MODULE_0___default().div.withConfig({
  displayName: "PaginationStyles",
  componentId: "sc-1dmc7wb-0"
})(["text-align:center;display:inline-grid;grid-template-columns:repeat(4,auto);align-items:stretch;justify-content:center;align-content:center;margin:2rem 0;border:1px solid var(--lightGray);border-radius:10px;& > *{margin:0;padding:15px 30px;border-right:1px solid var(--lightGray);&:last-child{border-right:0;}}a[aria-disabled='true']{color:grey;pointer-events:none;}"]);
/* harmony default export */ __webpack_exports__["default"] = (PaginationStyles);

/***/ }),

/***/ "./components/styles/Supreme.js":
/*!**************************************!*\
  !*** ./components/styles/Supreme.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);

const Supreme = styled_components__WEBPACK_IMPORTED_MODULE_0___default().h3.withConfig({
  displayName: "Supreme",
  componentId: "sc-1l1zef-0"
})(["background:var(--black);color:white;display:inline-block;padding:4px 5px;transform:skew(-3deg);margin:0;font-size:4rem;"]);
/* harmony default export */ __webpack_exports__["default"] = (Supreme);

/***/ }),

/***/ "./components/styles/TrainingStyles.js":
/*!*********************************************!*\
  !*** ./components/styles/TrainingStyles.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);

const TrainingStyles = styled_components__WEBPACK_IMPORTED_MODULE_0___default().div.withConfig({
  displayName: "TrainingStyles",
  componentId: "sc-beenq3-0"
})(["padding:20px;position:relative;background:white;position:fixed;height:100%;top:0;right:0;width:40%;min-width:500px;bottom:0;transform:translateX(100%);transition:all 0.3s;box-shadow:0 0 10px 3px rgba(0,0,0,0.2);z-index:5;display:grid;grid-template-rows:auto 1fr auto;", ";header{border-bottom:5px solid var(--black);margin-bottom:2rem;padding-bottom:2rem;}footer{border-top:10px double var(--black);margin-top:2rem;padding-top:2rem;display:grid;grid-template-columns:auto auto;align-items:center;font-size:3rem;font-weight:900;p{margin:0;}}ul{margin:0;padding:0;list-style:none;overflow:scroll;}"], props => props.open && `transform: translateX(0);`);
/* harmony default export */ __webpack_exports__["default"] = (TrainingStyles);

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

/***/ "./lib/paginationField.js":
/*!********************************!*\
  !*** ./lib/paginationField.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ paginationField; }
/* harmony export */ });
/* harmony import */ var _components_Pagination__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/Pagination */ "./components/Pagination.js");

function paginationField() {
  return {
    keyArgs: false,

    // tells apollo we take care of everything
    read(existing = [], {
      args,
      cache
    }) {
      var _data$_allExercisesMe;

      //console.log({existing, args, cache});
      const {
        skip,
        first
      } = args; //Read the number of items on the page from ache

      const data = cache.readQuery({
        query: _components_Pagination__WEBPACK_IMPORTED_MODULE_0__.PAGINATION_QUERY
      });
      const count = data === null || data === void 0 ? void 0 : (_data$_allExercisesMe = data._allExercisesMeta) === null || _data$_allExercisesMe === void 0 ? void 0 : _data$_allExercisesMe.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first); //Check if we have existing items

      const items = existing.slice(skip, skip + first).filter(x => x); // If
      // There are items
      // AND there aren't enough items to satisfy how many were requested
      // AND we are on the last page
      // THEN JUST SEND IT

      if (items.length && items.length !== first && page === pages) {
        return items;
      }

      if (items.length !== first) {
        //We dont have any items, we must go to the network to fetch them
        return false;
      } //If there are items, just return them from cache and we dont need to go to the network


      if (items.length) {
        //console.log(
        //    `There are ${items.length} items in the cache! Gonna send them to apollo`
        //);
        return items;
      }

      return false; //fallback to network
      //First thing it does is asks the read function for those items
    },

    merge(existing, incoming, {
      args
    }) {
      const {
        skip,
        first
      } = args; // This runs when apollo client comes back from the network with our product
      //console.log(`Merging items from the network ${incoming.length}`);

      const merged = existing ? existing.slice(0) : [];

      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }

      console.log(merged); //Finally we return the merged items from the cache

      return merged;
    }

  };
}

/***/ }),

/***/ "./lib/trainingState.js":
/*!******************************!*\
  !*** ./lib/trainingState.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TrainingStateProvider": function() { return /* binding */ TrainingStateProvider; },
/* harmony export */   "useTraining": function() { return /* binding */ useTraining; }
/* harmony export */ });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);

var _jsxFileName = "C:\\Users\\Kamil\\Desktop\\coach-zone\\frontend\\lib\\trainingState.js";

const LocalStateContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)();
const LocalStateProvider = LocalStateContext.Provider;

function TrainingStateProvider({
  children
}) {
  // This is custom provider. It will store data (state) and functionality (updates)
  // in here and anyone can access it via the consumer
  const {
    0: trainingOpen,
    1: setTrainingOpen
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);

  function toggleTraining() {
    setTrainingOpen(!trainingOpen);
  }

  function closeTraining() {
    setTrainingOpen(false);
  }

  function openTraining() {
    setTrainingOpen(true);
  }

  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(LocalStateProvider, {
    value: {
      trainingOpen,
      setTrainingOpen,
      toggleTraining,
      closeTraining,
      openTraining
    },
    children: children
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 23,
    columnNumber: 12
  }, this);
} //make a custom hook for accessing the trainig local state


function useTraining() {
  const all = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(LocalStateContext);
  return all;
}



/***/ }),

/***/ "./lib/withData.js":
/*!*************************!*\
  !*** ./lib/withData.js ***!
  \*************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @apollo/client */ "@apollo/client");
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_apollo_client__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _apollo_link_error__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @apollo/link-error */ "@apollo/link-error");
/* harmony import */ var _apollo_link_error__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_apollo_link_error__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _apollo_client_react_ssr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @apollo/client/react/ssr */ "@apollo/client/react/ssr");
/* harmony import */ var _apollo_client_react_ssr__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_apollo_client_react_ssr__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var apollo_upload_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! apollo-upload-client */ "apollo-upload-client");
/* harmony import */ var apollo_upload_client__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(apollo_upload_client__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_with_apollo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next-with-apollo */ "next-with-apollo");
/* harmony import */ var next_with_apollo__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_with_apollo__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../config */ "./config.js");
/* harmony import */ var _paginationField__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./paginationField */ "./lib/paginationField.js");








function createClient({
  headers,
  initialState
}) {
  return new _apollo_client__WEBPACK_IMPORTED_MODULE_0__.ApolloClient({
    link: _apollo_client__WEBPACK_IMPORTED_MODULE_0__.ApolloLink.from([(0,_apollo_link_error__WEBPACK_IMPORTED_MODULE_1__.onError)(({
      graphQLErrors,
      networkError
    }) => {
      if (graphQLErrors) graphQLErrors.forEach(({
        message,
        locations,
        path
      }) => console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`));
      if (networkError) console.log(`[Network error]: ${networkError}. Backend is unreachable. Is it running?`);
    }), // this uses apollo-link-http under the hood, so all the options here come from that package
    (0,apollo_upload_client__WEBPACK_IMPORTED_MODULE_3__.createUploadLink)({
      uri:  true ? _config__WEBPACK_IMPORTED_MODULE_5__.endpoint : 0,
      fetchOptions: {
        credentials: 'include'
      },
      // pass the headers along from this request. This enables SSR with logged in state
      headers
    })]),
    cache: new _apollo_client__WEBPACK_IMPORTED_MODULE_0__.InMemoryCache({
      typePolicies: {
        Query: {
          fields: {// TODO: We will add this together!
            //allExercises: paginationField(), //dont want to wark, crashes entire web
          }
        }
      }
    }).restore(initialState || {})
  });
}

/* harmony default export */ __webpack_exports__["default"] = (next_with_apollo__WEBPACK_IMPORTED_MODULE_4___default()(createClient, {
  getDataFromTree: _apollo_client_react_ssr__WEBPACK_IMPORTED_MODULE_2__.getDataFromTree
}));

/***/ }),

/***/ "./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nprogress__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nprogress */ "nprogress");
/* harmony import */ var nprogress__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nprogress__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_Page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Page */ "./components/Page.js");
/* harmony import */ var _components_styles_nprogress_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/styles/nprogress.css */ "./components/styles/nprogress.css");
/* harmony import */ var _components_styles_nprogress_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_components_styles_nprogress_css__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @apollo/client */ "@apollo/client");
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_apollo_client__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _lib_withData__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../lib/withData */ "./lib/withData.js");
/* harmony import */ var _lib_trainingState__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../lib/trainingState */ "./lib/trainingState.js");
/* harmony import */ var react_big_calendar_lib_css_react_big_calendar_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-big-calendar/lib/css/react-big-calendar.css */ "./node_modules/react-big-calendar/lib/css/react-big-calendar.css");
/* harmony import */ var react_big_calendar_lib_css_react_big_calendar_css__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_big_calendar_lib_css_react_big_calendar_css__WEBPACK_IMPORTED_MODULE_8__);

var _jsxFileName = "C:\\Users\\Kamil\\Desktop\\coach-zone\\frontend\\pages\\_app.js";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










next_router__WEBPACK_IMPORTED_MODULE_2___default().events.on('routeChangeStart', () => nprogress__WEBPACK_IMPORTED_MODULE_1___default().start());
next_router__WEBPACK_IMPORTED_MODULE_2___default().events.on('routeChangeComplete', () => nprogress__WEBPACK_IMPORTED_MODULE_1___default().done());
next_router__WEBPACK_IMPORTED_MODULE_2___default().events.on('routeChangeError', () => nprogress__WEBPACK_IMPORTED_MODULE_1___default().done());

function MyApp({
  Component,
  pageProps,
  apollo
}) {
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_apollo_client__WEBPACK_IMPORTED_MODULE_5__.ApolloProvider, {
    client: apollo,
    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_lib_trainingState__WEBPACK_IMPORTED_MODULE_7__.TrainingStateProvider, {
      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Page__WEBPACK_IMPORTED_MODULE_3__.default, {
        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, _objectSpread({}, pageProps), void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 20,
          columnNumber: 11
        }, this)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 19,
        columnNumber: 9
      }, this)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 18,
      columnNumber: 7
    }, this)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 17,
    columnNumber: 5
  }, this);
}

MyApp.getInitialProps = async function ({
  Component,
  ctx
}) {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  pageProps.query = ctx.query;
  return {
    pageProps
  };
};

/* harmony default export */ __webpack_exports__["default"] = ((0,_lib_withData__WEBPACK_IMPORTED_MODULE_6__.default)(MyApp));

/***/ }),

/***/ "./components/styles/nprogress.css":
/*!*****************************************!*\
  !*** ./components/styles/nprogress.css ***!
  \*****************************************/
/***/ (function() {



/***/ }),

/***/ "@apollo/client":
/*!*********************************!*\
  !*** external "@apollo/client" ***!
  \*********************************/
/***/ (function(module) {

"use strict";
module.exports = require("@apollo/client");;

/***/ }),

/***/ "@apollo/client/react/ssr":
/*!*******************************************!*\
  !*** external "@apollo/client/react/ssr" ***!
  \*******************************************/
/***/ (function(module) {

"use strict";
module.exports = require("@apollo/client/react/ssr");;

/***/ }),

/***/ "@apollo/link-error":
/*!*************************************!*\
  !*** external "@apollo/link-error" ***!
  \*************************************/
/***/ (function(module) {

"use strict";
module.exports = require("@apollo/link-error");;

/***/ }),

/***/ "apollo-upload-client":
/*!***************************************!*\
  !*** external "apollo-upload-client" ***!
  \***************************************/
/***/ (function(module) {

"use strict";
module.exports = require("apollo-upload-client");;

/***/ }),

/***/ "downshift":
/*!****************************!*\
  !*** external "downshift" ***!
  \****************************/
/***/ (function(module) {

"use strict";
module.exports = require("downshift");;

/***/ }),

/***/ "graphql-tag":
/*!******************************!*\
  !*** external "graphql-tag" ***!
  \******************************/
/***/ (function(module) {

"use strict";
module.exports = require("graphql-tag");;

/***/ }),

/***/ "lodash.debounce":
/*!**********************************!*\
  !*** external "lodash.debounce" ***!
  \**********************************/
/***/ (function(module) {

"use strict";
module.exports = require("lodash.debounce");;

/***/ }),

/***/ "next-with-apollo":
/*!***********************************!*\
  !*** external "next-with-apollo" ***!
  \***********************************/
/***/ (function(module) {

"use strict";
module.exports = require("next-with-apollo");;

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

/***/ "next/router":
/*!******************************!*\
  !*** external "next/router" ***!
  \******************************/
/***/ (function(module) {

"use strict";
module.exports = require("next/router");;

/***/ }),

/***/ "nprogress":
/*!****************************!*\
  !*** external "nprogress" ***!
  \****************************/
/***/ (function(module) {

"use strict";
module.exports = require("nprogress");;

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

/***/ "react-transition-group":
/*!*****************************************!*\
  !*** external "react-transition-group" ***!
  \*****************************************/
/***/ (function(module) {

"use strict";
module.exports = require("react-transition-group");;

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

/***/ }),

/***/ "?ca47":
/*!******************************************!*\
  !*** ./utils/resolve-rewrites (ignored) ***!
  \******************************************/
/***/ (function() {

/* (ignored) */

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = __webpack_require__.X(0, ["vendors-node_modules_react-big-calendar_lib_css_react-big-calendar_css-node_modules_next_link_js"], function() { return __webpack_exec__("./pages/_app.js"); });
module.exports = __webpack_exports__;

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jb2FjaC16b25lLWZyb250ZW5kLy4vY29tcG9uZW50cy9FcnJvck1lc3NhZ2UuanMiLCJ3ZWJwYWNrOi8vY29hY2gtem9uZS1mcm9udGVuZC8uL2NvbXBvbmVudHMvSGVhZGVyLmpzIiwid2VicGFjazovL2NvYWNoLXpvbmUtZnJvbnRlbmQvLi9jb21wb25lbnRzL05hdi5qcyIsIndlYnBhY2s6Ly9jb2FjaC16b25lLWZyb250ZW5kLy4vY29tcG9uZW50cy9QYWdlLmpzIiwid2VicGFjazovL2NvYWNoLXpvbmUtZnJvbnRlbmQvLi9jb21wb25lbnRzL1BhZ2luYXRpb24uanMiLCJ3ZWJwYWNrOi8vY29hY2gtem9uZS1mcm9udGVuZC8uL2NvbXBvbmVudHMvUmVtb3ZlRnJvbVRyYWluaW5nLmpzIiwid2VicGFjazovL2NvYWNoLXpvbmUtZnJvbnRlbmQvLi9jb21wb25lbnRzL1NlYXJjaC5qcyIsIndlYnBhY2s6Ly9jb2FjaC16b25lLWZyb250ZW5kLy4vY29tcG9uZW50cy9TaWduT3V0LmpzIiwid2VicGFjazovL2NvYWNoLXpvbmUtZnJvbnRlbmQvLi9jb21wb25lbnRzL1RyYWluaW5nLmpzIiwid2VicGFjazovL2NvYWNoLXpvbmUtZnJvbnRlbmQvLi9jb21wb25lbnRzL1RyYWluaW5nQ291bnQuanMiLCJ3ZWJwYWNrOi8vY29hY2gtem9uZS1mcm9udGVuZC8uL2NvbXBvbmVudHMvVXNlci5qcyIsIndlYnBhY2s6Ly9jb2FjaC16b25lLWZyb250ZW5kLy4vY29tcG9uZW50cy9zdHlsZXMvQ2xvc2VCdXR0b24uanMiLCJ3ZWJwYWNrOi8vY29hY2gtem9uZS1mcm9udGVuZC8uL2NvbXBvbmVudHMvc3R5bGVzL0Ryb3BEb3duLmpzIiwid2VicGFjazovL2NvYWNoLXpvbmUtZnJvbnRlbmQvLi9jb21wb25lbnRzL3N0eWxlcy9OYXZTdHlsZXMuanMiLCJ3ZWJwYWNrOi8vY29hY2gtem9uZS1mcm9udGVuZC8uL2NvbXBvbmVudHMvc3R5bGVzL1BhZ2luYXRpb25TdHlsZXMuanMiLCJ3ZWJwYWNrOi8vY29hY2gtem9uZS1mcm9udGVuZC8uL2NvbXBvbmVudHMvc3R5bGVzL1N1cHJlbWUuanMiLCJ3ZWJwYWNrOi8vY29hY2gtem9uZS1mcm9udGVuZC8uL2NvbXBvbmVudHMvc3R5bGVzL1RyYWluaW5nU3R5bGVzLmpzIiwid2VicGFjazovL2NvYWNoLXpvbmUtZnJvbnRlbmQvLi9jb25maWcuanMiLCJ3ZWJwYWNrOi8vY29hY2gtem9uZS1mcm9udGVuZC8uL2xpYi9wYWdpbmF0aW9uRmllbGQuanMiLCJ3ZWJwYWNrOi8vY29hY2gtem9uZS1mcm9udGVuZC8uL2xpYi90cmFpbmluZ1N0YXRlLmpzIiwid2VicGFjazovL2NvYWNoLXpvbmUtZnJvbnRlbmQvLi9saWIvd2l0aERhdGEuanMiLCJ3ZWJwYWNrOi8vY29hY2gtem9uZS1mcm9udGVuZC8uL3BhZ2VzL19hcHAuanMiLCJ3ZWJwYWNrOi8vY29hY2gtem9uZS1mcm9udGVuZC9leHRlcm5hbCBcIkBhcG9sbG8vY2xpZW50XCIiLCJ3ZWJwYWNrOi8vY29hY2gtem9uZS1mcm9udGVuZC9leHRlcm5hbCBcIkBhcG9sbG8vY2xpZW50L3JlYWN0L3NzclwiIiwid2VicGFjazovL2NvYWNoLXpvbmUtZnJvbnRlbmQvZXh0ZXJuYWwgXCJAYXBvbGxvL2xpbmstZXJyb3JcIiIsIndlYnBhY2s6Ly9jb2FjaC16b25lLWZyb250ZW5kL2V4dGVybmFsIFwiYXBvbGxvLXVwbG9hZC1jbGllbnRcIiIsIndlYnBhY2s6Ly9jb2FjaC16b25lLWZyb250ZW5kL2V4dGVybmFsIFwiZG93bnNoaWZ0XCIiLCJ3ZWJwYWNrOi8vY29hY2gtem9uZS1mcm9udGVuZC9leHRlcm5hbCBcImdyYXBocWwtdGFnXCIiLCJ3ZWJwYWNrOi8vY29hY2gtem9uZS1mcm9udGVuZC9leHRlcm5hbCBcImxvZGFzaC5kZWJvdW5jZVwiIiwid2VicGFjazovL2NvYWNoLXpvbmUtZnJvbnRlbmQvZXh0ZXJuYWwgXCJuZXh0LXdpdGgtYXBvbGxvXCIiLCJ3ZWJwYWNrOi8vY29hY2gtem9uZS1mcm9udGVuZC9leHRlcm5hbCBcIm5leHQvZGlzdC9uZXh0LXNlcnZlci9saWIvcm91dGVyLWNvbnRleHQuanNcIiIsIndlYnBhY2s6Ly9jb2FjaC16b25lLWZyb250ZW5kL2V4dGVybmFsIFwibmV4dC9kaXN0L25leHQtc2VydmVyL2xpYi9yb3V0ZXIvdXRpbHMvZ2V0LWFzc2V0LXBhdGgtZnJvbS1yb3V0ZS5qc1wiIiwid2VicGFjazovL2NvYWNoLXpvbmUtZnJvbnRlbmQvZXh0ZXJuYWwgXCJuZXh0L2hlYWRcIiIsIndlYnBhY2s6Ly9jb2FjaC16b25lLWZyb250ZW5kL2V4dGVybmFsIFwibmV4dC9yb3V0ZXJcIiIsIndlYnBhY2s6Ly9jb2FjaC16b25lLWZyb250ZW5kL2V4dGVybmFsIFwibnByb2dyZXNzXCIiLCJ3ZWJwYWNrOi8vY29hY2gtem9uZS1mcm9udGVuZC9leHRlcm5hbCBcInByb3AtdHlwZXNcIiIsIndlYnBhY2s6Ly9jb2FjaC16b25lLWZyb250ZW5kL2V4dGVybmFsIFwicmVhY3RcIiIsIndlYnBhY2s6Ly9jb2FjaC16b25lLWZyb250ZW5kL2V4dGVybmFsIFwicmVhY3QtdHJhbnNpdGlvbi1ncm91cFwiIiwid2VicGFjazovL2NvYWNoLXpvbmUtZnJvbnRlbmQvZXh0ZXJuYWwgXCJyZWFjdC9qc3gtZGV2LXJ1bnRpbWVcIiIsIndlYnBhY2s6Ly9jb2FjaC16b25lLWZyb250ZW5kL2V4dGVybmFsIFwic3R5bGVkLWNvbXBvbmVudHNcIiIsIndlYnBhY2s6Ly9jb2FjaC16b25lLWZyb250ZW5kL2lnbm9yZWR8QzpcXFVzZXJzXFxLYW1pbFxcRGVza3RvcFxcY29hY2gtem9uZVxcZnJvbnRlbmRcXG5vZGVfbW9kdWxlc1xcbmV4dFxcZGlzdFxcbmV4dC1zZXJ2ZXJcXGxpYlxccm91dGVyfC4vdXRpbHMvcmVzb2x2ZS1yZXdyaXRlcyJdLCJuYW1lcyI6WyJFcnJvclN0eWxlcyIsInN0eWxlZCIsIkRpc3BsYXlFcnJvciIsImVycm9yIiwibWVzc2FnZSIsIm5ldHdvcmtFcnJvciIsInJlc3VsdCIsImVycm9ycyIsImxlbmd0aCIsIm1hcCIsImkiLCJyZXBsYWNlIiwiZGVmYXVsdFByb3BzIiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwib2JqZWN0IiwiTG9nbyIsIkhlYWRlclN0eWxlcyIsIkhlYWRlciIsIlRFQU1fUVVFUlkiLCJncWwiLCJOYXYiLCJkYXRhIiwibG9hZGluZyIsInVzZVF1ZXJ5IiwidXNlciIsInVzZVVzZXIiLCJvcGVuVHJhaW5pbmciLCJ1c2VUcmFpbmluZyIsImlkIiwidHJhaW5pbmciLCJyZWR1Y2UiLCJ0YWxseSIsInRyYWluaW5nSXRlbSIsInF1YW50aXR5IiwiR2xvYmFsU3R5bGVzIiwiY3JlYXRlR2xvYmFsU3R5bGUiLCJJbm5lclN0eWxlcyIsIlBhZ2UiLCJjaGlsZHJlbiIsImFueSIsIlBBR0lOQVRJT05fUVVFUlkiLCJQYWdpbmF0aW9uIiwicGFnZSIsImNvdW50IiwiX2FsbEV4ZXJjaXNlc01ldGEiLCJwYWdlQ291bnQiLCJNYXRoIiwiY2VpbCIsInBlclBhZ2UiLCJCaWdCdXR0b24iLCJSRU1PVkVfRlJPTV9UUkFJTklOR19NVVRBVElPTiIsIlJlbW92ZUZyb21UcmFpbmluZyIsInJlbW92ZUZyb21UcmFpbmluZyIsInVzZU11dGF0aW9uIiwidmFyaWFibGVzIiwicmVmZXRjaFF1ZXJpZXMiLCJxdWVyeSIsIkNVUlJFTlRfVVNFUl9RVUVSWSIsIlNFQVJDSF9FWEVSQ0lTRVNfUVVFUlkiLCJTZWFyY2giLCJyb3V0ZXIiLCJ1c2VSb3V0ZXIiLCJmaW5kSXRlbXMiLCJ1c2VMYXp5UXVlcnkiLCJmZXRjaFBvbGljeSIsIml0ZW1zIiwic2VhcmNoVGVybXMiLCJmaW5kSXRlbXNCdXRDaGlsbCIsImRlYm91bmNlIiwicmVzZXRJZENvdW50ZXIiLCJpc09wZW4iLCJpbnB1dFZhbHVlIiwiZ2V0TWVudVByb3BzIiwiZ2V0SW5wdXRQcm9wcyIsImdldENvbWJvYm94UHJvcHMiLCJnZXRJdGVtUHJvcHMiLCJoaWdobGlnaHRlZEluZGV4IiwidXNlQ29tYm9ib3giLCJvbklucHV0VmFsdWVDaGFuZ2UiLCJzZWFyY2hUZXJtIiwib25TZWxlY3RlZEl0ZW1DaGFuZ2UiLCJzZWxlY3RlZEl0ZW0iLCJwdXNoIiwicGF0aG5hbWUiLCJpdGVtVG9TdHJpbmciLCJpdGVtIiwibmFtZSIsInR5cGUiLCJwbGFjZWhvbGRlciIsImNsYXNzTmFtZSIsImluZGV4IiwicGhvdG8iLCJpbWFnZSIsInB1YmxpY1VybFRyYW5zZm9ybWVkIiwiU0lHTl9PVVRfTVVUQVRJT04iLCJTaWduT3V0Iiwic2lnbm91dCIsIlRyYWluaW5nSXRlbVN0eWxlcyIsIlRyYWluaW5nSXRlbSIsImV4ZXJjaXNlIiwicG9zaXRpb24iLCJUcmFpbmluZyIsIm1lIiwidHJhaW5pbmdPcGVuIiwiY2xvc2VUcmFpbmluZyIsIkRvdCIsIkFuaW1hdGlvblN0eWxlcyIsIlRyYWluaW5nQ291bnQiLCJlbnRlciIsImV4aXQiLCJhdXRoZW50aWNhdGVkSXRlbSIsIkNsb3NlQnV0dG9uIiwiRHJvcERvd24iLCJEcm9wRG93bkl0ZW0iLCJwcm9wcyIsImhpZ2hsaWdodGVkIiwidGhlbWUiLCJsaWdodGdyZXkiLCJnbG93Iiwia2V5ZnJhbWVzIiwiU2VhcmNoU3R5bGVzIiwiTmF2U3R5bGVzIiwiUGFnaW5hdGlvblN0eWxlcyIsIlN1cHJlbWUiLCJUcmFpbmluZ1N0eWxlcyIsIm9wZW4iLCJlbmRwb2ludCIsInByb2RFbmRwb2ludCIsInBhZ2luYXRpb25GaWVsZCIsImtleUFyZ3MiLCJyZWFkIiwiZXhpc3RpbmciLCJhcmdzIiwiY2FjaGUiLCJza2lwIiwiZmlyc3QiLCJyZWFkUXVlcnkiLCJwYWdlcyIsInNsaWNlIiwiZmlsdGVyIiwieCIsIm1lcmdlIiwiaW5jb21pbmciLCJtZXJnZWQiLCJjb25zb2xlIiwibG9nIiwiTG9jYWxTdGF0ZUNvbnRleHQiLCJjcmVhdGVDb250ZXh0IiwiTG9jYWxTdGF0ZVByb3ZpZGVyIiwiUHJvdmlkZXIiLCJUcmFpbmluZ1N0YXRlUHJvdmlkZXIiLCJzZXRUcmFpbmluZ09wZW4iLCJ1c2VTdGF0ZSIsInRvZ2dsZVRyYWluaW5nIiwiYWxsIiwidXNlQ29udGV4dCIsImNyZWF0ZUNsaWVudCIsImhlYWRlcnMiLCJpbml0aWFsU3RhdGUiLCJBcG9sbG9DbGllbnQiLCJsaW5rIiwiQXBvbGxvTGluayIsIm9uRXJyb3IiLCJncmFwaFFMRXJyb3JzIiwiZm9yRWFjaCIsImxvY2F0aW9ucyIsInBhdGgiLCJjcmVhdGVVcGxvYWRMaW5rIiwidXJpIiwiZmV0Y2hPcHRpb25zIiwiY3JlZGVudGlhbHMiLCJJbk1lbW9yeUNhY2hlIiwidHlwZVBvbGljaWVzIiwiUXVlcnkiLCJmaWVsZHMiLCJyZXN0b3JlIiwid2l0aEFwb2xsbyIsImdldERhdGFGcm9tVHJlZSIsIlJvdXRlciIsIk5Qcm9ncmVzcyIsIk15QXBwIiwiQ29tcG9uZW50IiwicGFnZVByb3BzIiwiYXBvbGxvIiwiZ2V0SW5pdGlhbFByb3BzIiwiY3R4Iiwid2l0aERhdGEiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFFQTtBQUVBLE1BQU1BLFdBQVcsR0FBR0MsdUVBQUg7QUFBQTtBQUFBO0FBQUEsc0tBQWpCOztBQWVBLE1BQU1DLFlBQVksR0FBRyxDQUFDO0FBQUVDO0FBQUYsQ0FBRCxLQUFlO0FBQ2xDLE1BQUksQ0FBQ0EsS0FBRCxJQUFVLENBQUNBLEtBQUssQ0FBQ0MsT0FBckIsRUFBOEIsT0FBTyxJQUFQOztBQUM5QixNQUFJRCxLQUFLLENBQUNFLFlBQU4sSUFBc0JGLEtBQUssQ0FBQ0UsWUFBTixDQUFtQkMsTUFBekMsSUFBbURILEtBQUssQ0FBQ0UsWUFBTixDQUFtQkMsTUFBbkIsQ0FBMEJDLE1BQTFCLENBQWlDQyxNQUF4RixFQUFnRztBQUM5RixXQUFPTCxLQUFLLENBQUNFLFlBQU4sQ0FBbUJDLE1BQW5CLENBQTBCQyxNQUExQixDQUFpQ0UsR0FBakMsQ0FBcUMsQ0FBQ04sS0FBRCxFQUFRTyxDQUFSLGtCQUMxQyw4REFBQyxX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Ozs7Ozs7O0FDQUEsb0Q7Ozs7Ozs7Ozs7O0FDQUEsbUQ7Ozs7Ozs7Ozs7O0FDQUEsK0M7Ozs7Ozs7Ozs7QUNBQSxlIiwiZmlsZSI6InBhZ2VzL19hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmNvbnN0IEVycm9yU3R5bGVzID0gc3R5bGVkLmRpdmBcbiAgcGFkZGluZzogMnJlbTtcbiAgYmFja2dyb3VuZDogd2hpdGU7XG4gIG1hcmdpbjogMnJlbSAwO1xuICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDAsIDAsIDAsIDAuMDUpO1xuICBib3JkZXItbGVmdDogNXB4IHNvbGlkIHJlZDtcbiAgcCB7XG4gICAgbWFyZ2luOiAwO1xuICAgIGZvbnQtd2VpZ2h0OiAxMDA7XG4gIH1cbiAgc3Ryb25nIHtcbiAgICBtYXJnaW4tcmlnaHQ6IDFyZW07XG4gIH1cbmA7XG5cbmNvbnN0IERpc3BsYXlFcnJvciA9ICh7IGVycm9yIH0pID0+IHtcbiAgaWYgKCFlcnJvciB8fCAhZXJyb3IubWVzc2FnZSkgcmV0dXJuIG51bGw7XG4gIGlmIChlcnJvci5uZXR3b3JrRXJyb3IgJiYgZXJyb3IubmV0d29ya0Vycm9yLnJlc3VsdCAmJiBlcnJvci5uZXR3b3JrRXJyb3IucmVzdWx0LmVycm9ycy5sZW5ndGgpIHtcbiAgICByZXR1cm4gZXJyb3IubmV0d29ya0Vycm9yLnJlc3VsdC5lcnJvcnMubWFwKChlcnJvciwgaSkgPT4gKFxuICAgICAgPEVycm9yU3R5bGVzIGtleT17aX0+XG4gICAgICAgIDxwIGRhdGEtdGVzdD1cImdyYXBocWwtZXJyb3JcIj5cbiAgICAgICAgICA8c3Ryb25nPlNob290ITwvc3Ryb25nPlxuICAgICAgICAgIHtlcnJvci5tZXNzYWdlLnJlcGxhY2UoJ0dyYXBoUUwgZXJyb3I6ICcsICcnKX1cbiAgICAgICAgPC9wPlxuICAgICAgPC9FcnJvclN0eWxlcz5cbiAgICApKTtcbiAgfVxuICByZXR1cm4gKFxuICAgIDxFcnJvclN0eWxlcz5cbiAgICAgIDxwIGRhdGEtdGVzdD1cImdyYXBocWwtZXJyb3JcIj5cbiAgICAgICAgPHN0cm9uZz5TaG9vdCE8L3N0cm9uZz5cbiAgICAgICAge2Vycm9yLm1lc3NhZ2UucmVwbGFjZSgnR3JhcGhRTCBlcnJvcjogJywgJycpfVxuICAgICAgPC9wPlxuICAgIDwvRXJyb3JTdHlsZXM+XG4gICk7XG59O1xuXG5EaXNwbGF5RXJyb3IuZGVmYXVsdFByb3BzID0ge1xuICBlcnJvcjoge30sXG59O1xuXG5EaXNwbGF5RXJyb3IucHJvcFR5cGVzID0ge1xuICBlcnJvcjogUHJvcFR5cGVzLm9iamVjdCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IERpc3BsYXlFcnJvcjtcbiIsImltcG9ydCBMaW5rIGZyb20gJ25leHQvbGluayc7XHJcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xyXG5pbXBvcnQgTmF2IGZyb20gJy4vTmF2JztcclxuaW1wb3J0IFRyYWluaW5nIGZyb20gJy4vVHJhaW5pbmcnO1xyXG5pbXBvcnQgU2VhcmNoIGZyb20gJy4vU2VhcmNoJztcclxuXHJcbmNvbnN0IExvZ28gPSBzdHlsZWQuaDFgXHJcbiAgZm9udC1zaXplOiA0cmVtO1xyXG4gIG1hcmdpbi1sZWZ0OiAycmVtO1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICB6LWluZGV4OiAyO1xyXG4gIGJhY2tncm91bmQ6IGJsYWNrO1xyXG4gIHRyYW5zZm9ybTogc2tldygtMjBkZWcpO1xyXG4gIGEge1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcclxuICAgIHBhZGRpbmc6IDAuNXJlbSAxcmVtO1xyXG4gIH1cclxuYDtcclxuXHJcbmNvbnN0IEhlYWRlclN0eWxlcyA9IHN0eWxlZC5oZWFkZXJgXHJcbiAgLmJhciB7XHJcbiAgICBib3JkZXItYm90dG9tOiAxMHB4IHNvbGlkIHZhcigtLWJsYWNrLCBibGFjayk7XHJcbiAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBhdXRvIDFmcjtcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICAgIGFsaWduLWl0ZW1zOiBzdHJldGNoO1xyXG4gIH1cclxuXHJcbiAgLnN1Yi1iYXIge1xyXG4gICAgZGlzcGxheTogZ3JpZDtcclxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIGF1dG87XHJcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgdmFyKC0tYmxhY2ssIGJsYWNrKTtcclxuICB9XHJcbmA7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBIZWFkZXIoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgPEhlYWRlclN0eWxlcz5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJiYXJcIj5cclxuICAgICAgICA8TG9nbz5cclxuICAgICAgICAgIDxMaW5rIGhyZWY9XCIvXCI+Q29hY2ggWm9uZTwvTGluaz5cclxuICAgICAgICA8L0xvZ28+XHJcbiAgICAgICAgPE5hdiAvPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdWItYmFyXCI+XHJcbiAgICAgICAgPFNlYXJjaCAvPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPFRyYWluaW5nIC8+XHJcbiAgICA8L0hlYWRlclN0eWxlcz5cclxuICApO1xyXG59IiwiaW1wb3J0IExpbmsgZnJvbSAnbmV4dC9saW5rJ1xyXG5pbXBvcnQgTmF2U3R5bGVzIGZyb20gJy4vc3R5bGVzL05hdlN0eWxlcyc7XHJcbmltcG9ydCB7IHVzZVVzZXIgfSBmcm9tICcuL1VzZXInO1xyXG5pbXBvcnQgU2lnbk91dCBmcm9tICcuL1NpZ25PdXQnO1xyXG5pbXBvcnQgeyB1c2VUcmFpbmluZyB9IGZyb20gJy4uL2xpYi90cmFpbmluZ1N0YXRlJztcclxuaW1wb3J0IFRyYWluaW5nQ291bnQgZnJvbSAnLi9UcmFpbmluZ0NvdW50JztcclxuaW1wb3J0IHsgdXNlUXVlcnkgfSBmcm9tICdAYXBvbGxvL2NsaWVudCc7XHJcbmltcG9ydCBncWwgZnJvbSAnZ3JhcGhxbC10YWcnO1xyXG5cclxuY29uc3QgVEVBTV9RVUVSWSA9IGdxbGBcclxuICAgIHF1ZXJ5IFVTRVJfVEVBTV9RVUVSWSB7XHJcbiAgICAgICAgYWxsVGVhbXMge1xyXG4gICAgICAgICAgICBpZFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuYFxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTmF2KCkge1xyXG4gICAgY29uc3QgeyBkYXRhLCBlcnJvciwgbG9hZGluZyB9ID0gdXNlUXVlcnkoVEVBTV9RVUVSWSk7XHJcbiAgICBjb25zdCB1c2VyID0gdXNlVXNlcigpO1xyXG4gICAgY29uc3QgeyBvcGVuVHJhaW5pbmcgfSA9IHVzZVRyYWluaW5nKCk7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxOYXZTdHlsZXM+XHJcbiAgICAgICAgICAgIDxMaW5rIGhyZWY9XCIvZXhlcmNpc2VzXCI+RXhlcmNpc2VzPC9MaW5rPlxyXG4gICAgICAgICAgICA8TGluayBocmVmPVwiL3RpbWVcIj5UaW1lPC9MaW5rPiAgXHJcbiAgICAgICAgICAgIHt1c2VyICYmIChcclxuICAgICAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgICAgICAgPExpbmsgaHJlZj1cIi9hZGRFeGVyY2lzZVwiPkFkZCBFeGVyY2lzZTwvTGluaz5cclxuICAgICAgICAgICAgICAgICAgICA8TGluayBocmVmPVwiL2NhbGVuZGFyXCI+Q2FsZW5kYXI8L0xpbms+XHJcbiAgICAgICAgICAgICAgICAgICAgPExpbmsgaHJlZj17YC90ZWFtLyR7ZGF0YS5pZH1gfT5UZWFtPC9MaW5rPlxyXG4gICAgICAgICAgICAgICAgICAgIDxMaW5rIGhyZWY9XCIvYWRkUGxheWVyXCI+QWRkIFBsYXllcjwvTGluaz5cclxuICAgICAgICAgICAgICAgICAgICA8TGluayBocmVmPVwiL2FjY291bnRcIj5BY2NvdW50PC9MaW5rPiAgXHJcbiAgICAgICAgICAgICAgICAgICAgPFNpZ25PdXQgLz5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9J2J1dHRvbicgb25DbGljaz17b3BlblRyYWluaW5nfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgTXkgVHJhaW5pbmdcclxuICAgICAgICAgICAgICAgICAgICAgICAgPFRyYWluaW5nQ291bnQgY291bnQ9e3VzZXIudHJhaW5pbmcucmVkdWNlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKHRhbGx5LCB0cmFpbmluZ0l0ZW0pID0+IHRhbGx5ICsgdHJhaW5pbmdJdGVtLnF1YW50aXR5LCAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgeyF1c2VyICYmIChcclxuICAgICAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgICAgICAgPExpbmsgaHJlZj1cIi9zaWduaW5cIj5TaWduIEluPC9MaW5rPlxyXG4gICAgICAgICAgICAgICAgPC8+XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgPC9OYXZTdHlsZXM+XHJcbiAgICApXHJcbn0iLCJpbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xyXG5pbXBvcnQgc3R5bGVkLCB7IGNyZWF0ZUdsb2JhbFN0eWxlIH0gZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xyXG5pbXBvcnQgSGVhZGVyIGZyb20gXCIuL0hlYWRlclwiO1xyXG5cclxuXHJcbmNvbnN0IEdsb2JhbFN0eWxlcyA9IGNyZWF0ZUdsb2JhbFN0eWxlYFxyXG4gIEBmb250LWZhY2Uge1xyXG4gICAgZm9udC1mYW1pbHk6ICdyYWRuaWthX25leHQnO1xyXG4gICAgc3JjOiB1cmwoJy9zdGF0aWMvcmFkbmlrYW5leHQtbWVkaXVtLXdlYmZvbnQud29mZjInKSBmb3JtYXQoJ3dvZmYyJyk7XHJcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xyXG4gICAgZm9udC1zdHlsZTogbm9ybWFsO1xyXG4gIH1cclxuICBodG1sIHtcclxuICAgIC0tcmVkOiAjZmYwMDAwO1xyXG4gICAgLS1ibGFjazogIzM5MzkzOTtcclxuICAgIC0tZ3JleTogIzNBM0EzQTtcclxuICAgIC0tZ3JheTogdmFyKC0tZ3JleSk7IFxyXG4gICAgLS1saWdodEdyZXk6ICNlMWUxZTE7XHJcbiAgICAtLWxpZ2h0R3JheTogdmFyKC0tbGlnaHRHcmV5KTtcclxuICAgIC0tb2ZmV2hpdGU6ICNlZGVkZWQ7XHJcbiAgICAtLW1heFdpZHRoOiAxMDAwcHg7XHJcbiAgICAtLWJzOiAwIDEycHggMjRweCAwIHJnYmEoMCwwLDAsMC4wOSk7IFxyXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxuICAgIGZvbnQtc2l6ZTogNjIuNSU7XHJcbiAgfVxyXG4gICosICo6YmVmb3JlLCAqOmFmdGVyIHtcclxuICAgIGJveC1zaXppbmc6IGluaGVyaXQ7XHJcbiAgfVxyXG4gIGJvZHkge1xyXG4gICAgZm9udC1mYW1pbHk6ICdyYWRuaWthX25leHQnLCAtLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCAnU2Vnb2UgVUknLCBSb2JvdG8sIE94eWdlbiwgVWJ1bnR1LCBDYW50YXJlbGwsICdPcGVuIFNhbnMnLCAnSGVsdmV0aWNhIE5ldWUnLCBzYW5zLXNlcmlmO1xyXG4gICAgcGFkZGluZzogMDtcclxuICAgIG1hcmdpbjogMDtcclxuICAgIGZvbnQtc2l6ZTogMS41cmVtO1xyXG4gICAgbGluZS1oZWlnaHQ6MjtcclxuICB9XHJcbiAgYSB7XHJcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcbiAgICBjb2xvcjogdmFyKC0tLWJsYWNrKTtcclxuICB9XHJcbiAgYTpob3ZlciB7XHJcbiAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcclxuICB9XHJcbiAgYnV0dG9uIHtcclxuICAgIGZvbnQtZmFtaWx5OiAncmFkbmlrYV9uZXh0JywgLS1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgJ1NlZ29lIFVJJywgUm9ib3RvLCBPeHlnZW4sIFVidW50dSwgQ2FudGFyZWxsLCAnT3BlbiBTYW5zJywgJ0hlbHZldGljYSBOZXVlJyxcclxuICB9XHJcbmA7XHJcblxyXG5jb25zdCBJbm5lclN0eWxlcyA9IHN0eWxlZC5kaXZgXHJcbiAgbWF4LXdpZHRoOiB2YXIoLS1tYXhXaWR0aCk7XHJcbiAgbWFyZ2luOiAwIGF1dG87XHJcbiAgcGFkZGluZzogMnJlbTtcclxuYDtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFBhZ2Uoe2NoaWxkcmVufSkge1xyXG4gICAgcmV0dXJuIChcclxuICAgIDxkaXY+XHJcbiAgICAgICAgPEdsb2JhbFN0eWxlcz48L0dsb2JhbFN0eWxlcz5cclxuICAgICAgICA8SGVhZGVyPjwvSGVhZGVyPlxyXG4gICAgICAgIDxJbm5lclN0eWxlcz57Y2hpbGRyZW59PC9Jbm5lclN0eWxlcz5cclxuICAgIDwvZGl2PlxyXG4gICAgKTtcclxufVxyXG5cclxuUGFnZS5wcm9wVHlwZXMgPSB7XHJcbiAgICBjaGlsZHJlbjogUHJvcFR5cGVzLmFueSxcclxuICB9OyIsImltcG9ydCB7IHVzZVF1ZXJ5IH0gZnJvbSAnQGFwb2xsby9jbGllbnQnO1xyXG5pbXBvcnQgZ3FsIGZyb20gJ2dyYXBocWwtdGFnJztcclxuaW1wb3J0IEhlYWQgZnJvbSAnbmV4dC9oZWFkJztcclxuaW1wb3J0IExpbmsgZnJvbSAnbmV4dC9saW5rJztcclxuaW1wb3J0IFBhZ2luYXRpb25TdHlsZXMgZnJvbSAnLi9zdHlsZXMvUGFnaW5hdGlvblN0eWxlcyc7XHJcbmltcG9ydCBEaXNwbGF5RXJyb3IgZnJvbSAnLi9FcnJvck1lc3NhZ2UnO1xyXG5pbXBvcnQgeyBwZXJQYWdlIH0gZnJvbSAnLi4vY29uZmlnJztcclxuXHJcbmNvbnN0IFBBR0lOQVRJT05fUVVFUlkgPSBncWxgXHJcbiAgICBxdWVyeSBQQUdJTkFUSU9OX1FVRVJZIHtcclxuICAgICAgICBfYWxsRXhlcmNpc2VzTWV0YSB7XHJcbiAgICAgICAgICAgIGNvdW50XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5gO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUGFnaW5hdGlvbih7cGFnZX0pIHtcclxuICAgIGNvbnN0IHtkYXRhLCBsb2FkaW5nLCBlcnJvcn0gPSB1c2VRdWVyeShQQUdJTkFUSU9OX1FVRVJZKTtcclxuICAgIGlmIChsb2FkaW5nKSByZXR1cm4gJ0xvYWRpbmcuLi4nO1xyXG4gICAgaWYgKGVycm9yKSByZXR1cm4gPERpc3BsYXlFcnJvciBlcnJvcj17ZXJyb3J9IC8+O1xyXG4gICAgY29uc3Qge2NvdW50fSA9IGRhdGEuX2FsbEV4ZXJjaXNlc01ldGE7XHJcbiAgICBjb25zdCBwYWdlQ291bnQgPSBNYXRoLmNlaWwoY291bnQgLyBwZXJQYWdlKTtcclxuICAgIHJldHVybihcclxuICAgIDxQYWdpbmF0aW9uU3R5bGVzPlxyXG4gICAgICAgIDxIZWFkPlxyXG4gICAgICAgICAgICA8dGl0bGU+Q29hY2ggWm9uZSAtIFBhZ2Uge3BhZ2V9IG9mIHtwYWdlQ291bnR9PC90aXRsZT5cclxuICAgICAgICA8L0hlYWQ+XHJcbiAgICAgICAgPExpbmsgaHJlZj17YC9leGVyY2lzZXMvJHtwYWdlIC0gMX1gfT5cclxuICAgICAgICAgICAgPGEgYXJpYS1kaXNhYmxlZD17cGFnZSA8PSAxfT7ihpAgUHJldjwvYT5cclxuICAgICAgICA8L0xpbms+XHJcbiAgICAgICAgPHA+UGFnZSB7cGFnZX0gb2Yge3BhZ2VDb3VudH08L3A+XHJcbiAgICAgICAgPHA+e2NvdW50fSBJdGVtcyBUb3RhbDwvcD5cclxuICAgICAgICA8TGluayBocmVmPXtgL2V4ZXJjaXNlcy8ke3BhZ2UgKyAxfWB9PlxyXG4gICAgICAgICAgICA8YSBhcmlhLWRpc2FibGVkPXtwYWdlID49IHBhZ2VDb3VudH0+TmV4dCDihpI8L2E+XHJcbiAgICAgICAgPC9MaW5rPlxyXG4gICAgPC9QYWdpbmF0aW9uU3R5bGVzPlxyXG4gICAgKVxyXG59XHJcblxyXG4iLCJpbXBvcnQgeyB1c2VNdXRhdGlvbiB9IGZyb20gJ0BhcG9sbG8vY2xpZW50JztcclxuaW1wb3J0IGdxbCBmcm9tICdncmFwaHFsLXRhZyc7XHJcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xyXG5pbXBvcnQgeyBDVVJSRU5UX1VTRVJfUVVFUlkgfSBmcm9tICcuL1VzZXInO1xyXG5cclxuY29uc3QgQmlnQnV0dG9uID0gc3R5bGVkLmJ1dHRvbmBcclxuICBmb250LXNpemU6IDNyZW07XHJcbiAgYmFja2dyb3VuZDogbm9uZTtcclxuICBib3JkZXI6IDA7XHJcbiAgJjpob3ZlciB7XHJcbiAgICBjb2xvcjogdmFyKC0tcmVkKTtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICB9XHJcbmA7XHJcblxyXG5jb25zdCBSRU1PVkVfRlJPTV9UUkFJTklOR19NVVRBVElPTiA9IGdxbGBcclxuICBtdXRhdGlvbiBSRU1PVkVfRlJPTV9UUkFJTklOR19NVVRBVElPTigkaWQ6IElEISkge1xyXG4gICAgZGVsZXRlVHJhaW5pbmdJdGVtKGlkOiAkaWQpIHtcclxuICAgICAgaWRcclxuICAgIH1cclxuICB9XHJcbmA7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUmVtb3ZlRnJvbVRyYWluaW5nKHsgaWQgfSkge1xyXG4gICAgY29uc3QgW3JlbW92ZUZyb21UcmFpbmluZywgeyBsb2FkaW5nIH1dID0gdXNlTXV0YXRpb24oUkVNT1ZFX0ZST01fVFJBSU5JTkdfTVVUQVRJT04sIHtcclxuICAgICAgICB2YXJpYWJsZXM6IHsgaWQgfSxcclxuICAgICAgICByZWZldGNoUXVlcmllczogW3sgcXVlcnk6IENVUlJFTlRfVVNFUl9RVUVSWSB9XSxcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIChcclxuICAgIDxCaWdCdXR0b25cclxuICAgICAgICBvbkNsaWNrPXtyZW1vdmVGcm9tVHJhaW5pbmd9XHJcbiAgICAgICAgZGlzYWJsZWQ9e2xvYWRpbmd9XHJcbiAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgdGl0bGU9J1JlbW92ZSB0aGlzIGV4ZXJjaXNlIGZyb20gdHJhaW5pbmcnXHJcbiAgICA+XHJcbiAgICAgICAgJnRpbWVzO1xyXG4gICAgPC9CaWdCdXR0b24+XHJcbiAgICApO1xyXG59IiwiaW1wb3J0IHsgdXNlTGF6eVF1ZXJ5IH0gZnJvbSAnQGFwb2xsby9jbGllbnQnO1xyXG5pbXBvcnQgeyByZXNldElkQ291bnRlciwgdXNlQ29tYm9ib3ggfSBmcm9tICdkb3duc2hpZnQnO1xyXG5pbXBvcnQgZ3FsIGZyb20gJ2dyYXBocWwtdGFnJztcclxuaW1wb3J0IGRlYm91bmNlIGZyb20gJ2xvZGFzaC5kZWJvdW5jZSc7XHJcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gJ25leHQvZGlzdC9jbGllbnQvcm91dGVyJztcclxuaW1wb3J0IHsgRHJvcERvd24sIERyb3BEb3duSXRlbSwgU2VhcmNoU3R5bGVzIH0gZnJvbSAnLi9zdHlsZXMvRHJvcERvd24nO1xyXG5cclxuY29uc3QgU0VBUkNIX0VYRVJDSVNFU19RVUVSWSA9IGdxbGBcclxuICAgIHF1ZXJ5IFNFQVJDSF9FWEVSQ0lTRVNfUVVFUlkoJHNlYXJjaFRlcm06IFN0cmluZyEpIHtcclxuICAgICAgICBzZWFyY2hUZXJtczogYWxsRXhlcmNpc2VzKFxyXG4gICAgICAgICAgICB3aGVyZToge1xyXG4gICAgICAgICAgICAgICAgT1I6IFtcclxuICAgICAgICAgICAgICAgICAgICB7IG5hbWVfY29udGFpbnNfaTogJHNlYXJjaFRlcm0gfVxyXG4gICAgICAgICAgICAgICAgICAgIHsgZGVzY3JpcHRpb25fY29udGFpbnNfaTogJHNlYXJjaFRlcm0gfVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIGlkXHJcbiAgICAgICAgICAgIG5hbWVcclxuICAgICAgICAgICAgcGhvdG8ge1xyXG4gICAgICAgICAgICAgICAgaW1hZ2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHB1YmxpY1VybFRyYW5zZm9ybWVkXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbmA7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTZWFyY2goKSB7XHJcbiAgICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcclxuICAgIGNvbnN0IFtmaW5kSXRlbXMsIHsgbG9hZGluZywgZGF0YSwgZXJyb3IgfV0gPSB1c2VMYXp5UXVlcnkoXHJcbiAgICAgICAgU0VBUkNIX0VYRVJDSVNFU19RVUVSWSwge1xyXG4gICAgICAgICAgICBmZXRjaFBvbGljeTogJ25vLWNhY2hlJyxcclxuICAgICAgICB9XHJcbiAgICApO1xyXG4gICAgY29uc3QgaXRlbXMgPSBkYXRhPy5zZWFyY2hUZXJtcyB8fCBbXTtcclxuICAgIGNvbnN0IGZpbmRJdGVtc0J1dENoaWxsID0gZGVib3VuY2UoZmluZEl0ZW1zLCAzNTApO1xyXG4gICAgcmVzZXRJZENvdW50ZXIoKTtcclxuICAgIGNvbnN0IHtcclxuICAgICAgICBpc09wZW4sXHJcbiAgICAgICAgaW5wdXRWYWx1ZSxcclxuICAgICAgICBnZXRNZW51UHJvcHMsXHJcbiAgICAgICAgZ2V0SW5wdXRQcm9wcyxcclxuICAgICAgICBnZXRDb21ib2JveFByb3BzLFxyXG4gICAgICAgIGdldEl0ZW1Qcm9wcyxcclxuICAgICAgICBoaWdobGlnaHRlZEluZGV4LFxyXG4gICAgfSA9IHVzZUNvbWJvYm94KHtcclxuICAgICAgICBpdGVtcyxcclxuICAgICAgICBvbklucHV0VmFsdWVDaGFuZ2UoKSB7XHJcbiAgICAgICAgICAgIGZpbmRJdGVtc0J1dENoaWxsKHtcclxuICAgICAgICAgICAgICAgIHZhcmlhYmxlczoge1xyXG4gICAgICAgICAgICAgICAgc2VhcmNoVGVybTogaW5wdXRWYWx1ZSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBvblNlbGVjdGVkSXRlbUNoYW5nZSh7IHNlbGVjdGVkSXRlbSB9KSB7XHJcbiAgICAgICAgcm91dGVyLnB1c2goe1xyXG4gICAgICAgICAgICBwYXRobmFtZTogYC9leGVyY2lzZS8ke3NlbGVjdGVkSXRlbS5pZH1gLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIGl0ZW1Ub1N0cmluZzogKGl0ZW0pID0+IGl0ZW0/Lm5hbWUgfHwgJycsXHJcbiAgICB9KTtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPFNlYXJjaFN0eWxlcz5cclxuICAgICAgICAgICAgPGRpdiB7Li4uZ2V0Q29tYm9ib3hQcm9wcygpfT5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCB7Li4uZ2V0SW5wdXRQcm9wcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3NlYXJjaCcsXHJcbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdTZWFyY2ggZm9yIGFuIEV4ZXJjaXNlJyxcclxuICAgICAgICAgICAgICAgICAgICBpZDogJ3NlYXJjaCcsXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBsb2FkaW5nID8gJ2xvYWRpbmcnIDogJycsXHJcbiAgICAgICAgICAgICAgICB9KX1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxEcm9wRG93biB7Li4uZ2V0TWVudVByb3BzKCl9PlxyXG4gICAgICAgICAgICB7aXNPcGVuICYmIGl0ZW1zLm1hcCgoaXRlbSwgaW5kZXgpID0+IChcclxuICAgICAgICAgICAgICAgIDxEcm9wRG93bkl0ZW0gey4uLmdldEl0ZW1Qcm9wcyh7IGl0ZW0sIGluZGV4IH0pfVxyXG4gICAgICAgICAgICAgICAga2V5PXtpdGVtLmlkfVxyXG4gICAgICAgICAgICAgICAgaGlnaGxpZ2h0ZWQ9e2luZGV4ID09PSBoaWdobGlnaHRlZEluZGV4fVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgPGltZ1xyXG4gICAgICAgICAgICAgICAgICAgIHNyYz17aXRlbS5waG90by5pbWFnZS5wdWJsaWNVcmxUcmFuc2Zvcm1lZH1cclxuICAgICAgICAgICAgICAgICAgICBhbHQ9e2l0ZW0ubmFtZX1cclxuICAgICAgICAgICAgICAgICAgICB3aWR0aD1cIjUwXCJcclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICB7aXRlbS5uYW1lfVxyXG4gICAgICAgICAgICAgICAgPC9Ecm9wRG93bkl0ZW0+XHJcbiAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICB7aXNPcGVuICYmICFpdGVtcy5sZW5ndGggJiYgIWxvYWRpbmcgJiYgKFxyXG4gICAgICAgICAgICAgICAgPERyb3BEb3duSXRlbT5Tb3JyeSwgTm8gZXhlcmNpc2VzIGZvdW5kIGZvciB7aW5wdXRWYWx1ZX08L0Ryb3BEb3duSXRlbT5cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICA8L0Ryb3BEb3duPlxyXG4gICAgICAgIDwvU2VhcmNoU3R5bGVzPlxyXG4gICAgKTtcclxufVxyXG4iLCJpbXBvcnQgZ3FsIGZyb20gXCJncmFwaHFsLXRhZ1wiO1xyXG5pbXBvcnQge0NVUlJFTlRfVVNFUl9RVUVSWX0gZnJvbSBcIi4vVXNlclwiO1xyXG5pbXBvcnQgeyB1c2VNdXRhdGlvbiB9IGZyb20gJ0BhcG9sbG8vY2xpZW50JztcclxuXHJcbmNvbnN0IFNJR05fT1VUX01VVEFUSU9OID0gZ3FsYFxyXG4gICAgbXV0YXRpb24ge1xyXG4gICAgICAgIGVuZFNlc3Npb25cclxuICAgIH1cclxuYDtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFNpZ25PdXQoKSB7XHJcbiAgICBjb25zdCBbc2lnbm91dF0gPSB1c2VNdXRhdGlvbihTSUdOX09VVF9NVVRBVElPTiwge1xyXG4gICAgICAgIHJlZmV0Y2hRdWVyaWVzOiBbe3F1ZXJ5OiBDVVJSRU5UX1VTRVJfUVVFUll9XSxcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIChcclxuICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9e3NpZ25vdXR9PlxyXG4gICAgICAgIFNpbmcgT3V0XHJcbiAgICA8L2J1dHRvbj5cclxuICAgICk7XHJcbn0iLCJpbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcclxuaW1wb3J0IHsgdXNlVXNlciB9IGZyb20gJy4vVXNlcic7XHJcbmltcG9ydCBUcmFpbmluZ1N0eWxlcyBmcm9tICcuL3N0eWxlcy9UcmFpbmluZ1N0eWxlcyc7XHJcbmltcG9ydCBTdXByZW1lIGZyb20gJy4vc3R5bGVzL1N1cHJlbWUnO1xyXG5pbXBvcnQgeyB1c2VUcmFpbmluZyB9IGZyb20gJy4uL2xpYi90cmFpbmluZ1N0YXRlJyBcclxuaW1wb3J0IENsb3NlQnV0dG9uIGZyb20gJy4vc3R5bGVzL0Nsb3NlQnV0dG9uJztcclxuaW1wb3J0IFJlbW92ZUZyb21UcmFpbmluZyBmcm9tICcuL1JlbW92ZUZyb21UcmFpbmluZyc7XHJcblxyXG5jb25zdCBUcmFpbmluZ0l0ZW1TdHlsZXMgPSBzdHlsZWQubGlgXHJcbiAgcGFkZGluZzogMXJlbSAwO1xyXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB2YXIoLS1saWdodEdyZXkpO1xyXG4gIGRpc3BsYXk6IGdyaWQ7XHJcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBhdXRvIDFmciBhdXRvO1xyXG4gIGltZyB7XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDFyZW07XHJcbiAgfVxyXG4gIGgzLFxyXG4gIHAge1xyXG4gICAgbWFyZ2luOiAwO1xyXG4gIH0sXHJcbmA7XHJcblxyXG5mdW5jdGlvbiBUcmFpbmluZ0l0ZW0oeyB0cmFpbmluZ0l0ZW0gfSkge1xyXG4gIGNvbnN0IHsgZXhlcmNpc2UgfSA9IHRyYWluaW5nSXRlbTtcclxuICBpZiAoIWV4ZXJjaXNlKSByZXR1cm4gbnVsbDtcclxuICAvL2NvbnNvbGUubG9nKGV4ZXJjaXNlKTtcclxuICByZXR1cm4gKFxyXG4gICAgPFRyYWluaW5nSXRlbVN0eWxlcz5cclxuICAgICAgPGltZ1xyXG4gICAgICAgIHdpZHRoPVwiMTAwXCJcclxuICAgICAgICBzcmM9e2V4ZXJjaXNlLnBob3RvLmltYWdlLnB1YmxpY1VybFRyYW5zZm9ybWVkfVxyXG4gICAgICAgIGFsdD17ZXhlcmNpc2UubmFtZX1cclxuICAgICAgLz5cclxuICAgICAgPGRpdj5cclxuICAgICAgICA8aDM+e2V4ZXJjaXNlLm5hbWV9PC9oMz5cclxuICAgICAgICA8aDI+e2V4ZXJjaXNlLnBvc2l0aW9ufTwvaDI+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8UmVtb3ZlRnJvbVRyYWluaW5nIGlkPXt0cmFpbmluZ0l0ZW0uaWR9IC8+XHJcbiAgICA8L1RyYWluaW5nSXRlbVN0eWxlcz5cclxuICApO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBUcmFpbmluZygpIHtcclxuICBjb25zdCBtZSA9IHVzZVVzZXIoKTtcclxuICBjb25zdCB7IHRyYWluaW5nT3BlbiwgY2xvc2VUcmFpbmluZyB9ID0gdXNlVHJhaW5pbmcoKTtcclxuICBpZiAoIW1lKSByZXR1cm4gbnVsbDtcclxuICByZXR1cm4gKFxyXG4gICAgPFRyYWluaW5nU3R5bGVzIG9wZW49e3RyYWluaW5nT3Blbn0+XHJcbiAgICAgIDxoZWFkZXI+XHJcbiAgICAgICAgPFN1cHJlbWU+e21lLm5hbWV9J3MgVHJhaW5pbmc8L1N1cHJlbWU+XHJcbiAgICAgICAgPENsb3NlQnV0dG9uIG9uQ2xpY2s9e2Nsb3NlVHJhaW5pbmd9PiZ0aW1lczs8L0Nsb3NlQnV0dG9uPlxyXG4gICAgICA8L2hlYWRlcj5cclxuICAgICAgPHVsPlxyXG4gICAgICAgIHttZS50cmFpbmluZy5tYXAoKHRyYWluaW5nSXRlbSkgPT4gKFxyXG4gICAgICAgICAgPFRyYWluaW5nSXRlbSBrZXk9e3RyYWluaW5nSXRlbS5pZH0gdHJhaW5pbmdJdGVtPXt0cmFpbmluZ0l0ZW19IC8+XHJcbiAgICAgICAgKSl9XHJcbiAgICAgIDwvdWw+XHJcbiAgICAgIDxmb290ZXI+XHJcbiAgICAgICAgXHJcbiAgICAgIDwvZm9vdGVyPlxyXG4gICAgPC9UcmFpbmluZ1N0eWxlcz5cclxuICApO1xyXG59XHJcbiIsImltcG9ydCB7IENTU1RyYW5zaXRpb24sIFRyYW5zaXRpb25Hcm91cCB9IGZyb20gXCJyZWFjdC10cmFuc2l0aW9uLWdyb3VwXCI7XHJcbmltcG9ydCBzdHlsZWQgZnJvbSBcInN0eWxlZC1jb21wb25lbnRzXCI7XHJcblxyXG5jb25zdCBEb3QgPSBzdHlsZWQuZGl2YFxyXG4gICAgYmFja2dyb3VuZDogdmFyKC0tcmVkKTtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICAgIHBhZGRpbmc6IDAuNXJlbTtcclxuICAgIGxpbmUtaGVpZ2h0OiAycmVtO1xyXG4gICAgbWluLXdpZHRoOiAzcmVtO1xyXG4gICAgbWFyZ2luLWxlZnQ6IDFyZW07XHJcbiAgICBmb250LWZlYXR1cmUtc2V0dGluZ3M6ICd0bnVtJztcclxuICAgIGZvbnQtdmFyaWFudC1udW1lcmljOiB0YWJ1bGFyLW51bXM7XHJcbmA7XHJcblxyXG5jb25zdCBBbmltYXRpb25TdHlsZXMgPSBzdHlsZWQuc3BhbmBcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIC5jb3VudCB7XHJcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjRzO1xyXG4gICAgICAgIGJhY2tmYWNlLXZpc2liaWxpdHk6IGhpZGRlbjtcclxuICAgIH1cclxuICAgIC5jb3VudC1lbnRlciB7XHJcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSg0KSByb3RhdGVYKDAuNXR1cm4pO1xyXG4gICAgfVxyXG4gICAgLmNvdW50LWVudGVyLWFjdGl2ZSB7XHJcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGVYKDApO1xyXG4gICAgfVxyXG4gICAgLmNvdW50LWV4aXQge1xyXG4gICAgICAgIHRvcDogMDtcclxuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGVYKDApO1xyXG4gICAgfVxyXG4gICAgLmNvdW50LWV4aXQtYWN0aXZlIHtcclxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDQpIHJvdGF0ZVgoMC41dHVybik7XHJcbiAgICB9XHJcbmA7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBUcmFpbmluZ0NvdW50KHsgY291bnQgfSkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8QW5pbWF0aW9uU3R5bGVzPlxyXG4gICAgICAgICAgICA8VHJhbnNpdGlvbkdyb3VwPlxyXG4gICAgICAgICAgICAgICAgPENTU1RyYW5zaXRpb25cclxuICAgICAgICAgICAgICAgICAgICB1bm1vdW50T25FeGl0XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiY291bnRcIlxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZXM9XCJjb3VudFwiXHJcbiAgICAgICAgICAgICAgICAgICAga2V5PXtjb3VudH1cclxuICAgICAgICAgICAgICAgICAgICB0aW1lb3V0PXt7IGVudGVyOiA0MDAsIGV4aXQ6IDQwMCB9fVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgIDxEb3Q+e2NvdW50fTwvRG90PlxyXG4gICAgICAgICAgICAgICAgPC9DU1NUcmFuc2l0aW9uPlxyXG4gICAgICAgICAgICA8L1RyYW5zaXRpb25Hcm91cD5cclxuICAgICAgICA8L0FuaW1hdGlvblN0eWxlcz5cclxuICAgICAgKTtcclxuICAgIH0iLCJpbXBvcnQgeyB1c2VRdWVyeSB9IGZyb20gXCJAYXBvbGxvL2NsaWVudFwiO1xyXG5pbXBvcnQgZ3FsIGZyb20gJ2dyYXBocWwtdGFnJztcclxuXHJcbmNvbnN0IENVUlJFTlRfVVNFUl9RVUVSWSA9IGdxbGBcclxuICAgIHF1ZXJ5IHtcclxuICAgICAgICBhdXRoZW50aWNhdGVkSXRlbSB7XHJcbiAgICAgICAgICAgIC4uLiBvbiBVc2VyIHtcclxuICAgICAgICAgICAgICAgIGlkXHJcbiAgICAgICAgICAgICAgICBlbWFpbFxyXG4gICAgICAgICAgICAgICAgbmFtZVxyXG4gICAgICAgICAgICAgICAgdGVhbSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWRcclxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXJzIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBudW1iZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgd2Vha25lc3Nlc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJlbmd0aHNcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGhvdG8ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1YmxpY1VybFRyYW5zZm9ybWVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0cmFpbmluZyB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWRcclxuICAgICAgICAgICAgICAgICAgICBxdWFudGl0eVxyXG4gICAgICAgICAgICAgICAgICAgIGV4ZXJjaXNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwaG90byB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWFnZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHVibGljVXJsVHJhbnNmb3JtZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuYDtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB1c2VVc2VyKCkge1xyXG4gICAgY29uc3QgeyBkYXRhIH0gPSB1c2VRdWVyeShDVVJSRU5UX1VTRVJfUVVFUlkpO1xyXG4gICAgcmV0dXJuIGRhdGE/LmF1dGhlbnRpY2F0ZWRJdGVtO1xyXG4gIH1cclxuICBcclxuICBleHBvcnQgeyBDVVJSRU5UX1VTRVJfUVVFUlkgfTsiLCJpbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcblxuY29uc3QgQ2xvc2VCdXR0b24gPSBzdHlsZWQuYnV0dG9uYFxuICBiYWNrZ3JvdW5kOiBibGFjaztcbiAgY29sb3I6IHdoaXRlO1xuICBmb250LXNpemU6IDNyZW07XG4gIGJvcmRlcjogMDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB6LWluZGV4OiAyO1xuICByaWdodDogMDtcbmA7XG5cbmV4cG9ydCBkZWZhdWx0IENsb3NlQnV0dG9uO1xuIiwiaW1wb3J0IHN0eWxlZCwgeyBrZXlmcmFtZXMgfSBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5cbmNvbnN0IERyb3BEb3duID0gc3R5bGVkLmRpdmBcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB3aWR0aDogMTAwJTtcbiAgei1pbmRleDogMjtcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tbGlnaHRHcmF5KTtcbmA7XG5cbmNvbnN0IERyb3BEb3duSXRlbSA9IHN0eWxlZC5kaXZgXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB2YXIoLS1saWdodEdyYXkpO1xuICBiYWNrZ3JvdW5kOiAkeyhwcm9wcykgPT4gKHByb3BzLmhpZ2hsaWdodGVkID8gJyNmN2Y3ZjcnIDogJ3doaXRlJyl9O1xuICBwYWRkaW5nOiAxcmVtO1xuICB0cmFuc2l0aW9uOiBhbGwgMC4ycztcbiAgJHsocHJvcHMpID0+IChwcm9wcy5oaWdobGlnaHRlZCA/ICdwYWRkaW5nLWxlZnQ6IDJyZW07JyA6IG51bGwpfTtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgYm9yZGVyLWxlZnQ6IDEwcHggc29saWRcbiAgICAkeyhwcm9wcykgPT4gKHByb3BzLmhpZ2hsaWdodGVkID8gcHJvcHMudGhlbWUubGlnaHRncmV5IDogJ3doaXRlJyl9O1xuICBpbWcge1xuICAgIG1hcmdpbi1yaWdodDogMTBweDtcbiAgfVxuYDtcblxuY29uc3QgZ2xvdyA9IGtleWZyYW1lc2BcbiAgZnJvbSB7XG4gICAgYm94LXNoYWRvdzogMCAwIDBweCB5ZWxsb3c7XG4gIH1cblxuICB0byB7XG4gICAgYm94LXNoYWRvdzogMCAwIDEwcHggMXB4IHllbGxvdztcbiAgfVxuYDtcblxuY29uc3QgU2VhcmNoU3R5bGVzID0gc3R5bGVkLmRpdmBcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBpbnB1dCB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgcGFkZGluZzogMTBweDtcbiAgICBib3JkZXI6IDA7XG4gICAgZm9udC1zaXplOiAycmVtO1xuICAgICYubG9hZGluZyB7XG4gICAgICBhbmltYXRpb246ICR7Z2xvd30gMC41cyBlYXNlLWluLW91dCBpbmZpbml0ZSBhbHRlcm5hdGU7XG4gICAgfVxuICB9XG5gO1xuXG5leHBvcnQgeyBEcm9wRG93biwgRHJvcERvd25JdGVtLCBTZWFyY2hTdHlsZXMgfTtcbiIsImltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuXG5jb25zdCBOYXZTdHlsZXMgPSBzdHlsZWQudWxgXG4gIG1hcmdpbjogMDtcbiAgcGFkZGluZzogMDtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1zZWxmOiBlbmQ7XG4gIGZvbnQtc2l6ZTogMnJlbTtcbiAgYSxcbiAgYnV0dG9uIHtcbiAgICBwYWRkaW5nOiAxcmVtIDNyZW07XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgIGZvbnQtd2VpZ2h0OiA5MDA7XG4gICAgZm9udC1zaXplOiAxZW07XG4gICAgYmFja2dyb3VuZDogbm9uZTtcbiAgICBib3JkZXI6IDA7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIEBtZWRpYSAobWF4LXdpZHRoOiA3MDBweCkge1xuICAgICAgZm9udC1zaXplOiAxMHB4O1xuICAgICAgcGFkZGluZzogMCAxMHB4O1xuICAgIH1cbiAgICAmOmJlZm9yZSB7XG4gICAgICBjb250ZW50OiAnJztcbiAgICAgIHdpZHRoOiAycHg7XG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1saWdodEdyYXkpO1xuICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgbGVmdDogMDtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIHRyYW5zZm9ybTogc2tldygtMjBkZWcpO1xuICAgICAgdG9wOiAwO1xuICAgICAgYm90dG9tOiAwO1xuICAgIH1cbiAgICAmOmFmdGVyIHtcbiAgICAgIGhlaWdodDogMnB4O1xuICAgICAgYmFja2dyb3VuZDogZ29sZGVucm9kO1xuICAgICAgY29udGVudDogJyc7XG4gICAgICB3aWR0aDogMDtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKTtcbiAgICAgIHRyYW5zaXRpb246IHdpZHRoIDAuNHM7XG4gICAgICB0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDEsIC0wLjY1LCAwLCAyLjMxKTtcbiAgICAgIGxlZnQ6IDUwJTtcbiAgICAgIG1hcmdpbi10b3A6IDJyZW07XG4gICAgfVxuICAgICY6aG92ZXIsXG4gICAgJjpmb2N1cyB7XG4gICAgICBvdXRsaW5lOiBub25lO1xuICAgICAgdGV4dC1kZWNvcmF0aW9uOm5vbmU7XG4gICAgICAmOmFmdGVyIHtcbiAgICAgICAgd2lkdGg6IGNhbGMoMTAwJSAtIDYwcHgpO1xuICAgICAgfVxuICAgICAgQG1lZGlhIChtYXgtd2lkdGg6IDcwMHB4KSB7XG4gICAgICAgIHdpZHRoOiBjYWxjKDEwMCUgLSAxMHB4KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgQG1lZGlhIChtYXgtd2lkdGg6IDEzMDBweCkge1xuICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCB2YXIoLS1saWdodEdyYXkpO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGZvbnQtc2l6ZTogMS41cmVtO1xuICB9XG5gO1xuXG5leHBvcnQgZGVmYXVsdCBOYXZTdHlsZXM7XG4iLCJpbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcblxuY29uc3QgUGFnaW5hdGlvblN0eWxlcyA9IHN0eWxlZC5kaXZgXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgZGlzcGxheTogaW5saW5lLWdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDQsIGF1dG8pO1xuICBhbGlnbi1pdGVtczogc3RyZXRjaDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcbiAgbWFyZ2luOiAycmVtIDA7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWxpZ2h0R3JheSk7XG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICYgPiAqIHtcbiAgICBtYXJnaW46IDA7XG4gICAgcGFkZGluZzogMTVweCAzMHB4O1xuICAgIGJvcmRlci1yaWdodDogMXB4IHNvbGlkIHZhcigtLWxpZ2h0R3JheSk7XG4gICAgJjpsYXN0LWNoaWxkIHtcbiAgICAgIGJvcmRlci1yaWdodDogMDtcbiAgICB9XG4gIH1cbiAgYVthcmlhLWRpc2FibGVkPSd0cnVlJ10ge1xuICAgIGNvbG9yOiBncmV5O1xuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICB9XG5gO1xuXG5leHBvcnQgZGVmYXVsdCBQYWdpbmF0aW9uU3R5bGVzO1xuIiwiaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5cbmNvbnN0IFN1cHJlbWUgPSBzdHlsZWQuaDNgXG4gIGJhY2tncm91bmQ6IHZhcigtLWJsYWNrKTtcbiAgY29sb3I6IHdoaXRlO1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIHBhZGRpbmc6IDRweCA1cHg7XG4gIHRyYW5zZm9ybTogc2tldygtM2RlZyk7XG4gIG1hcmdpbjogMDtcbiAgZm9udC1zaXplOiA0cmVtO1xuYDtcblxuZXhwb3J0IGRlZmF1bHQgU3VwcmVtZTtcbiIsImltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuXG5jb25zdCBUcmFpbmluZ1N0eWxlcyA9IHN0eWxlZC5kaXZgXG4gIHBhZGRpbmc6IDIwcHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgYmFja2dyb3VuZDogd2hpdGU7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgaGVpZ2h0OiAxMDAlO1xuICB0b3A6IDA7XG4gIHJpZ2h0OiAwO1xuICB3aWR0aDogNDAlO1xuICBtaW4td2lkdGg6IDUwMHB4O1xuICBib3R0b206IDA7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgxMDAlKTtcbiAgdHJhbnNpdGlvbjogYWxsIDAuM3M7XG4gIGJveC1zaGFkb3c6IDAgMCAxMHB4IDNweCByZ2JhKDAsIDAsIDAsIDAuMik7XG4gIHotaW5kZXg6IDU7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtcm93czogYXV0byAxZnIgYXV0bztcbiAgJHsocHJvcHMpID0+IHByb3BzLm9wZW4gJiYgYHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwKTtgfTtcbiAgaGVhZGVyIHtcbiAgICBib3JkZXItYm90dG9tOiA1cHggc29saWQgdmFyKC0tYmxhY2spO1xuICAgIG1hcmdpbi1ib3R0b206IDJyZW07XG4gICAgcGFkZGluZy1ib3R0b206IDJyZW07XG4gIH1cbiAgZm9vdGVyIHtcbiAgICBib3JkZXItdG9wOiAxMHB4IGRvdWJsZSB2YXIoLS1ibGFjayk7XG4gICAgbWFyZ2luLXRvcDogMnJlbTtcbiAgICBwYWRkaW5nLXRvcDogMnJlbTtcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogYXV0byBhdXRvO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgZm9udC1zaXplOiAzcmVtO1xuICAgIGZvbnQtd2VpZ2h0OiA5MDA7XG4gICAgcCB7XG4gICAgICBtYXJnaW46IDA7XG4gICAgfVxuICB9XG4gIHVsIHtcbiAgICBtYXJnaW46IDA7XG4gICAgcGFkZGluZzogMDtcbiAgICBsaXN0LXN0eWxlOiBub25lO1xuICAgIG92ZXJmbG93OiBzY3JvbGw7XG4gIH1cbmA7XG5cbmV4cG9ydCBkZWZhdWx0IFRyYWluaW5nU3R5bGVzO1xuIiwiLy8gVGhpcyBpcyBjbGllbnQgc2lkZSBjb25maWcgb25seSAtIGRvbid0IHB1dCBhbnl0aGluZyBpbiBoZXJlIHRoYXQgc2hvdWxkbid0IGJlIHB1YmxpYyFcbmV4cG9ydCBjb25zdCBlbmRwb2ludCA9IGBodHRwOi8vbG9jYWxob3N0OjMwMDAvYXBpL2dyYXBocWxgO1xuZXhwb3J0IGNvbnN0IHByb2RFbmRwb2ludCA9IGBmaWxsIG1lIGluIHdoZW4gd2UgZGVwbG95YDtcbmV4cG9ydCBjb25zdCBwZXJQYWdlID0gNDtcbiIsImltcG9ydCB7UEFHSU5BVElPTl9RVUVSWX0gZnJvbSBcIi4uL2NvbXBvbmVudHMvUGFnaW5hdGlvblwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGFnaW5hdGlvbkZpZWxkKCkgeyBcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAga2V5QXJnczogZmFsc2UsIC8vIHRlbGxzIGFwb2xsbyB3ZSB0YWtlIGNhcmUgb2YgZXZlcnl0aGluZ1xyXG4gICAgICAgIHJlYWQoZXhpc3RpbmcgPSBbXSwgeyBhcmdzLCBjYWNoZSB9KSB7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coe2V4aXN0aW5nLCBhcmdzLCBjYWNoZX0pO1xyXG4gICAgICAgICAgICBjb25zdCB7c2tpcCwgZmlyc3R9ID0gYXJncztcclxuXHJcbiAgICAgICAgICAgIC8vUmVhZCB0aGUgbnVtYmVyIG9mIGl0ZW1zIG9uIHRoZSBwYWdlIGZyb20gYWNoZVxyXG4gICAgICAgICAgICBjb25zdCBkYXRhID0gY2FjaGUucmVhZFF1ZXJ5KHtxdWVyeTogUEFHSU5BVElPTl9RVUVSWX0pO1xyXG4gICAgICAgICAgICBjb25zdCBjb3VudCA9IGRhdGE/Ll9hbGxFeGVyY2lzZXNNZXRhPy5jb3VudDtcclxuICAgICAgICAgICAgY29uc3QgcGFnZSA9IHNraXAgLyBmaXJzdCArIDE7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhZ2VzID0gTWF0aC5jZWlsKGNvdW50IC8gZmlyc3QpO1xyXG5cclxuICAgICAgICAgICAgLy9DaGVjayBpZiB3ZSBoYXZlIGV4aXN0aW5nIGl0ZW1zXHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1zID0gZXhpc3Rpbmcuc2xpY2Uoc2tpcCwgc2tpcCArIGZpcnN0KS5maWx0ZXIoKHgpID0+IHgpO1xyXG5cclxuICAgICAgICAvLyBJZlxyXG4gICAgICAgIC8vIFRoZXJlIGFyZSBpdGVtc1xyXG4gICAgICAgIC8vIEFORCB0aGVyZSBhcmVuJ3QgZW5vdWdoIGl0ZW1zIHRvIHNhdGlzZnkgaG93IG1hbnkgd2VyZSByZXF1ZXN0ZWRcclxuICAgICAgICAvLyBBTkQgd2UgYXJlIG9uIHRoZSBsYXN0IHBhZ2VcclxuICAgICAgICAvLyBUSEVOIEpVU1QgU0VORCBJVFxyXG4gICAgICAgICAgICBpZiAoaXRlbXMubGVuZ3RoICYmIGl0ZW1zLmxlbmd0aCAhPT0gZmlyc3QgJiYgcGFnZSA9PT0gcGFnZXMpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtcztcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpdGVtcy5sZW5ndGggIT09IGZpcnN0KSB7XHJcbiAgICAgICAgICAgICAgICAvL1dlIGRvbnQgaGF2ZSBhbnkgaXRlbXMsIHdlIG11c3QgZ28gdG8gdGhlIG5ldHdvcmsgdG8gZmV0Y2ggdGhlbVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL0lmIHRoZXJlIGFyZSBpdGVtcywganVzdCByZXR1cm4gdGhlbSBmcm9tIGNhY2hlIGFuZCB3ZSBkb250IG5lZWQgdG8gZ28gdG8gdGhlIG5ldHdvcmtcclxuICAgICAgICAgICAgaWYgKGl0ZW1zLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcclxuICAgICAgICAgICAgICAgIC8vICAgIGBUaGVyZSBhcmUgJHtpdGVtcy5sZW5ndGh9IGl0ZW1zIGluIHRoZSBjYWNoZSEgR29ubmEgc2VuZCB0aGVtIHRvIGFwb2xsb2BcclxuICAgICAgICAgICAgICAgIC8vKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtczsgXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTsgLy9mYWxsYmFjayB0byBuZXR3b3JrXHJcbiAgICAgICAgIFxyXG4gICAgICAgICAgICAvL0ZpcnN0IHRoaW5nIGl0IGRvZXMgaXMgYXNrcyB0aGUgcmVhZCBmdW5jdGlvbiBmb3IgdGhvc2UgaXRlbXNcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSxcclxuICAgICAgICBtZXJnZShleGlzdGluZywgaW5jb21pbmcsIHthcmdzfSkge1xyXG4gICAgICAgICAgICBjb25zdCB7c2tpcCwgZmlyc3R9ID0gYXJncztcclxuICAgICAgICAgICAgLy8gVGhpcyBydW5zIHdoZW4gYXBvbGxvIGNsaWVudCBjb21lcyBiYWNrIGZyb20gdGhlIG5ldHdvcmsgd2l0aCBvdXIgcHJvZHVjdFxyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGBNZXJnaW5nIGl0ZW1zIGZyb20gdGhlIG5ldHdvcmsgJHtpbmNvbWluZy5sZW5ndGh9YCk7XHJcbiAgICAgICAgICAgIGNvbnN0IG1lcmdlZCA9IGV4aXN0aW5nID8gZXhpc3Rpbmcuc2xpY2UoMCkgOiBbXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IHNraXA7IGkgPCBza2lwICsgaW5jb21pbmcubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgICAgIG1lcmdlZFtpXSA9IGluY29taW5nW2kgLSBza2lwXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhtZXJnZWQpO1xyXG4gICAgICAgICAgICAvL0ZpbmFsbHkgd2UgcmV0dXJuIHRoZSBtZXJnZWQgaXRlbXMgZnJvbSB0aGUgY2FjaGVcclxuICAgICAgICAgICAgcmV0dXJuIG1lcmdlZDtcclxuICAgICAgICB9LFxyXG4gICAgfTtcclxufSIsImltcG9ydCB7IGNyZWF0ZUNvbnRleHQsIHVzZUNvbnRleHQsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcblxyXG5jb25zdCBMb2NhbFN0YXRlQ29udGV4dCA9IGNyZWF0ZUNvbnRleHQoKTtcclxuY29uc3QgTG9jYWxTdGF0ZVByb3ZpZGVyID0gTG9jYWxTdGF0ZUNvbnRleHQuUHJvdmlkZXI7XHJcblxyXG5mdW5jdGlvbiBUcmFpbmluZ1N0YXRlUHJvdmlkZXIoe2NoaWxkcmVufSkge1xyXG4gICAgLy8gVGhpcyBpcyBjdXN0b20gcHJvdmlkZXIuIEl0IHdpbGwgc3RvcmUgZGF0YSAoc3RhdGUpIGFuZCBmdW5jdGlvbmFsaXR5ICh1cGRhdGVzKVxyXG4gICAgLy8gaW4gaGVyZSBhbmQgYW55b25lIGNhbiBhY2Nlc3MgaXQgdmlhIHRoZSBjb25zdW1lclxyXG5cclxuICAgIGNvbnN0IFt0cmFpbmluZ09wZW4sIHNldFRyYWluaW5nT3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcblxyXG4gICAgZnVuY3Rpb24gdG9nZ2xlVHJhaW5pbmcoKSB7XHJcbiAgICAgICAgc2V0VHJhaW5pbmdPcGVuKCF0cmFpbmluZ09wZW4pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNsb3NlVHJhaW5pbmcoKSB7XHJcbiAgICAgICAgc2V0VHJhaW5pbmdPcGVuKGZhbHNlKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIG9wZW5UcmFpbmluZygpIHtcclxuICAgICAgICBzZXRUcmFpbmluZ09wZW4odHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIDxMb2NhbFN0YXRlUHJvdmlkZXIgdmFsdWU9e3sgXHJcbiAgICAgICAgdHJhaW5pbmdPcGVuLCBcclxuICAgICAgICBzZXRUcmFpbmluZ09wZW4sIFxyXG4gICAgICAgIHRvZ2dsZVRyYWluaW5nLCBcclxuICAgICAgICBjbG9zZVRyYWluaW5nLCBcclxuICAgICAgICBvcGVuVHJhaW5pbmcgXHJcbiAgICB9fT57Y2hpbGRyZW59PC9Mb2NhbFN0YXRlUHJvdmlkZXI+XHJcbn1cclxuXHJcbi8vbWFrZSBhIGN1c3RvbSBob29rIGZvciBhY2Nlc3NpbmcgdGhlIHRyYWluaWcgbG9jYWwgc3RhdGVcclxuXHJcbmZ1bmN0aW9uIHVzZVRyYWluaW5nKCkge1xyXG4gICAgY29uc3QgYWxsID0gdXNlQ29udGV4dChMb2NhbFN0YXRlQ29udGV4dCk7XHJcbiAgICByZXR1cm4gYWxsO1xyXG59XHJcblxyXG5leHBvcnQge1RyYWluaW5nU3RhdGVQcm92aWRlciwgdXNlVHJhaW5pbmd9OyIsImltcG9ydCB7IEFwb2xsb0NsaWVudCwgQXBvbGxvTGluaywgSW5NZW1vcnlDYWNoZSB9IGZyb20gJ0BhcG9sbG8vY2xpZW50JztcbmltcG9ydCB7IG9uRXJyb3IgfSBmcm9tICdAYXBvbGxvL2xpbmstZXJyb3InO1xuaW1wb3J0IHsgZ2V0RGF0YUZyb21UcmVlIH0gZnJvbSAnQGFwb2xsby9jbGllbnQvcmVhY3Qvc3NyJztcbmltcG9ydCB7IGNyZWF0ZVVwbG9hZExpbmsgfSBmcm9tICdhcG9sbG8tdXBsb2FkLWNsaWVudCc7XG5pbXBvcnQgd2l0aEFwb2xsbyBmcm9tICduZXh0LXdpdGgtYXBvbGxvJztcbmltcG9ydCB7IGVuZHBvaW50LCBwcm9kRW5kcG9pbnQgfSBmcm9tICcuLi9jb25maWcnO1xuaW1wb3J0IHBhZ2luYXRpb25GaWVsZCBmcm9tICcuL3BhZ2luYXRpb25GaWVsZCc7XG5cbmZ1bmN0aW9uIGNyZWF0ZUNsaWVudCh7IGhlYWRlcnMsIGluaXRpYWxTdGF0ZSB9KSB7XG4gIHJldHVybiBuZXcgQXBvbGxvQ2xpZW50KHtcbiAgICBsaW5rOiBBcG9sbG9MaW5rLmZyb20oW1xuICAgICAgb25FcnJvcigoeyBncmFwaFFMRXJyb3JzLCBuZXR3b3JrRXJyb3IgfSkgPT4ge1xuICAgICAgICBpZiAoZ3JhcGhRTEVycm9ycylcbiAgICAgICAgICBncmFwaFFMRXJyb3JzLmZvckVhY2goKHsgbWVzc2FnZSwgbG9jYXRpb25zLCBwYXRoIH0pID0+XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgICAgYFtHcmFwaFFMIGVycm9yXTogTWVzc2FnZTogJHttZXNzYWdlfSwgTG9jYXRpb246ICR7bG9jYXRpb25zfSwgUGF0aDogJHtwYXRofWBcbiAgICAgICAgICAgIClcbiAgICAgICAgICApO1xuICAgICAgICBpZiAobmV0d29ya0Vycm9yKVxuICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgYFtOZXR3b3JrIGVycm9yXTogJHtuZXR3b3JrRXJyb3J9LiBCYWNrZW5kIGlzIHVucmVhY2hhYmxlLiBJcyBpdCBydW5uaW5nP2BcbiAgICAgICAgICApO1xuICAgICAgfSksXG4gICAgICAvLyB0aGlzIHVzZXMgYXBvbGxvLWxpbmstaHR0cCB1bmRlciB0aGUgaG9vZCwgc28gYWxsIHRoZSBvcHRpb25zIGhlcmUgY29tZSBmcm9tIHRoYXQgcGFja2FnZVxuICAgICAgY3JlYXRlVXBsb2FkTGluayh7XG4gICAgICAgIHVyaTogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcgPyBlbmRwb2ludCA6IHByb2RFbmRwb2ludCxcbiAgICAgICAgZmV0Y2hPcHRpb25zOiB7XG4gICAgICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcbiAgICAgICAgfSxcbiAgICAgICAgLy8gcGFzcyB0aGUgaGVhZGVycyBhbG9uZyBmcm9tIHRoaXMgcmVxdWVzdC4gVGhpcyBlbmFibGVzIFNTUiB3aXRoIGxvZ2dlZCBpbiBzdGF0ZVxuICAgICAgICBoZWFkZXJzLFxuICAgICAgfSksXG4gICAgXSksXG4gICAgY2FjaGU6IG5ldyBJbk1lbW9yeUNhY2hlKHtcbiAgICAgIHR5cGVQb2xpY2llczoge1xuICAgICAgICBRdWVyeToge1xuICAgICAgICAgIGZpZWxkczoge1xuICAgICAgICAgICAgLy8gVE9ETzogV2Ugd2lsbCBhZGQgdGhpcyB0b2dldGhlciFcbiAgICAgICAgICAgICAvL2FsbEV4ZXJjaXNlczogcGFnaW5hdGlvbkZpZWxkKCksIC8vZG9udCB3YW50IHRvIHdhcmssIGNyYXNoZXMgZW50aXJlIHdlYlxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pLnJlc3RvcmUoaW5pdGlhbFN0YXRlIHx8IHt9KSxcbiAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhBcG9sbG8oY3JlYXRlQ2xpZW50LCB7IGdldERhdGFGcm9tVHJlZSB9KTtcbiIsImltcG9ydCBOUHJvZ3Jlc3MgZnJvbSAnbnByb2dyZXNzJztcclxuaW1wb3J0IFJvdXRlciBmcm9tICduZXh0L3JvdXRlcic7XHJcbmltcG9ydCBQYWdlIGZyb20gJy4uL2NvbXBvbmVudHMvUGFnZSc7XHJcbmltcG9ydCAnLi4vY29tcG9uZW50cy9zdHlsZXMvbnByb2dyZXNzLmNzcyc7XHJcbmltcG9ydCB7IEFwb2xsb1Byb3ZpZGVyIH0gZnJvbSAnQGFwb2xsby9jbGllbnQnO1xyXG5pbXBvcnQgd2l0aERhdGEgZnJvbSAnLi4vbGliL3dpdGhEYXRhJztcclxuaW1wb3J0IHsgVHJhaW5pbmdTdGF0ZVByb3ZpZGVyIH0gZnJvbSAnLi4vbGliL3RyYWluaW5nU3RhdGUnO1xyXG5pbXBvcnQgJy4uL2NvbXBvbmVudHMvc3R5bGVzL25wcm9ncmVzcy5jc3MnO1xyXG5pbXBvcnQgJ3JlYWN0LWJpZy1jYWxlbmRhci9saWIvY3NzL3JlYWN0LWJpZy1jYWxlbmRhci5jc3MnO1xyXG5cclxuUm91dGVyLmV2ZW50cy5vbigncm91dGVDaGFuZ2VTdGFydCcsICgpID0+IE5Qcm9ncmVzcy5zdGFydCgpKTtcclxuUm91dGVyLmV2ZW50cy5vbigncm91dGVDaGFuZ2VDb21wbGV0ZScsICgpID0+IE5Qcm9ncmVzcy5kb25lKCkpO1xyXG5Sb3V0ZXIuZXZlbnRzLm9uKCdyb3V0ZUNoYW5nZUVycm9yJywgKCkgPT4gTlByb2dyZXNzLmRvbmUoKSk7XHJcblxyXG5mdW5jdGlvbiBNeUFwcCh7IENvbXBvbmVudCwgcGFnZVByb3BzLCBhcG9sbG8gIH0pIHtcclxuICByZXR1cm4gKFxyXG4gICAgPEFwb2xsb1Byb3ZpZGVyIGNsaWVudD17YXBvbGxvfT5cclxuICAgICAgPFRyYWluaW5nU3RhdGVQcm92aWRlcj5cclxuICAgICAgICA8UGFnZT5cclxuICAgICAgICAgIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30+PC9Db21wb25lbnQ+XHJcbiAgICAgICAgPC9QYWdlPlxyXG4gICAgICA8L1RyYWluaW5nU3RhdGVQcm92aWRlcj5cclxuICAgIDwvQXBvbGxvUHJvdmlkZXI+XHJcbiAgKTtcclxufVxyXG5cclxuTXlBcHAuZ2V0SW5pdGlhbFByb3BzID0gYXN5bmMgZnVuY3Rpb24gKHsgIENvbXBvbmVudCwgY3R4fSkge1xyXG4gIGxldCBwYWdlUHJvcHMgPSB7fTtcclxuICBpZiAoQ29tcG9uZW50LmdldEluaXRpYWxQcm9wcykge1xyXG4gICAgcGFnZVByb3BzID0gYXdhaXQgQ29tcG9uZW50LmdldEluaXRpYWxQcm9wcyhjdHgpO1xyXG4gIH1cclxuICBwYWdlUHJvcHMucXVlcnkgPSBjdHgucXVlcnk7XHJcbiAgcmV0dXJuIHsgcGFnZVByb3BzIH07XHJcbn0gXHJcblxyXG5leHBvcnQgZGVmYXVsdCB3aXRoRGF0YShNeUFwcCk7XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBhcG9sbG8vY2xpZW50XCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAYXBvbGxvL2NsaWVudC9yZWFjdC9zc3JcIik7OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBhcG9sbG8vbGluay1lcnJvclwiKTs7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXBvbGxvLXVwbG9hZC1jbGllbnRcIik7OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImRvd25zaGlmdFwiKTs7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZ3JhcGhxbC10YWdcIik7OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImxvZGFzaC5kZWJvdW5jZVwiKTs7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC13aXRoLWFwb2xsb1wiKTs7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC9kaXN0L25leHQtc2VydmVyL2xpYi9yb3V0ZXItY29udGV4dC5qc1wiKTs7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC9kaXN0L25leHQtc2VydmVyL2xpYi9yb3V0ZXIvdXRpbHMvZ2V0LWFzc2V0LXBhdGgtZnJvbS1yb3V0ZS5qc1wiKTs7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC9oZWFkXCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0L3JvdXRlclwiKTs7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibnByb2dyZXNzXCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwcm9wLXR5cGVzXCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTs7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtdHJhbnNpdGlvbi1ncm91cFwiKTs7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QvanN4LWRldi1ydW50aW1lXCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzdHlsZWQtY29tcG9uZW50c1wiKTs7IiwiLyogKGlnbm9yZWQpICovIl0sInNvdXJjZVJvb3QiOiIifQ==
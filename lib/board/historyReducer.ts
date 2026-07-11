import type { BoardElement, PathBoardElement, PointBoardElement } from "./types";

export interface BoardHistoryState {
  past: BoardElement[][];
  present: BoardElement[];
  future: BoardElement[][];
}

// Union members don't share most fields, so a plain Partial<BoardElement>
// would only expose the handful of keys common to both. This intersection
// of partials allows any patch that's valid for either variant while still
// catching typos (a key not on either type stays a type error).
export type BoardElementPatch = Partial<PointBoardElement> &
  Partial<PathBoardElement>;

export type BoardHistoryAction =
  | { type: "add"; element: BoardElement }
  | { type: "update"; id: string; patch: BoardElementPatch }
  | { type: "delete"; id: string }
  | { type: "clear" }
  | { type: "undo" }
  | { type: "redo" };

export const initialBoardHistoryState: BoardHistoryState = {
  past: [],
  present: [],
  future: [],
};

const MAX_HISTORY = 50;

function commit(
  state: BoardHistoryState,
  present: BoardElement[],
): BoardHistoryState {
  const past = [...state.past, state.present].slice(-MAX_HISTORY);
  return { past, present, future: [] };
}

export function boardHistoryReducer(
  state: BoardHistoryState,
  action: BoardHistoryAction,
): BoardHistoryState {
  switch (action.type) {
    case "add":
      return commit(state, [...state.present, action.element]);
    case "update":
      return commit(
        state,
        state.present.map((el) =>
          el.id === action.id ? ({ ...el, ...action.patch } as BoardElement) : el,
        ),
      );
    case "delete":
      return commit(
        state,
        state.present.filter((el) => el.id !== action.id),
      );
    case "clear":
      return state.present.length === 0 ? state : commit(state, []);
    case "undo": {
      if (state.past.length === 0) return state;
      const previous = state.past[state.past.length - 1];
      return {
        past: state.past.slice(0, -1),
        present: previous,
        future: [state.present, ...state.future],
      };
    }
    case "redo": {
      if (state.future.length === 0) return state;
      const [next, ...rest] = state.future;
      return {
        past: [...state.past, state.present],
        present: next,
        future: rest,
      };
    }
    default:
      return state;
  }
}

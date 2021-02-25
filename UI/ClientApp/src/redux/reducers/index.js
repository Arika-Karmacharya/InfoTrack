import {
  LOAD_SEARCH_ENGINES,
  LOAD_RESULT,
  SEARCH_RESULT_LOADING,
} from "../types";

const INITIAL_STATE = {
  searchEngines: null,
  searchResult: { loading: false, value: "" },
  searchText: "",
  searchEngineText: "",
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_SEARCH_ENGINES:
      return {
        ...state,
        searchEngines: action.payload,
      };

    case LOAD_RESULT:
      return {
        ...state,
        searchResult: { loading: false, value: action.payload.searchResult },
        searchText: action.payload.searchText,
        searchEngineText: action.payload.searchEngineText,
      };
    case SEARCH_RESULT_LOADING:
      return {
        ...state,
        searchResult: { loading: action.payload, value: "" },
      };

    default:
      return state;
  }
};

export default reducer;

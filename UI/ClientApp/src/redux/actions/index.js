import {
  LOAD_SEARCH_ENGINES,
  LOAD_RESULT,
  SEARCH_RESULT_LOADING,
} from "../types";
import axios from "axios";
const urlPrefix = "api/";

export const loadSearchEngines = () => async (dispatch) => {
  await axios
    .get(`${urlPrefix}searchengine`)
    .then((resp) => {
      dispatch({
        type: LOAD_SEARCH_ENGINES,
        payload: resp.data.map((x) => ({ label: x.name, value: x.id })),
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getSearchResults = (data) => async (dispatch) => {
  dispatch({
    type: SEARCH_RESULT_LOADING,
    payload: true,
  });
  await axios
    .get(
      `${urlPrefix}searchengine/${data.searchEngine.value}/${data.searchText}`
    )
    .then((resp) => {
      let respData = {
        searchResult: resp.data,
        searchText: data.searchText,
        searchEngineText: data.searchEngine.label,
      };
      dispatch({
        type: LOAD_RESULT,
        payload: respData,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

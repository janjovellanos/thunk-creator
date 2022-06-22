import articles from '../data/data.json';

const LOAD_ARTICLES = 'article/loadArticles';
const ADD_ARTICLE = 'article/addArticle';

export const loadArticles = (articleData) => {
  return {
    type: LOAD_ARTICLES,
    articles: articleData || articles
  };
};

export const addArticle = (article) => {
  return {
    type: ADD_ARTICLE,
    article
  };
};

export const fetchArticles = () => async (dispatch) => {
  const response = await fetch('/api/articles'); //response
  const articles = await response.json(); //parsed response

  dispatch(loadArticles(articles));
};

export const writeArticle = (data) => async (dispatch) => {
  const res = await fetch('/api/articles', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })

  if (res.ok) {
    const parsedRes = await res.json();
    dispatch(addArticle(parsedRes));
  }
}

const initialState = { entries: [], isLoading: true };

const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ARTICLES:
      return { ...state, entries: [...action.articles] };
    case ADD_ARTICLE:
      return { ...state, entries: [...state.entries, action.article] };
    default:
      return state;
  }
};

export default articleReducer;

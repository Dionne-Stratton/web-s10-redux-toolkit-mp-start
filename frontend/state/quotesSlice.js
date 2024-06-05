// ✨ create your `quotesSlice` in this module
import { createSlice } from "@reduxjs/toolkit";

let id = 1;
const getNextId = () => id++;
const initialState = {
  displayAllQuotes: true,
  highlightedQuote: null,
  quotes: [
    {
      id: getNextId(),
      quoteText: "Don't cry because it's over, smile because it happened.",
      authorName: "Dr. Seuss",
      apocryphal: false,
    },
    {
      id: getNextId(),
      quoteText: "So many books, so little time.",
      authorName: "Frank Zappa",
      apocryphal: false,
    },
    {
      id: getNextId(),
      quoteText: "Be yourself; everyone else is already taken.",
      authorName: "Oscar Wilde",
      apocryphal: false,
    },
  ],
};

const quotesSlice = createSlice({
  name: "quotes",
  initialState,
  reducers: {
    addQuote: (state, action) => {
      state.quotes.push({ id: getNextId(), ...action.payload });
    },
    removeQuote: (state, action) => {
      const { id } = action.payload;
      state.quotes = state.quotes.filter((quote) => quote.id !== id);
    },
    toggleDisplayAllQuotes: (state) => {
      state.displayAllQuotes = !state.displayAllQuotes;
    },
    highlightQuote: (state, action) => {
      if (state.highlightedQuote === action.payload) {
        state.highlightedQuote = null;
        return;
      } else {
        state.highlightedQuote = action.payload;
      }
    },
    // ✨ add a new action to set a quote as apocryphal
    setApocryphal: (state, action) => {
      const quote = state.quotes.find((qt) => qt.id === action.payload.id);
      quote.apocryphal = !quote.apocryphal;
    },
  },
});

export const {
  addQuote,
  removeQuote,
  toggleDisplayAllQuotes,
  highlightQuote,
  setApocryphal,
} = quotesSlice.actions;

export default quotesSlice.reducer;

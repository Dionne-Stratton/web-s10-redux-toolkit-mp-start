import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeQuote,
  toggleDisplayAllQuotes,
  setApocryphal,
  highlightQuote,
} from "../state/quotesSlice";

export default function Quotes() {
  const dispatch = useDispatch();
  const quotes = useSelector((state) => state.quotesState.quotes);
  const displayAllQuotes = useSelector(
    (state) => state.quotesState.displayAllQuotes
  );
  const highlightedQuote = useSelector(
    (state) => state.quotesState.highlightedQuote
  );

  return (
    <div id="quotes">
      <h3>Quotes</h3>
      <div>
        {quotes
          ?.filter((qt) => {
            return displayAllQuotes || !qt.apocryphal;
          })
          .map((qt) => (
            <div
              key={qt.id}
              className={`quote${qt.apocryphal ? " fake" : ""}${
                highlightedQuote === qt.id ? " highlight" : ""
              }`}
            >
              <div>{qt.quoteText}</div>
              <div>{qt.authorName}</div>
              <div className="quote-buttons">
                <button
                  onClick={() => {
                    /* ✨ dispatch an action */
                    dispatch(removeQuote({ id: qt.id }));
                  }}
                >
                  DELETE
                </button>
                <button
                  onClick={() => {
                    /* ✨ dispatch an action to highlight*/
                    dispatch(highlightQuote(qt.id));
                  }}
                >
                  HIGHLIGHT
                </button>
                <button
                  onClick={() => {
                    /* ✨ dispatch an action to set as fake*/
                    dispatch(setApocryphal({ id: qt.id }));
                  }}
                >
                  FAKE
                </button>
              </div>
            </div>
          ))}
        {!quotes?.length && "No quotes here! Go write some."}
      </div>
      {!!quotes?.length && (
        <button
          onClick={() => {
            /* ✨ dispatch an action to toggle fake quotes*/
            dispatch(toggleDisplayAllQuotes());
          }}
        >
          {displayAllQuotes ? "HIDE" : "SHOW"} FAKE QUOTES
        </button>
      )}
    </div>
  );
}

import { useCallback, useEffect, useRef, useState } from "react";
import { createDeck } from "../data/gameOptions.js";

export function useMemoryGame(theme, pairCount) {
  const [cards, setCards] = useState([]);
  const [flippedIds, setFlippedIds] = useState([]);
  const [matchedIds, setMatchedIds] = useState([]);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [status, setStatus] = useState("setup");
  const [isChecking, setIsChecking] = useState(false);
  const timeoutRef = useRef(null);

  const startGame = useCallback(() => {
    window.clearTimeout(timeoutRef.current);
    setCards(createDeck(theme, pairCount));
    setFlippedIds([]);
    setMatchedIds([]);
    setMoves(0);
    setSeconds(0);
    setIsChecking(false);
    setStatus("playing");
  }, [pairCount, theme]);

  const showSetup = useCallback(() => {
    window.clearTimeout(timeoutRef.current);
    setIsChecking(false);
    setStatus("setup");
  }, []);

  useEffect(() => {
    if (status !== "playing") return undefined;
    const intervalId = window.setInterval(() => {
      setSeconds((current) => current + 1);
    }, 1000);
    return () => window.clearInterval(intervalId);
  }, [status]);

  useEffect(
    () => () => {
      window.clearTimeout(timeoutRef.current);
    },
    [],
  );

  const flipCard = useCallback(
    (card) => {
      if (
        status !== "playing" ||
        isChecking ||
        flippedIds.includes(card.id) ||
        matchedIds.includes(card.pairId)
      ) {
        return;
      }

      if (flippedIds.length === 0) {
        setFlippedIds([card.id]);
        return;
      }

      const firstCard = cards.find((item) => item.id === flippedIds[0]);
      const nextFlippedIds = [firstCard.id, card.id];
      setFlippedIds(nextFlippedIds);
      setMoves((current) => current + 1);
      setIsChecking(true);

      timeoutRef.current = window.setTimeout(() => {
        if (firstCard.pairId === card.pairId) {
          setMatchedIds((current) => [...current, card.pairId]);
          if (matchedIds.length + 1 === pairCount) setStatus("won");
        }
        setFlippedIds([]);
        setIsChecking(false);
      }, firstCard.pairId === card.pairId ? 420 : 850);
    },
    [cards, flippedIds, isChecking, matchedIds, pairCount, status],
  );

  return {
    cards,
    flippedIds,
    matchedIds,
    moves,
    seconds,
    status,
    isChecking,
    flipCard,
    startGame,
    showSetup,
  };
}

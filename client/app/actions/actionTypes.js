export const CREATE_FIELD = 'match.createField';
export const createField = () => ({type: CREATE_FIELD});

export const MOVE = 'match.move';
export const move = (user, pos, card) => ({type: MOVE, payload: {user, pos, card}});

export const JOIN = 'match.join';
export const join = (user, playDeck) => ({type: JOIN, payload: {user, playDeck}});

export const CHANGE_CARD = 'match.changeCard';
export const changeCard = (user1, user2, oldCard, newCard) =>
    ({type: CHANGE_CARD, payload: {user1, user2, oldCard, newCard}});

export const PROCESS = 'math.process';
export const process = (field) => ({type: PROCESS, payload: {field}});

export const MATCH_END = 'match.end';
export const matchEnd = (user1, user2, field, force) => ({type: MATCH_END, payload: {field, user1, user2, force}});


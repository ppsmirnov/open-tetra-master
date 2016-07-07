export const CREATE_FIELD = 'createField';
export const createField = () => ({type: CREATE_FIELD});

export const PLACE_CARD = 'placeCard';
export const placeCard = (pos, card) => ({type: PLACE_CARD, payload: {card, pos}});
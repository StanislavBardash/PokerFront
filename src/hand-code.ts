/*
 * Card id, ranges from 0 to 51.
 *
 * The two least significant bits represent the 4 suits, ranged from 0-3.
 *
 * The rest of it represents the 13 ranks, ranged from 0-12.
 * More specifically:
 * deuce = 0, trey = 1, four = 2, five = 3, six = 4, seven = 5, eight = 6,
 * nine = 7, ten = 8, jack = 9, queen = 10, king = 11, ace = 12.
 *
 * 13 * 4 gives all 52 ids.
 */

/**
 * The ranks of the cards sorted highest to lowest.
 *
 * - 2 = 0
 * - 3 = 1
 * - 4 = 2
 * - 5 = 2
 * - 6 = 4
 * - 7 = 5
 * - 8 = 6
 * - 9 = 7
 * - T = 8
 * - J = 9
 * - Q = 10
 * - K = 11
 * - A = 12
 *
 * 6 bits each.
 * @name rankCodes
 * @return {Object} the ranks indexed as described above
 */
const rankCodes: Record<string, number> = {
  2: 0b000000,
  3: 0b000100,
  4: 0b001000,
  5: 0b001100,
  6: 0b010000,
  7: 0b010100,
  8: 0b011000,
  9: 0b011100,
  T: 0b100000,
  J: 0b100100,
  Q: 0b101000,
  K: 0b101100,
  A: 0b110000,
};

const rankCodeStrings: Record<number, string> = {
  0b000000: '2',
  0b000100: '3',
  0b001000: '4',
  0b001100: '5',
  0b010000: '6',
  0b010100: '7',
  0b011000: '8',
  0b011100: '9',
  0b100000: 'T',
  0b100100: 'J',
  0b101000: 'Q',
  0b101100: 'K',
  0b110000: 'A',
};

/**
 * The suitCodes
 *
 * - s = 0
 * - h = 1
 * - d = 2
 * - c = 3
 *
 * @name suitCodes
 * @return {Object} the suits indexed as described above
 */
const suitCodes: Record<string, number> = {
  s: 0b00000,
  h: 0b00001,
  d: 0b00010,
  c: 0b00011,
};

const suitCodeStrings: string[] = ['s', 'h', 'd', 'c'];

/**
 * Converts the given card code into a string presentation.
 *
 * @name stringifyCardCode
 * @function
 * @param {number} code the card code, i.e. obtained via `cardCode(rank, suit)`.
 * @return {string} a string representation of the card in question, i.e. `Ah`
 */
function stringifyCardCode(code: number): string {
  const rank = code & 0b111100;
  const suit = code & 0b000011;
  return rankCodeStrings[rank] + suitCodeStrings[suit];
}

/**
 * Converts the given rank index into a rank.
 *
 * @name stringifyRank
 *
 * @param {number} rank the rank to stringify, i.e. `0b000100`
 * @returns {string} the string of the rank, i.e. `'2'`
 */
function stringifyRank(rank: number): string {
  return rankCodeStrings[rank << 2];
}

/**
 * Converts the given suit index to a suit.
 *
 * @param {number} suit the suit to stringify, i.e. `0b1`
 * @returns {string} the string of the sut, i.e. `'c'` (clubs)
 */
function stringifySuit(suit: number): string {
  return suitCodeStrings[suit];
}

/**
 * Determines the code for the given hand.
 *
 * @name cardCode
 * @function
 * @param {string} rank the rank of the hand, i.e. `A`
 * @param {string} suit the suit of the hand, i.e. `h`
 * @return {number} the card code that can be used to further evaluate the hand
 */
function cardCode(rank: string, suit: string): number {
  return rankCodes[rank] | suitCodes[suit];
}

function toCardCode(x: [string, string]): number {
  return rankCodes[x[0]] | suitCodes[x[1]];
}

/**
 * Determines the code for the given hands.
 *
 * @name cardCodes
 * @function
 * @param {Array.<string>} cards the cards to convert into card codes, i.e. `[ 'Ah', 'Kd' ]`
 * @return {Array.<number>} the card codes that can be used to further evaluate the hands
 */
function cardCodes(cards: [string, string][]): number[] {
  return cards.map(toCardCode);
}

/**
 * Determines the code for the given hands.
 *
 * @name boardCodes
 * @function
 * @param {string} board the board to convert into card codes, i.e. `'Ah Kd Qh'`
 * @return {Array.<number>} the card codes that can be used to further evaluate the hands
 */
function boardCodes(board: string): number[] {
  const cards = board.trim().split(/ /);
  const formattedCards: [string, string][] = cards.map(card => [card, 'someDefaultValue']);
  return cardCodes(formattedCards);
}

export {
  cardCode,
  cardCodes,
  boardCodes,
  rankCodes,
  suitCodes,
  stringifyCardCode,
  stringifyRank,
  stringifySuit,
};

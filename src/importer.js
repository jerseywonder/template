import { contains, has_duplicates, chunkArrayInGroups, unmatched_array, match_array, multiples, getNextHighestIndex, shuffle, sum, unique, getClosest } from "./helpers/arrays"; // Things you can do with arrays
import { trunc, randomString, toTitleCase } from "./helpers/strings";
import colour from "./helpers/colours/color-conversion-algorithms"; 
import palette from "./helpers/colours/palette"; 
import readCookie from "./helpers/cookies/cookie"; 
import localStorage from "./helpers/storage/storeage"
import mustache from "./helpers/templating/mustache"
import { temporalFormat } from "./helpers/time"
import { validateEmail } from "./helpers/validation"

export default {
	contains: contains,
	has_duplicates: has_duplicates,
	chunkArrayInGroups: chunkArrayInGroups, 
	unmatched_array: unmatched_array, 
	match_array: match_array, 
	multiples: multiples, 
	getNextHighestIndex: getNextHighestIndex, 
	shuffle: shuffle, 
	sum: sum, 
	unique: unique,
	colour: colour,
	palette: palette,
	readCookie: readCookie,
	localStorage: localStorage,
	mustache : mustache,
	trunc: trunc, 
	randomString: randomString, 
	toTitleCase: toTitleCase,
	temporalFormat: temporalFormat,
	validateEmail: validateEmail
};
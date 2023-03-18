import type { SortFunction, SortReturn, ValueGetter } from './types';

export type OrderBy = 'ascending' | 'descending' | 'unsorted';

export const sortByStringAttribute =
	<T>(attributeGetter: ValueGetter<T>): SortFunction<T> =>
	(left: T, right: T): SortReturn => {
		const [leftValue, rightValue] =
			typeof attributeGetter === 'function'
				? [attributeGetter(left), attributeGetter(right)]
				: [left[attributeGetter], right[attributeGetter]];

		if (leftValue < rightValue) {
			return -1;
		}
		if (leftValue > rightValue) {
			return 1;
		}
		return 0;
	};

export const reverse =
	<T>(sortFunction: SortFunction<T>) =>
	(a: T, b: T) =>
		-sortFunction(a, b);

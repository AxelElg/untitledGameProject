export default function platformsIndexGenerator() {
	const indexArr = [];
	const newIndexNr = () => {
		const indexNr = Math.floor(Math.random() * 10 - 0.0000001);

		const conditions0Or9 = [
			indexNr === 0 || indexNr === 9,
			indexArr.length <= 2,
			!indexArr.includes(0 && 9),
			indexArr.every(e => e !== 2 || e === 1),
			indexArr.every(e => e !== 7 || e === 8),
		];

		const conditions1To8 = [
			indexNr !== 0 && indexNr !== 9,
			!indexArr.includes(indexNr),
			indexArr.every(
				e => Math.abs(e - indexNr) !== 2 || Math.abs(e - indexNr) === 1
			),
		];

		if (conditions0Or9.every(e => e)) {
			indexArr.push(0, 9);
		}
		if (conditions1To8.every(e => e)) {
			indexArr.push(indexNr);
		}
	};
	while (indexArr.length < 4) {
		newIndexNr();
	}
	return indexArr;
}

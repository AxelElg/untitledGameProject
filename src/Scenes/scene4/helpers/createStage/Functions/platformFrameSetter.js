export default function platformFrameSetter(
	platform,
	platformArr,
	tileMapSpectrum
) {
	if (
		(platformArr.includes(platform + 1) || platform === 9) &&
		(platformArr.includes(platform - 1) || platform === 0)
	) {
		return tileMapSpectrum + 3;
	}
	if (platformArr.includes(platform + 1) || platform === 9) {
		return tileMapSpectrum + 2;
	}
	if (platformArr.includes(platform - 1) || platform === 0) {
		return tileMapSpectrum + 4;
	}
	return tileMapSpectrum + 5;
}

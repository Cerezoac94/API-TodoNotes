const institutionalId = (id, role) => {
	let instId = '';
	if (id < 99999) {
		instId = id.toString().padStart(6, '0');
	} else {
		instId = id;
	}
	return role == 3 ? `up-S${instId}` : `up-T${instId}`;
};
export default institutionalId;

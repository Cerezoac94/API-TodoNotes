const errorHandler = (err, req, res, next) => {
	const statusCode = err.statusCode || 500;
	const message = err.message || 'Error interno del servidor';
	res.status(statusCode).send({
		success: false,
		message,
	});
};

export default errorHandler;

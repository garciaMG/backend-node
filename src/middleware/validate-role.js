const isAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(500).json({
            msg: 'Debe validar token antes'
        });
    };

    const { role, name } = req.user;

    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${name} no es usuario administrador`
        });
    };

    next();
};

// Sirve para recibir parametros en un middleware
// const hasRole = (...roles) => {
//     return (req, res, next) => {
//         next();
//     };
// };

module.exports = {
    isAdmin
};

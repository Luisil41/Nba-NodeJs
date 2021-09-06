const isAuth = (req, res, next) => {
    if(req.isAuthenticated()) {
      // El usuario está autenticado, por lo tanto le permitimos el paso
      return next();
    }
  
    // Si no está autenticado redirige a login
    return res.redirect('/auth/login');
  };
  
  const isAdmin = (req, res, next) => {
  
    if(req.isAuthenticated()) {
      // está autenticado
  
      if(req.user.role === 'admin') {
        // el usuario es admin
        return next();
      }
      return res.redirect('/players');
    }
  
    return res.redirect('/auth/login')
  };
  
  module.exports = {
    isAuth,
    isAdmin,
  }
  
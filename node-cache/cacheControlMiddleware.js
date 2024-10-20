function cacheControlMiddleware(options = {}) {
  return (_, res, next) => {
    const { cacheType = 'public', maxAge = 3600, mustRevalidate = false } = options;
    
    let directives = [`${cacheType}`, `max-age=${maxAge}`];
    
    if (mustRevalidate) {
      directives.push('must-revalidate');
    }
    
    res.setHeader('Cache-Control', directives.join(', '));
    
    next();
  };
}

export default cacheControlMiddleware;


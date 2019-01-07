import helmet from 'helmet';

import compression from 'compression';

module.exports = function(app) {
  app.use(helmet());
  app.use(compression());
};

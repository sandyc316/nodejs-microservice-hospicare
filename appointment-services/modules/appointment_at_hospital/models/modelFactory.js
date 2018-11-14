
var models = require('./models');

class ModelFactory {
	constructor() {
		
	}

	static getModel(modelName, cfg, repoType = "") {
		if (repoType === "")
			repoType = cfg.app.repoType;

		return new models[repoType][modelName]();
	}
}

module.exports = ModelFactory;

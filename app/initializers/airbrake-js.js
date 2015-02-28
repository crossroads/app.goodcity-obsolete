import config from "../config/environment";

export default {
  name: "airbrake-js",
  initialize: function(){
    if(["staging", "production"].indexOf(config.environment)) {
      Airbrake.setHost(config.APP.AIRBRAKE_HOST);
      Airbrake.setProject(config.APP.AIRBRAKE_PROJECT_ID, config.APP.AIRBRAKE_PROJECT_KEY);
      Airbrake.setEnvironmentName(config.environment);
    }
  }
};

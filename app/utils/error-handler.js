import Ember from 'ember';
import config from '../config/environment';

export default function(error){
  if(config.environment === "production") {
    Airbrake.push({error: error });
  }
  return;
}

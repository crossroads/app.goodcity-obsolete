#Upgrade Ember 1.10.0
==========Steps to Upgrade Ember and Ember-CLI==============
1. In Brocfile.js:
 ```sh
  vendorFiles: { 'handlebars.js': null } 
 ```
2. In bower.json
 ```sh
   Ember version - "1.10.0" 
 ```
3. In package.json
   ```sh
   a) Ember-cli version - "0.1.15" 
  b) ember-cli-htmlbars version "^0.7.4" 
  ```

4. Followed this link: http://www.ember-cli.com/#upgrading
 ```sh
  npm uninstall -g ember-cli
  npm install -g ember-cli
  ember install
  bower install
 ```

5. Added changes in app:

  - For translation:
    ```sh
    Replace {{t "notifications.text" textBinding=nextNotification.text}} by {{t "notifications.text" text=nextNotification.text}}
    Replace {{translateAttr title="items.edit_images.delete_tooltip"}} by title={{t "items.edit_images.delete_tooltip"}}
     ```
 -  Changed else-if ladder 

=========== Ember-data Upgrade ============

1. In bower.json
 ```sh
   ember-data version: "1.0.0-beta.15"
  ```
2. bower install


==============Glabal Upgrade===============
 ```sh
  npm uninstall -g ember-cli
  npm install -g ember-cli
  ember install
  bower install
  ```

# General Assembly Singapore Web Development Immersive 11

# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) Project #2: [PersonlTrainr](https://personltrainr.herokuapp.com/)
---
### **User Story**

 **PersonlTrainr** is created for individuals who have a busy schedule, and would like to hire a personal trainer to get professional training.

 **PersonlTrainr** aims to create a platform for users and enable them to engage the services of a personal trainer.

 **PersonlTrainr** makes finding a personal trainer near your preferred location such as the condo gym, parks or fitness courts much easier.

 ---

 ### **Getting started**


* Run `yarn install` or `npm install` to install dependencies
 * Use `yarn start` or `npm start` to run index.js


**Packages used**

 ![Imgur](http://i.imgur.com/kaRunvr.png?5)

 **Google Javascript API**

 * API key obtained here [GOOGLE MAPS API](https://developers.google.com/maps/documentation/javascript/)

 ![Imgur](http://i.imgur.com/KvbH9Hb.png)

 ---

 ### **Entity Relationship Diagram (ERD)**

 ![Imgur](http://i.imgur.com/GTQaVTk.png?1)

 User model will have 0 or 1 trainers

 Trainer model will have 0 or many trainers

**During the signup process, password will get hashed :**

![Imgur](http://i.imgur.com/Ek6vHrG.png?1)
 ```
 const bcrypt = require('bcrypt')

 userSchema.pre('save', function (next) {
   var user = this
   // Only hash the password if it has been modified (or is new)
   if (!user.isModified('password')) return next()

 // hash the password asynchronously
   bcrypt.hash(user.password, 10, function (err, hash) {
     if (err) return next(err)
   // Override the cleartext password with the hashed one
     user.password = hash
     next()
   })
 })
```

---

### **RESTful Routes**

**userRoute**  and  **trainerRoute**

```
// ---------- authentication
function isAuthenticated (req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.redirect('/')
  }
}

function notAuthenticated (req, res, next) {
  if (!req.isAuthenticated()) {
    next()
  } else {
    res.redirect('/users/profile')
  }
}
```

`/users` - For signup - `/trainers`

 * **renders** html signup handlebars, **post** request from signup form, calls `create()`

`/users/login` - For login `/trainers/login`

* **renders** html login handlebars, **post** request from login form calls `passport.authenticate()`

`/users/profile` - For user profile - `/trainers/profile`

* **renders** calls `show()` to render user profile handlebars

`/users/update` - Update profile - `/trainers/update`

* **renders** html update form, **post** request from update form, calls `update()`

**/Search** renders 3 forms, **post** request redirects to another page, and calls `searchName()` `searchLocation()` `searchAll()`

`/users/search/name` - Search by name - `/trainers/search/name`

`/users/search/location` - Search by location - `/trainers/search/location`

`/users/search/all` - Search all - `/trainers/search/all`


  ---

### **Controllers**

```
 module.exports = {
   create,
   show,
   update,
   searchName,
   searchLocation,
   searchAll,
   destroy
 }
 ```

 **create()**

 `creates a new user/trainer.Schema and saves it into mongodb. Includes a geocoder that takes the location returns the latitude and longitude`

 **show()**

 `renders profilepage handlebars`

 **update()**
 ```
 User.findOneAndUpdate({
   _id: req.user.id
 }, {
   $set: {
     password: req.body.user.password,
     email: req.body.user.email,
     location: req.body.user.location,
     height: req.body.user.height,
     weight: req.body.user.weight
   }
 }
 ```

 **searchName()**
 **searchLocation()**
 **searchAll()**

` db.collection.find({req.body.search})` data from the input field to search the database and return the data object

 **destroy()**

`db.collection.findOneAndRemove({_id: req.user.id}` deletes the current id

---
### **Future Developments**

* Much, much more stuff to be added, comments and suggestions are much appreciated and welcomed to improve [PersonlTrainr](https://personltrainr.herokuapp.com/)

* Nicer UI for the updating form...

* Trainer profile page, accessibility to contact details to be added...

* Clicking on the location should bring the marker on the map

* Facebook login option to speed up the signup process...

* Option for client to remove the personal trainer when not engaging the services anymore...

* Important to include photo uploading, to store progress photos...

* CSS to be added...

---

**Acknowledgements**
* Instructor Prima Aulia
* Assistant Shimei
* WDI 11 classmates

### Useful Resources

* **[MDN Javascript Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript)** _(a great reference for all things Vanilla Javascript)_
* **[jQuery Docs](http://api.jquery.com)** _(if you're using jQuery)_
* **[GitHub Pages](https://pages.github.com)** _(for hosting your game)_
* **[How to write readme - Markdown CheatSheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)** _(for editing this readme)_
* **[How to write a good readme for github repo!](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2)** _(to make it better)_

---

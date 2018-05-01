
## Installation
Requires an Apache server as well as a MySQL Server. I suggest Xampp as that's what was used for development
Extract all files into the htdocs folder on an apache server
With a MySql server running, head to http://localhost/phpmyadmin and create a new database called 'API'

Then go to http://localhost/init and it should create the users table. Alternatively run the following SQL query

` CREATE TABLE IF NOT EXISTS `users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT ,
  `username` VARCHAR(255) NOT NULL ,
  `first_name` VARCHAR(255) NOT NULL ,
  `last_name` VARCHAR(255) NOT NULL ,
  `email` VARCHAR(255) NOT NULL ,
  `type` VARCHAR(255) NOT NULL ,
  `enabled` BIT NOT NULL ,
  PRIMARY KEY (`id`)) ENGINE = InnoDB; `

Edit the configuration file to match your database details found at /src/config/db.php. Although these will be defaulted for Xampp

Everything should be running fine, visit http://localhost/ to view the application.

Click the Init link at the top of the page to add seed users and clear the database on this page.

Notes on Installation:
If the application was to be properly deployed, the index and .htaccess would also go in the public folder.
Following this a virtual host would have been added to the Apache configuration. This way would more security to the source files.
I opted not to go this route to purely to simplify Installation. To swap to you would need to reconfigure the includes in PHP as well as the React app and rebuild with Webpack.

I had some issues when testing unbundling on another machine with the .htaccess file. If you need to recreate one use the following setup
`
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.php [QSA,L]
`

## Information
With the simplicity of the task I decided to set myself some goals:
I wanted to try out PHP for the backend, since my experience with PHP is limited it was an opportunity to learn something new. I ended up using the SlimPHP framework to create a RESTful API. It was simple enough to use and had some similarities with express routing which I'm familiar with.
I wanted to use React for the frontend, since I have decent experience with it and the application is very simple. It also allows the application to work seamlessly and would allow for additional features to be added later.
I have not used React with PHP so I was interested in how they interact with one another. It would have been an easier task to just use jQuery but I didn't want to go that route.
I actually had some trouble getting the React app to work on the Apache server, which turned out to be a quirk in how React Router works, some shuffling around of files fixed this problem.

I wanted to keep this application simple, so I decided not to use any login authentication although it wouldn't be too difficult to implement. I would likely have used JWT had I gone this route.
I opted to not have any sorting or filtering features, this wouldn't have been to difficult to implement on top of the final version.
I also wanted to give the option to Initialize the database and use Mockaroo to generate some initial data.
For styling I kept bootstrap linked separately, and kept my styling to a minimum.

My thoughts upon finishing:
PHP wasn't as difficult as I thought it would have been, although later I found some holes in the security of the my code and patched them up. I don't really have the experience to know what is missing, but that is something I'll look whenever I have the time.
I found that React Router works very explicitly and initially caused me headaches when getting it to run on Apache. Lesson learnt and I'll know to look out for it next time.
To me the whole RESTful API feels exposed without having any authentication, but for simplicity I left it out.
The application came out as I expected. Although I could've probably gone around Validation a bit better.
Probably should have made commits a bit more often, but just got focused in at times.
Something to look at in the future is improving the production bundling in webpack.

## Changelog:

### v0.1
Initial bulk of the REST API setup in PHP using the Slim PHP framework.
Still have to implement backend validation for the POST method.
Look into improving the UPDATE method.

### v0.2
Setting up the initial react pages
Run into an issue serving the static homepage, something to look at later.

### v0.3
Added the bulk of the operations in React
Fetches users on the dashboard - To do: add pagination
Fetches user on profile page
Edit page auto fills out form with pulled data - To do: Add update request
Add User page renders correctly, with no data in the form - To do: Add post request

### v0.5
Added functionality to add and edit profile pages
Added a delete button on profile pages - Todo: add confirmation
Removed debugging console.logs
Added a header component

### v0.6
Pulled the React CRUD Operations out into their own actions file, should be easier to fix url later
Added some form validation - If possible look into tidying this up.
Added pagination (basic)
Added delete confirmation

### v0.7
Added Init page
Found the cause of the React Routing problem and provided a solution. Todo: Look back at this later.
Changed location of index.php and .htaccess

### v0.8
Added basic bootstrap styling

### v0.9
Pagination correctly works now - Just needs styling a bit
Added more React Validation - No longer allows duplicate user or emails

### v0.10
Added security to the user routes in PHP. Fixed some holes in the code allowing SQL injections.
-It's not perfect but better than it was previously

### v0.11
Styled pagination
If no users, display a message.
Add delete all users option to Init for testing purposes. Along side confirmation alert boxes on all Init options
Restructured project
Added notes to README.md

### v0.13
Removed the create table option from Init, since the page is not accessible before it is created. Instead instructions have been added at the top of the README.md

#### Todo:
Consider additional PHP Validation - Should be fine from the front end but probably worth looking at.
Explore the routing issue further

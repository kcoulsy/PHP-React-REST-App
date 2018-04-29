##Changelog:

###v0.1

Initial bulk of the REST Api setup in PHP using the Slim PHP framework.
Still have to implement backend validation for the POST method.
Look into improving the UPDATE method.

###v0.2
Setting up the initial react pages
Run into an issue serving the static homepage, something to look at later.

###v0.3

Added the bulk of the operations in React
Fetches users on the dashboard - To do: add pagination
Fetches user on profile page
Edit page auto fills out form with pulled data - To do: Add update request
Add User page renders correctly, with no data in the form - To do: Add post request

####Todo:
Fix urls - currently fetching from a different port on localhost
Add the delete functionality
Look into the REST api, potential sql injection problem.

###v0.4

####Todo:
Fix react routing problem
Add react validation on the form.
Add php validation

####Notes:
Select on form is Case sensitive

###v0.5
Added functionality to add and edit profile pages
Added a delete button on profile pages - Todo: add confirmation
Removed debugging console.logs
Added a header component

####Todo:
Fix urls - currently fetching from a different port on localhost
Look into the REST api, potential sql injection problem.
Fix react routing problem
Add react validation on the form.
Add php validation
Add Delete confirmation
Add init page
Add pagination

###v0.6
Pulled the React CRUD Operations out into their own actions file, should be easier to fix url later
Added some form validation - If possible look into tidying this up.
Added pagination (basic)
Added delete confirmation

####Todo:
Fix urls - currently fetching from a different port on localhost
Look into the REST api, potential sql injection problem.
Fix react routing problem
Could take react validation further
Add php validation
Add init page
Add some styling

###v0.7
Added init page
Found the cause of the React Routing problem and provided a solution. Todo: Look back at this later.
Changed location of index.php and .htaccess

####Todo:
Look into the REST api, potential sql injection problem.
Could take react validation further
Add php validation
Add some styling
Improve pagination
Clean up files

###v0.8
Added basic bootstrap styling

####Todo:
Look into the REST api, potential sql injection problem.
Could take react validation further
Add php validation
Improve pagination
Clean up files
Profile page loading

###v0.9
Pagination correctly works now - Just needs styling a bit
Added more React Validation - No longer allows duplicate user or emails

####Todo:
Look into the REST api, potential sql injection problem.
Add php validation
Clean up files

###v0.10
Added security to the user routes in PHP. Fixed some holes in the code allowing SQL injections. 
-It's not perfect but better than it was previously

####Todo:
PHP Validation - Should be fine from the front end but probably worth looking at
Clean up files
Look into styling Pagination

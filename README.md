Changelog:

v0.1

Initial bulk of the REST Api setup in PHP using the Slim PHP framework.
Still have to implement backend validation for the POST method.
Look into improving the UPDATE method.

v0.2
Setting up the initial react pages
Run into an issue serving the static homepage, something to look at later.

v0.3

Added the bulk of the operations in React
Fetches users on the dashboard - To do: add pagination
Fetches user on profile page
Edit page auto fills out form with pulled data - To do: Add update request
Add User page renders correctly, with no data in the form - To do: Add post request

Todo:
Fix urls - currently fetching from a different port on localhost
Add the delete functionality
Look into the REST api, potential sql injection problem.

v0.4

Todo:
Fix react routing problem
Add react validation on the form.
Add php validation

Notes:
Select on form is Case sensitive

v0.5
Added functionality to add and edit profile pages
Added a delete button on profile pages - Todo: add confirmation
Removed debugging console.logs
Added a header component

Fix urls - currently fetching from a different port on localhost
Look into the REST api, potential sql injection problem.
Fix react routing problem
Add react validation on the form.
Add php validation
Add Delete confirmation

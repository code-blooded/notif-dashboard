# notif-dashboard
A dashboard for displaying various bank notifications and statistics

<br>
Requires MongoDB to be running on localhost:27017 and the data can be imported from 'db/bank_notifications.json' the db name is 'bank' and collection name is 'notifications'

<br>
<h2>Running the application</h2>

The docker way to run: 'docker-compose up'
Run independently:
1) Dashboard: 
  Go to '\notif-dashboard\frontend' and run 'npm start'
2) Backend:
  Go to '\notif-dashboard\backend' and run 'node application.js'
3) MongoDB & Compass:
  Install MongoDB and compass. Import data from 'db/bank_notifications.json' the db name is 'bank' and collection name is 'notifications'

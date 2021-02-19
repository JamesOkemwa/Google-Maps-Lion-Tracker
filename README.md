# Overview
This is a web application that enables users to capture the location where lions or other features of interest have been spotted. The position is then displayed on a map with popup showing the time when the lion was spotted. The application can be used by game rangers and tour guides to help track lions or other animals easily during game drives in large parks, hence making animal spotting to be easy.

## Technical overview
The application is built using the React.js library

react-google-maps/api package is used to get google maps up and running in the application.
use-places-autocomplete package is used to integrate google places search in the application.
@reach/combobox is used to display the search results when a user is typing in an appealing manner.
Javascripts geolocation API is used to get the user's location from the browser, from which the map is panned to and centered on.

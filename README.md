# Football Analyst

The Football Analyst application provides coaches, fantasy football players, and football enthusiasts with an in depth look into statistics, play calls, and team tendencies. This app allows the user to focus on specific down and quarter situations, pass distribution, and run locations.
 
## UX
 
I designed the Football Analyst application with a minamalist approach to appeal to varying types of users. On one end of the spectrum, you have coaches who like as much detail as possible. In the middle, you have fantasy football players who are looking for key statistics on who are the best players to use against specific defenses. On the other end of the spectrum, you have football enthusiasts who love the game of football and are statistic junkies.

### USER STORIES:

#### As a coach:
- I want to exploit my opponents weaknesses so that my team wins the game.
- I want to filter every pass/run situation so that my team can make better play calls.
- I want to view team by team data so that I can gameplan for a specific opponent.
- I want to filter by the following criteria so that I can see playcall tendancies:
	- Down
	- Quarter
	- Pass Location
	- Pass to Position
	- Run Location
	- Run Gap

#### As a fantasy football player:
- I want to breakdown offensive statistics so that I can choose the best players to play for that week.
- I want to view a summary of team-by-team data so that I can easily spot pass/run tendancies.
- I want to filter pass to position so that I can see which positions get more passes based on opponent.
- I want to view weekly pass vs run plays so I can see which play type they favor against certain opponents.

#### As a football enthusist:
- I want to view football statistics in an easy to read format so that I can understand the game better.

## Features

In this section, you should go over the different parts of your project, and describe each in a sentence or so.
 
### Existing Features
- Start Tour Button: allows user to take a visual tour of all the features offered in the app.
- Reset Button: allows users to reset all filters on all charts by clicking the button.
- Reset Button (Each Chart): allows users to reset the filters on its own chart by clicking the button.
- Team Select: allows user to filter all graphs based on any team or the entire league by making a selection in the dropdown menu.
- Play Type Select: allows user to filter all graphs based on a run, pass, or all play type by making a selection in the dropdown menu.
- Total Plays Counter: allows user to view how many plays were executed by choosing filters on other charts.
- Total Yards Counter: allows user to view how many yards were gained by choosing filters on other charts.
- Average Yards Counter: allows user to view how many yards were gained per play executed by choosing filters on other charts.
- Weekly Yards Chart: allows users to view how many yards were gained on a weekly basis by a team or the league by making a selection in the "Team" dropdown.
- Weekly Pass vs. Run Chart: allows users to view how many pass/run plays were executed on a weekly basis by a team or the league by making a selection in the "Play Type" dropdown.
- Down Row Chart: allows users to filter all chart results on plays executed on a certain down (1-4) by selecting a bar in the row chart.
- Quarter Row Chart: allows users to filter all chart results on plays executed in a certain quarter (1-5) by selecting a bar in the row chart.
- Complete/Incomplete Pie Chart: allows users to filter all chart results on passes completed or not completed by selecting a slice in the pie chart.
- Pass Location Row Chart: allows users to filter all chart results on pass plays thrown to the left, middle or right by selecting a bar in the row chart.
- Pass to Position Pie Chart: allows users to filter all chart results on passes made to a specific position (e.g. WR, RB, TE, others) by selecting a slice in the pie chart.
- Run Location Row Chart: allows users to filter all chart results on run plays executed to the left, middle or right by selecting a bar in the row chart.
- Run Gap Row Chart: allows users to filter all chart results on run plays executed on the offensive line (e.g. End, Tackle, Guard, N/A) by selecting a bar in the row chart.

## Technologies Used

In this section, you should mention all of the languages, frameworks, libraries, and any other tools that you have used to construct this project. For each, provide its name, a link to its official site and a short sentence of why it was used.

- [Flask](http://flask.pocoo.org/)
	- The project uses **Flask** to run Python as an application.
- [Pymongo](https://api.mongodb.com/python/current/)
	- The project uses **Pymongo** to access a MongoDB database in Python.
- [Gunicorn](http://gunicorn.org/)
	- The project uses **Gunicorn** to run a WSGI HTTP server for the application.
- [DC.js](https://dc-js.github.io/dc.js/)
- [D3.js](https://d3js.org/)
- [Crossfilter.js](http://square.github.io/crossfilter/)
	- The project uses these Javascript libraries to create charts using large datasets.
- [Intro.js](https://introjs.com/)
	- The project uses the **Intro.js** Javascript library to create a tutorial overlay.
- [jQuery](http://code.jquery.com/)
	- The project uses **JQuery** to simplify DOM manipulation.
- [Bootstrap](https://getbootstrap.com/)
	- The project uses **Bootstrap** to create a responsive and mobile-first thinking website.
- [Google Fonts](fonts.google.com)
	- The project uses **Google Fonts** for web-friendly readable fonts.

## Testing

Product testing was run manually and can be found [here](https://docs.google.com/spreadsheets/d/1JuIEZ_lForOe0CpePoWHY-vdiUOLn1gA_eFDugBtlLE/edit?usp=sharing) 

These pages were tested:
- Index Page (Dashboard) 

Each of these pages were tested for:
- Layout, image, and font responsiveness to browser width and height resolutions.
- Button and Menu selections.
- Graph transitioning, redrawing, and rerendering due to user choices in the menu and/or other graphs
- Tutorial walkthrough

## Deployment

- The project is hosted on Heroku, deployed through Github and can be found [here](https://football-analyst.herokuapp.com/)
- Database deployed on mLab

### Differences bewtween Development and Production Versions

|                                 | Development          | Production |
| ------------                    | -----------          | ---------- |
| Debug Mode                      | True                 | False      |
| Database                        | MongdoDB             | MongoDB    |
| Database Version                | 3.6.3                | 3.6.6      |
| Database Host                   | Local                | mLab       |
| Web Host                        | Local                | Heroku     |
| Site URL                        | localhost            | https://football-analyst.herokuapp.com/ |

| Environment Variables           | Locally in .env file   | Config vars in Heroku |
| ------------                    | -----------            | ---------- |
| Database URI                    | MONGODB_URI            | MONGODB_URI |
| Database Name                   | MONGO_DB_NAME          | MONGO_DB_NAME |

## Credits

### Content
- The team and NFL Shield logos are property of the [NFL](https://www.nfl.com/)
- Database content used from [nfl-scrapR-data](https://ryurko.github.io/nflscrapR-data/)

### Media
- The photos used in this site were obtained from http://www.sportslogos.net/teams/list_by_league/7/National_Football_League/NFL/logos/

### Acknowledgements

- I received inspiration for this project from the game of football. For the love of the game.

## Authors

- **Marc Marquez** - [Github Page](https://github.com/marc-marquez/)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

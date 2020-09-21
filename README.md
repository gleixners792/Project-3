# WORLD WINE WEB #

## PROJECT #2 : VIsualize me, Captian! ##

## Proposal: ##

Wine Review

*	Topic: An interactive presentation based on reviews from tasters for visitors to select wines by country, province, variety and winery.
	
*	Dataset: Beginning Dataset is from Kaggle listing the content of the above wine reviews. Meeting the requirement of at least 100 records. 

*	Inspiration: To offer visitors a method to determine countries, regions, wineries and the reviews of their selected wines. This can assist in the visitors purchase and travel destinations.
	
*	Visuals: Dashboard Page will allow the visitor to select a wine variety to compare the taste testers reviews, selection of provinces to determine the available wines and their ratings. [rgentile notes-additional categories can be discussed]

## Project Summary ##

## Project Requirements: ##

### ETL and App Build ##
	
1. Cleaned the CSV file to incorporate the appropriate data field representation of the Wine Rating Data and decided to utilize wines with ratings 90 and above to give a succinct value to our presentation. This easily met the requirement of having at least 100 records.
	
2. Using Jupyter Notebook, the incorporated process followed was:
	
	a. Imported the data from these CSVs into Dataframes using Pandas.
			i. To create the the json library winemag-data-130k-v2.json. Also created the country.json for mapping purposes.
		
3. Built the app with flask, connecting our sqlite file to the database and creating routes for the different visualizations.
	
	a. Dashboard Page with Multiple Charts that Update from the same data
	
		i. Home Page with World Map Detailing country-by-country wine count.
	
		ii. Links to additional page
		
	b. Additional Page With Visual Presentation
	
		i. Pie Chart Showing Wine Variety by country
	
		ii. Bar Chart showing number of wines per country
	
		iii. Bubble Chart showing Price and Wine Point Ranking for each wine
	
4. Our Visualization are meant to present the wine enthusiast easily readable data to allow them multiple formats for learning about outstanding wines across the world. The interactive methodology we have utilized will provide the user a place to refer back to every time they want to research a high quality wine.

## Data Sources ##

* Wine Review Dataset- 130k wine reviews with variety, location, winery, price, and description
	*	https://www.kaggle.com/zynicide/wine-reviews

* Country Boundaries GeoJSON
  * https://github.com/johan/world.geo.json


## GROUP 3 – DIEGO GONZALEZ, RICK GENTILE & HANNAH LEE ##

* Diego Gonzalez - [@dlg410](https://github.com/dlg410)
* Richard Gentile - [@rgentile21](https://github.com/rgentile21)
* Hannah Lee - [@hannah1lee](https://github.com/hannah1lee)
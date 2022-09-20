# Workout App

This repository houses the source code and deployed production build of a react-based Workout Helper Application I made between June and August 2022.  

The application is **entirely** front-end, so no information placed into the application is stored on external servers. Furthermore, all computations are performed client-side, so your device will perform all computations. To save and load data, you simply save .wktlst files (which are JSON files under a different file name) onto your device, loading the information from the file when you use the application again.  

Aside from using create-react-app and chart.js, all assets and code in this program were solely created by me.  This open-source software is licensed using the MIT License. 

### Features

This application allows you to store weightlifting-related workouts & their exercises. For each workout, you can specify the name, the date, and (optionally) your weight during the working. In each exercise, you can specify the exercise name, the number of sets and number of reps you perform, and the number of weight. The app is also designed to accept different rep or different weight amounts per app by seperating each numerical value with a single space. For examples, please see the sample workout list I have provided.  

The app also allows users to view statistics about their workouts and to view line graphs for their body weight, BMI, or exercise-specific weight over time by visiting the 'Stats & Graphs' screen of the workout. To view this screen, after loading or creating a new file, click on the 'Workout List' dropdown menu and select 'Stats & Graphs.'  

Finally, I have included a sample Workout List inside the program for anyone to easily view the different features of the application. This sample list is a collection of some of my workouts over the past year, where you can see changes in my weight/BMI and in various exercises. To use this sample list, simply select 'Load File' on the title screen, check 'Use Cary's Default List', and press 'Import Workout Log'.  

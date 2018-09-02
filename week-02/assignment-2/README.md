#Week 2 Assignment: CSS Layout

This week's (short) assignment is intended to help you gain confidence with CSS layout. 

Frequently, you see data visualizations presented in the context of a single page application (SPA), which often looks something like this. The markup for a basic SPA is already complete (and comes with a main visualization region, a sidebar, and a footer). The specific dimensional requirements are as follows:

- Main viz region: takes up the right 70% of the screen
- Sidebar region: where a lot of the UI elements will live; takes up the left 30% of the screen
  - The sidebar may contain individual modules. These modules will be 200px tall, and follow natural stacking order within the sidebar.
- Footer: credits etc; takes up the bottom. 100px of the screen.

Please create CSS rules that will produce this layout from the HTML markup. You may find it helpful to give the elements some background color as you work through the exercise.

##Hints

###Getting started
First, you have to create a `style.css` file and include it with the HTML file. See our in-class example for how this works.

Also, by default many HTML elements come with margin and padding. You may find it helpful to override these properties by resetting everything to zero first.

###Styling `.container`
Because the entire app lives within `<div class="container">`, this element will need to take up the entire browser window. Therefore, you'll need to first set its CSS properties as follows:
```
{
	width:100%;
	height:100%;
}
```

*This will not work by itself.* Because `.container` inherits from `<body>`, and `<body>` from `<html>`. Both of those two elements will also need to be set up to take the whole screen.

##Bonus: working with Bootstrap
Can you add the Bootstrap CSS library and add the right class name to style the button into a Bootstrap button?


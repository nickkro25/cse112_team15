# PomoXV
[![CD](https://github.com/nickkro25/cse112_team15/actions/workflows/CD.yml/badge.svg)](https://github.com/nickkro25/cse112_team15/actions/workflows/CD.yml)

PomoXV is a web application dedicated to making the Pomodoro Technique as easy as possible. 

[Check out the application here!]( https://nickkro25.github.io/cse112_team15/)

## App Instructions

Read about how to use PomoXV in the ["App Walkthrough"](https://github.com/nickkro25/cse112_team15/wiki/App-Walkthrough) section of our wiki.

## Setup 
Requires:
- NodeJS + NPM

First, clone and cd into the repo
```bash
$ git clone <url>
$ cd cse112_team15
```
Install all the dependencies
```bash
$ npm install
```
Start the webapp on a local server
```bash
$ npm start
```
To view the app, open the localhost url in Chrome.

## Next Steps

### Code Documentation
To view the code documentation for the app,
```bash
$ git checkout dev_docs
go to /dev-docs/index.html
right click the file and host as a live server
```

### Logistical Documentation
To view the logistical documentation for the app (meeting notes, ADRS, etc), visit [here]( https://github.com/nickkro25/cse112_team15_docs)

### Contributing to the project
To get started contributing, visit the ["How to Contribute"]( https://github.com/nickkro25/cse112_team15/wiki/How-to-Contribute) section in the wiki!

## Future Roadmap
Here are some features we would have liked to add but couldn't due to time constraints:
- Improved statistics to let the user track their habits better
- Account system to let the user keep their stats and tasks across different devices
- Better accessibility, especially for colorblind people and people who need to use assistive technology such as screen readers
- More friendly and attractive mobile UI
- Restructured HTML and CSS for accessibility, SEO, and better developer experience
- Analytics / contact point to get user feedback

And some issues that still need to be fixed up:
- Ugly color theme transition upon refresh
- UI is inconsistent (highlighting, colors, modals such as the delete all modal)
- Need more robust testing (especially for notifications)
- Documentation is lacking for newly added code
- No CSS/HTML validator in the pipeline yet, need to manually validate
- Nav header switches colors slower


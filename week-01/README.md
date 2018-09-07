#Week 1: Setting up the working environment

## Software
Download the following software (creating an account where necessary)
- [ ] Slack (for course communication)
- [ ] Git ([link](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git))
- [ ] Python (if you have a Mac, you already have it installed)
- [ ] Set up a Github account
_Once signed up, please log your information in this public [google doc](https://docs.google.com/spreadsheets/d/1UijNUcn92i9X39A9pS0Ql-5ArxPfgWWrwXGBEcobAZU/edit#gid=0)_


## Working with the Command Line
The command line provides a simple way to interact with the operating system, and we will make extensive use of it throughout the course. You don't need to become an expert in it--yet. We'll start slow by working through the following tasks. Much of the following is Mac-specific, but parallel instructions exist for PC as well.

### Navigation
First, open the command line by going to "Application/Terminal". A window opens with `$` followed by an input cursor. This is where you'll input your command.

To navigate to a specific folder, use the following command (note space after `cd`):
```
cd [folder path]
```
Note that `folder path` is relative to the _current_ location. By default, you are at the root user folder. From here, you can navigate to the desktop:
```
cd Desktop
```
And then, you can see what files and folders exist at the current location. Simply enter--what do you see?
```
ls
```
To navigate back to the root folder:
```
cd $HOME
```
 
### Create a folder for this course
First, navigate to the root folder, and then, create a folder for all working files related to this course:
```
cd $HOME
mkdir artg-5330
```
In the future, you can always navigate to this location by using
```
cd $HOME/artg-5330
```

## Using Git to download course material
We will cover the use of Git in the subsequent classes. For now, see if you can follow these instructions to download the course material.

### Step 1
Ensure you have Git installed on your OS. 
### Step 2
Navigate to the working folder we've just created.
```
cd $HOME/artg-5330
```
### Step 3
All the course material lives in an online "repository". The current online ("remote") repository is at [this location](https://github.com/Siqister/artg-fall-2018). Your job is to create a local mirror of it on your computer.

** Make sure you "fork" this repo first so that you create a repo of your own **
Navigate to the online repo, and "fork" it. Then, copy the "clone" link (big green button).

### Step 4
Back in the terminal, use `git clone` to create a local copy of the remote repo:
```
cd $HOME/artg-5330
git clone [link to remote repo]
```

## Running Python
Navigate into the local repo, and run the following command:
```
python -m SimpleHTTPServer
```
This will serve the contents of the local repo locally at `localhost:8000`. Go to any browser on your computer, type in `localhost:8000` in the address bar. What do you see?
# Snake Grid JS by NavegaoHack

![Demo image.](/fonts/image.png "Demo image of the project.")

## Overview

Snake Grid is a HTML5 project writen entirely in Vanilla JS,
CSS and HTML, few native apis, no components, no cdns.
It can be downloaded and runned on the go.

## Features

__User Management__: users can be created and deleted, every
user has a unique nickname so a new name generates a new
user account automatically, besides, each user has a its
own password which it can be logged, (its password is 
completely visible due to the simple localStorage implementation,
security is not the goal in this project).

__Scores__: the game implements a system of scores in which
the more food and speed you get with the snake, the more score
you can sum.

__Settings__: snake speed, food, ask for login before playing and
the color theme are free to be choosed by the user, just open
the settings sidebar pressing on the _settings_ button in the
index or the _gear_ button in the main game.

__Color themes__: It can be found 4 color themes:
default, purrari, dracula, and gruvbox, inspiring in its
name references (except default).

## Pending features

__2 players__: play with two players in the same machine, each player
with an account or not.

__AI play__: similarly to the feture above, but a AI will be competing
with you in the career for obtain more score.

## How to Play

| Keys                | Action           |
| ------------------- |:----------------:|
| Arrow Left - A      | Move Left        |
| Arrow Up   - W      | Move Up          |
| Arrow Down - S      | Move Down        |
| Arrow Right - D     | Move Right       |
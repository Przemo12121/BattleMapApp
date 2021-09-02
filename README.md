# BattleMapApp

Author: Przemysław Małecki

Summary:
  
  The project is a simple ASP.Net Core MVC application for (multi) playing tabletop games via web browser. It allows players to move around their tokens, which represents their characters, on the 2D map previously uploaded by the player who acts as Game Master. For now it is only possible for one game running  - each player will access the same game data. Any libraries managing better site styles (like AngularJS or React) were not yet used in the project - the project is used as my learning attempt at ASP.Net Core, but also at web technologies (HTML5, CSS, JavaScript). The project is no rivalry to any other web application with similar functionalities.

Stuff used in project:
- C#, ASP.Net Core MVC for communication user-server
- JavaScript for user interactions with game content (tokens, map, etc.)
- Microsoft SignalR library for handling communication between users
- HTML5 and CSS for (basic) sites.
- <iframe> for handling server responses
- Model binding for uploading players data, game data, tokens data
- SQL and Entity Framework for database storing game data and token data (not yet included)

Features:
  
  - Game Master can browse map (saved in .png or .jpg format) to the site.
  - Game Master can place "fog of war" on the map to hide parts of map or enemies from view of players.
  - Game Master can scale map, so everyone can know what distance is between various points on the map.
  - Game Master can show and hide grid that is visible to every player, in order to help them see distances.
  - Game Master can upload map, its scale and fog of war to the server for others players to download to their browsers.
  - Game Master can create new tokens, store their templates, place those tokens on the map and assign them to players. (not yet implemented)
  - Game Master can kick players out from the game. (not yet implemented)
  - Every player can move tokens that are assigned to them (Game Master can move every token by default). (not yet implemented)
  - Upon moving tokens, distance traveled is displayed to every player in order to help maintain movement. (not yet implemented)
  - Chat. (not yet implemented)
  - Rolling dice simulator. (not yet implemented)
  
  

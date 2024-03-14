# Beachfinds

Application available at [polite-ground-086db8903.4.azurestaticapps.net](https://polite-ground-086db8903.4.azurestaticapps.net).
GraphQL available for testing at [https://tuulikiv-beachfinds.azurewebsites.net/graphql](https://tuulikiv-beachfinds.azurewebsites.net/graphql).

Beachfinds-app is meant for people who like to see what others have found on the beach and who want to share what they have found. There is a word for this kind of treasure hunting on beaches: beachcombing. Beachcombing is a serious hobby for some, and for others it´s something they may occasionally do. This application allows people to share their findings. Project was made on Web development 2 course in Metropolia with aim to practice building an app using graphql backend with typescript.

![view of Beachfinds front page](<Screenshot 2024-03-14 at 17.20.21.png>)

*Small disclaimer here; unfortunately the project is not finished but has still a lot to do. There are overlapping buttons etc. but especially there are in many places missing error handling and data sanitation and backend functionalitis that are not yet in use when testing in browser.*

## Typescript + Graphql + React + Vite

The frontend of this project is done using React Typescript with Vite. 
Typescript and GraphQL have been used in backend. Backend queries and mutations can be tested at https://tuulikiv-beachfinds.azurewebsites.net/graphql/.

More info on GraphQL: [GraphQL](https://graphql.org)

More info of Vite: [Vite](https://vitejs.dev)

More info of React with typescript: [React with typescript](https://react.dev/learn/typescript)

## How to use the app

Open browser to [Beachfinds](https://polite-ground-086db8903.4.azurestaticapps.net)

### Home

Homepage has a list of posts with some details and images. The posts can be filtered by title or tags. Tags are meant to act as identifiers that people may want to attach to their posts. The tags can be edited on the homepage, and currently it is not authorized in any way.

If you want to see additional details about the posts, you can click on the individual items.

### Login and registration

You can login with visitor@test.com and use “password” as password or if you want, you can register a new user below the login button. Fill in e-mail, username, password, country, city and contact. (Contact is not actually used in any way at the current app). Then choose “register” and Close. Login with you e-mail and password.

### How to add a new post?

1.  Add a new post when you are logged in by choosing “Add new post” from Navbar. 
2.  Insert Title for your post. For example “Megalodon tooth found!”
3.  Choose identifiers/tags. You can create new tags by writing and then clicking “create”, or you can use the existing ones or not use any if you don´t want to.
4.  Fill in item-name, for example “shark tooth” or whatever you want.
5.  Write a description. You can write in details or you can just write one letter.
6.  Choose category: Shells/Driftwood/Seaglass/Stones/Misc/Fossils
7.  Upload an image from your local machine.
8.  Save

**Note about the images**
*If your image has exif segment and coordinates, the location details for your post are fetched using those coordinates. If your image does not have coordinates, there is a process in place to add random beachy coordinates to your post. This is cheating, but I learned too late that most images do not have coordinates.*

### Individual posts

You can open individual posts for closer inspection by clicking on a post. The information available is title, description, owner, tags, image and below the image there may be additional details about the location. That location is fetched through **OpenCage Geocoding API**.

If you are logged in as admin or the user who created the post, you can edit or delete a post.

![image of individual post](<Screenshot 2024-03-14 at 18.19.34.png>)

If you wish to see the post in question on a map you can click on "Show on map link". When the map is opened, you need to zoom out the map quite a bit to actually see where the coordinates point to.

More info on OpenCage-Api: [OpenCage-Api](https://opencagedata.com).

#### Updating and deleting a post
If edit-button is not disabled, you can edit some features of the post. At this stage, its only possible to edit title, tags, item name and description. Deleting a post is done by simply hitting delete-button.

### Map and chat
The post-locations are marked to the map. Most likely you need to zoom out quite a bit. When you click a marker, a popup opens with a post title. Clicking the popup will open the post. You can then navigate back to the map with back-button. Map does not have any search options yet. The map-view also offers a chat window. It’s a regular **chatGPT** using openAI Api. This was intended as a helper, for example you could ask “Where can I find a lot of shells in Portugal?” and the chat will advice you. But it is not in anyway customized at this stage.

![Map view](<Screenshot 2024-03-14 at 18.35.06.png>)

More info on OpenAI Api: [OpenAiApi](https://openai.com/blog/openai-api).

### User

If you navigate to User-tab, you can modify your own (logged in) details or delete your account. If you delete your account, all your posts are deleted too. If you are logged in as admin, you will see a list of users and can delete the ones who have been posting rubbish.
________________________

## Other

The project uses upload-server to upload and serve images and auth-server for user authentication. Upload server is running on (beachfinds-uploadserver.azurewebsites.net) and auth-server on (beachfinds-authserver.azurewebsites.net).
Both are server that were used in Metropolia Webdevelopment 2 course and are provided by the course teacher.

In Github:  [upload-server](https://github.com/tuulikoo/upload_server)
            [auth-server](https://github.com/tuulikoo/auth_server)




### Running locally
If you want to run the project locally, you need to update some of the urls from azure to localhost. Start the project by installing with
```
npm i
```
then run vite with
```
npm run dev
```
and backend in another terminal with
```
npm run dev:backend2
```
If you want to build the project, do it first with 
```
npx vite build
```
and then continue with 
```
npm run build:backend
```
You need to configure .env with AUTH_URL, UPLOAD_URL, OPENAI_API_KEY, ports etc. You need to have upload- and auth-server on (npm run dev) to be able to use Beachfinds. Auth-server should use port 3001, upload-server port 3002 and beachfinds 3000. Vite runs automatically on port 5173.
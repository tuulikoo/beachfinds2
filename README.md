# Beachfinds

Beachfinds-app is meant for people who like to see what others have found on the beach and who want to share what they have found. There is a word for this kind of treasure hunting on beaches: beachcombing. Beachcombing is a serious hobby for some, and for others it´s something they may occasionally do. This application allows people to share their findings. Project was made on Web development 2 course in Metropolia with aim to practice building an app using graphql backend with typescript.

![view of Beachfinds front page](<Screenshot 2024-03-14 at 17.20.21.png>)

*Small disclaimer here; unfortunately the project is not finished but has still a lot to do. There are overlapping buttons etc. but especially there are in many places missing error handling and data sanitation and backend functionalitis that are not yet in use when testing in browser.*

## Typescript + Graphql + React + Vite

The frontend of this project is done using React Typescript with Vite. 
Typescript and GraphQL have been used in backend. Backend queries and mutations can be tested at https://tuulikiv-beachfinds.azurewebsites.net/graphql/.

More info on GraphQL: [GraphQL](https://graphql.org)
More info of Vite: [Vite](https://vitejs.dev)
More info of React with typescript: [React with typescript](https://react.dev/learn/typescript)




Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

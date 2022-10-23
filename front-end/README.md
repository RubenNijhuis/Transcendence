# Transcendence Front-end
## Intro
The documentation for the Transcendence front-end

<hr>

### Table of Contents
* [Tools used](#tools-used)
* [Folder structure](#folder-structure)
* [Component structure](#component-structure)
* [Container structure](#container-structure)

<hr>

###<a name="tools-used"></a> Tools used
Main
- Typescript
- ReactJS
- Styled-Components

Routing
- React Router

Requests
- Axios

Javascript Store API

<hr>

###<a name="tools-used"></a> Folder structure
The main folders are comprised of (in the order they are displayed in VSCode)
```
assets -/
components -/
config -/
containers -/
contexts -/
modules -/
pages -/
proxies -/
styles -/
types -/
utils -/
...
```

Here an explanation of the purpose every folder serves

##### Assets
The assets folder is meant to store icons, images, fonts and anything that is meant to be displayed.

##### Components
The components folder is meant to store pieces of UI that are used multiple times. Every piece of UI should strive to become a component as it's easier to build great UI's with smaller blocks. Making debugging and swapping of code easier.

##### Containers
Components that are only used once are `containers` they encompass more logic and often make requests to the api or other sources. It is still the goal of a container to be split up as much as possible and make use of the component to the maximum degree. Containers mainly serve the purpose of a component that is to big on it's own.

##### Contexts
Contexts
One of the issues with ReactJS (and UI libraries in general) is that data between components is difficult to share.

Contexts solve this problem by basically creating a bucket in which you can store functions and `state` (data). Components, containers and pages can hook in to this context and use it's state and functions.

##### Modules
Modules are stand-alone pieces of code that aren't dependent on the project or other libaries. The `Store` module is an example of a module that basically wraps a Javascript built-in API and make it more accesible and type-safe.

##### Pages
Deze spreekt voor zich tbh

##### Proxies
Proxies are promise-based functions that handle api requests. They are meant to encompass all the logic and error handling required when it comes to requests. Containers and contexts (and only containers and contexts) use these functions to communicate with other software

##### Styles
The styles folder stores all the globally defined styles and variables.

##### Utils
The utils folder is meant to be a temporary place for functions. In an ideal world a project doesn't have a `utils` folder as every piece of code should be accounted for and used where possible.

The bigger the utils folder the less there is focus on code structure.

<hr>

###<a name="component-structure"></a> Component structure
Files you can often expect in a component
```
1. index.tsx
2. [ComponentName].tsx
3. [ComponentName].style.tsx
...
```
##### Index
The index file create an import point. This removes the "double import" you have to do to retrieve functions from files

Without index
`import bla from 'components/bla/bla'

With index
`import bla from 'components/bla'

Way nice right!

##### Component file
The component file brings together all parts to make the container work. This often houses the returned JSX (HTML).

##### Style file
The style file has all the styles for the component.
Because we use styled components we can import all the styled html parts from here

<hr>

###<a name="container-structure"></a> Container structure
Note: container structure and component structure are very similiar but containers just have more logic

Files you can often expect in a container
```
1. index.tsx
2. [ComponentName].tsx
3. [ComponentName].style.tsx
4. [ComponentName].bl.tsx
...
```

##### Index
See component index

##### Component file
See component main file

##### Style file
See component style file

##### Business logic
Personally I hate the term "business logic" it has nothing to do with any business and barely describes what is actually in the file... logic.

This file is often created if the container has a lot of inner functions.
By abstracting the logic in a separate file we can reduce the complexity that is perceives when opening the main component file. 

The more we can understand code by just reading it the fewer brain gymnastics you have to do to understand the logic. AKA imperative programming

<hr>

###<a name="tools-used"></a> Container structure
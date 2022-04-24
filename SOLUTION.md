# Finimize Full-Stack Development Challenge

<p align="center">Forked & Attempted by Lopè Ariyo</p>

<p align="center">
  <a href="https://www.lopeariyo.dev/ ">
    <img alt="Lope Logo" src="https://pbs.twimg.com/profile_images/1248697046883762176/A80erP3V_400x400.png" width="120" />
  </a>
</p>

---

## Run Instructions

To run the app, `cd` into the project root directory and run `yarn install:server` & `yarn install:client` then run `yarn start`.

The basic test in the frontend has been modified ever so slightly for the client and there are two simple test in the backend to verify the status of the endpoint call based on the requestt body. These can be performed by running `yarn test:client` and `yarn test:server`. NB: server test will fail if the server isn't running.

---

## The Solution

### Inital Screens

![Initial Screen](/screenshots/noentry.png "Initial screen")

![Initial Screen Mobile](/screenshots/noentry-mobile.png "Initial mobile screen")

### Screens w/ Correct Inputs

![Good Inputs Screen](/screenshots/valid-entry.png "Screen with good inputs")

![Good Inputs Screen Mobile](/screenshots/valid-entry-mobile.png "Mobile screen with good inputs")

### Screens w/ Incorrect Inputs

![Bad Inputs Screen](/screenshots/validations.png "Screen with bad inputs")

![Bad Inputs Screen Mobile](/screenshots/validations-mobile.png "Mobile screen with bad inputs")

I've used conventional commits to ensure a detailed history of my approach. The commits are as follows:

1. [Implement Basic UI](https://github.com/LopeAriyo/fullstack-dev-challenge/commit/a7f4ea19d9e3a2f02f2aba9d158f5e73ac67ca22Created)
2. [Allow User Input](https://github.com/LopeAriyo/fullstack-dev-challenge/commit/f15cba4df4d56a936c625c9672f1a7fc984c5e2f)
3. [Create the server](https://github.com/LopeAriyo/fullstack-dev-challenge/commit/3d11f4413e689a851d39ac20074eb3b39b461833)
4. [Introduce testing and validations (in BE)](https://github.com/LopeAriyo/fullstack-dev-challenge/commit/125d4045d8cf30209e0c2266d99e93efd87d8d9c)
5. [Connect the FE to the BE](https://github.com/LopeAriyo/fullstack-dev-challenge/commit/2b01a83d9db6f4020a468b7a6f62c89985dbdf95)
6. [Display Chart Data](https://github.com/LopeAriyo/fullstack-dev-challenge/commit/bf290faa38cb92d0785c65bcd3205eacaf3345eb)
7. [Add FE Validations](https://github.com/LopeAriyo/fullstack-dev-challenge/commit/929380880b19819a663fd358acda36368187fc25)
8. [Refactor FE Part 1](https://github.com/LopeAriyo/fullstack-dev-challenge/commit/caed6150ad11857cd85264a8b2f5144920004ddf)
9. [Refactor FE Part 2](https://github.com/LopeAriyo/fullstack-dev-challenge/commit/ec3d00bff8ecae0ce7cef81cab0109689bd30d99)
10. [Refactor BE Code](https://github.com/LopeAriyo/fullstack-dev-challenge/commit/65e1afd59746ecdf93ae3ff06542a7cf22b5e883)
11. Add SOLUTION.md
    - describe run instructions
    - describe approach
    - describe tooling
    - describe structures
    - describe testing
    - describe improvements
    - describe thoughts
    - include screenshots

### Frontend

#### Initial Thoughts

This was my first time using Chakra UI. I have mixed feelings on the one hand it feels easy to use but on the other hand as this was a small app I think it may have been nicer to use a utility first CSS framework (however I'm most likely biased as someone who uses Tailwind often). Unlike a utility first framework there's more choice in the way of how you can build things which I think slows down decision making. For example There is a <Stack> component and a <Flex> component, based on working with flex in general I assumed I would be able to assign a gap in the <Flex> component but that doesn't work in Chakra. In additional there is a <HStack> and <VStack> depending on the direction you would like your child components to flow. I don't see the point in having <Stack> when technically <Flex> should already be able to do this.

I've also not had much experience using Chart JS or Framer either. I didn't explore with these two as much (other than changing the line graph to a box graph) as what was provided was already enough for an MVP.

#### Tooling

I installed the following dependencies

-   Formik: Form handling
-   Yup: FE Form validation (Although Yup is based off Joi, Yup has better support for the FE)

#### Structure

I structured the components of the FE in the style of atomic principles to ensure all components were reusable and scalable. Anything that had some form of logic went into the utils folder to ensure that all UI components were 'dummy' components and because the type form values was defined in multiple place I extracted to its own file and exported it instead to keep code "WET". I prefer to use the WET principle instead of the DRY principle ( https://dzone.com/articles/is-your-code-dry-or-wet#:~:text=Write%20Everything%20Twice%20(WET)%20is,all%20developers%20be%20aiming%20for. ), as I've gained more experience I've come to find that when scaling DRY can actually be more harmful than good.

-   src
    -   components
        -   atoms
            -   ProjectionInput.tsx
            -   ProjectionSlider.tsx
        -   molecules
            -   ProjectionChart.tsx
            -   ProjectionFormControl.tsx
            -   ProjectionValueDetails.tsx
        -   organisms
            -   NavHeader.tsx
            -   ProjectionForm.tsx
        -   templates
            -   Default.tsx
        -   pages
            -   HomePage.tsx
    -   types
        -   formValues.tsx
    -   utils
        -   fetchProjection.ts
        -   formControls.ts
        -   useForm.ts
        -   validationSchema.ts
    -   App.tsx

#### Testing

While I adjusted the simple test to look out to see the title had been rendered I questioned the usefulness of testing to see if the chart and every single component was rendered. I think something more useful would be individual component testing and documenting with the use of something like Storybook (https://storybook.js.org/) followed with End to End testing with a tool like Cypress or Test Cafe. A lot more value would be gained to see if when I've made changes to any of input of the chart data and value of investment is displayed. However because of time I decided to test this BDD style:

> As a user:
>
> -   In order to find out how much my initial savings amount will be in 50 years:
>     -   I want to input my initial deposit
>     -   I want to input my monthly deposits
>     -   I want to input the interest rate supplied

#### Improvements

Going beyond MVP there are a number of things I would improve when it comes towards user experience. Namely, performance. I noticed that because I setState within the useEffect the endpoint was constantly being called. (I literally felt the effect when my MacBook seemed like it would take off). As of right now, I am not sure how to avoid this.

In addition, I would restructure the components to behave differently on smaller devices, although it is possible to view everything the atomic components aren't as usable because the increment and decrement steppers are small and way too close to each other. In addition the slider seems to disappear. These all pose accessibility issues. An additional input for the user to decide how many years they would like to project for would also make for a better user experience.

A nice to have would be tracking! Thinking in terms of this as bigger project it would be useful to see how many times a user tries to calculate their projected savings value. From a business perspective, we could use this data to set an arbitrary limit and if the user tries to surpass this they could be prompted to join/subscribe to Finimize platform as that data would indicate they might need more financial knowledge.

### Backend Approach

#### Initial Thoughts

I hadn't come across Mocha before, I'm familiar with Jest but I didn't find using Mocha much of a steep learning curve. I found out that Chai was good to use to help with assertions so I added that as a package.

#### Tooling

-   Nodemon: continuous server running when changes are made
-   Joi: BE validation
-   cors: to allow the FE to call the BE
-   body-parser: to parse the request body
-   chai: to help with asserting test
-   chai-http: to help asserting http routes

#### Structure

I have structured my code to use the MVC pattern and I've also included a helper folder to include other logic such as validation. The projection has it's own route and calls upon the controller to validate the request made. Provided the request is okay the projectionModel can calculate future savings investment value. The projection is an array of objects each containing a year and balance. The final item in the array gives future savings investment value of 50 years.

-   server
    -   controllers
        -   projectionController.ts
    -   models
        -   projectionModel.ts
    -   routes
        -   projectionRouter.ts
    -   helpers
        -   validationSchema.ts
    -   server.ts
    -   server.test.ts

#### Testing

The primary tests I created was to ensure the the endpoints would return an appropriate status code given the request contain a valid request body and invalid request body.

I found out of the box Mocha prefers a test folder in the route directory but amended this so I could put the tests side by side to their respective component. Inside a bigger repo it is much easier to navigate tests when they are next to their actual component.

#### Improvements

I have included minimal error handling but would have like to have created some routes, a model and a controller for the errors to make my solution more robust.

While I'm confident in the calculations I think it wouldn't have hurt to add a test for the projectionModel. This would mean I could also tested the projection for different number of years too.

A nice to have would be some logging. If this feature was in development and for some reason it went down, it would be useful to see where exactly that had happened to help with debugging.

---

## Final Thoughts

Even though I would categorise myself as FE leaning I enjoyed getting to work on a project where I got to set up the BE. I'm not sure my solution is elegant but I'm quite proud nonetheless. There were many things I wanted to include but I wanted to ensure that my solution was MVP ready.

### The good

Despite my preference for a utility first CSS framework I enjoyed using Chakra UI. It is definitely a lot better than Material UI and other component first CSS frameworks I have previously worked with. I did a brief search and it may actually be possible to use Chakra UI with Tailwind.

I got to exercise my Typescript knowledge. Although in some areas I uncovered my bad habits and realised there are some best practices I still need to work on.

### The "bad"

As previously mentioned I would like to have implemented E2E testing, using something like Cypress, and build the components using something like Storybook.

For something, relatively simple, the performance is quite terrible and I would like to learn how I could actively avoid this sort of issue.

### The "ugly"

Although I have confidence in my calculation, I realised too late (for a TDD approach) that I hadn't tested the actual projectionModel. I can tell if I've gotten a response status but how do I know the actual response (the projection) is correct? This is something I feel I could easily have done which is why I've categorised this as "the ugly".

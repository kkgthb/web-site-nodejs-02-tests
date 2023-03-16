# A tiny _testable_ Node.js website

(Accompanies associated blog post on Katie Kodes "[Locally unit-testing source code for a Node.js Hello World webapp](https://katiekodes.com/node-unit-test-jest/)".)

---

## Prerequisites

1. Please work your way through my entire exercise "[Source code that builds locally into a Node.js Hello World webapp](https://katiekodes.com/node-hello-world/)" before beginning this exercise so that you're familiar with "building" and "running" a webserver _(although in this case, we won't do either of those things -- instead we'll be "testing" it)_ from source code.
1. As mentioned there, you need to have Node.js installed and NPM installed onto your local computer.
1. Download a copy of **this** codebase onto your local computer, being sure to give it a completely _different_ folder from the one you used for the previous exercise.
1. Using a command line interface -- ensuring first that its prompt indicates that your commands will be running within the context of the folder into which you downloaded a copy of **this** -- you must run the following command:
    ```sh
    npm install
    ```

The `npm install` command will take about a minute to execute.

It will add a new subfolder and a new file to the folder on your computer containing a copy of this codebase:

1. A `/node_modules/` folder _(important, and note that its contents will be different than in the last exercise)_.
2. A `/package-lock.json` file _(unnecessary for this exercise but not hurting anything)_.

---

## Running tests that pass

Open up a command line interface.

Ensure that its prompt indicates that your commands will be running within the context of the folder into which you downloaded a copy of this codebase.

Run the following command:

```sh
npm run test
```

The output you will see will say something like:

```
> test
> cross-env NODE_ENV=test jest --testTimeout=10000 --detectOpenHandles

 PASS  src/__tests__/my-first-test.js
  Homepage Hello
    √ GET / return hello world (135 ms)
    √ GET /index.html return hello world (16 ms)

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        1.261 s, estimated 2 s
Ran all test suites.
```

---

## Running tests that fail

Edit the contents of line 12 of the file at `/src/__tests__/my-first-test.js` and replace the word "**World**" with the word "**Goodbye**" so that instead of looking for `"Hello World!"` your test is looking for `"Hello Goodbye!"`.

Open up a command line interface.

Ensure that its prompt indicates that your commands will be running within the context of the folder into which you downloaded a copy of this codebase.

Run the following command:

```sh
npm run test
```

The output you will see will say something like this, complaining that the homepage, both when accessed as `http://localhost:3000/` and as `http://localhost:3000/index.html`, says "**Hello World**" instead of saying "**Hello Goodbye** as expected by the unit test _(after all, you just finished turning your unit test into a [Beatles fan](https://en.wikipedia.org/wiki/Hello,_Goodbye))_:

```
> test
> cross-env NODE_ENV=test jest --testTimeout=10000 --detectOpenHandles

 FAIL  src/__tests__/my-first-test.js
  Homepage Hello
    × GET / return hello world (146 ms)
    × GET /index.html return hello world (20 ms)

  ● Homepage Hello › GET / return hello world

    expect(received).toEqual(expected) // deep equality

    Expected: "Hello Goodbye!"
    Received: "Hello World!"

      10 |         expect(supertest_response.status).toEqual(200);
      11 |         expect(supertest_response.type).toEqual('text/html');
    > 12 |         expect(supertest_response.text).toEqual("Hello Goodbye!");
         |                                         ^
      13 |     }
      14 |     it("GET / return hello world", async () => {
      15 |         const res = await supertest(my_express_server).get("/");

      at toEqual (src/__tests__/my-first-test.js:12:41)
      at Object.check_homepage_expectations (src/__tests__/my-first-test.js:16:9)

  ● Homepage Hello › GET /index.html return hello world

    expect(received).toEqual(expected) // deep equality

    Expected: "Hello Goodbye!"
    Received: "Hello World!"

      10 |         expect(supertest_response.status).toEqual(200);
      11 |         expect(supertest_response.type).toEqual('text/html');
    > 12 |         expect(supertest_response.text).toEqual("Hello Goodbye!");
         |                                         ^
      13 |     }
      14 |     it("GET / return hello world", async () => {
      15 |         const res = await supertest(my_express_server).get("/");

      at toEqual (src/__tests__/my-first-test.js:12:41)
      at Object.check_homepage_expectations (src/__tests__/my-first-test.js:20:9)

Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 total
Snapshots:   0 total
Time:        1.495 s, estimated 2 s
Ran all test suites.
```

---

## Anxious?  Go ahead and let the test pass again

P.S.  If leaving a failing test lying around is really bothering you, feel free to either:

1. Change "`Goodbye`" back to "`World`," or
2. Engage in some "[test-driven-development](https://en.wikipedia.org/wiki/Test-driven_development)" _("TDD")_ by updating line 6 of `/src/web/server.js` from "`World`" to "`Goodbye`."

Then run `npm run test` one more time to set your heart at ease.

---

## Extra credit -- build and run

You're not _forbidden_ from building and running this server just because it's not the focus of this exercise.

Go ahead -- try `npm run build` and then `node ./dist/server.js` against this codebase just like you did against the last one.

In fact, try it with the server saying "`World`" and the test expecting "`Goodbye`."

Did you notice that nothing at all goes wrong with the build process or with visiting your website on `localhost`?

_(Although when you visit it, it will say "`World`," not "`Goodbye`" -- remember, that's what you told the server to do.)_

By **deliberately** running `npm run build` and `node ./dist/server.js` even when you _knew_ that `npm run test` would be angry with you, you've arguably "built" a runtime out of "bad code" and chosen to run "bad code" on a webserver.

Luckily, you've only done so on your local machine, but as we work our way through this series, we'll make sure to build codebases and habits that prevent us from running `npm run build` if `npm run test` failed.
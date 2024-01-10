# CAPEX

This is a simple, entirely client-side tool for exploring a Guardian
Open Platform requests. It will store an API key in local storage, and
allow you to put the same query into the URL that you would use with
an Open Platform request, but get a visual summary of the results.

# Developing

This is a React based app using Vite. To develop locally, run:

```
$ npm run dev
```

which by default will open up a webserver on http://localhost:5174

The first time you hit the page, you will be forwarded to the
configuration page to enter your Open Platform API Key. This will then
be used in all subsequent queries. If you want to change your API key,
visit `http://localhost:5174/#/config`.

Note that because of the requirements at the place where this is
deployed, it uses the hash-based react router, which is why you need
to use paths with `#` in them to get it to work.

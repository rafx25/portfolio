Screenshots served by the case study pages and the project cards.

Rules before adding one:

1. Capture it from a test account.
2. Open the file and look for real names, employee numbers, case details,
   email addresses, internal URLs or anything else identifying.
3. If something is there, edit the PNG. Do not hide it with CSS or crop it in
   the browser, since either can be undone by whoever views the page.
4. Reference it from `data/projects.ts`, with the real pixel size:

       screenshots: [
         {
           src: "/projects/prams-dashboard.png",
           width: 1885,
           height: 1381,
           alt: "What the screen shows",
           caption: "One line, and say so if anything was covered.",
         },
       ]

`width` and `height` are required so next/image reserves the right space and
does not shift the page while loading.

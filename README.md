# spfx-property-control-template

A template for Sharepoint Framework custom Property controls

# Development environment

1. Clone this repository
2. `cd` to the root and run `npm link`
3. Then run `npm run dev`. Typescript compiler will start running in watch mode and will recompile every time a file changes
4. `cd` to your sharepoint solution root and run `npm link property-pane-access-control` (or the name of the package if you rename it)
5. Run `gulp serve`, at this point you will need to also trigger a recompile of the webpart after you make changes to your custom control. If you want to work around it see [this link](https://n8d.at/use-custom-gulp-tasks-in-the-new-sharepoint-framework).

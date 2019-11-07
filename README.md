# typescript-with-absolute-import

This is example of how to config absolute import for typescript.<br>
(Implementation of first option in this [article](https://dev.to/dotorimook/using-absolute-path-import-with-typescript-babel-nodemon-in-your-node-project-ha7))

Note: in `yarn build`, we have to run `yarn babel:transpile` twice because there is a problem with `babel` or `babel-plugin-module-resolver`. If we just run it one time, it will convert the alias only, not the root. We have to run it again and it will resolved remain absolute paths for root.

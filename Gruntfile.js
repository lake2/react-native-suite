module.exports = function (grunt) {
    grunt.initConfig({
        clean: {
            dist: ['./dist/*'],
        },
        ts: {
            default: {
                src: [
                    "./src/animations/**/*",
                    "./src/components/**/*",
                    "./src/hooks/**/*",
                ],
                outDir: "./dist/",
                options: {
                    fast: 'never',
                    target: "es2015",
                    module: "ES2015",
                    lib: ["es6"],
                    jsx: "react-native",
                    declaration: true,
                    rootDir: "./src/",
                    strict: true,
                    baseUrl: "./src",
                    skipLibCheck: true
                }
            }
        },
    });
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks("grunt-contrib-clean");

    grunt.registerTask("dist", ["clean", "ts"]);
};

#!/usr/bin/env node

const { copyFileSync, existsSync, mkdirSync, writeFileSync } = require('fs');

const getDependencies = (packageRoot, dependencies) => {
    const retval = {};

    if (dependencies) {
        Object.keys(dependencies).sort().forEach(key => {
            const value = dependencies[key];

            /** Siblings projects are released with the same version number */
            if (key.startsWith('@adalov') && !value) {
                retval[key] = packageRoot.version;
            } else {
                retval[key] = value;
            }
        });
    }

    return retval;
};

const writePackageJson = (projectRoot, packageConfig, packageRoot) => {
    const dependencies = getDependencies(packageRoot, { tslib: packageRoot.dependencies.tslib, ...packageConfig.dependencies });
    const peerDependencies = getDependencies(packageRoot, packageConfig.peerDependencies);

    const content = {
        name: packageConfig.name,
        version: packageRoot.version,
        bin: {
            [packageConfig.cmdName]: `./bin/${packageConfig.cmdName}`
        },
        description: packageRoot.description,
        repository: {
            ...packageRoot.repository,
            directory: `packages/${packageConfig.dir}`
        },
        keywords: packageRoot.keywords,
        author: packageRoot.author,
        license: packageRoot.license,
        bugs: packageRoot.bugs,
        homepage: packageRoot.homepage,
        main: 'index.js'
    };

    if (Object.keys(dependencies).length) {
        content.dependencies = dependencies;
    }

    if (Object.keys(peerDependencies).length) {
        content.peerDependencies = peerDependencies;
    }
    
    writeFileSync(`${projectRoot}/out-pck/${packageConfig.dir}/package.json`, `${JSON.stringify(content, null, 2)}\n`)
};

const writeBin = (projectRoot, packageConfig) => {
    const content = `#!/usr/bin/env node\n\nrequire('../bin');\n`;
    const directory = `${projectRoot}/out-pck/${packageConfig.dir}/bin`;

    if (!existsSync(directory)) {
        mkdirSync(directory);
    }

    writeFileSync(`${directory}/${packageConfig.cmdName}`, content)
};

const copyFiles = (projectRoot, packageConfig) => {
    const files = [
        'CHANGELOG.md',
        'LICENSE',
        'README.md'
    ];

    files.forEach(fileName => copyFileSync(`${projectRoot}/${fileName}`, `${projectRoot}/out-pck/${packageConfig.dir}/${fileName}`));
};

const preparePackages = () => {
    const projectRoot = process.cwd();
    const packagesConfig = require(`${projectRoot}/packages/config.json`);
    const packageRoot = require(`${projectRoot}/package.json`);

    packagesConfig.forEach(packageConfig => {
        writePackageJson(projectRoot, packageConfig, packageRoot);
        writeBin(projectRoot, packageConfig);
        copyFiles(projectRoot, packageConfig);
    });
};

(() => preparePackages())();

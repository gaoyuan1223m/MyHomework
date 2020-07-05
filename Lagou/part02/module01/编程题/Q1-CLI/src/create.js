const fs = require('fs');
const path = require('path');

const axios = require('axios');
const ora = require('ora');
const Inquirer = require('inquirer');
const { promisify } = require('util');
const chalk = require('chalk');
const MetalSmith = require('metalsmith');
let { render } = require('consolidate').els;
let downloadGitRepo = require('download-git-repo');
let ncp = require('ncp');

render = promisify(render);
downloadGitRepo = promisify(downloadGitRepo);
const { downloadDirectory } = require('./constants');

ncp = promisify(ncp);

const fetchRepoList = async () => {
    const { data } = await axios.get('https://github.com/gaoyuan1223m/Algorithms-and-Data-Structures-with-Typescript'); 
    return data;
};

const fechTagList = async (repo) => {
    const { data } = await axios.get(`https://github.com/gaoyuan1223m/Algorithms-and-Data-Structures-with-Typescript/tags`);
    return data;
};

const waitFnloading = (fn, message) => async (...args) => { // 高阶函数
    const spinner = ora(message);
    spinner.start();
    const result = await fn(...args);
    spinner.succeed();
    return result;
};

const download = async (repo, tag) => {
    let api = `gaoyuan1223m/${repo}`;
    if (tag) {
        api += `#${tag}`;
    }

    const dest = `${downloadDirectory}/${repo}`;
    await downloadGitReop(api, dest); // 下载模版存放到指定路径
    return dest; // 下载的最终目录路径
};

// 逻辑主体部分
module.exports = async (projectName = 'my-project') => {
    if (fs.existsSync(projectName)) { 
        console.log(chalk.red('Folder already exists.'));
    } else {
        
        let repos = await waitLoading(fetchRepoList, 'fetching template...')();
        repos = repos.map((item) => item.name);
        const { repo } = await Inquirer.prompt({
            name: 'repo',
            type: 'list',
            message: 'please choise a template to create project',
            choices: repos,
        });

        
        let tags = await waitLoading(fetchTagList, 'fetching tags...')(repo);
        let result;
        if (tags.length > 0) {
            tags = tags.map((item) => item.name);
            const { tag } = await Inquirer.prompt({ 
                name: 'tag',
                type: 'list',
                message: 'please choise tags to create project',
                choices: tags,
            });
            result = await waitLoading(download, 'download template...')(repo, tag);
        } else {
            result = await waitLoading(download, 'download template...')(repo); 
        }

        if (!fs.existsSync(path.join(result, 'ask.js'))) { 
            try {
                await ncp(result, path.resolve(projectName)); 
                console.log('\r\n', chalk.green(`cd ${projectName}\r\n`), chalk.yellow('npm install\r\n')); // 信息提示
            } catch (error) {
                console.log(error);
            }
        } else {
            await new Promise((resolve, reject) => { 
                MetalSmith(__dirname)
                    .source(result)
                    .destination(path.resolve(projectName))
                    .use(async (files, metal, done) => {
                        const args = require(path.join(result, 'ask.js'));
                        const select = await Inquirer.prompt(args);
                        const meta = metal.metadata(); // 用户填写的结果
                        Object.assign(meta, select);
                        delete files['ask.js'];
                        done();
                    })
                    .use((files, metal, done) => { 
                        const obj = metal.metadata();
                        Reflect.ownKeys(files).forEach(async (file) => {
                            if (file.includes('js') || file.includes('json')) {
                                let content = files[file].contents.toString();
                                if (content.includes('<%')) {
                                    content = await render(content, obj);
                                    files[file].contents = Buffer.from(content);
                                }
                            }
                        });
                        done();
                    })
                    .build((err) => {
                        if (err) {
                            reject();
                        } else {
                            console.log('\r\n', chalk.green(`cd ${projectName}\r\n`), chalk.yellow('npm install\r\n'));
                            resolve();
                        }
                    });
            });
        }
    }
};
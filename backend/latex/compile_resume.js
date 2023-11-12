import { exec } from 'child_process';
import fs from 'fs';
import util from 'util';
import path from 'path';

const execAsync = util.promisify(exec);

async function compileLatex(path) {
    const latexCommand = `pdflatex ${path}`;
    console.log(latexCommand);

    try {
        const { stdout, stderr } = await Promise.race([
            execAsync(latexCommand),
            new Promise((_, reject) => {
                const timeout = 10000; // Timeout in milliseconds (e.g., 10 seconds)
                setTimeout(() => {
                    reject(new Error('PDF compilation process timed out.'));
                }, timeout);
            }),
        ]);

        console.log(`stdout: ${stdout}`);
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            process.exit(1);
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

function createFolder(folder_name, folder_dir) {
    const fullfolder_dir = `${folder_dir}/${folder_name}`;
    if (!fs.existsSync(fullfolder_dir)) {
        fs.mkdirSync(fullfolder_dir);
        console.log(`Folder '${folder_name}' created successfully.`);
    } else {
        console.log(`Folder '${folder_name}' already exists.`);
    }
}

function setupOutputFolder(folder_name) {
    createFolder(folder_name, "./resumes");
    createFolder("tmp_files", `./resumes/${folder_name}`);
}

function moveFile(soure_path, dest_path) {
    fs.rename(soure_path, dest_path, (err) => {
        if (err) {
          console.error(`Error moving file: ${err.message}`);
        } else {
          console.log('File moved successfully.');
        }
    });
}

function getTempFiles(dir_path) {
    const extensions = ['.log', '.aux', '.out'];
    try {
      const files = fs.readdirSync(dir_path);
      const filtered_files = files.filter(file => {
        const ext = path.extname(file).toLowerCase();
        return extensions.includes(ext);
      });
  
      return filtered_files;
    } catch (error) {
      console.error(`Error reading directory: ${error.message}`);
      return [];
    }
  }

function moveFilesToOutput(template_name) {
    const output_folder_path = `./resumes/${template_name}`
    const pdf_path = `${template_name}.pdf`;
    const tex_path = `${template_name}.tex`;
    const pdf_output_path = `${output_folder_path}/${template_name}.pdf`;
    const tex_output_path = `${output_folder_path}/${template_name}.tex`;
    moveFile(pdf_path, pdf_output_path);
    moveFile(tex_path, tex_output_path);
    getTempFiles("./").forEach(file_name => moveFile(`./${file_name}`, `./resumes/${template_name}/tmp_files/${file_name}`));
}

async function compile_resume_main(template_name) {
    // const template_folder_path = "./templates/";
    const template_folder_path = "./";
    // const template_name = "template1_filled";
    await compileLatex(template_folder_path + template_name + ".tex");
    setupOutputFolder(template_name);
    moveFilesToOutput(template_name);
}

export default {compile_resume_main};
